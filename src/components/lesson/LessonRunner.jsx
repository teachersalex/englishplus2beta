/**
 * LessonRunner.jsx
 * Orquestra as engines de uma rodada de 5 atividades
 * 
 * "O jogador só vê a magia. Nunca a engrenagem."
 *  — Alex Santos
 * 
 * FLUXO DE CELEBRAÇÃO:
 * 1. Completa 5 atividades
 * 2. Se ≥90% → DiamondModal
 * 3. Diamond fecha → AchievementModal (se tiver, por prioridade)
 * 4. Achievement fecha → CompletionModal
 * 5. Conquistas extras vão pra fila (próxima sessão)
 * 
 * SISTEMA ANTI-COLISÃO:
 * - processLessonComplete() decide qual celebrar
 * - Prioridade: secret > boss > map > node > skill > story > lesson > xp > habit
 * - Resto vai pra pendingAchievements (Firebase)
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { thresholds } from '../../data/gameSchema';
import { 
  processLessonComplete,
  ALL_ACHIEVEMENTS,
} from '../../data/achievementsData';

// Engines
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

// Modais de celebração
import DiamondCelebrationModal from './DiamondCelebrationModal';
import CompletionModal from './CompletionModal';
import AchievementCelebrationModal from '../achievements/AchievementCelebrationModal';
import { SavingOverlay } from '../feedback/SavingOverlay';

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

/**
 * Busca achievement completo pelo ID
 */
const getAchievementById = (id) => {
  return ALL_ACHIEVEMENTS.find(a => a.id === id) || null;
};

export function LessonRunner({ 
  lesson, 
  onComplete, 
  onExit,
  onCelebrateAchievement,
  // Novos props para anti-colisão
  earnedAchievements = [],
  pendingAchievements = [],
  currentProgress = {},
}) {
  const { title, lore, tip, activities, currentRound = 1, totalRounds = 3 } = lesson;

  // Estados de atividade
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ xp: 0, correct: 0, wrong: 0 });
  const [finalResult, setFinalResult] = useState(null);
  
  // Estados de celebração
  const [celebrationPhase, setCelebrationPhase] = useState('activity'); 
  // Phases: 'activity' | 'diamond' | 'saving' | 'achievement' | 'completion'
  
  const [savingMessage, setSavingMessage] = useState('');
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [earnedDiamond, setEarnedDiamond] = useState(false);
  
  // Refs para controle
  const completionLockRef = useRef(false);
  const celebrationDataRef = useRef({
    achievementToCelebrate: null,
    newEarnedIds: [],
    newPendingIds: [],
  });
  
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
          <button
            onClick={onExit}
            className="px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-bold"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const currentActivity = activities[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / activities.length) * 100);
  
  const displayAccuracy = finalResult?.accuracy ?? (
    stats.correct + stats.wrong > 0
      ? Math.round((stats.correct / (stats.correct + stats.wrong)) * 100)
      : 0
  );
  
  const isLastRound = currentRound >= totalRounds;

  /**
   * Completa uma atividade
   */
  const handleActivityComplete = async (result) => {
    if (completionLockRef.current) return;
    completionLockRef.current = true;

    const newStats = {
      xp: stats.xp + (result.xp || 0),
      correct: stats.correct + (result.correct || 0),
      wrong: stats.wrong + (result.wrong || 0),
    };
    
    setStats(newStats);

    // Não é última atividade - avança
    if (currentIndex + 1 < activities.length) {
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
      return;
    }

    // === ÚLTIMA ATIVIDADE ===
    
    const finalAccuracy = newStats.correct + newStats.wrong > 0
      ? Math.round((newStats.correct / (newStats.correct + newStats.wrong)) * 100)
      : 0;
    
    const diamond = isLastRound && finalAccuracy >= thresholds.diamond;

    const resultPayload = {
      xp: newStats.xp,
      correct: newStats.correct,
      wrong: newStats.wrong,
      accuracy: finalAccuracy,
      earnedDiamond: diamond,
    };
    
    setFinalResult(resultPayload);
    setEarnedDiamond(diamond);

    // Chama onComplete para salvar progresso
    let updatedProgress = currentProgress;
    if (onComplete) {
      try {
        const completionResult = await onComplete(resultPayload);
        if (completionResult?.progress) {
          updatedProgress = completionResult.progress;
        }
      } catch (e) {
        console.error('Erro ao salvar progresso:', e);
      }
    }

    // === SISTEMA ANTI-COLISÃO ===
    // Processa conquistas com prioridade
    const { celebrate, newEarned, newPending } = processLessonComplete(
      earnedAchievements,
      pendingAchievements,
      updatedProgress
    );

    // Guarda para usar depois
    celebrationDataRef.current = {
      achievementToCelebrate: celebrate,
      newEarnedIds: newEarned,
      newPendingIds: newPending,
    };

    if (celebrate) {
      setCurrentAchievement(celebrate);
    }

    // Inicia fluxo de celebração
    if (diamond) {
      setCelebrationPhase('diamond');
    } else if (celebrate) {
      setCelebrationPhase('achievement');
    } else {
      setCelebrationPhase('completion');
    }
  };

  /**
   * Diamond modal fechou
   */
  const handleDiamondComplete = () => {
    const { achievementToCelebrate } = celebrationDataRef.current;
    
    if (achievementToCelebrate) {
      setCelebrationPhase('achievement');
    } else {
      setCelebrationPhase('completion');
    }
  };

  /**
   * Achievement modal fechou
   */
  const handleAchievementComplete = async () => {
    const { achievementToCelebrate, newEarnedIds, newPendingIds } = celebrationDataRef.current;
    
    if (achievementToCelebrate && onCelebrateAchievement) {
      setSavingMessage('Registrando conquista...');
      setCelebrationPhase('saving');
      
      try {
        // Passa a conquista celebrada + novas listas
        await onCelebrateAchievement({
          celebratedId: achievementToCelebrate.id,
          newEarnedIds,
          newPendingIds,
        });
      } catch (e) {
        console.error('Erro ao registrar conquista:', e);
      }
      
      // Pequeno delay para UX
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    
    setCelebrationPhase('completion');
  };

  /**
   * Continua após completion
   */
  const handleContinue = () => {
    onExit?.();
  };

  /**
   * Tenta novamente
   */
  const handleRetry = () => {
    setCurrentIndex(0);
    setStats({ xp: 0, correct: 0, wrong: 0 });
    setFinalResult(null);
    setCelebrationPhase('activity');
    setCurrentAchievement(null);
    setEarnedDiamond(false);
    celebrationDataRef.current = {
      achievementToCelebrate: null,
      newEarnedIds: [],
      newPendingIds: [],
    };
    completionLockRef.current = false;
  };

  const EngineComponent = EngineComponents[currentActivity?.type];

  // Guard: tipo desconhecido
  if (!EngineComponent && celebrationPhase === 'activity') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 text-center max-w-sm shadow-lg">
          <div className="text-4xl mb-4">🔧</div>
          <h2 className="text-lg font-bold mb-2 text-[#1E293B]">Tipo desconhecido</h2>
          <p className="text-[#64748B] text-sm mb-4">
            "{currentActivity?.type}" não reconhecido.
          </p>
          <button onClick={onExit} className="px-6 py-3 bg-[#3B82F6] text-white rounded-xl font-bold">
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
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F1F5F9]"
          >
            <svg className="w-5 h-5 text-[#1E293B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex-1 h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#3B82F6] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {/* Lesson Title */}
        {currentIndex === 0 && (title || lore || tip) && celebrationPhase === 'activity' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto px-4 pt-4"
          >
            {title && <h1 className="text-xl font-bold mb-1 text-[#1E293B]">{title}</h1>}
            {lore && <p className="text-[#64748B] text-sm">{lore}</p>}
            {tip && (
              <details className="mt-3">
                <summary className="cursor-pointer p-3 bg-[#EFF6FF] border border-[#3B82F6] rounded-xl text-sm flex items-center gap-2">
                  <span className="text-[#3B82F6]">💡</span>
                  <strong className="text-[#1E40AF]">Dica do Teacher Alex</strong>
                  <svg className="w-4 h-4 text-[#3B82F6] ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-2 p-3 bg-[#EFF6FF] rounded-xl text-sm text-[#1E293B]">
                  {tip}
                </div>
              </details>
            )}
          </motion.div>
        )}

        {/* Current Activity */}
        <AnimatePresence mode="wait">
          {EngineComponent && celebrationPhase === 'activity' && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <EngineComponent
                data={currentActivity}
                onComplete={handleActivityComplete}
              />
            </motion.div>
          )}
        </AnimatePresence>
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

      <CompletionModal
        isOpen={celebrationPhase === 'completion'}
        stats={{
          xp: finalResult?.xp ?? stats.xp,
          accuracy: displayAccuracy,
        }}
        achievement={currentAchievement}
        earnedDiamond={earnedDiamond}
        currentRound={currentRound}
        totalRounds={totalRounds}
        onContinue={handleContinue}
        onRetry={handleRetry}
      />
    </div>
  );
}

export default LessonRunner;