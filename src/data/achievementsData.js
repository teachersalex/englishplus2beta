/**
 * achievementsData.js
 * Sistema de Conquistas - ARQUITETURA ZIG-ZAG
 * 
 * FILOSOFIA:
 * - ZERO conquistas silenciosas (todas têm modal)
 * - Ritmo Zig-Zag: Mapa (ímpares) vs Grind (pares)
 * - Badge só acende APÓS celebrar
 * - "Desbloqueada" ≠ "Celebrada"
 */

// === HELPERS ===
const countCompletedLevels = (p) => Object.keys(p.completedLevels || {}).length;

const countCompletedNodes = (p) => {
  const nodes = {};
  Object.keys(p.completedLevels || {}).forEach(key => {
    const nodeId = key.split('-')[0];
    nodes[nodeId] = (nodes[nodeId] || 0) + 1;
  });
  return Object.values(nodes).filter(count => count >= 3).length;
};

const countCompletedStories = (p) => {
  return Object.values(p.storyProgress || {}).filter(s => {
    const episodeCount = Object.keys(s.scores || {}).length;
    return episodeCount >= 3;
  }).length;
};

const countPerfectLessons = (p) => {
  return Object.values(p.completedLevels || {}).filter(l => l.accuracy >= 95).length;
};

const countDiamonds = (p) => p.diamonds || 0;
const getXP = (p) => p.xp || 0;
const getLevel = (p) => p.level || 1;

// === MAPEAMENTO DE ÍCONES (PNG) ===
// Arquivos em /public/achievements/*.png
export const ACHIEVEMENT_ICONS = {
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

// Helper para pegar o arquivo PNG
export const getAchievementIcon = (id) => {
  const iconName = ACHIEVEMENT_ICONS[id] || 'shield';
  return `/achievements/${iconName}.png`;
};

// === PRIORIDADES ===
const PRIORITIES = {
  allnodes: 100,
  master: 100,
  node10: 95,
  node1: 90,
  node3: 85,
  node5: 85,
  node7: 85,
  lesson1: 90,
  lesson6: 70,
  lesson18: 70,
  lesson30: 75,
  perfect5: 70,
  perfect10: 75,
  perfect20: 80,
  diamond10: 75,
  diamond20: 80,
  story1: 85,
  story3: 80,
  story5: 80,
  story10: 85,
  story20: 90,
  xp500: 50,
  xp1000: 55,
  xp2500: 60,
  xp5000: 65,
  xp10000: 70,
  level5: 50,
  level10: 55,
  level15: 60,
  level20: 65,
  default: 40,
};

export const getPriority = (id) => PRIORITIES[id] ?? PRIORITIES.default;

// === TODAS AS CONQUISTAS ===
export const ALL_ACHIEVEMENTS = [
  // ========== PRIMEIRO PASSO (Node 1, 1/3) ==========
  {
    id: 'lesson1',
    title: 'Primeiro Passo',
    desc: 'Complete sua primeira lição',
    quote: 'O primeiro passo foi dado. A jornada começou.',
    target: 1,
    getValue: countCompletedLevels,
    category: 'milestone',
  },

  // ========== NODE 1 COMPLETO (3/3) ==========
  {
    id: 'node1',
    title: 'Conquistador',
    desc: 'Complete o primeiro node',
    quote: 'Você conquistou seu primeiro território.',
    target: 1,
    getValue: countCompletedNodes,
    category: 'map',
  },

  // ========== NODE 2 COMPLETO (grind) ==========
  {
    id: 'lesson6',
    title: 'Estudante',
    desc: 'Complete 6 lições',
    quote: 'Seis lições. O hábito está se formando.',
    target: 6,
    getValue: countCompletedLevels,
    category: 'grind',
  },

  // ========== NODE 3 COMPLETO (mapa) ==========
  {
    id: 'node3',
    title: 'Explorador',
    desc: 'Complete 3 nodes',
    quote: 'O mapa começa a revelar seus segredos.',
    target: 3,
    getValue: countCompletedNodes,
    category: 'map',
  },

  // ========== NODE 4 COMPLETO (habilidade) ==========
  {
    id: 'perfect5',
    title: 'Atirador',
    desc: '5 lições com 95%+',
    quote: 'Precisão é poder. Cinco tiros certeiros.',
    target: 5,
    getValue: countPerfectLessons,
    category: 'skill',
  },

  // ========== NODE 5 COMPLETO (mapa - midgame) ==========
  {
    id: 'node5',
    title: 'Aventureiro',
    desc: 'Complete 5 nodes',
    quote: 'Metade do mapa conquistado. Você é persistente.',
    target: 5,
    getValue: countCompletedNodes,
    category: 'map',
  },

  // ========== NODE 6 COMPLETO (grind) ==========
  {
    id: 'lesson18',
    title: 'Leitor',
    desc: 'Complete 18 lições',
    quote: 'Dezoito capítulos da sua história.',
    target: 18,
    getValue: countCompletedLevels,
    category: 'grind',
  },

  // ========== NODE 7 COMPLETO (mapa) ==========
  {
    id: 'node7',
    title: 'Alpinista',
    desc: 'Complete 7 nodes',
    quote: 'O pico está próximo. Continue subindo.',
    target: 7,
    getValue: countCompletedNodes,
    category: 'map',
  },

  // ========== NODE 8 COMPLETO (perfeição) ==========
  {
    id: 'perfect10',
    title: 'Perfeccionista',
    desc: '10 lições perfeitas',
    quote: 'Dez vezes impecável. Excelência como hábito.',
    target: 10,
    getValue: countPerfectLessons,
    category: 'skill',
  },

  // ========== NODE 9 COMPLETO (recurso) ==========
  {
    id: 'diamond10',
    title: 'Colecionador',
    desc: 'Acumule 10 diamantes',
    quote: 'Dez diamantes brilham no seu cofre.',
    target: 10,
    getValue: countDiamonds,
    category: 'resource',
  },

  // ========== NODE 10 COMPLETO (GLÓRIA) ==========
  {
    id: 'node10',
    title: 'Mestre do Mapa',
    desc: 'Complete todos os 10 nodes',
    quote: 'O mapa inteiro é seu. Lendário.',
    target: 10,
    getValue: countCompletedNodes,
    category: 'map',
  },
  {
    id: 'allnodes',
    title: 'Deus do Mapa',
    desc: 'Domine todo o território',
    quote: 'Você transcendeu. O mapa se curva.',
    target: 10,
    getValue: countCompletedNodes,
    category: 'legendary',
  },

  // ========== HISTÓRIAS (paralelo) ==========
  {
    id: 'story1',
    title: 'Ouvinte',
    desc: 'Complete sua primeira história',
    quote: 'A primeira história terminou. Muitas virão.',
    target: 1,
    getValue: countCompletedStories,
    category: 'stories',
  },
  {
    id: 'story3',
    title: 'Audiófilo',
    desc: 'Complete 3 histórias',
    quote: 'Três narrativas absorvidas. Seu ouvido evolui.',
    target: 3,
    getValue: countCompletedStories,
    category: 'stories',
  },
  {
    id: 'story5',
    title: 'Melômano',
    desc: 'Complete 5 histórias',
    quote: 'Cinco histórias. O inglês soa natural.',
    target: 5,
    getValue: countCompletedStories,
    category: 'stories',
  },
  {
    id: 'story10',
    title: 'Maestro',
    desc: 'Complete 10 histórias',
    quote: 'Dez sinfonias de palavras. Virtuoso.',
    target: 10,
    getValue: countCompletedStories,
    category: 'stories',
  },
  {
    id: 'story20',
    title: 'Diretor',
    desc: 'Complete 20 histórias',
    quote: 'Vinte narrativas. Você dirige seu aprendizado.',
    target: 20,
    getValue: countCompletedStories,
    category: 'stories',
  },

  // ========== XP MILESTONES ==========
  {
    id: 'xp500',
    title: 'Centelha',
    desc: 'Acumule 500 XP',
    quote: 'Quinhentos pontos de experiência. A centelha virou chama.',
    target: 500,
    getValue: getXP,
    category: 'xp',
  },
  {
    id: 'xp1000',
    title: 'Brilhante',
    desc: 'Acumule 1000 XP',
    quote: 'Mil XP. Você brilha.',
    target: 1000,
    getValue: getXP,
    category: 'xp',
  },
  {
    id: 'xp2500',
    title: 'Eletrizante',
    desc: 'Acumule 2500 XP',
    quote: 'Energia acumulada. Imparável.',
    target: 2500,
    getValue: getXP,
    category: 'xp',
  },
  {
    id: 'xp5000',
    title: 'Em Chamas',
    desc: 'Acumule 5000 XP',
    quote: 'Cinco mil. O fogo não apaga.',
    target: 5000,
    getValue: getXP,
    category: 'xp',
  },
  {
    id: 'xp10000',
    title: 'Estelar',
    desc: 'Acumule 10000 XP',
    quote: 'Dez mil XP. Uma estrela nasceu.',
    target: 10000,
    getValue: getXP,
    category: 'xp',
  },

  // ========== LEVEL MILESTONES ==========
  {
    id: 'level5',
    title: 'Decolando',
    desc: 'Alcance o nível 5',
    quote: 'Nível 5. A decolagem foi suave.',
    target: 5,
    getValue: getLevel,
    category: 'level',
  },
  {
    id: 'level10',
    title: 'Órbita',
    desc: 'Alcance o nível 10',
    quote: 'Nível 10. Você está em órbita.',
    target: 10,
    getValue: getLevel,
    category: 'level',
  },
  {
    id: 'level15',
    title: 'Lunar',
    desc: 'Alcance o nível 15',
    quote: 'Nível 15. A lua foi alcançada.',
    target: 15,
    getValue: getLevel,
    category: 'level',
  },
  {
    id: 'level20',
    title: 'Solar',
    desc: 'Alcance o nível 20',
    quote: 'Nível 20. Você é o sol.',
    target: 20,
    getValue: getLevel,
    category: 'level',
  },

  // ========== MAIS GRIND (para endgame) ==========
  {
    id: 'lesson30',
    title: 'Veterano',
    desc: 'Complete 30 lições',
    quote: 'Trinta lições. Veterano de guerra.',
    target: 30,
    getValue: countCompletedLevels,
    category: 'grind',
  },
  {
    id: 'perfect20',
    title: 'Virtuoso',
    desc: '20 lições perfeitas',
    quote: 'Vinte perfeitas. Virtuosismo puro.',
    target: 20,
    getValue: countPerfectLessons,
    category: 'skill',
  },
  {
    id: 'diamond20',
    title: 'Joalheiro',
    desc: 'Acumule 20 diamantes',
    quote: 'Vinte gemas. Riqueza merecida.',
    target: 20,
    getValue: countDiamonds,
    category: 'resource',
  },

  // ========== CONQUISTA FINAL ==========
  {
    id: 'master',
    title: 'Mestre do Inglês',
    desc: 'Complete todas as conquistas',
    quote: 'Não há mais nada a conquistar. Você é o mestre.',
    target: 30,
    getValue: (p) => (p.earnedAchievements || []).length,
    category: 'legendary',
  },
];

// === UTILIDADES ===

export const getAchievementById = (id) => {
  return ALL_ACHIEVEMENTS.find(a => a.id === id) || null;
};

export const checkNewAchievements = (progress, earnedAchievements = [], pendingAchievements = []) => {
  const alreadyProcessed = [...earnedAchievements, ...pendingAchievements];
  const newlyUnlocked = [];
  
  ALL_ACHIEVEMENTS.forEach(achievement => {
    if (alreadyProcessed.includes(achievement.id)) return;
    
    const currentValue = achievement.getValue(progress);
    if (currentValue >= achievement.target) {
      newlyUnlocked.push(achievement.id);
    }
  });
  
  return newlyUnlocked.sort((a, b) => getPriority(b) - getPriority(a));
};

export const getDisplayAchievements = (earnedAchievements = []) => {
  return ALL_ACHIEVEMENTS.map(a => ({
    ...a,
    earned: earnedAchievements.includes(a.id),
  }));
};

export const getAchievementStats = (earnedAchievements = [], pendingAchievements = []) => {
  const total = ALL_ACHIEVEMENTS.length;
  const earned = earnedAchievements.length;
  const pending = pendingAchievements?.length || 0;
  
  return {
    earned,
    pending,
    total,
    percent: Math.round((earned / total) * 100),
    visible: earned,
    visibleTotal: total,
  };
};

export const getAchievementsByCategory = (earnedAchievements = []) => {
  const categories = {
    milestone: { name: 'Marcos', achievements: [] },
    map: { name: 'Mapa', achievements: [] },
    grind: { name: 'Dedicação', achievements: [] },
    skill: { name: 'Habilidade', achievements: [] },
    resource: { name: 'Recursos', achievements: [] },
    stories: { name: 'Histórias', achievements: [] },
    xp: { name: 'Experiência', achievements: [] },
    level: { name: 'Nível', achievements: [] },
    legendary: { name: 'Lendárias', achievements: [] },
  };
  
  ALL_ACHIEVEMENTS.forEach(a => {
    const cat = categories[a.category] || categories.grind;
    cat.achievements.push({
      ...a,
      earned: earnedAchievements.includes(a.id),
    });
  });
  
  return categories;
};

export const getVisibleAchievements = (earnedAchievements = []) => {
  return ALL_ACHIEVEMENTS.map(a => ({
    ...a,
    earned: earnedAchievements.includes(a.id),
  }));
};

export const ACHIEVEMENT_TIERS = [
  {
    id: 1,
    name: 'Conquistas',
    achievements: ALL_ACHIEVEMENTS,
  }
];

export default ALL_ACHIEVEMENTS;