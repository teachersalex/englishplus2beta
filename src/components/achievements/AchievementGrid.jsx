/**
 * AchievementGrid.jsx
 * Grid de conquistas - RESPONSIVO
 * 
 * Mobile: 5 colunas × 2 rows = 10 visíveis
 * Desktop: 10 colunas × 2 rows = 20 visíveis
 * 
 * ATUALIZADO: IDs compatíveis com achievementsData.js v2
 */

import { motion } from 'framer-motion';
import { COLORS } from '../../tokens';
import { ACHIEVEMENT_ICONS } from '../../data/achievementsData';

// Ordem de exibição - IDs do novo sistema
const DISPLAY_ORDER = [
  // Linha 1 - Primeiros passos
  'first_lesson', 'first_node', 'first_perfect', 'diamond1', 'lesson5',
  'perfect4', 'streak3', 'node5', 'perfect8', 'lesson12',
  // Linha 2 - Intermediário
  'xp1500', 'node10', 'perfect14', 'lesson20', 'streak7',
  'diamond7', 'lesson35', 'perfect22', 'xp5000', 'story1',
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
  
  // Ordena por DISPLAY_ORDER, depois conquistas ganhas primeiro
  const sortedAchievements = [...achievements].sort((a, b) => {
    // Prioridade 1: Ordem definida
    const indexA = DISPLAY_ORDER.indexOf(a.id);
    const indexB = DISPLAY_ORDER.indexOf(b.id);
    
    // Se ambos estão na lista, usa a ordem
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    
    // Se só um está na lista, ele vem primeiro
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    
    // Prioridade 2: Conquistadas primeiro
    const earnedA = earnedAchievements.includes(a.id);
    const earnedB = earnedAchievements.includes(b.id);
    if (earnedA && !earnedB) return -1;
    if (!earnedA && earnedB) return 1;
    
    return 0;
  });

  const hasMore = sortedAchievements.length > mobileSlots;

  return (
    <div>
      {/* Grid responsivo: 5 cols mobile, 10 cols desktop */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-2">
        {sortedAchievements.slice(0, desktopSlots).map((achievement, index) => {
          const isEarned = earnedAchievements.includes(achievement.id);
          const currentValue = achievement.getValue?.(progress) || 0;
          const target = achievement.target || 1;
          const percent = Math.min(100, Math.round((currentValue / target) * 100));
          const iconName = ACHIEVEMENT_ICONS[achievement.id] || 'star';
          
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