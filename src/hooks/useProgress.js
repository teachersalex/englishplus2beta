/**
 * useProgress.js
 * Fonte única de verdade para progresso do aluno
 * 
 * "A questão não é atingir a perfeição, mas sim a totalidade."
 * — Carl Jung
 */

import { useState, useEffect, useCallback } from 'react';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { checkNewAchievements } from '../data/achievementsData';

const INITIAL_PROGRESS = {
  xp: 0,
  level: 1,
  streak: 0,
  diamonds: 0,
  lastActivity: null,
  completedLevels: {},    // { 'node1-level1': { accuracy: 95, xp: 50 } }
  storyProgress: {},      // { 'bad-date': { scores: { ep1: 92 }, average: 92, hasDiamond: true } }
  earnedAchievements: [], // ['lesson1', 'xp100', ...]
};

export function useProgress(user) {
  const userId = user?.uid;
  const [progress, setProgress] = useState(INITIAL_PROGRESS);
  const [loading, setLoading] = useState(true);
  const [newAchievements, setNewAchievements] = useState([]); // Para toast/modal

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
        // Primeiro acesso: cria documento
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

  // Atualiza Firestore
  const updateProgress = useCallback(async (updates) => {
    if (!userId) return;
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, updates);
  }, [userId]);

  // Checa e salva novas conquistas
  const checkAndSaveAchievements = useCallback(async (updatedProgress) => {
    const currentEarned = updatedProgress.earnedAchievements || [];
    const newlyEarned = checkNewAchievements(updatedProgress, currentEarned);
    
    if (newlyEarned.length > 0) {
      const allEarned = [...currentEarned, ...newlyEarned];
      await updateProgress({ earnedAchievements: allEarned });
      setNewAchievements(newlyEarned); // Trigger toast
      return newlyEarned;
    }
    return [];
  }, [updateProgress]);

  // Limpa notificação de conquistas novas
  const clearNewAchievements = useCallback(() => {
    setNewAchievements([]);
  }, []);

  // === Node Progress ===
  
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

  const completeLevel = useCallback(async (nodeId, levelId, result) => {
    const key = `node${nodeId}-${levelId}`;
    const xpGained = result.xpEarned || 0;
    const newXP = progress.xp + xpGained;
    const newLevel = Math.floor(newXP / 500) + 1;

    await updateProgress({
      [`completedLevels.${key}`]: {
        accuracy: result.accuracy,
        xp: xpGained,
        completedAt: new Date().toISOString(),
      },
      xp: newXP,
      level: newLevel,
      lastActivity: new Date().toISOString(),
    });

    // Checa conquistas com progresso atualizado
    const updatedProgress = {
      ...progress,
      completedLevels: {
        ...progress.completedLevels,
        [key]: { accuracy: result.accuracy, xp: xpGained },
      },
      xp: newXP,
      level: newLevel,
    };
    
    const newlyEarned = await checkAndSaveAchievements(updatedProgress);
    return { newAchievements: newlyEarned };
  }, [progress, updateProgress, checkAndSaveAchievements]);

  // === Story Progress ===

  const updateStoryProgress = useCallback(async (seriesId, episodeId, score) => {
    const currentStory = progress.storyProgress[seriesId] || { scores: {} };
    const newScores = { 
      ...currentStory.scores, 
      [episodeId]: Math.max(currentStory.scores[episodeId] || 0, score) 
    };
    
    const scoreValues = Object.values(newScores);
    const average = Math.round(scoreValues.reduce((a, b) => a + b, 0) / scoreValues.length);
    
    const hasDiamond = average >= 90;
    const diamondIncrement = (hasDiamond && !currentStory.hasDiamond) ? 1 : 0;

    await updateProgress({
      [`storyProgress.${seriesId}`]: {
        scores: newScores,
        average,
        hasDiamond,
      },
      diamonds: progress.diamonds + diamondIncrement,
    });

    // Checa conquistas
    const updatedProgress = {
      ...progress,
      storyProgress: {
        ...progress.storyProgress,
        [seriesId]: { scores: newScores, average, hasDiamond },
      },
      diamonds: progress.diamonds + diamondIncrement,
    };
    
    const newlyEarned = await checkAndSaveAchievements(updatedProgress);

    return { 
      average, 
      hasDiamond, 
      newDiamond: diamondIncrement > 0,
      newAchievements: newlyEarned,
    };
  }, [progress, updateProgress, checkAndSaveAchievements]);

  // === Utilities ===

  const earnDiamond = useCallback(async () => {
    const newDiamonds = progress.diamonds + 1;
    await updateProgress({ diamonds: newDiamonds });
    
    // Checa conquistas
    await checkAndSaveAchievements({ ...progress, diamonds: newDiamonds });
  }, [progress, updateProgress, checkAndSaveAchievements]);

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
    // Utilities
    earnDiamond,
    resetProgress,
    // Achievements
    newAchievements,
    clearNewAchievements,
  };
}