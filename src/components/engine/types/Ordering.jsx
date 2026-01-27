import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SHADOWS } from '../../../tokens';
import { shuffleUntilDifferent } from '../../../utils/array';
import { useEngineState } from '../../../hooks/useEngineState';
import { EngineWrapper } from '../EngineWrapper';
import { EngineButton } from '../EngineButton';
import { EngineOverlay } from '../EngineOverlay';
import { EngineHeader } from '../EngineHeader';

export function Ordering({ data, onComplete }) {
  const { label, title, instruction, items, feedback } = data;

  const shuffledItems = useMemo(() => 
    shuffleUntilDifferent(items.map((item, index) => ({ ...item, id: item.id ?? index }))),
    [items]
  );

  const engine = useEngineState({ onComplete, xpCorrect: 25 });
  const [bank, setBank] = useState(shuffledItems);
  const [slots, setSlots] = useState(Array(items.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [results, setResults] = useState(null);

  const handleItemClick = (item) => {
    if (engine.showResult) return;
    if (selected?.id === item.id) {
      setSelected(null);
    } else {
      setSelected(item);
    }
  };

  const handleSlotClick = (slotIndex) => {
    if (!selected || engine.showResult || slots[slotIndex] !== null) return;

    const nextBank = bank.filter(i => i.id !== selected.id);
    const nextSlots = [...slots];
    nextSlots[slotIndex] = selected;

    setBank(nextBank);
    setSlots(nextSlots);
    setSelected(null);

    if (nextSlots.every(s => s !== null)) {
      const correct = [];
      const wrong = [];
      nextSlots.forEach((item, index) => {
        if (item.order === index + 1) {
          correct.push(index);
        } else {
          wrong.push(index);
        }
      });

      setResults({ correct, wrong });
      engine.verify(wrong.length === 0);
    }
  };

  const isSuccess = results?.wrong.length === 0;

  const getSlotStyle = (index) => {
    if (results?.correct.includes(index)) {
      return { backgroundColor: COLORS.successLight, borderColor: COLORS.success };
    }
    if (results?.wrong.includes(index)) {
      return { backgroundColor: COLORS.errorLight, borderColor: COLORS.error };
    }
    if (slots[index]) {
      return { backgroundColor: COLORS.surface, borderColor: COLORS.primary };
    }
    if (selected) {
      return { backgroundColor: COLORS.primaryLight, borderColor: COLORS.primary };
    }
    return { backgroundColor: COLORS.surface, borderColor: COLORS.border };
  };

  const getNumberStyle = (index) => {
    if (results?.correct.includes(index)) {
      return { backgroundColor: COLORS.success, color: 'white' };
    }
    if (results?.wrong.includes(index)) {
      return { backgroundColor: COLORS.error, color: 'white' };
    }
    if (slots[index]) {
      return { backgroundColor: COLORS.primary, color: 'white' };
    }
    return { backgroundColor: COLORS.border, color: COLORS.textMuted };
  };

  return (
    <EngineWrapper
      showOverlay={engine.showResult}
      button={
        <EngineButton
          label="CONTINUAR"
          onClick={engine.complete}
          disabled={!engine.showResult}
          variant={isSuccess ? 'success' : 'primary'}
        />
      }
      overlay={
        <EngineOverlay
          show={engine.showResult}
          success={isSuccess}
          xp={isSuccess ? 25 : 5}
          title={isSuccess ? feedback?.success?.title : feedback?.error?.title || 'Quase!'}
          message={isSuccess ? feedback?.success?.text : feedback?.error?.text || 'Algumas posições incorretas.'}
          onContinue={engine.complete}
        />
      }
    >
      <EngineHeader 
        label={label} 
        title={title} 
        instruction={instruction || 'Coloque os itens na ordem correta.'}
        defaultTitle="Organize"
      />

      {/* Slots */}
      <div className="space-y-3 mb-4">
        {slots.map((slot, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
              style={getNumberStyle(index)}>
              {index + 1}
            </span>
            <motion.div
              onClick={() => handleSlotClick(index)}
              className="flex-1 min-h-[48px] border-2 border-dashed rounded-2xl flex items-center justify-center p-3 cursor-pointer"
              style={getSlotStyle(index)}
              whileTap={!engine.showResult && !slots[index] ? { scale: 0.98 } : {}}
            >
              {slot ? (
                <span className="font-semibold" style={{ color: COLORS.text }}>{slot.text}</span>
              ) : (
                <span style={{ color: COLORS.textMuted }}>Toque para adicionar</span>
              )}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Item Bank */}
      <div className="flex flex-wrap gap-2 justify-center p-4 rounded-2xl min-h-[60px]"
        style={{ backgroundColor: COLORS.surface, boxShadow: SHADOWS.card }}>
        <AnimatePresence>
          {bank.map(item => (
            <motion.button
              key={item.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={() => handleItemClick(item)}
              disabled={engine.showResult}
              className="px-4 py-2 rounded-xl font-semibold border-2"
              style={{
                backgroundColor: selected?.id === item.id ? COLORS.primary : COLORS.surface,
                borderColor: selected?.id === item.id ? COLORS.primary : COLORS.border,
                color: selected?.id === item.id ? 'white' : COLORS.text,
              }}
              whileTap={{ scale: 0.95 }}
            >
              {item.text}
            </motion.button>
          ))}
        </AnimatePresence>
        {bank.length === 0 && !engine.showResult && (
          <span style={{ color: COLORS.textMuted }}>Todas posicionadas!</span>
        )}
      </div>
    </EngineWrapper>
  );
}

export default Ordering;
