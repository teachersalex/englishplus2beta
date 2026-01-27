import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../tokens';
import { thresholds } from '../../data/gameSchema';
import { calculateDiff } from '../../utils/dictationDiff';
import { seriesById } from '../../data/stories';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import AudioPlayerCard from './AudioPlayerCard';
import DictationArea from './DictationArea';
import DiamondCelebrationModal from '../lesson/DiamondCelebrationModal';
import EpisodeCompletedModal from './EpisodeCompletedModal';

/**
 * EpisodePlayer
 * Orquestrador: coordena player, ditado, progresso e modals
 * Responsabilidade única: gerenciar fluxo entre componentes
 */

export default function EpisodePlayer({ 
  seriesId, 
  onBack, 
  onComplete,
  progress,
  onUpdateProgress,
}) {
  const series = seriesById[seriesId];
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showDiamondModal, setShowDiamondModal] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [episodeModalData, setEpisodeModalData] = useState(null);

  const episode = series?.episodes?.[currentEpisodeIndex];
  const totalEpisodes = series?.episodes?.length || 0;
  const isLastEpisode = currentEpisodeIndex >= totalEpisodes - 1;

  // Audio player hook
  const audio = useAudioPlayer(episode?.audioUrl);

  // Reset quando muda de episódio
  useEffect(() => {
    setFeedback(null);
    setShowEpisodeModal(false);
    setEpisodeModalData(null);
  }, [currentEpisodeIndex, seriesId]);

  // Verificar ditado
  const handleCheck = (userText) => {
    if (!userText.trim() || !episode) return;

    const result = calculateDiff(episode.text, userText, episode.title);
    setFeedback(result);

    // Salvar progresso
    let earnedDiamond = false;
    let progressResult = null;
    
    if (onUpdateProgress) {
      progressResult = onUpdateProgress(seriesId, episode.id, result.score, totalEpisodes);
      earnedDiamond = progressResult?.earnedDiamond || false;
    }
    
    // Dados para o modal
    const storyProgress = progress?.stories?.[seriesId] || {};
    const completedCount = Object.keys(storyProgress.bestScores || {}).length + (storyProgress.bestScores?.[episode.id] ? 0 : 1);
    const previousBest = storyProgress.bestScores?.[episode.id] || 0;
    
    // Calcula média atual
    const allScores = { ...(storyProgress.bestScores || {}), [episode.id]: Math.max(result.score, previousBest) };
    const scoresArray = Object.values(allScores);
    const currentAverage = scoresArray.length > 0 
      ? Math.round(scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length)
      : null;
    
    setEpisodeModalData({
      score: result.score,
      episodeTitle: episode.title,
      episodeNumber: completedCount,
      totalEpisodes: totalEpisodes,
      seriesTitle: series.title,
      isNewRecord: result.score > previousBest,
      previousBest: previousBest,
      seriesAverage: currentAverage,
      isSeriesComplete: completedCount >= totalEpisodes,
      earnedDiamond: earnedDiamond,
    });
    
    setShowEpisodeModal(true);
    
    if (earnedDiamond) {
      setTimeout(() => {
        setShowEpisodeModal(false);
        setShowDiamondModal(true);
      }, 2000);
    }
  };

  // Retry
  const handleRetry = () => {
    setFeedback(null);
    setShowEpisodeModal(false);
  };

  // Play pop sound
  const playPopSound = () => {
    try {
      const popAudio = new Audio('/audio/pop_sfx.mp3');
      popAudio.volume = 0.6;
      popAudio.play().catch(() => {});
    } catch (e) {}
  };

  // Next episode
  const handleNext = () => {
    if (!episodeModalData?.earnedDiamond) {
      playPopSound();
    }
    setShowEpisodeModal(false);
    if (!isLastEpisode) {
      setCurrentEpisodeIndex(prev => prev + 1);
    } else {
      onBack?.();
    }
  };

  // Back to series
  const handleBackToSeries = () => {
    setShowEpisodeModal(false);
    onBack?.();
  };

  // Guard: série não encontrada
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
            <p className="text-xs font-medium text-white/60">
              {series.title}
            </p>
            <p className="font-bold text-sm text-white">
              Episódio {currentEpisodeIndex + 1} de {totalEpisodes}
            </p>
          </div>
          
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto p-4">
        {/* Audio Player */}
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

        {/* Dictation Area */}
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
            
            {/* Média da série */}
            {progress?.stories?.[seriesId]?.average && (
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: COLORS.textMuted }}>
                  Média:
                </span>
                <span 
                  className="text-sm font-bold px-2 py-0.5 rounded-full"
                  style={{ 
                    backgroundColor: progress.stories[seriesId].average >= thresholds.diamond 
                      ? COLORS.successLight 
                      : progress.stories[seriesId].average >= 70 
                        ? COLORS.warningLight 
                        : '#F1F5F9',
                    color: progress.stories[seriesId].average >= thresholds.diamond 
                      ? COLORS.success 
                      : progress.stories[seriesId].average >= 70 
                        ? COLORS.warning 
                        : COLORS.textMuted,
                  }}
                >
                  {progress.stories[seriesId].hasDiamond && '💎 '}
                  {progress.stories[seriesId].average}%
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            {series.episodes.map((ep, idx) => {
              const isActive = idx === currentEpisodeIndex;
              const episodeScore = progress?.stories?.[seriesId]?.bestScores?.[ep.id];
              const hasScore = episodeScore !== undefined;
              
              return (
                <motion.button
                  key={ep.id}
                  whileHover={{ backgroundColor: isActive ? COLORS.primaryLight : COLORS.surfaceHover }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentEpisodeIndex(idx)}
                  className="w-full p-3 rounded-xl flex items-center gap-3 transition-colors"
                  style={{ 
                    backgroundColor: isActive ? COLORS.primaryLight : COLORS.surface,
                    border: isActive ? `2px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
                    boxShadow: isActive ? '0 2px 8px rgba(59, 130, 246, 0.15)' : 'none',
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
                    <p className="font-medium text-sm" style={{ color: COLORS.text }}>
                      {ep.title}
                    </p>
                    <p className="text-xs" style={{ color: COLORS.textMuted }}>
                      {ep.duration}
                      {hasScore && episodeScore >= thresholds.diamond && ' • ⭐ Excelente'}
                    </p>
                  </div>
                  {isActive && (
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: COLORS.primary, color: 'white' }}>
                      Atual
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Spacer mobile */}
        <div className="h-20 md:h-8" />
      </main>

      {/* Diamond Modal */}
      <DiamondCelebrationModal
        isOpen={showDiamondModal}
        onComplete={() => setShowDiamondModal(false)}
      />
      
      {/* Episode Completed Modal */}
      {episodeModalData && (
        <EpisodeCompletedModal
          isOpen={showEpisodeModal && !showDiamondModal}
          onClose={() => setShowEpisodeModal(false)}
          onNextEpisode={handleNext}
          onBackToSeries={handleBackToSeries}
          onRetry={handleRetry}
          {...episodeModalData}
        />
      )}
    </div>
  );
}
