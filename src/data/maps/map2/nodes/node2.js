/**
 * Node 2: O Gato Bagunceiro
 * Tema: Preposições (ON e UNDER)
 */
export const node2Data = {
  id: 2,
  title: 'O Gato Bagunceiro',
  theme: 'On & Under',
  lore: 'Tem um gato na casa. Ele sobe em tudo e se esconde embaixo de tudo. Onde ele está agora?',
  tip: 'A regra de ouro: ON = Contato com a superfície (em cima). UNDER = Embaixo.',
  
  levels: [
    {
      id: '2_2_bronze',
      title: 'Onde está o gato?',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'As preposições',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Em cima', english: 'On' },
            { portuguese: 'Embaixo', english: 'Under' },
            { portuguese: 'Gato', english: 'Cat' },
            { portuguese: 'Cachorro', english: 'Dog' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'ON e UNDER. As preposições mais usadas.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Gato no sofá',
          instruction: 'O gato está deitado no sofá. Onde ele está?',
          question: 'The cat is ___ the sofa.',
          options: [
            { text: 'on', correct: true },
            { text: 'under', correct: false },
            { text: 'in', correct: false },
          ],
          feedback: { success: { title: 'ON!', text: 'Ele está EM CIMA do sofá, tocando a superfície.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'O gato está debaixo da mesa',
          sentence: 'The cat is ___ the table.',
          correct: 'under',
          options: ['on', 'under', 'in'],
          feedback: { success: { title: 'UNDER!', text: 'Embaixo da mesa.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Significado de ON',
          instruction: 'Analise a afirmação',
          statement: '"On" significa dentro.',
          correct: false,
          feedback: { success: { title: 'Falso!', text: 'ON = em cima, com contato. DENTRO seria "in".' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Monte a frase',
          instruction: '"O gato está na cama."',
          words: ['The', 'cat', 'is', 'on', 'the', 'bed.'],
          correct: 'The cat is on the bed.',
          feedback: { success: { title: 'Ótimo!', text: 'O gato está na cama!' } }
        }
      ]
    },
    {
      id: '2_2_silver',
      title: 'A Superfície',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Localização simples',
          instruction: '"Na mesa."',
          words: ['On', 'the', 'table.'],
          correct: 'On the table.',
          feedback: { success: { title: 'Isso!', text: 'Na mesa.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Embaixo',
          instruction: '"Embaixo da cadeira."',
          words: ['Under', 'the', 'chair.'],
          correct: 'Under the chair.',
          feedback: { success: { title: 'Perfeito!', text: 'Embaixo da cadeira.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de brasileiro',
          instruction: 'Encontre a palavra errada',
          sentence: 'The book is in the table.',
          errorWord: 'in',
          correction: 'on',
          feedback: { success: { title: 'EXCELENTE!', text: 'O livro não está DENTRO da mesa. Está EM CIMA. Use ON!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase completa',
          instruction: '"O gato está em cima da TV."',
          words: ['The', 'cat', 'is', 'on', 'the', 'TV.'],
          correct: 'The cat is on the TV.',
          feedback: { success: { title: 'Gato travesso!', text: 'Ele subiu na TV!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Opostos',
          instruction: 'Qual é o contrário de ON?',
          question: 'O contrário de ON é...',
          options: [
            { text: 'Under', correct: true },
            { text: 'In', correct: false },
            { text: 'At', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'ON (em cima) ↔ UNDER (embaixo).' } }
        }
      ]
    },
    {
      id: '2_2_gold',
      title: 'O Paradoxo do Chão',
      color: '#ffd700',
      activities: [
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'O tapete e o chão',
          instruction: 'Onde está o tapete?',
          sentence: 'The carpet is ___ the floor.',
          correct: 'on',
          options: ['on', 'under', 'in'],
          feedback: { success: { title: 'ON!', text: 'Mesmo no chão, o tapete está EM CIMA do floor.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'O cachorro',
          instruction: '"O cachorro está embaixo da mesa."',
          words: ['The', 'dog', 'is', 'under', 'the', 'table.'],
          correct: 'The dog is under the table.',
          feedback: { success: { title: 'Coitado!', text: 'O cachorro está embaixo da mesa.' } }
        },
        {
          type: 'true_false',
          label: 'Desafio',
          title: 'Você anda no chão?',
          instruction: 'Analise com cuidado',
          statement: 'Você anda "IN the floor".',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'Você anda ON the floor (no chão), não dentro dele!' } }
        },
        {
          type: 'true_false',
          label: 'Desafio',
          title: 'Erro com "of"',
          instruction: 'Analise a frase',
          statement: '"The cat is under of the bed" está correto.',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'UNDER não usa "of". O correto é "under the bed".' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Tradução final',
          instruction: '"O gato está embaixo da cama."',
          words: ['The', 'cat', 'is', 'under', 'the', 'bed.'],
          correct: 'The cat is under the bed.',
          feedback: { success: { title: 'PERFEITO!', text: 'Você dominou ON e UNDER!' } }
        }
      ]
    }
  ]
};