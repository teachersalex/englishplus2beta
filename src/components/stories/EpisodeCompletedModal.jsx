// src/components/stories/EpisodeCompletedModal.jsx
// Modal de celebração quando completa um episódio
// Visual: PlayStation/Apple - profissional e motivador

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = {
  surface: '#FFFFFF',
  textMain: '#1E293B',
  textMuted: '#64748B',
  primary: '#3B82F6',
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
};

export default function EpisodeCompletedModal({
  isOpen,
  onClose,
  onNextEpisode,
  onBackToSeries,
  onRetry,
  // Dados do episódio
  score,
  episodeTitle,
  episodeNumber,
  totalEpisodes,
  seriesTitle,
  // Dados do progresso
  isNewRecord = false,
  previousBest = 0,
  seriesAverage = null,
  isSeriesComplete = false,
}) {
  const [phase, setPhase] = useState(0);
  
  // Animação em fases
  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      return;
    }
    
    const timers = [
      setTimeout(() => setPhase(1), 100),   // Aparece
      setTimeout(() => setPhase(2), 400),   // Score
      setTimeout(() => setPhase(3), 800),   // Stats
      setTimeout(() => setPhase(4), 1200),  // Botões
    ];
    
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  // Determina cor e mensagem baseado no score
  const getScoreStyle = () => {
    if (score >= 95) return { color: COLORS.success, bg: COLORS.successLight, emoji: '🎯', msg: 'Excelente!' };
    if (score >= 80) return { color: COLORS.primary, bg: '#EFF6FF', emoji: '👍', msg: 'Muito bom!' };
    if (score >= 60) return { color: COLORS.warning, bg: COLORS.warningLight, emoji: '💪', msg: 'Bom trabalho!' };
    return { color: COLORS.error, bg: COLORS.errorLight, emoji: '📚', msg: 'Continue praticando!' };
  };
  
  const scoreStyle = getScoreStyle();
  const hasNextEpisode = episodeNumber < totalEpisodes;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
          style={{ backgroundColor: COLORS.surface }}
        >
          {/* Header com gradiente */}
          <div 
            className="px-6 py-8 text-center relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${scoreStyle.color}20, ${scoreStyle.color}10)`,
            }}
          >
            {/* Emoji animado */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={phase >= 1 ? { scale: 1, rotate: 0 } : {}}
              transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.1 }}
              className="text-6xl mb-3"
            >
              {scoreStyle.emoji}
            </motion.div>
            
            {/* Título */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
              className="text-xl font-bold"
              style={{ color: COLORS.textMain }}
            >
              Episódio Completo!
            </motion.h2>
            
            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              className="text-sm mt-1"
              style={{ color: COLORS.textMuted }}
            >
              {episodeTitle}
            </motion.p>
          </div>

          {/* Score */}
          <div className="px-6 py-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
              className="rounded-2xl p-4 text-center mb-4"
              style={{ backgroundColor: scoreStyle.bg }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: scoreStyle.color }}>
                {scoreStyle.msg}
              </p>
              <p 
                className="text-5xl font-black"
                style={{ color: scoreStyle.color }}
              >
                {score}%
              </p>
              
              {/* New Record badge */}
              {isNewRecord && previousBest > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: COLORS.success, color: 'white' }}
                >
                  🏆 Novo Recorde! (antes: {previousBest}%)
                </motion.div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
              className="grid grid-cols-2 gap-3 mb-4"
            >
              {/* Progresso na série */}
              <div 
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: '#F1F5F9' }}
              >
                <p className="text-xs mb-1" style={{ color: COLORS.textMuted }}>
                  Progresso
                </p>
                <p className="text-lg font-bold" style={{ color: COLORS.textMain }}>
                  {episodeNumber}/{totalEpisodes}
                </p>
                <p className="text-xs" style={{ color: COLORS.textMuted }}>
                  episódios
                </p>
              </div>
              
              {/* Média da série */}
              <div 
                className="rounded-xl p-3 text-center"
                style={{ backgroundColor: '#F1F5F9' }}
              >
                <p className="text-xs mb-1" style={{ color: COLORS.textMuted }}>
                  Média
                </p>
                <p 
                  className="text-lg font-bold"
                  style={{ 
                    color: seriesAverage >= 95 ? COLORS.success : 
                           seriesAverage >= 70 ? COLORS.primary : COLORS.textMain 
                  }}
                >
                  {seriesAverage !== null ? `${seriesAverage}%` : '—'}
                </p>
                <p className="text-xs" style={{ color: COLORS.textMuted }}>
                  da série
                </p>
              </div>
            </motion.div>

            {/* Progress bar visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
              className="mb-4"
            >
              <div className="flex gap-1">
                {Array.from({ length: totalEpisodes }).map((_, i) => (
                  <div
                    key={i}
                    className="h-2 flex-1 rounded-full transition-colors"
                    style={{
                      backgroundColor: i < episodeNumber 
                        ? (seriesAverage >= 95 ? COLORS.success : COLORS.primary)
                        : '#E2E8F0',
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Série completa? */}
            {isSeriesComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={phase >= 3 ? { opacity: 1, scale: 1 } : {}}
                className="rounded-xl p-3 mb-4 text-center"
                style={{ 
                  backgroundColor: seriesAverage >= 95 ? COLORS.successLight : '#F1F5F9',
                  border: seriesAverage >= 95 ? `2px solid ${COLORS.success}` : 'none',
                }}
              >
                {seriesAverage >= 95 ? (
                  <>
                    <span className="text-2xl">💎</span>
                    <p className="font-bold mt-1" style={{ color: COLORS.success }}>
                      Série completa com Diamante!
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-2xl">✅</span>
                    <p className="font-bold mt-1" style={{ color: COLORS.textMain }}>
                      Série completa!
                    </p>
                    <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
                      Média ≥95% = 💎 Diamante
                    </p>
                  </>
                )}
              </motion.div>
            )}

            {/* Botões */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              className="space-y-2"
            >
              {/* Linha principal */}
              <div className="flex gap-2">
                {/* Tentar Novamente - só se score < 95% */}
                {score < 95 && onRetry && (
                  <button
                    onClick={onRetry}
                    className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors"
                    style={{ 
                      backgroundColor: COLORS.warningLight,
                      color: COLORS.warning,
                    }}
                  >
                    🔄 Tentar
                  </button>
                )}
                
                {hasNextEpisode ? (
                  <button
                    onClick={onNextEpisode}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    Próximo →
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: COLORS.success }}
                  >
                    Concluir ✔
                  </button>
                )}
              </div>
              
              {/* Ver Série - secundário */}
              <button
                onClick={onBackToSeries}
                className="w-full py-2 px-4 rounded-xl text-sm font-medium transition-colors"
                style={{ 
                  backgroundColor: '#F1F5F9',
                  color: COLORS.textMuted,
                }}
              >
                Ver Série
              </button>
            </motion.div>
          </div>

          {/* Série info no rodapé */}
          <div 
            className="px-6 py-3 text-center border-t"
            style={{ borderColor: '#E2E8F0' }}
          >
            <p className="text-xs" style={{ color: COLORS.textMuted }}>
              {seriesTitle}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}