import { motion } from 'framer-motion';
import { COLORS, SHADOWS } from '../../tokens';

export function EngineButton({ 
  label = 'VERIFICAR',
  onClick,
  disabled = false,
  variant = 'primary',
}) {
  const styles = {
    primary: { bg: COLORS.primary, border: COLORS.primaryDark, shadow: SHADOWS.button },
    success: { bg: COLORS.success, border: '#047857', shadow: SHADOWS.buttonSuccess },
    disabled: { bg: COLORS.border, border: '#CBD5E1', shadow: 'none' },
  };

  const style = disabled ? styles.disabled : styles[variant] || styles.primary;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 rounded-2xl font-bold text-lg"
      style={{
        backgroundColor: style.bg,
        borderBottom: `4px solid ${style.border}`,
        boxShadow: style.shadow,
        color: disabled ? COLORS.textMuted : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      whileTap={!disabled ? { y: 2, boxShadow: 'none' } : {}}
    >
      {label}
    </motion.button>
  );
}

export default EngineButton;