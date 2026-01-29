/**
 * Node 3: A Geladeira Mágica
 * Tema: Preposições (IN e NEXT TO)
 */
export const node3Data = {
  id: 3,
  title: 'A Geladeira Mágica',
  theme: 'In & Next To',
  lore: 'Você vai para a cozinha. As coisas estão DENTRO da geladeira ou AO LADO dela. Onde está o lanche?',
  tip: 'IN é para quando algo está cercado (dentro de caixa, quarto, cidade). NEXT TO é o vizinho.',
  
  levels: [
    {
      id: '2_3_bronze',
      title: 'Dentro ou Fora?',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'As preposições',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Dentro', english: 'In' },
            { portuguese: 'Ao lado', english: 'Next to' },
            { portuguese: 'Cozinha', english: 'Kitchen' },
            { portuguese: 'Geladeira', english: 'Fridge' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'IN e NEXT TO. Mais duas preposições essenciais!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Onde está o leite?',
          instruction: 'O leite está dentro da geladeira.',
          question: 'The milk is ___ the fridge.',
          options: [
            { text: 'in', correct: true },
            { text: 'on', correct: false },
            { text: 'next to', correct: false },
          ],
          feedback: { success: { title: 'IN!', text: 'Dentro da geladeira.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Dormir na cozinha?',
          instruction: 'Analise a frase',
          statement: '"I sleep in the kitchen" é gramaticalmente correto.',
          correct: true,
          feedback: { success: { title: 'Verdadeiro!', text: 'Estranho, mas gramaticalmente correto. O foco é a preposição IN.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Na caixa',
          instruction: 'A maçã está dentro da caixa.',
          sentence: 'The apple is ___ the box.',
          correct: 'in',
          options: ['in', 'on', 'under'],
          feedback: { success: { title: 'IN!', text: 'Dentro = In.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Monte a frase',
          instruction: '"Na cozinha."',
          words: ['In', 'the', 'kitchen.'],
          correct: 'In the kitchen.',
          feedback: { success: { title: 'Ótimo!', text: 'Na cozinha.' } }
        }
      ]
    },
    {
      id: '2_3_silver',
      title: 'O Sanduíche',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Mais vocabulário',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Porta', english: 'Door' },
            { portuguese: 'Janela', english: 'Window' },
            { portuguese: 'Copo', english: 'Cup' },
            { portuguese: 'Caixa', english: 'Box' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Vocabulário de cozinha!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Ao lado',
          instruction: '"A cadeira está ao lado da mesa."',
          words: ['The', 'chair', 'is', 'next', 'to', 'the', 'table.'],
          correct: 'The chair is next to the table.',
          feedback: { success: { title: 'Perfeito!', text: 'A cadeira está ao lado da mesa.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro comum',
          instruction: 'Encontre a palavra errada',
          sentence: 'The cat is next at the door.',
          errorWord: 'at',
          correction: 'to',
          feedback: { success: { title: 'Pegou!', text: 'É "next TO", não "next at"!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Café no copo',
          instruction: 'O café está no copo.',
          sentence: 'Coffee is ___ the cup.',
          correct: 'in',
          options: ['in', 'on', 'next to'],
          feedback: { success: { title: 'IN!', text: 'O líquido está DENTRO do copo.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'A geladeira',
          instruction: '"A geladeira está ao lado da porta."',
          words: ['The', 'fridge', 'is', 'next', 'to', 'the', 'door.'],
          correct: 'The fridge is next to the door.',
          feedback: { success: { title: 'Ótimo!', text: 'A geladeira está ao lado da porta.' } }
        }
      ]
    },
    {
      id: '2_3_gold',
      title: 'Misturando Tudo',
      color: '#ffd700',
      activities: [
        {
          type: 'category_sort',
          label: 'Desafio',
          title: 'IN ou ON?',
          instruction: 'Classifique onde cada coisa fica',
          categories: [
            { id: 'in', name: 'IN' },
            { id: 'on', name: 'ON' }
          ],
          items: [
            { id: 1, text: 'Box', category: 'in' },
            { id: 2, text: 'Kitchen', category: 'in' },
            { id: 3, text: 'Table', category: 'on' },
            { id: 4, text: 'Floor', category: 'on' }
          ],
          feedback: { success: { title: 'Excelente!', text: 'Você sabe quando usar IN e ON!' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro fatal',
          instruction: 'Encontre a palavra errada',
          sentence: 'I am on the kitchen.',
          errorWord: 'on',
          correction: 'in',
          feedback: { success: { title: 'ISSO!', text: 'Cômodos usam IN, não ON. "In the kitchen".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Onde fica o dinheiro?',
          instruction: 'Onde você guarda dinheiro?',
          question: 'The money is ___ the wallet.',
          options: [
            { text: 'in', correct: true },
            { text: 'on', correct: false },
            { text: 'under', correct: false },
          ],
          feedback: { success: { title: 'IN!', text: 'Dentro da carteira.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Revisão',
          instruction: 'O livro está na mesa.',
          sentence: 'The book is ___ the table.',
          correct: 'on',
          options: ['in', 'on', 'next to'],
          feedback: { success: { title: 'ON!', text: 'Em cima da mesa, não dentro dela!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Frase completa',
          instruction: '"O gato está na caixa."',
          words: ['The', 'cat', 'is', 'in', 'the', 'box.'],
          correct: 'The cat is in the box.',
          feedback: { success: { title: 'Gato na caixa!', text: 'Você dominou IN, ON, UNDER e NEXT TO!' } }
        }
      ]
    }
  ]
};