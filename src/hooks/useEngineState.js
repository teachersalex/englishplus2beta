import { useState, useCallback } from 'react';

/**
 * useEngineState
 * Estado comum a todas as engines
 * 
 * Responsabilidade única: gerenciar resultado e payload de conclusão
 * Cada engine mantém sua lógica específica (selected, bank, slots, etc)
 */

export function useEngineState({ 
  onComplete, 
  xpCorrect = 20, 
  xpWrong = 5 
}) {
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  /**
   * Registra verificação
   * @param {boolean} correct - Se a resposta está correta
   */
  const verify = useCallback((correct) => {
    setIsCorrect(correct);
    setShowResult(true);
    if (!correct) {
      setWrongCount(prev => prev + 1);
    }
  }, []);

  /**
   * Registra erro sem mostrar resultado
   * Útil para engines com múltiplas tentativas
   */
  const addWrong = useCallback(() => {
    setWrongCount(prev => prev + 1);
  }, []);

  /**
   * Conclui a atividade com payload padrão
   */
  const complete = useCallback(() => {
    onComplete?.({
      success: isCorrect,
      xp: isCorrect ? xpCorrect : xpWrong,
      correct: isCorrect ? 1 : 0,
      wrong: wrongCount,
    });
  }, [onComplete, isCorrect, xpCorrect, xpWrong, wrongCount]);

  /**
   * Conclui com sucesso forçado (para engines como VocabMatch que sempre completam)
   */
  const completeSuccess = useCallback(() => {
    onComplete?.({
      success: true,
      xp: xpCorrect,
      correct: 1,
      wrong: wrongCount,
    });
  }, [onComplete, xpCorrect, wrongCount]);

  return {
    // Estado
    showResult,
    isCorrect,
    wrongCount,
    
    // Ações
    verify,
    addWrong,
    complete,
    completeSuccess,
    
    // Setters diretos (para casos especiais)
    setShowResult,
    setIsCorrect,
  };
}

export default useEngineState;
