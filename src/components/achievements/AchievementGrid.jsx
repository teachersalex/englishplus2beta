/**
 * AchievementGrid.jsx
 * Grid de conquistas - RESPONSIVO
 * 
 * Mobile: 5 colunas × 2 rows = 10 visíveis
 * Desktop: 10 colunas × 2 rows = 20 visíveis
 * 
 * ATUALIZADO: Importa ACHIEVEMENT_ICONS do achievementsData.js
 */

import { motion } from 'framer-motion';
import { COLORS } from '../../tokens';
import { ACHIEVEMENT_ICONS } from '../../data/achievementsData';

const DISPLAY_ORDER = [
  // Linha 1 - Primeiras conquistas
  'lesson1', 'node1', 'lesson6', 'node3', 'perfect5',
  'node5', 'story1', 'xp500', 'level5', 'diamond10',
  // Linha 2 - Conquistas intermediárias
  'node7', 'node10', 'story3', 'lesson18', 'perfect10',
  'xp1000', 'story5', 'level10', 'xp2500', 'diamond20',
  // Linha 3+ - Conquistas avançadas
  'allnodes', 'story10', 'lesson30', 'perfect20', 'xp5000',
  'level15', 'story20', 'xp10000', 'level20', 'master',
];

export default function AchievementGrid({ 
  achievements,
  earnedAchievements = [], 
  progress = {},
  onSelectAchievement,
  onViewAll,
}) {
  // Mobile: 5 cols × 2 rows = 10
  // Desktop: 10 cols × 2 rows = 20
  const mobileSlots = 10;
  const desktopSlots = 20;
  
  const sortedAchievements = [...achievements].sort((a, b) => {
    const indexA = DISPLAY_ORDER.indexOf(a.id);
    const indexB = DISPLAY_ORDER.indexOf(b.id);
    return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
  });

  const hasMore = sortedAchievements.length > mobileSlots;

  return (
    <div>
      {/* Grid responsivo: 5 cols mobile, 10 cols desktop */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-2">
        {sortedAchievements.slice(0, desktopSlots).map((achievement, index) => {
          const isEarned = earnedAchievements.includes(achievement.id);
          const currentValue = achievement.getValue?.(progress) || 0;
          const percent = Math.min(100, Math.round((currentValue / achievement.target) * 100));
          const iconName = ACHIEVEMENT_ICONS[achievement.id] || 'shield';
          
          // No mobile, esconde a partir do slot 10
          const hideOnMobile = index >= mobileSlots;
          
          return (
            <AchievementSlot
              key={achievement.id}
              achievement={achievement}
              iconName={iconName}
              isEarned={isEarned}
              percent={percent}
              index={index}
              hideOnMobile={hideOnMobile}
              onClick={() => onSelectAchievement?.(achievement)}
            />
          );
        })}
      </div>

      {/* "Ver todas" - só aparece no mobile quando tem mais */}
      {hasMore && (
        <button
          onClick={onViewAll}
          className="md:hidden w-full mt-3 py-2 text-sm font-medium rounded-xl flex items-center justify-center gap-1 transition-colors"
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: COLORS.textMuted,
          }}
        >
          Ver todas as conquistas
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

function AchievementSlot({ achievement, iconName, isEarned, percent, index, hideOnMobile, onClick }) {
  const isInProgress = !isEarned && percent > 0;
  
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.015 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`aspect-square rounded-xl flex items-center justify-center relative overflow-hidden ${hideOnMobile ? 'hidden md:flex' : ''}`}
      style={{
        backgroundColor: isEarned 
          ? 'rgba(59, 130, 246, 0.15)' 
          : 'rgba(255, 255, 255, 0.05)',
      }}
    >
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
          className="absolute bottom-0 left-0 right-0 h-1 md:h-0.5"
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