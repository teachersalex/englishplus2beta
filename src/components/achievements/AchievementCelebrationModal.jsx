/**
 * AchievementCelebrationModal.jsx
 * Modal cinematográfico de conquista
 * 
 * FILOSOFIA: Mesmo peso do DiamondModal
 * - Tela cheia com backdrop
 * - Animação em fases
 * - Som de celebração
 * - Quote inspiracional
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Cores por categoria
const CATEGORY_COLORS = {
  milestone: { bg: '#3B82F6', light: '#EFF6FF' },  // Azul
  map: { bg: '#8B5CF6', light: '#F3E8FF' },        // Roxo
  grind: { bg: '#F59E0B', light: '#FEF3C7' },      // Amber
  skill: { bg: '#10B981', light: '#D1FAE5' },      // Verde
  resource: { bg: '#06B6D4', light: '#CFFAFE' },   // Cyan
  stories: { bg: '#EC4899', light: '#FCE7F3' },    // Rosa
  xp: { bg: '#6366F1', light: '#E0E7FF' },         // Indigo
  level: { bg: '#F97316', light: '#FFEDD5' },      // Laranja
  legendary: { bg: '#EAB308', light: '#FEF9C3' },  // Dourado
};

export function AchievementCelebrationModal({ isOpen, onComplete, achievement }) {
  const [phase, setPhase] = useState(0);
  const audioRef = useRef(null);

  // Animação em fases
  useEffect(() => {
    if (!isOpen) {
      setPhase(0);
      return;
    }

    // Toca som
    try {
      audioRef.current = new Audio('/audio/achievement_unlock.mp3');
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    } catch (e) {}

    // Fases da animação
    const timers = [
      setTimeout(() => setPhase(1), 100),   // Backdrop
      setTimeout(() => setPhase(2), 400),   // "Conquista Desbloqueada"
      setTimeout(() => setPhase(3), 700),   // Ícone aparece
      setTimeout(() => setPhase(4), 1100),  // Título
      setTimeout(() => setPhase(5), 1400),  // Quote
      setTimeout(() => setPhase(6), 1800),  // Botão
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

  const colors = CATEGORY_COLORS[achievement.category] || CATEGORY_COLORS.milestone;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      >
        <div className="text-center px-6 max-w-md">
          
          {/* "CONQUISTA DESBLOQUEADA" */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <p 
              className="text-sm font-bold tracking-[0.3em] uppercase"
              style={{ color: colors.bg }}
            >
              Conquista Desbloqueada
            </p>
          </motion.div>

          {/* Ícone */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={phase >= 3 ? { scale: 1, rotate: 0 } : {}}
            transition={{ 
              type: 'spring', 
              damping: 12, 
              stiffness: 200,
            }}
            className="relative mx-auto mb-6"
            style={{ width: 120, height: 120 }}
          >
            {/* Glow */}
            <motion.div
              animate={phase >= 3 ? { 
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.2, 1],
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ 
                background: `radial-gradient(circle, ${colors.bg}40, transparent 70%)`,
              }}
            />
            
            {/* Badge */}
            <div 
              className="relative w-full h-full rounded-full flex items-center justify-center"
              style={{ 
                background: `linear-gradient(135deg, ${colors.bg}, ${colors.bg}CC)`,
                boxShadow: `0 0 40px ${colors.bg}60`,
              }}
            >
              <span className="text-6xl">{achievement.icon}</span>
            </div>

            {/* Sparkles */}
            {phase >= 3 && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: Math.cos(i * 45 * Math.PI / 180) * 80,
                      y: Math.sin(i * 45 * Math.PI / 180) * 80,
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: i * 0.05,
                    }}
                    className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1"
                    style={{ 
                      backgroundColor: colors.bg,
                      borderRadius: '50%',
                      boxShadow: `0 0 6px ${colors.bg}`,
                    }}
                  />
                ))}
              </>
            )}
          </motion.div>

          {/* Título */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="text-3xl font-black text-white mb-2"
          >
            {achievement.title}
          </motion.h2>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase >= 5 ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-lg italic mb-8"
            style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            "{achievement.quote}"
          </motion.p>

          {/* Categoria */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase >= 5 ? { opacity: 1 } : {}}
            className="mb-8"
          >
            <span 
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ 
                backgroundColor: colors.light,
                color: colors.bg,
              }}
            >
              {getCategoryName(achievement.category)}
            </span>
          </motion.div>

          {/* Botão */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 6 ? { opacity: 1, y: 0 } : {}}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="px-10 py-4 rounded-2xl font-bold text-lg text-white"
            style={{ 
              backgroundColor: colors.bg,
              boxShadow: `0 8px 24px ${colors.bg}50`,
            }}
          >
            Continuar
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function getCategoryName(category) {
  const names = {
    milestone: 'Primeiros Passos',
    map: 'Conquista do Mapa',
    grind: 'Dedicação',
    skill: 'Habilidade',
    resource: 'Recursos',
    stories: 'Histórias',
    xp: 'Experiência',
    level: 'Nível',
    legendary: 'Lendária',
  };
  return names[category] || 'Conquista';
}

export default AchievementCelebrationModal;