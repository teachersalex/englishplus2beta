/**
 * map2/index.js - MAPA 2: A CASA
 * 
 * "Habitar é deixar rastros."
 *  — Walter Benjamin
 * 
 * Arquivo principal que exporta o mapa completo
 * 10 nodes × 3 levels × 5 atividades = 150 atividades
 */

import { map2Config } from './config';
import { nodesData } from './nodes';

export const map2Data = {
  ...map2Config,
  nodesData,
};