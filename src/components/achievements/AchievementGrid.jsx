/**
 * AchievementGrid.jsx
 * Grid de conquistas usando imagens PNG geradas por IA
 * 
 * Imagens devem estar em /public/achievements/[icon].png
 */

import { motion } from 'framer-motion';

// Dados dos achievements - icon aponta pro arquivo PNG
export const ACHIEVEMENTS_DISPLAY = [
  { id: 'lesson1', icon: 'shield', title: 'Primeiro Passo' },
  { id: 'node1', icon: 'castle', title: 'Conquistador' },
  { id: 'lesson6', icon: 'book', title: 'Estudante' },
  { id: 'node3', icon: 'map', title: 'Explorador' },
  { id: 'perfect5', icon: 'target', title: 'Atirador' },
  { id: 'node5', icon: 'globe', title: 'Aventureiro' },
  { id: 'story1', icon: 'music', title: 'Ouvinte' },
  { id: 'xp500', icon: 'bolt', title: 'Centelha' },
  { id: 'level5', icon: 'rocket', title: 'Decolando' },
  { id: 'diamond10', icon: 'diamond', title: 'Colecionador' },
  { id: 'node7', icon: 'mountain', title: 'Alpinista' },
  { id: 'node10', icon: 'star', title: 'Mestre do Mapa' },
  { id: 'master', icon: 'trophy', title: 'Mestre' },
];

// Estilos
const STYLES = {
  container: {
    background: 'linear-gradient(135deg, #0f1729, #1a2744)',
    borderRadius: '20px',
    padding: '24px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: '#64748B',
  },
  counter: {
    fontSize: '14px',
    color: '#475569',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '12px',
  },
  slot: {
    aspectRatio: '1',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 0.15s ease',
  },
  slotEarned: {
    background: 'rgba(30, 41, 59, 0.8)',
  },
  slotProgress: {
    background: 'rgba(30, 41, 59, 0.6)',
  },
  slotLocked: {
    background: 'rgba(20, 30, 50, 0.5)',
    border: '1px dashed rgba(100, 116, 139, 0.2)',
  },
  slotEmpty: {
    background: 'rgba(15, 23, 42, 0.4)',
    border: '1px dashed rgba(100, 116, 139, 0.15)',
  },
  icon: {
    width: '70%',
    height: '70%',
    objectFit: 'contain',
  },
  iconLocked: {
    filter: 'grayscale(1) brightness(0.3)',
  },
  iconProgress: {
    filter: 'grayscale(0.5) brightness(0.6)',
  },
  progressBar: {
    position: 'absolute',
    bottom: '4px',
    left: '4px',
    right: '4px',
    height: '3px',
    background: 'rgba(0, 0, 0, 0.4)',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#F59E0B',
    borderRadius: '2px',
  },
  checkmark: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    width: '16px',
    height: '16px',
    background: '#10B981',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-8px)',
    background: 'rgba(15, 23, 42, 0.95)',
    padding: '8px 12px',
    borderRadius: '8px',
    whiteSpace: 'nowrap',
    zIndex: 100,
    pointerEvents: 'none',
  },
};

/**
 * Componente principal
 */
export default function AchievementGrid({ earnedAchievements = [], progress = {} }) {
  const earnedCount = earnedAchievements.length;
  const totalCount = 30; // Total de slots
  
  return (
    <div style={STYLES.container}>
      {/* Header */}
      <div style={STYLES.header}>
        <span style={STYLES.title}>Minhas Conquistas</span>
        <span style={STYLES.counter}>{earnedCount}/{totalCount}</span>
      </div>
      
      {/* Grid */}
      <div style={STYLES.grid}>
        {ACHIEVEMENTS_DISPLAY.map((achievement, index) => (
          <AchievementSlot
            key={achievement.id}
            achievement={achievement}
            isEarned={earnedAchievements.includes(achievement.id)}
            progress={progress[achievement.id] || 0}
            index={index}
          />
        ))}
        
        {/* Slots vazios */}
        {Array.from({ length: totalCount - ACHIEVEMENTS_DISPLAY.length }).map((_, i) => (
          <div key={`empty-${i}`} style={{ ...STYLES.slot, ...STYLES.slotEmpty }} />
        ))}
      </div>
    </div>
  );
}

/**
 * Slot individual
 */
function AchievementSlot({ achievement, isEarned, progress, index }) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  
  // Determina estado
  const isInProgress = !isEarned && progress > 0;
  const isLocked = !isEarned && progress === 0;
  
  // Estilos baseados no estado
  const slotStyle = {
    ...STYLES.slot,
    ...(isEarned ? STYLES.slotEarned : isInProgress ? STYLES.slotProgress : STYLES.slotLocked),
  };
  
  const iconStyle = {
    ...STYLES.icon,
    ...(isLocked ? STYLES.iconLocked : isInProgress ? STYLES.iconProgress : {}),
  };
  
  return (
    <motion.div
      style={slotStyle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ scale: 1.1, y: -2 }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Ícone PNG */}
      <img
        src={`/achievements/${achievement.icon}.png`}
        alt={achievement.title}
        style={iconStyle}
        draggable={false}
      />
      
      {/* Barra de progresso */}
      {isInProgress && (
        <div style={STYLES.progressBar}>
          <div style={{ ...STYLES.progressFill, width: `${progress}%` }} />
        </div>
      )}
      
      {/* Checkmark */}
      {isEarned && (
        <div style={STYLES.checkmark}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
      
      {/* Tooltip */}
      {showTooltip && (
        <div style={STYLES.tooltip}>
          <p style={{ color: 'white', fontSize: '12px', fontWeight: '500', margin: 0 }}>
            {achievement.title}
          </p>
          <p style={{ color: '#64748B', fontSize: '11px', margin: '2px 0 0 0' }}>
            {isEarned ? 'Conquistado!' : `${progress}%`}
          </p>
        </div>
      )}
    </motion.div>
  );
}
