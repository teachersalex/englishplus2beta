/**
 * EpisodePlayer.jsx
 * Player de histórias com sistema de conquistas
 * 
 * FLUXO: Mesmo do LessonRunner
 * 1. Completa ditado → updateStoryProgress detecta conquistas
 * 2. Se diamond → DiamondModal primeiro
 * 3. Se achievement → AchievementModal
 * 4. Celebra → move para EARNED → EpisodeCompletedModal
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../tokens';
import { thresholds } from '../../data/gameSchema';
import { calculateDiff } from '../../utils/dictationDiff';
import { seriesById } from '../../data/stories';
import { getAchievementById } from '../../data/achievementsData';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import AudioPlayerCard from './AudioPlayerCard';
import DictationArea from './DictationArea';
import DiamondCelebrationModal from '../lesson/DiamondCelebrationModal';
import AchievementCelebrationModal from '../achievements/AchievementCelebrationModal';
import { SavingOverlay } from '../feedback/SavingOverlay';
import EpisodeCompletedModal from './EpisodeCompletedModal';

const MODAL_DELAY = 500; // Tempo curto para ver o diff antes do modal

// Som pop para transições
const playPopSound = () => {
  try {
    const popAudio = new Audio('/audio/pop_sfx.mp3');
    popAudio.volume = 0.6;
    popAudio.play().catch(() => {});
  } catch (e) {}
};

export default function EpisodePlayer({ 
  seriesId, 
  onBack, 
  progress,
  onUpdateProgress,
  onCelebrateAchievement,
}) {
  const series = seriesById[seriesId];
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  
  // Estados de celebração
  const [celebrationPhase, setCelebrationPhase] = useState('dictation');
  // Phases: 'dictation' | 'diamond' | 'saving' | 'achievement' | 'episode'
  
  const [savingMessage, setSavingMessage] = useState('');
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [episodeModalData, setEpisodeModalData] = useState(null);
  const [achievementIdToSave, setAchievementIdToSave] = useState(null);

  const episode = series?.episodes?.[currentEpisodeIndex];
  const totalEpisodes = series?.episodes?.length || 0;
  const isLastEpisode = currentEpisodeIndex >= totalEpisodes - 1;

  const audio = useAudioPlayer(episode?.audioUrl);

  // Reset quando muda de episódio
  useEffect(() => {
    setFeedback(null);
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    setEpisodeModalData(null);
    setAchievementIdToSave(null);
  }, [currentEpisodeIndex, seriesId]);

  // Verificar ditado
  const handleCheck = async (userText) => {
    if (!userText.trim() || !episode) return;

    const result = calculateDiff(episode.text, userText, episode.title);
    setFeedback(result);

    // Dados atuais (LOCAL - não espera Firestore)
    const storyProgress = progress?.storyProgress?.[seriesId] || {};
    const previousBest = storyProgress.scores?.[episode.id] || 0;
    const completedCount = Object.keys(storyProgress.scores || {}).length + 
      (storyProgress.scores?.[episode.id] ? 0 : 1);
    
    // Calcula média LOCAL
    const allScores = { 
      ...(storyProgress.scores || {}), 
      [episode.id]: Math.max(result.score, previousBest) 
    };
    const scoresArray = Object.values(allScores);
    const currentAverage = Math.round(
      scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length
    );

    // Checa se VAI ganhar diamante (cálculo local)
    const willEarnDiamond = completedCount >= totalEpisodes && 
                            currentAverage >= 90 && 
                            !storyProgress.hasDiamond;
    
    // Dados pro modal (IMEDIATO - não espera salvamento)
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

    // Mostra modal RÁPIDO (delay curto só pra ver o diff)
    setTimeout(() => {
      if (willEarnDiamond) {
        setCelebrationPhase('diamond');
      } else {
        setCelebrationPhase('episode');
      }
    }, MODAL_DELAY);

    // Salva em PARALELO (não bloqueia o modal)
    if (onUpdateProgress) {
      try {
        const updateResult = await onUpdateProgress(
          seriesId, 
          episode.id, 
          result.score, 
          totalEpisodes
        );
        
        // Se detectou conquista, guarda pra mostrar depois
        if (updateResult?.newlyUnlocked?.length > 0) {
          const achievementId = updateResult.newlyUnlocked[0];
          const achievement = getAchievementById(achievementId);
          setCurrentAchievement(achievement);
          setAchievementIdToSave(achievementId);
        }
      } catch (e) {
        console.error('Erro ao salvar progresso:', e);
      }
    }
  };

  // Diamond modal fechou - vai pro episode modal
  const handleDiamondComplete = () => {
    setCelebrationPhase('episode');
  };

  // Achievement modal fechou - agora sim avança
  const handleAchievementComplete = async () => {
    if (achievementIdToSave && onCelebrateAchievement) {
      setSavingMessage('Registrando conquista...');
      setCelebrationPhase('saving');
      
      await onCelebrateAchievement(achievementIdToSave);
      
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    playPopSound();
    
    // Limpa e avança
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    setAchievementIdToSave(null);
    
    if (!isLastEpisode) {
      setCurrentEpisodeIndex(prev => prev + 1);
    } else {
      onBack?.();
    }
  };

  // Retry
  const handleRetry = () => {
    playPopSound();
    setFeedback(null);
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    setAchievementIdToSave(null);
  };

  // Next episode - checa se tem conquista pendente
  const handleNext = async () => {
    playPopSound();
    
    // Se tem conquista pendente, mostra modal antes de avançar
    if (currentAchievement && achievementIdToSave) {
      setCelebrationPhase('achievement');
      return;
    }
    
    setCelebrationPhase('dictation');
    setCurrentAchievement(null);
    
    if (!isLastEpisode) {
      setCurrentEpisodeIndex(prev => prev + 1);
    } else {
      onBack?.();
    }
  };

  // Back to series - checa se tem conquista pendente
  const handleBackToSeries = () => {
    playPopSound();
    
    // Se tem conquista pendente, mostra modal antes de voltar
    if (currentAchievement && achievementIdToSave) {
      setCelebrationPhase('achievement');
      return;
    }
    
    setCelebrationPhase('dictation');
    onBack?.();
  };

  // Guard
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
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
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
                  onClick={() => setCurrentEpisodeIndex(idx)}
                  className="w-full p-3 rounded-xl flex items-center gap-3 transition-colors"
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

      {/* === CELEBRATION MODALS === */}

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
          onNextEpisode={handleNext}
          onBackToSeries={handleBackToSeries}
          onRetry={handleRetry}
          {...episodeModalData}
        />
      )}
    </div>
  );
}