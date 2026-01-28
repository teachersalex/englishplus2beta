import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SHADOWS } from '../../tokens';
import { EngineButton } from './EngineButton';

/**
 * EngineOverlay
 * Overlay de resultado com feedback visual e sonoro
 * 
 * FIX: Adicionado som soft_pop.mp3 no botão Continuar
 * FIX: Encoding UTF-8
 */

// Som de confirmação
const playPopSound = () => {
  try {
    const audio = new Audio('/audio/soft_pop.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {}
};

export function EngineOverlay({
  show = false,
  success = true,
  xp = 20,
  title,
  message,
  correctAnswer,
  onContinue,
}) {
  const displayTitle = title || (success ? 'Correto! ✓' : 'Ops! ✗');
  const displayMessage = message || (
    success 
      ? 'Muito bem!' 
      : correctAnswer 
        ? `A resposta certa é: ${correctAnswer}`
        : 'Tente novamente na próxima!'
  );

  // Handler que toca som e chama onContinue
  const handleContinue = () => {
    playPopSound();
    onContinue?.();
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 z-50"
          style={{ backgroundColor: COLORS.surface, boxShadow: '0 -10px 40px rgba(0,0,0,0.1)' }}
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 
                  className="text-xl font-extrabold"
                  style={{ color: success ? COLORS.success : COLORS.error }}
                >
                  {displayTitle}
                </h3>
                <p style={{ color: COLORS.textMuted }} className="mt-1">
                  {displayMessage}
                </p>
              </div>
              
              {success && xp > 0 && (
                <div 
                  className="px-4 py-2 rounded-xl font-extrabold"
                  style={{ 
                    backgroundColor: COLORS.warningLight,
                    color: '#D97706',
                  }}
                >
                  +{xp} XP
                </div>
              )}
            </div>

            <EngineButton
              label="CONTINUAR"
              variant={success ? 'success' : 'primary'}
              onClick={handleContinue}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EngineOverlay;