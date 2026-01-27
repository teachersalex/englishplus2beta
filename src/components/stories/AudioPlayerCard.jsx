import { motion } from 'framer-motion';
import { COLORS } from '../../tokens';

/**
 * AudioPlayerCard
 * UI do player de áudio
 * Responsabilidade única: renderizar controles visuais de áudio
 */

export function AudioPlayerCard({
  // Episode data
  coverImage,
  title,
  duration: episodeDuration,
  audioUrl,
  // Audio state (from useAudioPlayer)
  audioRef,
  isPlaying,
  progress,
  audioDuration,
  progressPercent,
  playbackRate,
  speeds,
  // Audio actions
  togglePlay,
  onSeek,
  onSkip,
  setPlaybackRate,
  setIsPlaying,
  onTimeUpdate,
  onLoadedMetadata,
  formatTime,
}) {
  const handleSeekClick = (e) => {
    if (!audioDuration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl overflow-hidden mb-4"
      style={{ 
        backgroundColor: COLORS.surface, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Cover + Info */}
      <div className="flex gap-4 p-4">
        <img
          src={coverImage}
          alt={title}
          className={`w-20 h-20 rounded-xl object-cover flex-shrink-0 transition-transform duration-500 ${
            isPlaying ? 'scale-105' : ''
          }`}
          style={{
            boxShadow: isPlaying ? '0 8px 24px rgba(59, 130, 246, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-lg truncate" style={{ color: COLORS.text }}>
            {title}
          </h2>
          <p className="text-sm" style={{ color: COLORS.textMuted }}>
            {episodeDuration}
          </p>
        </div>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Controls Container */}
      <div className="px-4 pb-4">
        {/* Progress Bar */}
        <div 
          className="h-2 rounded-full cursor-pointer mb-3 group"
          style={{ backgroundColor: COLORS.border }}
          onClick={handleSeekClick}
        >
          <motion.div
            className="h-full rounded-full relative"
            style={{ 
              width: `${progressPercent}%`,
              backgroundColor: COLORS.primary,
            }}
          >
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
            />
          </motion.div>
        </div>

        {/* Time Display */}
        <div className="flex justify-between text-xs mb-4" style={{ color: COLORS.textMuted }}>
          <span>{formatTime(progress)}</span>
          <span>{formatTime(audioDuration)}</span>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => onSkip(-5)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-105"
            style={{ backgroundColor: COLORS.primaryLight, color: COLORS.primary }}
          >
            -5s
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
            style={{ 
              backgroundColor: COLORS.primary,
              boxShadow: '0 8px 24px -4px rgba(59, 130, 246, 0.5)',
            }}
          >
            {isPlaying ? (
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </motion.button>

          <button
            onClick={() => onSkip(5)}
            className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all hover:scale-105"
            style={{ backgroundColor: COLORS.primaryLight, color: COLORS.primary }}
          >
            +5s
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center justify-center gap-2">
          {speeds.map((speed) => (
            <button
              key={speed}
              onClick={() => setPlaybackRate(speed)}
              className="px-3 py-1.5 rounded-lg text-sm font-bold transition-all"
              style={{
                backgroundColor: playbackRate === speed ? COLORS.primary : COLORS.primaryLight,
                color: playbackRate === speed ? 'white' : COLORS.primary,
              }}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default AudioPlayerCard;
