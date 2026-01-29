/**
 * Node 7: A Comunidade
 * Tema: Possessivos Plurais (Our / Their)
 */
export const node7Data = {
  id: 7,
  title: 'A Comunidade',
  theme: 'Our & Their',
  lore: 'A casa não é só minha. É nossa. E aquela casa lá longe? É deles.',
  tip: 'OUR = Nosso (We). THEIR = Deles (They). A pronúncia de "Their" é quase igual a "There" (Déer).',
  
  levels: [
    {
      id: '2_7_bronze',
      title: 'Nós e Eles',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Os possessivos plurais',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Nosso/Nossa', english: 'Our' },
            { portuguese: 'Deles/Delas', english: 'Their' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'OUR e THEIR. Possessivos de grupo!' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Os pronomes',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Nós', english: 'We' },
            { portuguese: 'Eles/Elas', english: 'They' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'We → Our. They → Their.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Conceito',
          instruction: 'Analise a afirmação',
          statement: '"Our" é o singular de "Your".',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'OUR vem de WE (nós). YOUR vem de YOU (você).' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Nossa casa',
          instruction: 'Esta é a NOSSA casa.',
          sentence: 'This is ___ house.',
          correct: 'our',
          options: ['our', 'their', 'we'],
          feedback: { success: { title: 'OUR!', text: 'Nossa casa.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'O carro deles',
          instruction: 'Como dizer "O carro deles"?',
          question: 'Traduza: "O carro deles"',
          options: [
            { text: 'They car', correct: false },
            { text: 'Their car', correct: true },
            { text: 'Our car', correct: false },
          ],
          feedback: { success: { title: 'THEIR!', text: 'Their car = O carro deles.' } }
        }
      ]
    },
    {
      id: '2_7_silver',
      title: 'A Posse Coletiva',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Nossa família',
          instruction: '"Nossa família é grande."',
          words: ['Our', 'family', 'is', 'big.'],
          correct: 'Our family is big.',
          feedback: { success: { title: 'Perfeito!', text: 'Nossa família é grande.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'A casa deles',
          instruction: '"A casa deles é pequena."',
          words: ['Their', 'house', 'is', 'small.'],
          correct: 'Their house is small.',
          feedback: { success: { title: 'Ótimo!', text: 'A casa deles é pequena.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Nosso cachorro',
          instruction: 'Nós amamos o NOSSO cachorro.',
          sentence: 'We love ___ dog.',
          correct: 'our',
          options: ['our', 'their', 'we'],
          feedback: { success: { title: 'OUR!', text: 'We → Our.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'O carro deles',
          instruction: 'Eles lavam o carro DELES.',
          sentence: 'They wash ___ car.',
          correct: 'their',
          options: ['their', 'our', 'they'],
          feedback: { success: { title: 'THEIR!', text: 'They → Their.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'O bebê',
          instruction: 'Você vê um casal com um bebê e fala sobre o bebê DELES.',
          question: 'It is ___ baby.',
          options: [
            { text: 'their', correct: true },
            { text: 'our', correct: false },
            { text: 'they', correct: false },
          ],
          feedback: { success: { title: 'THEIR!', text: 'Falando sobre eles = THEIR.' } }
        }
      ]
    },
    {
      id: '2_7_gold',
      title: 'O Erro Comum',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'They vs Their',
          instruction: 'Encontre a palavra errada',
          sentence: 'They names are Bob and Ana.',
          errorWord: 'They',
          correction: 'Their',
          feedback: { success: { title: 'THEIR!', text: '"They" é pronome. Posse precisa de THEIR.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'We vs Our',
          instruction: 'Encontre a palavra errada',
          sentence: 'We house is here.',
          errorWord: 'We',
          correction: 'Our',
          feedback: { success: { title: 'OUR!', text: '"We" é pronome. Posse precisa de OUR.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Combo de possessivos',
          instruction: '"Nossos amigos estão na casa deles."',
          words: ['Our', 'friends', 'are', 'in', 'their', 'house.'],
          correct: 'Our friends are in their house.',
          feedback: { success: { title: 'EXCELENTE!', text: 'Nossos amigos estão na casa deles. Dois possessivos!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Nosso problema',
          instruction: '"Este é o nosso problema."',
          words: ['This', 'is', 'our', 'problem.'],
          correct: 'This is our problem.',
          feedback: { success: { title: 'Perfeito!', text: 'Este é o nosso problema.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: '"O gato deles."',
          words: ['Their', 'cat.'],
          correct: 'Their cat.',
          feedback: { success: { title: 'PERFEITO!', text: 'Você dominou OUR e THEIR!' } }
        }
      ]
    }
  ]
};