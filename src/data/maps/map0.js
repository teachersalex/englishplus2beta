/**
 * map0.js - MAPA 0: A CHEGADA
 * 5 nodes × 3 levels × 5 atividades = 75 atividades
 */

export const map0Data = {
  id: 0,
  title: 'A Chegada',
  subtitle: 'Primeiros Passos',
  
  nodes: [
    { id: 1, title: 'O Primeiro Contato', theme: 'Greetings' },
    { id: 2, title: 'A Despedida', theme: 'Goodbyes' },
    { id: 3, title: 'O Código (Parte 1)', theme: 'Vogais' },
    { id: 4, title: 'O Código (Parte 2)', theme: 'Consoantes' },
    { id: 5, title: 'Palavras Mágicas', theme: 'Polidez' },
  ],
  
  nodesData: {
    1: {
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
              title: 'Complete a palavra',
              instruction: 'Preencha a lacuna',
              sentence: 'H__lo',
              correct: 'el',
              options: ['el', 'al', 'ol'],
              feedback: { success: { title: 'Perfeito!', text: 'Hello - sua primeira palavra.' } }
            },
            {
              type: 'sentence_builder',
              label: 'Fechamento',
              title: 'Monte a saudação',
              instruction: 'Organize as palavras',
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
              sentence: 'Good ___ning',
              correct: 'mor',
              options: ['mor', 'eve', 'after'],
              feedback: { success: { title: 'Isso!', text: 'Good MORning = Bom dia.' } }
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
              instruction: 'Organize as palavras',
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
              instruction: 'Monte a pergunta',
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
    },
    
    2: {
      id: 2,
      title: 'A Despedida',
      theme: 'Goodbyes',
      lore: 'O dia acabou. É hora de ir descansar. Mas como se despedir sem parecer rude?',
      tip: '"Good Night" não é "Boa Noite" de chegada. É só quando você vai EMBORA ou DORMIR.',
      
      levels: [
        {
          id: '0_2_bronze',
          title: 'Saindo',
          color: '#cd7f32',
          activities: [
            {
              type: 'vocab_match',
              label: 'Aquecimento',
              title: 'Formas de tchau',
              instruction: 'Conecte português ↔ inglês',
              pairs: [
                { portuguese: 'Tchau', english: 'Bye' },
                { portuguese: 'Adeus', english: 'Goodbye' },
                { portuguese: 'Até logo', english: 'See you' },
              ],
              feedback: { success: { title: 'Perfeito!', text: 'Várias formas de dizer tchau.' } }
            },
            {
              type: 'sentence_builder',
              label: 'Prática',
              title: 'Forme a palavra',
              instruction: 'Ordene as letras',
              words: ['B', 'Y', 'E'],
              correct: 'B Y E',
              feedback: { success: { title: 'Isso!', text: 'Bye - curto e doce.' } }
            },
            {
              type: 'true_false',
              label: 'Prática',
              title: 'Verdadeiro ou Falso?',
              instruction: 'Analise a afirmação',
              statement: '"Goodbye" é mais formal que "Bye".',
              correct: true,
              feedback: { success: { title: 'Correto!', text: '"Goodbye" é completo e formal. "Bye" é casual.' } }
            },
            {
              type: 'multiple_choice',
              label: 'Prática',
              title: 'Contexto',
              instruction: 'O que você diz ao sair?',
              question: 'Você está indo embora. O que diz?',
              options: [
                { text: 'Hello', correct: false },
                { text: 'Goodbye', correct: true },
                { text: 'Good morning', correct: false },
              ],
              feedback: { success: { title: 'Isso!', text: 'Saindo = Goodbye.' } }
            },
            {
              type: 'fill_gap',
              label: 'Fechamento',
              title: 'Complete',
              instruction: 'Preencha a lacuna',
              sentence: 'Good___',
              correct: 'bye',
              options: ['bye', 'morning', 'night'],
              feedback: { success: { title: 'Perfeito!', text: 'Goodbye = Adeus.' } }
            }
          ]
        },
        {
          id: '0_2_silver',
          title: 'O Sono',
          color: '#c0c0c0',
          activities: [
            {
              type: 'vocab_match',
              label: 'Aquecimento',
              title: 'Hora de dormir',
              instruction: 'Conecte a despedida',
              pairs: [
                { portuguese: 'Boa noite (dormir)', english: 'Good night' },
                { portuguese: 'Durma bem', english: 'Sleep well' },
                { portuguese: 'Bons sonhos', english: 'Sweet dreams' },
              ],
              feedback: { success: { title: 'Ótimo!', text: 'Formas carinhosas de se despedir à noite.' } }
            },
            {
              type: 'true_false',
              label: 'Prática',
              title: 'Cuidado!',
              instruction: 'Analise a situação',
              statement: 'Você chega na festa às 21h e diz "Good night".',
              correct: false,
              feedback: { success: { title: 'Correto!', text: 'Good night é despedida! Para chegar, use "Good evening".' } }
            },
            {
              type: 'sentence_builder',
              label: 'Prática',
              title: 'Monte a frase',
              instruction: 'Organize as palavras',
              words: ['Good', 'night,', 'mom.'],
              correct: 'Good night, mom.',
              feedback: { success: { title: 'Perfeito!', text: 'Boa noite para a mãe antes de dormir.' } }
            },
            {
              type: 'multiple_choice',
              label: 'Prática',
              title: 'Classificar',
              instruction: 'Esta é chegada ou saída?',
              question: '"Good night" é usado para:',
              options: [
                { text: 'Chegar em algum lugar', correct: false },
                { text: 'Ir embora ou dormir', correct: true },
                { text: 'Qualquer situação à noite', correct: false },
              ],
              feedback: { success: { title: 'Excelente!', text: 'Good night = despedida ou hora de dormir.' } }
            },
            {
              type: 'fill_gap',
              label: 'Fechamento',
              title: 'Desejo',
              instruction: 'Complete o desejo',
              sentence: 'Have a nice ___!',
              correct: 'day',
              options: ['day', 'you', 'bye'],
              feedback: { success: { title: 'Isso!', text: '"Have a nice day" = Tenha um bom dia!' } }
            }
          ]
        },
        {
          id: '0_2_gold',
          title: 'Até Logo',
          color: '#ffd700',
          activities: [
            {
              type: 'sentence_builder',
              label: 'Desafio',
              title: 'Até mais tarde',
              instruction: 'Monte a frase',
              words: ['See', 'you', 'later.'],
              correct: 'See you later.',
              feedback: { success: { title: 'Perfeito!', text: '"Vejo você mais tarde" - casual e amigável.' } }
            },
            {
              type: 'vocab_match',
              label: 'Prática',
              title: 'Variações',
              instruction: 'Conecte as despedidas',
              pairs: [
                { portuguese: 'Até mais', english: 'See you' },
                { portuguese: 'Até amanhã', english: 'See you tomorrow' },
                { portuguese: 'Até logo', english: 'See you later' },
              ],
              feedback: { success: { title: 'Ótimo!', text: 'Várias formas de "até"!' } }
            },
            {
              type: 'error_detective',
              label: 'Desafio',
              title: 'Erro de lógica',
              instruction: 'Encontre o erro',
              sentence: 'See you yesterday.',
              errorWord: 'yesterday',
              correction: 'later',
              feedback: { success: { title: 'Excelente!', text: 'Despedida é futuro, não passado!' } }
            },
            {
              type: 'sentence_builder',
              label: 'Prática',
              title: 'Ordene',
              instruction: 'Forme a frase',
              words: ['See', 'you', 'tomorrow.'],
              correct: 'See you tomorrow.',
              feedback: { success: { title: 'Perfeito!', text: 'Até amanhã!' } }
            },
            {
              type: 'multiple_choice',
              label: 'Fechamento',
              title: 'Tradução',
              instruction: 'Como dizer "Até amanhã"?',
              question: 'Traduza: "Até amanhã"',
              options: [
                { text: 'See you yesterday', correct: false },
                { text: 'See you tomorrow', correct: true },
                { text: 'See you night', correct: false },
              ],
              feedback: { success: { title: 'Muito bem!', text: 'Tomorrow = amanhã.' } }
            }
          ]
        }
      ]
    },
    
    3: {
      id: 3,
      title: 'O Código (Parte 1)',
      theme: 'Vogais',
      lore: 'Para entrar na cidade, você precisa soletrar seu nome. Mas cuidado: as letras aqui soam diferente.',
      tip: 'O "E" tem som de "i". O "I" tem som de "ai". O "A" tem som de "ei". Decore isso!',
      
      levels: [
        {
          id: '0_3_bronze',
          title: 'As Vogais',
          color: '#cd7f32',
          activities: [
            {
              type: 'vocab_match',
              label: 'Aquecimento',
              title: 'Sons das vogais',
              instruction: 'Conecte a letra ao som',
              pairs: [
                { portuguese: 'Som "Ei"', english: 'A' },
                { portuguese: 'Som "I"', english: 'E' },
                { portuguese: 'Som "Ai"', english: 'I' },
                { portuguese: 'Som "Ou"', english: 'O' },
              ],
              feedback: { success: { title: 'Muito bem!', text: 'Os sons são completamente diferentes do português!' } }
            },
            {
              type: 'true_false',
              label: 'Prática',
              title: 'Verdadeiro ou Falso?',
              instruction: 'Analise a afirmação',
              statement: 'A letra "E" em inglês tem som de "É".',
              correct: false,
              feedback: { success: { title: 'Correto!', text: 'O "E" tem som de "I" (como em "i-mail").' } }
            },
            {
              type: 'multiple_choice',
              label: 'Prática',
              title: 'Qual letra?',
              instruction: 'Qual letra tem som de "Ou"?',
              question: 'Em inglês, qual letra soa como "Ou"?',
              options: [
                { text: 'A', correct: false },
                { text: 'O', correct: true },
                { text: 'U', correct: false },
              ],
              feedback: { success: { title: 'Isso!', text: 'O = "Ou". Simples assim.' } }
            },
            {
              type: 'multiple_choice',
              label: 'Prática',
              title: 'Som do U',
              instruction: 'Qual é o som da letra U?',
              question: 'A letra U em inglês soa como:',
              options: [
                { text: 'U (como em "uva")', correct: false },
                { text: 'Iu (como em "you")', correct: true },
                { text: 'Au', correct: false },
              ],
              feedback: { success: { title: 'Perfeito!', text: 'U = "Iu". Por isso "USB" é "Iu-Éss-Bi".' } }
            },
            {
              type: 'vocab_match',
              label: 'Fechamento',
              title: 'Revisão',
              instruction: 'Conecte todas as vogais',
              pairs: [
                { portuguese: 'A', english: 'Ei' },
                { portuguese: 'E', english: 'I' },
                { portuguese: 'I', english: 'Ai' },
                { portuguese: 'U', english: 'Iu' },
              ],
              feedback: { success: { title: 'Excelente!', text: 'Vogais dominadas!' } }
            }
          ]
        },
        {
          id: '0_3_silver',
          title: 'Consoantes Fáceis',
          color: '#c0c0c0',
          activities: [
            {
              type: 'sentence_builder',
              label: 'Aquecimento',
              title: 'Ordem alfabética',
              instruction: 'Ordene as primeiras letras',
              words: ['A', 'B', 'C', 'D'],
              correct: 'A B C D',
              feedback: { success: { title: 'Perfeito!', text: 'O começo do alfabeto.' } }
            },
            {
              type: 'vocab_match',
              label: 'Prática',
              title: 'Sons das consoantes',
              instruction: 'Conecte letra ao som',
              pairs: [
                { portuguese: 'B', english: 'Bi' },
                { portuguese: 'C', english: 'Ci' },
                { portuguese: 'D', english: 'Di' },
              ],
              feedback: { success: { title: 'Ótimo!', text: 'Essas são parecidas com português!' } }
            },
            {
              type: 'fill_gap',
              label: 'Prática',
              title: 'Sequência',
              instruction: 'Qual letra vem depois?',
              sentence: 'A, B, C, __',
              correct: 'D',
              options: ['D', 'E', 'F'],
              feedback: { success: { title: 'Isso!', text: 'A, B, C, D...' } }
            },
            {
              type: 'true_false',
              label: 'Prática',
              title: 'Som do F',
              instruction: 'Analise a afirmação',
              statement: 'O som de "F" em inglês é "Éf".',
              correct: true,
              feedback: { success: { title: 'Correto!', text: 'F = "Éf", igual em português.' } }
            },
            {
              type: 'multiple_choice',
              label: 'Fechamento',
              title: 'Letra G',
              instruction: 'Qual é o som da letra G?',
              question: 'A letra G soa como:',
              options: [
                { text: 'Dgi (como em "gim")', correct: true },
                { text: 'Gue (como em "guerra")', correct: false },
                { text: 'Je', correct: false },
              ],
              feedback: { success: { title: 'Perfeito!', text: 'G = "Dgi". Por isso "GIF" tem polêmica!' } }
            }
          ]
        },
        {
          id: '0_3_gold',
          title: 'Soletrando Nomes',
          color: '#ffd700',
          activities: [
            {
              type: 'sentence_builder',
              label: 'Desafio',
              title: 'Apresentação',
              instruction: 'Monte a frase',
              words: ['My', 'name', 'is', 'Bob.'],
              correct: 'My name is Bob.',
              feedback: { success: { title: 'Perfeito!', text: '"Meu nome é..." - Essencial!' } }
            },
            {
              type: 'sentence_builder',
              label: 'Prática',
              title: 'Soletrar BOB',
              instruction: 'Ordene as letras',
              words: ['B', 'O', 'B'],
              correct: 'B O B',
              feedback: { success: { title: 'Isso!', text: 'B-O-B. Bi-Ou-Bi.' } }
            },
            {
              type: 'sentence_builder',
              label: 'Prática',
              title: 'Soletrar ANA',
              instruction: 'Ordene as letras',
              words: ['A', 'N', 'A'],
              correct: 'A N A',
              feedback: { success: { title: 'Ótimo!', text: 'A-N-A. Ei-Én-Ei.' } }
            },
            {
              type: 'error_detective',
              label: 'Desafio',
              title: 'Erro de verbo',
              instruction: 'Encontre o erro',
              sentence: 'My name are Alex.',
              errorWord: 'are',
              correction: 'is',
              feedback: { success: { title: 'Excelente!', text: '"My name" usa "is", não "are".' } }
            },
            {
              type: 'multiple_choice',
              label: 'Fechamento',
              title: 'Soletrar DIA',
              instruction: 'Como soletra "DIA" em inglês?',
              question: 'Soletrar: D-I-A',
              options: [
                { text: 'Di - Ai - Ei', correct: true },
                { text: 'Di - I - Ah', correct: false },
                { text: 'Dê - I - A', correct: false },
              ],
              feedback: { success: { title: 'Perfeito!', text: 'D=Di, I=Ai, A=Ei. Você dominou!' } }
            }
          ]
        }
      ]
    },
    
    4: {
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
              type: 'fill_gap',
              label: 'Prática',
              title: 'Sequência final',
              instruction: 'Qual letra vem depois?',
              sentence: 'X, Y, __',
              correct: 'Z',
              options: ['Z', 'W', 'A'],
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
              type: 'sentence_builder',
              label: 'Desafio',
              title: 'Soletrar BRAZIL',
              instruction: 'Ordene as letras',
              words: ['B', 'R', 'A', 'Z', 'I', 'L'],
              correct: 'B R A Z I L',
              feedback: { success: { title: 'Perfeito!', text: 'Bi-Ar-Ei-Zi-Ai-Él = BRAZIL' } }
            },
            {
              type: 'sentence_builder',
              label: 'Prática',
              title: 'De onde você é',
              instruction: 'Monte a frase',
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
              type: 'sentence_builder',
              label: 'Fechamento',
              title: 'Soletrar USA',
              instruction: 'Ordene as letras',
              words: ['U', 'S', 'A'],
              correct: 'U S A',
              feedback: { success: { title: 'Excelente!', text: 'Iu-Éss-Ei = USA!' } }
            }
          ]
        }
      ]
    },
    
    5: {
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
              instruction: 'Monte a frase',
              words: ['Yes,', 'please.'],
              correct: 'Yes, please.',
              feedback: { success: { title: 'Ótimo!', text: '"Sim, por favor" - educado e direto.' } }
            },
            {
              type: 'sentence_builder',
              label: 'Prática',
              title: 'Recusar com educação',
              instruction: 'Monte a frase',
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
              instruction: 'Monte a frase',
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
              instruction: 'Encontre o erro',
              sentence: 'Sorry me.',
              errorWord: 'me',
              correction: '(remover)',
              feedback: { success: { title: 'Ótimo!', text: 'Basta dizer "Sorry" ou "I am sorry".' } }
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
    }
  }
};
