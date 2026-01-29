/**
 * Node 9: O Inventário
 * Tema: Demonstrativos (This / That / These / Those)
 */
export const node9Data = {
  id: 9,
  title: 'O Inventário',
  theme: 'This / That / These / Those',
  lore: 'Vamos fazer o inventário. O que está na sua mão e o que está lá longe?',
  tip: 'THIS/THESE = Perto. THAT/THOSE = Longe. THIS/THAT = Singular. THESE/THOSE = Plural.',
  
  levels: [
    {
      id: '2_9_bronze',
      title: 'Singular (Isto/Aquilo)',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Perto e longe',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Isto (aqui)', english: 'This' },
            { portuguese: 'Aquilo (lá)', english: 'That' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'This = perto. That = longe.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Minha caneta',
          instruction: '"Isto é minha caneta."',
          words: ['This', 'is', 'my', 'pen.'],
          correct: 'This is my pen.',
          feedback: { success: { title: 'Isso!', text: 'Isto é minha caneta (está na minha mão).' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Seu carro',
          instruction: '"Aquilo é seu carro."',
          words: ['That', 'is', 'your', 'car.'],
          correct: 'That is your car.',
          feedback: { success: { title: 'Perfeito!', text: 'Aquilo é seu carro (está longe).' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Conceito',
          instruction: 'Analise a afirmação',
          statement: 'Você usa "That" para coisas que estão na sua mão.',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'Na sua mão = THIS (perto). Longe = THAT.' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Complete',
          instruction: 'Apontando para algo PERTO.',
          sentence: '___ is my book.',
          correct: 'This',
          options: ['This', 'That', 'These'],
          feedback: { success: { title: 'THIS!', text: 'Perto e singular = This.' } }
        }
      ]
    },
    {
      id: '2_9_silver',
      title: 'Plural (Estes/Aqueles)',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Plurais',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Estes (aqui)', english: 'These' },
            { portuguese: 'Aqueles (lá)', english: 'Those' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'These = perto + plural. Those = longe + plural.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Meus sapatos (aqui)',
          instruction: 'Os sapatos estão aqui perto.',
          sentence: '___ are my shoes.',
          correct: 'These',
          options: ['These', 'Those', 'This'],
          feedback: { success: { title: 'THESE!', text: 'Perto + plural = These.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Pássaros (no céu)',
          instruction: 'Os pássaros estão lá no céu (longe).',
          sentence: '___ are birds.',
          correct: 'Those',
          options: ['Those', 'These', 'That'],
          feedback: { success: { title: 'THOSE!', text: 'Longe + plural = Those.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Plural de This',
          instruction: 'Qual é o plural de "This is"?',
          question: 'Plural de "This is"...',
          options: [
            { text: 'These are', correct: true },
            { text: 'Those is', correct: false },
            { text: 'This are', correct: false },
          ],
          feedback: { success: { title: 'THESE ARE!', text: 'This is → These are.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Monte a frase',
          instruction: '"Aqueles são meus livros."',
          words: ['Those', 'are', 'my', 'books.'],
          correct: 'Those are my books.',
          feedback: { success: { title: 'Perfeito!', text: 'Aqueles são meus livros.' } }
        }
      ]
    },
    {
      id: '2_9_gold',
      title: 'O Mix Espacial',
      color: '#ffd700',
      activities: [
        {
          type: 'category_sort',
          label: 'Desafio',
          title: 'Perto vs Longe',
          instruction: 'Classifique os demonstrativos',
          categories: [
            { id: 'perto', name: 'Perto' },
            { id: 'longe', name: 'Longe' }
          ],
          items: [
            { id: 1, text: 'This', category: 'perto' },
            { id: 2, text: 'These', category: 'perto' },
            { id: 3, text: 'That', category: 'longe' },
            { id: 4, text: 'Those', category: 'longe' }
          ],
          feedback: { success: { title: 'Ótimo!', text: 'This/These = perto. That/Those = longe.' } }
        },
        {
          type: 'category_sort',
          label: 'Desafio',
          title: 'Singular vs Plural',
          instruction: 'Classifique os demonstrativos',
          categories: [
            { id: 'singular', name: 'Singular' },
            { id: 'plural', name: 'Plural' }
          ],
          items: [
            { id: 1, text: 'This', category: 'singular' },
            { id: 2, text: 'That', category: 'singular' },
            { id: 3, text: 'These', category: 'plural' },
            { id: 4, text: 'Those', category: 'plural' }
          ],
          feedback: { success: { title: 'Perfeito!', text: 'This/That = singular. These/Those = plural.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Concordância',
          instruction: 'Encontre a palavra errada',
          sentence: 'These is my book.',
          errorWord: 'These',
          correction: 'This',
          feedback: { success: { title: 'Pegou!', text: '"Book" é singular. Use THIS, não THESE.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Combo completo',
          instruction: '"Aquelas são as chaves do meu pai."',
          words: ['Those', 'are', 'my', "father's", 'keys.'],
          correct: "Those are my father's keys.",
          feedback: { success: { title: 'EXCELENTE!', text: 'Those + Genitive Case. Combo!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: '"Aquilo é meu."',
          words: ['That', 'is', 'mine.'],
          correct: 'That is mine.',
          feedback: { success: { title: 'PERFEITO!', text: 'Você dominou os demonstrativos!' } }
        }
      ]
    }
  ]
};