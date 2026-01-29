/**
 * Node 4: A Disputa
 * Tema: Possessivos (MY e YOUR)
 */
export const node4Data = {
  id: 4,
  title: 'A Disputa',
  theme: 'My & Your',
  lore: 'Você encontra outro sobrevivente. Vocês precisam definir o que é de quem para não brigar.',
  tip: 'Brasileiro adora falar "I car" (Eu carro). ERRADO! O correto é "MY car" (Meu carro).',
  
  levels: [
    {
      id: '2_4_bronze',
      title: 'A Posse',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Os possessivos',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Meu/Minha', english: 'My' },
            { portuguese: 'Seu/Sua', english: 'Your' },
            { portuguese: 'Casa', english: 'House' },
            { portuguese: 'Carro', english: 'Car' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'MY e YOUR. A posse começa aqui.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Minha casa',
          instruction: 'Monte a frase',
          words: ['My', 'house.'],
          correct: 'My house.',
          feedback: { success: { title: 'Isso!', text: 'Minha casa.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Erro clássico',
          instruction: 'Analise a frase',
          statement: '"I book" está correto.',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'Não é "I book". É "MY book" (meu livro).' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Meu nome',
          instruction: 'Complete a frase',
          sentence: 'This is ___ name.',
          correct: 'my',
          options: ['I', 'my', 'me'],
          feedback: { success: { title: 'MY!', text: 'Este é o MEU nome.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Seu telefone',
          instruction: 'Como dizer "Seu telefone"?',
          question: 'Traduza: "Seu telefone"',
          options: [
            { text: 'You phone', correct: false },
            { text: 'Your phone', correct: true },
            { text: 'Yours phone', correct: false },
          ],
          feedback: { success: { title: 'YOUR!', text: 'Your phone = Seu telefone.' } }
        }
      ]
    },
    {
      id: '2_4_silver',
      title: 'A Troca',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Seu carro',
          instruction: 'Monte a frase',
          words: ['Your', 'car', 'is', 'blue.'],
          correct: 'Your car is blue.',
          feedback: { success: { title: 'Ótimo!', text: 'Seu carro é azul.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Meu cachorro',
          instruction: 'Monte a frase',
          words: ['My', 'dog', 'is', 'happy.'],
          correct: 'My dog is happy.',
          feedback: { success: { title: 'Perfeito!', text: 'Meu cachorro está feliz.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de possessivo',
          instruction: 'Encontre a palavra errada',
          sentence: 'You house is big.',
          errorWord: 'You',
          correction: 'Your',
          feedback: { success: { title: 'Pegou!', text: '"You" é "Você". "Sua" é "YOUR".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Apontando para você',
          instruction: 'Estou apontando para VOCÊ. Esta é a ___ cadeira.',
          question: 'This is ___ chair.',
          options: [
            { text: 'my', correct: false },
            { text: 'your', correct: true },
            { text: 'you', correct: false },
          ],
          feedback: { success: { title: 'YOUR!', text: 'Estou falando COM você, então é YOUR.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Pergunta',
          instruction: 'Monte a pergunta',
          words: ['Is', 'this', 'your', 'phone?'],
          correct: 'Is this your phone?',
          feedback: { success: { title: 'Excelente!', text: 'Este é o seu telefone?' } }
        }
      ]
    },
    {
      id: '2_4_gold',
      title: 'A Pergunta Chata',
      color: '#ffd700',
      activities: [
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Diálogo',
          instruction: 'A: "Is this my food?" B: "No, it is ___ food."',
          sentence: 'No, it is ___ food.',
          correct: 'your',
          options: ['my', 'your', 'you'],
          feedback: { success: { title: 'YOUR!', text: 'B está devolvendo: "Não, é SUA comida."' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro com "you"',
          instruction: 'Encontre a palavra errada',
          sentence: 'Is this you key?',
          errorWord: 'you',
          correction: 'your',
          feedback: { success: { title: 'YOUR!', text: '"You" = Você. "Your" = Seu/Sua.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Combinando tudo',
          instruction: 'Posse + Preposição!',
          words: ['My', 'computer', 'is', 'on', 'your', 'table.'],
          correct: 'My computer is on your table.',
          feedback: { success: { title: 'EXCELENTE!', text: 'Meu computador está na sua mesa. Combo!' } }
        },
        {
          type: 'true_false',
          label: 'Desafio',
          title: 'Plural dos possessivos',
          instruction: 'Analise com cuidado',
          statement: '"Your" muda para "yours" quando é plural: "Yours cars".',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'Adjetivos NÃO têm plural em inglês! É "your cars", não "yours cars".' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: 'Traduza: "Minha casa"',
          sentence: '___ house.',
          correct: 'My',
          options: ['I', 'My', 'Me'],
          feedback: { success: { title: 'MY!', text: 'Você dominou MY e YOUR!' } }
        }
      ]
    }
  ]
};
