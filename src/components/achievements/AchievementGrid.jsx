/**
 * AchievementGrid.jsx
 * Grid de conquistas - TAMANHO EQUILIBRADO
 */

import { motion } from 'framer-motion';

const ACHIEVEMENT_ICONS = {
  // Lições
  lesson1: 'shield',
  lesson6: 'book',
  lesson18: 'scroll',
  lesson30: 'encyclopedia',
  
  // Nodes do mapa
  node1: 'castle',
  node3: 'map',
  node5: 'globe',
  node7: 'mountain',
  node10: 'star',
  allnodes: 'monument',
  
  // Perfeitos
  perfect5: 'target',
  perfect10: 'medal',
  perfect20: 'masks',
  
  // Diamantes
  diamond10: 'diamond',
  diamond20: 'crown',
  
  // Histórias
  story1: 'headphones',
  story3: 'radio',
  story5: 'music',
  story10: 'conductor',
  story20: 'clapperboard',
  
  // XP
  xp500: 'sparkle',
  xp1000: 'comet',
  xp2500: 'bolt',
  xp5000: 'fire',
  xp10000: 'supernova',
  
  // Níveis
  level5: 'rocket',
  level10: 'ufo',
  level15: 'moon',
  level20: 'sun',
  
  // Especial
  master: 'trophy',
};

const DISPLAY_ORDER = [
  // Linha 1 - Primeiras conquistas
  'lesson1', 'node1', 'lesson6', 'node3', 'perfect5',
  'node5', 'story1', 'xp500', 'level5', 'diamond10',
  // Linha 2 - Conquistas intermediárias
  'node7', 'node10', 'story3', 'lesson18', 'perfect10',
  'xp1000', 'story5', 'level10', 'xp2500', 'diamond20',
  // Linha 3+ - Conquistas avançadas (se expandir pra 30)
  'allnodes', 'story10', 'lesson30', 'perfect20', 'xp5000',
  'level15', 'story20', 'xp10000', 'level20', 'master',
];

export default function AchievementGrid({ 
  achievements,
  earnedAchievements = [], 
  progress = {},
  onSelectAchievement,
}) {
  const totalSlots = 20;
  
  const sortedAchievements = [...achievements].sort((a, b) => {
    const indexA = DISPLAY_ORDER.indexOf(a.id);
    const indexB = DISPLAY_ORDER.indexOf(b.id);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  }).slice(0, totalSlots);

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
      
      {Array.from({ length: Math.max(0, totalSlots - sortedAchievements.length) }).map((_, i) => (
        <div
          key={`empty-${i}`}
          className="aspect-square rounded-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed rgba(255, 255, 255, 0.05)',
          }}
        />
      ))}
    </div>
  );
}

function AchievementSlot({ achievement, iconName, isEarned, percent, index, onClick }) {
  const isInProgress = !isEarned && percent > 0;
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.01 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="aspect-square rounded-lg flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: isEarned 
          ? 'rgba(59, 130, 246, 0.15)' 
          : 'rgba(255, 255, 255, 0.05)',
      }}
    >
      <img
        src={`/achievements/${iconName}.png`}
        alt={achievement.title}
        className="w-[65%] h-[65%] object-contain"
        style={{
          filter: isEarned ? 'none' : 'grayscale(1) brightness(0.4)',
          opacity: isEarned ? 1 : (isInProgress ? 0.6 : 0.3),
        }}
        draggable={false}
      />
      
      {isInProgress && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5"
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
    </motion.button>
  );
}