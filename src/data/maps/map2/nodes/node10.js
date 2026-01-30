/**
 * Node 10: O Arquiteto
 * Tema: Boss Final do Mapa 2 - Revisão Completa
 */
export const node10Data = {
  id: 10,
  title: 'O Arquiteto',
  theme: 'Boss Final',
  lore: 'Você precisa descrever a planta da casa para o construtor. Se errar uma preposição, a casa cai.',
  tip: 'Tudo que você aprendeu: Preposições + Móveis + Possessivos + Genitive Case + Demonstrativos.',
  
  levels: [
    {
      id: '2_10_bronze',
      title: 'Estrutura Básica',
      color: '#cd7f32',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'O sofá',
          instruction: '"O sofá está na sala."',
          words: ['The', 'sofa', 'is', 'in', 'the', 'living', 'room.'],
          correct: 'The sofa is in the living room.',
          feedback: { success: { title: 'Perfeito!', text: 'O sofá está na sala.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Revisão de preposição',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Atrás', english: 'Behind' },
            { portuguese: 'Entre', english: 'Between' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Preposições revisadas!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Nossa casa',
          instruction: 'Esta é a NOSSA casa.',
          sentence: 'This is ___ house.',
          correct: 'our',
          options: ['our', 'their', 'his'],
          feedback: { success: { title: 'OUR!', text: 'Nossa casa.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Embaixo da mesa',
          instruction: 'O gato está embaixo da mesa.',
          question: 'The cat is ___ the table.',
          options: [
            { text: 'under', correct: true },
            { text: 'on', correct: false },
            { text: 'in', correct: false },
          ],
          feedback: { success: { title: 'UNDER!', text: 'Embaixo da mesa.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Revisão de possessivo',
          instruction: 'Analise a afirmação',
          statement: '"Your" significa "Dele".',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'YOUR = Seu (de você). DELE = HIS.' } }
        }
      ]
    },
    {
      id: '2_10_silver',
      title: 'Detalhes de Interior',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'A cadeira da mãe',
          instruction: '"A cadeira da minha mãe é vermelha."',
          words: ['My', "mother's", 'chair', 'is', 'red.'],
          correct: "My mother's chair is red.",
          feedback: { success: { title: 'Excelente!', text: 'A cadeira da minha mãe é vermelha.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Next TO',
          instruction: 'Encontre a palavra errada',
          sentence: 'The TV is next at the window.',
          errorWord: 'at',
          correction: 'to',
          feedback: { success: { title: 'Pegou!', text: 'É "next TO", não "next at".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Onde está o tapete?',
          instruction: 'O tapete está no chão.',
          question: 'Where is the carpet?',
          options: [
            { text: 'On the floor', correct: true },
            { text: 'Under the floor', correct: false },
            { text: 'In the floor', correct: false },
          ],
          feedback: { success: { title: 'ON!', text: 'O tapete está EM CIMA do chão.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Pergunta',
          instruction: '"Aquela é sua cama?"',
          words: ['Is', 'that', 'your', 'bed?'],
          correct: 'Is that your bed?',
          feedback: { success: { title: 'Perfeito!', text: 'Aquela é sua cama?' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Minhas chaves',
          instruction: 'As chaves estão AQUI na minha mão.',
          sentence: '___ are my keys.',
          correct: 'These',
          options: ['These', 'Those', 'That'],
          feedback: { success: { title: 'THESE!', text: 'Perto + plural = These.' } }
        }
      ]
    },
    {
      id: '2_10_gold',
      title: 'A Inspeção Final',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Tradução complexa',
          instruction: '"O carro do pai dela."',
          words: ['Her', "father's", 'car.'],
          correct: "Her father's car.",
          feedback: { success: { title: 'EXCELENTE!', text: 'Possessivo + Genitive. Combo!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Frase complexa',
          instruction: '"Minhas chaves estão entre o livro e a lâmpada."',
          words: ['My', 'keys', 'are', 'between', 'the', 'book', 'and', 'the', 'lamp.'],
          correct: 'My keys are between the book and the lamp.',
          feedback: { success: { title: 'PERFEITO!', text: 'Minhas chaves estão entre o livro e a lâmpada.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'They vs Their',
          instruction: 'Encontre a palavra errada',
          sentence: 'They names are on the list.',
          errorWord: 'They',
          correction: 'Their',
          feedback: { success: { title: 'THEIR!', text: 'Posse precisa de THEIR, não THEY.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'De quem?',
          instruction: 'A bolsa está na sua mão (PERTO). Complete:',
          sentence: 'Whose bag is ___?',
          correct: 'this',
          options: ['this', 'that', 'those'],
          feedback: { success: { title: 'THIS!', text: 'Perto + singular = This. De quem é esta bolsa?' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Vitória!',
          instruction: 'Última questão do Mapa 2',
          statement: '"Alex\'s house is organized."',
          correct: true,
          feedback: { success: { title: '🏆 PARABÉNS!', text: 'MAPA 2 CONCLUÍDO! Você dominou A CASA!' } }
        }
      ]
    }
  ]
};