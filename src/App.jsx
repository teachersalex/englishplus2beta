/**
 * App.jsx
 * EnglishPlus 2.0 - Arquitetura de Conquistas Redesenhada
 * 
 * "A simplicidade é a sofisticação máxima."
 *  — Leonardo da Vinci
 * 
 * FLUXO DE CONQUISTAS:
 * 1. completeLevel() detecta e adiciona em PENDING
 * 2. LessonRunner mostra modal da primeira (mais prioritária)
 * 3. Após celebrar, celebrateAchievement() move para EARNED
 * 4. Badge na Home só mostra EARNED
 * 
 * UX FIXES:
 * - Scroll to top em mudança de seção
 * - Botão voltar do browser navega dentro do app
 */

import { useState, useEffect, useCallback } from 'react';
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
import WorldSelect from './components/world/WorldSelect';

// Stories
import StoriesHub from './components/stories/StoriesHub';
import EpisodePlayer from './components/stories/EpisodePlayer';

// Data - loader centralizado
import { getMapData } from './data/maps/mapsConfig';

function AppContent() {
  const { user, logout } = useAuth();
  const [currentSection, setCurrentSection] = useState('home');
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isInLesson, setIsInLesson] = useState(false);
  const [currentMapId, setCurrentMapId] = useState(0);
  
  // Stories state
  const [currentStorySection, setCurrentStorySection] = useState('hub');
  const [selectedSeriesId, setSelectedSeriesId] = useState(null);

  // Sistema de progressão
  const { 
    progress,
    loading: progressLoading,
    getNodeState,
    getNodeProgress,
    getNextLevel,
    completeLevel,
    resetProgress,
    updateStoryProgress,
    celebrateAchievement,
  } = useProgress(user);

  // ============================================
  // SCROLL TO TOP em mudança de seção
  // ============================================
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection, currentStorySection, isInLesson]);

  // ============================================
  // BROWSER BACK BUTTON - Navega dentro do app
  // ============================================
  const getBackDestination = useCallback(() => {
    // Em lição → volta pro mapa
    if (isInLesson) return { type: 'exitLesson' };
    
    // Em mapa → volta pro world select
    if (currentSection === 'map') return { type: 'section', to: 'adventure' };
    
    // Em world select → volta pra home
    if (currentSection === 'adventure') return { type: 'section', to: 'home' };
    
    // Em stories player → volta pro hub
    if (currentSection === 'stories' && currentStorySection === 'player') {
      return { type: 'storiesHub' };
    }
    
    // Em stories hub → volta pra home
    if (currentSection === 'stories' && currentStorySection === 'hub') {
      return { type: 'section', to: 'home' };
    }
    
    // Em outras seções (stats, training, profile) → volta pra home
    if (currentSection !== 'home') return { type: 'section', to: 'home' };
    
    // Já está na home → não faz nada (deixa o browser sair se quiser)
    return null;
  }, [currentSection, currentStorySection, isInLesson]);

  useEffect(() => {
    // Push state inicial
    const pushState = () => {
      window.history.pushState({ app: true }, '');
    };

    // Handler do botão voltar
    const handlePopState = (e) => {
      const destination = getBackDestination();
      
      if (!destination) {
        // Está na home, deixa sair
        return;
      }
      
      // Previne saída do app
      pushState();
      
      // Navega internamente
      switch (destination.type) {
        case 'exitLesson':
          setIsInLesson(false);
          setCurrentLesson(null);
          setCurrentSection('map');
          break;
        case 'storiesHub':
          setCurrentStorySection('hub');
          setSelectedSeriesId(null);
          break;
        case 'section':
          setCurrentSection(destination.to);
          break;
      }
    };

    // Setup inicial
    pushState();
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [getBackDestination]);

  // Dados do usuário
  const userData = {
    name: user?.displayName || user?.email?.split('@')[0] || 'Aluno',
    email: user?.email,
    plan: 'Pro',
  };

  // Encontra próxima lição disponível
  const getNextLessonInfo = () => {
    const mapData = getMapData(currentMapId);
    if (!mapData) return { title: 'Tudo completo!', module: 'Parabéns!', theme: '' };
    
    const nodeCount = mapData.nodes?.length || 10;
    
    for (let i = 1; i <= nodeCount; i++) {
      const state = getNodeState(currentMapId, i);
      if (state === 'unlocked' || state === 'in_progress') {
        const node = mapData.nodesData?.[i];
        if (node?.levels) {
          const nextLevel = getNextLevel(currentMapId, i, node.levels);
          if (nextLevel) {
            return {
              nodeId: i,
              title: node.title,
              module: `${getNodeProgress(currentMapId, i) + 1}/3`,
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

  // Inicia lição de um node específico (usa mapa atual)
  const startNodeLesson = (nodeId) => {
    const mapData = getMapData(currentMapId);
    if (!mapData) return;
    
    const node = mapData.nodesData?.[nodeId];
    if (!node) return;

    const nextLevel = getNextLevel(currentMapId, nodeId, node.levels);
    if (!nextLevel) return;

    setCurrentLesson({
      nodeId: nodeId,
      mapId: currentMapId,
      node: node,
      level: nextLevel,
      currentRound: getNodeProgress(currentMapId, nodeId) + 1,
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
    const { nodeId, mapId, node, level, currentRound } = currentLesson;
    
    return (
      <LessonRunner
        lesson={{
          id: level.id,
          nodeId: nodeId,
          mapId: mapId,
          title: node.title,
          theme: node.theme,
          tip: node.tip,
          lore: node.lore,
          activities: level.activities,
          currentRound: currentRound,
          totalRounds: 3,
        }}
        onComplete={async (result) => {
          const { newlyUnlocked } = await completeLevel(mapId, nodeId, level.id, {
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
    const state = getNodeState(currentMapId, nodeId);
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

  // WorldSelect (fullscreen)
  if (currentSection === 'adventure') {
    return (
      <WorldSelect
        onSelectWorld={(mapId) => {
          setCurrentMapId(mapId);
          setCurrentSection('map');
        }}
        onBack={() => setCurrentSection('home')}
      />
    );
  }

  // Mapa (fullscreen)
  if (currentSection === 'map') {
    return (
      <MapScreen
        mapId={currentMapId}
        onSelectNode={handleSelectNode}
        getNodeState={(nodeId) => getNodeState(currentMapId, nodeId)}
        getNodeProgress={(nodeId) => getNodeProgress(currentMapId, nodeId)}
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