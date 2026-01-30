/**
 * Node 4: O Código (Parte 2)
 * Tema: Consoantes
 */
export const node4Data = {
  id: 4,
  title: 'O Código (Parte 2)',
  theme: 'Consoantes',
  lore: 'O guarda pede a segunda parte da senha. As letras mais traiçoeiras aguardam.',
  tip: 'O "H" não é mudo! Ele se chama "Eitch". O "R" parece caipira: "Ar".',
  
  levels: [
    {
      id: '0_4_bronze',
      title: 'As Estranhas',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Letras traiçoeiras',
          instruction: 'Conecte a letra ao som',
          pairs: [
            { portuguese: 'Som "Eitch"', english: 'H' },
            { portuguese: 'Som "Djei"', english: 'J' },
            { portuguese: 'Som "Kei"', english: 'K' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Essas pegam muitos brasileiros!' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'J e G',
          instruction: 'Analise a afirmação',
          statement: 'J e G têm o mesmo som em inglês.',
          correct: false,
          feedback: { success: { title: 'Correto!', text: 'J = "Djei", G = "Dgi". Diferentes!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Letra W',
          instruction: 'Qual é o som do W?',
          question: 'A letra W soa como:',
          options: [
            { text: 'Dábliu', correct: true },
            { text: 'Vivi', correct: false },
            { text: 'Duplo V', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'W = "Dábliu" (Double U).' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Letra Y',
          instruction: 'Qual é o som do Y?',
          question: 'A letra Y soa como:',
          options: [
            { text: 'Ípsilon', correct: false },
            { text: 'Uai', correct: true },
            { text: 'I grego', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Y = "Uai". Por que? Por que sim!' } }
        },
        {
          type: 'vocab_match',
          label: 'Fechamento',
          title: 'Revisão',
          instruction: 'Conecte mais letras',
          pairs: [
            { portuguese: 'R', english: 'Ar' },
            { portuguese: 'S', english: 'Éss' },
            { portuguese: 'X', english: 'Éks' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Essas seguem um padrão: consoante + som.' } }
        }
      ]
    },
    {
      id: '0_4_silver',
      title: 'O Final',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Fim do alfabeto',
          instruction: 'Conecte as últimas',
          pairs: [
            { portuguese: 'X', english: 'Éks' },
            { portuguese: 'Y', english: 'Uai' },
            { portuguese: 'Z', english: 'Zi' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Final do alfabeto dominado!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Classificar',
          instruction: 'A é vogal ou consoante?',
          question: 'A letra A é:',
          options: [
            { text: 'Vogal', correct: true },
            { text: 'Consoante', correct: false },
          ],
          feedback: { success: { title: 'Excelente!', text: 'A, E, I, O, U são vogais!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Sequência final',
          instruction: 'Qual letra vem depois de X, Y?',
          question: 'X, Y, ___',
          options: [
            { text: 'Z', correct: true },
            { text: 'W', correct: false },
            { text: 'A', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'Z é a última letra!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Som do Z',
          instruction: 'Qual é o som do Z?',
          question: 'A letra Z em inglês americano soa como:',
          options: [
            { text: 'Zi', correct: true },
            { text: 'Zé', correct: false },
            { text: 'Zed', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Z = "Zi" no americano. "Zed" é britânico.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Letra W',
          instruction: 'Analise a afirmação',
          statement: '"W" é usado em nomes brasileiros como "Wagner".',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Wagner, Wilson, Wellington...' } }
        }
      ]
    },
    {
      id: '0_4_gold',
      title: 'Soletrando Brasil',
      color: '#ffd700',
      activities: [
        {
          type: 'multiple_choice',
          label: 'Desafio',
          title: 'Soletrar BRAZIL',
          instruction: 'Como se soletra "Brazil" em inglês?',
          question: 'Soletrar: B-R-A-Z-I-L',
          options: [
            { text: 'Bi - Ar - Ei - Zi - Ai - Él', correct: true },
            { text: 'Bê - Erre - A - Zê - I - Ele', correct: false },
            { text: 'Be - Re - A - Ze - I - Le', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Bi-Ar-Ei-Zi-Ai-Él = BRAZIL' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'De onde você é',
          instruction: '"Eu sou do Brasil."',
          words: ['I', 'am', 'from', 'Brazil.'],
          correct: 'I am from Brazil.',
          feedback: { success: { title: 'Excelente!', text: '"Eu sou do Brasil" - sua carta de apresentação!' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro de ortografia',
          instruction: 'Encontre o erro',
          sentence: 'I am from Brasil.',
          errorWord: 'Brasil',
          correction: 'Brazil',
          feedback: { success: { title: 'Ótimo!', text: 'Em inglês é com Z: Brazil!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Soletrar ALEX',
          instruction: 'Como soletra ALEX?',
          question: 'Soletrar: A-L-E-X',
          options: [
            { text: 'Ei - Él - I - Éks', correct: true },
            { text: 'Ah - Le - É - Xis', correct: false },
            { text: 'A - L - E - X', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Agora você sabe soletrar nomes!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Soletrar USA',
          instruction: 'Como se soletra "USA" em inglês?',
          question: 'Soletrar: U-S-A',
          options: [
            { text: 'Iu - Éss - Ei', correct: true },
            { text: 'U - Esse - A', correct: false },
            { text: 'Ú - S - Á', correct: false },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Iu-Éss-Ei = USA!' } }
        }
      ]
    }
  ]
};