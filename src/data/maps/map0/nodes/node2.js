/**
 * Node 2: A Despedida
 * Tema: Goodbyes
 */
export const node2Data = {
  id: 2,
  title: 'A Despedida',
  theme: 'Goodbyes',
  lore: 'O dia acabou. É hora de ir descansar. Mas como se despedir sem parecer rude?',
  tip: '"Good Night" não é "Boa Noite" de chegada. É só quando você vai EMBORA ou DORMIR.',
  
  levels: [
    {
      id: '0_2_bronze',
      title: 'Saindo',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Formas de tchau',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Tchau', english: 'Bye' },
            { portuguese: 'Adeus', english: 'Goodbye' },
            { portuguese: 'Até logo', english: 'See you' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Várias formas de dizer tchau.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Formal ou casual?',
          instruction: 'Qual despedida é mais casual?',
          question: 'Você se despede de um amigo. O que diz?',
          options: [
            { text: 'Goodbye', correct: false },
            { text: 'Bye', correct: true },
            { text: 'Farewell', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: '"Bye" é curto e casual, perfeito pra amigos.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a afirmação',
          statement: '"Goodbye" é mais formal que "Bye".',
          correct: true,
          feedback: { success: { title: 'Correto!', text: '"Goodbye" é completo e formal. "Bye" é casual.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Contexto',
          instruction: 'O que você diz ao sair?',
          question: 'Você está indo embora. O que diz?',
          options: [
            { text: 'Hello', correct: false },
            { text: 'Goodbye', correct: true },
            { text: 'Good morning', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'Saindo = Goodbye.' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'Good___',
          correct: 'bye',
          options: ['bye', 'morning', 'night'],
          feedback: { success: { title: 'Perfeito!', text: 'Goodbye = Adeus.' } }
        }
      ]
    },
    {
      id: '0_2_silver',
      title: 'O Sono',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Hora de dormir',
          instruction: 'Conecte a despedida',
          pairs: [
            { portuguese: 'Boa noite (dormir)', english: 'Good night' },
            { portuguese: 'Durma bem', english: 'Sleep well' },
            { portuguese: 'Bons sonhos', english: 'Sweet dreams' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Formas carinhosas de se despedir à noite.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Cuidado!',
          instruction: 'Analise a situação',
          statement: 'Você chega na festa às 21h e diz "Good night".',
          correct: false,
          feedback: { success: { title: 'Correto!', text: 'Good night é despedida! Para chegar, use "Good evening".' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Monte a frase',
          instruction: '"Boa noite, mãe."',
          words: ['Good', 'night,', 'mom.'],
          correct: 'Good night, mom.',
          feedback: { success: { title: 'Perfeito!', text: 'Boa noite para a mãe antes de dormir.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Classificar',
          instruction: 'Esta é chegada ou saída?',
          question: '"Good night" é usado para:',
          options: [
            { text: 'Chegar em algum lugar', correct: false },
            { text: 'Ir embora ou dormir', correct: true },
            { text: 'Qualquer situação à noite', correct: false },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Good night = despedida ou hora de dormir.' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Desejo',
          instruction: 'Complete o desejo',
          sentence: 'Have a nice ___!',
          correct: 'day',
          options: ['day', 'you', 'bye'],
          feedback: { success: { title: 'Isso!', text: '"Have a nice day" = Tenha um bom dia!' } }
        }
      ]
    },
    {
      id: '0_2_gold',
      title: 'Até Logo',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Até mais tarde',
          instruction: '"Até mais tarde."',
          words: ['See', 'you', 'later.'],
          correct: 'See you later.',
          feedback: { success: { title: 'Perfeito!', text: '"Vejo você mais tarde" - casual e amigável.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Variações',
          instruction: 'Conecte as despedidas',
          pairs: [
            { portuguese: 'Até mais', english: 'See you' },
            { portuguese: 'Até amanhã', english: 'See you tomorrow' },
            { portuguese: 'Até logo', english: 'See you later' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Várias formas de "até"!' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de lógica',
          instruction: 'Encontre o erro',
          sentence: 'See you yesterday.',
          errorWord: 'yesterday',
          correction: 'later',
          feedback: { success: { title: 'Excelente!', text: 'Despedida é futuro, não passado!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Até amanhã',
          instruction: '"Até amanhã."',
          words: ['See', 'you', 'tomorrow.'],
          correct: 'See you tomorrow.',
          feedback: { success: { title: 'Perfeito!', text: 'Até amanhã!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: 'Como dizer "Até amanhã"?',
          question: 'Traduza: "Até amanhã"',
          options: [
            { text: 'See you yesterday', correct: false },
            { text: 'See you tomorrow', correct: true },
            { text: 'See you night', correct: false },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Tomorrow = amanhã.' } }
        }
      ]
    }
  ]
};