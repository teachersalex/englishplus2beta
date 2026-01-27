import { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS, SHADOWS } from '../../../tokens';
import { useEngineState } from '../../../hooks/useEngineState';
import { EngineWrapper } from '../EngineWrapper';
import { EngineButton } from '../EngineButton';
import { EngineOverlay } from '../EngineOverlay';
import { EngineHeader } from '../EngineHeader';

export function FillGap({ data, onComplete }) {
  const { label, title, instruction, sentence, correct, options, feedback } = data;

  const engine = useEngineState({ onComplete });
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    if (engine.showResult) return;
    setSelected(option);
  };

  const handleVerify = () => {
    if (!selected) return;
    engine.verify(selected === correct);
  };

  const getOptionStyle = (option) => {
    const isSelected = selected === option;
    const isCorrectOption = option === correct;

    if (engine.showResult && isCorrectOption) {
      return { backgroundColor: COLORS.successLight, borderColor: COLORS.success, color: '#166534' };
    }
    if (engine.showResult && isSelected && !engine.isCorrect) {
      return { backgroundColor: COLORS.errorLight, borderColor: COLORS.error, color: '#991B1B' };
    }
    if (isSelected) {
      return { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary, color: COLORS.primaryDark };
    }
    return { backgroundColor: COLORS.surface, borderColor: 'transparent', color: COLORS.text };
  };

  const parts = sentence.split('___');
  const gapStyle = !selected 
    ? { borderColor: COLORS.border, backgroundColor: 'transparent', color: COLORS.textMuted }
    : engine.showResult
      ? { borderColor: engine.isCorrect ? COLORS.success : COLORS.error, backgroundColor: engine.isCorrect ? COLORS.successLight : COLORS.errorLight, color: engine.isCorrect ? '#166534' : '#991B1B' }
      : { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight, color: COLORS.primaryDark };

  return (
    <EngineWrapper
      showOverlay={engine.showResult}
      button={
        <EngineButton
          label="VERIFICAR"
          onClick={handleVerify}
          disabled={!selected}
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
        instruction={instruction || 'Escolha a opção correta.'}
        defaultTitle="Complete a frase"
      />

      <div 
        className="p-5 rounded-2xl mb-6"
        style={{ backgroundColor: COLORS.surface, boxShadow: SHADOWS.card }}
      >
        <p className="text-xl font-medium leading-relaxed" style={{ color: COLORS.text }}>
          {parts[0]}
          <span 
            className="inline-block min-w-[80px] mx-1 px-3 py-1 rounded-lg border-2 border-dashed text-center"
            style={gapStyle}
          >
            {selected || '______'}
          </span>
          {parts[1]}
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(option)}
            disabled={engine.showResult}
            className="w-full p-4 rounded-2xl text-left font-semibold border-2"
            style={{ ...getOptionStyle(option), boxShadow: SHADOWS.card, cursor: engine.showResult ? 'default' : 'pointer' }}
            whileHover={!engine.showResult ? { y: -2 } : {}}
            whileTap={!engine.showResult ? { scale: 0.98 } : {}}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </EngineWrapper>
  );
}

export default FillGap;
