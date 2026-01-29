/**
 * EpisodeCompletedModal.jsx
 * Modal de celebração quando completa um episódio de história
 * 
 * "Stories are a communal currency of humanity."
 *  — Tahir Shah
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, GRADIENTS, SHADOWS } from '../../tokens';

export default function EpisodeCompletedModal({
  isOpen,
  onClose,
  onNextEpisode,
  onBackToSeries,
  onRetry,
  score,
  episodeTitle,
  episodeNumber,
  totalEpisodes,
  seriesTitle,
  isNewRecord = false,
  previousBest = 0,
  seriesAverage = null,
  isSeriesComplete = false,
}) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 700),
      setTimeout(() => setPhase(4), 1000),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  const getScoreTheme = () => {
    if (score >= 95) return { 
      color: COLORS.success, 
      glow: 'rgba(16, 185, 129, 0.4)',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      emoji: '🎯', 
      msg: 'Excelente!' 
    };
    if (score >= 80) return { 
      color: COLORS.primary, 
      glow: 'rgba(59, 130, 246, 0.4)',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      emoji: '👍', 
      msg: 'Muito bom!' 
    };
    if (score >= 60) return { 
      color: COLORS.warning, 
      glow: 'rgba(245, 158, 11, 0.4)',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      emoji: '💪', 
      msg: 'Bom trabalho!' 
    };
    return { 
      color: '#64748b', 
      glow: 'rgba(100, 116, 139, 0.3)',
      gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      emoji: '📚', 
      msg: 'Continue praticando!' 
    };
  };

  const theme = getScoreTheme();
  const hasNextEpisode = episodeNumber < totalEpisodes;
  const hasDiamond = seriesAverage >= 95;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(15,23,42,0.95) 100%)',
          }}
        />

        {/* Radial glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 40% at 50% 20%, ${theme.glow}, transparent 60%)`,
          }}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm rounded-3xl overflow-hidden"
          style={{
            background: GRADIENTS.darkCard,
            boxShadow: SHADOWS.cardDark,
          }}
        >
          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />

          {/* Accent line */}
          <div
            className="absolute left-0 top-6 bottom-6 w-1 rounded-full pointer-events-none"
            style={{ background: theme.gradient, opacity: 0.6 }}
          />

          {/* Header */}
          <div className="relative px-6 pt-8 pb-6 text-center">
            {/* Emoji */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={phase >= 1 ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
              className="text-6xl mb-4"
            >
              {theme.emoji}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              className="text-2xl font-bold mb-1"
              style={{ color: COLORS.textLight }}
            >
              Episódio Completo!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              className="text-sm"
              style={{ color: COLORS.textDark }}
            >
              {episodeTitle}
            </motion.p>
          </div>

          {/* Score section */}
          <div className="px-6 pb-6">
            {/* Score card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
              className="rounded-2xl p-5 text-center mb-4 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.color}15, ${theme.color}08)`,
                border: `1px solid ${theme.color}30`,
              }}
            >
              {/* Shine */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={phase >= 2 ? { x: '200%' } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
              />

              <p
                className="text-sm font-semibold mb-2"
                style={{ color: theme.color }}
              >
                {theme.msg}
              </p>
              <p
                className="text-5xl font-black"
                style={{ color: theme.color }}
              >
                {score}%
              </p>

              {isNewRecord && previousBest > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: COLORS.success,
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  🏆 Novo Recorde! (antes: {previousBest}%)
                </motion.div>
              )}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
              className="grid grid-cols-2 gap-3 mb-4"
            >
              <div
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <p className="text-xs mb-1" style={{ color: COLORS.textDark }}>
                  Progresso
                </p>
                <p className="text-xl font-bold" style={{ color: COLORS.textLight }}>
                  {episodeNumber}/{totalEpisodes}
                </p>
                <p className="text-xs" style={{ color: COLORS.textDark }}>
                  episódios
                </p>
              </div>

              <div
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
              >
                <p className="text-xs mb-1" style={{ color: COLORS.textDark }}>
                  Média
                </p>
                <p
                  className="text-xl font-bold"
                  style={{
                    color: hasDiamond ? COLORS.success :
                           seriesAverage >= 70 ? COLORS.primary : COLORS.textLight,
                  }}
                >
                  {seriesAverage !== null ? `${seriesAverage}%` : '—'}
                </p>
                <p className="text-xs" style={{ color: COLORS.textDark }}>
                  da série
                </p>
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
              className="mb-4"
            >
              <div className="flex gap-1.5">
                {Array.from({ length: totalEpisodes }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0 }}
                    animate={phase >= 3 ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.05 * i }}
                    className="h-2 flex-1 rounded-full origin-left"
                    style={{
                      backgroundColor: i < episodeNumber
                        ? (hasDiamond ? COLORS.success : COLORS.primary)
                        : 'rgba(255, 255, 255, 0.1)',
                      boxShadow: i < episodeNumber
                        ? `0 0 8px ${hasDiamond ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)'}`
                        : 'none',
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Series complete celebration */}
            {isSeriesComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
                className="rounded-xl p-4 mb-4 text-center"
                style={{
                  background: hasDiamond
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 182, 212, 0.1))'
                    : 'rgba(255, 255, 255, 0.05)',
                  border: hasDiamond
                    ? '1px solid rgba(16, 185, 129, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {hasDiamond ? (
                  <>
                    <span className="text-3xl">💎</span>
                    <p className="font-bold mt-2" style={{ color: COLORS.success }}>
                      Série completa com Diamante!
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-3xl">✅</span>
                    <p className="font-bold mt-2" style={{ color: COLORS.textLight }}>
                      Série completa!
                    </p>
                    <p className="text-xs mt-1" style={{ color: COLORS.textDark }}>
                      Média ≥95% = 💎 Diamante
                    </p>
                  </>
                )}
              </motion.div>
            )}

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              className="space-y-2"
            >
              <div className="flex gap-2">
                {score < 95 && onRetry && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onRetry}
                    className="flex-1 py-3.5 px-4 rounded-xl font-semibold transition-all"
                    style={{
                      backgroundColor: 'rgba(245, 158, 11, 0.15)',
                      color: COLORS.warning,
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    🔄 Tentar
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={hasNextEpisode ? onNextEpisode : onBackToSeries}
                  className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white transition-all"
                  style={{
                    background: hasNextEpisode ? GRADIENTS.blue : 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: hasNextEpisode ? SHADOWS.button : '0 10px 20px -5px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  {hasNextEpisode ? 'Próximo →' : 'Concluir ✓'}
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onBackToSeries}
                className="w-full py-3 px-4 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: COLORS.textDark,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                Ver Série
              </motion.button>
            </motion.div>
          </div>

          {/* Footer */}
          <div
            className="px-6 py-3 text-center"
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <p className="text-xs" style={{ color: COLORS.textDark }}>
              {seriesTitle}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}