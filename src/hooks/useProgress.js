/**
 * useProgress.js
 * Fonte única de verdade para progresso do aluno
 * 
 * "Medir é saber." — Lord Kelvin
 * 
 * ARQUITETURA DE CONQUISTAS:
 * - earnedAchievements: JÁ CELEBRADAS (badge acende na Home)
 * - pendingAchievements: NA FILA (aguardando modal)
 * 
 * CHAVES DE PROGRESSO:
 * - Formato: map{mapId}:node{nodeId}-{levelId}
 * - Exemplo: map0:node1-beginner, map1:node3-intermediate
 * 
 * LEVEL:
 * - Sempre derivado de XP: Math.floor(xp / 500) + 1
 * - Não é persistido separadamente
 * 
 * IDEMPOTÊNCIA:
 * - completeLevel usa transaction para evitar double reward
 * - Se level já foi completado, não dá XP/diamante novamente
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, increment, arrayUnion, arrayRemove, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';
import { checkNewAchievements } from '../data/achievementsData';

const INITIAL_PROGRESS = {
  xp: 0,
  streak: 0,
  diamonds: 0,
  lastActivity: null,
  completedLevels: {},
  storyProgress: {},
  earnedAchievements: [],
  pendingAchievements: [],
};

// XP por level (derivado, não persistido)
const XP_PER_LEVEL = 500;
const calculateLevel = (xp) => Math.floor(xp / XP_PER_LEVEL) + 1;

export function useProgress(user) {
  const userId = user?.uid;
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [loading, setLoading] = useState(true);

  // Level é sempre derivado de XP
  const level = useMemo(() => calculateLevel(progress.xp), [progress.xp]);

  // Listener em tempo real
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', userId);
    
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        // Remove 'level' do Firestore se existir (migração silenciosa)
        const { level: _, ...cleanData } = data;
        setProgress({ ...INITIAL_PROGRESS, ...cleanData });
      } else {
        const initialData = {
          ...INITIAL_PROGRESS,
          email: user?.email || null,
          name: user?.displayName || null,
          createdAt: new Date().toISOString(),
        };
        setDoc(docRef, initialData);
        setProgress(initialData);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [userId, user?.email, user?.displayName]);

  // === ACHIEVEMENTS ===

  const detectAndQueueAchievements = useCallback(async (updatedProgress) => {
    if (!userId) return [];
    
    const earned = updatedProgress.earnedAchievements || progress.earnedAchievements || [];
    const pending = updatedProgress.pendingAchievements || progress.pendingAchievements || [];
    
    // Adiciona level derivado para checagem de achievements
    const progressWithLevel = {
      ...updatedProgress,
      level: calculateLevel(updatedProgress.xp),
    };
    
    const newlyUnlocked = checkNewAchievements(progressWithLevel, earned, pending);
    
    if (newlyUnlocked.length === 0) return [];
    
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      pendingAchievements: arrayUnion(...newlyUnlocked),
    });
    
    return newlyUnlocked;
  }, [userId, progress.earnedAchievements, progress.pendingAchievements]);

  const celebrateAchievement = useCallback(async (achievementId) => {
    if (!userId || !achievementId) return;
    
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      pendingAchievements: arrayRemove(achievementId),
      earnedAchievements: arrayUnion(achievementId),
    });
  }, [userId]);

  const getNextPendingAchievement = useCallback(() => {
    const pending = progress.pendingAchievements || [];
    if (pending.length === 0) return null;
    return pending[0];
  }, [progress.pendingAchievements]);

  // === NODE PROGRESS (COM mapId) ===
  
  /**
   * Retorna estado do node para um mapa específico
   * @param {number} mapId - ID do mapa (0, 1, 2...)
   * @param {number} nodeId - ID do node (1, 2, 3...)
   */
  const getNodeState = useCallback((mapId, nodeId) => {
    const prefix = `map${mapId}:node${nodeId}-`;
    const completedCount = Object.keys(progress.completedLevels)
      .filter(key => key.startsWith(prefix)).length;
    
    if (completedCount >= 3) return 'completed';
    if (completedCount > 0) return 'in_progress';
    if (nodeId === 1) return 'unlocked';
    
    // Verifica se node anterior está completo
    const prevPrefix = `map${mapId}:node${nodeId - 1}-`;
    const prevCompleted = Object.keys(progress.completedLevels)
      .filter(key => key.startsWith(prevPrefix)).length;
    
    return prevCompleted >= 3 ? 'unlocked' : 'locked';
  }, [progress.completedLevels]);

  /**
   * Retorna quantos levels foram completos no node
   */
  const getNodeProgress = useCallback((mapId, nodeId) => {
    const prefix = `map${mapId}:node${nodeId}-`;
    return Object.keys(progress.completedLevels)
      .filter(key => key.startsWith(prefix)).length;
  }, [progress.completedLevels]);

  /**
   * Verifica se um level específico foi completo
   */
  const isLevelCompleted = useCallback((mapId, nodeId, levelId) => {
    const key = `map${mapId}:node${nodeId}-${levelId}`;
    return !!progress.completedLevels[key];
  }, [progress.completedLevels]);

  /**
   * Retorna próximo level não completo
   */
  const getNextLevel = useCallback((mapId, nodeId, levels) => {
    if (!levels) return null;
    return levels.find(level => !isLevelCompleted(mapId, nodeId, level.id));
  }, [isLevelCompleted]);

  /**
   * Completa um level e detecta conquistas
   * IDEMPOTENTE: usa transaction para evitar double reward
   */
  const completeLevel = useCallback(async (mapId, nodeId, levelId, result) => {
    if (!userId) return { newlyUnlocked: [], isFirstCompletion: false };
    
    const key = `map${mapId}:node${nodeId}-${levelId}`;
    const xpGained = result.xpEarned || 0;
    const earnedDiamond = result.earnedDiamond || false;
    const docRef = doc(db, 'users', userId);

    // Transaction para garantir idempotência
    const transactionResult = await runTransaction(db, async (transaction) => {
      const docSnap = await transaction.get(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('User document does not exist');
      }
      
      const currentData = docSnap.data();
      const alreadyCompleted = !!currentData.completedLevels?.[key];
      
      // Se já completou, não dá recompensa novamente
      if (alreadyCompleted) {
        return {
          isFirstCompletion: false,
          newXP: currentData.xp,
          newDiamonds: currentData.diamonds,
        };
      }
      
      // Primeira vez completando — dá recompensa
      const newXP = (currentData.xp || 0) + xpGained;
      const newDiamonds = (currentData.diamonds || 0) + (earnedDiamond ? 1 : 0);
      
      const updates = {
        [`completedLevels.${key}`]: {
          accuracy: result.accuracy,
          xp: xpGained,
          completedAt: new Date().toISOString(),
        },
        xp: newXP,
        diamonds: newDiamonds,
        lastActivity: new Date().toISOString(),
      };
      
      transaction.update(docRef, updates);
      
      return {
        isFirstCompletion: true,
        newXP,
        newDiamonds,
      };
    });

    const { isFirstCompletion, newXP, newDiamonds } = transactionResult;
    const newLevel = calculateLevel(newXP);
    const oldLevel = calculateLevel(progress.xp);
    const leveledUp = newLevel > oldLevel;

    // Prepara progress atualizado para detecção de achievements
    const updatedProgress = {
      ...progress,
      xp: newXP,
      diamonds: newDiamonds,
      completedLevels: {
        ...progress.completedLevels,
        [key]: { accuracy: result.accuracy, xp: xpGained },
      },
    };

    // Detecta achievements apenas se foi primeira completação
    let newlyUnlocked = [];
    if (isFirstCompletion) {
      newlyUnlocked = await detectAndQueueAchievements(updatedProgress);
    }

    return { 
      newlyUnlocked, 
      newLevel, 
      leveledUp,
      isFirstCompletion,
    };
  }, [userId, progress, detectAndQueueAchievements]);

  // === STORY PROGRESS ===

  const updateStoryProgress = useCallback(async (seriesId, episodeId, score, totalEpisodes) => {
    if (!userId) return { average: 0, hasDiamond: false, newDiamond: false, newlyUnlocked: [] };
    
    const currentStory = progress.storyProgress[seriesId] || { scores: {} };
    const newScores = { 
      ...currentStory.scores, 
      [episodeId]: Math.max(currentStory.scores[episodeId] || 0, score) 
    };
    
    const scoreValues = Object.values(newScores);
    const average = Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);
    
    const allComplete = scoreValues.length >= totalEpisodes;
    const hasDiamond = allComplete && average >= 90;
    const isNewDiamond = hasDiamond && !currentStory.hasDiamond;
    
    const docRef = doc(db, 'users', userId);

    const updates = {
      [`storyProgress.${seriesId}`]: {
        scores: newScores,
        average,
        hasDiamond,
      },
    };

    if (isNewDiamond) {
      updates.diamonds = increment(1);
    }

    await updateDoc(docRef, updates);

    const updatedProgress = {
      ...progress,
      storyProgress: {
        ...progress.storyProgress,
        [seriesId]: { scores: newScores, average, hasDiamond },
      },
      diamonds: (progress.diamonds || 0) + (isNewDiamond ? 1 : 0),
    };

    const newlyUnlocked = await detectAndQueueAchievements(updatedProgress);

    return { 
      average, 
      hasDiamond, 
      newDiamond: isNewDiamond,
      newlyUnlocked,
    };
  }, [userId, progress, detectAndQueueAchievements]);

  // === UTILITIES ===

  const earnDiamond = useCallback(async () => {
    if (!userId) return;
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, { diamonds: increment(1) });
  }, [userId]);

  const resetProgress = useCallback(async () => {
    if (!userId) return;
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, {
      ...INITIAL_PROGRESS,
      email: user?.email || null,
      name: user?.displayName || null,
      createdAt: new Date().toISOString(),
    });
  }, [userId, user?.email, user?.displayName]);

  return {
    progress: {
      ...progress,
      level, // Level derivado, não do Firestore
    },
    loading,
    
    // Node (agora com mapId)
    getNodeState,
    getNodeProgress,
    isLevelCompleted,
    getNextLevel,
    completeLevel,
    
    // Story
    updateStoryProgress,
    
    // Achievements
    detectAndQueueAchievements,
    celebrateAchievement,
    getNextPendingAchievement,
    
    // Utilities
    earnDiamond,
    resetProgress,
    
    // Helpers
    calculateLevel,
  };
}