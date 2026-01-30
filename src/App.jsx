/**
 * App.jsx
 * EnglishPlus 2.0 - Sistema Anti-Colisão de Conquistas
 * 
 * "A simplicidade é a sofisticação máxima."
 *  — Leonardo da Vinci
 * 
 * FLUXO DE CONQUISTAS (v2):
 * 1. completeLevel() salva level e retorna progress atualizado
 * 2. LessonRunner usa processLessonComplete() para detectar conquistas
 * 3. Sistema de prioridade decide qual celebrar (nunca 2 ao mesmo tempo)
 * 4. Resto vai pra pendingAchievements (próxima sessão)
 * 5. Badge na Home só mostra earnedAchievements
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
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
  // GUARD ANTI-DUPLO-CLIQUE no completeLevel
  // ============================================
  const completeGuardRef = useRef(false);

  // ============================================
  // SCROLL TO TOP em mudança de seção
  // ============================================
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSection, currentStorySection, isInLesson]);

  // ============================================
  // BROWSER BACK BUTTON - Listener único via ref
  // ============================================
  
  const navRef = useRef({
    currentSection: 'home',
    currentStorySection: 'hub',
    isInLesson: false,
  });

  useEffect(() => {
    navRef.current = { currentSection, currentStorySection, isInLesson };
  }, [currentSection, currentStorySection, isInLesson]);

  const getBackDestination = useCallback(() => {
    const { currentSection, currentStorySection, isInLesson } = navRef.current;

    if (isInLesson) return { type: 'exitLesson' };
    if (currentSection === 'map') return { type: 'section', to: 'adventure' };
    if (currentSection === 'adventure') return { type: 'section', to: 'home' };
    
    if (currentSection === 'stories' && currentStorySection === 'player') {
      return { type: 'storiesHub' };
    }
    if (currentSection === 'stories' && currentStorySection === 'hub') {
      return { type: 'section', to: 'home' };
    }
    if (currentSection !== 'home') return { type: 'section', to: 'home' };
    
    return null;
  }, []);

  useEffect(() => {
    const pushState = () => {
      window.history.pushState({ app: true }, '');
    };

    const handlePopState = () => {
      const destination = getBackDestination();
      
      if (!destination) return;
      
      pushState();
      
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

  // ============================================
  // PRÓXIMA LIÇÃO - Memoizado
  // ============================================
  const nextLessonInfo = useMemo(() => {
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
  }, [currentMapId, progress, getNodeState, getNextLevel, getNodeProgress]);

  // Inicia lição de um node específico
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

  // ============================================
  // TELA DE LIÇÃO (fullscreen) - COM ANTI-COLISÃO
  // ============================================
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
        
        // Dados para o sistema anti-colisão
        earnedAchievements={progress?.earnedAchievements || []}
        pendingAchievements={progress?.pendingAchievements || []}
        currentProgress={progress}
        
        onComplete={async (result) => {
          // Guard anti-duplo-clique
          if (completeGuardRef.current) {
            return { progress: {} };
          }
          completeGuardRef.current = true;

          try {
            const completionResult = await completeLevel(mapId, nodeId, level.id, {
              accuracy: result.accuracy || 0,
              xpEarned: result.xp || 0,
              earnedDiamond: result.earnedDiamond || false,
            });
            
            // Retorna progress atualizado para o LessonRunner
            return { 
              progress: completionResult.progress || progress,
            };
          } catch (err) {
            console.error('completeLevel failed:', err);
            return { progress };
          } finally {
            completeGuardRef.current = false;
          }
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
    if (nextLessonInfo.node && nextLessonInfo.level) {
      startNodeLesson(nextLessonInfo.nodeId);
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
        progress={progress}
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
          nextLesson={nextLessonInfo}
          onStartLesson={handleStartLesson}
          onNavigate={handleNavigate}
          currentMapId={currentMapId}
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