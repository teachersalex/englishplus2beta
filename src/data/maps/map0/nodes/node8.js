/**
 * Node 8: O Mundo Colorido
 * Tema: Colors
 */
export const node8Data = {
  id: 8,
  title: 'O Mundo Colorido',
  theme: 'Colors',
  lore: 'O porteiro pergunta a cor da sua mala para identificação.',
  tip: 'Em inglês, a cor vem ANTES do objeto. "Blue Car" (Azul Carro), nunca "Car Blue".',
  
  levels: [
    {
      id: '0_8_bronze',
      title: 'RGB',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Cores primárias',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Vermelho', english: 'Red' },
            { portuguese: 'Azul', english: 'Blue' },
            { portuguese: 'Verde', english: 'Green' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'RGB - Red, Green, Blue!' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a afirmação',
          statement: '"Green" é amarelo.',
          correct: false,
          feedback: { success: { title: 'Correto!', text: 'Green = Verde. Amarelo = Yellow.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Céu',
          instruction: 'Qual é a cor do céu?',
          question: 'The sky is ___.',
          options: [
            { text: 'Blue', correct: true },
            { text: 'Red', correct: false },
            { text: 'Green', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'The sky is BLUE = O céu é azul.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'The sky is ___.',
          correct: 'blue',
          options: ['blue', 'red', 'green'],
          feedback: { success: { title: 'Perfeito!', text: 'The sky is BLUE = O céu é azul.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Identificar',
          instruction: 'Qual cor é "Green"?',
          question: '"Green" é:',
          options: [
            { text: 'Verde', correct: true },
            { text: 'Azul', correct: false },
            { text: 'Amarelo', correct: false },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Green = Verde.' } }
        }
      ]
    },
    {
      id: '0_8_silver',
      title: 'Luz e Sombra',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Mais cores',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Preto', english: 'Black' },
            { portuguese: 'Branco', english: 'White' },
            { portuguese: 'Amarelo', english: 'Yellow' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Luz (white), sombra (black) e sol (yellow)!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase simples',
          instruction: '"É preto."',
          words: ['It', 'is', 'black.'],
          correct: 'It is black.',
          feedback: { success: { title: 'Isso!', text: '"É preto" = It is black.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'Snow is ___.',
          correct: 'white',
          options: ['white', 'black', 'yellow'],
          feedback: { success: { title: 'Perfeito!', text: 'Snow is WHITE = Neve é branca.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Associação',
          instruction: 'Analise a afirmação',
          statement: 'O sol é "Yellow".',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Sun = Yellow. Sol = Amarelo!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Oposto',
          instruction: 'Qual é o oposto de "Black"?',
          question: 'O oposto de "Black" é:',
          options: [
            { text: 'White', correct: true },
            { text: 'Red', correct: false },
            { text: 'Yellow', correct: false },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Black ↔ White. Preto ↔ Branco.' } }
        }
      ]
    },
    {
      id: '0_8_gold',
      title: 'A Inversão',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Adjetivo + Substantivo',
          instruction: '"Carro vermelho"',
          words: ['Red', 'car.'],
          correct: 'Red car.',
          feedback: { success: { title: 'Excelente!', text: 'Em inglês: COR + OBJETO. Red car!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Mais prática',
          instruction: '"Caneta azul"',
          words: ['Blue', 'pen.'],
          correct: 'Blue pen.',
          feedback: { success: { title: 'Perfeito!', text: 'Blue pen = Caneta azul.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Encontre o erro',
          instruction: 'Qual palavra está errada?',
          sentence: 'The car is reds.',
          errorWord: 'reds',
          correction: 'red',
          feedback: { success: { title: 'Ótimo!', text: 'Cores não têm plural em inglês! Red, não reds.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Com artigo',
          instruction: '"Uma maçã verde"',
          words: ['A', 'green', 'apple.'],
          correct: 'A green apple.',
          feedback: { success: { title: 'Excelente!', text: 'A + COR + OBJETO.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Regra de ouro',
          instruction: 'Analise a afirmação',
          statement: 'Em inglês, o adjetivo vem ANTES do substantivo.',
          correct: true,
          feedback: { success: { title: 'Muito bem!', text: 'Regra de ouro memorizada!' } }
        }
      ]
    }
  ]
};