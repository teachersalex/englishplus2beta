import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../tokens';
import { thresholds } from '../../data/gameSchema';
import { typingSound } from '../../utils/TypingSoundEngine';

/**
 * DictationArea
 * Área de ditado: Input → Resultado
 * 
 * FIX: Adicionado suporte a prop `disabled` para bloquear interação quando modal está ativo
 */

export function DictationArea({
  feedback,
  onCheck,
  onRetry,
  onNext,
  isLastEpisode,
  disabled = false, // ← NOVO: bloqueia interação
}) {
  const [userText, setUserText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingSoundEnabled, setTypingSoundEnabled] = useState(true);
  const textareaRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    const initSound = async () => {
      await typingSound.init();
      setTypingSoundEnabled(typingSound.isEnabled());
    };
    
    const handleInteraction = () => {
      initSound();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('keydown', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (feedback === null) {
      setUserText('');
      setIsTyping(false);
      textareaRef.current?.focus();
    }
  }, [feedback]);

  const handleTextChange = useCallback((e) => {
    if (disabled) return; // ← Bloqueia quando desabilitado
    
    const newText = e.target.value;
    const isAddingChar = newText.length > userText.length;
    
    setUserText(newText);
    
    if (isAddingChar && typingSoundEnabled) {
      typingSound.play();
    }
    
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 150);
  }, [userText, typingSoundEnabled, disabled]);

  const toggleTypingSound = () => {
    if (disabled) return;
    const newState = typingSound.toggle();
    setTypingSoundEnabled(newState);
  };

  const handleCheck = () => {
    if (disabled || !userText.trim()) return;
    onCheck(userText);
  };

  const handleRetry = () => {
    if (disabled) return;
    setUserText('');
    onRetry();
  };

  const handleNext = () => {
    if (disabled) return;
    onNext();
  };

  const wordCount = userText.trim() ? userText.trim().split(/\s+/).length : 0;

  // ============ INPUT STATE ============
  if (!feedback) {
    return (
      <motion.div
        key="input"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="rounded-2xl overflow-hidden"
        style={{ 
          backgroundColor: COLORS.surface, 
          border: `2px solid ${COLORS.border}`,
          opacity: disabled ? 0.5 : 1, // ← Visual de desabilitado
          pointerEvents: disabled ? 'none' : 'auto', // ← Bloqueia cliques
        }}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: COLORS.border }}>
          <div>
            <h3 className="font-bold text-sm" style={{ color: COLORS.text }}>
              ✏️ Digite o que você ouviu
            </h3>
            <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
              Ouça quantas vezes precisar e transcreva o áudio
            </p>
          </div>
          
          <button
            onClick={toggleTypingSound}
            disabled={disabled}
            className="p-2 rounded-lg transition-colors hover:bg-slate-100 disabled:opacity-50"
            title={typingSoundEnabled ? 'Som ligado' : 'Som desligado'}
          >
            {typingSoundEnabled ? (
              <svg className="w-5 h-5" fill="none" stroke={COLORS.text} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke={COLORS.textMuted} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            )}
          </button>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={userText}
            onChange={handleTextChange}
            disabled={disabled}
            placeholder="Comece a digitar aqui..."
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="none"
            autoComplete="off"
            className="w-full p-4 min-h-[200px] resize-none focus:outline-none text-base disabled:bg-gray-50"
            style={{ 
              color: COLORS.text,
              fontFamily: 'Georgia, serif',
              lineHeight: '1.8',
            }}
          />
          
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute bottom-4 right-4 w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center" style={{ borderColor: COLORS.border }}>
          <span className="text-sm" style={{ color: COLORS.textMuted }}>
            {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
          </span>

          <div className="flex gap-2">
            {userText.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => !disabled && setUserText('')}
                disabled={disabled}
                className="px-4 py-2 text-sm font-medium rounded-xl transition-colors disabled:opacity-50"
                style={{ color: COLORS.textMuted }}
              >
                Limpar
              </motion.button>
            )}

            <motion.button
              whileHover={disabled ? {} : { scale: 1.02 }}
              whileTap={disabled ? {} : { scale: 0.98 }}
              onClick={handleCheck}
              disabled={disabled || !userText.trim()}
              className="px-6 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50"
              style={{ 
                backgroundColor: userText.trim() && !disabled ? COLORS.primary : COLORS.textMuted,
                boxShadow: userText.trim() && !disabled ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none',
              }}
            >
              Verificar
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ============ RESULT STATE ============
  const scoreColor = feedback.score >= thresholds.diamond 
    ? 'linear-gradient(135deg, #10B981, #059669)'
    : feedback.score >= 70
      ? 'linear-gradient(135deg, #F59E0B, #D97706)'
      : 'linear-gradient(135deg, #64748B, #475569)';

  const scoreLabel = feedback.score >= thresholds.diamond 
    ? '💎 Excelente!' 
    : feedback.score >= 70 
      ? 'Bom trabalho!' 
      : 'Continue praticando';

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-2xl overflow-hidden shadow-sm"
      style={{ 
        backgroundColor: COLORS.surface, 
        border: `1px solid ${COLORS.border}`,
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      {/* Score Header */}
      <div className="p-5" style={{ background: scoreColor }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wider">
              {scoreLabel}
            </p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-bold text-white">{feedback.score}%</span>
              <span className="text-white/60 text-sm">de precisão</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-white">
              {feedback.correctCount}
              <span className="text-white/50 text-lg">/{feedback.total}</span>
            </span>
            <p className="text-white/60 text-xs">palavras corretas</p>
          </div>
        </div>

        {feedback.score >= thresholds.diamond && (
          <div className="mt-3 pt-3 border-t border-white/20">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
              💎 Diamante Conquistado!
            </span>
          </div>
        )}
      </div>

      {/* Diff Result */}
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: COLORS.textMuted }}>
          Sua transcrição
        </p>
        <div 
          className="p-4 rounded-xl leading-relaxed text-base"
          style={{ backgroundColor: COLORS.background }}
        >
          {feedback.diffResult.map((item, idx) => {
            if (item.type === 'title') {
              return <span key={idx} className="text-slate-300 text-sm mr-1">{item.word}</span>;
            }
            if (item.type === 'correct') {
              return <span key={idx} style={{ color: COLORS.text }}>{item.word} </span>;
            }
            if (item.type === 'missing') {
              return (
                <span 
                  key={idx}
                  className="inline-block px-1.5 py-0.5 rounded mx-0.5 font-medium"
                  style={{ backgroundColor: COLORS.warningLight, color: COLORS.warning }}
                  title="Faltou esta palavra"
                >
                  {item.word}
                </span>
              );
            }
            if (item.type === 'extra') {
              return (
                <span 
                  key={idx}
                  className="line-through mx-0.5"
                  style={{ color: COLORS.textMuted }}
                >
                  {item.word}
                </span>
              );
            }
            return (
              <span key={idx} className="inline-flex items-baseline mx-0.5">
                <span className="line-through" style={{ color: COLORS.error }}>{item.word}</span>
                <span className="font-medium ml-1" style={{ color: COLORS.success }}>{item.expected}</span>
              </span>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t justify-center" style={{ borderColor: COLORS.border }}>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.textMuted }}>
            <span className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.warningLight }}></span>
            Faltou
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.textMuted }}>
            <span className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.successLight }}></span>
            Correção
          </span>
          <span className="flex items-center gap-1.5 text-xs" style={{ color: COLORS.textMuted }}>
            <span className="w-3 h-3 rounded bg-slate-200 relative">
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-full h-px bg-slate-400 rotate-[-10deg]"></span>
              </span>
            </span>
            Extra
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t flex gap-3" style={{ borderColor: COLORS.border }}>
        <motion.button
          whileHover={disabled ? {} : { scale: 1.02 }}
          whileTap={disabled ? {} : { scale: 0.98 }}
          onClick={handleRetry}
          disabled={disabled}
          className="flex-1 py-3 rounded-xl font-bold transition-all disabled:opacity-50"
          style={{ 
            backgroundColor: COLORS.background,
            color: COLORS.text,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          Tentar Novamente
        </motion.button>

        <motion.button
          whileHover={disabled ? {} : { scale: 1.02 }}
          whileTap={disabled ? {} : { scale: 0.98 }}
          onClick={handleNext}
          disabled={disabled}
          className="flex-1 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50"
          style={{ 
            backgroundColor: COLORS.primary,
            boxShadow: disabled ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.4)',
          }}
        >
          {isLastEpisode ? 'Concluir' : 'Próximo Episódio'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DictationArea;