/**
 * App.jsx
 * EnglishPlus 2.0 - Com Firebase
 * 
 * FLUXO: Splash → Login → Home
 * 
 * DNA: PlayStation + Apple + Valve
 */

import { useState } from 'react';
import { AuthGate } from './components/auth/AuthGate';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import SplashScreen from './components/shared/SplashScreen';
import Layout from './components/layout/Layout';
import HomeScreen from './components/home/HomeScreen';
import MapScreen from './components/map/MapScreen';
import { LessonRunner } from './components/lesson/LessonRunner';

// Stories
import StoriesHub from './components/stories/StoriesHub';
import EpisodePlayer from './components/stories/EpisodePlayer';

// Nodes data
import { node1Data } from './data/nodes/node1';
import { node2Data } from './data/nodes/node2';
import { node3Data } from './data/nodes/node3';
import { node4Data } from './data/nodes/node4';
import { node5Data } from './data/nodes/node5';
import { node6Data } from './data/nodes/node6';
import { node7Data } from './data/nodes/node7';
import { node8Data } from './data/nodes/node8';
import { node9Data } from './data/nodes/node9';
import { node10Data } from './data/nodes/node10';

// Mapa de nodes
const nodesData = {
  1: node1Data,
  2: node2Data,
  3: node3Data,
  4: node4Data,
  5: node5Data,
  6: node6Data,
  7: node7Data,
  8: node8Data,
  9: node9Data,
  10: node10Data,
};

function AppContent() {
  const { user, logout } = useAuth();
  const [currentSection, setCurrentSection] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isInLesson, setIsInLesson] = useState(false);
  
  // Stories state
  const [currentStorySection, setCurrentStorySection] = useState('hub');
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);

  // Sistema de progressão (Firebase) - passa user inteiro
  const { 
    progress,
    loading: progressLoading,
    getNodeState,
    getNodeProgress,
    isLevelCompleted,
    getNextLevel,
    completeLevel,
    resetProgress,
    updateStoryProgress,
  } = useProgress(user);

  // Dados do usuário
  const userData = {
    name: user?.displayName || user?.email?.split('@')[0] || 'Aluno',
    email: user?.email,
    plan: 'Pro',
  };

  // Encontra próxima lição disponível
  const getNextLessonInfo = () => {
    const nodeCount = Object.keys(nodesData).length;
    for (let i = 1; i <= nodeCount; i++) {
      const state = getNodeState(i);
      if (state === 'unlocked' || state === 'in_progress') {
        const node = nodesData[i];
        if (node?.levels) {
          const nextLevel = getNextLevel(i, node.levels);
          if (nextLevel) {
            return {
              nodeId: i,
              title: node.title,
              module: `${getNodeProgress(i) + 1}/3`,
              theme: node.theme,
              node,
              level: nextLevel,
            };
          }
        }
      }
    }
    return { title: 'Tudo completo!', module: 'Parabéns!', theme: '' };
  };

  // Inicia lição de um node específico
  const startNodeLesson = (nodeId) => {
    const node = nodesData[nodeId];
    if (!node) return;

    const nextLevel = getNextLevel(nodeId, node.levels);
    if (!nextLevel) return;

    setCurrentLesson({
      nodeId: nodeId,
      node: node,
      level: nextLevel,
      currentRound: getNodeProgress(nodeId) + 1,
    });
    setIsInLesson(true);
  };

  // Loading progress
  if (progressLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Tela de Lição (fullscreen)
  if (isInLesson && currentLesson) {
    const { nodeId, node, level, currentRound } = currentLesson;
    
    return (
      <LessonRunner
        lesson={{
          id: level.id,
          title: node.title,
          theme: node.theme,
          tip: node.tip,
          lore: node.lore,
          activities: level.activities,
          currentRound: currentRound,
          totalRounds: 3,
        }}
        onComplete={(result) => {
          completeLevel(nodeId, level.id, {
            accuracy: result.accuracy || 0,
            xpEarned: result.xp || 0,
          });
          setIsInLesson(false);
          setCurrentLesson(null);
          setCurrentSection('map');
        }}
        onExit={() => {
          setIsInLesson(false);
          setCurrentLesson(null);
          setCurrentSection('map');
        }}
      />
    );
  }

  // Navegação
  const handleNavigate = (section) => {
    if (section === 'stories') {
      setCurrentStorySection('hub');
      setSelectedSeriesId(null);
    }
    setCurrentSection(section);
  };

  // Iniciar lição da home
  const handleStartLesson = () => {
    const next = getNextLessonInfo();
    if (next.node && next.level) {
      startNodeLesson(next.nodeId);
    } else {
      setCurrentSection('map');
    }
  };

  // Clicou em node no mapa
  const handleSelectNode = (nodeId) => {
    const state = getNodeState(nodeId);
    if (state === 'locked') return;
    startNodeLesson(nodeId);
  };

  // Stories handlers
  const handleSelectSeries = (seriesId) => {
    setSelectedSeriesId(seriesId);
    setCurrentStorySection('player');
  };

  const handleBackFromPlayer = () => {
    setCurrentStorySection('hub');
    setSelectedSeriesId(null);
  };

  const handleBackFromHub = () => {
    setCurrentSection('home');
  };

  // Tela do Mapa
  if (currentSection === 'map') {
    return (
      <MapScreen
        mapId="map-1"
        getNodeState={getNodeState}
        getNodeProgress={getNodeProgress}
        onSelectNode={handleSelectNode}
        onBack={() => setCurrentSection('home')}
        onReset={resetProgress}
      />
    );
  }

  // Tela de Stories
  if (currentSection === 'stories') {
    if (currentStorySection === 'player' && selectedSeriesId) {
      return (
        <EpisodePlayer
          seriesId={selectedSeriesId}
          onBack={handleBackFromPlayer}
          progress={progress}
          onUpdateProgress={updateStoryProgress}
        />
      );
    }
    
    return (
      <StoriesHub
        onSelectSeries={handleSelectSeries}
        onBack={handleBackFromHub}
        progress={progress}
      />
    );
  }

  // Layout com navegação adaptativa
  return (
    <Layout
      currentSection={currentSection}
      onNavigate={handleNavigate}
      user={userData}
      progress={progress}
      onLogout={logout}
    >
      {/* Home */}
      {currentSection === 'home' && (
        <HomeScreen
          user={userData}
          progress={progress}
          nextLesson={getNextLessonInfo()}
          onStartLesson={handleStartLesson}
          onNavigate={handleNavigate}
        />
      )}

      {/* Stats */}
      {currentSection === 'stats' && (
        <div className="min-h-screen p-4 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Estatísticas</h1>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-slate-500">Em breve: gráficos de progresso, tempo de estudo, palavras aprendidas...</p>
          </div>
        </div>
      )}

      {/* Training */}
      {currentSection === 'training' && (
        <div className="min-h-screen p-4 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Treino Rápido</h1>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-slate-500">Em breve: revisão de palavras erradas, flashcards, exercícios de reforço...</p>
          </div>
        </div>
      )}

      {/* Profile */}
      {currentSection === 'profile' && (
        <div className="min-h-screen p-4 md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Perfil</h1>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {userData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{userData.name}</h2>
                <p className="text-slate-500">{userData.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-600">{progress.xp}</p>
                <p className="text-slate-500 text-sm">XP Total</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-slate-900">{progress.streak}</p>
                <p className="text-slate-500 text-sm">Streak</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-cyan-500">{progress.diamonds}</p>
                <p className="text-slate-500 text-sm">Diamantes</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full py-3 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition-colors"
            >
              Sair da conta
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Splash primeiro (carregando o app)
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // Depois login, depois home
  return (
    <AuthGate>
      <AppContent />
    </AuthGate>
  );
}