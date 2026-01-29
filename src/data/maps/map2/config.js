/**
 * map2/config.js - MAPA 2: A CASA
 * 
 * "A casa é o ponto de partida."
 *  — Le Corbusier
 * 
 * Do abstrato ao físico: o aluno agora possui, localiza e descreve.
 * 10 nodes × 3 levels × 5 atividades = 150 atividades
 */

export const map2Config = {
  id: 2,
  title: 'A Casa',
  subtitle: 'Preposições & Possessivos',
  
  nodes: [
    // Parte 1: Fundamentos
    { id: 1, title: 'A Sala de Estar', theme: 'Furniture' },
    { id: 2, title: 'O Gato Bagunceiro', theme: 'On & Under' },
    { id: 3, title: 'A Geladeira Mágica', theme: 'In & Next To' },
    { id: 4, title: 'A Disputa', theme: 'My & Your' },
    { id: 5, title: 'O Casal Misterioso', theme: 'His & Her' },
    
    // Parte 2: Avançado
    { id: 6, title: 'O Esconderijo', theme: 'Behind, In front of, Between' },
    { id: 7, title: 'A Comunidade', theme: 'Our & Their' },
    { id: 8, title: 'O Dono das Coisas', theme: "Genitive Case ('s) & Whose" },
    { id: 9, title: 'O Inventário', theme: 'This / That / These / Those' },
    { id: 10, title: 'O Arquiteto', theme: 'Boss Final' },
  ],
};