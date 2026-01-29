/**
 * AchievementCelebrationModal.jsx
 * Modal cinematográfico de conquista
 * 
 * "Every accomplishment starts with the decision to try."
 *  — John F. Kennedy
 */

import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../tokens';
import { getAchievementIcon } from '../../data/achievementsData';

// Cores por categoria - tons mais vibrantes
const CATEGORY_THEMES = {
  milestone: { 
    color: '#3B82F6', 
    glow: 'rgba(59, 130, 246, 0.4)',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  },
  map: { 
    color: '#8B5CF6', 
    glow: 'rgba(139, 92, 246, 0.4)',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  },
  grind: { 
    color: '#F59E0B', 
    glow: 'rgba(245, 158, 11, 0.4)',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  skill: { 
    color: '#10B981', 
    glow: 'rgba(16, 185, 129, 0.4)',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  resource: { 
    color: '#06B6D4', 
    glow: 'rgba(6, 182, 212, 0.4)',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  },
  stories: { 
    color: '#EC4899', 
    glow: 'rgba(236, 72, 153, 0.4)',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
  },
  xp: { 
    color: '#6366F1', 
    glow: 'rgba(99, 102, 241, 0.4)',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
  },
  level: { 
    color: '#F97316', 
    glow: 'rgba(249, 115, 22, 0.4)',
    gradient: 'linear-gradient(135deg, #f97316 0%, #c2410c 100%)',
  },
  legendary: { 
    color: '#EAB308', 
    glow: 'rgba(234, 179, 8, 0.5)',
    gradient: 'linear-gradient(135deg, #eab308 0%, #ca8a04 50%, #a16207 100%)',
  },
};

const CATEGORY_NAMES = {
  milestone: 'Primeiros Passos',
  map: 'Explorador',
  grind: 'Dedicação',
  skill: 'Habilidade',
  resource: 'Recursos',
  stories: 'Histórias',
  xp: 'Experiência',
  level: 'Nível',
  legendary: 'Lendária',
};

export function AchievementCelebrationModal({ isOpen, onComplete, achievement }) {
  const [phase, setPhase] = useState(0);
  const audioRef = useRef(null);

  // Partículas orbitando
  const orbitParticles = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: i * 30,
      radius: 95,
      size: 4,
      duration: 3 + Math.random(),
    })),
    []
  );

  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      return;
    }

    // Som
    try {
      audioRef.current = new Audio('/audio/achievement_unlock.mp3');
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    } catch (e) {}

    // Fases da animação
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 700),
      setTimeout(() => setPhase(4), 1000),
      setTimeout(() => setPhase(5), 1300),
      setTimeout(() => setPhase(6), 1700),
    ];

    return () => {
      timers.forEach(clearTimeout);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isOpen]);

  if (!isOpen || !achievement) return null;

  const theme = CATEGORY_THEMES[achievement.category] || CATEGORY_THEMES.milestone;
  const iconSrc = getAchievementIcon(achievement.id);
  const categoryName = CATEGORY_NAMES[achievement.category] || 'Conquista';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0a0a1a 0%, #0f172a 50%, #0a0a1a 100%)',
          }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(${theme.color}40 1px, transparent 1px),
              linear-gradient(90deg, ${theme.color}40 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />

        {/* Radial glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 50% 40% at 50% 35%, ${theme.glow}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative text-center px-6 max-w-md">
          {/* "CONQUISTA DESBLOQUEADA" */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <motion.p
              initial={{ letterSpacing: '0.1em' }}
              animate={phase >= 2 ? { letterSpacing: '0.35em' } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: theme.color }}
            >
              Conquista Desbloqueada
            </motion.p>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={phase >= 3 ? { scale: 1, rotate: 0 } : {}}
            transition={{
              type: 'spring',
              damping: 12,
              stiffness: 200,
            }}
            className="relative mx-auto mb-8"
            style={{ width: 160, height: 160 }}
          >
            {/* Pulsing glow */}
            <motion.div
              animate={phase >= 3 ? {
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${theme.glow}, transparent 70%)`,
                filter: 'blur(20px)',
              }}
            />

            {/* Main circle */}
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(145deg, ${theme.color}20, ${theme.color}08)`,
                border: `3px solid ${theme.color}`,
                boxShadow: `
                  0 0 60px ${theme.glow},
                  inset 0 0 40px ${theme.color}15
                `,
              }}
            >
              {/* Shine effect */}
              <motion.div
                initial={{ rotate: 0, opacity: 0 }}
                animate={phase >= 3 ? { rotate: 360, opacity: [0, 0.5, 0] } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute inset-0 rounded-full overflow-hidden"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `conic-gradient(from 0deg, transparent 0deg, ${theme.color}40 90deg, transparent 180deg)`,
                  }}
                />
              </motion.div>

              {/* Badge image */}
              <motion.img
                initial={{ scale: 0.5, opacity: 0 }}
                animate={phase >= 3 ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                src={iconSrc}
                alt={achievement.title}
                className="w-[60%] h-[60%] object-contain relative z-10"
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
                }}
              />
            </div>

            {/* Orbiting particles - CORRIGIDO */}
            {phase >= 3 && orbitParticles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute inset-0"
                initial={{ rotate: p.angle }}
                animate={{ rotate: p.angle + 360 }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{
                    duration: p.duration / 2,
                    repeat: Infinity,
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    top: '50%',
                    left: '50%',
                    marginTop: -p.size / 2,
                    marginLeft: p.radius - p.size / 2,
                    backgroundColor: theme.color,
                    boxShadow: `0 0 8px ${theme.color}`,
                  }}
                />
              </motion.div>
            ))}

            {/* Rotating dashed ring - CORRIGIDO */}
            <motion.div
              animate={phase >= 3 ? { rotate: 360 } : {}}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute rounded-full pointer-events-none"
              style={{
                top: -14,
                left: -14,
                right: -14,
                bottom: -14,
                border: `2px dashed ${theme.color}30`,
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-3xl font-black mb-3"
            style={{ color: COLORS.textLight }}
          >
            {achievement.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase >= 4 ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
            className="text-sm mb-4"
            style={{ color: COLORS.textDark }}
          >
            {achievement.desc}
          </motion.p>

          {/* Quote */}
          {achievement.quote && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={phase >= 5 ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="text-base italic mb-6 leading-relaxed"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              "{achievement.quote}"
            </motion.p>
          )}

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={phase >= 5 ? { opacity: 1, scale: 1 } : {}}
            className="mb-8"
          >
            <span
              className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-full"
              style={{
                backgroundColor: `${theme.color}15`,
                color: theme.color,
                border: `1px solid ${theme.color}30`,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.color }}
              />
              {categoryName}
            </span>
          </motion.div>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 6 ? { opacity: 1, y: 0 } : {}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-12 py-4 rounded-2xl font-bold text-lg text-white transition-all"
            style={{
              background: theme.gradient,
              boxShadow: `0 20px 40px -10px ${theme.glow}`,
            }}
          >
            Continuar
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AchievementCelebrationModal;