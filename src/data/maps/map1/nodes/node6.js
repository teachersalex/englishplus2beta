/**
 * Node 6: O Rio e a Vila
 * Tema: There is / There are
 */
export const node6Data = {
  id: 6,
  title: 'O Rio e a Vila',
  theme: 'There is / There are',
  lore: 'Você chega na vila. O que existe aqui? Aprenda a descrever lugares.',
  tip: '"There is" para singular, "There are" para plural. Simples assim.',
  
  levels: [
    {
      id: '1_6_bronze',
      title: 'O Que Existe',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Lugares',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Igreja', english: 'Church' },
            { portuguese: 'Banco', english: 'Bank' },
            { portuguese: 'Restaurante', english: 'Restaurant' },
            { portuguese: 'Parque', english: 'Park' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Vocabulário de cidade!' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Singular',
          instruction: 'Complete',
          sentence: 'There ___ a bank here.',
          correct: 'is',
          options: ['is', 'are', 'have'],
          feedback: { success: { title: 'There is!', text: 'Um banco = singular = IS.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Plural',
          instruction: 'Complete',
          sentence: 'There ___ many people.',
          correct: 'are',
          options: ['is', 'are', 'has'],
          feedback: { success: { title: 'There are!', text: 'Muitas pessoas = plural = ARE.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Certo ou errado?',
          instruction: 'Analise',
          statement: 'There is a church in my city.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Uma igreja = There is.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Traduza',
          instruction: 'Há muitos carros.',
          question: 'Há muitos carros.',
          options: [
            { text: 'There is many cars.', correct: false },
            { text: 'There are many cars.', correct: true },
            { text: 'Have many cars.', correct: false },
          ],
          feedback: { success: { title: 'There ARE!', text: 'Carros = plural.' } }
        }
      ]
    },
    {
      id: '1_6_silver',
      title: 'Descrevendo',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Há um rio',
          instruction: '"Há um rio perto da vila."',
          words: ['There', 'is', 'a', 'river', 'near', 'the', 'village.'],
          correct: 'There is a river near the village.',
          feedback: { success: { title: 'Ótimo!', text: 'Descrição perfeita!' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Negativa singular',
          instruction: 'Complete',
          sentence: 'There ___ not a hospital here.',
          correct: 'is',
          options: ['is', 'are', 'do'],
          feedback: { success: { title: 'There is not!', text: 'Ou "There isn\'t".' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Erro comum',
          instruction: 'Ache o erro',
          sentence: 'There has a problem.',
          errorWord: 'has',
          correction: 'is',
          feedback: { success: { title: 'There IS!', text: 'Para existência, use "There is", não "has".' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Negativa plural',
          instruction: '"Não há ônibus aqui."',
          words: ['There', 'are', 'no', 'buses', 'here.'],
          correct: 'There are no buses here.',
          feedback: { success: { title: 'Perfeito!', text: '"No" também funciona para negar.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Pergunta',
          instruction: 'Complete:',
          question: '___ there a bank near here?',
          options: [
            { text: 'Is', correct: true },
            { text: 'Are', correct: false },
            { text: 'Do', correct: false },
          ],
          feedback: { success: { title: 'Is there?', text: 'Pergunta inverte: Is there...?' } }
        }
      ]
    },
    {
      id: '1_6_gold',
      title: 'A Vila Completa',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro fatal',
          instruction: 'Ache o erro',
          sentence: 'There is many students.',
          errorWord: 'is',
          correction: 'are',
          feedback: { success: { title: 'There ARE!', text: 'Many students = plural.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Pergunta plural',
          instruction: 'Complete',
          sentence: '___ there any restaurants?',
          correct: 'Are',
          options: ['Is', 'Are', 'Do'],
          feedback: { success: { title: 'Are there?', text: 'Restaurants = plural.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase complexa',
          instruction: '"Há um parque e há muitas árvores."',
          words: ['There', 'is', 'a', 'park', 'and', 'there', 'are', 'many', 'trees.'],
          correct: 'There is a park and there are many trees.',
          feedback: { success: { title: 'Mestre!', text: 'Singular e plural na mesma frase.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Tradução errada',
          instruction: 'Ache o erro',
          sentence: 'There has a bank here.',
          errorWord: 'has',
          correction: 'is',
          feedback: { success: { title: 'There IS!', text: 'Para existência, use "There is", não "has".' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Gramática',
          instruction: 'Analise',
          statement: 'There are a book on the table.',
          correct: false,
          feedback: { success: { title: 'Falso!', text: 'A book = singular. O correto é "There is a book".' } }
        }
      ]
    }
  ]
};