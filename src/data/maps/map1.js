/**
 * map1.js - MAPA 1: O DESPERTAR
 * 10 nodes × 3 levels × 5 atividades = 150 atividades
 * 
 * Importa os dados dos nodes existentes
 */

// Importar nodes existentes
import { node1Data } from '../nodes/node1';
import { node2Data } from '../nodes/node2';
import { node3Data } from '../nodes/node3';
import { node4Data } from '../nodes/node4';
import { node5Data } from '../nodes/node5';
import { node6Data } from '../nodes/node6';
import { node7Data } from '../nodes/node7';
import { node8Data } from '../nodes/node8';
import { node9Data } from '../nodes/node9';
import { node10Data } from '../nodes/node10';

export const map1Data = {
  id: 1,
  title: 'O Despertar',
  subtitle: 'Os Primeiros Passos',
  
  nodes: [
    { id: 1, title: 'O Espelho', theme: 'To Be' },
    { id: 2, title: 'O Vizinho', theme: 'Present Simple' },
    { id: 3, title: 'A Tribo', theme: 'Pronomes' },
    { id: 4, title: 'A Trilha', theme: 'Advérbios' },
    { id: 5, title: 'O Acampamento', theme: 'Perguntas WH' },
    { id: 6, title: 'O Rio', theme: 'There is/are' },
    { id: 7, title: 'O Farol', theme: 'Can' },
    { id: 8, title: 'A Subida', theme: 'Continuous' },
    { id: 9, title: 'Os Portões', theme: 'Revisão' },
    { id: 10, title: 'O Castelo', theme: 'Boss Final', isBoss: true },
  ],
  
  nodesData: {
    1: node1Data,
    2: node2Data,
    3: node3Data,
    4: node4Data,
    5: node5Data,
    6: node6Data,
    7: node7Data,
    8: node8Data,
    9: node9Data,
    10: node10Data,
  }
};
