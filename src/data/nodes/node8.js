/**
 * NODE 8: A SUBIDA DA MONTANHA
 * 3 levels × 5 atividades = 15 atividades
 */
export const node8Data = {
  id: 8,
  title: 'A Subida',
  theme: 'Present Continuous',
  lore: 'A caminhada ficou difícil. Você não "caminha" todo dia, você está caminhando AGORA. Sente o suor?',
  tip: 'Para dizer que está fazENDO, precisa de duas coisas: TO BE (estou) + ING (endo). Não engula o verbo To Be!',
  
  levels: [
    {
      id: '8_bronze',
      title: 'O Gerúndio',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Fábrica de ING',
          instruction: 'Transforme em ação contínua',
          pairs: [
            { portuguese: 'Work', english: 'Working' },
            { portuguese: 'Go', english: 'Going' },
            { portuguese: 'Study', english: 'Studying' },
            { portuguese: 'Run', english: 'Running' },
          ],
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Elo perdido',
          instruction: 'Complete',
          sentence: 'I ___ working right now.',
          correct: 'am',
          options: ['am', 'is', 'are'],
          feedback: { success: { title: 'I am!', text: 'Precisa do verbo estar (am).' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Analise',
          instruction: 'Certo ou errado?',
          statement: 'She working now.',
          correct: false,
          feedback: { success: { title: 'Errado!', text: 'Faltou o IS: She IS working.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Tradução',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Estou comendo', english: 'I am eating' },
            { portuguese: 'Você está dormindo', english: 'You are sleeping' },
            { portuguese: 'Ele está correndo', english: 'He is running' },
          ],
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Nós estamos indo',
          instruction: 'Escolha:',
          question: 'Nós estamos indo.',
          options: [
            { text: 'We going.', correct: false },
            { text: 'We are going.', correct: true },
          ],
          feedback: { success: { title: 'We are!', text: 'Sujeito + To Be + ING.' } }
        }
      ]
    },
    {
      id: '8_silver',
      title: 'A Ação',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Olha ele!',
          instruction: 'Monte',
          words: ['He', 'is', 'running', 'fast.'],
          correct: 'He is running fast.',
          feedback: { success: { title: 'Perfeito!', text: 'He is running.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Negativa',
          instruction: 'Não estou dormindo',
          sentence: 'I ___ not sleeping.',
          correct: 'am',
          options: ['am', 'do', 'have'],
          feedback: { success: { title: 'I am not!', text: 'Negação com To Be.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'O que eles estão fazendo?',
          instruction: 'Monte',
          words: ['They', 'are', 'playing', 'soccer.'],
          correct: 'They are playing soccer.',
          feedback: { success: { title: 'Boa!', text: 'They are playing.' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Verbo engolido',
          instruction: 'Ache o erro',
          sentence: 'She working at the moment.',
          errorWord: 'working',
          correction: 'is working',
          feedback: { success: { title: 'Faltou o IS!', text: 'Nunca diga "She working". Diga "She IS working".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Pergunta',
          instruction: 'Complete:',
          question: '___ you listening?',
          options: [
            { text: 'Do', correct: false },
            { text: 'Are', correct: true },
          ],
          feedback: { success: { title: 'Are you?', text: 'Pergunta com ING usa To Be.' } }
        }
      ]
    },
    {
      id: '8_gold',
      title: 'O Movimento',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de verbo',
          instruction: 'Ache o erro',
          sentence: 'We are study now.',
          errorWord: 'study',
          correction: 'studying',
          feedback: { success: { title: 'Cadê o ING?', text: 'Depois do To Be (are), o verbo precisa de ING.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Agora vs Rotina',
          instruction: 'Complete',
          sentence: 'I usually work, but today I am ___.',
          correct: 'resting',
          options: ['rest', 'resting', 'rests'],
          feedback: { success: { title: 'Resting!', text: 'Hoje estou descansando (ação contínua).' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase longa',
          instruction: 'Monte',
          words: ['She', 'is', 'reading', 'a', 'book', 'now.'],
          correct: 'She is reading a book now.',
          feedback: { success: { title: 'Excelente!', text: 'Ação no momento presente.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'To Be errado',
          instruction: 'Ache o erro',
          sentence: 'They is eating.',
          errorWord: 'is',
          correction: 'are',
          feedback: { success: { title: 'They Are!', text: 'Plural usa Are.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Gramática',
          instruction: 'Analise',
          statement: 'I am wearing shoes.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Estrutura perfeita: I am + verbo com ING.' } }
        }
      ]
    }
  ]
};