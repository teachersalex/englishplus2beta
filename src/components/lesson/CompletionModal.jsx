/**
 * CompletionModal.jsx
 * Modal de conclusão de rodada/node
 */

import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-3xl p-8 text-center max-w-sm w-full"
          >
            {/* Icon */}
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
              earnedDiamond
                ? 'bg-gradient-to-br from-cyan-400 to-blue-500'
                : 'bg-[#10B981]'
            }`}>
              <span className="text-4xl text-white">
                {earnedDiamond ? '💎' : '✓'}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-1 text-[#1E293B]">
              {isLastRound ? 'Node Completo!' : 'Rodada Completa!'}
            </h2>
            <p className="text-[#64748B] mb-5">
              Progresso: {currentRound}/{totalRounds}
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-5">
              {[1, 2, 3].map((round) => (
                <div
                  key={round}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                    round <= currentRound
                      ? 'bg-[#10B981] text-white'
                      : 'bg-[#E2E8F0] text-[#64748B]'
                  }`}
                >
                  {round <= currentRound ? '✓' : round}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3B82F6]">
                  {stats.xp}
                </div>
                <div className="text-xs text-[#64748B]">XP ganhos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#10B981]">
                  {stats.accuracy}%
                </div>
                <div className="text-xs text-[#64748B]">Precisão</div>
              </div>
            </div>

            {/* Achievement badge (if any) */}
            {achievement && (
              <div className="mb-6 p-3 bg-[#F8FAFC] rounded-xl">
                <p className="text-xs text-[#64748B] mb-2">Conquista desbloqueada:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{achievement.icon}</span>
                  <span className="font-bold text-[#1E293B]">{achievement.title}</span>
                </div>
              </div>
            )}

            {/* Continue button */}
            <button
              onClick={onContinue}
              className="w-full py-4 rounded-2xl font-bold text-lg text-white"
              style={{
                backgroundColor: '#3B82F6',
                borderBottom: '4px solid #2563EB',
              }}
            >
              Continuar
            </button>

            {/* Retry button (only on last round without diamond) */}
            {isLastRound && !earnedDiamond && (
              <button
                onClick={onRetry}
                className="w-full py-4 mt-3 bg-[#F1F5F9] text-[#1E293B] font-bold rounded-2xl"
              >
                Tentar novamente
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CompletionModal;