import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SHADOWS } from '../../../tokens';
import { shuffleArray } from '../../../utils/array';
import { useEngineState } from '../../../hooks/useEngineState';
import { EngineWrapper } from '../EngineWrapper';
import { EngineButton } from '../EngineButton';
import { EngineOverlay } from '../EngineOverlay';
import { EngineHeader } from '../EngineHeader';

export function CategorySort({ data, onComplete }) {
  const { label, title, instruction, categories, items, feedback } = data;

  const shuffledItems = useMemo(() => 
    shuffleArray(items.map((item, index) => ({ ...item, id: item.id ?? index }))),
    [items]
  );

  const engine = useEngineState({ onComplete });
  const [bank, setBank] = useState(shuffledItems);
  const [sorted, setSorted] = useState(() => {
    const initial = {};
    categories.forEach(cat => { initial[cat.id] = []; });
    return initial;
  });
  const [selected, setSelected] = useState(null);
  const [wrongItem, setWrongItem] = useState(null);

  const isComplete = bank.length === 0;

  const handleItemClick = (item) => {
    if (engine.showResult) return;
    if (selected?.id === item.id) {
      setSelected(null);
    } else {
      setSelected(item);
      setWrongItem(null);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (!selected || engine.showResult) return;

    if (selected.category === categoryId) {
      setBank(prev => prev.filter(i => i.id !== selected.id));
      setSorted(prev => ({ ...prev, [categoryId]: [...prev[categoryId], selected] }));
      setSelected(null);

      if (bank.length === 1) {
        engine.setShowResult(true);
        engine.setIsCorrect(true);
      }
    } else {
      setWrongItem(selected.id);
      engine.addWrong();
      setTimeout(() => {
        setWrongItem(null);
        setSelected(null);
      }, 400);
    }
  };

  const getItemStyle = (item) => {
    if (wrongItem === item.id) {
      return { backgroundColor: COLORS.errorLight, borderColor: COLORS.error, color: '#991B1B' };
    }
    if (selected?.id === item.id) {
      return { backgroundColor: COLORS.primary, borderColor: COLORS.primary, color: 'white' };
    }
    return { backgroundColor: COLORS.surface, borderColor: COLORS.border, color: COLORS.text };
  };

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
          title={feedback?.success?.title || 'Muito bem!'}
          message={feedback?.success?.text || 'Todas classificadas corretamente!'}
          onContinue={engine.completeSuccess}
        />
      }
    >
      <EngineHeader 
        label={label} 
        title={title} 
        instruction={instruction}
        defaultTitle="Classifique"
      />

      {/* Categories */}
      <div className="flex gap-3 mb-4">
        {categories.map(cat => (
          <motion.div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="flex-1 rounded-2xl p-3 min-h-[120px] border-2 border-dashed cursor-pointer"
            style={{ 
              backgroundColor: selected ? COLORS.primaryLight : COLORS.surface, 
              borderColor: selected ? COLORS.primary : COLORS.border 
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-xs uppercase tracking-wider font-bold text-center pb-2 mb-2 border-b"
              style={{ color: COLORS.textMuted, borderColor: COLORS.border }}>
              {cat.name}
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {sorted[cat.id].map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-3 py-2 rounded-lg text-center text-sm font-medium"
                    style={{ backgroundColor: COLORS.successLight, color: '#166534' }}
                  >
                    {item.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
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
              className="px-3 py-2 rounded-xl font-semibold border-2"
              style={{ ...getItemStyle(item), cursor: 'pointer' }}
              whileTap={{ scale: 0.95 }}
            >
              {item.text}
            </motion.button>
          ))}
        </AnimatePresence>
        {bank.length === 0 && (
          <span style={{ color: COLORS.textMuted }}>Todas classificadas!</span>
        )}
      </div>
    </EngineWrapper>
  );
}

export default CategorySort;
