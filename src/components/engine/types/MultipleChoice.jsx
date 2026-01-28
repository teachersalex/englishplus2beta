import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SHADOWS } from '../../../tokens';
import { useEngineState } from '../../../hooks/useEngineState';
import { EngineWrapper } from '../EngineWrapper';
import { EngineButton } from '../EngineButton';
import { EngineOverlay } from '../EngineOverlay';
import { EngineHeader } from '../EngineHeader';

export function MultipleChoice({ data, maxAttempts = 2, onComplete }) {
  const { label, title, instruction, question, options, feedback } = data;

  const engine = useEngineState({ onComplete });
  const [selected, setSelected] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [disabled, setDisabled] = useState([]);
  const [showTryAgain, setShowTryAgain] = useState(false);
  const [shakeIndex, setShakeIndex] = useState(null);

  const correctOption = useMemo(() => options?.find(opt => opt.correct), [options]);
  const correctIndex = useMemo(() => options?.findIndex(opt => opt.correct) ?? -1, [options]);

  if (!correctOption) {
    return (
      <EngineWrapper button={null} overlay={null}>
        <div className="p-5 rounded-2xl text-center" style={{ backgroundColor: COLORS.errorLight }}>
          <p style={{ color: COLORS.error }}>Erro: atividade sem opção correta definida.</p>
          <button
            onClick={() => onComplete?.({ success: false, xp: 0, correct: 0, wrong: 0 })}
            className="mt-4 px-4 py-2 rounded-lg font-medium"
            style={{ backgroundColor: COLORS.border, color: COLORS.text }}
          >
            Pular atividade
          </button>
        </div>
      </EngineWrapper>
    );
  }

  const handleSelect = (index) => {
    if (engine.showResult || disabled.includes(index)) return;
    setSelected(index);
    setShowTryAgain(false);
  };

  const handleVerify = () => {
    if (selected === null) return;

    const acertou = options[selected].correct;
    
    if (acertou) {
      engine.verify(true);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Shake animation na opção errada
      setShakeIndex(selected);
      setTimeout(() => setShakeIndex(null), 500);
      
      setDisabled(prev => [...prev, selected]);
      engine.addWrong();

      if (newAttempts >= maxAttempts) {
        engine.verify(false);
        setSelected(correctIndex);
      } else {
        setSelected(null);
        setShowTryAgain(true);
      }
    }
  };

  const getOptionStyle = (index) => {
    const option = options[index];
    const isSelected = selected === index;
    const isDisabled = disabled.includes(index);

    if (engine.showResult && option.correct) {
      return { backgroundColor: COLORS.successLight, borderColor: COLORS.success, color: '#166534' };
    }
    if (isDisabled) {
      return { backgroundColor: '#FEE2E2', borderColor: '#FECACA', color: '#991B1B', opacity: 0.6 };
    }
    if (isSelected) {
      return { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary, color: COLORS.primaryDark };
    }
    return { backgroundColor: COLORS.surface, borderColor: COLORS.border, color: COLORS.text };
  };

  const remainingAttempts = maxAttempts - attempts;

  return (
    <EngineWrapper
      showOverlay={engine.showResult}
      button={
        <EngineButton
          label="VERIFICAR"
          onClick={handleVerify}
          disabled={selected === null}
        />
      }
      overlay={
        <EngineOverlay
          show={engine.showResult}
          success={engine.isCorrect}
          xp={engine.isCorrect ? 20 : 5}
          title={engine.isCorrect ? feedback?.success?.title : feedback?.reveal?.title}
          message={engine.isCorrect ? feedback?.success?.text : feedback?.reveal?.text}
          correctAnswer={!engine.isCorrect ? correctOption?.text : null}
          onContinue={engine.complete}
        />
      }
    >
      <EngineHeader 
        label={label} 
        title={title} 
        instruction={instruction}
        defaultTitle="Escolha a resposta"
      />

      {question && (
        <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: COLORS.surface, boxShadow: SHADOWS.card }}>
          <p className="text-lg font-medium text-center" style={{ color: COLORS.text }}>
            {question}
          </p>
        </div>
      )}

      {/* Feedback de tentativa errada */}
      <AnimatePresence>
        {showTryAgain && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-4 p-3 rounded-xl text-center"
            style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D' }}
          >
            <p className="font-medium" style={{ color: '#92400E' }}>
              Não é essa! Tente novamente.
            </p>
            <p className="text-sm mt-1" style={{ color: '#A16207' }}>
              {remainingAttempts === 1 ? 'Última tentativa!' : `${remainingAttempts} tentativas restantes`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={engine.showResult || disabled.includes(index)}
            className="w-full p-4 rounded-2xl text-left font-semibold border-2"
            style={{ 
              ...getOptionStyle(index), 
              boxShadow: SHADOWS.card, 
              cursor: engine.showResult || disabled.includes(index) ? 'not-allowed' : 'pointer' 
            }}
            whileHover={!engine.showResult && !disabled.includes(index) ? { y: -2 } : {}}
            whileTap={!engine.showResult && !disabled.includes(index) ? { scale: 0.98 } : {}}
            animate={shakeIndex === index ? { x: [0, -10, 10, -10, 10, 0] } : {}}
            transition={shakeIndex === index ? { duration: 0.4 } : {}}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </EngineWrapper>
  );
}

export default MultipleChoice;