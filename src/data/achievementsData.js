/**
 * achievementsData.js
 * Sistema de Conquistas Escalável - EnglishPlus 2.0
 * 
 * "A dopamina não mente. O design sim."
 *  — Alex Santos
 * 
 * ARQUITETURA:
 * - Milestones escaláveis (não hardcoded por mapa)
 * - Visibilidade dinâmica (só mostra próximas)
 * - Anti-colisão por prioridade (nunca 2 ao mesmo tempo)
 * - Números de perfeitas que NUNCA são múltiplos de 3
 */

// ============================================
// MILESTONES ESCALÁVEIS
// ============================================

/**
 * Números seguros para conquistas de perfeitas
 * NUNCA múltiplos de 3 (evita colisão com nodes)
 * Espaçamento crescente (dopamina escassa)
 */
export const PERFECT_MILESTONES = [1, 4, 8, 14, 22, 32, 44, 58, 74, 92, 112, 134, 160, 190, 224];

/**
 * Milestones de lições - progressão natural
 */
export const LESSON_MILESTONES = [1, 5, 12, 20, 35, 50, 75, 100, 150, 200, 300, 500];

/**
 * Milestones de XP
 */
export const XP_MILESTONES = [500, 1500, 3000, 5000, 8000, 12000, 18000, 25000, 35000, 50000];

/**
 * Milestones de diamantes
 */
export const DIAMOND_MILESTONES = [1, 3, 7, 12, 20, 30, 45, 65, 90, 120];

/**
 * Milestones de streak (dias seguidos)
 */
export const STREAK_MILESTONES = [3, 7, 14, 30, 60, 100, 200, 365];

/**
 * Milestones de histórias completas
 */
export const STORY_MILESTONES = [1, 3, 5, 10, 15, 25, 40];


// ============================================
// SISTEMA DE PRIORIDADE (Anti-Colisão)
// ============================================

/**
 * Quanto MENOR o número, MAIOR a prioridade
 * Se 2+ conquistas desbloqueiam juntas, a de menor número aparece primeiro
 */
export const PRIORITY = {
  secret: 1,       // Easter eggs - sempre surpresa
  boss: 2,         // Boss derrotado - momento épico
  map: 3,          // Mapa completo - milestone major
  node: 4,         // Node milestone (5, 10, 15...)
  skill: 5,        // Perfeitas, diamantes
  story: 6,        // Histórias
  lesson: 7,       // Lições completadas
  xp: 8,           // XP acumulado
  habit: 9,        // Streaks
};


// ============================================
// CATEGORIAS (para agrupar na Home)
// ============================================

export const CATEGORIES = {
  milestone: { name: 'Jornada', color: '#3B82F6', icon: 'flag' },
  skill: { name: 'Habilidade', color: '#10B981', icon: 'target' },
  grind: { name: 'Dedicação', color: '#F59E0B', icon: 'fire' },
  story: { name: 'Histórias', color: '#8B5CF6', icon: 'book' },
  secret: { name: 'Secreto', color: '#EC4899', icon: 'sparkle' },
};


// ============================================
// HELPERS
// ============================================

/**
 * Conta nodes completos (todos os 3 levels)
 */
const countCompletedNodes = (progress) => {
  if (!progress?.completedLevels) return 0;
  
  const nodeSet = new Set();
  Object.keys(progress.completedLevels).forEach(levelId => {
    // levelId formato: "map0:node1-0_1_bronze"
    const match = levelId.match(/node(\d+)/);
    if (match) {
      const nodeNum = parseInt(match[1]);
      const mapMatch = levelId.match(/map(\d+)/);
      const mapNum = mapMatch ? parseInt(mapMatch[1]) : 0;
      
      // Checa se tem os 3 levels do node
      const bronzeKey = `map${mapNum}:node${nodeNum}-${mapNum}_${nodeNum}_bronze`;
      const silverKey = `map${mapNum}:node${nodeNum}-${mapNum}_${nodeNum}_silver`;
      const goldKey = `map${mapNum}:node${nodeNum}-${mapNum}_${nodeNum}_gold`;
      
      if (progress.completedLevels[bronzeKey] && 
          progress.completedLevels[silverKey] && 
          progress.completedLevels[goldKey]) {
        nodeSet.add(`${mapNum}-${nodeNum}`);
      }
    }
  });
  
  return nodeSet.size;
};

/**
 * Conta lições completadas (cada level = 1 lição)
 */
const countCompletedLessons = (progress) => {
  if (!progress?.completedLevels) return 0;
  return Object.keys(progress.completedLevels).length;
};

/**
 * Conta perfeitas (levels com 95%+)
 */
const countPerfects = (progress) => {
  if (!progress?.completedLevels) return 0;
  
  return Object.values(progress.completedLevels)
    .filter(level => (level.accuracy || 0) >= 95)
    .length;
};

/**
 * Conta diamantes
 */
const getDiamonds = (progress) => progress?.diamonds || 0;

/**
 * Pega streak atual
 */
const getStreak = (progress) => progress?.streak || 0;

/**
 * Pega XP total
 */
const getXP = (progress) => progress?.xp || 0;

/**
 * Conta histórias COMPLETAS (todas com hasDiamond verificado)
 * Uma história só conta como completa quando todos episódios foram feitos
 */
const countCompletedStories = (progress) => {
  if (!progress?.storyProgress) return 0;
  
  let count = 0;
  Object.values(progress.storyProgress).forEach(story => {
    // hasDiamond só é true quando TODOS os episódios foram completos E média ≥90%
    // Mas para contar como "história completa", basta ter todos os episódios
    // Verificamos se tem pelo menos 4 scores (padrão de episódios por série)
    const episodeCount = Object.keys(story.scores || {}).length;
    const expectedEpisodes = 4; // Todas as séries têm 4 episódios
    
    if (episodeCount >= expectedEpisodes) {
      count++;
    }
  });
  
  return count;
};

/**
 * Checa se é primeiro de algo
 */
const isFirst = (getValue, progress) => getValue(progress) >= 1;


// ============================================
// CORE ACHIEVEMENTS (20 essenciais)
// ============================================

const CORE_ACHIEVEMENTS = [
  // ========== MILESTONE: PRIMEIROS PASSOS ==========
  {
    id: 'first_lesson',
    title: 'Primeiro Passo',
    desc: 'Complete sua primeira lição',
    quote: 'Toda jornada começa com um único passo.',
    category: 'milestone',
    priority: PRIORITY.lesson,
    target: 1,
    getValue: countCompletedLessons,
    visibility: 'always', // Sempre visível no início
  },
  {
    id: 'first_node',
    title: 'Território Conquistado',
    desc: 'Complete seu primeiro node (3 níveis)',
    quote: 'O primeiro de muitos.',
    category: 'milestone',
    priority: PRIORITY.node,
    target: 1,
    getValue: countCompletedNodes,
    visibility: 'always',
  },
  {
    id: 'first_perfect',
    title: 'Atirador',
    desc: 'Complete uma lição com 95%+ de precisão',
    quote: 'Precisão é poder.',
    category: 'skill',
    priority: PRIORITY.skill,
    target: 1,
    getValue: countPerfects,
    visibility: 'always',
  },
  
  // ========== SKILL: PERFEITAS (números seguros) ==========
  {
    id: 'perfect4',
    title: 'Olho de Falcão',
    desc: '4 lições com 95%+ de precisão',
    quote: 'Seus olhos não falham.',
    category: 'skill',
    priority: PRIORITY.skill,
    target: 4,
    getValue: countPerfects,
    visibility: 'near', // Aparece quando está perto (70%+)
  },
  {
    id: 'perfect8',
    title: 'Cirurgião',
    desc: '8 lições com 95%+ de precisão',
    quote: 'Cada corte, certeiro.',
    category: 'skill',
    priority: PRIORITY.skill,
    target: 8,
    getValue: countPerfects,
    visibility: 'near',
  },
  {
    id: 'perfect14',
    title: 'Implacável',
    desc: '14 lições com 95%+ de precisão',
    quote: 'Erros? Não conheço.',
    category: 'skill',
    priority: PRIORITY.skill,
    target: 14,
    getValue: countPerfects,
    visibility: 'near',
  },
  {
    id: 'perfect22',
    title: 'Sniper',
    desc: '22 lições com 95%+ de precisão',
    quote: 'Um tiro, um alvo.',
    category: 'skill',
    priority: PRIORITY.skill,
    target: 22,
    getValue: countPerfects,
    visibility: 'near',
  },
  
  // ========== GRIND: LIÇÕES ==========
  {
    id: 'lesson5',
    title: 'Aquecendo',
    desc: 'Complete 5 lições',
    quote: 'O motor está ligando.',
    category: 'grind',
    priority: PRIORITY.lesson,
    target: 5,
    getValue: countCompletedLessons,
    visibility: 'near',
  },
  {
    id: 'lesson12',
    title: 'Engrenado',
    desc: 'Complete 12 lições',
    quote: 'O ritmo está pegando.',
    category: 'grind',
    priority: PRIORITY.lesson,
    target: 12,
    getValue: countCompletedLessons,
    visibility: 'near',
  },
  {
    id: 'lesson20',
    title: 'Maratonista',
    desc: 'Complete 20 lições',
    quote: 'Resistência é tudo.',
    category: 'grind',
    priority: PRIORITY.lesson,
    target: 20,
    getValue: countCompletedLessons,
    visibility: 'near',
  },
  {
    id: 'lesson35',
    title: 'Incansável',
    desc: 'Complete 35 lições',
    quote: 'Você não para.',
    category: 'grind',
    priority: PRIORITY.lesson,
    target: 35,
    getValue: countCompletedLessons,
    visibility: 'near',
  },
  
  // ========== MILESTONE: NODES ==========
  {
    id: 'node5',
    title: 'Meio Mapa',
    desc: 'Complete 5 nodes',
    quote: 'Metade do caminho.',
    category: 'milestone',
    priority: PRIORITY.node,
    target: 5,
    getValue: countCompletedNodes,
    visibility: 'near',
  },
  {
    id: 'node10',
    title: 'Mapa Conquistado',
    desc: 'Complete 10 nodes',
    quote: 'Um mundo inteiro é seu.',
    category: 'milestone',
    priority: PRIORITY.map,
    target: 10,
    getValue: countCompletedNodes,
    visibility: 'near',
  },
  
  // ========== SKILL: DIAMANTES ==========
  {
    id: 'diamond1',
    title: 'Primeira Joia',
    desc: 'Conquiste seu primeiro diamante',
    quote: 'Brilhante.',
    category: 'skill',
    priority: PRIORITY.skill,
    target: 1,
    getValue: getDiamonds,
    visibility: 'always',
  },
  {
    id: 'diamond7',
    title: 'Joalheiro',
    desc: 'Conquiste 7 diamantes',
    quote: 'Sua coleção cresce.',
    category: 'skill',
    priority: PRIORITY.skill,
    target: 7,
    getValue: getDiamonds,
    visibility: 'near',
  },
  
  // ========== HABIT: STREAKS ==========
  {
    id: 'streak3',
    title: 'Fogo Aceso',
    desc: '3 dias seguidos',
    quote: 'O hábito está se formando.',
    category: 'grind',
    priority: PRIORITY.habit,
    target: 3,
    getValue: getStreak,
    visibility: 'near',
  },
  {
    id: 'streak7',
    title: 'Semana de Ferro',
    desc: '7 dias seguidos',
    quote: 'Uma semana. Disciplina.',
    category: 'grind',
    priority: PRIORITY.habit,
    target: 7,
    getValue: getStreak,
    visibility: 'near',
  },
  
  // ========== GRIND: XP ==========
  {
    id: 'xp1500',
    title: 'Energizado',
    desc: 'Acumule 1500 XP',
    quote: 'Energia pura.',
    category: 'grind',
    priority: PRIORITY.xp,
    target: 1500,
    getValue: getXP,
    visibility: 'near',
  },
  {
    id: 'xp5000',
    title: 'Turbinado',
    desc: 'Acumule 5000 XP',
    quote: 'Máxima potência.',
    category: 'grind',
    priority: PRIORITY.xp,
    target: 5000,
    getValue: getXP,
    visibility: 'near',
  },
  
  // ========== STORY ==========
  {
    id: 'story1',
    title: 'Ouvinte',
    desc: 'Complete sua primeira história',
    quote: 'A primeira de muitas.',
    category: 'story',
    priority: PRIORITY.story,
    target: 1,
    getValue: countCompletedStories,
    visibility: 'always',
  },
];


// ============================================
// ÍCONES (mapeados para arquivos existentes)
// ============================================

export const ACHIEVEMENT_ICONS = {
  // Milestone
  first_lesson: 'compass',
  first_node: 'shield',
  first_perfect: 'target',
  node5: 'map',
  node10: 'castle',
  
  // Skill - Perfeitas
  perfect4: 'target',
  perfect8: 'medal',
  perfect14: 'bolt',
  perfect22: 'crown',
  
  // Skill - Diamantes
  diamond1: 'diamond',
  diamond7: 'crown',
  
  // Grind - Lições
  lesson5: 'fire',
  lesson12: 'bolt',
  lesson20: 'comet',
  lesson35: 'moon',
  
  // Grind - Streaks
  streak3: 'fire',
  streak7: 'sun',
  
  // Grind - XP
  xp1500: 'sparkle',
  xp5000: 'supernova',
  
  // Story
  story1: 'headphones',
  
  // Fallback
  default: 'star',
};

export const getAchievementIcon = (id) => {
  const iconName = ACHIEVEMENT_ICONS[id] || ACHIEVEMENT_ICONS.default;
  return `/achievements/${iconName}.png`;
};


// ============================================
// SISTEMA DE VISIBILIDADE DINÂMICA
// ============================================

/**
 * Retorna conquistas que devem aparecer na Home
 * 
 * Regras:
 * 1. Conquistadas: sempre mostram
 * 2. visibility: 'always': sempre mostram
 * 3. visibility: 'near': mostram se >= 50% do target
 * 4. Limite: máximo 2 não-conquistadas por categoria
 * 
 * @param {number} currentMapId - Mapa atual (não usado mais, mas mantido por compatibilidade)
 * @param {string[]} earnedIds - IDs das conquistadas
 * @param {object} progress - Progresso do usuário
 * @returns {object[]} Lista de conquistas visíveis
 */
export const getVisibleAchievements = (currentMapId, earnedIds = [], progress = {}) => {
  const earned = [];
  const visible = [];
  
  for (const achievement of CORE_ACHIEVEMENTS) {
    const isEarned = earnedIds.includes(achievement.id);
    const currentValue = achievement.getValue(progress);
    const percent = achievement.target > 0 ? currentValue / achievement.target : 0;
    
    if (isEarned) {
      earned.push({ ...achievement, earned: true, currentValue, percent: 1 });
      continue;
    }
    
    // Verifica visibilidade
    let shouldShow = false;
    
    if (achievement.visibility === 'always') {
      shouldShow = true;
    } else if (achievement.visibility === 'near') {
      // Mostra se >= 50% do target
      shouldShow = percent >= 0.5;
    }
    
    if (shouldShow) {
      visible.push({ ...achievement, earned: false, currentValue, percent });
    }
  }
  
  // Limita não-conquistadas: máximo 2 por categoria
  const visibleByCategory = {};
  const limitedVisible = [];
  
  for (const a of visible) {
    if (!visibleByCategory[a.category]) {
      visibleByCategory[a.category] = 0;
    }
    if (visibleByCategory[a.category] < 2) {
      limitedVisible.push(a);
      visibleByCategory[a.category]++;
    }
  }
  
  // Ordena: conquistadas primeiro, depois por progresso
  return [
    ...earned.sort((a, b) => b.priority - a.priority),
    ...limitedVisible.sort((a, b) => b.percent - a.percent),
  ];
};


// ============================================
// SISTEMA ANTI-COLISÃO
// ============================================

/**
 * Detecta novas conquistas desbloqueadas
 * 
 * @param {string[]} earnedIds - IDs já conquistadas
 * @param {object} progress - Progresso atual
 * @returns {object[]} Lista de conquistas recém-desbloqueadas
 */
export const detectNewAchievements = (earnedIds = [], progress = {}) => {
  const newlyUnlocked = [];
  
  for (const achievement of CORE_ACHIEVEMENTS) {
    // Já tem?
    if (earnedIds.includes(achievement.id)) continue;
    
    // Atingiu o target?
    const currentValue = achievement.getValue(progress);
    if (currentValue >= achievement.target) {
      newlyUnlocked.push(achievement);
    }
  }
  
  return newlyUnlocked;
};

/**
 * Retorna a próxima conquista a ser celebrada
 * Usa prioridade para evitar colisão
 * 
 * @param {object[]} queue - Fila de conquistas pendentes
 * @returns {{ next: object|null, remaining: object[] }}
 */
export const getNextCelebration = (queue = []) => {
  if (queue.length === 0) {
    return { next: null, remaining: [] };
  }
  
  // Ordena por prioridade (menor = mais importante)
  const sorted = [...queue].sort((a, b) => a.priority - b.priority);
  
  return {
    next: sorted[0],
    remaining: sorted.slice(1),
  };
};

/**
 * Processa conquistas no final de uma lição
 * Retorna UMA conquista para celebrar agora + fila para depois
 * 
 * @param {string[]} earnedIds - IDs já conquistadas
 * @param {string[]} pendingIds - IDs na fila
 * @param {object} progress - Progresso atualizado
 * @returns {{ celebrate: object|null, newEarned: string[], newPending: string[] }}
 */
export const processLessonComplete = (earnedIds = [], pendingIds = [], progress = {}) => {
  // Detecta novas
  const newlyUnlocked = detectNewAchievements(earnedIds, progress);
  
  // Junta com pending
  const allPending = [
    ...pendingIds.map(id => CORE_ACHIEVEMENTS.find(a => a.id === id)).filter(Boolean),
    ...newlyUnlocked,
  ];
  
  // Remove duplicatas
  const uniquePending = allPending.filter((a, i, arr) => 
    arr.findIndex(b => b.id === a.id) === i
  );
  
  // Pega a próxima
  const { next, remaining } = getNextCelebration(uniquePending);
  
  return {
    celebrate: next,
    newEarned: next ? [...earnedIds, next.id] : earnedIds,
    newPending: remaining.map(a => a.id),
  };
};


// ============================================
// ESTATÍSTICAS
// ============================================

/**
 * Retorna estatísticas de conquistas
 */
export const getAchievementStats = (earnedIds = []) => {
  const total = CORE_ACHIEVEMENTS.length;
  const earned = earnedIds.filter(id => 
    CORE_ACHIEVEMENTS.some(a => a.id === id)
  ).length;
  const percent = total > 0 ? Math.round((earned / total) * 100) : 0;
  
  return { earned, total, percent };
};


// ============================================
// COMPATIBILIDADE (funções usadas por outros componentes)
// ============================================

/**
 * Conta nodes completos de um mapa específico
 */
export const getMapProgress = (mapId, progress) => {
  if (!progress?.completedLevels) return 0;
  
  const mapPrefix = `map${mapId}:`;
  const nodeSet = new Set();
  
  // Encontra todos os nodes que têm pelo menos 1 level
  Object.keys(progress.completedLevels).forEach(key => {
    if (key.startsWith(mapPrefix)) {
      const match = key.match(/node(\d+)/);
      if (match) nodeSet.add(match[1]);
    }
  });
  
  // Conta nodes com 3 levels completos
  let fullyCompleted = 0;
  nodeSet.forEach(nodeId => {
    const bronzeKey = `map${mapId}:node${nodeId}-${mapId}_${nodeId}_bronze`;
    const silverKey = `map${mapId}:node${nodeId}-${mapId}_${nodeId}_silver`;
    const goldKey = `map${mapId}:node${nodeId}-${mapId}_${nodeId}_gold`;
    
    if (progress.completedLevels[bronzeKey] && 
        progress.completedLevels[silverKey] && 
        progress.completedLevels[goldKey]) {
      fullyCompleted++;
    }
  });
  
  return fullyCompleted;
};

/**
 * Verifica se um mapa está desbloqueado
 * Map 0 sempre desbloqueado, outros precisam do anterior completo
 * 
 * @returns {{ unlocked: boolean, nodesCompleted: number, nodesRequired: number }}
 */
export const isMapUnlocked = (mapId, progress) => {
  const nodesRequired = 10;
  
  if (mapId === 0) {
    return { 
      unlocked: true, 
      nodesCompleted: nodesRequired, 
      nodesRequired 
    };
  }
  
  // Conta nodes completos do mapa anterior
  const prevMapId = mapId - 1;
  const nodesCompleted = getMapProgress(prevMapId, progress);
  
  return {
    unlocked: nodesCompleted >= nodesRequired,
    nodesCompleted,
    nodesRequired,
  };
};

/**
 * Checa conquistas novas (compatibilidade com useProgress antigo)
 * Agora é um wrapper para detectNewAchievements
 */
export const checkNewAchievements = (progress, earnedIds = [], pendingIds = []) => {
  const allKnown = [...earnedIds, ...pendingIds];
  const newlyUnlocked = [];
  
  for (const achievement of CORE_ACHIEVEMENTS) {
    if (allKnown.includes(achievement.id)) continue;
    
    const currentValue = achievement.getValue(progress);
    if (currentValue >= achievement.target) {
      newlyUnlocked.push(achievement.id);
    }
  }
  
  return newlyUnlocked;
};

/**
 * Busca achievement por ID
 */
export const getAchievementById = (id) => {
  return CORE_ACHIEVEMENTS.find(a => a.id === id) || null;
};


// ============================================
// EXPORTS
// ============================================

export const ALL_ACHIEVEMENTS = CORE_ACHIEVEMENTS;

export default {
  ALL_ACHIEVEMENTS,
  CORE_ACHIEVEMENTS,
  MILESTONES: {
    PERFECT_MILESTONES,
    LESSON_MILESTONES,
    XP_MILESTONES,
    DIAMOND_MILESTONES,
    STREAK_MILESTONES,
    STORY_MILESTONES,
  },
  PRIORITY,
  CATEGORIES,
  getVisibleAchievements,
  getAchievementStats,
  getAchievementIcon,
  detectNewAchievements,
  getNextCelebration,
  processLessonComplete,
  // Compatibilidade
  isMapUnlocked,
  getMapProgress,
  checkNewAchievements,
  getAchievementById,
};