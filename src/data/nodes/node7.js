/**
 * NODE 7: O FAROL
 * 3 levels × 5 atividades = 15 atividades
 */
export const node7Data = {
  id: 7,
  title: 'O Farol',
  theme: 'Can (Habilidades)',
  lore: 'O farol ilumina o que é possível ver. O verbo CAN é um super-herói: ele dá poder a outros verbos, mas odeia a preposição "TO".',
  tip: 'O verbo CAN é alérgico ao TO. Nunca diga "I can TO go". Diga "I can go".',
  
  levels: [
    {
      id: '7_bronze',
      title: 'Os Poderes',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Habilidades',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Nadar', english: 'Swim' },
            { portuguese: 'Dirigir', english: 'Drive' },
            { portuguese: 'Cozinhar', english: 'Cook' },
            { portuguese: 'Falar', english: 'Speak' },
          ],
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Eu consigo',
          instruction: 'Complete',
          sentence: 'I can ___ very well.',
          correct: 'cook',
          options: ['to cook', 'cook', 'cooking'],
          feedback: { success: { title: 'Sem TO!', text: 'Can + verbo puro.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Alergia',
          instruction: 'Certo ou errado?',
          statement: 'I can to drive.',
          correct: false,
          feedback: { success: { title: 'Errado!', text: 'O "to" é proibido depois de Can.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Tradução',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Eu posso', english: 'I can' },
            { portuguese: 'Eu não posso', english: "I can't" },
            { portuguese: 'Você pode?', english: 'Can you?' },
          ],
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Ela sabe nadar',
          instruction: 'Escolha:',
          question: 'Ela sabe nadar.',
          options: [
            { text: 'She can swim.', correct: true },
            { text: 'She cans swim.', correct: false },
          ],
          feedback: { success: { title: 'Sem S!', text: 'Can nunca leva S, mesmo para She.' } }
        }
      ]
    },
    {
      id: '7_silver',
      title: 'Pedindo Ajuda',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Pergunta',
          instruction: 'Monte a frase',
          words: ['Can', 'you', 'help', 'me?'],
          correct: 'Can you help me?',
          feedback: { success: { title: 'Essencial!', text: 'Can no início para perguntar.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Negativa',
          instruction: 'Eu não consigo ouvir',
          sentence: 'I ___ hear you.',
          correct: "can't",
          options: ["no can", "can't", "don't can"],
          feedback: { success: { title: "Can't!", text: "O negativo de Can é Can't." } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Inglês de índio',
          instruction: 'Ache o erro',
          sentence: 'I no can go.',
          errorWord: 'no',
          correction: "can't",
          feedback: { success: { title: 'Corrigido!', text: "Nunca diga \"no can\". Use \"I can't\"." } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Habilidade dela',
          instruction: 'Monte',
          words: ['She', 'can', 'speak', 'English.'],
          correct: 'She can speak English.',
          feedback: { success: { title: 'Boa!', text: 'She can speak (sem S).' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Permissão',
          instruction: 'Posso entrar?',
          question: '___ I come in?',
          options: [
            { text: 'Can', correct: true },
            { text: 'Do', correct: false },
          ],
          feedback: { success: { title: 'Can I?', text: 'Usado para pedir permissão.' } }
        }
      ]
    },
    {
      id: '7_gold',
      title: 'O Super-Herói',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Excesso de S',
          instruction: 'Ache o erro',
          sentence: 'He cans drive.',
          errorWord: 'cans',
          correction: 'can',
          feedback: { success: { title: 'Sem S!', text: 'O Can é imutável. I can, He can.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Verbo seguinte',
          instruction: 'Complete',
          sentence: 'We can ___ soccer.',
          correct: 'play',
          options: ['play', 'to play', 'playing'],
          feedback: { success: { title: 'Play!', text: 'Verbo puro depois de Can.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase longa',
          instruction: 'Monte',
          words: ['I', 'can', 'read', 'but', 'I', "can't", 'write.'],
          correct: "I can read but I can't write.",
          feedback: { success: { title: 'Excelente!', text: 'Posso ler mas não posso escrever.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Alergia ao TO',
          instruction: 'Ache o erro',
          sentence: 'Can you to open the door?',
          errorWord: 'to',
          correction: '',
          feedback: { success: { title: 'Tire o TO!', text: 'Apenas "Can you open".' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Lógica',
          instruction: 'Analise',
          statement: 'A baby can drive a car.',
          correct: false,
          feedback: { success: { title: 'Falso!', text: 'Gramática ok, mas bebês não dirigem!' } }
        }
      ]
    }
  ]
};