/**
 * CompletionModal.jsx
 * Modal de conclusão de rodada/node
 * 
 * "Temos a arte para não morrer da verdade."
 *  — Friedrich Nietzsche
 */

import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, GRADIENTS, SHADOWS } from '../../tokens';

export function CompletionModal({
  isOpen,
  stats,
  achievement,
  earnedDiamond,
  currentRound,
  totalRounds,
  onContinue,
  onRetry,
}) {
  const isLastRound = currentRound >= totalRounds;
  const isPerfect = stats?.accuracy >= 95;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          {/* Ambient glow */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              background: earnedDiamond 
                ? 'radial-gradient(ellipse at 50% 30%, rgba(6, 182, 212, 0.15), transparent 60%)'
                : 'radial-gradient(ellipse at 50% 30%, rgba(59, 130, 246, 0.12), transparent 60%)'
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative rounded-3xl p-8 text-center max-w-sm w-full overflow-hidden"
            style={{
              background: GRADIENTS.darkCard,
              boxShadow: SHADOWS.cardDark,
            }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }}
            />

            {/* Top glow */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 pointer-events-none"
              style={{ 
                background: earnedDiamond
                  ? 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 60%)'
                  : 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 60%)'
              }}
            />

            {/* Accent line */}
            <div
              className="absolute left-0 top-8 bottom-8 w-1 rounded-full pointer-events-none"
              style={{ 
                background: earnedDiamond 
                  ? 'linear-gradient(to bottom, #06b6d4, #3b82f6)'
                  : GRADIENTS.accent, 
                opacity: 0.6 
              }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 relative"
                style={{
                  background: earnedDiamond
                    ? 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)'
                    : isPerfect 
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  boxShadow: earnedDiamond
                    ? '0 20px 40px -10px rgba(6, 182, 212, 0.5)'
                    : isPerfect
                      ? '0 20px 40px -10px rgba(16, 185, 129, 0.5)'
                      : '0 20px 40px -10px rgba(59, 130, 246, 0.5)',
                }}
              >
                {/* Shine effect */}
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '200%', opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none rounded-2xl overflow-hidden"
                />
                <span className="text-5xl relative z-10">
                  {earnedDiamond ? '💎' : isPerfect ? '⭐' : '✓'}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold mb-2"
                style={{ color: COLORS.textLight }}
              >
                {isLastRound ? 'Node Completo!' : 'Rodada Completa!'}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                style={{ color: COLORS.textDark }}
              >
                Progresso: {currentRound}/{totalRounds}
              </motion.p>

              {/* Progress dots */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center gap-3 my-6"
              >
                {[1, 2, 3].map((round) => {
                  const isCompleted = round <= currentRound;
                  return (
                    <motion.div
                      key={round}
                      initial={isCompleted && round === currentRound ? { scale: 0 } : {}}
                      animate={isCompleted && round === currentRound ? { scale: 1 } : {}}
                      transition={{ type: 'spring', damping: 10, delay: 0.4 + round * 0.1 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                      style={{
                        backgroundColor: isCompleted 
                          ? COLORS.success 
                          : 'rgba(255, 255, 255, 0.1)',
                        color: isCompleted ? 'white' : COLORS.textDark,
                        boxShadow: isCompleted 
                          ? '0 4px 12px rgba(16, 185, 129, 0.4)' 
                          : 'none',
                      }}
                    >
                      {isCompleted ? '✓' : round}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-6 mb-6"
              >
                <div 
                  className="text-center px-6 py-4 rounded-2xl"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                >
                  <div 
                    className="text-3xl font-bold"
                    style={{ color: COLORS.primary }}
                  >
                    {stats?.xp || 0}
                  </div>
                  <div className="text-xs mt-1" style={{ color: COLORS.textDark }}>
                    XP ganhos
                  </div>
                </div>
                <div 
                  className="text-center px-6 py-4 rounded-2xl"
                  style={{ 
                    backgroundColor: isPerfect 
                      ? 'rgba(16, 185, 129, 0.1)' 
                      : 'rgba(255, 255, 255, 0.05)' 
                  }}
                >
                  <div 
                    className="text-3xl font-bold"
                    style={{ color: isPerfect ? COLORS.success : COLORS.textLight }}
                  >
                    {stats?.accuracy || 0}%
                  </div>
                  <div className="text-xs mt-1" style={{ color: COLORS.textDark }}>
                    Precisão
                  </div>
                </div>
              </motion.div>

              {/* Achievement badge (if any) */}
              {achievement && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6 p-4 rounded-2xl"
                  style={{ 
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                  }}
                >
                  <p className="text-xs mb-2" style={{ color: COLORS.secondary }}>
                    Conquista desbloqueada
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <span className="font-bold" style={{ color: COLORS.textLight }}>
                      {achievement.title}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Continue button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onContinue}
                className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all"
                style={{
                  background: GRADIENTS.blue,
                  boxShadow: SHADOWS.button,
                }}
              >
                Continuar
              </motion.button>

              {/* Retry button (only on last round without diamond) */}
              {isLastRound && !earnedDiamond && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onRetry}
                  className="w-full py-4 mt-3 rounded-2xl font-bold transition-all"
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: COLORS.textLight,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  Tentar novamente
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CompletionModal;