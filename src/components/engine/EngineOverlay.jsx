import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, SHADOWS } from '../../tokens';
import { EngineButton } from './EngineButton';

/**
 * EngineOverlay
 * Overlay de resultado com feedback visual e sonoro
 */

const playPopSound = () => {
  try {
    const audio = new Audio('/audio/soft_pop.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {});
  } catch (e) {}
};

// Ícone de sucesso animado
function SuccessIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
      className="relative w-14 h-14 rounded-full flex items-center justify-center"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.success}, #059669)`,
        boxShadow: `0 4px 20px ${COLORS.success}40`,
      }}
    >
      <motion.svg 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.path 
          d="M5 13l4 4L19 7" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
      </motion.svg>
      
      {/* Partículas */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.cos(i * 60 * Math.PI / 180) * 40,
            y: Math.sin(i * 60 * Math.PI / 180) * 40,
          }}
          transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: COLORS.success }}
        />
      ))}
    </motion.div>
  );
}

// Ícone de erro
function ErrorIcon() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', damping: 12, stiffness: 200 }}
      className="w-14 h-14 rounded-full flex items-center justify-center"
      style={{ 
        background: `linear-gradient(135deg, ${COLORS.error}, #DC2626)`,
        boxShadow: `0 4px 20px ${COLORS.error}40`,
      }}
    >
      <motion.svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <path 
          d="M18 6L6 18M6 6l12 12" 
          stroke="white" 
          strokeWidth="3" 
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export function EngineOverlay({
  show = false,
  success = true,
  xp = 20,
  title,
  message,
  correctAnswer,
  onContinue,
}) {
  const displayTitle = title || (success ? 'Muito bem!' : 'Quase lá!');
  const displayMessage = message || (
    success 
      ? 'Continue assim!' 
      : correctAnswer 
        ? `Resposta: ${correctAnswer}`
        : 'Tente novamente na próxima!'
  );

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
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 rounded-t-3xl p-6 z-50"
          style={{ 
            backgroundColor: COLORS.surface, 
            boxShadow: '0 -10px 40px rgba(0,0,0,0.12)',
            borderTop: `4px solid ${success ? COLORS.success : COLORS.error}`,
          }}
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-5">
              {/* Ícone animado */}
              {success ? <SuccessIcon /> : <ErrorIcon />}
              
              <div className="flex-1">
                <h3 
                  className="text-xl font-extrabold"
                  style={{ color: success ? COLORS.success : COLORS.error }}
                >
                  {displayTitle}
                </h3>
                <p style={{ color: COLORS.textMuted }} className="text-sm mt-0.5">
                  {displayMessage}
                </p>
              </div>
              
              {success && xp > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="px-4 py-2 rounded-xl font-extrabold"
                  style={{ 
                    background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                    color: '#D97706',
                    boxShadow: '0 2px 8px rgba(251, 191, 36, 0.3)',
                  }}
                >
                  +{xp} XP
                </motion.div>
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