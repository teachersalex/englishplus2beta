/**
 * map0/config.js - MAPA 0: A CHEGADA (Tutorial)
 * 10 nodes × 3 levels × 5 atividades = 150 atividades
 */

export const map0Config = {
  id: 0,
  title: 'A Chegada',
  subtitle: 'Primeiros Passos',
  
  nodes: [
    { id: 1, title: 'O Primeiro Contato', theme: 'Greetings' },
    { id: 2, title: 'A Despedida', theme: 'Goodbyes' },
    { id: 3, title: 'O Código (Parte 1)', theme: 'Vogais' },
    { id: 4, title: 'O Código (Parte 2)', theme: 'Consoantes' },
    { id: 5, title: 'Palavras Mágicas', theme: 'Polidez' },
    { id: 6, title: 'As Ferramentas', theme: 'Classroom Language' },
    { id: 7, title: 'A Contagem', theme: 'Numbers 0-10' },
    { id: 8, title: 'O Mundo Colorido', theme: 'Colors' },
    { id: 9, title: 'O Crachá', theme: 'Introduction' },
    { id: 10, title: 'O Guardião', theme: 'Boss', isBoss: true },
  ],
};
