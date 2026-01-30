/**
 * Node 1: A Sala de Estar
 * Tema: Vocabulário de Móveis (Furniture)
 */
export const node1Data = {
  id: 1,
  title: 'A Sala de Estar',
  theme: 'Furniture',
  lore: 'Você entrou na casa. A sala está vazia, mas logo os móveis começam a aparecer.',
  tip: '"Furniture" significa móveis. Cuidado: essa palavra NUNCA vai para o plural (não existe "furnitures")!',
  
  levels: [
    {
      id: '2_1_bronze',
      title: 'O Básico',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Primeiros móveis',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Mesa', english: 'Table' },
            { portuguese: 'Cadeira', english: 'Chair' },
            { portuguese: 'Sofá', english: 'Sofa' },
            { portuguese: 'Cama', english: 'Bed' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Os móveis básicos já são seus.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a afirmação',
          statement: '"Table" é onde a gente senta.',
          correct: false,
          feedback: { success: { title: 'Correto!', text: 'Table é mesa. Você senta na Chair (cadeira).' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete a frase',
          instruction: 'Preencha a lacuna',
          sentence: 'I sit on the ___.',
          correct: 'sofa',
          options: ['sofa', 'table', 'lamp'],
          feedback: { success: { title: 'Isso!', text: 'Sofa - onde você senta para relaxar.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Onde você dorme?',
          instruction: 'Escolha a opção correta',
          question: 'Onde você dorme?',
          options: [
            { text: 'Table', correct: false },
            { text: 'Chair', correct: false },
            { text: 'Bed', correct: true },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Bed = Cama. Onde você dorme.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Monte a frase',
          instruction: '"O sofá é grande."',
          words: ['The', 'sofa', 'is', 'big.'],
          correct: 'The sofa is big.',
          feedback: { success: { title: 'Ótimo!', text: 'Sua primeira descrição de móvel!' } }
        }
      ]
    },
    {
      id: '2_1_silver',
      title: 'Eletrônicos e Decoração',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Mais objetos',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'TV', english: 'TV' },
            { portuguese: 'Quadro', english: 'Picture' },
            { portuguese: 'Tapete', english: 'Carpet' },
            { portuguese: 'Lâmpada', english: 'Lamp' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'A sala está ganhando vida!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'I watch ___.',
          correct: 'TV',
          options: ['TV', 'table', 'bed'],
          feedback: { success: { title: 'Isso!', text: 'Watch TV = Assistir TV.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'No chão',
          instruction: 'O que você coloca no chão?',
          question: 'Qual fica no chão?',
          options: [
            { text: 'Picture', correct: false },
            { text: 'Carpet', correct: true },
            { text: 'Lamp', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Carpet (tapete) fica no chão.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Picture',
          instruction: 'Analise a afirmação',
          statement: '"Picture" significa foto OU quadro.',
          correct: true,
          feedback: { success: { title: 'Verdadeiro!', text: 'Picture pode ser foto ou quadro na parede.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Fechamento',
          title: 'Monte a frase',
          instruction: '"A lâmpada é bonita."',
          words: ['The', 'lamp', 'is', 'beautiful.'],
          correct: 'The lamp is beautiful.',
          feedback: { success: { title: 'Linda frase!', text: 'A lâmpada é bonita.' } }
        }
      ]
    },
    {
      id: '2_1_gold',
      title: 'Descrição do Ambiente',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Posse',
          instruction: '"Esta é minha mesa."',
          words: ['This', 'is', 'my', 'table.'],
          correct: 'This is my table.',
          feedback: { success: { title: 'Excelente!', text: 'Esta é a minha mesa.' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro clássico',
          instruction: 'Encontre a palavra errada',
          sentence: 'I have two chair.',
          errorWord: 'chair',
          correction: 'chairs',
          feedback: { success: { title: 'Pegou!', text: '"Two" é plural, então o substantivo precisa de S: "two chairs".' } }
        },
        {
          type: 'category_sort',
          label: 'Prática',
          title: 'Sentar vs Olhar',
          instruction: 'Classifique os objetos',
          categories: [
            { id: 'sentar', name: 'Sentar' },
            { id: 'olhar', name: 'Olhar' }
          ],
          items: [
            { id: 1, text: 'Sofa', category: 'sentar' },
            { id: 2, text: 'Chair', category: 'sentar' },
            { id: 3, text: 'TV', category: 'olhar' },
            { id: 4, text: 'Picture', category: 'olhar' }
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Você sabe a função de cada objeto!' } }
        },
        {
          type: 'true_false',
          label: 'Desafio',
          title: 'A armadilha',
          instruction: 'Analise com cuidado',
          statement: '"Furniture" é o plural de móvel.',
          correct: false,
          feedback: { success: { title: 'MUITO BEM!', text: 'Furniture é INCONTÁVEL. Não tem plural!' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Frase completa',
          instruction: 'Complete a frase',
          sentence: 'The ___ is comfortable.',
          correct: 'sofa',
          options: ['sofa', 'table', 'picture'],
          feedback: { success: { title: 'Perfeito!', text: 'O sofá é confortável.' } }
        }
      ]
    }
  ]
};