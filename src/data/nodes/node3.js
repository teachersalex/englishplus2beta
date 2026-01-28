/**
 * NODE 3: O GUARDIÃO
 * 3 levels × 5 atividades = 15 atividades
 */
export const node3Data = {
  id: 3,
  title: 'O Guardião',
  theme: 'Present Simple',
  lore: 'O Guardião bloqueia a ponte. Você precisa provar que tem uma rotina.',
  tip: 'Não diga "I am work". Diga "I work". Verbos de ação são independentes.',
  
  levels: [
    {
      id: '3_bronze',
      title: 'As Ações',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Suas ferramentas',
          instruction: 'Conecte os verbos',
          pairs: [
            { portuguese: 'Trabalhar', english: 'Work' },
            { portuguese: 'Morar', english: 'Live' },
            { portuguese: 'Estudar', english: 'Study' },
            { portuguese: 'Ir', english: 'Go' },
          ],
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'O interrogatório',
          instruction: 'Complete a frase',
          sentence: 'I ___ in an office.',
          correct: 'work',
          options: ['work', 'am work', 'works'],
          feedback: { success: { title: 'Direto ao ponto!', text: 'I work. Sem "am".' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Certo ou errado?',
          instruction: 'Analise a frase',
          statement: 'I live in Brazil.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Sem "am", sem invenção.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Rotina diária',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Acordar', english: 'Wake up' },
            { portuguese: 'Almoçar', english: 'Have lunch' },
            { portuguese: 'Dormir', english: 'Sleep' },
          ],
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Eu trabalho todo dia',
          instruction: 'Escolha a correta:',
          question: 'Eu trabalho todo dia.',
          options: [
            { text: 'I works every day.', correct: false },
            { text: 'I work every day.', correct: true },
            { text: 'I am work every day.', correct: false },
          ],
          feedback: { success: { title: 'I work!', text: '"Works" é só para ele/ela.' } }
        }
      ]
    },
    {
      id: '3_silver',
      title: 'O Dia a Dia',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Que horas você acorda?',
          instruction: 'Monte a frase',
          words: ['I', 'wake', 'up', 'at', '6 am.'],
          correct: 'I wake up at 6 am.',
          feedback: { success: { title: 'Excelente!', text: 'Preposição de horas é "AT".' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'A negativa',
          instruction: 'Complete',
          sentence: 'I ___ not work on Sundays.',
          correct: 'do',
          options: ['do', 'am', 'are'],
          feedback: { success: { title: 'I do not!', text: 'Verbos de ação usam DO NOT.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Indo trabalhar',
          instruction: 'Monte a frase',
          words: ['I', 'go', 'to', 'work', 'by', 'bus.'],
          correct: 'I go to work by bus.',
          feedback: { success: { title: 'Muito bom!', text: 'Meio de transporte: by bus.' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Encontre o intruso',
          instruction: 'Ache a palavra errada',
          sentence: 'I am work every day.',
          errorWord: 'am',
          correction: '',
          feedback: { success: { title: 'Isso!', text: 'Não diga "estou trabalho". Apenas "I work".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Preposição de tempo',
          instruction: 'Complete:',
          question: 'I work ___ the morning.',
          options: [
            { text: 'at', correct: false },
            { text: 'in', correct: true },
            { text: 'on', correct: false },
          ],
          feedback: { success: { title: 'In the morning!', text: 'Partes do dia usam IN.' } }
        }
      ]
    },
    {
      id: '3_gold',
      title: 'A Prova',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro fatal',
          instruction: 'Encontre a palavra errada',
          sentence: 'I am study English.',
          errorWord: 'am',
          correction: '',
          feedback: { success: { title: 'Corrigido!', text: 'Apenas "I study English".' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Pergunta direta',
          instruction: 'Complete a pergunta',
          sentence: '___ you work here?',
          correct: 'Do',
          options: ['Are', 'Do', 'Is'],
          feedback: { success: { title: 'Do you work?', text: 'Perguntas com verbos de ação usam DO.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase composta',
          instruction: 'Monte a frase',
          words: ['I', 'work', 'and', 'I', 'study', 'English.'],
          correct: 'I work and I study English.',
          feedback: { success: { title: 'Fluente!', text: 'Conectou duas ideias.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Conjugação errada',
          instruction: 'Ache o erro',
          sentence: 'I gos to the gym.',
          errorWord: 'gos',
          correction: 'go',
          feedback: { success: { title: 'Opa!', text: '"Gos" não existe. Para I: go.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Gramática',
          instruction: 'Analise a frase',
          statement: 'I works every day.',
          correct: false,
          feedback: { success: { title: 'Falso!', text: 'Com "I" o verbo não leva S. O correto é "I work".' } }
        }
      ]
    }
  ]
};