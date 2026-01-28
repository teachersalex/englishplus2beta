/**
 * achievementsData.js
 * Sistema de Conquistas - ARQUITETURA ZIG-ZAG
 * 
 * FILOSOFIA:
 * - ZERO conquistas silenciosas (todas têm modal)
 * - Ritmo Zig-Zag: Mapa (ímpares) vs Grind (pares)
 * - Badge só acende APÓS celebrar
 * - "Desbloqueada" ≠ "Celebrada"
 * 
 * DISTRIBUIÇÃO (10 nodes × 3 rodadas = 30 sessões):
 * 
 * Node 1:  1/3 → lesson1    | 3/3 → node1 + 💎
 * Node 2:  3/3 → lesson6 + 💎 (grind)
 * Node 3:  3/3 → node3 + 💎 (mapa)
 * Node 4:  3/3 → perfect5 + 💎 (habilidade)
 * Node 5:  3/3 → node5 + 💎 (mapa)
 * Node 6:  3/3 → lesson18 + 💎 (grind)
 * Node 7:  3/3 → node7 + 💎 (mapa)
 * Node 8:  3/3 → perfect10 + 💎 (perfeição)
 * Node 9:  3/3 → diamond10 + 💎 (recurso)
 * Node 10: 3/3 → node10 + allnodes + 💎 (GLÓRIA)
 * 
 * HISTÓRIAS (paralelo, nunca colidem):
 * story1, story3, story5, story10, story20
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
    return episodeCount >= 3; // Considera série completa com 3+ episódios feitos
  }).length;
};

const countPerfectLessons = (p) => {
  return Object.values(p.completedLevels || {}).filter(l => l.accuracy >= 95).length;
};

const countDiamonds = (p) => p.diamonds || 0;
const getXP = (p) => p.xp || 0;
const getLevel = (p) => p.level || 1;
const getStreak = (p) => p.streak || 0;

// === PRIORIDADES (maior = mais importante = aparece primeiro) ===
// Usado quando múltiplas desbloqueiam no mesmo momento
const PRIORITIES = {
  // LENDÁRIAS (aparecem primeiro sempre)
  allnodes: 100,
  master: 100,
  node10: 95,
  
  // MARCOS DE MAPA (alta prioridade)
  node1: 90,
  node3: 85,
  node5: 85,
  node7: 85,
  
  // PRIMEIRO PASSO (única que aparece no 1/3)
  lesson1: 90,
  
  // GRIND MILESTONES (média-alta)
  lesson6: 70,
  lesson18: 70,
  lesson30: 75,
  perfect5: 70,
  perfect10: 75,
  perfect20: 80,
  diamond10: 75,
  diamond20: 80,
  
  // HISTÓRIAS (nunca competem com mapa)
  story1: 85,
  story3: 80,
  story5: 80,
  story10: 85,
  story20: 90,
  
  // XP/LEVEL (menor prioridade - mas ainda têm modal!)
  xp500: 50,
  xp1000: 55,
  xp2500: 60,
  xp5000: 65,
  xp10000: 70,
  level5: 50,
  level10: 55,
  level15: 60,
  level20: 65,
  
  // DEFAULT
  default: 40,
};

export const getPriority = (id) => PRIORITIES[id] ?? PRIORITIES.default;

// === TODAS AS CONQUISTAS ===
// Organizadas por QUANDO devem desbloquear (não por tier visual)

export const ALL_ACHIEVEMENTS = [
  // ========== PRIMEIRO PASSO (Node 1, 1/3) ==========
  {
    id: 'lesson1',
    icon: '🛡️',
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
    icon: '🏰',
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
    icon: '📚',
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
    icon: '🗺️',
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
    icon: '🎯',
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
    icon: '🌍',
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
    icon: '📖',
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
    icon: '🏔️',
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
    icon: '💯',
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
    icon: '💎',
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
    icon: '🌟',
    title: 'Mestre do Mapa',
    desc: 'Complete todos os 10 nodes',
    quote: 'O mapa inteiro é seu. Lendário.',
    target: 10,
    getValue: countCompletedNodes,
    category: 'map',
  },
  {
    id: 'allnodes',
    icon: '🗿',
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
    icon: '🎧',
    title: 'Ouvinte',
    desc: 'Complete sua primeira história',
    quote: 'A primeira história terminou. Muitas virão.',
    target: 1,
    getValue: countCompletedStories,
    category: 'stories',
  },
  {
    id: 'story3',
    icon: '📻',
    title: 'Audiófilo',
    desc: 'Complete 3 histórias',
    quote: 'Três narrativas absorvidas. Seu ouvido evolui.',
    target: 3,
    getValue: countCompletedStories,
    category: 'stories',
  },
  {
    id: 'story5',
    icon: '🎵',
    title: 'Melômano',
    desc: 'Complete 5 histórias',
    quote: 'Cinco histórias. O inglês soa natural.',
    target: 5,
    getValue: countCompletedStories,
    category: 'stories',
  },
  {
    id: 'story10',
    icon: '🎼',
    title: 'Maestro',
    desc: 'Complete 10 histórias',
    quote: 'Dez sinfonias de palavras. Virtuoso.',
    target: 10,
    getValue: countCompletedStories,
    category: 'stories',
  },
  {
    id: 'story20',
    icon: '🎬',
    title: 'Diretor',
    desc: 'Complete 20 histórias',
    quote: 'Vinte narrativas. Você dirige seu aprendizado.',
    target: 20,
    getValue: countCompletedStories,
    category: 'stories',
  },

  // ========== XP MILESTONES (espaçados para não colidir) ==========
  {
    id: 'xp500',
    icon: '✨',
    title: 'Centelha',
    desc: 'Acumule 500 XP',
    quote: 'Quinhentos pontos de experiência. A centelha virou chama.',
    target: 500,
    getValue: getXP,
    category: 'xp',
  },
  {
    id: 'xp1000',
    icon: '💫',
    title: 'Brilhante',
    desc: 'Acumule 1000 XP',
    quote: 'Mil XP. Você brilha.',
    target: 1000,
    getValue: getXP,
    category: 'xp',
  },
  {
    id: 'xp2500',
    icon: '⚡',
    title: 'Eletrizante',
    desc: 'Acumule 2500 XP',
    quote: 'Energia acumulada. Imparável.',
    target: 2500,
    getValue: getXP,
    category: 'xp',
  },
  {
    id: 'xp5000',
    icon: '🔥',
    title: 'Em Chamas',
    desc: 'Acumule 5000 XP',
    quote: 'Cinco mil. O fogo não apaga.',
    target: 5000,
    getValue: getXP,
    category: 'xp',
  },
  {
    id: 'xp10000',
    icon: '🌟',
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
    icon: '🚀',
    title: 'Decolando',
    desc: 'Alcance o nível 5',
    quote: 'Nível 5. A decolagem foi suave.',
    target: 5,
    getValue: getLevel,
    category: 'level',
  },
  {
    id: 'level10',
    icon: '🛸',
    title: 'Órbita',
    desc: 'Alcance o nível 10',
    quote: 'Nível 10. Você está em órbita.',
    target: 10,
    getValue: getLevel,
    category: 'level',
  },
  {
    id: 'level15',
    icon: '🌙',
    title: 'Lunar',
    desc: 'Alcance o nível 15',
    quote: 'Nível 15. A lua foi alcançada.',
    target: 15,
    getValue: getLevel,
    category: 'level',
  },
  {
    id: 'level20',
    icon: '☀️',
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
    icon: '📕',
    title: 'Veterano',
    desc: 'Complete 30 lições',
    quote: 'Trinta lições. Veterano de guerra.',
    target: 30,
    getValue: countCompletedLevels,
    category: 'grind',
  },
  {
    id: 'perfect20',
    icon: '🎭',
    title: 'Virtuoso',
    desc: '20 lições perfeitas',
    quote: 'Vinte perfeitas. Virtuosismo puro.',
    target: 20,
    getValue: countPerfectLessons,
    category: 'skill',
  },
  {
    id: 'diamond20',
    icon: '💠',
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
    icon: '🎓',
    title: 'Mestre do Inglês',
    desc: 'Complete todas as conquistas',
    quote: 'Não há mais nada a conquistar. Você é o mestre.',
    target: 30, // Número de conquistas - 1 (essa)
    getValue: (p) => (p.earnedAchievements || []).length,
    category: 'legendary',
  },
];

// === UTILIDADES ===

/**
 * Retorna conquista por ID
 */
export const getAchievementById = (id) => {
  return ALL_ACHIEVEMENTS.find(a => a.id === id) || null;
};

/**
 * Checa quais conquistas foram desbloqueadas mas ainda não celebradas
 * @param {Object} progress - Progresso atual
 * @param {Array} earnedAchievements - Conquistas já celebradas
 * @param {Array} pendingAchievements - Conquistas na fila
 * @returns {Array} IDs de conquistas recém desbloqueadas
 */
export const checkNewAchievements = (progress, earnedAchievements = [], pendingAchievements = []) => {
  const alreadyProcessed = [...earnedAchievements, ...pendingAchievements];
  const newlyUnlocked = [];
  
  ALL_ACHIEVEMENTS.forEach(achievement => {
    // Pula se já foi processada
    if (alreadyProcessed.includes(achievement.id)) return;
    
    // Checa se atingiu o target
    const currentValue = achievement.getValue(progress);
    if (currentValue >= achievement.target) {
      newlyUnlocked.push(achievement.id);
    }
  });
  
  // Ordena por prioridade (maior primeiro)
  return newlyUnlocked.sort((a, b) => getPriority(b) - getPriority(a));
};

/**
 * Retorna conquistas para exibir na Home
 * Só mostra as que foram CELEBRADAS (earnedAchievements)
 */
export const getDisplayAchievements = (earnedAchievements = []) => {
  return ALL_ACHIEVEMENTS.map(a => ({
    ...a,
    earned: earnedAchievements.includes(a.id),
  }));
};

/**
 * Estatísticas gerais
 * Mantém compatibilidade com HomeScreen (visible/visibleTotal)
 */
export const getAchievementStats = (earnedAchievements = [], pendingAchievements = []) => {
  const total = ALL_ACHIEVEMENTS.length;
  const earned = earnedAchievements.length;
  const pending = pendingAchievements?.length || 0;
  
  return {
    // Novos campos (v2)
    earned,
    pending,
    total,
    percent: Math.round((earned / total) * 100),
    
    // Compatibilidade com HomeScreen
    visible: earned,
    visibleTotal: total,
  };
};

/**
 * Agrupa conquistas por categoria (para UI)
 */
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

// === COMPATIBILIDADE (funções usadas pelo HomeScreen) ===

/**
 * Retorna conquistas visíveis (todas, já que não temos mais tiers ocultos)
 * Mantido para compatibilidade com HomeScreen
 */
export const getVisibleAchievements = (earnedAchievements = []) => {
  return ALL_ACHIEVEMENTS.map(a => ({
    ...a,
    earned: earnedAchievements.includes(a.id),
  }));
};

/**
 * Alias para compatibilidade
 */
export const ACHIEVEMENT_TIERS = [
  {
    id: 1,
    name: 'Conquistas',
    achievements: ALL_ACHIEVEMENTS,
  }
];

export default ALL_ACHIEVEMENTS;