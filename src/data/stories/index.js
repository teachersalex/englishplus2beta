// src/data/stories/index.js
// Catálogo central - Séries organizadas por nível

// === PILLAR SERIES (101-105) ===
import { seriesNumbers } from './101-numbers';
import { seriesPeople } from './102-people';
import { seriesTime } from './103-time';
import { seriesWorld } from './104-world';
import { seriesActions } from './105-actions';

// === STARTER SERIES ===
import { seriesBadDate } from './009-bad-date';

// Extrai as séries dos objetos
const numbers = seriesNumbers[101];
const people = seriesPeople[102];
const time = seriesTime[103];
const world = seriesWorld[104];
const actions = seriesActions[105];
const badDate = seriesBadDate[9];

// Todas as séries
export const allSeries = [
  // Pillars
  numbers,
  people,
  time,
  world,
  actions,
  // Starter
  badDate,
];

// Mapa por ID
export const seriesById = {
  101: numbers,
  102: people,
  103: time,
  104: world,
  105: actions,
  9: badDate,
};

// Agrupadas por nível
export const seriesByLevel = {
  pillars: [numbers, people, time, world, actions],
  starter: [badDate],
};

export default allSeries;