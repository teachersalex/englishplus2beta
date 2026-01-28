import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { COLORS, SHADOWS } from '../../../tokens';
import { useEngineState } from '../../../hooks/useEngineState';
import { EngineWrapper } from '../EngineWrapper';
import { EngineButton } from '../EngineButton';
import { EngineOverlay } from '../EngineOverlay';
import { EngineHeader } from '../EngineHeader';

/**
 * ErrorDetective Engine
 * Encontre a palavra errada na frase
 */
export function ErrorDetective({ data, maxAttempts = 3, onComplete }) {
  const { label, title, instruction, sentence, errorWord, correction, feedback } = data;

  const words = useMemo(() => {
    return sentence.split(' ').map((word, index) => {
      const cleanWord = word.replace(/[.,!?]/g, '');
      return {
        id: index,
        text: word,
        clean: cleanWord,
        isError: cleanWord.toLowerCase() === errorWord.toLowerCase(),
      };
    });
  }, [sentence, errorWord]);

  const engine = useEngineState({ onComplete, xpCorrect: 25 });
  const [attempts, setAttempts] = useState(0);
  const [wrongClicks, setWrongClicks] = useState([]);
  const [foundWord, setFoundWord] = useState(null);

  const handleWordClick = (word) => {
    if (engine.showResult || wrongClicks.includes(word.id)) return;

    if (word.isError) {
      setFoundWord(word.id);
      engine.verify(true);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setWrongClicks(prev => [...prev, word.id]);
      engine.addWrong();

      if (newAttempts >= maxAttempts) {
        const errorWordObj = words.find(w => w.isError);
        if (errorWordObj) setFoundWord(errorWordObj.id);
        engine.verify(false);
      }
    }
  };

  const getWordStyle = (word) => {
    if (foundWord === word.id && word.isError) {
      return { backgroundColor: COLORS.success, color: 'white' };
    }
    if (foundWord === word.id && !engine.isCorrect) {
      return { backgroundColor: COLORS.warning, color: 'white' };
    }
    if (wrongClicks.includes(word.id)) {
      return { backgroundColor: COLORS.errorLight, color: COLORS.textMuted };
    }
    return { backgroundColor: 'transparent', color: COLORS.text };
  };

  return (
    <EngineWrapper
      showOverlay={engine.showResult}
      button={
        <EngineButton
          label="CONTINUAR"
          onClick={engine.complete}
          disabled={!engine.showResult}
          variant={engine.isCorrect ? 'success' : 'primary'}
        />
      }
      overlay={
        <EngineOverlay
          show={engine.showResult}
          success={engine.isCorrect}
          xp={engine.isCorrect ? 25 : 5}
          title={engine.isCorrect ? feedback?.success?.title : feedback?.reveal?.title || `Era "${errorWord}"!`}
          message={engine.isCorrect ? feedback?.success?.text : feedback?.reveal?.text || `O correto é "${correction}".`}
          onContinue={engine.complete}
        />
      }
    >
      <EngineHeader 
        label={label} 
        title={title} 
        instruction={instruction || 'Toque na palavra errada.'}
        defaultTitle="Encontre o erro"
      />

      {/* Attempts Indicator */}
      <div className="flex gap-2 mb-4">
        {Array.from({ length: maxAttempts }).map((_, i) => {
          let bg = COLORS.border;
          if (engine.isCorrect && engine.showResult && i >= attempts) bg = COLORS.success;
          else if (i < attempts) bg = COLORS.error;
          return <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: bg }} />;
        })}
      </div>

      <div className="p-5 rounded-2xl text-center leading-loose"
        style={{ backgroundColor: COLORS.surface, boxShadow: SHADOWS.card }}>
        {words.map(word => (
          <motion.button
            key={word.id}
            onClick={() => handleWordClick(word)}
            disabled={engine.showResult || wrongClicks.includes(word.id)}
            className="px-2 py-1 mx-1 rounded-lg font-medium text-lg"
            style={{ ...getWordStyle(word), cursor: engine.showResult || wrongClicks.includes(word.id) ? 'default' : 'pointer' }}
            whileHover={!engine.showResult && !wrongClicks.includes(word.id) ? { backgroundColor: COLORS.primaryLight } : {}}
            whileTap={!engine.showResult ? { scale: 0.95 } : {}}
          >
            {word.text}
          </motion.button>
        ))}
      </div>
    </EngineWrapper>
  );
}

export default ErrorDetective;