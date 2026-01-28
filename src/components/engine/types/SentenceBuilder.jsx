import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SHADOWS } from '../../../tokens';
import { shuffleUntilDifferent } from '../../../utils/array';
import { useEngineState } from '../../../hooks/useEngineState';
import { EngineWrapper } from '../EngineWrapper';
import { EngineButton } from '../EngineButton';
import { EngineOverlay } from '../EngineOverlay';
import { EngineHeader } from '../EngineHeader';

function normalizeForComparison(str) {
  return str.trim().replace(/\s+/g, ' ').replace(/[""]/g, '"').replace(/['']/g, "'").toLowerCase();
}

/**
 * SentenceBuilder Engine
 * Monte a frase na ordem correta
 */
export function SentenceBuilder({ data, onComplete }) {
  const { label, title, instruction, context, words, correct, alternatives, feedback } = data;

  const acceptedAnswers = useMemo(() => {
    const all = [correct, ...(alternatives || [])];
    return all.map(normalizeForComparison);
  }, [correct, alternatives]);

  const shuffledWords = useMemo(() => 
    shuffleUntilDifferent(words.map((word, index) => ({ id: index, text: word }))),
    [words]
  );

  const engine = useEngineState({ onComplete });
  const [dropzone, setDropzone] = useState([]);
  const [bank, setBank] = useState(shuffledWords);
  const [dropzoneState, setDropzoneState] = useState('empty');

  const handleWordClick = (wordObj, fromDropzone) => {
    if (engine.showResult) return;

    if (fromDropzone) {
      setDropzone(prev => prev.filter(w => w.id !== wordObj.id));
      setBank(prev => [...prev, wordObj]);
      setDropzoneState(dropzone.length <= 1 ? 'empty' : 'active');
    } else {
      const nextDropzone = [...dropzone, wordObj];
      setBank(prev => prev.filter(w => w.id !== wordObj.id));
      setDropzone(nextDropzone);
      setDropzoneState('active');
    }
  };

  const handleVerify = () => {
    if (dropzone.length !== words.length) return;

    const sentence = dropzone.map(w => w.text).join(' ');
    const normalized = normalizeForComparison(sentence);

    if (acceptedAnswers.includes(normalized)) {
      engine.verify(true);
      setDropzoneState('correct');
    } else {
      engine.addWrong();
      setDropzoneState('wrong');
      setTimeout(() => setDropzoneState('active'), 300);
    }
  };

  const getDropzoneStyle = () => {
    if (dropzoneState === 'correct') {
      return { backgroundColor: COLORS.successLight, borderColor: COLORS.success };
    }
    if (dropzoneState === 'wrong') {
      return { backgroundColor: COLORS.errorLight, borderColor: COLORS.error };
    }
    return { backgroundColor: COLORS.surface, borderColor: COLORS.border };
  };

  return (
    <EngineWrapper
      showOverlay={engine.showResult}
      button={
        <EngineButton
          label="VERIFICAR"
          onClick={handleVerify}
          disabled={dropzone.length !== words.length}
        />
      }
      overlay={
        <EngineOverlay
          show={engine.showResult}
          success={engine.isCorrect}
          xp={engine.isCorrect ? 20 : 5}
          title={engine.isCorrect ? feedback?.success?.title : null}
          message={engine.isCorrect ? feedback?.success?.text : null}
          correctAnswer={!engine.isCorrect ? correct : null}
          onContinue={engine.complete}
        />
      }
    >
      <EngineHeader 
        label={label} 
        title={title} 
        instruction={instruction || 'Organize as palavras na ordem correta.'}
        defaultTitle="Monte a frase"
      />

      {/* Context */}
      {context && (
        <div className="p-3 rounded-xl mb-4 border-l-4" 
          style={{ backgroundColor: COLORS.surface, borderColor: COLORS.primary }}>
          <span className="font-bold" style={{ color: COLORS.text }}>Situação: </span>
          <span style={{ color: COLORS.textMuted }}>{context}</span>
        </div>
      )}

      {/* Dropzone */}
      <div 
        className="min-h-[60px] rounded-2xl p-4 flex flex-wrap gap-2 items-center justify-center border-2 border-dashed mb-4"
        style={getDropzoneStyle()}
      >
        {dropzone.length === 0 ? (
          <span style={{ color: COLORS.textMuted }}>Toque nas palavras abaixo...</span>
        ) : (
          <AnimatePresence>
            {dropzone.map((wordObj) => (
              <motion.button
                key={`dz-${wordObj.id}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={() => handleWordClick(wordObj, true)}
                disabled={engine.showResult}
                className="px-3 py-2 rounded-xl font-semibold"
                style={{ backgroundColor: COLORS.primary, color: 'white' }}
              >
                {wordObj.text}
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Word Bank */}
      <div className="flex flex-wrap gap-2 justify-center min-h-[50px]">
        <AnimatePresence>
          {bank.map((wordObj) => (
            <motion.button
              key={`bank-${wordObj.id}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => handleWordClick(wordObj, false)}
              disabled={engine.showResult}
              className="px-3 py-2 rounded-xl font-semibold border-2"
              style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border, color: COLORS.text, boxShadow: SHADOWS.card }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {wordObj.text}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </EngineWrapper>
  );
}

export default SentenceBuilder;