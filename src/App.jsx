/**
 * App.jsx
 * EnglishPlus 2.0 - Arquitetura de Conquistas Redesenhada
 * 
 * FLUXO DE CONQUISTAS:
 * 1. completeLevel() detecta e adiciona em PENDING
 * 2. LessonRunner mostra modal da primeira (mais prioritária)
 * 3. Após celebrar, celebrateAchievement() move para EARNED
 * 4. Badge na Home só mostra EARNED
 */

import { useState } from 'react';
import { AuthGate } from './components/auth/AuthGate';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import SplashScreen from './components/shared/SplashScreen';
import Layout from './components/layout/Layout';

// Screens
import HomeScreen from './components/home/HomeScreen';
import MapScreen from './components/map/MapScreen';
import { LessonRunner } from './components/lesson/LessonRunner';
import ProfileScreen from './components/profile/ProfileScreen';
import StatsScreen from './components/stats/StatsScreen';
import TrainingScreen from './components/training/TrainingScreen';
import WorldSelect from './components/world/WorldSelect'; // NOVO

// Stories
import StoriesHub from './components/stories/StoriesHub';
import EpisodePlayer from './components/stories/EpisodePlayer';

// Data - loader centralizado
import { nodesData, NODE_COUNT } from './data/nodes';

function AppContent() {
  const { user, logout } = useAuth();
  const [currentSection, setCurrentSection] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isInLesson, setIsInLesson] = useState(false);
  
  // Stories state
  const [currentStorySection, setCurrentStorySection] = useState('hub');
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);

  // Sistema de progressão
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
    celebrateAchievement,
  } = useProgress(user);

  // Dados do usuário
  const userData = {
    name: user?.displayName || user?.email?.split('@')[0] || 'Aluno',
    email: user?.email,
    plan: 'Pro',
  };

  // Encontra próxima lição disponível
  const getNextLessonInfo = () => {
    for (let i = 1; i <= NODE_COUNT; i++) {
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
          nodeId: nodeId,
          title: node.title,
          theme: node.theme,
          tip: node.tip,
          lore: node.lore,
          activities: level.activities,
          currentRound: currentRound,
          totalRounds: 3,
        }}
        onComplete={async (result) => {
          const { newlyUnlocked } = await completeLevel(nodeId, level.id, {
            accuracy: result.accuracy || 0,
            xpEarned: result.xp || 0,
            earnedDiamond: result.earnedDiamond || false,
          });
          return { newlyUnlocked };
        }}
        onCelebrateAchievement={celebrateAchievement}
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

  // === RENDER SCREENS ===

  // WorldSelect (fullscreen) — NOVO
  if (currentSection === 'adventure') {
    return (
      <WorldSelect
        onSelectWorld={() => setCurrentSection('map')}
        onBack={() => setCurrentSection('home')}
      />
    );
  }

  // Mapa (fullscreen)
  if (currentSection === 'map') {
    return (
      <MapScreen
        onSelectNode={handleSelectNode}
        getNodeState={getNodeState}
        getNodeProgress={getNodeProgress}
        onBack={() => setCurrentSection('adventure')}
        onReset={resetProgress}
      />
    );
  }

  // Stories (fullscreen)
  if (currentSection === 'stories') {
    if (currentStorySection === 'player' && selectedSeriesId) {
      return (
        <EpisodePlayer
          seriesId={selectedSeriesId}
          onBack={handleBackFromPlayer}
          progress={progress}
          onUpdateProgress={updateStoryProgress}
          onCelebrateAchievement={celebrateAchievement}
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

  // Layout com navegação (home, stats, training, profile)
  return (
    <Layout
      currentSection={currentSection}
      onNavigate={handleNavigate}
      user={userData}
      progress={progress}
      onLogout={logout}
    >
      {currentSection === 'home' && (
        <HomeScreen
          user={userData}
          progress={progress}
          nextLesson={getNextLessonInfo()}
          onStartLesson={handleStartLesson}
          onNavigate={handleNavigate}
        />
      )}

      {currentSection === 'stats' && <StatsScreen />}

      {currentSection === 'training' && <TrainingScreen />}

      {currentSection === 'profile' && (
        <ProfileScreen
          user={userData}
          progress={progress}
          onLogout={logout}
        />
      )}
    </Layout>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <AuthGate>
      <AppContent />
    </AuthGate>
  );
}