import { useState, useCallback, useRef } from 'react';
import { thresholds } from '../data/gameSchema';

/**
 * Hook que gerencia o estado de uma lição/node
 * - XP acumulado
 * - Acertos e erros
 * - Progresso das atividades
 * - Sistema de tentativas
 */
export function useLessonState(totalActivities = 5) {
  const [state, setState] = useState({
    xp: 0,
    correct: 0,
    wrong: 0,
    currentActivity: 0,
    completedActivities: [],
    isComplete: false,
  });

  // Adiciona XP
  const addXP = useCallback((amount) => {
    setState(prev => ({ ...prev, xp: prev.xp + amount }));
  }, []);

  // Registra acerto
  const addCorrect = useCallback(() => {
    setState(prev => ({ ...prev, correct: prev.correct + 1 }));
  }, []);

  // Registra erro
  const addWrong = useCallback(() => {
    setState(prev => ({ ...prev, wrong: prev.wrong + 1 }));
  }, []);

  // Avança para próxima atividade
  const nextActivity = useCallback(() => {
    setState(prev => {
      const next = prev.currentActivity + 1;
      const isComplete = next >= totalActivities;
      return {
        ...prev,
        currentActivity: next,
        completedActivities: [...prev.completedActivities, prev.currentActivity],
        isComplete,
      };
    });
  }, [totalActivities]);

  // Calcula precisão (%)
  const accuracy = state.correct + state.wrong > 0
    ? Math.round((state.correct / (state.correct + state.wrong)) * 100)
    : 0;

  // Calcula progresso (%)
  const progress = Math.round((state.currentActivity / totalActivities) * 100);

  // Verifica se ganhou diamante (usa threshold centralizado)
  const earnedDiamond = accuracy >= thresholds.diamond && state.isComplete;

  // Reset
  const reset = useCallback(() => {
    setState({
      xp: 0,
      correct: 0,
      wrong: 0,
      currentActivity: 0,
      completedActivities: [],
      isComplete: false,
    });
  }, []);

  return {
    ...state,
    accuracy,
    progress,
    earnedDiamond,
    addXP,
    addCorrect,
    addWrong,
    nextActivity,
    reset,
  };
}

/**
 * Hook para gerenciar tentativas de uma atividade
 * 
 * FIXES APLICADOS:
 * - useRef para tracking síncrono (elimina race condition)
 * - useAttempt não depende de state no array de dependências
 * - Retorno sempre preciso mesmo em chamadas rápidas consecutivas
 */
export function useAttempts(maxAttempts = 3) {
  const [attempts, setAttempts] = useState(0);
  const attemptsRef = useRef(0);

  const isLocked = attempts >= maxAttempts;
  const remaining = Math.max(0, maxAttempts - attempts);

  const useAttempt = useCallback(() => {
    // Guard: se já está travado, retorna estado atual sem incrementar
    if (attemptsRef.current >= maxAttempts) {
      return {
        used: attemptsRef.current,
        remaining: 0,
        isLastAttempt: false,
        isLocked: true,
      };
    }

    // Incrementa ref SINCRONAMENTE (resolve race condition)
    attemptsRef.current += 1;
    const newAttempts = attemptsRef.current;
    
    // Atualiza state para trigger re-render
    setAttempts(newAttempts);

    const newRemaining = Math.max(0, maxAttempts - newAttempts);

    return {
      used: newAttempts,
      remaining: newRemaining,
      isLastAttempt: newAttempts === maxAttempts - 1,
      isLocked: newAttempts >= maxAttempts,
    };
  }, [maxAttempts]); // Sem 'attempts' nas dependências = função estável

  const reset = useCallback(() => {
    attemptsRef.current = 0;
    setAttempts(0);
  }, []);

  return {
    attempts,
    maxAttempts,
    remaining,
    isLocked,
    useAttempt,
    reset,
  };
}

export default useLessonState;