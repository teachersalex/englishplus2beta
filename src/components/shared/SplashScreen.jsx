import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * SplashScreen - EnglishPlus 2.0
 * Dark mode premium - PlayStation boot vibes
 * 
 * Paleta: Azul elétrico (#3B82F6)
 * Branding: Teacher Alex English Plus
 */

const COLORS = {
  bg: '#0A0A0A',
  accent: '#3B82F6',
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.4)',
};

export default function SplashScreen({ onFinish }) {
  const finishedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!finishedRef.current) {
        finishedRef.current = true;
        onFinish?.();
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: COLORS.bg }}
    >
      <div className="text-center">
        {/* Logo Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: COLORS.accent }}
        >
          <span className="text-white font-bold text-3xl">E+</span>
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-xl font-semibold tracking-wide mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Teacher Alex
          </p>
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: COLORS.text }}>
            ENGLISH<span style={{ color: COLORS.accent }}>PLUS</span>
          </h1>
        </motion.div>

        {/* Loading bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: 'easeInOut' }}
          className="h-1 mx-auto mt-8 rounded-full"
          style={{ backgroundColor: COLORS.accent }}
        />
      </div>
    </motion.div>
  );
}