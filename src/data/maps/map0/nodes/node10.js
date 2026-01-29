/**
 * Node 10: O Guardião (BOSS)
 * Tema: Teste Final do Tutorial
 */
export const node10Data = {
  id: 10,
  title: 'O Guardião',
  theme: 'Boss',
  isBoss: true,
  lore: 'O Portão Principal. O Guardião exige tudo: soletração, números e polidez. Sem dicas.',
  tip: 'Respire fundo. Você já sabe tudo isso.',
  
  levels: [
    {
      id: '0_10_bronze',
      title: 'Identificação',
      color: '#cd7f32',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Teste',
          title: 'Apresentação completa',
          instruction: '"Olá, meu nome é Alex."',
          words: ['Hello,', 'my', 'name', 'is', 'Alex.'],
          correct: 'Hello, my name is Alex.',
          feedback: { success: { title: 'Muito bem!', text: 'Saudação + apresentação!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Teste',
          title: 'Soletrar',
          instruction: 'Como se soletra "ALEX"?',
          question: 'Soletrar: A-L-E-X',
          options: [
            { text: 'Ei - Él - I - Éks', correct: true },
            { text: 'Ah - Le - É - Xis', correct: false },
            { text: 'A - L - E - X', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Você domina o alfabeto!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Teste',
          title: 'Matemática',
          instruction: '1 + 2 = ?',
          question: 'One + Two = ?',
          options: [
            { text: 'Three', correct: true },
            { text: 'Four', correct: false },
            { text: 'Five', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: '1 + 2 = 3. Three!' } }
        },
        {
          type: 'vocab_match',
          label: 'Teste',
          title: 'Revisão',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Ouvir', english: 'Listen' },
            { portuguese: 'Ler', english: 'Read' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Comandos dominados!' } }
        },
        {
          type: 'true_false',
          label: 'Teste',
          title: 'Cores',
          instruction: 'Analise a afirmação',
          statement: '"Red" é uma cor.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Red = Vermelho. Uma cor!' } }
        }
      ]
    },
    {
      id: '0_10_silver',
      title: 'Protocolo',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Teste',
          title: 'Pedido educado',
          instruction: '"Fale inglês, por favor."',
          words: ['Speak', 'English,', 'please.'],
          correct: 'Speak English, please.',
          feedback: { success: { title: 'Excelente!', text: 'Pedido educado e claro!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Teste',
          title: 'Saudação formal',
          instruction: '"Bom dia, professor."',
          words: ['Good', 'morning,', 'teacher.'],
          correct: 'Good morning, teacher.',
          feedback: { success: { title: 'Perfeito!', text: 'Cumprimento respeitoso!' } }
        },
        {
          type: 'error_detective',
          label: 'Teste',
          title: 'Encontre o erro',
          instruction: 'Qual está errado?',
          sentence: 'A blues pen.',
          errorWord: 'blues',
          correction: 'blue',
          feedback: { success: { title: 'Ótimo!', text: 'Adjetivos não têm plural! Blue, não blues.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Teste',
          title: 'Matemática',
          instruction: '10 - 2 = ?',
          question: 'Ten - Two = ?',
          options: [
            { text: 'Eight', correct: true },
            { text: 'Seven', correct: false },
            { text: 'Nine', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: '10 - 2 = 8. Eight!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Teste',
          title: 'Situação',
          instruction: 'Você pisa no pé do guarda. O que diz?',
          question: 'Você pisou no pé de alguém:',
          options: [
            { text: 'Sorry', correct: true },
            { text: 'Thank you', correct: false },
            { text: 'Please', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Sorry = Desculpa!' } }
        }
      ]
    },
    {
      id: '0_10_gold',
      title: 'Visto Concedido',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Final',
          title: 'Frase completa',
          instruction: '"Eu sou do Brasil e eu falo inglês."',
          words: ['I', 'am', 'from', 'Brazil', 'and', 'I', 'speak', 'English.'],
          correct: 'I am from Brazil and I speak English.',
          feedback: { success: { title: 'Excelente!', text: 'Apresentação completa e fluente!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Final',
          title: 'Diálogo',
          instruction: 'Guard: "Number?" - You: ?',
          question: 'O guarda pede um número. Você responde:',
          options: [
            { text: 'Five', correct: true },
            { text: 'Blue', correct: false },
            { text: 'Sorry', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Five é um número. Blue é cor!' } }
        },
        {
          type: 'error_detective',
          label: 'Final',
          title: 'Último erro',
          instruction: 'Encontre o erro',
          sentence: 'I is a student.',
          errorWord: 'is',
          correction: 'am',
          feedback: { success: { title: 'Ótimo!', text: '"I" pede "am". Sempre!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Final',
          title: 'Soletrar ENGLISH',
          instruction: 'Soletre a palavra mais importante',
          words: ['E', 'N', 'G', 'L', 'I', 'S', 'H'],
          correct: 'E N G L I S H',
          feedback: { success: { title: 'Excelente!', text: 'Você sabe soletrar ENGLISH!' } }
        },
        {
          type: 'true_false',
          label: 'Final',
          title: 'Despedida',
          instruction: 'Analise a afirmação',
          statement: '"Goodbye" é o que você diz agora para entrar no Mapa 1.',
          correct: true,
          feedback: { success: { title: 'PARABÉNS!', text: 'Adeus Mapa 0! Bem-vindo ao Mapa 1!' } }
        }
      ]
    }
  ]
};