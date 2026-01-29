/**
 * Node 9: O Crachá
 * Tema: Introduction
 */
export const node9Data = {
  id: 9,
  title: 'O Crachá',
  theme: 'Introduction',
  lore: 'Eles vão fazer o seu documento. Diga quem você é.',
  tip: 'Aqui não vamos analisar gramática. Apenas decore a frase inteira: "I am [Nome]".',
  
  levels: [
    {
      id: '0_9_bronze',
      title: 'O Nome',
      color: '#cd7f32',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Se apresentar',
          instruction: '"Eu sou Alex."',
          words: ['I', 'am', 'Alex.'],
          correct: 'I am Alex.',
          feedback: { success: { title: 'Muito bem!', text: '"Eu sou Alex" - Sua primeira apresentação!' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Tradução',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Eu sou', english: 'I am' },
            { portuguese: 'Meu nome é', english: 'My name is' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Duas formas de se apresentar!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Forma longa',
          instruction: '"Meu nome é Alex."',
          words: ['My', 'name', 'is', 'Alex.'],
          correct: 'My name is Alex.',
          feedback: { success: { title: 'Perfeito!', text: '"Meu nome é Alex" - Mais formal!' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Equivalência',
          instruction: 'Analise a afirmação',
          statement: '"My name is" e "I am" servem para se apresentar.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Ambas funcionam para dizer seu nome!' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'My ___ is Sarah.',
          correct: 'name',
          options: ['name', 'am', 'is'],
          feedback: { success: { title: 'Excelente!', text: 'My NAME is Sarah.' } }
        }
      ]
    },
    {
      id: '0_9_silver',
      title: 'A Origem',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'País',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Brasil', english: 'Brazil' },
            { portuguese: 'Brasileiro', english: 'Brazilian' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Lembre: em inglês é com Z!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'De onde você é',
          instruction: '"Eu sou do Brasil."',
          words: ['I', 'am', 'from', 'Brazil.'],
          correct: 'I am from Brazil.',
          feedback: { success: { title: 'Perfeito!', text: '"Eu sou do Brasil"!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'I ___ from Brazil.',
          correct: 'am',
          options: ['am', 'is', 'are'],
          feedback: { success: { title: 'Isso!', text: 'I AM from Brazil.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Nacionalidade',
          instruction: '"Eu sou brasileiro."',
          words: ['I', 'am', 'Brazilian.'],
          correct: 'I am Brazilian.',
          feedback: { success: { title: 'Ótimo!', text: '"Eu sou brasileiro"!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: 'Como dizer "Eu sou do Brasil"?',
          question: 'Traduza: "Eu sou do Brasil"',
          options: [
            { text: 'I am from Brazil', correct: true },
            { text: 'I from Brazil', correct: false },
            { text: 'I am Brazil', correct: false },
          ],
          feedback: { success: { title: 'Excelente!', text: 'I am FROM Brazil. O "from" é essencial!' } }
        }
      ]
    },
    {
      id: '0_9_gold',
      title: 'O Professor e o Aluno',
      color: '#ffd700',
      activities: [
        {
          type: 'vocab_match',
          label: 'Desafio',
          title: 'Profissões',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Professor', english: 'Teacher' },
            { portuguese: 'Estudante', english: 'Student' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Quem ensina e quem aprende!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Se identificar',
          instruction: '"Eu sou um estudante."',
          words: ['I', 'am', 'a', 'student.'],
          correct: 'I am a student.',
          feedback: { success: { title: 'Perfeito!', text: '"Eu sou um estudante"!' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Encontre o erro',
          instruction: 'Qual palavra está errada?',
          sentence: 'I are a teacher.',
          errorWord: 'are',
          correction: 'am',
          feedback: { success: { title: 'Excelente!', text: '"I" sempre usa "am", não "are".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Quem é quem',
          instruction: 'Quem ensina?',
          question: 'Quem ensina?',
          options: [
            { text: 'Teacher', correct: true },
            { text: 'Student', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'Teacher ensina. Student aprende.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Frase completa',
          instruction: '"Eu sou um professor."',
          words: ['I', 'am', 'a', 'teacher.'],
          correct: 'I am a teacher.',
          feedback: { success: { title: 'Muito bem!', text: 'Você sabe se apresentar completamente!' } }
        }
      ]
    }
  ]
};