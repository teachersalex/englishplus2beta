/**
 * Node 9: Os Portões
 * Tema: Revisão Geral
 */
export const node9Data = {
  id: 9,
  title: 'Os Portões',
  theme: 'Revisão Geral',
  lore: 'Os portões do castelo estão à vista. Antes de entrar, revise tudo que aprendeu.',
  tip: 'Respire fundo. Você já sabe tudo isso. É hora de juntar as peças.',
  
  levels: [
    {
      id: '1_9_bronze',
      title: 'To Be Revisão',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Revisão',
          title: 'Tabela do To Be',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'I', english: 'am' },
            { portuguese: 'You/We/They', english: 'are' },
            { portuguese: 'He/She/It', english: 'is' },
          ],
          feedback: { success: { title: 'Dominado!', text: 'A base de tudo.' } }
        },
        {
          type: 'fill_gap',
          label: 'Teste',
          title: 'Complete',
          instruction: 'Escolha',
          sentence: 'My parents ___ from Brazil.',
          correct: 'are',
          options: ['is', 'am', 'are'],
          feedback: { success: { title: 'Are!', text: 'Parents = They = Are.' } }
        },
        {
          type: 'error_detective',
          label: 'Teste',
          title: 'Corrija',
          instruction: 'Ache o erro',
          sentence: 'She are my sister.',
          errorWord: 'are',
          correction: 'is',
          feedback: { success: { title: 'She IS!', text: '' } }
        },
        {
          type: 'sentence_builder',
          label: 'Teste',
          title: 'Monte',
          instruction: '"Eu não sou médico."',
          words: ['I', 'am', 'not', 'a', 'doctor.'],
          correct: 'I am not a doctor.',
          feedback: { success: { title: 'Perfeito!', text: 'Negativa dominada.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Teste',
          title: 'Pergunta',
          instruction: 'Complete:',
          question: '___ you from Brazil?',
          options: [
            { text: 'Are', correct: true },
            { text: 'Is', correct: false },
            { text: 'Do', correct: false },
          ],
          feedback: { success: { title: 'Are you?', text: 'Pergunta com To Be.' } }
        }
      ]
    },
    {
      id: '1_9_silver',
      title: 'Present Simple Revisão',
      color: '#c0c0c0',
      activities: [
        {
          type: 'category_sort',
          label: 'Revisão',
          title: 'Com S ou sem S?',
          instruction: 'Classifique',
          categories: [
            { id: 'comS', name: 'Verbo + S' },
            { id: 'semS', name: 'Verbo normal' }
          ],
          items: [
            { id: 1, text: 'She works', category: 'comS' },
            { id: 2, text: 'I work', category: 'semS' },
            { id: 3, text: 'He goes', category: 'comS' },
            { id: 4, text: 'They go', category: 'semS' }
          ],
          feedback: { success: { title: 'Excelente!', text: 'Só He/She/It leva S!' } }
        },
        {
          type: 'fill_gap',
          label: 'Teste',
          title: 'Negativa',
          instruction: 'Complete',
          sentence: 'She ___ not work here.',
          correct: 'does',
          options: ['do', 'does', 'is'],
          feedback: { success: { title: 'Does not!', text: 'She usa DOES.' } }
        },
        {
          type: 'error_detective',
          label: 'Teste',
          title: 'Corrija',
          instruction: 'Ache o erro',
          sentence: 'He don\'t like coffee.',
          errorWord: "don't",
          correction: "doesn't",
          feedback: { success: { title: "Doesn't!", text: 'He usa DOES.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Teste',
          title: 'Monte',
          instruction: '"Minha mãe trabalha em um hospital."',
          words: ['My', 'mother', 'works', 'at', 'a', 'hospital.'],
          correct: 'My mother works at a hospital.',
          feedback: { success: { title: 'Perfeito!', text: 'My mother = She = Works.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Teste',
          title: 'Pergunta',
          instruction: 'Complete:',
          question: '___ he speak English?',
          options: [
            { text: 'Does', correct: true },
            { text: 'Do', correct: false },
            { text: 'Is', correct: false },
          ],
          feedback: { success: { title: 'Does he?', text: 'Pergunta com DOES para He.' } }
        }
      ]
    },
    {
      id: '1_9_gold',
      title: 'Tudo Junto',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Can',
          instruction: 'Ache o erro',
          sentence: 'She cans swim.',
          errorWord: 'cans',
          correction: 'can',
          feedback: { success: { title: 'Can!', text: 'Can nunca muda.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Present Continuous',
          instruction: 'Complete',
          sentence: 'What ___ you doing?',
          correct: 'are',
          options: ['are', 'do', 'is'],
          feedback: { success: { title: 'Are you doing?', text: 'Present Continuous.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'There is/are',
          instruction: 'Ache o erro',
          sentence: 'There is many people.',
          errorWord: 'is',
          correction: 'are',
          feedback: { success: { title: 'There ARE!', text: 'Many people = plural.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Advérbio',
          instruction: '"Eu sempre acordo às 7h."',
          words: ['I', 'always', 'wake', 'up', 'at', '7am.'],
          correct: 'I always wake up at 7am.',
          feedback: { success: { title: 'Perfeito!', text: 'Advérbio antes do verbo.' } }
        },
        {
          type: 'true_false',
          label: 'Teste Final',
          title: 'Gramática',
          instruction: 'Analise',
          statement: 'She is always late but she works hard.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Frase perfeita! Pronto pro Boss.' } }
        }
      ]
    }
  ]
};