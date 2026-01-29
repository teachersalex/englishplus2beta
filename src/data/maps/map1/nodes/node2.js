/**
 * Node 2: O Vizinho
 * Tema: Verb To Be - He/She/It
 */
export const node2Data = {
  id: 2,
  title: 'O Vizinho',
  theme: 'Verb To Be - He/She/It',
  lore: 'Você sai de casa e encontra alguém na estrada. É hora de falar sobre outras pessoas.',
  tip: 'He, She e It são os "primos". Todos usam o mesmo verbo: IS.',
  
  levels: [
    {
      id: '1_2_bronze',
      title: 'A Família',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Vocabulário de família',
          instruction: 'Conecte os familiares',
          pairs: [
            { portuguese: 'Mãe', english: 'Mother' },
            { portuguese: 'Pai', english: 'Father' },
            { portuguese: 'Irmão', english: 'Brother' },
            { portuguese: 'Irmã', english: 'Sister' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Família em inglês!' } }
        },
        {
          type: 'category_sort',
          label: 'Introdução',
          title: 'He ou She?',
          instruction: 'Classifique corretamente',
          categories: [
            { id: 'he', name: 'He' },
            { id: 'she', name: 'She' }
          ],
          items: [
            { id: 1, text: 'Father', category: 'he' },
            { id: 2, text: 'Sister', category: 'she' },
            { id: 3, text: 'Husband', category: 'he' },
            { id: 4, text: 'Wife', category: 'she' }
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Gênero dominado!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Escolha o verbo correto',
          sentence: 'This ___ my mother.',
          correct: 'is',
          options: ['is', 'are'],
          feedback: { success: { title: 'Isso!', text: 'Mother é singular. Use IS.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Certo ou Errado?',
          instruction: 'Analise a frase',
          statement: 'This is my friend.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'This is...' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Quem é ele?',
          instruction: 'Apontando para o pai:',
          question: 'Escolha a correta:',
          options: [
            { text: 'She is my father.', correct: false },
            { text: 'He is my father.', correct: true },
          ],
          feedback: { success: { title: 'He!', text: 'Pai é homem, use He.' } }
        }
      ]
    },
    {
      id: '1_2_silver',
      title: 'Apresentações',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Apresente sua mãe',
          instruction: '"Esta é minha mãe."',
          words: ['This', 'is', 'my', 'mother.'],
          correct: 'This is my mother.',
          feedback: { success: { title: 'Formal e correto!', text: '' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Plural (Eles)',
          instruction: 'Complete com o verbo correto',
          sentence: 'They ___ my parents.',
          correct: 'are',
          options: ['is', 'am', 'are'],
          feedback: { success: { title: 'They Are!', text: 'Plural sempre pede Are.' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Onde está o erro?',
          instruction: 'Encontre a palavra errada',
          sentence: 'He are my brother.',
          errorWord: 'are',
          correction: 'is',
          feedback: { success: { title: 'He Is!', text: 'He nunca combina com Are.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Profissão dela',
          instruction: '"Minha mãe é dentista."',
          words: ['My', 'mother', 'is', 'a', 'dentist.'],
          correct: 'My mother is a dentist.',
          feedback: { success: { title: 'Boa estrutura!', text: 'Sujeito + Verbo + Artigo + Profissão.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Ela é legal?',
          instruction: 'Descrevendo a irmã:',
          question: 'Escolha a correta:',
          options: [
            { text: 'She is cool.', correct: true },
            { text: 'She are cool.', correct: false },
            { text: 'She am cool.', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'She is + Adjetivo.' } }
        }
      ]
    },
    {
      id: '1_2_gold',
      title: 'O Grupo',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de brasileiro',
          instruction: 'Encontre a palavra errada',
          sentence: 'This is she car.',
          errorWord: 'she',
          correction: 'her',
          feedback: { success: { title: 'Isso!', text: '"She" é "Ela". "Dela" é "HER".' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Pergunta',
          instruction: 'Complete a pergunta',
          sentence: '___ they from Brazil?',
          correct: 'Are',
          options: ['Is', 'Am', 'Are'],
          feedback: { success: { title: 'Are they...?', text: 'Pergunta no plural.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase longa',
          instruction: '"Meu pai é alto e bonito."',
          words: ['My', 'father', 'is', 'tall', 'and', 'handsome.'],
          correct: 'My father is tall and handsome.',
          feedback: { success: { title: 'Uau!', text: 'Dois adjetivos na mesma frase.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Ache o intruso',
          instruction: 'Encontre a palavra errada',
          sentence: 'My parents is at home.',
          errorWord: 'is',
          correction: 'are',
          feedback: { success: { title: 'Parents = Eles!', text: 'Parents são "Pais". Use Are.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Desafio de Lógica',
          instruction: 'Analise a frase',
          statement: 'My brother is my father\'s son.',
          correct: true,
          feedback: { success: { title: 'Verdadeiro!', text: 'O irmão é o filho do pai.' } }
        }
      ]
    }
  ]
};