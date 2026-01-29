/**
 * Node 3: O Código (Parte 1)
 * Tema: Vogais
 */
export const node3Data = {
  id: 3,
  title: 'O Código (Parte 1)',
  theme: 'Vogais',
  lore: 'Para entrar na cidade, você precisa soletrar seu nome. Mas cuidado: as letras aqui soam diferente.',
  tip: 'O "E" tem som de "i". O "I" tem som de "ai". O "A" tem som de "ei". Decore isso!',
  
  levels: [
    {
      id: '0_3_bronze',
      title: 'As Vogais',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Sons das vogais',
          instruction: 'Conecte a letra ao som',
          pairs: [
            { portuguese: 'Som "Ei"', english: 'A' },
            { portuguese: 'Som "I"', english: 'E' },
            { portuguese: 'Som "Ai"', english: 'I' },
            { portuguese: 'Som "Ou"', english: 'O' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Os sons são completamente diferentes do português!' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a afirmação',
          statement: 'A letra "E" em inglês tem som de "É".',
          correct: false,
          feedback: { success: { title: 'Correto!', text: 'O "E" tem som de "I" (como em "i-mail").' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Qual letra?',
          instruction: 'Qual letra tem som de "Ou"?',
          question: 'Em inglês, qual letra soa como "Ou"?',
          options: [
            { text: 'A', correct: false },
            { text: 'O', correct: true },
            { text: 'U', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'O = "Ou". Simples assim.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Som do U',
          instruction: 'Qual é o som da letra U?',
          question: 'A letra U em inglês soa como:',
          options: [
            { text: 'U (como em "uva")', correct: false },
            { text: 'Iu (como em "you")', correct: true },
            { text: 'Au', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'U = "Iu". Por isso "USB" é "Iu-Éss-Bi".' } }
        },
        {
          type: 'vocab_match',
          label: 'Fechamento',
          title: 'Revisão',
          instruction: 'Conecte a letra ao seu som',
          pairs: [
            { portuguese: 'Som "Ei"', english: 'A' },
            { portuguese: 'Som "I"', english: 'E' },
            { portuguese: 'Som "Ai"', english: 'I' },
            { portuguese: 'Som "Iu"', english: 'U' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Vogais dominadas!' } }
        }
      ]
    },
    {
      id: '0_3_silver',
      title: 'Consoantes Fáceis',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Sons das consoantes',
          instruction: 'Conecte letra ao som',
          pairs: [
            { portuguese: 'B', english: 'Bi' },
            { portuguese: 'C', english: 'Ci' },
            { portuguese: 'D', english: 'Di' },
            { portuguese: 'F', english: 'Éf' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Essas são parecidas com português!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Sequência',
          instruction: 'Qual letra vem depois?',
          sentence: 'A, B, C, __',
          correct: 'D',
          options: ['D', 'E', 'F'],
          feedback: { success: { title: 'Isso!', text: 'A, B, C, D...' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Som do F',
          instruction: 'Analise a afirmação',
          statement: 'O som de "F" em inglês é "Éf".',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'F = "Éf", igual em português.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Letra G',
          instruction: 'Qual é o som da letra G?',
          question: 'A letra G soa como:',
          options: [
            { text: 'Dgi (como em "gim")', correct: true },
            { text: 'Gue (como em "guerra")', correct: false },
            { text: 'Je', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'G = "Dgi". Por isso "GIF" tem polêmica!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Revisão',
          instruction: 'Como se pronuncia a letra "E"?',
          question: 'A letra E soa como:',
          options: [
            { text: 'I (como em "isso")', correct: true },
            { text: 'É (como em "café")', correct: false },
            { text: 'Ei', correct: false },
          ],
          feedback: { success: { title: 'Excelente!', text: 'E = "I". Lembre: e-mail = "i-meil".' } }
        }
      ]
    },
    {
      id: '0_3_gold',
      title: 'Soletrando Nomes',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Apresentação',
          instruction: '"Meu nome é Bob."',
          words: ['My', 'name', 'is', 'Bob.'],
          correct: 'My name is Bob.',
          feedback: { success: { title: 'Perfeito!', text: '"Meu nome é..." - Essencial!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Soletrar BOB',
          instruction: 'Soletre o nome "Bob"',
          words: ['B', 'O', 'B'],
          correct: 'B O B',
          feedback: { success: { title: 'Isso!', text: 'B-O-B. Bi-Ou-Bi.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Soletrar ANA',
          instruction: 'Soletre o nome "Ana"',
          words: ['A', 'N', 'A'],
          correct: 'A N A',
          feedback: { success: { title: 'Ótimo!', text: 'A-N-A. Ei-Én-Ei.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de verbo',
          instruction: 'Encontre o erro',
          sentence: 'My name are Alex.',
          errorWord: 'are',
          correction: 'is',
          feedback: { success: { title: 'Excelente!', text: '"My name" usa "is", não "are".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Soletrar DIA',
          instruction: 'Como soletra "DIA" em inglês?',
          question: 'Soletrar: D-I-A',
          options: [
            { text: 'Di - Ai - Ei', correct: true },
            { text: 'Di - I - Ah', correct: false },
            { text: 'Dê - I - A', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'D=Di, I=Ai, A=Ei. Você dominou!' } }
        }
      ]
    }
  ]
};