/**
 * DiamondCelebrationModal.jsx
 * Celebração de diamante - OTIMIZADO (sem animações infinitas)
 */

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { thresholds } from '../../data/gameSchema'

const playDiamondSound = () => {
  try {
    const audio = new Audio('/audio/diamond_unlock.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  } catch (e) {}
};

export default function DiamondCelebrationModal({ isOpen, onComplete }) {
  const [phase, setPhase] = useState(0)
  const [canDismiss, setCanDismiss] = useState(false)
  
  useEffect(() => {
    if (!isOpen) {
      setPhase(0)
      setCanDismiss(false)
      return
    }
    
    playDiamondSound();
    
    // Cronograma mais rápido
    const timers = [
      setTimeout(() => setPhase(1), 50),
      setTimeout(() => setPhase(2), 300),
      setTimeout(() => setPhase(3), 500),
      setTimeout(() => setPhase(4), 700),
      setTimeout(() => setCanDismiss(true), 500), // Anti-skip
    ]
    return () => timers.forEach(clearTimeout)
  }, [isOpen])

  const handleDismiss = () => {
    if (canDismiss) onComplete?.()
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={handleDismiss}
        >
          {/* Fundo */}
          <div className="absolute inset-0 bg-black/90" />
          
          {/* Gradiente estático */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(circle at 50% 40%, #0ea5e9 0%, transparent 60%)` }}
          />
          
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="relative flex flex-col items-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* DIAMANTE */}
            <div className="relative">
              {/* Glow estático */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={phase >= 2 ? { opacity: 0.5, scale: 1.2 } : {}}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 -m-12 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(56, 189, 248, 0.4) 0%, transparent 70%)',
                  filter: 'blur(15px)'
                }}
              />
              
              {/* Container do diamante */}
              <motion.div
                initial={{ scale: 0.1, opacity: 0 }}
                animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0.5 }}
                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                className="relative w-28 h-28"
              >
                {/* Borda metálica cyan */}
                <div 
                  className="absolute inset-0 rounded-xl transform rotate-3"
                  style={{
                    background: 'linear-gradient(145deg, #e0f2fe 0%, #38bdf8 50%, #0284c7 100%)',
                    boxShadow: phase >= 2 ? '0 0 30px rgba(56, 189, 248, 0.4)' : 'none',
                    transition: 'box-shadow 0.3s'
                  }}
                />
                
                {/* Interior com diamante */}
                <div className="absolute inset-1 bg-[#1A1A1A] rounded-lg flex items-center justify-center border border-white/10 overflow-hidden">
                  {/* Brilho passando - animação única, não infinita */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={phase >= 3 ? { x: '200%', opacity: 0.6 } : {}}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                  />

                  <motion.span 
                    initial={{ scale: 0.8 }}
                    animate={phase >= 2 ? { scale: 1 } : {}}
                    transition={{ type: 'spring', damping: 10 }}
                    className="text-5xl filter drop-shadow-lg relative z-10"
                  >
                    💎
                  </motion.span>
                </div>
              </motion.div>
            </div>
            
            {/* TEXTOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3 }}
              className="mt-8 text-center px-4"
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-cyan-400">
                Diamante Conquistado
              </p>
              
              <h2 className="text-white text-2xl font-bold mb-3 tracking-tight">
                Precisão Perfeita!
              </h2>
              
              <p className="text-white/70 text-sm max-w-xs mx-auto leading-relaxed">
                Você alcançou {thresholds.diamond}% ou mais de precisão.
              </p>
            </motion.div>
            
            {/* Botão */}
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.2, delay: 0.2 }}
              whileHover={canDismiss ? { scale: 1.05 } : {}}
              whileTap={canDismiss ? { scale: 0.95 } : {}}
              onClick={handleDismiss}
              disabled={!canDismiss}
              className="mt-8 px-10 py-4 rounded-xl font-bold text-lg shadow-lg transition-all bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
              style={{
                boxShadow: '0 10px 30px rgba(6, 182, 212, 0.3)',
                opacity: canDismiss ? 1 : 0.7,
                cursor: canDismiss ? 'pointer' : 'not-allowed',
              }}
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}