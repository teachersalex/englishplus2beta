import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { COLORS, SHADOWS } from '../../../tokens';
import { shuffleUntilDifferent } from '../../../utils/array';
import { useEngineState } from '../../../hooks/useEngineState';
import { EngineWrapper } from '../EngineWrapper';
import { EngineButton } from '../EngineButton';
import { EngineOverlay } from '../EngineOverlay';
import { EngineHeader } from '../EngineHeader';

/**
 * VocabMatch Engine
 * Conecte pares de vocabulário (PT ↔ EN)
 * 
 * FIX: Usando shuffleUntilDifferent para garantir que a coluna direita
 *      tenha ordem diferente da esquerda
 */

export function VocabMatch({ data, onComplete }) {
  const { label, title, instruction, pairs, feedback } = data;

  const pairsWithId = useMemo(() => 
    pairs.map((pair, index) => ({ ...pair, id: index })), [pairs]
  );

  // FIX: Usar shuffleUntilDifferent ao invés de shuffleArray
  const shuffledRight = useMemo(() => shuffleUntilDifferent(pairsWithId), [pairsWithId]);

  const engine = useEngineState({ onComplete });
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matched, setMatched] = useState([]);
  const [wrongPair, setWrongPair] = useState(null);

  const isComplete = matched.length === pairs.length;

  const handleLeftClick = (pair) => {
    if (matched.includes(pair.id) || engine.showResult) return;
    setSelectedLeft(pair);
    setWrongPair(null);

    if (selectedRight) {
      checkMatch(pair, selectedRight);
    }
  };

  const handleRightClick = (pair) => {
    if (matched.includes(pair.id) || engine.showResult) return;
    setSelectedRight(pair);
    setWrongPair(null);

    if (selectedLeft) {
      checkMatch(selectedLeft, pair);
    }
  };

  const checkMatch = (left, right) => {
    if (left.id === right.id) {
      setMatched(prev => [...prev, left.id]);
      setSelectedLeft(null);
      setSelectedRight(null);
      
      if (matched.length + 1 === pairs.length) {
        engine.setShowResult(true);
        engine.setIsCorrect(true);
      }
    } else {
      setWrongPair({ left: left.id, right: right.id });
      engine.addWrong();
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongPair(null);
      }, 500);
    }
  };

  const getLeftStyle = (pair) => {
    if (matched.includes(pair.id)) {
      return { backgroundColor: COLORS.successLight, borderColor: COLORS.success, color: '#166534', opacity: 0.6 };
    }
    if (wrongPair?.left === pair.id) {
      return { backgroundColor: COLORS.errorLight, borderColor: COLORS.error, color: '#991B1B' };
    }
    if (selectedLeft?.id === pair.id) {
      return { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary, color: COLORS.primaryDark };
    }
    return { backgroundColor: COLORS.surface, borderColor: COLORS.border, color: COLORS.text };
  };

  const getRightStyle = (pair) => {
    if (matched.includes(pair.id)) {
      return { backgroundColor: COLORS.successLight, borderColor: COLORS.success, color: '#166534', opacity: 0.6 };
    }
    if (wrongPair?.right === pair.id) {
      return { backgroundColor: COLORS.errorLight, borderColor: COLORS.error, color: '#991B1B' };
    }
    if (selectedRight?.id === pair.id) {
      return { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary, color: COLORS.primaryDark };
    }
    return { backgroundColor: COLORS.surface, borderColor: COLORS.border, color: COLORS.text };
  };

  const getPortuguese = (pair) => pair.portuguese || pair.pt;
  const getEnglish = (pair) => pair.english || pair.en;

  return (
    <EngineWrapper
      showOverlay={engine.showResult}
      button={
        <EngineButton
          label="CONTINUAR"
          onClick={engine.completeSuccess}
          disabled={!isComplete}
          variant="success"
        />
      }
      overlay={
        <EngineOverlay
          show={engine.showResult}
          success={true}
          xp={20}
          title={feedback?.success?.title || 'Perfeito!'}
          message={feedback?.success?.text || 'Todos os pares conectados!'}
          onContinue={engine.completeSuccess}
        />
      }
    >
      <EngineHeader 
        label={label} 
        title={title} 
        instruction={instruction || 'Toque em um item de cada coluna para conectar.'}
        defaultTitle="Conecte os pares"
      />

      {/* Columns */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          {pairsWithId.map((pair) => (
            <motion.button
              key={`left-${pair.id}`}
              onClick={() => handleLeftClick(pair)}
              disabled={matched.includes(pair.id)}
              className="w-full p-4 rounded-2xl font-semibold border-2 text-center"
              style={{ ...getLeftStyle(pair), boxShadow: SHADOWS.card, cursor: matched.includes(pair.id) ? 'default' : 'pointer' }}
              whileHover={!matched.includes(pair.id) ? { y: -2 } : {}}
              whileTap={!matched.includes(pair.id) ? { scale: 0.98 } : {}}
            >
              {getPortuguese(pair)}
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          {shuffledRight.map((pair) => (
            <motion.button
              key={`right-${pair.id}`}
              onClick={() => handleRightClick(pair)}
              disabled={matched.includes(pair.id)}
              className="w-full p-4 rounded-2xl font-semibold border-2 text-center"
              style={{ ...getRightStyle(pair), boxShadow: SHADOWS.card, cursor: matched.includes(pair.id) ? 'default' : 'pointer' }}
              whileHover={!matched.includes(pair.id) ? { y: -2 } : {}}
              whileTap={!matched.includes(pair.id) ? { scale: 0.98 } : {}}
            >
              {getEnglish(pair)}
            </motion.button>
          ))}
        </div>
      </div>
    </EngineWrapper>
  );
}

export default VocabMatch;