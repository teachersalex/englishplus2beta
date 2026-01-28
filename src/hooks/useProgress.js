/**
 * useProgress.js
 * Fonte única de verdade para progresso do aluno
 * 
 * ARQUITETURA DE CONQUISTAS:
 * - earnedAchievements: JÁ CELEBRADAS (badge acende na Home)
 * - pendingAchievements: NA FILA (aguardando modal)
 * 
 * FLUXO:
 * 1. Detecta novas → adiciona em PENDING
 * 2. Celebra 1 → move de PENDING para EARNED
 * 3. Badge só aparece após celebrar
 */

import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, increment, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { checkNewAchievements } from '../data/achievementsData';

const INITIAL_PROGRESS = {
  xp: 0,
  level: 1,
  streak: 0,
  diamonds: 0,
  lastActivity: null,
  completedLevels: {},
  storyProgress: {},
  earnedAchievements: [],   // JÁ CELEBRADAS
  pendingAchievements: [],  // NA FILA
};

export function useProgress(user) {
  const userId = user?.uid;
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [loading, setLoading] = useState(true);

  // Listener em tempo real
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, 'users', userId);
    
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setProgress({ ...INITIAL_PROGRESS, ...snapshot.data() });
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

  /**
   * Detecta novas conquistas e adiciona na fila PENDING
   * Retorna array de IDs adicionados (ordenados por prioridade)
   */
  const detectAndQueueAchievements = useCallback(async (updatedProgress) => {
    if (!userId) return [];
    
    const earned = updatedProgress.earnedAchievements || progress.earnedAchievements || [];
    const pending = updatedProgress.pendingAchievements || progress.pendingAchievements || [];
    
    // Detecta novas (exclui earned e pending)
    const newlyUnlocked = checkNewAchievements(updatedProgress, earned, pending);
    
    if (newlyUnlocked.length === 0) return [];
    
    // Adiciona na fila
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      pendingAchievements: arrayUnion(...newlyUnlocked),
    });
    
    return newlyUnlocked;
  }, [userId, progress.earnedAchievements, progress.pendingAchievements]);

  /**
   * Move conquista de PENDING para EARNED (após celebrar com modal)
   */
  const celebrateAchievement = useCallback(async (achievementId) => {
    if (!userId || !achievementId) return;
    
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      pendingAchievements: arrayRemove(achievementId),
      earnedAchievements: arrayUnion(achievementId),
    });
  }, [userId]);

  /**
   * Pega próxima conquista da fila (a de maior prioridade)
   * Não remove, só retorna
   */
  const getNextPendingAchievement = useCallback(() => {
    const pending = progress.pendingAchievements || [];
    if (pending.length === 0) return null;
    
    // Já vem ordenado por prioridade do checkNewAchievements
    // Mas se não vier, a primeira é a mais prioritária
    return pending[0];
  }, [progress.pendingAchievements]);

  // === NODE PROGRESS ===
  
  const getNodeState = useCallback((nodeId) => {
    const completedCount = Object.keys(progress.completedLevels)
      .filter(key => key.startsWith(`node${nodeId}-`)).length;
    
    if (completedCount >= 3) return 'completed';
    if (completedCount > 0) return 'in_progress';
    if (nodeId === 1) return 'unlocked';
    
    const prevCompleted = Object.keys(progress.completedLevels)
      .filter(key => key.startsWith(`node${nodeId - 1}-`)).length;
    
    return prevCompleted >= 3 ? 'unlocked' : 'locked';
  }, [progress.completedLevels]);

  const getNodeProgress = useCallback((nodeId) => {
    return Object.keys(progress.completedLevels)
      .filter(key => key.startsWith(`node${nodeId}-`)).length;
  }, [progress.completedLevels]);

  const isLevelCompleted = useCallback((nodeId, levelId) => {
    return !!progress.completedLevels[`node${nodeId}-${levelId}`];
  }, [progress.completedLevels]);

  const getNextLevel = useCallback((nodeId, levels) => {
    if (!levels) return null;
    return levels.find(level => !isLevelCompleted(nodeId, level.id));
  }, [isLevelCompleted]);

  /**
   * Completa um level e detecta conquistas
   * Retorna { newlyUnlocked: string[] }
   */
  const completeLevel = useCallback(async (nodeId, levelId, result) => {
    if (!userId) return { newlyUnlocked: [] };
    
    const key = `node${nodeId}-${levelId}`;
    const xpGained = result.xpEarned || 0;
    const earnedDiamond = result.earnedDiamond || false;
    const docRef = doc(db, 'users', userId);

    // Atualização atômica
    const updates = {
      [`completedLevels.${key}`]: {
        accuracy: result.accuracy,
        xp: xpGained,
        completedAt: new Date().toISOString(),
      },
      xp: increment(xpGained),
      lastActivity: new Date().toISOString(),
    };

    if (earnedDiamond) {
      updates.diamonds = increment(1);
    }

    await updateDoc(docRef, updates);

    // Calcula novo level
    const newXP = progress.xp + xpGained;
    const newLevel = Math.floor(newXP / 500) + 1;
    
    if (newLevel > progress.level) {
      await updateDoc(docRef, { level: newLevel });
    }

    // Simula progresso atualizado para detectar conquistas
    const updatedProgress = {
      ...progress,
      xp: newXP,
      level: newLevel,
      diamonds: (progress.diamonds || 0) + (earnedDiamond ? 1 : 0),
      completedLevels: {
        ...progress.completedLevels,
        [key]: { accuracy: result.accuracy, xp: xpGained },
      },
    };

    // Detecta e enfileira conquistas
    const newlyUnlocked = await detectAndQueueAchievements(updatedProgress);

    return { newlyUnlocked, newLevel };
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

    // Simula progresso atualizado para detectar conquistas
    const updatedProgress = {
      ...progress,
      storyProgress: {
        ...progress.storyProgress,
        [seriesId]: { scores: newScores, average, hasDiamond },
      },
      diamonds: (progress.diamonds || 0) + (isNewDiamond ? 1 : 0),
    };

    // Detecta e enfileira conquistas
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
    progress,
    loading,
    
    // Node
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
  };
}