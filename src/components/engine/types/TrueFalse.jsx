import { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS, SHADOWS } from '../../../tokens';
import { useEngineState } from '../../../hooks/useEngineState';
import { EngineWrapper } from '../EngineWrapper';
import { EngineButton } from '../EngineButton';
import { EngineOverlay } from '../EngineOverlay';
import { EngineHeader } from '../EngineHeader';

/**
 * TrueFalse Engine
 * Atividade de Verdadeiro ou Falso
 * 
 * FIX: Lógica de estados visuais mais robusta
 * FIX: Encoding UTF-8
 */

export function TrueFalse({ data, onComplete }) {
  const { label, title, instruction, statement, correct, feedback } = data;

  const engine = useEngineState({ onComplete });
  const [selected, setSelected] = useState(null);

  const handleSelect = (value) => {
    if (engine.showResult) return;
    setSelected(value);
  };

  const handleVerify = () => {
    if (selected === null) return;
    engine.verify(selected === correct);
  };

  const getButtonStyle = (value) => {
    const isSelected = selected === value;
    const isCorrectAnswer = value === correct;

    // Após mostrar resultado
    if (engine.showResult) {
      // Sempre destaca a resposta correta em verde
      if (isCorrectAnswer) {
        return { 
          backgroundColor: COLORS.successLight, 
          borderColor: COLORS.success, 
          color: '#166534',
          opacity: 1,
        };
      }
      // Se foi a selecionada errada, mostra em vermelho
      if (isSelected && !engine.isCorrect) {
        return { 
          backgroundColor: COLORS.errorLight, 
          borderColor: COLORS.error, 
          color: '#991B1B',
          opacity: 1,
        };
      }
      // Opção não selecionada e não é a correta - fica mais apagada
      return { 
        backgroundColor: COLORS.surface, 
        borderColor: COLORS.border, 
        color: COLORS.textMuted,
        opacity: 0.5,
      };
    }

    // Durante seleção (antes de verificar)
    if (isSelected) {
      return { 
        backgroundColor: COLORS.primaryLight, 
        borderColor: COLORS.primary, 
        color: COLORS.primaryDark,
        opacity: 1,
      };
    }

    // Estado default
    return { 
      backgroundColor: COLORS.surface, 
      borderColor: COLORS.border, 
      color: COLORS.text,
      opacity: 1,
    };
  };

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
          title={engine.isCorrect ? feedback?.success?.title : null}
          message={engine.isCorrect ? feedback?.success?.text : null}
          correctAnswer={!engine.isCorrect ? (correct ? 'Verdadeiro' : 'Falso') : null}
          onContinue={engine.complete}
        />
      }
    >
      <EngineHeader 
        label={label} 
        title={title} 
        instruction={instruction || 'Analise a afirmação.'}
        defaultTitle="Verdadeiro ou Falso?"
      />

      <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: COLORS.surface, boxShadow: SHADOWS.card }}>
        <p className="text-xl font-medium text-center" style={{ color: COLORS.text }}>
          "{statement}"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[true, false].map((value) => {
          const style = getButtonStyle(value);
          return (
            <motion.button
              key={value.toString()}
              onClick={() => handleSelect(value)}
              disabled={engine.showResult}
              className="p-4 rounded-2xl font-bold text-lg border-2"
              style={{ 
                backgroundColor: style.backgroundColor,
                borderColor: style.borderColor,
                color: style.color,
                opacity: style.opacity,
                boxShadow: SHADOWS.card, 
                cursor: engine.showResult ? 'default' : 'pointer',
              }}
              whileHover={!engine.showResult ? { y: -2 } : {}}
              whileTap={!engine.showResult ? { scale: 0.98 } : {}}
            >
              {value ? '✓ Verdadeiro' : '✗ Falso'}
            </motion.button>
          );
        })}
      </div>
    </EngineWrapper>
  );
}

export default TrueFalse;