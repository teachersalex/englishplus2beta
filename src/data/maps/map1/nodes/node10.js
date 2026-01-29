/**
 * Node 10: O Castelo (BOSS)
 * Tema: Teste Final do Mapa 1
 */
export const node10Data = {
  id: 10,
  title: 'O Castelo',
  theme: 'Boss',
  isBoss: true,
  lore: 'O Castelo. O Rei exige perfeição. Prove que você domina o Presente.',
  tip: 'Sem dicas. Você já sabe tudo.',
  
  levels: [
    {
      id: '1_10_bronze',
      title: 'O Primeiro Teste',
      color: '#cd7f32',
      activities: [
        {
          type: 'fill_gap',
          label: 'Boss',
          title: 'To Be',
          instruction: 'Complete',
          sentence: 'My brother ___ a doctor.',
          correct: 'is',
          options: ['is', 'am', 'are'],
          feedback: { success: { title: 'Correto!', text: '' } }
        },
        {
          type: 'fill_gap',
          label: 'Boss',
          title: 'Present Simple',
          instruction: 'Complete',
          sentence: 'She ___ English very well.',
          correct: 'speaks',
          options: ['speak', 'speaks', 'is speak'],
          feedback: { success: { title: 'Correto!', text: '' } }
        },
        {
          type: 'error_detective',
          label: 'Boss',
          title: 'Corrija',
          instruction: 'Ache o erro',
          sentence: 'I studies English.',
          errorWord: 'studies',
          correction: 'study',
          feedback: { success: { title: 'Correto!', text: 'Com "I", verbo na forma base.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Boss',
          title: 'Monte',
          instruction: '"Há muitos estudantes aqui."',
          words: ['There', 'are', 'many', 'students', 'here.'],
          correct: 'There are many students here.',
          feedback: { success: { title: 'Correto!', text: '' } }
        },
        {
          type: 'multiple_choice',
          label: 'Boss',
          title: 'Can',
          instruction: 'Complete:',
          question: 'She ___ play piano.',
          options: [
            { text: 'can', correct: true },
            { text: 'cans', correct: false },
            { text: 'can to', correct: false },
          ],
          feedback: { success: { title: 'Correto!', text: '' } }
        }
      ]
    },
    {
      id: '1_10_silver',
      title: 'O Segundo Teste',
      color: '#c0c0c0',
      activities: [
        {
          type: 'error_detective',
          label: 'Boss',
          title: 'Negativa',
          instruction: 'Ache o erro',
          sentence: "He don't work here.",
          errorWord: "don't",
          correction: "doesn't",
          feedback: { success: { title: 'Correto!', text: '' } }
        },
        {
          type: 'fill_gap',
          label: 'Boss',
          title: 'Present Continuous',
          instruction: 'Complete',
          sentence: 'I ___ working now.',
          correct: 'am',
          options: ['am', 'is', 'are'],
          feedback: { success: { title: 'Correto!', text: '' } }
        },
        {
          type: 'sentence_builder',
          label: 'Boss',
          title: 'Advérbio',
          instruction: '"Ela está sempre feliz."',
          words: ['She', 'is', 'always', 'happy.'],
          correct: 'She is always happy.',
          feedback: { success: { title: 'Correto!', text: 'Advérbio após To Be.' } }
        },
        {
          type: 'error_detective',
          label: 'Boss',
          title: 'There is/are',
          instruction: 'Ache o erro',
          sentence: 'There is two cars.',
          errorWord: 'is',
          correction: 'are',
          feedback: { success: { title: 'Correto!', text: '' } }
        },
        {
          type: 'multiple_choice',
          label: 'Boss',
          title: 'Pergunta',
          instruction: 'Complete:',
          question: '___ she work here?',
          options: [
            { text: 'Does', correct: true },
            { text: 'Do', correct: false },
            { text: 'Is', correct: false },
          ],
          feedback: { success: { title: 'Correto!', text: '' } }
        }
      ]
    },
    {
      id: '1_10_gold',
      title: 'A Coroação',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Final',
          title: 'Frase completa',
          instruction: '"Eu sou do Brasil e eu falo inglês."',
          words: ['I', 'am', 'from', 'Brazil', 'and', 'I', 'speak', 'English.'],
          correct: 'I am from Brazil and I speak English.',
          feedback: { success: { title: 'Excelente!', text: '' } }
        },
        {
          type: 'error_detective',
          label: 'Final',
          title: 'Erro fatal',
          instruction: 'Ache o erro',
          sentence: 'I have 30 years old.',
          errorWord: 'have',
          correction: 'am',
          feedback: { success: { title: 'I AM!', text: 'Idade usa TO BE em inglês.' } }
        },
        {
          type: 'fill_gap',
          label: 'Final',
          title: 'Continuous',
          instruction: 'Complete',
          sentence: 'What ___ you doing right now?',
          correct: 'are',
          options: ['are', 'do', 'is'],
          feedback: { success: { title: 'Correto!', text: '' } }
        },
        {
          type: 'sentence_builder',
          label: 'Final',
          title: 'Frase do Rei',
          instruction: '"Eu sei falar inglês e estou aprendendo todo dia."',
          words: ['I', 'can', 'speak', 'English', 'and', 'I', 'am', 'learning', 'every', 'day.'],
          correct: 'I can speak English and I am learning every day.',
          feedback: { success: { title: 'PERFEITO!', text: 'Can + Present Continuous na mesma frase!' } }
        },
        {
          type: 'true_false',
          label: 'Final',
          title: 'A Frase Perfeita',
          instruction: 'Analise',
          statement: 'My name is Alex, I am from Brazil, I work as a teacher, and I can speak English.',
          correct: true,
          feedback: { success: { title: 'PARABÉNS!', text: 'Você conquistou o Castelo! Bem-vindo ao Mapa 2!' } }
        }
      ]
    }
  ]
};