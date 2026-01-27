/**
 * NODE 10: O CASTELO (THE BOSS)
 * 3 levels × 5 atividades = 15 atividades
 */
export const node10Data = {
  id: 10,
  title: 'O Castelo',
  theme: 'Teste Final',
  lore: 'Você entrou. O Rei está no trono. Não há dicas aqui. É o teste final para provar que você domina o Nível 1.',
  tip: 'Respire fundo. Confie no seu instinto.',
  
  levels: [
    {
      id: '10_bronze',
      title: 'A Identidade',
      color: '#cd7f32',
      activities: [
        {
          type: 'fill_gap',
          label: 'Combate',
          title: 'Quem é você?',
          instruction: 'Apresente-se',
          sentence: 'Hello. I ___ a teacher.',
          correct: 'am',
          options: ['am', 'is', 'are'],
          feedback: { success: { title: 'Confirmado.', text: 'I am.' } }
        },
        {
          type: 'error_detective',
          label: 'Combate',
          title: 'Rotina',
          instruction: 'Corrija',
          sentence: "She don't live here.",
          errorWord: "don't",
          correction: "doesn't",
          feedback: { success: { title: 'Defesa!', text: "She doesn't." } }
        },
        {
          type: 'multiple_choice',
          label: 'Combate',
          title: 'Existência',
          instruction: 'Pergunta:',
          question: '___ a problem?',
          options: [
            { text: 'Is there', correct: true },
            { text: 'Have', correct: false },
          ],
          feedback: { success: { title: 'Is there!', text: 'Pergunta de existência.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Combate',
          title: 'Ação',
          instruction: 'Agora',
          words: ['We', 'are', 'learning', 'English.'],
          correct: 'We are learning English.',
          feedback: { success: { title: 'Correto!', text: 'Present Continuous.' } }
        },
        {
          type: 'true_false',
          label: 'Combate',
          title: 'Verdade',
          instruction: 'Analise',
          statement: 'He works every day.',
          correct: true,
          feedback: { success: { title: 'Certo!', text: 'He + Works.' } }
        }
      ]
    },
    {
      id: '10_silver',
      title: 'A Estratégia',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Combate',
          title: 'Habilidade',
          instruction: 'Monte',
          words: ['I', 'can', 'read', 'English.'],
          correct: 'I can read English.',
          feedback: { success: { title: 'Boa!', text: 'Can + Verbo.' } }
        },
        {
          type: 'fill_gap',
          label: 'Combate',
          title: 'Alergia',
          instruction: 'Complete',
          sentence: 'I can ___ very fast.',
          correct: 'run',
          options: ['run', 'to run'],
          feedback: { success: { title: 'Run!', text: 'Sem TO.' } }
        },
        {
          type: 'error_detective',
          label: 'Combate',
          title: 'Possessivo',
          instruction: 'Ache o erro',
          sentence: 'This is he car.',
          errorWord: 'he',
          correction: 'his',
          feedback: { success: { title: 'His!', text: 'Carro DELE (his).' } }
        },
        {
          type: 'multiple_choice',
          label: 'Combate',
          title: 'Frequência',
          instruction: 'Posição',
          question: 'Ele sempre estuda.',
          options: [
            { text: 'He always studies.', correct: true },
            { text: 'He studies always.', correct: false },
          ],
          feedback: { success: { title: 'Always studies!', text: 'Advérbio antes.' } }
        },
        {
          type: 'true_false',
          label: 'Combate',
          title: 'Analise',
          instruction: 'Certo?',
          statement: 'She cans swim.',
          correct: false,
          feedback: { success: { title: 'Errado!', text: 'Can não tem S.' } }
        }
      ]
    },
    {
      id: '10_gold',
      title: 'A Coroa',
      color: '#ffd700',
      activities: [
        {
          type: 'fill_gap',
          label: 'Boss',
          title: 'Mix Final',
          instruction: 'Complete',
          sentence: 'Usually I ___, but today I am ___.',
          correct: 'work / relaxing',
          options: ['work / relaxing', 'working / relax'],
          feedback: { success: { title: 'Golpe final!', text: 'Domínio total dos tempos.' } }
        },
        {
          type: 'error_detective',
          label: 'Boss',
          title: 'Vício Fatal',
          instruction: 'Ache o erro',
          sentence: 'I have 20 years.',
          errorWord: 'have',
          correction: 'am',
          feedback: { success: { title: 'Venceu!', text: 'I AM 20 years.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Boss',
          title: 'Pergunta Complexa',
          instruction: 'Monte',
          words: ['Where', 'do', 'you', 'live?'],
          correct: 'Where do you live?',
          feedback: { success: { title: 'Fluente!', text: 'Pergunta WH perfeita.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Boss',
          title: 'Plural',
          instruction: 'Pessoas',
          question: 'Há cinco pessoas.',
          options: [
            { text: 'There are five people.', correct: true },
            { text: 'There is five persons.', correct: false },
          ],
          feedback: { success: { title: 'People!', text: 'Plural irregular correto.' } }
        },
        {
          type: 'true_false',
          label: 'Vitória',
          title: 'Julgamento',
          instruction: 'Você pode falar inglês.',
          statement: 'You can speak English.',
          correct: true,
          feedback: { success: { title: '👑 TRUE!', text: 'O Castelo é seu.' } }
        }
      ]
    }
  ]
};