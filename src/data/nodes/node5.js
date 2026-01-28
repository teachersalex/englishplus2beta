/**
 * NODE 5: A TORRE DO RELÓGIO
 * 3 levels × 5 atividades = 15 atividades
 */
export const node5Data = {
  id: 5,
  title: 'A Torre do Relógio',
  theme: 'Advérbios de Frequência',
  lore: 'A Torre marca o ritmo. Aqui você aprende o que sempre faz, às vezes faz, nunca faz.',
  tip: 'Advérbio fica ANTES do verbo ("I always work"). Com TO BE, fica DEPOIS ("I am always happy").',
  
  levels: [
    {
      id: '5_bronze',
      title: 'A Escala',
      color: '#cd7f32',
      activities: [
        {
          type: 'ordering',
          label: 'Aquecimento',
          title: 'Do mais ao menos frequente',
          instruction: 'Ordene de 100% a 0%',
          items: [
            { id: 1, text: 'Always', order: 1 },
            { id: 2, text: 'Usually', order: 2 },
            { id: 3, text: 'Sometimes', order: 3 },
            { id: 4, text: 'Never', order: 4 },
          ],
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Onde colocar?',
          instruction: 'Complete',
          sentence: 'I ___ wake up early.',
          correct: 'always',
          options: ['always', 'wake always'],
          feedback: { success: { title: 'Isso!', text: 'Advérbio ANTES do verbo.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Posição com To Be',
          instruction: 'Analise',
          statement: 'I always am tired.',
          correct: false,
          feedback: { success: { title: 'Errado!', text: 'Com To Be é depois: I AM ALWAYS tired.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Tradução',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Sempre', english: 'Always' },
            { portuguese: 'Nunca', english: 'Never' },
            { portuguese: 'Às vezes', english: 'Sometimes' },
          ],
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Eu nunca como carne',
          instruction: 'Escolha:',
          question: 'Eu nunca como carne.',
          options: [
            { text: 'I eat never meat.', correct: false },
            { text: 'I never eat meat.', correct: true },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'I never eat.' } }
        }
      ]
    },
    {
      id: '5_silver',
      title: 'A Rotina Real',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Café da manhã',
          instruction: 'Monte',
          words: ['I', 'usually', 'have', 'coffee.'],
          correct: 'I usually have coffee.',
          feedback: { success: { title: 'Muito bem!', text: 'Sujeito + Advérbio + Verbo.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Ela está sempre atrasada',
          instruction: 'Complete',
          sentence: 'She ___ always late.',
          correct: 'is',
          options: ['is', 'are', 'does'],
          feedback: { success: { title: 'She IS always!', text: 'To Be vem antes do advérbio.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Ele nunca come salada',
          instruction: 'Monte',
          words: ['He', 'never', 'eats', 'salad.'],
          correct: 'He never eats salad.',
          feedback: { success: { title: 'Atenção!', text: 'Mesmo com Never, verbo tem S (He eats).' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Erro de posição',
          instruction: 'Ache a palavra fora do lugar',
          sentence: 'I go always to the park.',
          errorWord: 'always',
          correction: '',
          feedback: { success: { title: 'Isso!', text: 'O certo é: I ALWAYS go to the park.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Exceção do To Be',
          instruction: 'Complete:',
          question: 'We ___ happy.',
          options: [
            { text: 'are always', correct: true },
            { text: 'always are', correct: false },
          ],
          feedback: { success: { title: 'Are always!', text: 'To Be ganha a preferência.' } }
        }
      ]
    },
    {
      id: '5_gold',
      title: 'O Cronometrista',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Advérbio deslocado',
          instruction: 'Ache a palavra fora do lugar',
          sentence: 'She drinks always coffee.',
          errorWord: 'always',
          correction: '',
          feedback: { success: { title: 'Encontrou!', text: 'O certo é "She always drinks".' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Eu estou sempre cansado',
          instruction: 'Complete',
          sentence: 'I am ___ tired.',
          correct: 'always',
          options: ['always', 'never'],
          feedback: { success: { title: 'I am always!', text: 'Advérbio depois do To Be.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase longa',
          instruction: 'Monte',
          words: ['I', 'sometimes', 'watch', 'TV', 'in', 'the', 'morning.'],
          correct: 'I sometimes watch TV in the morning.',
          feedback: { success: { title: 'Fluente!', text: 'Posição perfeita.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Início de frase',
          instruction: 'Ache o problema',
          sentence: 'Always I go to the gym.',
          errorWord: 'Always',
          correction: '',
          feedback: { success: { title: 'Não comece assim!', text: 'Diga "I always go".' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Gramática',
          instruction: 'Analise',
          statement: 'She never are late.',
          correct: false,
          feedback: { success: { title: 'Falso!', text: 'O correto é "She is never late". Com To Be, advérbio vem depois.' } }
        }
      ]
    }
  ]
};