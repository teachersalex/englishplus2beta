// src/components/stories/StoriesHub.jsx
// Visual: PlayStation/Apple - sem flash, profissional
// FIX: Corrigido path - era stories, agora é storyProgress
// FIX: Corrigido path - era bestScores, agora é scores

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { seriesByLevel } from '../../data/stories';

const COLORS = {
  bgApp: '#F8FAFC',
  surface: '#FFFFFF',
  textMain: '#1E293B',
  textMuted: '#64748B',
  primary: '#3B82F6',
  border: '#E2E8F0',
  purple: '#9333EA',
  purpleLight: '#F3E8FF',
  success: '#10B981',
  skeleton: '#E2E8F0',
};

const LEVELS = [
  { key: 'pillars', title: 'The Pillars', subtitle: 'A Base Sólida', emoji: '🏛️' },
  { key: 'starter', title: 'Starter', subtitle: 'Pré-A1', emoji: '🌱' },
  { key: 'a1', title: 'Level A1', subtitle: 'Iniciante', emoji: '📗' },
  { key: 'a2', title: 'Level A2', subtitle: 'Básico', emoji: '📘' },
];

// Skeleton Card - enquanto carrega
function SkeletonCard() {
  return (
    <div 
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}
    >
      <div 
        className="aspect-[3/4] animate-pulse"
        style={{ backgroundColor: COLORS.skeleton }}
      />
      <div className="p-3 space-y-2">
        <div 
          className="h-4 w-3/4 rounded animate-pulse"
          style={{ backgroundColor: COLORS.skeleton }}
        />
        <div 
          className="h-3 w-1/2 rounded animate-pulse"
          style={{ backgroundColor: COLORS.skeleton }}
        />
      </div>
    </div>
  );
}

// Series Card com imagem lazy load
function SeriesCard({ series, progress, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { completed, total, hasDiamond, average } = progress;
  
  return (
    <div
      onClick={onClick}
      className="rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-lg transition-shadow duration-300"
      style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}
    >
      {/* Cover */}
      <div className="aspect-[3/4] relative overflow-hidden">
        {/* Skeleton enquanto carrega */}
        {!imageLoaded && !imageError && (
          <div 
            className="absolute inset-0 animate-pulse"
            style={{ backgroundColor: COLORS.skeleton }}
          />
        )}
        
        {/* Imagem */}
        <img
          src={series.coverImage}
          alt={series.title}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`
            w-full h-full object-cover 
            group-hover:scale-105 transition-transform duration-500
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
        
        {/* Fallback se erro */}
        {imageError && (
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: COLORS.skeleton }}
          >
            <span className="text-4xl opacity-50">📚</span>
          </div>
        )}
        
        {/* Diamond Badge */}
        {hasDiamond && (
          <div className="absolute top-2 right-2">
            <div 
              className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg relative"
              style={{ 
                background: 'linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5)',
              }}
            >
              <span className="text-base">💎</span>
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-1 -right-1 text-white text-xs"
                style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.9))' }}
              >
                ✦
              </motion.div>
            </div>
          </div>
        )}
        
        {/* Progress bar */}
        {completed > 0 && !hasDiamond && (
          <div className="absolute top-2 right-2">
            <div 
              className="px-2 py-1 rounded-lg text-xs font-bold text-white"
              style={{ 
                backgroundColor: completed === total ? COLORS.success : 'rgba(0,0,0,0.6)',
              }}
            >
              {completed}/{total}
            </div>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Level badge */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <span 
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
          >
            {series.level}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-bold text-sm truncate" style={{ color: COLORS.textMain }}>
          {series.title}
        </h3>
        <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
          {series.episodes?.length || 0} episódios
          {average !== null && (
            <span 
              className="ml-2 font-bold"
              style={{ 
                color: hasDiamond ? COLORS.success : average >= 70 ? COLORS.primary : COLORS.textMuted 
              }}
            >
              • {average}%
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

export default function StoriesHub({ onSelectSeries, onBack, progress }) {
  const [isReady, setIsReady] = useState(false);
  
  // Delay mínimo para evitar flash
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const getSeriesProgress = (seriesId) => {
    // FIX: Corrigido path - era progress?.stories, agora é progress?.storyProgress
    const storyProgress = progress?.storyProgress?.[seriesId];
    if (!storyProgress) return { completed: 0, total: 0, hasDiamond: false, average: null };
    
    const allSeries = [...(seriesByLevel.pillars || []), ...(seriesByLevel.starter || [])];
    const series = allSeries.find(s => s.id === seriesId);
    const total = series?.episodes?.length || 0;
    // FIX: Corrigido path - era bestScores, agora é scores
    const completed = Object.keys(storyProgress.scores || {}).length;
    
    return {
      completed,
      total,
      hasDiamond: storyProgress.hasDiamond || false,
      average: storyProgress.average || null,
    };
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgApp }}>
      {/* Header */}
      <header 
        className="sticky top-0 z-10 px-4 py-4 border-b"
        style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: COLORS.textMain }}>
              Histórias
            </h1>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>
              Pratique ditado com histórias envolventes
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Info Box - aparece suave */}
        <div
          className="rounded-2xl p-4 mb-6 flex items-start gap-3 transition-opacity duration-300"
          style={{ 
            backgroundColor: COLORS.purpleLight,
            opacity: isReady ? 1 : 0,
          }}
        >
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: COLORS.purple }}
          >
            <span className="text-white text-lg">🎧</span>
          </div>
          <div>
            <h3 className="font-bold text-sm" style={{ color: COLORS.purple }}>
              Como funciona
            </h3>
            <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>
              Ouça o áudio, digite o que entendeu e veja sua precisão. 
              Complete todos os episódios com média <strong>≥95%</strong> para conquistar o <strong>💎 Diamante</strong> da série!
            </p>
          </div>
        </div>

        {/* Séries por Nível */}
        {LEVELS.map((level) => {
          const series = seriesByLevel[level.key] || [];
          if (series.length === 0) return null;

          return (
            <div key={level.key} className="mb-8">
              {/* Section Header */}
              <div 
                className="flex items-center gap-2 mb-4 transition-opacity duration-300"
                style={{ opacity: isReady ? 1 : 0 }}
              >
                <span className="text-2xl">{level.emoji}</span>
                <div>
                  <h2 className="font-bold text-lg" style={{ color: COLORS.textMain }}>
                    {level.title}
                  </h2>
                  <p className="text-xs" style={{ color: COLORS.textMuted }}>
                    {level.subtitle}
                  </p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {!isReady ? (
                  // Skeletons enquanto carrega
                  Array.from({ length: series.length }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                ) : (
                  // Cards reais
                  series.map((s) => (
                    <SeriesCard
                      key={s.id}
                      series={s}
                      progress={getSeriesProgress(s.id)}
                      onClick={() => onSelectSeries(s.id)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}

        {/* Spacer mobile */}
        <div className="h-20 md:h-0" />
      </main>
    </div>
  );
}