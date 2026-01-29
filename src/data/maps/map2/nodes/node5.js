/**
 * Node 5: O Casal Misterioso
 * Tema: Possessivos (HIS e HER)
 */
export const node5Data = {
  id: 5,
  title: 'O Casal Misterioso',
  theme: 'His & Her',
  lore: 'Você encontra itens de um homem e de uma mulher. De quem são essas coisas?',
  tip: 'O maior erro do Brasil: Usar "Your" para "Dele". YOUR = De VOCÊ. HIS = DELE. HER = DELA.',
  
  levels: [
    {
      id: '2_5_bronze',
      title: 'Ele e Ela',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Os possessivos',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Dele', english: 'His' },
            { portuguese: 'Dela', english: 'Her' },
            { portuguese: 'Nome', english: 'Name' },
            { portuguese: 'Bolsa', english: 'Bag' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'HIS e HER. Terceira pessoa!' } }
        },
        {
          type: 'category_sort',
          label: 'Prática',
          title: 'Homem ou Mulher?',
          instruction: 'Classifique corretamente',
          categories: [
            { id: 'his', name: 'His (Dele)' },
            { id: 'her', name: 'Her (Dela)' }
          ],
          items: [
            { id: 1, text: 'Father', category: 'his' },
            { id: 2, text: 'Mother', category: 'her' },
            { id: 3, text: 'Boy', category: 'his' },
            { id: 4, text: 'Girl', category: 'her' }
          ],
          feedback: { success: { title: 'Ótimo!', text: 'HIS para homens, HER para mulheres.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'O cachorro dela',
          instruction: 'Ela ama o cachorro DELA.',
          sentence: 'She loves ___ dog.',
          correct: 'her',
          options: ['his', 'her', 'she'],
          feedback: { success: { title: 'HER!', text: 'O cachorro DELA.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Nome de homem?',
          instruction: 'Analise a frase',
          statement: '"His name is Maria" está correto.',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'HIS é para homem. Maria é mulher. Seria "HER name is Maria".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'O carro dele',
          instruction: 'Como dizer "O carro dele"?',
          question: 'Traduza: "O carro dele"',
          options: [
            { text: 'Her car', correct: false },
            { text: 'His car', correct: true },
            { text: 'He car', correct: false },
          ],
          feedback: { success: { title: 'HIS!', text: 'His car = O carro dele.' } }
        }
      ]
    },
    {
      id: '2_5_silver',
      title: 'A Identificação',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Nome dele',
          instruction: 'Monte a frase',
          words: ['His', 'name', 'is', 'John.'],
          correct: 'His name is John.',
          feedback: { success: { title: 'Perfeito!', text: 'O nome dele é John.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Carro dela',
          instruction: 'Monte a frase',
          words: ['Her', 'car', 'is', 'red.'],
          correct: 'Her car is red.',
          feedback: { success: { title: 'Ótimo!', text: 'O carro dela é vermelho.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro brutal',
          instruction: 'Encontre a palavra errada',
          sentence: 'She name is Anna.',
          errorWord: 'She',
          correction: 'Her',
          feedback: { success: { title: 'HER!', text: '"She" é "Ela". "Dela" é "HER".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Apontando para um homem',
          instruction: 'Você aponta para um homem e fala sobre o carro DELE.',
          question: 'That is ___ car.',
          options: [
            { text: 'her', correct: false },
            { text: 'his', correct: true },
            { text: 'your', correct: false },
          ],
          feedback: { success: { title: 'HIS!', text: 'O carro DELE (do homem).' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'A bolsa',
          instruction: 'Monte a frase',
          words: ['This', 'is', 'her', 'bag.'],
          correct: 'This is her bag.',
          feedback: { success: { title: 'Excelente!', text: 'Esta é a bolsa dela.' } }
        }
      ]
    },
    {
      id: '2_5_gold',
      title: 'O Detetive de Donos',
      color: '#ffd700',
      activities: [
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Lógica: John',
          instruction: 'John come o sanduíche DELE.',
          sentence: 'John eats ___ sandwich.',
          correct: 'his',
          options: ['his', 'her', 'your'],
          feedback: { success: { title: 'HIS!', text: 'John é homem = HIS.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Lógica: Ana',
          instruction: 'Ana bebe o café DELA.',
          sentence: 'Ana drinks ___ coffee.',
          correct: 'her',
          options: ['his', 'her', 'your'],
          feedback: { success: { title: 'HER!', text: 'Ana é mulher = HER.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Gênero errado',
          instruction: 'Ana mostra o carro DELA.',
          sentence: 'Ana shows his car.',
          errorWord: 'his',
          correction: 'her',
          feedback: { success: { title: 'HER!', text: 'Ana é mulher = HER, não HIS.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Relações',
          instruction: 'Monte a frase',
          words: ['His', 'father', 'is', 'my', 'teacher.'],
          correct: 'His father is my teacher.',
          feedback: { success: { title: 'EXCELENTE!', text: 'O pai dele é meu professor. Dois possessivos!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'COMBO MÁXIMO',
          instruction: '"O gato dela está na mesa dele."',
          words: ['Her', 'cat', 'is', 'on', 'his', 'table.'],
          correct: 'Her cat is on his table.',
          feedback: { success: { title: 'LENDÁRIO!', text: 'Possessivos + Preposição. Você dominou A CASA!' } }
        }
      ]
    }
  ]
};