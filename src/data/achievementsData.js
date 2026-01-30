/**
 * achievementsData.js
 * Sistema de Conquistas 2.0 - ESCALONAMENTO DE DOPAMINA
 * 
 * "The reward for work well done is the opportunity to do more."
 *  — Jonas Salk
 * 
 * FILOSOFIA:
 * - M0: FESTA DE DOPAMINA (iniciante precisa de reforço constante)
 * - M1: Menos frequente, mais significativo
 * - M2+: Raro, só milestones
 * - Global: XP, diamantes, histórias (aparecem progressivamente)
 * 
 * COMPATIBILIDADE:
 * - IDs mantidos iguais ao sistema anterior (lesson1, node1, perfect5, etc)
 * - Helpers ajustados para formato real: map0:node1-0_1_bronze
 */

// === HELPERS ===

/**
 * Conta nodes completos em um mapa específico
 * Formato das chaves: map{mapId}:node{nodeId}-{levelId}
 * Exemplo: map0:node1-0_1_bronze, map0:node1-0_1_silver, map0:node1-0_1_gold
 */
const countMapNodes = (p, mapId) => {
  const prefix = `map${mapId}:node`;
  const nodes = {};
  
  Object.keys(p.completedLevels || {}).forEach(key => {
    if (key.startsWith(prefix)) {
      // Extrai nodeId: "map0:node1-0_1_bronze" → "node1"
      const match = key.match(/node(\d+)/);
      if (match) {
        const nodeKey = `node${match[1]}`;
        nodes[nodeKey] = (nodes[nodeKey] || 0) + 1;
      }
    }
  });
  
  // Node completo = 3 levels (bronze, silver, gold)
  return Object.values(nodes).filter(count => count >= 3).length;
};

/**
 * Conta TODOS os nodes completos (todos os mapas)
 */
const countAllNodes = (p) => {
  const nodes = {};
  
  Object.keys(p.completedLevels || {}).forEach(key => {
    // Extrai "map0:node1" de "map0:node1-0_1_bronze"
    const match = key.match(/(map\d+:node\d+)/);
    if (match) {
      nodes[match[1]] = (nodes[match[1]] || 0) + 1;
    }
  });
  
  return Object.values(nodes).filter(count => count >= 3).length;
};

/**
 * Conta levels completos (não nodes, levels individuais)
 */
const countCompletedLevels = (p) => Object.keys(p.completedLevels || {}).length;

/**
 * Conta levels perfeitos (95%+) em um mapa específico
 */
const countMapPerfects = (p, mapId) => {
  const prefix = `map${mapId}:`;
  return Object.entries(p.completedLevels || {})
    .filter(([key, val]) => key.startsWith(prefix) && val.accuracy >= 95)
    .length;
};

/**
 * Conta TODOS os levels perfeitos
 */
const countAllPerfects = (p) => {
  return Object.values(p.completedLevels || {})
    .filter(l => l.accuracy >= 95).length;
};

/**
 * Conta mapas 100% completos (10 nodes cada)
 */
const countCompletedMaps = (p) => {
  let count = 0;
  for (let mapId = 0; mapId < 20; mapId++) {
    if (countMapNodes(p, mapId) >= 10) count++;
  }
  return count;
};

/**
 * Histórias completas
 */
const countCompletedStories = (p) => {
  return Object.values(p.storyProgress || {}).filter(s => {
    const episodeCount = Object.keys(s.scores || {}).length;
    return episodeCount >= 3;
  }).length;
};

// Getters simples
const getDiamonds = (p) => p.diamonds || 0;
const getXP = (p) => p.xp || 0;
const getLevel = (p) => p.level || 1;
const getStreak = (p) => p.streak || 0;

// === MAPEAMENTO DE ÍCONES (mantido original) ===
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
  perfect3: 'target',
  perfect5: 'target',
  perfect10: 'medal',
  perfect20: 'masks',
  
  // Diamantes
  diamond10: 'diamond',
  diamond20: 'crown',
  diamond50: 'diamond',
  
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
  
  // Mapas
  maps3: 'compass',
  maps5: 'globe',
  
  // Especial
  master: 'trophy',
};

export const getAchievementIcon = (id) => {
  const iconName = ACHIEVEMENT_ICONS[id] || 'star';
  return `/achievements/${iconName}.png`;
};

// === CONQUISTAS POR MAPA ===
// mapId: null = global (aparece em qualquer mapa)
// mapId: 0 = só aparece quando jogador está no mapa 0
// mapId: [0,1] = aparece nos mapas 0 e 1

// Mapa 0: FESTA DE DOPAMINA (Tutorial) - ~8 conquistas
const MAP_0_ACHIEVEMENTS = [
  {
    id: 'lesson1',
    mapId: 0,
    title: 'Primeiro Passo',
    desc: 'Complete sua primeira lição',
    quote: 'O primeiro passo foi dado. A jornada começou.',
    target: 1,
    getValue: countCompletedLevels,
  },
  {
    id: 'node1',
    mapId: 0,
    title: 'Conquistador',
    desc: 'Complete o primeiro node',
    quote: 'Você conquistou seu primeiro território.',
    target: 1,
    getValue: countAllNodes,
  },
  {
    id: 'lesson6',
    mapId: 0,
    title: 'Estudante',
    desc: 'Complete 6 lições',
    quote: 'Seis lições. O hábito está se formando.',
    target: 6,
    getValue: countCompletedLevels,
  },
  {
    id: 'node3',
    mapId: 0,
    title: 'Explorador',
    desc: 'Complete 3 nodes',
    quote: 'O mapa começa a revelar seus segredos.',
    target: 3,
    getValue: countAllNodes,
  },
  {
    id: 'perfect5',
    mapId: 0,
    title: 'Atirador',
    desc: '5 lições com 95%+',
    quote: 'Precisão é poder. Cinco tiros certeiros.',
    target: 5,
    getValue: countAllPerfects,
  },
  {
    id: 'node5',
    mapId: 0,
    title: 'Aventureiro',
    desc: 'Complete 5 nodes',
    quote: 'Metade do mapa conquistado. Você é persistente.',
    target: 5,
    getValue: countAllNodes,
  },
  {
    id: 'story1',
    mapId: 0,
    title: 'Ouvinte',
    desc: 'Complete sua primeira história',
    quote: 'A primeira história terminou. Muitas virão.',
    target: 1,
    getValue: countCompletedStories,
  },
  {
    id: 'xp500',
    mapId: 0,
    title: 'Centelha',
    desc: 'Acumule 500 XP',
    quote: 'Quinhentos pontos de experiência. A centelha virou chama.',
    target: 500,
    getValue: getXP,
  },
];

// Mapa 1: MENOS FREQUENTE (To Be) - ~5 conquistas
const MAP_1_ACHIEVEMENTS = [
  {
    id: 'node7',
    mapId: 1,
    title: 'Alpinista',
    desc: 'Complete 7 nodes',
    quote: 'O pico está próximo. Continue subindo.',
    target: 7,
    getValue: countAllNodes,
  },
  {
    id: 'lesson18',
    mapId: 1,
    title: 'Leitor',
    desc: 'Complete 18 lições',
    quote: 'Dezoito capítulos da sua história.',
    target: 18,
    getValue: countCompletedLevels,
  },
  {
    id: 'perfect10',
    mapId: 1,
    title: 'Perfeccionista',
    desc: '10 lições perfeitas',
    quote: 'Dez vezes impecável. Excelência como hábito.',
    target: 10,
    getValue: countAllPerfects,
  },
  {
    id: 'story3',
    mapId: 1,
    title: 'Audiófilo',
    desc: 'Complete 3 histórias',
    quote: 'Três narrativas absorvidas. Seu ouvido evolui.',
    target: 3,
    getValue: countCompletedStories,
  },
  {
    id: 'xp1000',
    mapId: 1,
    title: 'Brilhante',
    desc: 'Acumule 1000 XP',
    quote: 'Mil XP. Você brilha.',
    target: 1000,
    getValue: getXP,
  },
];

// Mapa 2: RARO (Preposições) - ~4 conquistas
const MAP_2_ACHIEVEMENTS = [
  {
    id: 'node10',
    mapId: 2,
    title: 'Mestre do Mapa',
    desc: 'Complete 10 nodes',
    quote: 'O mapa inteiro é seu. Lendário.',
    target: 10,
    getValue: countAllNodes,
  },
  {
    id: 'lesson30',
    mapId: 2,
    title: 'Veterano',
    desc: 'Complete 30 lições',
    quote: 'Trinta lições. Veterano de guerra.',
    target: 30,
    getValue: countCompletedLevels,
  },
  {
    id: 'perfect20',
    mapId: 2,
    title: 'Virtuoso',
    desc: '20 lições perfeitas',
    quote: 'Vinte perfeitas. Virtuosismo puro.',
    target: 20,
    getValue: countAllPerfects,
  },
  {
    id: 'xp2500',
    mapId: 2,
    title: 'Eletrizante',
    desc: 'Acumule 2500 XP',
    quote: 'Energia acumulada. Imparável.',
    target: 2500,
    getValue: getXP,
  },
];

// === CONQUISTAS GLOBAIS (aparecem em qualquer mapa quando relevantes) ===
const GLOBAL_ACHIEVEMENTS = [
  {
    id: 'diamond10',
    mapId: null,
    title: 'Colecionador',
    desc: 'Acumule 10 diamantes',
    quote: 'Dez diamantes brilham no seu cofre.',
    target: 10,
    getValue: getDiamonds,
  },
  {
    id: 'diamond20',
    mapId: null,
    title: 'Joalheiro',
    desc: 'Acumule 20 diamantes',
    quote: 'Vinte gemas. Riqueza merecida.',
    target: 20,
    getValue: getDiamonds,
  },
  {
    id: 'story5',
    mapId: null,
    title: 'Melômano',
    desc: 'Complete 5 histórias',
    quote: 'Cinco histórias. O inglês soa natural.',
    target: 5,
    getValue: countCompletedStories,
  },
  {
    id: 'story10',
    mapId: null,
    title: 'Maestro',
    desc: 'Complete 10 histórias',
    quote: 'Dez sinfonias de palavras. Virtuoso.',
    target: 10,
    getValue: countCompletedStories,
  },
  {
    id: 'xp5000',
    mapId: null,
    title: 'Em Chamas',
    desc: 'Acumule 5000 XP',
    quote: 'Cinco mil. O fogo não apaga.',
    target: 5000,
    getValue: getXP,
  },
  {
    id: 'xp10000',
    mapId: null,
    title: 'Estelar',
    desc: 'Acumule 10000 XP',
    quote: 'Dez mil XP. Uma estrela nasceu.',
    target: 10000,
    getValue: getXP,
  },
  {
    id: 'level5',
    mapId: null,
    title: 'Decolando',
    desc: 'Alcance o nível 5',
    quote: 'Nível 5. A decolagem foi suave.',
    target: 5,
    getValue: getLevel,
  },
  {
    id: 'level10',
    mapId: null,
    title: 'Órbita',
    desc: 'Alcance o nível 10',
    quote: 'Nível 10. Você está em órbita.',
    target: 10,
    getValue: getLevel,
  },
  {
    id: 'master',
    mapId: null,
    title: 'Mestre do Inglês',
    desc: 'Complete todas as conquistas',
    quote: 'Não há mais nada a conquistar. Você é o mestre.',
    target: 24, // Total de conquistas - 1
    getValue: (p) => (p.earnedAchievements || []).length,
  },
];

// === TODAS AS CONQUISTAS ===
export const ALL_ACHIEVEMENTS = [
  ...MAP_0_ACHIEVEMENTS,
  ...MAP_1_ACHIEVEMENTS,
  ...MAP_2_ACHIEVEMENTS,
  ...GLOBAL_ACHIEVEMENTS,
];

// === CONQUISTAS POR MAPA (para fácil acesso) ===
export const ACHIEVEMENTS_BY_MAP = {
  0: MAP_0_ACHIEVEMENTS,
  1: MAP_1_ACHIEVEMENTS,
  2: MAP_2_ACHIEVEMENTS,
};

// === PRIORIDADES ===
const PRIORITIES = {
  node10: 100,
  master: 100,
  node1: 95,
  lesson1: 95,
  node7: 90,
  node5: 85,
  node3: 85,
  lesson30: 85,
  lesson18: 80,
  lesson6: 75,
  perfect20: 85,
  perfect10: 80,
  perfect5: 75,
  diamond20: 80,
  diamond10: 75,
  story10: 85,
  story5: 80,
  story3: 75,
  story1: 85,
  xp10000: 80,
  xp5000: 75,
  xp2500: 70,
  xp1000: 65,
  xp500: 60,
  level10: 70,
  level5: 65,
  default: 50,
};

export const getPriority = (id) => PRIORITIES[id] ?? PRIORITIES.default;

// === UTILIDADES ===

export const getAchievementById = (id) => {
  return ALL_ACHIEVEMENTS.find(a => a.id === id) || null;
};

/**
 * Verifica quais conquistas foram desbloqueadas
 */
export const checkNewAchievements = (progress, earned = [], pending = []) => {
  const alreadyProcessed = [...earned, ...pending];
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

/**
 * Retorna conquistas VISÍVEIS baseado no mapa atual
 * - Conquistas do mapa atual
 * - Conquistas de mapas anteriores já conquistadas
 * - Conquistas globais com 30%+ de progresso ou já conquistadas
 */
export const getVisibleAchievements = (currentMapId = 0, earnedAchievements = [], progress = {}) => {
  const visible = [];
  const seen = new Set();
  
  // 1. Conquistas do mapa atual (sempre visíveis)
  const currentMapAchievements = ACHIEVEMENTS_BY_MAP[currentMapId] || [];
  currentMapAchievements.forEach(a => {
    if (!seen.has(a.id)) {
      seen.add(a.id);
      visible.push({
        ...a,
        earned: earnedAchievements.includes(a.id),
      });
    }
  });
  
  // 2. Conquistas de mapas ANTERIORES já conquistadas
  for (let mapId = 0; mapId < currentMapId; mapId++) {
    const prevMapAchievements = ACHIEVEMENTS_BY_MAP[mapId] || [];
    prevMapAchievements.forEach(a => {
      if (!seen.has(a.id) && earnedAchievements.includes(a.id)) {
        seen.add(a.id);
        visible.push({
          ...a,
          earned: true,
        });
      }
    });
  }
  
  // 3. Conquistas globais
  GLOBAL_ACHIEVEMENTS.forEach(a => {
    if (seen.has(a.id)) return;
    
    const earned = earnedAchievements.includes(a.id);
    const currentValue = a.getValue(progress);
    const percent = Math.round((currentValue / a.target) * 100);
    
    // Mostra se: já conquistou OU está com mais de 25% de progresso
    if (earned || percent >= 25) {
      seen.add(a.id);
      visible.push({
        ...a,
        earned,
      });
    }
  });
  
  return visible;
};

/**
 * Stats para exibição (total = todas as conquistas)
 */
export const getAchievementStats = (earnedAchievements = []) => {
  const total = ALL_ACHIEVEMENTS.length;
  const earned = earnedAchievements.length;
  
  return {
    earned,
    total,
    percent: Math.round((earned / total) * 100),
    // Mantém compatibilidade
    visible: earned,
    visibleTotal: total,
  };
};

/**
 * Verifica se um mapa está desbloqueado
 */
export const isMapUnlocked = (mapId, progress) => {
  if (mapId === 0) {
    return { unlocked: true, reason: null, progress: 100 };
  }
  
  const previousMapId = mapId - 1;
  const previousNodes = countMapNodes(progress, previousMapId);
  const requiredNodes = 10;
  
  if (previousNodes >= requiredNodes) {
    return { unlocked: true, reason: null, progress: 100 };
  }
  
  return {
    unlocked: false,
    reason: `Complete o Mapa ${previousMapId} primeiro`,
    progress: Math.round((previousNodes / requiredNodes) * 100),
    nodesCompleted: previousNodes,
    nodesRequired: requiredNodes,
  };
};

/**
 * Conta nodes completos em um mapa (exportado para uso externo)
 */
export const getMapProgress = (mapId, progress) => {
  return countMapNodes(progress, mapId);
};

// === COMPATIBILIDADE COM CÓDIGO ANTIGO ===

export const getDisplayAchievements = (earnedAchievements = []) => {
  return ALL_ACHIEVEMENTS.map(a => ({
    ...a,
    earned: earnedAchievements.includes(a.id),
  }));
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
  
  // Categorização automática por ID
  ALL_ACHIEVEMENTS.forEach(a => {
    let cat = 'grind';
    if (a.id.startsWith('node') || a.id === 'allnodes') cat = 'map';
    else if (a.id.startsWith('lesson')) cat = 'grind';
    else if (a.id.startsWith('perfect')) cat = 'skill';
    else if (a.id.startsWith('diamond')) cat = 'resource';
    else if (a.id.startsWith('story')) cat = 'stories';
    else if (a.id.startsWith('xp')) cat = 'xp';
    else if (a.id.startsWith('level')) cat = 'level';
    else if (a.id === 'master') cat = 'legendary';
    
    categories[cat].achievements.push({
      ...a,
      earned: earnedAchievements.includes(a.id),
    });
  });
  
  return categories;
};

export const ACHIEVEMENT_TIERS = [
  { id: 1, name: 'Conquistas', achievements: ALL_ACHIEVEMENTS }
];

export default ALL_ACHIEVEMENTS;