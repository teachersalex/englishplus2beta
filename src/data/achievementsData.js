/**
 * achievementsData.js
 * Sistema de Conquistas em Tiers
 * 
 * "A questão não é atingir a perfeição, mas sim a totalidade."
 * — Carl Jung
 * 
 * Regra: 70% do tier atual desbloqueia o próximo
 */

// === HELPERS ===
const countCompletedLevels = (p) => Object.keys(p.completedLevels || {}).length;
const countCompletedNodes = (p) => {
  const nodes = {};
  Object.keys(p.completedLevels || {}).forEach(key => {
    const nodeId = key.split('-')[0]; // 'node1-level1' → 'node1'
    nodes[nodeId] = (nodes[nodeId] || 0) + 1;
  });
  return Object.values(nodes).filter(count => count >= 3).length;
};
const countCompletedStories = (p) => {
  // Conta histórias onde todos episódios foram assistidos
  // Por agora, considera "tem score" = assistiu
  return Object.keys(p.storyProgress || {}).length;
};
const countPerfectLessons = (p) => {
  return Object.values(p.completedLevels || {}).filter(l => l.accuracy >= 95).length;
};

// === TIERS ===
export const ACHIEVEMENT_TIERS = [
  {
    id: 1,
    name: 'Primeiros Passos',
    unlockRequirement: 0, // Sempre visível
    achievements: [
      { id: 'lesson1', icon: '🛡️', title: 'Primeiro Passo', desc: 'Complete 1 lição', target: 1, getValue: countCompletedLevels },
      { id: 'lesson5', icon: '📖', title: 'Estudante', desc: 'Complete 5 lições', target: 5, getValue: countCompletedLevels },
      { id: 'xp100', icon: '✨', title: 'Centelha', desc: 'Acumule 100 XP', target: 100, getValue: (p) => p.xp || 0 },
      { id: 'diamond1', icon: '💎', title: 'Diamante', desc: 'Ganhe 1 diamante', target: 1, getValue: (p) => p.diamonds || 0 },
      { id: 'node1', icon: '🏰', title: 'Conquistador', desc: 'Complete 1 node', target: 1, getValue: countCompletedNodes },
      { id: 'story1', icon: '🎧', title: 'Ouvinte', desc: 'Complete 1 história', target: 1, getValue: countCompletedStories },
      { id: 'perfect1', icon: '💯', title: 'Perfeito', desc: '1 lição com ≥95%', target: 1, getValue: countPerfectLessons },
      { id: 'level2', icon: '⬆️', title: 'Subindo', desc: 'Chegue ao nível 2', target: 2, getValue: (p) => p.level || 1 },
      { id: 'lesson10', icon: '📚', title: 'Dedicado', desc: 'Complete 10 lições', target: 10, getValue: countCompletedLevels },
      { id: 'xp500', icon: '💫', title: 'Brilhante', desc: 'Acumule 500 XP', target: 500, getValue: (p) => p.xp || 0 },
    ],
  },
  {
    id: 2,
    name: 'Ganhando Ritmo',
    unlockRequirement: 7, // 70% do tier 1
    achievements: [
      { id: 'lesson20', icon: '📕', title: 'Leitor', desc: 'Complete 20 lições', target: 20, getValue: countCompletedLevels },
      { id: 'lesson30', icon: '📗', title: 'Estudioso', desc: 'Complete 30 lições', target: 30, getValue: countCompletedLevels },
      { id: 'xp1000', icon: '🏆', title: 'Campeão', desc: 'Acumule 1000 XP', target: 1000, getValue: (p) => p.xp || 0 },
      { id: 'xp2000', icon: '👑', title: 'Realeza', desc: 'Acumule 2000 XP', target: 2000, getValue: (p) => p.xp || 0 },
      { id: 'diamond5', icon: '💎', title: 'Colecionador', desc: 'Ganhe 5 diamantes', target: 5, getValue: (p) => p.diamonds || 0 },
      { id: 'node3', icon: '🗺️', title: 'Explorador', desc: 'Complete 3 nodes', target: 3, getValue: countCompletedNodes },
      { id: 'node5', icon: '🌍', title: 'Aventureiro', desc: 'Complete 5 nodes', target: 5, getValue: countCompletedNodes },
      { id: 'story3', icon: '📻', title: 'Audiófilo', desc: 'Complete 3 histórias', target: 3, getValue: countCompletedStories },
      { id: 'perfect5', icon: '🎯', title: 'Atirador', desc: '5 lições perfeitas', target: 5, getValue: countPerfectLessons },
      { id: 'level5', icon: '🚀', title: 'Decolando', desc: 'Chegue ao nível 5', target: 5, getValue: (p) => p.level || 1 },
    ],
  },
  {
    id: 3,
    name: 'Ficando Sério',
    unlockRequirement: 7, // 70% do tier 2
    achievements: [
      { id: 'lesson50', icon: '📘', title: 'Veterano', desc: 'Complete 50 lições', target: 50, getValue: countCompletedLevels },
      { id: 'lesson75', icon: '📙', title: 'Expert', desc: 'Complete 75 lições', target: 75, getValue: countCompletedLevels },
      { id: 'xp5000', icon: '⚡', title: 'Eletrizante', desc: 'Acumule 5000 XP', target: 5000, getValue: (p) => p.xp || 0 },
      { id: 'diamond10', icon: '💠', title: 'Joalheiro', desc: 'Ganhe 10 diamantes', target: 10, getValue: (p) => p.diamonds || 0 },
      { id: 'node7', icon: '🏔️', title: 'Alpinista', desc: 'Complete 7 nodes', target: 7, getValue: countCompletedNodes },
      { id: 'node10', icon: '🌟', title: 'Mestre do Mapa', desc: 'Complete 10 nodes', target: 10, getValue: countCompletedNodes },
      { id: 'story5', icon: '🎵', title: 'Melômano', desc: 'Complete 5 histórias', target: 5, getValue: countCompletedStories },
      { id: 'perfect10', icon: '🎪', title: 'Artista', desc: '10 lições perfeitas', target: 10, getValue: countPerfectLessons },
      { id: 'perfect20', icon: '🎭', title: 'Virtuoso', desc: '20 lições perfeitas', target: 20, getValue: countPerfectLessons },
      { id: 'level10', icon: '🔥', title: 'Em Chamas', desc: 'Chegue ao nível 10', target: 10, getValue: (p) => p.level || 1 },
    ],
  },
  {
    id: 4,
    name: 'Elite',
    unlockRequirement: 7,
    achievements: [
      { id: 'lesson100', icon: '💪', title: 'Centurião', desc: 'Complete 100 lições', target: 100, getValue: countCompletedLevels },
      { id: 'xp10000', icon: '🌈', title: 'Lendário', desc: 'Acumule 10000 XP', target: 10000, getValue: (p) => p.xp || 0 },
      { id: 'diamond20', icon: '👸', title: 'Aristocrata', desc: 'Ganhe 20 diamantes', target: 20, getValue: (p) => p.diamonds || 0 },
      { id: 'story10', icon: '🎼', title: 'Maestro', desc: 'Complete 10 histórias', target: 10, getValue: countCompletedStories },
      { id: 'perfect50', icon: '🏅', title: 'Olímpico', desc: '50 lições perfeitas', target: 50, getValue: countPerfectLessons },
      { id: 'level15', icon: '☀️', title: 'Radiante', desc: 'Chegue ao nível 15', target: 15, getValue: (p) => p.level || 1 },
      { id: 'level20', icon: '🌙', title: 'Iluminado', desc: 'Chegue ao nível 20', target: 20, getValue: (p) => p.level || 1 },
      { id: 'allnodes', icon: '🗿', title: 'Deus do Mapa', desc: 'Complete todos os nodes', target: 10, getValue: countCompletedNodes },
      { id: 'lesson150', icon: '🦅', title: 'Águia', desc: 'Complete 150 lições', target: 150, getValue: countCompletedLevels },
      { id: 'xp20000', icon: '🌌', title: 'Cósmico', desc: 'Acumule 20000 XP', target: 20000, getValue: (p) => p.xp || 0 },
    ],
  },
  {
    id: 5,
    name: 'Mestre',
    unlockRequirement: 7,
    achievements: [
      { id: 'lesson200', icon: '🐉', title: 'Dragão', desc: 'Complete 200 lições', target: 200, getValue: countCompletedLevels },
      { id: 'xp50000', icon: '🔮', title: 'Místico', desc: 'Acumule 50000 XP', target: 50000, getValue: (p) => p.xp || 0 },
      { id: 'diamond50', icon: '💍', title: 'Imperador', desc: 'Ganhe 50 diamantes', target: 50, getValue: (p) => p.diamonds || 0 },
      { id: 'perfect100', icon: '🏛️', title: 'Panteão', desc: '100 lições perfeitas', target: 100, getValue: countPerfectLessons },
      { id: 'level30', icon: '⭐', title: 'Estrela', desc: 'Chegue ao nível 30', target: 30, getValue: (p) => p.level || 1 },
      { id: 'story20', icon: '🎬', title: 'Diretor', desc: 'Complete 20 histórias', target: 20, getValue: countCompletedStories },
      { id: 'lesson300', icon: '🦁', title: 'Leão', desc: 'Complete 300 lições', target: 300, getValue: countCompletedLevels },
      { id: 'xp100000', icon: '🌠', title: 'Supernova', desc: 'Acumule 100000 XP', target: 100000, getValue: (p) => p.xp || 0 },
      { id: 'level50', icon: '👁️', title: 'Oráculo', desc: 'Chegue ao nível 50', target: 50, getValue: (p) => p.level || 1 },
      { id: 'master', icon: '🎓', title: 'Mestre do Inglês', desc: 'Complete todas as conquistas', target: 1, getValue: () => 0 }, // Special
    ],
  },
];

// === UTILITIES ===

/**
 * Calcula quantas conquistas de um tier foram desbloqueadas
 */
export const getTierProgress = (tierAchievements, earnedIds) => {
  return tierAchievements.filter(a => earnedIds.includes(a.id)).length;
};

/**
 * Retorna os tiers visíveis baseado no progresso
 */
export const getVisibleTiers = (earnedAchievements = []) => {
  const visible = [];
  
  for (let i = 0; i < ACHIEVEMENT_TIERS.length; i++) {
    const tier = ACHIEVEMENT_TIERS[i];
    
    if (i === 0) {
      visible.push(tier);
      continue;
    }
    
    // Checa se tier anterior tem 70%
    const prevTier = ACHIEVEMENT_TIERS[i - 1];
    const prevProgress = getTierProgress(prevTier.achievements, earnedAchievements);
    
    if (prevProgress >= tier.unlockRequirement) {
      visible.push(tier);
    } else {
      break;
    }
  }
  
  return visible;
};

/**
 * Retorna todas conquistas visíveis
 */
export const getVisibleAchievements = (earnedAchievements = []) => {
  const tiers = getVisibleTiers(earnedAchievements);
  return tiers.flatMap(t => t.achievements);
};

/**
 * Checa novas conquistas desbloqueadas
 * Retorna array de IDs novos
 */
export const checkNewAchievements = (progress, currentEarned = []) => {
  const newlyEarned = [];
  
  // Checa todas as conquistas de todos os tiers
  // (mesmo tiers não visíveis, pra salvar quando desbloquear)
  ACHIEVEMENT_TIERS.forEach(tier => {
    tier.achievements.forEach(achievement => {
      if (currentEarned.includes(achievement.id)) return;
      
      const currentValue = achievement.getValue(progress);
      if (currentValue >= achievement.target) {
        newlyEarned.push(achievement.id);
      }
    });
  });
  
  return newlyEarned;
};

/**
 * Retorna dados completos de uma conquista por ID
 */
export const getAchievementById = (id) => {
  for (const tier of ACHIEVEMENT_TIERS) {
    const found = tier.achievements.find(a => a.id === id);
    if (found) return { ...found, tier: tier.id, tierName: tier.name };
  }
  return null;
};

/**
 * Stats gerais
 */
export const getAchievementStats = (earnedAchievements = []) => {
  const visibleTiers = getVisibleTiers(earnedAchievements);
  const visibleAchievements = visibleTiers.flatMap(t => t.achievements);
  const totalVisible = visibleAchievements.length;
  const totalEarnedVisible = visibleAchievements.filter(a => earnedAchievements.includes(a.id)).length;
  const totalAll = ACHIEVEMENT_TIERS.flatMap(t => t.achievements).length;
  const totalEarnedAll = earnedAchievements.length;
  
  return {
    visible: totalEarnedVisible,
    visibleTotal: totalVisible,
    all: totalEarnedAll,
    allTotal: totalAll,
    currentTier: visibleTiers.length,
    maxTier: ACHIEVEMENT_TIERS.length,
  };
};
