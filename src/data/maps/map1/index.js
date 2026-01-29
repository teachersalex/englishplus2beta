/**
 * map1/index.js - MAPA 1: O DESPERTAR
 * 
 * "Eu sou, logo existo."
 *  — René Descartes
 * 
 * Arquivo principal que exporta o mapa completo
 * 10 nodes × 3 levels × 5 atividades = 150 atividades
 */

import { map1Config } from './config';
import { nodesData } from './nodes';

export const map1Data = {
  ...map1Config,
  nodesData,
};
