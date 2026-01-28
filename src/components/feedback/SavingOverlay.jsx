/**
 * SavingOverlay.jsx
 * Overlay de transição entre modais
 * 
 * PROPÓSITO:
 * - Elimina ansiedade "travou?"
 * - Dá respiro entre celebrações
 * - Indica que algo está acontecendo
 */

import { motion, AnimatePresence } from 'framer-motion';

export function SavingOverlay({ isVisible, message = 'Salvando...' }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        >
          <div className="text-center">
            {/* Spinner duplo */}
            <div className="relative w-16 h-16 mx-auto mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-transparent"
              />
            </div>
            
            {/* Mensagem */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-lg font-medium"
            >
              {message}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SavingOverlay;