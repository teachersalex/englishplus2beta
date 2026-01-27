# EnglishPlus 2.0

> Teacher Alex English Plus - Aprenda inglês de forma gamificada

## Visão Geral

App de aprendizado de inglês para adultos brasileiros profissionais. Visual premium inspirado em PlayStation, Apple e Valve.

## Estrutura

```
src/
├── components/
│   ├── engine/              # Sistema unificado de atividades
│   │   ├── EngineWrapper.jsx    # Layout compartilhado
│   │   ├── EngineButton.jsx     # Botão 3D reutilizável
│   │   ├── EngineOverlay.jsx    # Overlay de resultado
│   │   ├── index.js
│   │   └── types/               # 8 mecânicas de atividade
│   │       ├── VocabMatch.jsx
│   │       ├── FillGap.jsx
│   │       ├── SentenceBuilder.jsx
│   │       ├── TrueFalse.jsx
│   │       ├── MultipleChoice.jsx
│   │       ├── CategorySort.jsx
│   │       ├── ErrorDetective.jsx
│   │       └── Ordering.jsx
│   ├── home/
│   │   └── HomeScreen.jsx       # Dashboard com grid amplo
│   ├── layout/
│   │   ├── Layout.jsx           # Container adaptativo
│   │   ├── Sidebar.jsx          # Desktop (dark)
│   │   ├── BottomNav.jsx        # Mobile (dark)
│   │   └── index.js
│   ├── lesson/
│   │   ├── LessonRunner.jsx     # Orquestrador de lições
│   │   └── DiamondCelebrationModal.jsx
│   ├── map/
│   │   └── MapScreen.jsx        # Trilha serpentina
│   └── shared/
│       └── SplashScreen.jsx     # Boot screen estilo PlayStation
├── data/
│   ├── gameSchema.js
│   └── nodes/                   # 10 nodes (150 atividades)
│       ├── index.js
│       └── node1.js ... node10.js
├── hooks/
│   ├── useGameProgress.js
│   └── useLessonState.js
├── styles/
│   └── colors.js                # Paleta centralizada
├── App.jsx
├── main.jsx
└── index.css
```

## Paleta de Cores

```javascript
// Accent
primary: '#3B82F6'        // Azul elétrico
primaryDark: '#2563EB'    // Azul escuro (hover)
primaryLight: '#EFF6FF'   // Azul claro (backgrounds)

// Surfaces
bgApp: '#F8FAFC'          // Off-white
surface: '#FFFFFF'        // Branco
sidebar: '#1E293B'        // Dark (Sidebar + BottomNav)

// Text
textMain: '#1E293B'       // Cinza chumbo
textMuted: '#64748B'      // Cinza azulado

// States
success: '#10B981'        // Verde
error: '#EF4444'          // Vermelho
```

## Engines Disponíveis

| Engine | Tipo | Descrição |
|--------|------|-----------|
| VocabMatch | `vocab_match` | Conectar pares português/inglês |
| FillGap | `fill_gap` | Completar lacuna com opções |
| SentenceBuilder | `sentence_builder` | Montar frase na ordem |
| TrueFalse | `true_false` | Julgar se frase está correta |
| MultipleChoice | `multiple_choice` | Escolher entre opções |
| CategorySort | `category_sort` | Classificar palavras |
| ErrorDetective | `error_detective` | Encontrar palavra errada |
| Ordering | `ordering` | Ordenar itens em sequência |

## Sistema de Progressão

```
Node = 3 Rodadas (Bronze → Silver → Gold)
Rodada = 5 Atividades

Total por node: 15 atividades
Total Mapa 1: 150 atividades (10 nodes)

Diamante 💎 = 90%+ precisão na rodada
```

## Comandos

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Público

- Adultos profissionais brasileiros
- Biomédicos, farmacêuticos, engenheiros, administradores
- Visual sério e sofisticado

---

*Teacher Alex English Plus - "Perfeccionista é quem se importa"*