/**
 * useProgress.js
 * Fonte única de verdade para progresso do aluno
 * 
 * "Medir é saber." — Lord Kelvin
 * 
 * ARQUITETURA DE CONQUISTAS (v2 - Anti-Colisão):
 * - Detecção de conquistas agora é feita pelo LessonRunner
 * - useProgress só persiste: earnedAchievements, pendingAchievements
 * - celebrateAchievement recebe objeto com todos os IDs
 * 
 * CHAVES DE PROGRESSO:
 * - Formato: map{mapId}:node{nodeId}-{levelId}
 * - Exemplo: map0:node1-0_1_bronze
 * 
 * LEVEL:
 * - Sempre derivado de XP: Math.floor(xp / 500) + 1
 * - Não é persistido separadamente
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, increment, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';

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

  // === ACHIEVEMENTS (v2 - Simplificado) ===

  /**
   * Celebra uma conquista e atualiza as listas
   * Chamado pelo LessonRunner após mostrar o modal
   * 
   * @param {object} data
   * @param {string} data.celebratedId - ID da conquista celebrada
   * @param {string[]} data.newEarnedIds - Todos os IDs que agora são "earned"
   * @param {string[]} data.newPendingIds - IDs que ficaram na fila
   */
  const celebrateAchievement = useCallback(async (data) => {
    if (!userId) return;
    
    // Suporte ao formato antigo (só string) para compatibilidade
    if (typeof data === 'string') {
      const achievementId = data;
      const docRef = doc(db, 'users', userId);
      
      // Formato antigo: move de pending para earned
      const currentEarned = progress.earnedAchievements || [];
      const currentPending = progress.pendingAchievements || [];
      
      await updateDoc(docRef, {
        earnedAchievements: [...currentEarned.filter(id => id !== achievementId), achievementId],
        pendingAchievements: currentPending.filter(id => id !== achievementId),
      });
      return;
    }
    
    // Formato novo: objeto com todas as listas
    const { celebratedId, newEarnedIds, newPendingIds } = data;
    
    if (!celebratedId) return;
    
    const docRef = doc(db, 'users', userId);
    
    await updateDoc(docRef, {
      earnedAchievements: newEarnedIds,
      pendingAchievements: newPendingIds,
    });
    
    // Atualiza estado local imediatamente
    setProgress(prev => ({
      ...prev,
      earnedAchievements: newEarnedIds,
      pendingAchievements: newPendingIds,
    }));
    
  }, [userId, progress.earnedAchievements, progress.pendingAchievements]);

  /**
   * Retorna próxima conquista pendente (para mostrar ao entrar em lição)
   */
  const getNextPendingAchievement = useCallback(() => {
    const pending = progress.pendingAchievements || [];
    if (pending.length === 0) return null;
    return pending[0];
  }, [progress.pendingAchievements]);

  // === NODE PROGRESS (COM mapId) ===
  
  /**
   * Retorna estado do node para um mapa específico
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
   * Completa um level
   * IDEMPOTENTE: usa transaction para evitar double reward
   * 
   * NOTA: Não detecta mais conquistas aqui. O LessonRunner faz isso.
   */
  const completeLevel = useCallback(async (mapId, nodeId, levelId, result) => {
    if (!userId) return { isFirstCompletion: false, progress: {} };
    
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
          updatedData: currentData,
        };
      }
      
      // Primeira vez completando — dá recompensa
      const newXP = (currentData.xp || 0) + xpGained;
      const newDiamonds = (currentData.diamonds || 0) + (earnedDiamond ? 1 : 0);
      
      const newCompletedLevels = {
        ...currentData.completedLevels,
        [key]: {
          accuracy: result.accuracy,
          xp: xpGained,
          completedAt: new Date().toISOString(),
        },
      };
      
      const updates = {
        [`completedLevels.${key}`]: newCompletedLevels[key],
        xp: newXP,
        diamonds: newDiamonds,
        lastActivity: new Date().toISOString(),
      };
      
      transaction.update(docRef, updates);
      
      return {
        isFirstCompletion: true,
        updatedData: {
          ...currentData,
          xp: newXP,
          diamonds: newDiamonds,
          completedLevels: newCompletedLevels,
        },
      };
    });

    const { isFirstCompletion, updatedData } = transactionResult;
    
    // Calcula level
    const newLevel = calculateLevel(updatedData.xp);
    const oldLevel = calculateLevel(progress.xp);
    const leveledUp = newLevel > oldLevel;

    // Retorna progress atualizado para o LessonRunner usar na detecção de conquistas
    return { 
      isFirstCompletion,
      leveledUp,
      newLevel,
      progress: {
        ...updatedData,
        level: newLevel,
      },
    };
  }, [userId, progress.xp]);

  // === STORY PROGRESS ===

  const updateStoryProgress = useCallback(async (seriesId, episodeId, score, totalEpisodes) => {
    if (!userId) return { average: 0, hasDiamond: false, newDiamond: false };
    
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

    return { 
      average, 
      hasDiamond, 
      newDiamond: isNewDiamond,
      // Progress atualizado para detecção de conquistas
      progress: {
        ...progress,
        storyProgress: {
          ...progress.storyProgress,
          [seriesId]: { scores: newScores, average, hasDiamond },
        },
        diamonds: (progress.diamonds || 0) + (isNewDiamond ? 1 : 0),
      },
    };
  }, [userId, progress]);

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
    
    // Achievements (simplificado)
    celebrateAchievement,
    getNextPendingAchievement,
    
    // Utilities
    earnDiamond,
    resetProgress,
    
    // Helpers
    calculateLevel,
  };
}