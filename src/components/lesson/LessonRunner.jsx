import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { thresholds } from '../../data/gameSchema';

// Todos os engines refatorados
import {
  FillGap,
  TrueFalse,
  VocabMatch,
  MultipleChoice,
  SentenceBuilder,
  CategorySort,
  ErrorDetective,
  Ordering,
} from '../engine';

import DiamondCelebrationModal from './DiamondCelebrationModal';

/**
 * LessonRunner
 * Orquestra as engines de uma rodada de 5 atividades
 */

const EngineComponents = {
  vocab_match: VocabMatch,
  fill_gap: FillGap,
  sentence_builder: SentenceBuilder,
  error_detective: ErrorDetective,
  true_false: TrueFalse,
  multiple_choice: MultipleChoice,
  category_sort: CategorySort,
  ordering: Ordering,
};

export function LessonRunner({ lesson, onComplete, onExit }) {
  const { title, lore, tip, activities, currentRound = 1, totalRounds = 3 } = lesson;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({
    xp: 0,
    correct: 0,
    wrong: 0,
  });
  const [finalResult, setFinalResult] = useState(null);
  const [showDiamondCelebration, setShowDiamondCelebration] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  
  const completionLockRef = useRef(false);
  
  useEffect(() => {
    completionLockRef.current = false;
  }, [currentIndex]);

  // Guard: activities vazio
  if (!activities || activities.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 text-center max-w-sm shadow-lg">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-bold mb-2 text-[#1E293B]">Lição sem atividades</h2>
          <p className="text-[#64748B] text-sm mb-4">Esta lição ainda não tem conteúdo.</p>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-bold"
            style={{ borderBottom: '4px solid #2563EB' }}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const currentActivity = activities[currentIndex];
  const progress = Math.round(((currentIndex + 1) / activities.length) * 100);
  
  const displayAccuracy = finalResult?.accuracy ?? (
    stats.correct + stats.wrong > 0
      ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)
      : 0
  );
  
  const isLastRound = currentRound >= totalRounds;
  const displayEarnedDiamond = isLastRound && displayAccuracy >= thresholds.diamond;

  const handleActivityComplete = (result) => {
    if (completionLockRef.current) return;
    completionLockRef.current = true;

    const newStats = {
      xp: stats.xp + (result.xp || 0),
      correct: stats.correct + (result.correct || 0),
      wrong: stats.wrong + (result.wrong || 0),
    };
    
    setStats(newStats);

    if (currentIndex + 1 >= activities.length) {
      const finalAccuracy = newStats.correct + newStats.wrong > 0
        ? Math.round((newStats.correct / (newStats.correct + newStats.wrong)) * 100)
        : 0;
      
      const earnedDiamond = isLastRound && finalAccuracy >= thresholds.diamond;

      const resultPayload = {
        xp: newStats.xp,
        correct: newStats.correct,
        wrong: newStats.wrong,
        accuracy: finalAccuracy,
        earnedDiamond,
      };
      
      setFinalResult(resultPayload);
      if (earnedDiamond) {
        setShowDiamondCelebration(true);
      } else {
        setShowCompletion(true);
      }
    } else {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleDiamondCelebrationComplete = () => {
    setShowDiamondCelebration(false);
    setShowCompletion(true);
  };

  const handleContinue = () => {
    onComplete?.(finalResult || {
      ...stats,
      accuracy: displayAccuracy,
      earnedDiamond: displayEarnedDiamond,
    });
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setStats({ xp: 0, correct: 0, wrong: 0 });
    setFinalResult(null);
    setShowCompletion(false);
    setShowDiamondCelebration(false);
    completionLockRef.current = false;
  };

  const EngineComponent = EngineComponents[currentActivity?.type];

  // Guard: tipo desconhecido
  if (!EngineComponent && !showCompletion && !showDiamondCelebration) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 text-center max-w-sm shadow-lg">
          <div className="text-4xl mb-4">🔧</div>
          <h2 className="text-lg font-bold mb-2 text-[#1E293B]">Tipo desconhecido</h2>
          <p className="text-[#64748B] text-sm mb-4">
            Atividade "{currentActivity?.type}" não reconhecida.
          </p>
          <button
            onClick={onExit}
            className="px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-bold"
            style={{ borderBottom: '4px solid #2563EB' }}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E8F0] px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors"
            aria-label="Voltar"
          >
            <svg className="w-5 h-5 text-[#1E293B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Progress Bar - AZUL */}
          <div className="flex-1 h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#3B82F6] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {/* Lesson Title (first activity only) */}
        {currentIndex === 0 && (title || lore || tip) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto px-4 pt-4"
          >
            {title && <h1 className="text-xl font-bold mb-1 text-[#1E293B]">{title}</h1>}
            {lore && (
              <p className="text-[#64748B] text-sm leading-relaxed">{lore}</p>
            )}
            {tip && (
              <div className="mt-3 p-3 bg-[#EFF6FF] border border-[#3B82F6] rounded-xl text-sm leading-relaxed">
                <span className="text-[#3B82F6]">💡</span>
                <strong className="text-[#1E40AF] ml-1">Teacher Alex:</strong>
                <span className="text-[#1E293B] ml-1">{tip}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* Current Activity */}
        <AnimatePresence mode="wait">
          {EngineComponent && !showCompletion && !showDiamondCelebration && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <EngineComponent
                data={currentActivity}
                onComplete={handleActivityComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Diamond Celebration */}
      <DiamondCelebrationModal
        isOpen={showDiamondCelebration}
        onComplete={handleDiamondCelebrationComplete}
      />

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-5"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl p-8 text-center max-w-sm w-full"
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
                displayEarnedDiamond
                  ? 'bg-gradient-to-br from-cyan-400 to-blue-500'
                  : 'bg-[#10B981]'
              }`}>
                <span className="text-4xl text-white">
                  {displayEarnedDiamond ? '💎' : '✓'}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-1 text-[#1E293B]">
                {isLastRound ? 'Node Completo!' : 'Rodada Completa!'}
              </h2>
              <p className="text-[#64748B] mb-5">
                Progresso: {currentRound}/{totalRounds}
              </p>

              <div className="flex justify-center gap-2 mb-5">
                {[1, 2, 3].map((round) => (
                  <div
                    key={round}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                      round <= currentRound
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#E2E8F0] text-[#64748B]'
                    }`}
                  >
                    {round <= currentRound ? '✓' : round}
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#3B82F6]">
                    {finalResult?.xp ?? stats.xp}
                  </div>
                  <div className="text-xs text-[#64748B]">XP ganhos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#10B981]">
                    {displayAccuracy}%
                  </div>
                  <div className="text-xs text-[#64748B]">Precisão</div>
                </div>
              </div>

              <button
                onClick={handleContinue}
                className="w-full py-4 rounded-2xl font-bold text-lg text-white transition-all"
                style={{
                  backgroundColor: '#3B82F6',
                  borderBottom: '4px solid #2563EB',
                  boxShadow: '0 10px 20px -5px rgba(59, 130, 246, 0.4)',
                }}
              >
                Continuar
              </button>

              {isLastRound && !displayEarnedDiamond && (
                <button
                  onClick={handleRetry}
                  className="w-full py-4 mt-3 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#1E293B] font-bold rounded-2xl transition-colors"
                >
                  Tentar novamente
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LessonRunner;