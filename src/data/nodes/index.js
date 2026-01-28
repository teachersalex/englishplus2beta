/**
 * data/nodes/index.js
 * Loader centralizado de nodes
 */

import { node1Data } from './node1';
import { node2Data } from './node2';
import { node3Data } from './node3';
import { node4Data } from './node4';
import { node5Data } from './node5';
import { node6Data } from './node6';
import { node7Data } from './node7';
import { node8Data } from './node8';
import { node9Data } from './node9';
import { node10Data } from './node10';

// Objeto indexado por ID (usado no App.jsx)
export const nodesData = {
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
};

// Array ordenado (útil para iterações)
export const nodesArray = [
  node1Data,
  node2Data,
  node3Data,
  node4Data,
  node5Data,
  node6Data,
  node7Data,
  node8Data,
  node9Data,
  node10Data,
];

// Contagem total
export const NODE_COUNT = Object.keys(nodesData).length;