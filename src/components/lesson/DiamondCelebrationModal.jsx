// src/components/lesson/DiamondCelebrationModal.jsx
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { thresholds } from '../../data/gameSchema'

/**
 * DiamondCelebrationModal
 * Celebração épica quando o aluno conquista um diamante
 */

// Som de diamante
const playDiamondSound = () => {
  try {
    const audio = new Audio('/audio/diamond_unlock.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  } catch (e) {}
};

export default function DiamondCelebrationModal({ isOpen, onComplete }) {
  const [phase, setPhase] = useState(0)
  
  useEffect(() => {
    if (!isOpen) return
    setPhase(0)
    
    // Toca som de diamante!
    playDiamondSound();
    
    // Cronograma da animação
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 800),
      setTimeout(() => setPhase(4), 1200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [isOpen])

  // Memoiza sparks para não mudar a cada re-render
  const sparks = useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i * 30) * (Math.PI / 180),
      distance: 60 + Math.random() * 40,
      size: 2 + Math.random() * 3,
    })),
    []
  )
  
  if (!isOpen) return null

  const handleBackdropClick = () => {
    if (phase >= 4) {
      onComplete()
    }
  }

  const handleButtonClick = (e) => {
    e.stopPropagation()
    onComplete()
  }
  
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
          {/* Fundo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          
          {/* Gradiente de fundo */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle at 50% 50%, #0ea5e9 0%, #000 100%)` }}
          />
          
          <motion.div
            animate={phase === 2 ? {
              x: [0, -8, 8, -4, 4, 0],
              y: [0, 4, -4, 2, -2, 0],
            } : {}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative flex flex-col items-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DIAMANTE */}
            <div className="relative">
              {/* Glow atrás */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={phase >= 3 ? { opacity: [0, 0.8, 0.4], scale: [0.5, 1.5, 1.2] } : {}}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 -m-16 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(56, 189, 248, 0.5) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />
              
              {/* Container do diamante */}
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
                  type: "spring", 
                  damping: phase >= 2 ? 12 : 20, 
                  stiffness: phase >= 2 ? 200 : 100, 
                  duration: 0.5 
                }}
                className="relative w-32 h-32"
              >
                {/* Borda metálica cyan */}
                <div 
                  className="absolute inset-0 rounded-xl transform rotate-3"
                  style={{
                    background: 'linear-gradient(145deg, #e0f2fe 0%, #38bdf8 50%, #0284c7 100%)',
                    boxShadow: phase >= 2 ? '0 0 40px rgba(56, 189, 248, 0.5), inset 0 2px 4px rgba(255,255,255,0.5)' : 'none'
                  }}
                />
                
                {/* Interior com diamante */}
                <div className="absolute inset-1 bg-[#1A1A1A] rounded-lg flex items-center justify-center border border-white/10 overflow-hidden relative">
                  {/* Brilho passando */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={phase >= 3 ? { x: '200%', opacity: 1 } : {}}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 z-20 pointer-events-none"
                  />

                  <motion.span 
                    className="text-6xl filter drop-shadow-lg relative z-10"
                    animate={phase >= 3 ? { scale: [1, 1.1, 1] } : {}}
                  >
                    💎
                  </motion.span>
                </div>
              </motion.div>
              
              {/* Faíscas */}
              <AnimatePresence>
                {phase === 2 && sparks.map((spark) => (
                  <motion.div
                    key={spark.id}
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    animate={{ 
                      opacity: 0, 
                      scale: 0, 
                      x: Math.cos(spark.angle) * spark.distance, 
                      y: Math.sin(spark.angle) * spark.distance 
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute left-1/2 top-1/2 rounded-full bg-cyan-300"
                    style={{ width: spark.size, height: spark.size }}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {/* TEXTOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4 }}
              className="mt-10 text-center px-4"
            >
              <motion.p
                initial={{ letterSpacing: '0.1em' }}
                animate={{ letterSpacing: '0.3em' }}
                className="text-xs font-bold uppercase tracking-widest mb-3 text-cyan-400"
              >
                Diamante Conquistado
              </motion.p>
              
              <h2 className="text-white text-3xl font-bold mb-3 tracking-tight">
                Precisão Perfeita!
              </h2>
              
              <p className="text-white/70 text-base max-w-sm mx-auto leading-relaxed">
                Você alcançou {thresholds.diamond}% ou mais de precisão nesta série.
              </p>
            </motion.div>
            
            {/* Botão */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleButtonClick}
              className="mt-10 px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-500/30"
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}