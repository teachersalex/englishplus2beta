import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * useAudioPlayer
 * Hook reutilizável para controle de áudio
 * Responsabilidade única: gerenciar estado e controles de reprodução
 * 
 * FIX: isPlaying agora sincroniza com eventos reais do <audio>
 */

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5];

export function useAudioPlayer(audioSrc) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);

  // Reset quando muda a source
  useEffect(() => {
    setProgress(0);
    setDuration(0); // Reset duration também
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.pause();
    }
  }, [audioSrc]);

  // Sincroniza isPlaying com eventos reais do <audio>
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Sincroniza playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        await audio.play();
      } catch (err) {
        console.error('Erro ao tocar áudio:', err);
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const seek = useCallback((percent) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = percent * duration;
  }, [duration]);

  const skip = useCallback((seconds) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  }, [duration]);

  const formatTime = useCallback((time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    // Refs
    audioRef,
    // State
    isPlaying,
    progress,
    duration,
    playbackRate,
    progressPercent: duration ? (progress / duration) * 100 : 0,
    // Actions
    togglePlay,
    seek,
    skip,
    setPlaybackRate,
    setIsPlaying,
    // Handlers (para o elemento <audio>)
    handleTimeUpdate,
    handleLoadedMetadata,
    // Utils
    formatTime,
    speeds: SPEEDS,
  };
}

export default useAudioPlayer;