/**
 * DiamondCelebrationModal.jsx
 * Celebração épica quando o aluno conquista um diamante
 * 
 * "Diamonds are forever."
 *  — Ian Fleming
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, GRADIENTS } from '../../tokens';
import { thresholds } from '../../data/gameSchema';

// Som de diamante
const playDiamondSound = () => {
  try {
    const audio = new Audio('/audio/diamond_unlock.mp3');
    audio.volume = 0.7;
    audio.play().catch(() => {});
  } catch (e) {}
};

export default function DiamondCelebrationModal({ isOpen, onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    setPhase(0);
    playDiamondSound();

    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 800),
      setTimeout(() => setPhase(4), 1200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  // Sparks memoizados
  const sparks = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => ({
      id: i,
      angle: (i * 22.5) * (Math.PI / 180),
      distance: 70 + Math.random() * 50,
      size: 3 + Math.random() * 4,
      delay: Math.random() * 0.2,
    })),
    []
  );

  // Partículas de fundo
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    })),
    []
  );

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (phase >= 4) onComplete();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          {/* Background com gradiente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Radial glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={phase >= 2 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(6, 182, 212, 0.2), transparent 70%)',
            }}
          />

          {/* Floating particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? {
                opacity: [0, 0.6, 0],
                y: [0, -30, -60],
              } : {}}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
              }}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                backgroundColor: '#06b6d4',
                boxShadow: '0 0 10px #06b6d4',
              }}
            />
          ))}

          {/* Content */}
          <motion.div
            animate={phase === 2 ? {
              x: [0, -6, 6, -3, 3, 0],
              y: [0, 3, -3, 2, -2, 0],
            } : {}}
            transition={{ duration: 0.4 }}
            className="relative flex flex-col items-center pointer-events-auto px-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DIAMANTE */}
            <div className="relative mb-8">
              {/* Outer glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={phase >= 3 ? { 
                  opacity: [0.3, 0.6, 0.3], 
                  scale: [1, 1.3, 1] 
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 -m-12 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />

              {/* Diamond container */}
              <motion.div
                initial={{ scale: 0.1, opacity: 0, rotateY: 180 }}
                animate={
                  phase >= 2
                    ? { scale: 1, opacity: 1, rotateY: 0 }
                    : phase >= 1
                      ? { scale: 0.8, opacity: 0.8, rotateY: 90 }
                      : { scale: 0.1, opacity: 0, rotateY: 180 }
                }
                transition={{
                  type: 'spring',
                  damping: phase >= 2 ? 12 : 20,
                  stiffness: phase >= 2 ? 200 : 100,
                }}
                className="relative w-36 h-36"
              >
                {/* Metallic border */}
                <div
                  className="absolute inset-0 rounded-2xl transform rotate-3"
                  style={{
                    background: 'linear-gradient(145deg, #e0f2fe 0%, #06b6d4 40%, #0891b2 70%, #164e63 100%)',
                    boxShadow: phase >= 2
                      ? '0 0 60px rgba(6, 182, 212, 0.5), 0 0 100px rgba(6, 182, 212, 0.3)'
                      : 'none',
                  }}
                />

                {/* Inner dark with diamond */}
                <div
                  className="absolute inset-1.5 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: GRADIENTS.darkCard,
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                  }}
                >
                  {/* Shine sweep */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={phase >= 3 ? { x: '200%', opacity: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
                  />

                  {/* Diamond emoji */}
                  <motion.span
                    className="text-7xl filter drop-shadow-lg relative z-10"
                    animate={phase >= 3 ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    💎
                  </motion.span>
                </div>

                {/* Rotating ring */}
                <motion.div
                  animate={phase >= 3 ? { rotate: 360 } : {}}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-12px] rounded-2xl pointer-events-none"
                  style={{
                    border: '2px dashed rgba(6, 182, 212, 0.3)',
                  }}
                />
              </motion.div>

              {/* Sparks explosion */}
              <AnimatePresence>
                {phase === 2 && sparks.map((spark) => (
                  <motion.div
                    key={spark.id}
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 0,
                      x: Math.cos(spark.angle) * spark.distance,
                      y: Math.sin(spark.angle) * spark.distance,
                    }}
                    transition={{ duration: 0.6, delay: spark.delay }}
                    className="absolute left-1/2 top-1/2 rounded-full"
                    style={{
                      width: spark.size,
                      height: spark.size,
                      backgroundColor: '#06b6d4',
                      boxShadow: '0 0 8px #06b6d4',
                    }}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <motion.p
                initial={{ letterSpacing: '0.1em' }}
                animate={phase >= 4 ? { letterSpacing: '0.4em' } : {}}
                transition={{ duration: 0.6 }}
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: '#06b6d4' }}
              >
                Diamante Conquistado
              </motion.p>

              <h2
                className="text-4xl font-black mb-4 tracking-tight"
                style={{ color: COLORS.textLight }}
              >
                Precisão Perfeita!
              </h2>

              <p
                className="text-base max-w-sm mx-auto leading-relaxed mb-8"
                style={{ color: COLORS.textDark }}
              >
                Você alcançou <span style={{ color: '#06b6d4', fontWeight: 'bold' }}>{thresholds.diamond}%</span> ou mais de precisão.
                <br />Isso é extraordinário!
              </p>
            </motion.div>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              className="px-12 py-4 rounded-2xl font-bold text-lg text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #3b82f6 100%)',
                boxShadow: '0 20px 40px -10px rgba(6, 182, 212, 0.5)',
              }}
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}