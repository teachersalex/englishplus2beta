/**
 * Node 6: As Ferramentas
 * Tema: Classroom Language
 */
export const node6Data = {
  id: 6,
  title: 'As Ferramentas',
  theme: 'Classroom Language',
  lore: 'O guia te entrega um manual. Você precisa entender as instruções para sobreviver aqui.',
  tip: 'Estes são os verbos que o App vai usar com você. Aprenda "Listen" (Ouvir) e "Read" (Ler).',
  
  levels: [
    {
      id: '0_6_bronze',
      title: 'Inputs',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Recebendo informação',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Ouvir', english: 'Listen' },
            { portuguese: 'Ler', english: 'Read' },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Essas são as ações de RECEBER informação.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a afirmação',
          statement: '"Listen" significa falar.',
          correct: false,
          feedback: { success: { title: 'Correto!', text: '"Listen" é ouvir, não falar!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Ícone mental',
          instruction: 'Qual ícone combina com "Listen"?',
          question: '"Listen" combina com qual imagem?',
          options: [
            { text: 'Orelha', correct: true },
            { text: 'Boca', correct: false },
            { text: 'Mão', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'Listen = Orelha. Ouvir!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Contexto',
          instruction: 'O que você faz com um livro?',
          question: 'Com um livro, você:',
          options: [
            { text: 'Read', correct: true },
            { text: 'Listen', correct: false },
            { text: 'Speak', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Livro = Read (Ler).' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: '___ to the audio.',
          correct: 'Listen',
          options: ['Listen', 'Read', 'Write'],
          feedback: { success: { title: 'Ótimo!', text: 'Listen to the audio = Ouça o áudio.' } }
        }
      ]
    },
    {
      id: '0_6_silver',
      title: 'Outputs',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Produzindo informação',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Falar', english: 'Speak' },
            { portuguese: 'Escrever', english: 'Write' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Essas são as ações de PRODUZIR informação.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Ícone mental',
          instruction: 'Qual ícone combina com "Write"?',
          question: '"Write" combina com qual imagem?',
          options: [
            { text: 'Lápis', correct: true },
            { text: 'Orelha', correct: false },
            { text: 'Olho', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'Write = Lápis. Escrever!' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a afirmação',
          statement: '"Speak" é usar a voz.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Speak = Falar = Usar a voz!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete a frase',
          instruction: 'Preencha a lacuna',
          sentence: 'I ___ English.',
          correct: 'speak',
          options: ['speak', 'listen', 'read'],
          feedback: { success: { title: 'Perfeito!', text: 'I speak English = Eu falo inglês.' } }
        },
        {
          type: 'category_sort',
          label: 'Fechamento',
          title: 'Receber vs Produzir',
          instruction: 'Classifique os verbos',
          categories: [
            { id: 'receber', name: 'Receber (Input)' },
            { id: 'produzir', name: 'Produzir (Output)' }
          ],
          items: [
            { id: 1, text: 'Listen', category: 'receber' },
            { id: 2, text: 'Read', category: 'receber' },
            { id: 3, text: 'Speak', category: 'produzir' },
            { id: 4, text: 'Write', category: 'produzir' }
          ],
          feedback: { success: { title: 'Excelente!', text: 'Você entende como a comunicação funciona!' } }
        }
      ]
    },
    {
      id: '0_6_gold',
      title: 'A Ação',
      color: '#ffd700',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Desafio',
          title: 'Comando duplo',
          instruction: '"Ouça e repita."',
          words: ['Listen', 'and', 'repeat.'],
          correct: 'Listen and repeat.',
          feedback: { success: { title: 'Excelente!', text: '"Ouça e repita" - O comando mais comum!' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Novo verbo',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Repetir', english: 'Repeat' },
            { portuguese: 'Abrir', english: 'Open' },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Mais comandos de sala de aula!' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Outro comando',
          instruction: '"Leia e escreva."',
          words: ['Read', 'and', 'write.'],
          correct: 'Read and write.',
          feedback: { success: { title: 'Perfeito!', text: '"Leia e escreva".' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Encontre o erro',
          instruction: 'Qual palavra está errada?',
          sentence: 'Listen me.',
          errorWord: 'me',
          correction: 'to me',
          feedback: { success: { title: 'Excelente!', text: 'O certo é "Listen TO me" ou só "Listen".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Comando do professor',
          instruction: 'O professor diz "Open your book". Você:',
          question: '"Open your book" significa:',
          options: [
            { text: 'Abre o livro', correct: true },
            { text: 'Fecha o livro', correct: false },
            { text: 'Lê o livro', correct: false },
          ],
          feedback: { success: { title: 'Muito bem!', text: 'Open = Abrir. Agora você entende o professor!' } }
        }
      ]
    }
  ]
};