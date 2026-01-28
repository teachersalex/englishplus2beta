import { motion } from 'framer-motion';
import { COLORS } from '../../tokens';

/**
 * EngineHeader
 * Header comum para todas as engines
 */
export function EngineHeader({ label, title, instruction, defaultTitle = 'Atividade' }) {
  return (
    <div className="mb-6">
      {label && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide px-3 py-1.5 rounded-lg mb-3"
          style={{ backgroundColor: COLORS.primaryLight, color: COLORS.primaryDark }}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: COLORS.primary }}
          />
          {label}
        </motion.span>
      )}
      
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-2xl font-bold mb-1" 
        style={{ color: COLORS.text }}
      >
        {title || defaultTitle}
      </motion.h1>

      {/* Linha decorativa */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: 48 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="h-1 rounded-full mb-4"
        style={{ 
          background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
        }}
      />
      
      {instruction && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm"
          style={{ color: COLORS.textMuted }}
        >
          {instruction}
        </motion.p>
      )}
    </div>
  );
}

export default EngineHeader;