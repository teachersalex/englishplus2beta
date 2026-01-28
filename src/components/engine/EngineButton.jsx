import { motion } from 'framer-motion';
import { COLORS } from '../../tokens';

export function EngineButton({ 
  label = 'VERIFICAR',
  onClick,
  disabled = false,
  variant = 'primary',
}) {
  const styles = {
    primary: { 
      bg: `linear-gradient(135deg, ${COLORS.primary} 0%, #2563EB 100%)`,
      border: '#1D4ED8',
      shadow: `0 4px 14px ${COLORS.primary}40`,
    },
    success: { 
      bg: `linear-gradient(135deg, ${COLORS.success} 0%, #059669 100%)`,
      border: '#047857',
      shadow: `0 4px 14px ${COLORS.success}40`,
    },
    disabled: { 
      bg: COLORS.border,
      border: '#CBD5E1',
      shadow: 'none',
    },
  };

  const style = disabled ? styles.disabled : styles[variant] || styles.primary;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 rounded-2xl font-bold text-lg relative overflow-hidden"
      style={{
        background: style.bg,
        borderBottom: `4px solid ${style.border}`,
        boxShadow: style.shadow,
        color: disabled ? COLORS.textMuted : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      whileHover={!disabled ? { 
        y: -1,
        boxShadow: variant === 'success' 
          ? `0 6px 20px ${COLORS.success}50`
          : `0 6px 20px ${COLORS.primary}50`,
      } : {}}
      whileTap={!disabled ? { y: 2, boxShadow: 'none' } : {}}
    >
      {/* Brilho sutil */}
      {!disabled && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%)',
            borderRadius: 'inherit',
          }}
        />
      )}
      <span className="relative">{label}</span>
    </motion.button>
  );
}

export default EngineButton;