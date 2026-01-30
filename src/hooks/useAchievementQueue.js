import { useState, useEffect, useCallback, useRef } from 'react';
import { getAchievementById } from '../../data/achievementsData';

/**
 * useAchievementQueue
 * Sistema de fila conta-gotas para conquistas
 * 
 * REGRAS:
 * 1. Máximo 1 conquista por sessão de atividade
 * 2. Conquistas silenciosas (XP, level) não entram na fila
 * 3. Fila persiste em localStorage
 * 4. Próxima conquista só aparece na próxima sessão
 * 
 * "Se tudo é conquista, nada é conquista."
 */

const STORAGE_KEY = 'englishplus_achievement_queue';
const LAST_SHOWN_KEY = 'englishplus_last_achievement_shown';

// Conquistas que NÃO geram modal (já têm feedback visual)
const SILENT_ACHIEVEMENTS = [
  'xp100', 'xp500', 'xp1000', 'xp2000', 'xp5000', 'xp10000', 'xp20000', 'xp50000', 'xp100000',
  'level2', 'level5', 'level10', 'level15', 'level20', 'level30', 'level50',
];

// Prioridade por tipo (maior = mais importante = aparece primeiro)
const PRIORITY_MAP = {
  // Marcos importantes (aparecem primeiro)
  node10: 100,
  lesson100: 95,
  lesson200: 95,
  lesson300: 95,
  master: 100,
  allnodes: 100,
  
  // Nodes e milestones
  node1: 80,
  node3: 75,
  node5: 75,
  node7: 75,
  
  // Primeiros de cada tipo
  lesson1: 70,
  story1: 70,
  diamond1: 70,
  perfect1: 70,
  
  // Progressão normal
  lesson5: 50,
  lesson10: 50,
  lesson20: 50,
  lesson30: 50,
  lesson50: 55,
  lesson75: 55,
  lesson150: 60,
  
  // Stories
  story3: 50,
  story5: 55,
  story10: 60,
  story20: 65,
  
  // Diamantes
  diamond5: 55,
  diamond10: 60,
  diamond20: 65,
  diamond50: 70,
  
  // Perfeitas
  perfect5: 50,
  perfect10: 55,
  perfect20: 60,
  perfect50: 65,
  perfect100: 70,
  
  // Default
  default: 40,
};

const getPriority = (id) => PRIORITY_MAP[id] ?? PRIORITY_MAP.default;

export function useAchievementQueue(userId) {
  const [queue, setQueue] = useState([]);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [isReady, setIsReady] = useState(false);
  
  // Session gate: impede mais de 1 modal por sessão de atividade
  const shownThisSessionRef = useRef(false);

  // Reset estado E carrega fila quando userId muda
  useEffect(() => {
    // Reset completo ao trocar usuário (evita vazamento)
    setQueue([]);
    setCurrentAchievement(null);
    setIsReady(false);
    shownThisSessionRef.current = false;

    if (!userId) return;
    
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ordena por prioridade
        const sorted = parsed.sort((a, b) => getPriority(b) - getPriority(a));
        setQueue(sorted);
      }
    } catch (e) {
      console.warn('Erro ao carregar fila de conquistas:', e);
    }
    
    setIsReady(true);
  }, [userId]);

  // Salva fila no localStorage
  const saveQueue = useCallback((newQueue) => {
    if (!userId) return;
    
    try {
      localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(newQueue));
    } catch (e) {
      console.warn('Erro ao salvar fila de conquistas:', e);
    }
  }, [userId]);

  /**
   * Reseta o gate de sessão (chamar ao iniciar nova atividade)
   */
  const resetSessionGate = useCallback(() => {
    shownThisSessionRef.current = false;
  }, []);

  /**
   * Adiciona conquistas à fila
   * @param {string[]} achievementIds - Array de IDs de conquistas
   * @returns {Object|null} - Conquista para mostrar AGORA (se houver) ou null
   */
  const addToQueue = useCallback((achievementIds) => {
    if (!achievementIds || achievementIds.length === 0) return null;
    
    // Filtra silenciosas
    const showable = achievementIds.filter(id => !SILENT_ACHIEVEMENTS.includes(id));
    
    if (showable.length === 0) return null;
    
    // Ordena por prioridade
    const sorted = showable.sort((a, b) => getPriority(b) - getPriority(a));
    
    // Session gate: já mostrou nesta sessão? Enfileira tudo
    if (shownThisSessionRef.current) {
      setQueue(prev => {
        const newQueue = [...prev, ...sorted];
        // Remove duplicatas e ordena
        const unique = [...new Set(newQueue)].sort((a, b) => getPriority(b) - getPriority(a));
        saveQueue(unique);
        return unique;
      });
      return null;
    }
    
    // Marca que já mostrou nesta sessão
    shownThisSessionRef.current = true;
    
    // A mais importante aparece AGORA
    const toShowNow = sorted[0];
    const toQueue = sorted.slice(1);
    
    // Adiciona o resto na fila (removendo também toShowNow se já estava na fila)
    setQueue(prev => {
      const filteredPrev = prev.filter(id => id !== toShowNow);
      const newQueue = [...filteredPrev, ...toQueue];
      // Remove duplicatas e ordena
      const unique = [...new Set(newQueue)].sort((a, b) => getPriority(b) - getPriority(a));
      saveQueue(unique);
      return unique;
    });
    
    // Retorna a conquista para mostrar agora
    const achievement = getAchievementById(toShowNow);
    return achievement;
  }, [saveQueue]);

  /**
   * Pega próxima conquista da fila (para mostrar na próxima sessão)
   * @returns {Object|null} - Conquista ou null se fila vazia
   */
  const getNext = useCallback(() => {
    if (queue.length === 0) return null;
    
    const nextId = queue[0];
    const achievement = getAchievementById(nextId);
    
    if (achievement) {
      setCurrentAchievement(achievement);
    }
    
    return achievement;
  }, [queue]);

  /**
   * Remove conquista atual da fila (após mostrar modal)
   */
  const markAsShown = useCallback(() => {
    if (queue.length === 0) return;
    
    const [, ...rest] = queue;
    setQueue(rest);
    saveQueue(rest);
    setCurrentAchievement(null);
    
    // Registra timestamp
    if (userId) {
      localStorage.setItem(`${LAST_SHOWN_KEY}_${userId}`, Date.now().toString());
    }
  }, [queue, saveQueue, userId]);

  /**
   * Checa se pode mostrar conquista (cooldown de 1 hora entre sessões)
   */
  const canShowFromQueue = useCallback(() => {
    if (!userId || queue.length === 0) return false;
    
    const lastShown = localStorage.getItem(`${LAST_SHOWN_KEY}_${userId}`);
    if (!lastShown) return true;
    
    const hourAgo = Date.now() - (60 * 60 * 1000);
    return parseInt(lastShown) < hourAgo;
  }, [userId, queue]);

  /**
   * Limpa toda a fila (para debug/reset)
   */
  const clearQueue = useCallback(() => {
    setQueue([]);
    setCurrentAchievement(null);
    shownThisSessionRef.current = false;
    if (userId) {
      localStorage.removeItem(`${STORAGE_KEY}_${userId}`);
    }
  }, [userId]);

  return {
    queue,
    queueLength: queue.length,
    currentAchievement,
    isReady,
    
    // Actions
    addToQueue,
    getNext,
    markAsShown,
    canShowFromQueue,
    clearQueue,
    resetSessionGate,
    
    // Utils
    isSilent: (id) => SILENT_ACHIEVEMENTS.includes(id),
    getPriority,
  };
}

export default useAchievementQueue;