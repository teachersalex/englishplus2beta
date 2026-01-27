/**
 * NODE 9: OS PORTÕES
 * 3 levels × 5 atividades = 15 atividades
 */
export const node9Data = {
  id: 9,
  title: 'Os Portões',
  theme: 'Revisão Geral',
  lore: 'Os guardas reais barram sua entrada. Eles fazem perguntas misturadas para testar se você é um impostor.',
  tip: 'Atenção às pistas! "Every day" = Rotina. "Now" = ING.',
  
  levels: [
    {
      id: '9_bronze',
      title: 'As Pistas',
      color: '#cd7f32',
      activities: [
        {
          type: 'category_sort',
          label: 'Aquecimento',
          title: 'Detetives do tempo',
          instruction: 'Classifique',
          categories: [
            { id: 'routine', name: 'Rotina (Simple)' },
            { id: 'now', name: 'Agora (Continuous)' }
          ],
          items: [
            { id: 1, text: 'Every day', category: 'routine' },
            { id: 2, text: 'Right now', category: 'now' },
            { id: 3, text: 'Usually', category: 'routine' },
            { id: 4, text: 'Look!', category: 'now' }
          ],
          feedback: { success: { title: 'Pistas encontradas!', text: 'Essas palavras ditam a regra.' } }
        },
        {
          type: 'multiple_choice',
          label: 'Introdução',
          title: 'Escute!',
          instruction: '"Listen!" indica...',
          question: 'Listen! The baby ___.',
          options: [
            { text: 'cries', correct: false },
            { text: 'is crying', correct: true },
          ],
          feedback: { success: { title: 'Is crying!', text: '"Listen!" é algo acontecendo agora.' } }
        },
        {
          type: 'fill_gap',
          label: 'Prática',
          title: 'Rotina',
          instruction: 'Complete',
          sentence: 'I usually ___ coffee.',
          correct: 'drink',
          options: ['drink', 'drinking'],
          feedback: { success: { title: 'Drink!', text: 'Usually é hábito. Present Simple.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Contraste',
          instruction: 'Conecte',
          pairs: [
            { portuguese: 'Eu trabalho', english: 'I work' },
            { portuguese: 'Estou trabalhando', english: 'I am working' },
            { portuguese: 'Eu moro', english: 'I live' },
          ],
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Analise',
          instruction: 'Certo ou errado?',
          statement: 'I am live in Brazil.',
          correct: false,
          feedback: { success: { title: 'Errado!', text: 'Morar é rotina/estado. I live in Brazil.' } }
        }
      ]
    },
    {
      id: '9_silver',
      title: 'O Interrogatório',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Explicação',
          instruction: 'Monte',
          words: ['I', 'work', 'here', 'but', 'I', 'am', 'resting', 'now.'],
          correct: 'I work here but I am resting now.',
          feedback: { success: { title: 'Mestre!', text: 'Usou os dois tempos na mesma frase.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Sem ING',
          instruction: 'Verbo mental',
          sentence: 'I ___ the answer.',
          correct: 'know',
          options: ['know', 'am knowing'],
          feedback: { success: { title: 'Know!', text: 'Não usamos ING com Know (saber).' } }
        },
        {
          type: 'error_detective',
          label: 'Prática',
          title: 'Falso amigo',
          instruction: 'Ache o erro',
          sentence: 'I am understand you.',
          errorWord: 'am',
          correction: '',
          feedback: { success: { title: 'Tire o AM!', text: 'Apenas "I understand you".' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Ela estuda ou está estudando?',
          instruction: 'Monte',
          words: ['She', 'studies', 'English', 'every', 'day.'],
          correct: 'She studies English every day.',
          feedback: { success: { title: 'Boa!', text: 'Every day = Rotina (Studies).' } }
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Escolha',
          instruction: 'Olhe!',
          question: 'Look! It ___.',
          options: [
            { text: 'rains', correct: false },
            { text: 'is raining', correct: true },
          ],
          feedback: { success: { title: 'Is raining!', text: '"Look!" indica agora.' } }
        }
      ]
    },
    {
      id: '9_gold',
      title: 'A Chave Mestra',
      color: '#ffd700',
      activities: [
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Mix de verbos',
          instruction: 'Complete',
          sentence: 'He ___ TV every night, but now he is ___.',
          correct: 'watches / sleeping',
          options: ['watches / sleeping', 'watching / sleeps'],
          feedback: { success: { title: 'Perfeito!', text: 'Rotina (watches) vs Agora (sleeping).' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Plural esquecido',
          instruction: 'Ache o erro',
          sentence: 'There is two guards.',
          errorWord: 'is',
          correction: 'are',
          feedback: { success: { title: 'Are!', text: 'Two guards = Plural.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase complexa',
          instruction: 'Monte',
          words: ['We', 'usually', 'go', 'by', 'car', 'but', 'today', 'we', 'are', 'walking.'],
          correct: 'We usually go by car but today we are walking.',
          feedback: { success: { title: 'Nível avançado!', text: 'Contraste perfeito.' } }
        },
        {
          type: 'true_false',
          label: 'Desafio',
          title: 'Verbo Mental',
          instruction: 'Analise',
          statement: 'I am liking pizza.',
          correct: false,
          feedback: { success: { title: 'Errado!', text: 'Gostar é um estado. "I like pizza".' } }
        },
        {
          type: 'fill_gap',
          label: 'Fechamento',
          title: 'Final',
          instruction: 'Complete',
          sentence: '___ you speak English?',
          correct: 'Do',
          options: ['Do', 'Are'],
          feedback: { success: { title: 'Do you?', text: 'Speak é verbo de ação. Use Do.' } }
        }
      ]
    }
  ]
};