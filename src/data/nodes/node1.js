/**
 * NODE 1: O ESPELHO
 * 3 levels × 5 atividades = 15 atividades
 */
export const node1Data = {
  id: 1,
  title: 'O Espelho',
  theme: 'Verb To Be',
  lore: 'Você acorda. O mundo lá fora espera, mas antes de sair, você se olha no espelho. Quem é você?',
  tip: 'O "I" é egoísta. Ele tem um verbo exclusivo só para ele: "AM".',
  
  levels: [
    {
      id: '1_bronze',
      title: 'O Despertar',
      color: '#cd7f32',
      activities: [
        {
          type: 'vocab_match',
          label: 'Aquecimento',
          title: 'Reconecte sua identidade',
          instruction: 'Conecte português ↔ inglês',
          pairs: [
            { portuguese: 'Eu sou', english: 'I am' },
            { portuguese: 'Você é', english: 'You are' },
            { portuguese: 'Professor', english: 'Teacher' },
            { portuguese: 'Estudante', english: 'Student' },
          ],
          feedback: { success: { title: 'Isso!', text: 'I am, You are. A base de tudo.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Complete a apresentação',
          instruction: 'Escolha a opção correta',
          sentence: 'Hello! I ___ Alex.',
          correct: 'am',
          options: ['is', 'am', 'are'],
          feedback: { success: { title: 'Perfeito!', text: '"I" sempre usa "am".' } }
        },
        {
          type: 'true_false',
          label: 'Prática',
          title: 'Verdadeiro ou Falso?',
          instruction: 'Analise a frase',
          statement: 'I am from Brazil.',
          correct: true,
          feedback: { success: { title: 'Correto!', text: 'Estrutura perfeita: I am from...' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Pronomes pessoais',
          instruction: 'Conecte os pronomes',
          pairs: [
            { portuguese: 'Ele', english: 'He' },
            { portuguese: 'Ela', english: 'She' },
            { portuguese: 'Nós', english: 'We' },
            { portuguese: 'Eles', english: 'They' },
          ],
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Traduza',
          instruction: 'Como dizer "Eu sou feliz"?',
          question: 'Escolha a tradução correta:',
          options: [
            { text: 'I is happy.', correct: false },
            { text: 'I am happy.', correct: true },
            { text: 'I happy.', correct: false },
          ],
          feedback: { success: { title: 'Boa!', text: 'I am happy.' } }
        }
      ]
    },
    {
      id: '1_silver',
      title: 'A Voz',
      color: '#c0c0c0',
      activities: [
        {
          type: 'sentence_builder',
          label: 'Aquecimento',
          title: 'Monte a frase',
          instruction: 'Organize as palavras',
          words: ['I', 'am', 'from', 'Brazil.'],
          correct: 'I am from Brazil.',
          feedback: { success: { title: 'Ótimo!', text: 'Sem "the" antes de Brazil.' } }
        },
        {
          type: 'fill_gap',
          label: 'Introdução',
          title: 'Ela é...',
          instruction: 'Complete com o verbo correto',
          sentence: 'She ___ a dentist.',
          correct: 'is',
          options: ['am', 'is', 'are'],
          feedback: { success: { title: 'Isso!', text: 'She usa IS.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Defina a profissão',
          instruction: 'Monte a frase',
          words: ['He', 'is', 'a', 'doctor.'],
          correct: 'He is a doctor.',
          feedback: { success: { title: 'Muito bem!', text: 'Não esqueça do "a" antes da profissão.' } }
        },
        {
          type: 'vocab_match',
          label: 'Prática',
          title: 'Tabela sagrada',
          instruction: 'Combine pronome com verbo',
          pairs: [
            { portuguese: 'Eu (I)', english: 'am' },
            { portuguese: 'Você (You)', english: 'are' },
            { portuguese: 'Ele (He)', english: 'is' },
          ],
        },
        {
          type: 'multiple_choice',
          label: 'Fechamento',
          title: 'Negação',
          instruction: 'Como dizer "Eu NÃO sou médico"?',
          question: 'Eu NÃO sou médico.',
          options: [
            { text: 'I no am a doctor.', correct: false },
            { text: 'I am not a doctor.', correct: true },
            { text: 'I not am a doctor.', correct: false },
          ],
          feedback: { success: { title: 'Exato!', text: 'O "not" vem depois do "am".' } }
        }
      ]
    },
    {
      id: '1_gold',
      title: 'A Identidade',
      color: '#ffd700',
      activities: [
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Erro fatal de brasileiro',
          instruction: 'Encontre a palavra errada',
          sentence: 'I have 30 years old.',
          errorWord: 'have',
          correction: 'am',
          feedback: { success: { title: 'EXCELENTE!', text: 'Você É a idade (I am), não TEM (I have).' } }
        },
        {
          type: 'error_detective',
          label: 'Desafio',
          title: 'Verbo errado',
          instruction: 'Ache o erro',
          sentence: 'She are my sister.',
          errorWord: 'are',
          correction: 'is',
          feedback: { success: { title: 'Corrigido!', text: 'She Is. Sempre.' } }
        },
        {
          type: 'sentence_builder',
          label: 'Prática',
          title: 'Frase longa',
          instruction: 'Monte a frase complexa',
          words: ['I', 'am', 'a', 'teacher', 'and', 'I', 'am', 'happy.'],
          correct: 'I am a teacher and I am happy.',
          feedback: { success: { title: 'Excelente!', text: 'Frase complexa dominada.' } }
        },
        {
          type: 'fill_gap',
          label: 'Desafio',
          title: 'Pergunta',
          instruction: 'Complete a pergunta',
          sentence: '___ you from São Paulo?',
          correct: 'Are',
          options: ['Is', 'Am', 'Are'],
          feedback: { success: { title: 'Boa!', text: 'Na pergunta, o verbo vem antes.' } }
        },
        {
          type: 'true_false',
          label: 'Fechamento',
          title: 'Desafio de contexto',
          instruction: 'Analise com atenção',
          statement: 'I have a teacher.',
          correct: true,
          feedback: { success: { title: 'Verdadeiro!', text: 'Aqui usamos "Have" porque você POSSUI um professor.' } }
        }
      ]
    }
  ]
};