/**
 * GAME DATA SCHEMA
 * Estrutura modular: Tracks → Maps → Nodes → Activities
 * 
 * Paleta: Azul elétrico (#3B82F6)
 */

// ============================================
// THRESHOLDS (Fonte única de verdade)
// ============================================
export const thresholds = {
  diamond: 90,  // % para conquistar diamante
};

// ============================================
// TRACKS (Trilhas)
// ============================================
export const tracks = {
  foundation: {
    id: 'foundation',
    title: 'Fundação',
    subtitle: 'Gramática Essencial',
    icon: '🏰',
    color: '#3B82F6',  // Azul elétrico
    maps: ['map-1', 'map-2', 'map-3'],
    unlockRequirement: null,
  },
  medical: {
    id: 'medical',
    title: 'Medical English',
    subtitle: 'Comunicação Hospitalar',
    icon: '🏥',
    color: '#0EA5E9',  // Cyan
    maps: ['med-1', 'med-2'],
    unlockRequirement: { type: 'track', id: 'foundation' },
  },
};

// ============================================
// MAPS (Mapas)
// ============================================
export const maps = {
  'map-1': {
    id: 'map-1',
    trackId: 'foundation',
    title: 'A Ascensão',
    subtitle: 'Da casa ao castelo',
    nodes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    unlockRequirement: null,
    reward: { type: 'badge', id: 'castle-conqueror', title: 'Conquistador do Castelo' },
  },
  'map-2': {
    id: 'map-2',
    trackId: 'foundation',
    title: 'O Vale',
    subtitle: 'Explorando novos territórios',
    nodes: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    unlockRequirement: { type: 'map', id: 'map-1' },
    reward: { type: 'badge', id: 'valley-explorer', title: 'Explorador do Vale' },
  },
};

// ============================================
// NODE METADATA (posições e conexões)
// ============================================
export const nodeMetadata = {
  // Map 1 - A Ascensão
  1:  { mapId: 'map-1', x: 200, y: 680, connects: [2] },
  2:  { mapId: 'map-1', x: 140, y: 600, connects: [3] },
  3:  { mapId: 'map-1', x: 220, y: 520, connects: [4] },
  4:  { mapId: 'map-1', x: 160, y: 440, connects: [5] },
  5:  { mapId: 'map-1', x: 240, y: 360, connects: [6], isBoss: true },
  6:  { mapId: 'map-1', x: 180, y: 280, connects: [7] },
  7:  { mapId: 'map-1', x: 250, y: 210, connects: [8] },
  8:  { mapId: 'map-1', x: 190, y: 140, connects: [9] },
  9:  { mapId: 'map-1', x: 230, y: 70, connects: [10] },
  10: { mapId: 'map-1', x: 200, y: 20, connects: [], isBoss: true },
};

// ============================================
// UNLOCK REQUIREMENTS POR NODE
// ============================================
export const nodeUnlockRules = {
  1:  { requires: null }, // Primeiro node sempre aberto
  2:  { requires: { type: 'node', id: 1 } },
  3:  { requires: { type: 'node', id: 2 } },
  4:  { requires: { type: 'node', id: 3 } },
  5:  { requires: { type: 'node', id: 4 } },
  6:  { requires: { type: 'node', id: 5 } },
  7:  { requires: { type: 'node', id: 6 } },
  8:  { requires: { type: 'node', id: 7 } },
  9:  { requires: { type: 'node', id: 8 } },
  10: { requires: { type: 'node', id: 9 } },
};

// ============================================
// DOPAMINE CONFIG
// ============================================
export const dopamineConfig = {
  xp: {
    activityComplete: 20,
    nodeComplete: 50,
    perfectNode: 100,      // 100% accuracy
    diamondNode: 75,       // threshold.diamond+ accuracy
    streakBonus: 10,       // per streak day
    comboMultiplier: 1.5,  // 3+ correct in a row
  },
  streaks: {
    comboThreshold: 3,     // acertos seguidos pra ativar
    dailyGoal: 1,          // nodes por dia pra manter streak
  },
  celebrations: {
    nodeComplete: true,
    bossNode: 'epic',      // cutscene especial
    mapComplete: 'badge',
    trackComplete: 'achievement',
  },
};

export default {
  thresholds,
  tracks,
  maps,
  nodeMetadata,
  nodeUnlockRules,
  dopamineConfig,
};