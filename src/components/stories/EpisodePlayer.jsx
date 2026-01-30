/**
 * EpisodePlayer.jsx
 * Player de histórias com sistema de conquistas (v2 - Anti-Colisão)
 * 
 * "O jogador só vê a magia. Nunca a engrenagem."
 *  — Alex Santos
 * 
 * FLUXO:
 * 1. Usuário verifica transcrição → mostra diff
 * 2. Clica "Próximo" → detecta conquistas com processLessonComplete()
 * 3. Celebra UMA conquista (por prioridade)
 * 4. Resto vai pra pendingAchievements
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../tokens';
import { thresholds } from '../../data/gameSchema';
import { calculateDiff } from '../../utils/dictationDiff';
import { seriesById } from '../../data/stories';
import { processLessonComplete, ALL_ACHIEVEMENTS } from '../../data/achievementsData';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import AudioPlayerCard from './AudioPlayerCard';
import DictationArea from './DictationArea';
import DiamondCelebrationModal from '../lesson/DiamondCelebrationModal';
import AchievementCelebrationModal from '../achievements/AchievementCelebrationModal';
import { SavingOverlay } from '../feedback/SavingOverlay';
import EpisodeCompletedModal from './EpisodeCompletedModal';

const playPopSound = () => {
  try {
    const popAudio = new Audio('/audio/pop_sfx.mp3');
    popAudio.volume = 0.5;
    popAudio.play().catch(() => {});
  } catch (e) {}
};

export default function EpisodePlayer({ 
  seriesId, 
  onBack, 
  progress,
  onUpdateProgress,
  onCelebrateAchievement,
  // Props para sistema anti-colisão (opcional - pega do progress se não passar)
  earnedAchievements,
  pendingAchievements,
}) {
  const series = seriesById[seriesId];
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  
  const [celebrationPhase, setCelebrationPhase] = useState('dictation');
  const [savingMessage, setSavingMessage] = useState('');
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [episodeModalData, setEpisodeModalData] = useState(null);
  
  // Flag para saber qual celebração mostrar quando clicar em Próximo
  const [pendingCelebration, setPendingCelebration] = useState(null);
  
  // Ref para dados de celebração (evita re-renders)
  const celebrationDataRef = useRef({
    achievementToCelebrate: null,
    newEarnedIds: [],
    newPendingIds: [],
    updatedProgress: null,
  });

  const episode = series?.episodes?.[currentEpisodeIndex];
  const totalEpisodes = series?.episodes?.length || 0;
  const isLastEpisode = currentEpisodeIndex >= totalEpisodes - 1;

  const audio = useAudioPlayer(episode?.audioUrl);

  const isModalActive = celebrationPhase !== 'dictation';
  
  // Pega listas do progress se não foram passadas como props
  const currentEarnedAchievements = earnedAchievements || progress?.earnedAchievements || [];
  const currentPendingAchievements = pendingAchievements || progress?.pendingAchievements || [];

  useEffect(() => {
    setFeedback(null);
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    setEpisodeModalData(null);
    setPendingCelebration(null);
    celebrationDataRef.current = {
      achievementToCelebrate: null,
      newEarnedIds: [],
      newPendingIds: [],
      updatedProgress: null,
    };
  }, [currentEpisodeIndex, seriesId]);

  /**
   * handleCheck - Quando usuário clica "Verificar"
   * 
   * NÃO abre modal automaticamente
   * Apenas salva os dados e aguarda usuário clicar "Próximo"
   */
  const handleCheck = async (userText) => {
    if (!userText.trim() || !episode) return;

    const result = calculateDiff(episode.text, userText, episode.title);
    setFeedback(result); // Mostra o diff para o aluno VER

    const storyProgress = progress?.storyProgress?.[seriesId] || {};
    const previousBest = storyProgress.scores?.[episode.id] || 0;
    const completedCount = Object.keys(storyProgress.scores || {}).length + 
      (storyProgress.scores?.[episode.id] ? 0 : 1);
    
    const allScores = { 
      ...(storyProgress.scores || {}), 
      [episode.id]: Math.max(result.score, previousBest) 
    };
    const scoresArray = Object.values(allScores);
    const currentAverage = Math.round(
      scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length
    );

    const willEarnDiamond = completedCount >= totalEpisodes && 
                            currentAverage >= thresholds.diamond && 
                            !storyProgress.hasDiamond;
    
    // Prepara dados do modal (mas NÃO abre ainda)
    setEpisodeModalData({
      score: result.score,
      episodeTitle: episode.title,
      episodeNumber: completedCount,
      totalEpisodes,
      seriesTitle: series.title,
      isNewRecord: result.score > previousBest,
      previousBest,
      seriesAverage: currentAverage,
      isSeriesComplete: completedCount >= totalEpisodes,
      earnedDiamond: willEarnDiamond,
    });

    // Marca qual celebração mostrar DEPOIS
    setPendingCelebration(willEarnDiamond ? 'diamond' : 'episode');

    // Salva progresso em background
    let updatedProgress = progress;
    if (onUpdateProgress) {
      try {
        const updateResult = await onUpdateProgress(
          seriesId, 
          episode.id, 
          result.score, 
          totalEpisodes
        );
        
        // Pega progress atualizado
        if (updateResult?.progress) {
          updatedProgress = updateResult.progress;
        }
      } catch (e) {
        console.error('Erro ao salvar progresso:', e);
      }
    }

    // === SISTEMA ANTI-COLISÃO ===
    // Detecta conquistas com prioridade
    const { celebrate, newEarned, newPending } = processLessonComplete(
      currentEarnedAchievements,
      currentPendingAchievements,
      updatedProgress
    );

    // Guarda para usar depois
    celebrationDataRef.current = {
      achievementToCelebrate: celebrate,
      newEarnedIds: newEarned,
      newPendingIds: newPending,
      updatedProgress,
    };

    if (celebrate) {
      setCurrentAchievement(celebrate);
    }
  };

  const handleDiamondComplete = () => {
    setCelebrationPhase('episode');
  };

  /**
   * handleAchievementComplete - Achievement modal fechou
   * Salva a conquista celebrada e as filas atualizadas
   */
  const handleAchievementComplete = async () => {
    const { achievementToCelebrate, newEarnedIds, newPendingIds } = celebrationDataRef.current;
    
    if (achievementToCelebrate && onCelebrateAchievement) {
      setSavingMessage('Registrando conquista...');
      setCelebrationPhase('saving');
      
      try {
        // Novo formato: passa objeto com todas as listas
        await onCelebrateAchievement({
          celebratedId: achievementToCelebrate.id,
          newEarnedIds,
          newPendingIds,
        });
      } catch (e) {
        console.error('Erro ao registrar conquista:', e);
      }
      
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    playPopSound();
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    setPendingCelebration(null);
    celebrationDataRef.current = {
      achievementToCelebrate: null,
      newEarnedIds: [],
      newPendingIds: [],
      updatedProgress: null,
    };
    
    if (!isLastEpisode) {
      setCurrentEpisodeIndex(prev => prev + 1);
    } else {
      onBack?.();
    }
  };

  const handleRetry = () => {
    playPopSound();
    setFeedback(null);
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    setEpisodeModalData(null);
    setPendingCelebration(null);
    celebrationDataRef.current = {
      achievementToCelebrate: null,
      newEarnedIds: [],
      newPendingIds: [],
      updatedProgress: null,
    };
  };

  /**
   * handleNext - Usuário clica "Próximo Episódio" no DictationArea
   * AGORA sim abre o modal de celebração
   */
  const handleNext = async () => {
    playPopSound();
    
    // Agora que usuário viu o feedback, mostra a celebração
    if (pendingCelebration === 'diamond') {
      setCelebrationPhase('diamond');
      setPendingCelebration(null);
      return;
    }
    
    if (pendingCelebration === 'episode') {
      setCelebrationPhase('episode');
      setPendingCelebration(null);
      return;
    }
    
    // Se tem achievement pendente
    const { achievementToCelebrate } = celebrationDataRef.current;
    if (achievementToCelebrate) {
      setCelebrationPhase('achievement');
      return;
    }
    
    // Sem celebração pendente, avança direto
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    
    if (!isLastEpisode) {
      setCurrentEpisodeIndex(prev => prev + 1);
    } else {
      onBack?.();
    }
  };

  const handleBackToSeries = () => {
    playPopSound();
    
    const { achievementToCelebrate } = celebrationDataRef.current;
    if (achievementToCelebrate) {
      setCelebrationPhase('achievement');
      return;
    }
    
    setCelebrationPhase('dictation');
    setPendingCelebration(null);
    onBack?.();
  };

  // Handlers do modal (separados do DictationArea)
  const handleModalNext = () => {
    playPopSound();
    
    const { achievementToCelebrate } = celebrationDataRef.current;
    if (achievementToCelebrate) {
      setCelebrationPhase('achievement');
      return;
    }
    
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    setPendingCelebration(null);
    
    if (!isLastEpisode) {
      setCurrentEpisodeIndex(prev => prev + 1);
    } else {
      onBack?.();
    }
  };

  const handleModalBackToSeries = () => {
    playPopSound();
    
    const { achievementToCelebrate } = celebrationDataRef.current;
    if (achievementToCelebrate) {
      setCelebrationPhase('achievement');
      return;
    }
    
    setCelebrationPhase('dictation');
    setPendingCelebration(null);
    onBack?.();
  };

  const handleModalRetry = () => {
    playPopSound();
    setFeedback(null);
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    setEpisodeModalData(null);
    setPendingCelebration(null);
    celebrationDataRef.current = {
      achievementToCelebrate: null,
      newEarnedIds: [],
      newPendingIds: [],
      updatedProgress: null,
    };
  };

  if (!series || !episode) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.background }}>
        <p style={{ color: COLORS.textMuted }}>Série não encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-10 px-4 py-3"
        style={{ backgroundColor: COLORS.text }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            disabled={isModalActive}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-center">
            <p className="text-xs font-medium text-white/60">{series.title}</p>
            <p className="font-bold text-sm text-white">
              Episódio {currentEpisodeIndex + 1} de {totalEpisodes}
            </p>
          </div>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-4">
        <AudioPlayerCard
          coverImage={series.coverImage}
          title={episode.title}
          duration={episode.duration}
          audioUrl={episode.audioUrl}
          audioRef={audio.audioRef}
          isPlaying={audio.isPlaying}
          progress={audio.progress}
          audioDuration={audio.duration}
          progressPercent={audio.progressPercent}
          playbackRate={audio.playbackRate}
          speeds={audio.speeds}
          togglePlay={audio.togglePlay}
          onSeek={audio.seek}
          onSkip={audio.skip}
          setPlaybackRate={audio.setPlaybackRate}
          setIsPlaying={audio.setIsPlaying}
          onTimeUpdate={audio.handleTimeUpdate}
          onLoadedMetadata={audio.handleLoadedMetadata}
          formatTime={audio.formatTime}
        />

        <AnimatePresence mode="wait">
          <DictationArea
            key={currentEpisodeIndex}
            feedback={feedback}
            onCheck={handleCheck}
            onRetry={handleRetry}
            onNext={handleNext}
            isLastEpisode={isLastEpisode}
            disabled={isModalActive}
          />
        </AnimatePresence>

        {/* Episode List */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm" style={{ color: COLORS.text }}>
              Todos os Episódios
            </h3>
            
            {progress?.storyProgress?.[seriesId]?.average && (
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: COLORS.textMuted }}>Média:</span>
                <span 
                  className="text-sm font-bold px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: progress.storyProgress[seriesId].average >= thresholds.diamond 
                      ? COLORS.successLight 
                      : progress.storyProgress[seriesId].average >= 70 
                        ? COLORS.warningLight 
                        : '#F1F5F9',
                    color: progress.storyProgress[seriesId].average >= thresholds.diamond 
                      ? COLORS.success 
                      : progress.storyProgress[seriesId].average >= 70 
                        ? COLORS.warning 
                        : COLORS.textMuted,
                  }}
                >
                  {progress.storyProgress[seriesId].hasDiamond && '💎 '}
                  {progress.storyProgress[seriesId].average}%
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {series.episodes.map((ep, idx) => {
              const isActive = idx === currentEpisodeIndex;
              const episodeScore = progress?.storyProgress?.[seriesId]?.scores?.[ep.id];
              const hasScore = episodeScore !== undefined;
              
              return (
                <motion.button
                  key={ep.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isModalActive && setCurrentEpisodeIndex(idx)}
                  disabled={isModalActive}
                  className="w-full p-3 rounded-xl flex items-center gap-3 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  style={{ 
                    backgroundColor: isActive ? COLORS.primaryLight : COLORS.surface,
                    border: isActive ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ 
                      backgroundColor: hasScore 
                        ? (episodeScore >= thresholds.diamond ? COLORS.success : episodeScore >= 70 ? COLORS.warning : COLORS.border)
                        : (isActive ? COLORS.primary : COLORS.border),
                      color: hasScore || isActive ? 'white' : COLORS.textMuted,
                    }}
                  >
                    {hasScore ? `${episodeScore}` : idx + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm" style={{ color: COLORS.text }}>{ep.title}</p>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>
                      {ep.duration}
                      {hasScore && episodeScore >= thresholds.diamond && ' • ⭐ Excelente'}
                    </p>
                  </div>
                  {isActive && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full" 
                      style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                      Atual
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="h-20 md:h-8" />
      </main>

      {/* BLOQUEADOR DE CLIQUES - z-40 fica ABAIXO dos modals (z-50) */}
      <AnimatePresence>
        {isModalActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </AnimatePresence>

      {/* === CELEBRATION MODALS (z-50) === */}

      <SavingOverlay 
        isVisible={celebrationPhase === 'saving'} 
        message={savingMessage} 
      />

      <DiamondCelebrationModal
        isOpen={celebrationPhase === 'diamond'}
        onComplete={handleDiamondComplete}
      />

      <AchievementCelebrationModal
        isOpen={celebrationPhase === 'achievement'}
        onComplete={handleAchievementComplete}
        achievement={currentAchievement}
      />
      
      {episodeModalData && (
        <EpisodeCompletedModal
          isOpen={celebrationPhase === 'episode'}
          onClose={() => setCelebrationPhase('dictation')}
          onNextEpisode={handleModalNext}
          onBackToSeries={handleModalBackToSeries}
          onRetry={handleModalRetry}
          {...episodeModalData}
        />
      )}
    </div>
  );
}