/**
 * Node 4: O Mercado
 * Tema: Present Simple (He/She)
 */
export const node4Data = {
  id: 4,
  title: 'O Mercado',
  theme: 'Present Simple (He/She)',
  lore: 'No mercado, todos falam dos outros. Quando falamos de Ele/Ela, o verbo ganha um S.',
  tip: 'A 3ª pessoa é VIP. Ela exige um S no verbo: "I work", mas "She works".',
  
  levels: [
    {
      id: '1_4_bronze',
      title: 'Os Detetives',
      color: '#cd7f32',
      activities: [
        {
          type: 'category_sort',
          label: 'Aquecimento',
          title: 'Quem precisa do S?',
          instruction: 'Classifique',
          categories: [
            { id: 'comS', name: 'Com S' },
            { id: 'semS', name: 'Sem S' }
          ],
          items: [
            { id: 1, text: 'She', category: 'comS' },
            { id: 2, text: 'I', category: 'semS' },
            { id: 3, text: 'The doctor', category: 'comS' },
            { id: 4, text: 'We', category: 'semS' }
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Você sabe quem precisa do S!' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'A fofoca',
          instruction: 'Complete',
          sentence: 'She ___ very fast.',
          correct: 'speaks',
          options: ['speak', 'speaks'],
          feedback: { success: { title: 'Isso!', text: 'She speaks.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Certo ou errado?',
          instruction: 'Analise',
          statement: 'He works here.',
          correct: true,
          feedback: { success: { title: 'Certo!', text: 'He + Works.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Verbos com S',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Ela trabalha', english: 'She works' },
            { portuguese: 'Ele vai', english: 'He goes' },
            { portuguese: 'Ela tem', english: 'She has' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Atenção: Go vira Goes, Have vira Has!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Ela mora aqui',
          instruction: 'Escolha:',
          question: 'Ela mora aqui.',
          options: [
            { text: 'She live here.', correct: false },
            { text: 'She lives here.', correct: true },
          ],
          feedback: { success: { title: 'Lives!', text: 'Faltou o S na primeira.' } }
        }
      ]
    },
    {
      id: '1_4_silver',
      title: 'A Rotina Dela',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Ele vai à academia',
          instruction: '"Ele vai à academia."',
          words: ['He', 'goes', 'to', 'the', 'gym.'],
          correct: 'He goes to the gym.',
          feedback: { success: { title: 'Boa!', text: 'GO vira GOES para ele.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Negativa',
          instruction: 'Complete',
          sentence: 'She ___ not cook.',
          correct: 'does',
          options: ['do', 'does', 'is'],
          feedback: { success: { title: 'Does not!', text: 'She usa DOES para negar.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Minha esposa trabalha',
          instruction: '"Minha esposa trabalha em casa."',
          words: ['My', 'wife', 'works', 'at', 'home.'],
          correct: 'My wife works at home.',
          feedback: { success: { title: 'Perfeito!', text: 'My wife = Ela = Works.' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Erro de concordância',
          instruction: 'Ache o erro',
          sentence: 'She don\'t know.',
          errorWord: 'don\'t',
          correction: 'doesn\'t',
          feedback: { success: { title: 'Doesn\'t!', text: '"She" usa "doesn\'t".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Pergunta',
          instruction: 'Complete:',
          question: '___ she speak English?',
          options: [
            { text: 'Do', correct: false },
            { text: 'Does', correct: true },
            { text: 'Is', correct: false },
          ],
          feedback: { success: { title: 'Does she?', text: 'Para perguntar sobre ELA, use DOES.' } }
        }
      ]
    },
    {
      id: '1_4_gold',
      title: 'A Fofoca Completa',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Corrija o pai',
          instruction: 'Ache o erro',
          sentence: 'My father work here.',
          errorWord: 'work',
          correction: 'works',
          feedback: { success: { title: 'Reparado!', text: 'My father works. O S é vital.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Onde ele trabalha?',
          instruction: 'Complete',
          sentence: 'Where ___ he work?',
          correct: 'does',
          options: ['do', 'does', 'is'],
          feedback: { success: { title: 'Where does he...?', text: 'Pergunta WH com Does.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase complexa',
          instruction: '"Ele mora no Brasil mas trabalha nos EUA."',
          words: ['He', 'lives', 'in', 'Brazil', 'but', 'works', 'in', 'USA.'],
          correct: 'He lives in Brazil but works in USA.',
          feedback: { success: { title: 'Mestre!', text: 'Dois verbos com S.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Excesso de S',
          instruction: 'Ache o erro',
          sentence: 'She doesn\'t works.',
          errorWord: 'works',
          correction: 'work',
          feedback: { success: { title: 'Regra de Ouro!', text: 'Doesn\'t já tem o S. Verbo volta ao normal.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Gramática',
          instruction: 'Analise',
          statement: 'My sister speak English.',
          correct: false,
          feedback: { success: { title: 'Falso!', text: 'My sister = She. Precisa do S: "My sister speaks English".' } }
        }
      ]
    }
  ]
};