/**
 * Node 5: A Torre do Relógio
 * Tema: Advérbios de Frequência
 */
export const node5Data = {
  id: 5,
  title: 'A Torre do Relógio',
  theme: 'Advérbios de Frequência',
  lore: 'A torre marca o tempo. Mas com que frequência você faz as coisas?',
  tip: 'Advérbios como "always" e "never" vão ANTES do verbo principal, mas DEPOIS do "to be".',
  
  levels: [
    {
      id: '1_5_bronze',
      title: 'A Escala',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Frequência',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Sempre', english: 'Always' },
            { portuguese: 'Nunca', english: 'Never' },
            { portuguese: 'Às vezes', english: 'Sometimes' },
            { portuguese: 'Geralmente', english: 'Usually' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'A escala de frequência!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Introdução',
          title: 'Do mais para o menos',
          instruction: 'Qual é a ordem correta de frequência? (100% → 0%)',
          question: 'Ordene: Always, Sometimes, Usually, Never',
          options: [
            { text: 'Always → Usually → Sometimes → Never', correct: true },
            { text: 'Always → Sometimes → Usually → Never', correct: false },
            { text: 'Usually → Always → Sometimes → Never', correct: false },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Always (100%) → Usually → Sometimes → Never (0%).' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Posição do advérbio',
          instruction: 'Complete',
          sentence: 'I ___ wake up at 7 am.',
          correct: 'always',
          options: ['always', 'at always', 'always am'],
          feedback: { success: { title: 'Isso!', text: 'O advérbio vem ANTES do verbo.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Certo ou errado?',
          instruction: 'Analise',
          statement: 'I never drink coffee.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Never antes do verbo.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Eu sempre estudo',
          instruction: 'Escolha:',
          question: 'Eu sempre estudo inglês.',
          options: [
            { text: 'I study always English.', correct: false },
            { text: 'I always study English.', correct: true },
            { text: 'Always I study English.', correct: false },
          ],
          feedback: { success: { title: 'I always study!', text: 'Advérbio entre sujeito e verbo.' } }
        }
      ]
    },
    {
      id: '1_5_silver',
      title: 'Com To Be',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Ele sempre está atrasado',
          instruction: '"Ele está sempre atrasado."',
          words: ['He', 'is', 'always', 'late.'],
          correct: 'He is always late.',
          feedback: { success: { title: 'Boa!', text: 'Com TO BE, o advérbio vem DEPOIS.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Ela nunca está em casa',
          instruction: 'Complete',
          sentence: 'She is ___ at home.',
          correct: 'never',
          options: ['never', 'always never', 'not never'],
          feedback: { success: { title: 'She is never!', text: 'Advérbio após o verbo to be.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Ordem correta',
          instruction: '"Eu estou sempre feliz."',
          words: ['I', 'am', 'always', 'happy.'],
          correct: 'I am always happy.',
          feedback: { success: { title: 'Perfeito!', text: 'Com TO BE, advérbio vem DEPOIS.' } }
        },
        {
          type: 'category_sort',
          label: 'Prática',
          title: 'Antes ou depois do verbo?',
          instruction: 'Classifique',
          categories: [
            { id: 'antes', name: 'Antes do verbo' },
            { id: 'depois', name: 'Depois do TO BE' }
          ],
          items: [
            { id: 1, text: 'I always work', category: 'antes' },
            { id: 2, text: 'She is always happy', category: 'depois' },
            { id: 3, text: 'They never eat meat', category: 'antes' },
            { id: 4, text: 'He is never late', category: 'depois' }
          ],
          feedback: { success: { title: 'Excelente!', text: 'Regra dominada!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Gramática',
          instruction: 'Qual está correta?',
          question: 'Escolha:',
          options: [
            { text: 'He always is tired.', correct: false },
            { text: 'He is always tired.', correct: true },
          ],
          feedback: { success: { title: 'He IS always!', text: 'Advérbio depois do TO BE.' } }
        }
      ]
    },
    {
      id: '1_5_gold',
      title: 'Frequência Total',
      color: '#ffd700',
      activities: [
        {
          type: 'vocab_match',
          label: 'Desafio',
          title: 'Mais advérbios',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Frequentemente', english: 'Often' },
            { portuguese: 'Raramente', english: 'Rarely' },
            { portuguese: 'Quase nunca', english: 'Hardly ever' },
          ],
          feedback: { success: { title: 'Vocabulário expandido!', text: '' } }
        },
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Frase complexa',
          instruction: '"Eu geralmente vou à academia mas às vezes fico em casa."',
          words: ['I', 'usually', 'go', 'to', 'the', 'gym', 'but', 'sometimes', 'I', 'stay', 'home.'],
          correct: 'I usually go to the gym but sometimes I stay home.',
          feedback: { success: { title: 'Mestre!', text: 'Dois advérbios na mesma frase.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro sutil',
          instruction: 'Ache o erro',
          sentence: 'She are always happy.',
          errorWord: 'are',
          correction: 'is',
          feedback: { success: { title: 'She IS!', text: 'She sempre usa IS, não ARE.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Pergunta',
          instruction: 'Complete',
          sentence: 'Do you ___ eat breakfast?',
          correct: 'usually',
          options: ['usually', 'usual', 'usually are'],
          feedback: { success: { title: 'Do you usually...?', text: 'Advérbio antes do verbo principal.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Gramática avançada',
          instruction: 'Analise',
          statement: 'I am usually tired after work.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'AM + advérbio + adjetivo.' } }
        }
      ]
    }
  ]
};