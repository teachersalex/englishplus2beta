/**
 * Node 1: O Primeiro Contato
 * Tema: Greetings
 */
export const node1Data = {
  id: 1,
  title: 'O Primeiro Contato',
  theme: 'Greetings',
  lore: 'Você acaba de desembarcar em uma terra estranha. Alguém acena para você ao longe.',
  tip: '"Hi" é curto e informal (pra amigos). "Hello" serve pra qualquer um.',
  
  levels: [
    {
      id: '0_1_bronze',
      title: 'O Básico',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Primeiras palavras',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Oi', english: 'Hi' },
            { portuguese: 'Olá', english: 'Hello' },
            { portuguese: 'Tchau', english: 'Bye' },
            { portuguese: 'Adeus', english: 'Goodbye' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'As primeiras palavras já são suas.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Formal ou Informal?',
          instruction: 'Qual saudação é informal?',
          question: 'Você encontra um amigo na rua. O que você diz?',
          options: [
            { text: 'Hello', correct: false },
            { text: 'Hi', correct: true },
            { text: 'Goodbye', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: '"Hi" é curto e casual, perfeito pra amigos.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a afirmação',
          statement: '"Hello" significa "Tchau".',
          correct: false,
          feedback: { success: { title: 'Correto!', text: '"Hello" é chegada, não saída.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: '___, my friend!',
          correct: 'Hello',
          options: ['Hello', 'Goodbye', 'Sorry'],
          feedback: { success: { title: 'Perfeito!', text: 'Hello = Olá. Sua primeira palavra!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Monte a saudação',
          instruction: '"Oi!"',
          words: ['Hi', 'there!'],
          correct: 'Hi there!',
          feedback: { success: { title: 'Ótimo!', text: 'Uma saudação amigável!' } }
        }
      ]
    },
    {
      id: '0_1_silver',
      title: 'O Dia',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Partes do dia',
          instruction: 'Conecte os cumprimentos',
          pairs: [
            { portuguese: 'Bom dia', english: 'Good morning' },
            { portuguese: 'Boa tarde', english: 'Good afternoon' },
            { portuguese: 'Boa noite (chegada)', english: 'Good evening' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Agora você sabe cumprimentar a qualquer hora.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'Good ___. (manhã)',
          correct: 'morning',
          options: ['morning', 'evening', 'afternoon'],
          feedback: { success: { title: 'Isso!', text: 'Good morning = Bom dia.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a situação',
          statement: 'Você diz "Good morning" à noite.',
          correct: false,
          feedback: { success: { title: 'Correto!', text: 'Morning = manhã. À noite seria "Good evening".' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Monte a frase',
          instruction: '"Bom dia, professor."',
          words: ['Good', 'morning,', 'teacher.'],
          correct: 'Good morning, teacher.',
          feedback: { success: { title: 'Perfeito!', text: 'Cumprimento formal para o professor.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Contexto',
          instruction: 'O sol está nascendo. O que você diz?',
          question: 'São 7 da manhã. O que você fala?',
          options: [
            { text: 'Good morning', correct: true },
            { text: 'Good night', correct: false },
            { text: 'Good evening', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'Sol nascendo = Good morning.' } }
        }
      ]
    },
    {
      id: '0_1_gold',
      title: 'A Pergunta',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'A pergunta clássica',
          instruction: '"Como vai você?"',
          words: ['How', 'are', 'you?'],
          correct: 'How are you?',
          feedback: { success: { title: 'Excelente!', text: '"Como vai você?" - A pergunta mais usada.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Respostas',
          instruction: 'Conecte as respostas',
          pairs: [
            { portuguese: 'Estou bem', english: 'I am fine' },
            { portuguese: 'Muito bem', english: 'Very well' },
            { portuguese: 'E você?', english: 'And you?' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Agora você sabe responder também!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete a pergunta',
          instruction: 'Preencha a lacuna',
          sentence: 'How ___ you?',
          correct: 'are',
          options: ['is', 'am', 'are'],
          feedback: { success: { title: 'Perfeito!', text: '"You" sempre usa "are".' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Encontre o erro',
          instruction: 'Qual palavra está errada?',
          sentence: 'How is you?',
          errorWord: 'is',
          correction: 'are',
          feedback: { success: { title: 'Excelente!', text: '"You" pede "are", não "is".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Diálogo',
          instruction: 'Pessoa A diz "Hello!" - O que B responde?',
          question: 'A: "Hello!" → B: ?',
          options: [
            { text: 'Goodbye!', correct: false },
            { text: 'Hi!', correct: true },
            { text: 'Sorry!', correct: false },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Saudação responde saudação.' } }
        }
      ]
    }
  ]
};