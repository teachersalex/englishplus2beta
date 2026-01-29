/**
 * Node 6: O Esconderijo
 * Tema: Preposições Avançadas (Behind, In front of, Between)
 */
export const node6Data = {
  id: 6,
  title: 'O Esconderijo',
  theme: 'Behind, In front of, Between',
  lore: 'Estamos brincando de esconde-esconde na casa. Onde os outros estão?',
  tip: 'BETWEEN é o recheio do sanduíche (está no meio de dois). BEHIND é tímido (está atrás).',
  
  levels: [
    {
      id: '2_6_bronze',
      title: 'Posições',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Novas preposições',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Atrás', english: 'Behind' },
            { portuguese: 'Na frente de', english: 'In front of' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Behind e In front of. Opostos!' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'O meio',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Entre (dois)', english: 'Between' },
            { portuguese: 'Perto de', english: 'Near' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Between = no meio de dois elementos.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Conceito de Between',
          instruction: 'Analise a afirmação',
          statement: '"Between" significa estar sozinho.',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'Between é estar NO MEIO de dois. Nunca sozinho!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'O gato está atrás do sofá.',
          sentence: 'The cat is ___ the sofa.',
          correct: 'behind',
          options: ['behind', 'between', 'on'],
          feedback: { success: { title: 'BEHIND!', text: 'O gato está atrás do sofá.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Soletrar',
          instruction: 'Ordene as letras',
          words: ['B', 'E', 'T', 'W', 'E', 'E', 'N'],
          correct: 'B E T W E E N',
          feedback: { success: { title: 'Isso!', text: 'BETWEEN - 7 letras.' } }
        }
      ]
    },
    {
      id: '2_6_silver',
      title: 'O Sanduíche',
      color: '#c0c0c0',
      activities: [
        {
          type: 'multiple_choice',
          label: 'Aquecimento',
          title: 'A TV e as janelas',
          instruction: 'A TV está no meio de duas janelas.',
          question: 'The TV is ___ the windows.',
          options: [
            { text: 'between', correct: true },
            { text: 'behind', correct: false },
            { text: 'under', correct: false },
          ],
          feedback: { success: { title: 'BETWEEN!', text: 'Entre as duas janelas.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Atrás do sofá',
          instruction: '"Atrás do sofá."',
          words: ['Behind', 'the', 'sofa.'],
          correct: 'Behind the sofa.',
          feedback: { success: { title: 'Perfeito!', text: 'Atrás do sofá.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Na frente',
          instruction: 'O cachorro está na frente do carro.',
          sentence: 'The dog is ___ the car.',
          correct: 'in front of',
          options: ['in front of', 'behind', 'between'],
          feedback: { success: { title: 'IN FRONT OF!', text: 'Na frente do carro.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Monte a frase',
          instruction: '"O gato está atrás de você."',
          words: ['The', 'cat', 'is', 'behind', 'you.'],
          correct: 'The cat is behind you.',
          feedback: { success: { title: 'Cuidado!', text: 'O gato está atrás de você!' } }
        },
        {
          type: 'true_false',
          label: 'Desafio',
          title: 'Erro com "of"',
          instruction: 'Analise a frase',
          statement: '"The table is between of the chairs" está correto.',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'BETWEEN não usa "of". É "between the chairs".' } }
        }
      ]
    },
    {
      id: '2_6_gold',
      title: 'O Cenário Completo',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Frase longa',
          instruction: '"Eu estou na frente da sua casa."',
          words: ['I', 'am', 'in', 'front', 'of', 'your', 'house.'],
          correct: 'I am in front of your house.',
          feedback: { success: { title: 'Excelente!', text: 'Estou na frente da sua casa.' } }
        },
        {
          type: 'category_sort',
          label: 'Prática',
          title: 'Escondido vs Visível',
          instruction: 'Classifique as preposições',
          categories: [
            { id: 'escondido', name: 'Escondido' },
            { id: 'visivel', name: 'Visível' }
          ],
          items: [
            { id: 1, text: 'Behind', category: 'escondido' },
            { id: 2, text: 'Under', category: 'escondido' },
            { id: 3, text: 'In front of', category: 'visivel' },
            { id: 4, text: 'On', category: 'visivel' }
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Você entende o contexto das preposições!' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Opostos',
          instruction: 'Analise a afirmação',
          statement: '"In front of" é o oposto de "Behind".',
          correct: true,
          feedback: { success: { title: 'VERDADEIRO!', text: 'Na frente ↔ Atrás.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Desafio',
          title: 'Between precisa de dois',
          instruction: '"Between" precisa de quantos pontos de referência?',
          question: 'Quantos elementos BETWEEN precisa?',
          options: [
            { text: 'Dois (between A and B)', correct: true },
            { text: 'Um (between the table)', correct: false },
            { text: 'Três ou mais', correct: false },
          ],
          feedback: { success: { title: 'DOIS!', text: 'Between A AND B. Sempre dois pontos.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: '"Atrás da porta."',
          words: ['Behind', 'the', 'door.'],
          correct: 'Behind the door.',
          feedback: { success: { title: 'PERFEITO!', text: 'Você dominou as preposições avançadas!' } }
        }
      ]
    }
  ]
};