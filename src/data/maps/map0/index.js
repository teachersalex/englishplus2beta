/**
 * map0/index.js - MAPA 0: A CHEGADA
 * Arquivo principal que exporta o mapa completo
 * 
 * 10 nodes × 3 levels × 5 atividades = 150 atividades
 */

import { map0Config } from './config';
import { nodesData } from './nodes';

export const map0Data = {
  ...map0Config,
  nodesData,
};
