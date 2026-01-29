/**
 * Node 5: Palavras Mágicas
 * Tema: Polidez
 */
export const node5Data = {
  id: 5,
  title: 'Palavras Mágicas',
  theme: 'Polidez',
  lore: 'Você precisa pedir um favor. Seja educado ou a porta não abre.',
  tip: '"Please" vai no final ou no começo da frase. Nunca esqueça!',
  
  levels: [
    {
      id: '0_5_bronze',
      title: 'Sim e Não',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'O básico',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Sim', english: 'Yes' },
            { portuguese: 'Não', english: 'No' },
            { portuguese: 'Talvez', english: 'Maybe' },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'As respostas mais importantes.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'No vs Not',
          instruction: 'Analise a afirmação',
          statement: '"Not" e "No" são parecidos.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Ambos negativos, mas usados diferente.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Aceitar com educação',
          instruction: '"Sim, por favor."',
          words: ['Yes,', 'please.'],
          correct: 'Yes, please.',
          feedback: { success: { title: 'Ótimo!', text: '"Sim, por favor" - educado e direto.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Recusar com educação',
          instruction: '"Não, obrigado."',
          words: ['No,', 'thanks.'],
          correct: 'No, thanks.',
          feedback: { success: { title: 'Perfeito!', text: '"Não, obrigado" - recusa gentil.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Contexto',
          instruction: 'Te oferecem café. Você quer. O que diz?',
          question: 'Você quer café?',
          options: [
            { text: 'Yes, please.', correct: true },
            { text: 'No, please.', correct: false },
            { text: 'Yes, sorry.', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'Aceitar = Yes, please.' } }
        }
      ]
    },
    {
      id: '0_5_silver',
      title: 'Por Favor e Obrigado',
      color: '#c0c0c0',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Palavras mágicas',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Obrigado', english: 'Thank you' },
            { portuguese: 'Por favor', english: 'Please' },
            { portuguese: 'De nada', english: "You're welcome" },
          ],
          feedback: { success: { title: 'Excelente!', text: 'As palavras que abrem portas!' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Complete',
          instruction: 'Preencha a lacuna',
          sentence: 'Thank ___!',
          correct: 'you',
          options: ['you', 'me', 'please'],
          feedback: { success: { title: 'Isso!', text: 'Thank YOU = Obrigado.' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Thanks vs Thank you',
          instruction: 'Analise a afirmação',
          statement: '"Thanks" é informal para "Thank you".',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Thanks = casual. Thank you = formal.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Pedindo ajuda',
          instruction: '"Me ajude, por favor."',
          words: ['Help', 'me,', 'please.'],
          correct: 'Help me, please.',
          feedback: { success: { title: 'Perfeito!', text: '"Me ajude, por favor" - educado!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Posição do Please',
          instruction: 'Qual está correta?',
          question: 'Onde vai o "please"?',
          options: [
            { text: 'Please help me. / Help me, please.', correct: true },
            { text: 'Help please me.', correct: false },
            { text: 'Me please help.', correct: false },
          ],
          feedback: { success: { title: 'Ótimo!', text: 'Please vai no começo OU no final!' } }
        }
      ]
    },
    {
      id: '0_5_gold',
      title: 'Desculpas',
      color: '#ffd700',
      activities: [
        {
          type: 'vocab_match',
          label: 'Desafio',
          title: 'Formas de desculpa',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Desculpa', english: 'Sorry' },
            { portuguese: 'Com licença', english: 'Excuse me' },
            { portuguese: 'Perdão', english: 'I apologize' },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Cada situação tem sua desculpa!' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Esbarrão',
          instruction: 'Você esbarrou em alguém. O que diz?',
          question: 'Você pisou no pé de alguém:',
          options: [
            { text: 'Sorry!', correct: true },
            { text: 'Thank you!', correct: false },
            { text: 'Please!', correct: false },
          ],
          feedback: { success: { title: 'Isso!', text: 'Sorry = Desculpa (por um erro seu).' } }
        },
        {
          type: 'multiple_choice',
          label: 'Prática',
          title: 'Passagem',
          instruction: 'Você quer passar. O que diz?',
          question: 'Tem gente bloqueando o caminho:',
          options: [
            { text: 'Excuse me.', correct: true },
            { text: 'Sorry.', correct: false },
            { text: 'Thank you.', correct: false },
          ],
          feedback: { success: { title: 'Perfeito!', text: 'Excuse me = Com licença (pedir passagem/atenção).' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro comum',
          instruction: 'Qual palavra está errada?',
          sentence: 'I sorry you.',
          errorWord: 'you',
          correction: 'am',
          feedback: { success: { title: 'Ótimo!', text: 'O certo é "I am sorry" ou só "Sorry".' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Situação',
          instruction: 'Você quer chamar a atenção de alguém:',
          question: 'Chamar um garçom:',
          options: [
            { text: 'Excuse me!', correct: true },
            { text: 'Sorry!', correct: false },
            { text: 'Please!', correct: false },
          ],
          feedback: { success: { title: 'Excelente!', text: 'Excuse me = chamar atenção educadamente.' } }
        }
      ]
    }
  ]
};