/**
 * NODE 6: O RIO E A VILA
 * 3 levels × 5 atividades = 15 atividades
 */
export const node6Data = {
  id: 6,
  title: 'O Rio e a Vila',
  theme: 'There is / There are',
  lore: 'Você para na ponte. Para descrever o que existe no mundo, você não pode usar "posse" (Have). Você precisa declarar "existência" (There is).',
  tip: 'Erro nº 1 de brasileiro: Dizer "Have a car". O certo é "There is a car". "Have" é só para dono!',
  
  levels: [
    {
      id: '6_bronze',
      title: 'A Paisagem',
      color: '#cd7f32',
      activities: [
        {
          type: 'category_sort',
          label: 'Aquecimento',
          title: 'Singular vs Plural',
          instruction: 'Classifique corretamente',
          categories: [
            { id: 'singular', name: 'There IS' },
            { id: 'plural', name: 'There ARE' }
          ],
          items: [
            { id: 1, text: 'A dog', category: 'singular' },
            { id: 2, text: 'Two dogs', category: 'plural' },
            { id: 3, text: 'One car', category: 'singular' },
            { id: 4, text: 'Many people', category: 'plural' }
          ],
          feedback: { success: { title: 'Fácil!', text: 'Um = Is. Vários = Are.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Tem uma farmácia...',
          instruction: 'Complete',
          sentence: '___ a pharmacy near here.',
          correct: 'There is',
          options: ['Have', 'There is', 'There are'],
          feedback: { success: { title: 'Isso!', text: 'Existência = There is.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Tradução',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Há (singular)', english: 'There is' },
            { portuguese: 'Há (plural)', english: 'There are' },
            { portuguese: 'Não há', english: "There isn't" },
          ],
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Analise a frase',
          instruction: 'Certo ou errado?',
          statement: 'Have a car on the street.',
          correct: false,
          feedback: { success: { title: 'Errado!', text: 'O certo é "There is a car".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Há muitas pessoas',
          instruction: 'Escolha a correta:',
          question: 'Há muitas pessoas aqui.',
          options: [
            { text: 'There is many people.', correct: false },
            { text: 'There are many people.', correct: true },
          ],
          feedback: { success: { title: 'Are!', text: 'People é plural.' } }
        }
      ]
    },
    {
      id: '6_silver',
      title: 'A Cidade',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Monte a cena',
          instruction: 'Organize',
          words: ['There', 'are', 'two', 'buses', 'here.'],
          correct: 'There are two buses here.',
          feedback: { success: { title: 'Perfeito!', text: 'Plural correto.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Negativa',
          instruction: 'Não tem leite',
          sentence: 'There ___ any milk.',
          correct: "isn't",
          options: ["isn't", "aren't", "not"],
          feedback: { success: { title: "Isn't!", text: 'Leite é incontável (singular).' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'O vício do Have',
          instruction: 'Ache o erro',
          sentence: 'Have two dogs in the house.',
          errorWord: 'Have',
          correction: 'There are',
          feedback: { success: { title: 'Pegou!', text: 'Troque Have por There are.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Pergunta',
          instruction: 'Tem um problema?',
          words: ['Is', 'there', 'a', 'problem?'],
          correct: 'Is there a problem?',
          feedback: { success: { title: 'Boa!', text: 'Na pergunta, o Is vem antes.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Não tem ovos',
          instruction: 'Complete:',
          question: '___ any eggs.',
          options: [
            { text: "There isn't", correct: false },
            { text: "There aren't", correct: true },
          ],
          feedback: { success: { title: "Aren't!", text: 'Eggs = Plural.' } }
        }
      ]
    },
    {
      id: '6_gold',
      title: 'O Guia Turístico',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Concordância',
          instruction: 'Ache o erro',
          sentence: 'There is many cars.',
          errorWord: 'is',
          correction: 'are',
          feedback: { success: { title: 'Atenção!', text: 'Cars = Plural = Are.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Pergunta Plural',
          instruction: 'Complete',
          sentence: '___ there good restaurants here?',
          correct: 'Are',
          options: ['Is', 'Are', 'Have'],
          feedback: { success: { title: 'Are there...?', text: 'Restaurantes = Plural.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase complexa',
          instruction: 'Monte',
          words: ['There', 'is', 'a', 'bank', 'near', 'the', 'park.'],
          correct: 'There is a bank near the park.',
          feedback: { success: { title: 'Fluente!', text: 'Descrição perfeita de lugar.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Vício persistente',
          instruction: 'Ache o erro',
          sentence: 'In my city have a park.',
          errorWord: 'have',
          correction: 'there is',
          feedback: { success: { title: 'Lembre-se!', text: 'In my city THERE IS a park.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Contexto',
          instruction: 'Analise',
          statement: 'There are a book on the table.',
          correct: false,
          feedback: { success: { title: 'Falso!', text: 'Um livro (a book) pede THERE IS.' } }
        }
      ]
    }
  ]
};