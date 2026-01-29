/**
 * map1/config.js - MAPA 1: O DESPERTAR
 * 
 * "Conhece-te a ti mesmo."
 *  — Oráculo de Delfos
 * 
 * 10 nodes × 3 levels × 5 atividades = 150 atividades
 */

export const map1Config = {
  id: 1,
  title: 'O Despertar',
  subtitle: 'Verb To Be & Present',
  
  nodes: [
    { id: 1, title: 'O Espelho', theme: 'Verb To Be' },
    { id: 2, title: 'O Vizinho', theme: 'He/She/It' },
    { id: 3, title: 'O Guardião', theme: 'Present Simple' },
    { id: 4, title: 'O Mercado', theme: 'Present Simple (He/She)' },
    { id: 5, title: 'A Torre do Relógio', theme: 'Advérbios de Frequência' },
    { id: 6, title: 'O Rio e a Vila', theme: 'There is/are' },
    { id: 7, title: 'O Farol', theme: 'Can (Habilidades)' },
    { id: 8, title: 'A Subida', theme: 'Present Continuous' },
    { id: 9, title: 'Os Portões', theme: 'Revisão Geral' },
    { id: 10, title: 'O Castelo', theme: 'Boss', isBoss: true },
  ],
};