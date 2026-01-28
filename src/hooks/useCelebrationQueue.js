/**
 * useCelebrationQueue.js
 * Gerencia a sequência de celebrações sem colisão
 * 
 * FLUXO:
 * 1. Completa atividade
 * 2. Se ganhou diamante → DiamondModal
 * 3. Diamond fecha → Achievement Modal (se tiver pending)
 * 4. Achievement fecha → celebrateAchievement() → Completion Modal
 * 
 * REGRAS:
 * - Nunca dois modais ao mesmo tempo
 * - Diamante sempre tem prioridade
 * - Só 1 achievement por sessão (o resto fica na fila)
 */

import { useState, useCallback, useRef } from 'react';
import { getAchievementById } from '../data/achievementsData';

// Estados possíveis
const STATES = {
  IDLE: 'idle',
  SHOWING_DIAMOND: 'showing_diamond',
  SHOWING_ACHIEVEMENT: 'showing_achievement',
  SHOWING_SAVING: 'showing_saving',
  COMPLETE: 'complete',
};

export function useCelebrationQueue({
  onCelebrateAchievement,  // Função para mover de pending → earned
}) {
  const [state, setState] = useState(STATES.IDLE);
  const [savingMessage, setSavingMessage] = useState('');
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [earnedDiamond, setEarnedDiamond] = useState(false);
  
  // Guarda ID para celebrar após modal
  const achievementToSaveRef = useRef(null);

  /**
   * Inicia o fluxo de celebração
   * @param {Object} params
   * @param {boolean} params.diamond - Se ganhou diamante
   * @param {string|null} params.achievementId - ID da conquista (se tiver)
   */
  const startCelebration = useCallback(({ diamond = false, achievementId = null }) => {
    setEarnedDiamond(diamond);
    
    // Busca dados da conquista
    if (achievementId) {
      const achievement = getAchievementById(achievementId);
      setCurrentAchievement(achievement);
      achievementToSaveRef.current = achievementId;
    } else {
      setCurrentAchievement(null);
      achievementToSaveRef.current = null;
    }
    
    // Decide primeiro modal
    if (diamond) {
      setState(STATES.SHOWING_DIAMOND);
    } else if (achievementId) {
      setState(STATES.SHOWING_ACHIEVEMENT);
    } else {
      setState(STATES.COMPLETE);
    }
  }, []);

  /**
   * Chamado quando DiamondModal fecha
   */
  const onDiamondComplete = useCallback(async () => {
    // Mostra "Salvando..." entre modais
    if (currentAchievement) {
      setSavingMessage('Salvando progresso...');
      setState(STATES.SHOWING_SAVING);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setState(STATES.SHOWING_ACHIEVEMENT);
    } else {
      setState(STATES.COMPLETE);
    }
  }, [currentAchievement]);

  /**
   * Chamado quando AchievementModal fecha
   */
  const onAchievementComplete = useCallback(async () => {
    // Salva conquista como CELEBRADA
    if (achievementToSaveRef.current && onCelebrateAchievement) {
      setSavingMessage('Registrando conquista...');
      setState(STATES.SHOWING_SAVING);
      
      await onCelebrateAchievement(achievementToSaveRef.current);
      
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
    
    setState(STATES.COMPLETE);
    achievementToSaveRef.current = null;
  }, [onCelebrateAchievement]);

  /**
   * Reseta o estado (após sair do completion)
   */
  const reset = useCallback(() => {
    setState(STATES.IDLE);
    setCurrentAchievement(null);
    setEarnedDiamond(false);
    setSavingMessage('');
    achievementToSaveRef.current = null;
  }, []);

  return {
    // Estado
    state,
    isIdle: state === STATES.IDLE,
    showDiamond: state === STATES.SHOWING_DIAMOND,
    showAchievement: state === STATES.SHOWING_ACHIEVEMENT,
    showSaving: state === STATES.SHOWING_SAVING,
    isComplete: state === STATES.COMPLETE,
    
    // Dados
    currentAchievement,
    earnedDiamond,
    savingMessage,
    
    // Actions
    startCelebration,
    onDiamondComplete,
    onAchievementComplete,
    reset,
  };
}

export default useCelebrationQueue;
