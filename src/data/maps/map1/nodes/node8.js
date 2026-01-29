/**
 * Node 8: A Subida
 * Tema: Present Continuous
 */
export const node8Data = {
  id: 8,
  title: 'A Subida',
  theme: 'Present Continuous',
  lore: 'Você começa a subir a montanha. O que está acontecendo AGORA?',
  tip: 'Present Continuous = TO BE + verbo com -ING. "I am working" = Eu ESTOU trabalhando.',
  
  levels: [
    {
      id: '1_8_bronze',
      title: 'O Momento',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Verbos com -ING',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Trabalhando', english: 'Working' },
            { portuguese: 'Comendo', english: 'Eating' },
            { portuguese: 'Dormindo', english: 'Sleeping' },
            { portuguese: 'Estudando', english: 'Studying' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Verbos no gerúndio!' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Eu estou trabalhando',
          instruction: 'Complete',
          sentence: 'I ___ working.',
          correct: 'am',
          options: ['am', 'is', 'are'],
          feedback: { success: { title: 'I am!', text: 'TO BE + -ING.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Ela está estudando',
          instruction: '"Ela está estudando inglês."',
          words: ['She', 'is', 'studying', 'English.'],
          correct: 'She is studying English.',
          feedback: { success: { title: 'Ótimo!', text: 'She IS studying.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Certo ou errado?',
          instruction: 'Analise',
          statement: 'They are eating lunch.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'They ARE eating.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: 'Eu estou lendo.',
          question: 'Eu estou lendo.',
          options: [
            { text: 'I reading.', correct: false },
            { text: 'I am reading.', correct: true },
            { text: 'I am read.', correct: false },
          ],
          feedback: { success: { title: 'I am reading!', text: 'Não esqueça o TO BE.' } }
        }
      ]
    },
    {
      id: '1_8_silver',
      title: 'Agora vs Sempre',
      color: '#c0c0c0',
      activities: [
        {
          type: 'category_sort',
          label: 'Aquecimento',
          title: 'Presente Simples ou Contínuo?',
          instruction: 'Classifique',
          categories: [
            { id: 'simples', name: 'Simple (Rotina)' },
            { id: 'continuo', name: 'Continuous (Agora)' }
          ],
          items: [
            { id: 1, text: 'I work every day', category: 'simples' },
            { id: 2, text: 'I am working now', category: 'continuo' },
            { id: 3, text: 'She always eats fruit', category: 'simples' },
            { id: 4, text: 'She is eating now', category: 'continuo' }
          ],
          feedback: { success: { title: 'Excelente!', text: 'Rotina vs Momento!' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Negativa',
          instruction: 'Complete',
          sentence: 'I am ___ sleeping.',
          correct: 'not',
          options: ['not', 'no', "don't"],
          feedback: { success: { title: 'Am not!', text: 'I am NOT sleeping.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Ele não está trabalhando',
          instruction: '"Ele não está trabalhando hoje."',
          words: ['He', 'is', 'not', 'working', 'today.'],
          correct: 'He is not working today.',
          feedback: { success: { title: 'Perfeito!', text: 'Ou "He isn\'t working".' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Erro comum',
          instruction: 'Ache o erro',
          sentence: 'I is working now.',
          errorWord: 'is',
          correction: 'am',
          feedback: { success: { title: 'I AM!', text: '"I" sempre usa "am". I am working.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Pergunta',
          instruction: 'Complete:',
          question: '___ you working?',
          options: [
            { text: 'Are', correct: true },
            { text: 'Do', correct: false },
            { text: 'Is', correct: false },
          ],
          feedback: { success: { title: 'Are you working?', text: 'TO BE na frente para perguntar.' } }
        }
      ]
    },
    {
      id: '1_8_gold',
      title: 'O Momento Completo',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de brasileiro',
          instruction: 'Ache o erro',
          sentence: 'She is work now.',
          errorWord: 'work',
          correction: 'working',
          feedback: { success: { title: 'Working!', text: 'TO BE precisa do -ING.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Frase complexa',
          instruction: '"Eu estou trabalhando mas meu irmão está dormindo."',
          words: ['I', 'am', 'working', 'but', 'my', 'brother', 'is', 'sleeping.'],
          correct: 'I am working but my brother is sleeping.',
          feedback: { success: { title: 'Mestre!', text: 'Dois sujeitos, dois contínuos.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Pergunta WH',
          instruction: 'Complete',
          sentence: 'What ___ you doing?',
          correct: 'are',
          options: ['are', 'do', 'is'],
          feedback: { success: { title: 'What are you doing?', text: 'A pergunta mais comum!' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Confusão de tempos',
          instruction: 'Ache o erro',
          sentence: 'I am works every day.',
          errorWord: 'works',
          correction: 'work',
          feedback: { success: { title: 'Rotina = Simple!', text: '"Every day" pede Present Simple: "I work every day".' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Gramática',
          instruction: 'Analise',
          statement: 'Look! She is dancing!',
          correct: true,
          feedback: { success: { title: 'Correto!', text: '"Look!" indica ação acontecendo AGORA.' } }
        }
      ]
    }
  ]
};