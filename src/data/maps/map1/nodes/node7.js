/**
 * Node 7: O Farol
 * Tema: Can (Habilidades)
 */
export const node7Data = {
  id: 7,
  title: 'O Farol',
  theme: 'Can (Habilidades)',
  lore: 'O faroleiro pergunta: "O que você sabe fazer?" Prove suas habilidades.',
  tip: '"Can" nunca muda. Não existe "cans" ou "canning". Sempre "can".',
  
  levels: [
    {
      id: '1_7_bronze',
      title: 'Eu Posso',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Habilidades',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Nadar', english: 'Swim' },
            { portuguese: 'Dirigir', english: 'Drive' },
            { portuguese: 'Cozinhar', english: 'Cook' },
            { portuguese: 'Dançar', english: 'Dance' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Verbos de habilidade!' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Eu sei nadar',
          instruction: 'Complete',
          sentence: 'I ___ swim.',
          correct: 'can',
          options: ['can', 'cans', 'am can'],
          feedback: { success: { title: 'I can!', text: 'Can nunca muda.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Ela sabe dirigir',
          instruction: '"Ela sabe dirigir."',
          words: ['She', 'can', 'drive.'],
          correct: 'She can drive.',
          feedback: { success: { title: 'Ótimo!', text: 'She CAN, não "She cans".' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Certo ou errado?',
          instruction: 'Analise',
          statement: 'He can speaks English.',
          correct: false,
          feedback: { success: { title: 'Errado!', text: 'Após "can", verbo fica no infinitivo: "He can speak".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: 'Eu sei cozinhar.',
          question: 'Eu sei cozinhar.',
          options: [
            { text: 'I can cook.', correct: true },
            { text: 'I can to cook.', correct: false },
            { text: 'I can cooking.', correct: false },
          ],
          feedback: { success: { title: 'I can cook!', text: 'Sem "to", sem "-ing".' } }
        }
      ]
    },
    {
      id: '1_7_silver',
      title: 'Eu Não Posso',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Negativa',
          instruction: '"Eu não sei dançar."',
          words: ['I', 'cannot', 'dance.'],
          correct: 'I cannot dance.',
          feedback: { success: { title: 'Boa!', text: '"Cannot" ou "can\'t".' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Ela não sabe',
          instruction: 'Complete',
          sentence: 'She ___ swim.',
          correct: "can't",
          options: ["can't", 'can not to', 'no can'],
          feedback: { success: { title: "Can't!", text: 'Forma curta de "cannot".' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Mais habilidades',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Tocar violão', english: 'Play guitar' },
            { portuguese: 'Falar francês', english: 'Speak French' },
            { portuguese: 'Andar de bicicleta', english: 'Ride a bike' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Habilidades expandidas!' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Erro comum',
          instruction: 'Ache o erro',
          sentence: 'I not can swim.',
          errorWord: 'not',
          correction: "can't",
          feedback: { success: { title: "Can't!", text: 'A negativa é "can\'t" ou "cannot", não "not can".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Pergunta',
          instruction: 'Complete:',
          question: '___ you speak English?',
          options: [
            { text: 'Can', correct: true },
            { text: 'Do can', correct: false },
            { text: 'Are can', correct: false },
          ],
          feedback: { success: { title: 'Can you?', text: 'Pergunta: Can + sujeito + verbo.' } }
        }
      ]
    },
    {
      id: '1_7_gold',
      title: 'Habilidades Completas',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Frase complexa',
          instruction: '"Eu sei falar inglês mas não sei falar francês."',
          words: ['I', 'can', 'speak', 'English', 'but', 'I', "can't", 'speak', 'French.'],
          correct: "I can speak English but I can't speak French.",
          feedback: { success: { title: 'Mestre!', text: 'Positivo e negativo na mesma frase.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de conjugação',
          instruction: 'Ache o erro',
          sentence: 'She cans drive.',
          errorWord: 'cans',
          correction: 'can',
          feedback: { success: { title: 'Corrigido!', text: 'Can NUNCA vira "cans".' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Pergunta WH',
          instruction: 'Complete',
          sentence: 'What ___ you do?',
          correct: 'can',
          options: ['can', 'do can', 'are can'],
          feedback: { success: { title: 'What can you do?', text: 'O que você sabe fazer?' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de infinitivo',
          instruction: 'Ache o erro',
          sentence: 'I can swimming.',
          errorWord: 'swimming',
          correction: 'swim',
          feedback: { success: { title: 'Sem -ING!', text: 'Após "can", verbo na forma base: "I can swim".' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Gramática',
          instruction: 'Analise',
          statement: 'My brother can plays piano.',
          correct: false,
          feedback: { success: { title: 'Falso!', text: 'Após "can", verbo sem S: "can play".' } }
        }
      ]
    }
  ]
};