/**
 * Node 7: A Contagem
 * Tema: Numbers 0-10
 */
export const node7Data = {
  id: 7,
  title: 'A Contagem',
  theme: 'Numbers 0-10',
  lore: 'Você precisa pagar o pedágio. Quantas moedas você tem?',
  tip: 'Cuidado com o "One" (som de "Uan"). E o "Three" tem o famoso som de sopro (th).',
  
  levels: [
    {
      id: '0_7_bronze',
      title: '1, 2, 3',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Primeiros números',
          instruction: 'Conecte número ↔ palavra',
          pairs: [
            { portuguese: '1', english: 'One' },
            { portuguese: '2', english: 'Two' },
            { portuguese: '3', english: 'Three' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Os três primeiros números!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Sequência',
          instruction: 'Conte: "1, 2, 3"',
          words: ['One', 'Two', 'Three'],
          correct: 'One Two Three',
          feedback: { success: { title: 'Isso!', text: '1, 2, 3 em inglês!' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Pronúncia',
          instruction: 'Analise a afirmação',
          statement: '"Tree" (árvore) e "Three" (três) são iguais.',
          correct: false,
          feedback: { success: { title: 'Correto!', text: 'O sopro do "th" muda tudo!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'One, ___, three.',
          correct: 'two',
          options: ['two', 'four', 'five'],
          feedback: { success: { title: 'Perfeito!', text: 'One, TWO, three.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Zero',
          instruction: 'Como se diz "0" em inglês?',
          question: 'O número 0 é:',
          options: [
            { text: 'Zero', correct: true },
            { text: 'Cero', correct: false },
            { text: 'Nulo', correct: false },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Zero = 0. Igual ao português!' } }
        }
      ]
    },
    {
      id: '0_7_silver',
      title: 'A Mão Cheia',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: '4, 5, 6, 7',
          instruction: 'Conecte número ↔ palavra',
          pairs: [
            { portuguese: '4', english: 'Four' },
            { portuguese: '5', english: 'Five' },
            { portuguese: '6', english: 'Six' },
            { portuguese: '7', english: 'Seven' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'A mão cheia e mais um pouco!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Matemática',
          instruction: '2 + 2 = ?',
          question: 'Two + Two = ?',
          options: [
            { text: 'Four', correct: true },
            { text: 'Three', correct: false },
            { text: 'Five', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: '2 + 2 = 4. Four!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Sequência',
          instruction: 'Conte: "4, 5, 6"',
          words: ['Four', 'Five', 'Six'],
          correct: 'Four Five Six',
          feedback: { success: { title: 'Perfeito!', text: '4, 5, 6!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'Five, six, ___.',
          correct: 'seven',
          options: ['seven', 'eight', 'four'],
          feedback: { success: { title: 'Ótimo!', text: 'Five, six, SEVEN.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Identificar',
          instruction: 'Qual número é o "Seven"?',
          question: '"Seven" é qual número?',
          options: [
            { text: '7', correct: true },
            { text: '6', correct: false },
            { text: '8', correct: false },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Seven = 7.' } }
        }
      ]
    },
    {
      id: '0_7_gold',
      title: 'O Dígito Final',
      color: '#ffd700',
      activities: [
        {
          type: 'vocab_match',
          label: 'Desafio',
          title: '8, 9, 10',
          instruction: 'Conecte número ↔ palavra',
          pairs: [
            { portuguese: '8', english: 'Eight' },
            { portuguese: '9', english: 'Nine' },
            { portuguese: '10', english: 'Ten' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Agora você sabe de 0 a 10!' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Pronúncia',
          instruction: 'Analise a afirmação',
          statement: '"Eight" se pronuncia "Eit".',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Eight = "Eit". O "gh" é mudo!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Matemática',
          instruction: '5 + 5 = ?',
          question: 'Five + Five = ?',
          options: [
            { text: 'Ten', correct: true },
            { text: 'Nine', correct: false },
            { text: 'Eight', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: '5 + 5 = 10. Ten!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Número de telefone',
          instruction: '"Meu número é nove-um-um."',
          words: ['My', 'number', 'is', 'nine-one-one.'],
          correct: 'My number is nine-one-one.',
          feedback: { success: { title: 'Ótimo!', text: '911 - O número de emergência!' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Sequência final',
          instruction: 'Preencha a lacuna',
          sentence: 'Eight, nine, ___.',
          correct: 'ten',
          options: ['ten', 'eleven', 'seven'],
          feedback: { success: { title: 'Excelente!', text: 'Eight, nine, TEN. Você completou os números!' } }
        }
      ]
    }
  ]
};