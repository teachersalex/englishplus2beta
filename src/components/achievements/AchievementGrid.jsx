/**
 * AchievementGrid.jsx
 * Grid de conquistas com imagens PNG
 * 
 * Coloque em: src/components/achievements/AchievementGrid.jsx
 * Imagens em: public/achievements/[icon].png
 */

import { motion } from 'framer-motion';

// Mapeamento: achievement ID → arquivo de imagem
const ACHIEVEMENT_ICONS = {
  // Milestones
  lesson1: 'shield',
  node1: 'castle',
  lesson6: 'book',
  node3: 'map',
  perfect5: 'target',
  node5: 'globe',
  story1: 'music',
  xp500: 'bolt',
  level5: 'rocket',
  diamond10: 'diamond',
  node7: 'mountain',
  node10: 'star',
  master: 'trophy',
  // Adicione mais conforme necessário
};

// Ordem de exibição dos achievements
const DISPLAY_ORDER = [
  'lesson1', 'node1', 'lesson6', 'node3', 'perfect5',
  'node5', 'story1', 'xp500', 'level5', 'diamond10',
  'node7', 'node10', 'master',
];

/**
 * Componente principal - substitui a seção de conquistas no HomeScreen
 */
export default function AchievementGrid({ 
  achievements,      // Array de objetos {id, title, desc, target, getValue}
  earnedAchievements = [], 
  progress = {},
  onSelectAchievement,
}) {
  const totalSlots = 30;
  
  // Ordena achievements conforme DISPLAY_ORDER
  const sortedAchievements = [...achievements].sort((a, b) => {
    const indexA = DISPLAY_ORDER.indexOf(a.id);
    const indexB = DISPLAY_ORDER.indexOf(b.id);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  return (
    <div className="grid grid-cols-10 gap-2">
      {sortedAchievements.map((achievement, index) => {
        const isEarned = earnedAchievements.includes(achievement.id);
        const currentValue = achievement.getValue?.(progress) || 0;
        const percent = Math.min(100, Math.round((currentValue / achievement.target) * 100));
        const iconName = ACHIEVEMENT_ICONS[achievement.id] || 'shield';
        
        return (
          <AchievementSlot
            key={achievement.id}
            achievement={achievement}
            iconName={iconName}
            isEarned={isEarned}
            percent={percent}
            index={index}
            onClick={() => onSelectAchievement?.(achievement)}
          />
        );
      })}
      
      {/* Slots vazios */}
      {Array.from({ length: Math.max(0, totalSlots - sortedAchievements.length) }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="aspect-square rounded-xl"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed rgba(255, 255, 255, 0.05)',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Slot individual de achievement
 */
function AchievementSlot({ achievement, iconName, isEarned, percent, index, onClick }) {
  const isInProgress = !isEarned && percent > 0;
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.02 }}
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="aspect-square rounded-xl flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: isEarned 
          ? 'rgba(59, 130, 246, 0.15)' 
          : 'rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Imagem do ícone */}
      <img
        src={`/achievements/${iconName}.png`}
        alt={achievement.title}
        className="w-[70%] h-[70%] object-contain"
        style={{
          filter: isEarned ? 'none' : 'grayscale(1) brightness(0.4)',
          opacity: isEarned ? 1 : (isInProgress ? 0.6 : 0.3),
        }}
        draggable={false}
      />
      
      {/* Barra de progresso */}
      {isInProgress && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        >
          <div
            className="h-full"
            style={{ 
              width: `${percent}%`, 
              backgroundColor: '#F59E0B',
            }}
          />
        </div>
      )}
      
      {/* Checkmark para earned */}
      {isEarned && (
        <div 
          className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
          style={{ backgroundColor: '#10B981' }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </motion.button>
  );
}