/**
 * mapsConfig.js
 * Configuração dos mundos do Teacher Alex
 * 
 * "A jornada de mil milhas começa com um único passo."
 *  — Lao Tzu
 */

// Configuração visual dos mundos no WorldSelect
export const WORLDS_CONFIG = [
  { 
    id: 0, 
    name: 'A Chegada', 
    subtitle: 'Primeiros Passos', 
    nodes: 10, 
    icon: '⛵', 
    color: '#60A5FA', 
    x: 550, 
    y: 400 
  },
  { 
    id: 1, 
    name: 'O Despertar', 
    subtitle: 'Verb To Be', 
    nodes: 10, 
    icon: '🌅', 
    color: '#A78BFA', 
    x: 300, 
    y: 250, 
    isHub: true 
  },
  { 
    id: 2, 
    name: 'A Casa', 
    subtitle: 'Preposições & Possessivos', 
    nodes: 5, 
    icon: '🏠', 
    color: '#34D399', 
    x: 150, 
    y: 320 
  },
];

// Dados de cada mapa (nodes)
import { map0Data } from './map0';
import { map1Data } from './map1';
import { map2Data } from './map2';

export const MAPS_DATA = {
  0: map0Data,
  1: map1Data,
  2: map2Data,
};

export function getMapData(mapId) {
  return MAPS_DATA[mapId] || null;
}