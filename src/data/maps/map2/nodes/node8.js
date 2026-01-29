/**
 * Node 8: O Dono das Coisas
 * Tema: Genitive Case ('s) e Whose
 */
export const node8Data = {
  id: 8,
  title: 'O Dono das Coisas',
  theme: "Genitive Case ('s) & Whose",
  lore: 'Achamos objetos perdidos. De quem são? Do Alex? Da Maria?',
  tip: 'O "Apóstrofo S" (\'s) indica posse. "Alex\'s car" = O carro do Alex. INVERTA a lógica do português!',
  
  levels: [
    {
      id: '2_8_bronze',
      title: 'O Apóstrofo',
      color: '#cd7f32',
      activities: [
        {
          type: 'true_false',
          label: 'Aquecimento',
          title: 'Conceito',
          instruction: 'Analise a afirmação',
          statement: '"Alex\'s book" significa "O livro do Alex".',
          correct: true,
          feedback: { success: { title: 'VERDADEIRO!', text: 'O apóstrofo S indica posse. Alex\'s = Do Alex.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Perguntando o dono',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'De quem?', english: 'Whose?' },
            { portuguese: 'Do João', english: "John's" },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Whose = De quem. John\'s = Do João.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'O telefone da Maria',
          instruction: '"O telefone da Maria."',
          words: ["Maria's", 'phone.'],
          correct: "Maria's phone.",
          feedback: { success: { title: 'Isso!', text: 'O telefone da Maria.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Forma comum',
          instruction: 'Analise a afirmação',
          statement: '"The car of John" é a forma mais comum.',
          correct: false,
          feedback: { success: { title: 'FALSO!', text: 'Nativos usam "John\'s car", não "the car of John".' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Soletrar',
          instruction: 'Ordene os elementos',
          words: ['B', 'o', 'b', "'", 's'],
          correct: "B o b ' s",
          feedback: { success: { title: 'Bob\'s!', text: 'Do Bob.' } }
        }
      ]
    },
    {
      id: '2_8_silver',
      title: 'Invertendo a Lógica',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Tradução inversa',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'O gato da Ana', english: "Ana's cat" },
            { portuguese: 'A casa do Pedro', english: "Pedro's house" },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Em inglês: DONO primeiro, COISA depois.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'A bolsa',
          instruction: 'Esta é a bolsa DO TOM.',
          sentence: 'This is ___ bag.',
          correct: "Tom's",
          options: ["Tom's", 'Tom', 'of Tom'],
          feedback: { success: { title: "TOM'S!", text: 'Tom\'s bag = A bolsa do Tom.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'De quem é?',
          instruction: 'Alguém pergunta: "Whose is this?"',
          question: 'A resposta correta é:',
          options: [
            { text: "It's Mary's", correct: true },
            { text: "It's Mary", correct: false },
            { text: 'It is of Mary', correct: false },
          ],
          feedback: { success: { title: "MARY'S!", text: 'É da Mary. O apóstrofo indica posse.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase complexa',
          instruction: '"É o carro da minha mãe."',
          words: ['It', 'is', 'my', "mother's", 'car.'],
          correct: "It is my mother's car.",
          feedback: { success: { title: 'Excelente!', text: 'É o carro da minha mãe.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Pergunta',
          instruction: '"De quem é esta bolsa?"',
          words: ['Whose', 'bag', 'is', 'this?'],
          correct: 'Whose bag is this?',
          feedback: { success: { title: 'Perfeito!', text: 'De quem é esta bolsa?' } }
        }
      ]
    },
    {
      id: '2_8_gold',
      title: 'A Família do Dono',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Nome do irmão',
          instruction: '"O nome do meu irmão é Leo."',
          words: ['My', "brother's", 'name', 'is', 'Leo.'],
          correct: "My brother's name is Leo.",
          feedback: { success: { title: 'Excelente!', text: 'O nome do meu irmão é Leo.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Ordem invertida',
          instruction: 'Encontre a palavra errada',
          sentence: "The house Alex's is big.",
          errorWord: 'house',
          correction: "Alex's",
          feedback: { success: { title: 'Pegou!', text: 'A ordem é DONO + COISA: "Alex\'s house", não "house Alex\'s".' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Who vs Whose',
          instruction: 'Encontre a palavra errada',
          sentence: 'Who book is this?',
          errorWord: 'Who',
          correction: 'Whose',
          feedback: { success: { title: 'WHOSE!', text: '"Who" = Quem. "Whose" = De quem (posse).' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Pergunta completa',
          instruction: '"De quem são estes sapatos?"',
          words: ['Whose', 'shoes', 'are', 'these?'],
          correct: 'Whose shoes are these?',
          feedback: { success: { title: 'Perfeito!', text: 'De quem são estes sapatos?' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Tradução',
          instruction: '"O cachorro do meu pai."',
          words: ['My', "father's", 'dog.'],
          correct: "My father's dog.",
          feedback: { success: { title: 'PERFEITO!', text: 'Você dominou o Genitive Case!' } }
        }
      ]
    }
  ]
};