/**
 * MapScreen - EnglishPlus 2.0
 * 
 * "Là, tout n'est qu'ordre et beauté,
 *  Luxe, calme et volupté."
 *  — Charles Baudelaire
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, GRADIENTS, SHADOWS } from '../../tokens';

const NODES_CONFIG = [
  { id: 1, title: 'O Espelho', theme: 'To Be' },
  { id: 2, title: 'O Vizinho', theme: 'Present Simple' },
  { id: 3, title: 'A Tribo', theme: 'Pronomes' },
  { id: 4, title: 'A Trilha', theme: 'Advérbios' },
  { id: 5, title: 'O Acampamento', theme: 'Perguntas WH' },
  { id: 6, title: 'O Rio', theme: 'There is/are' },
  { id: 7, title: 'O Farol', theme: 'Can' },
  { id: 8, title: 'A Subida', theme: 'Continuous' },
  { id: 9, title: 'Os Portões', theme: 'Revisão' },
  { id: 10, title: 'O Castelo', theme: 'Boss Final', isBoss: true },
];

const getNodePosition = (index) => {
  const positions = [0, -60, -80, -40, 20, 70, 80, 40, -20, 0];
  return positions[index] || 0;
};

const Icons = {
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
  ),
  check: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
    </svg>
  ),
  star: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  ),
  castle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 9V7h-2V5h-2V3h-2v2h-2V3H11v2H9V3H7v2H5v2H3v2h2v12h6v-4h2v4h6V9h2zm-4 10h-2v-4H9v4H7V9h10v10z"/>
    </svg>
  ),
  back: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 19l-7-7 7-7"/>
    </svg>
  ),
};

function MapNode({ node, state, progress, onClick, positionX, isActive, nodeRef }) {
  const isLocked = state === 'locked';
  const isCompleted = state === 'completed';
  const isCurrent = state === 'in_progress' || state === 'unlocked';
  
  const nodeSize = node.isBoss ? 72 : 60;
  
  return (
    <motion.div 
      ref={isActive ? nodeRef : null}
      initial={{ opacity: 0, scale: 0.8, x: positionX }}
      animate={{ opacity: 1, scale: 1, x: positionX }}
      className="relative flex flex-col items-center"
    >
      <button
        onClick={() => !isLocked && onClick(node.id)}
        disabled={isLocked}
        className="relative flex flex-col items-center group"
        style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
      >
        {/* Glow for completed */}
        {isCompleted && (
          <div 
            className="absolute rounded-full pointer-events-none"
            style={{ 
              width: nodeSize + 24, 
              height: nodeSize + 24,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: `radial-gradient(circle, ${COLORS.success}30 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Pulse for current */}
        {isCurrent && (
          <>
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute rounded-full"
              style={{ 
                width: nodeSize + 20, 
                height: nodeSize + 20,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: COLORS.primary,
              }}
            />
            <div 
              className="absolute rounded-full"
              style={{ 
                width: nodeSize + 12, 
                height: nodeSize + 12,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: `${COLORS.primary}20`,
              }}
            />
          </>
        )}
        
        {/* Completed ring with glow */}
        {isCompleted && (
          <div 
            className="absolute rounded-full"
            style={{ 
              width: nodeSize + 10, 
              height: nodeSize + 10,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: `3px solid ${COLORS.success}`,
              boxShadow: `0 0 12px ${COLORS.success}50`,
            }}
          />
        )}
        
        {/* Progress ring */}
        {isCurrent && progress > 0 && (
          <svg 
            className="absolute"
            style={{ 
              width: nodeSize + 12, 
              height: nodeSize + 12,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-90deg)',
            }}
          >
            <circle
              cx={(nodeSize + 12) / 2}
              cy={(nodeSize + 12) / 2}
              r={(nodeSize + 4) / 2}
              fill="none"
              stroke={COLORS.border}
              strokeWidth="3"
            />
            <circle
              cx={(nodeSize + 12) / 2}
              cy={(nodeSize + 12) / 2}
              r={(nodeSize + 4) / 2}
              fill="none"
              stroke={COLORS.primary}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={Math.PI * (nodeSize + 4)}
              strokeDashoffset={Math.PI * (nodeSize + 4) * (1 - progress / 3)}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
        )}
        
        {/* Node */}
        <motion.div 
          whileHover={!isLocked ? { scale: 1.08 } : {}}
          whileTap={!isLocked ? { scale: 0.95 } : {}}
          className="rounded-full flex items-center justify-center relative z-10"
          style={{ 
            width: nodeSize, 
            height: nodeSize,
            background: isLocked 
              ? COLORS.border
              : isCompleted 
                ? `linear-gradient(135deg, ${COLORS.success} 0%, #059669 100%)`
                : node.isBoss
                  ? `linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`
                  : GRADIENTS.blue,
            color: isLocked ? COLORS.textMuted : COLORS.textLight,
            boxShadow: isLocked 
              ? 'none' 
              : isCompleted
                ? `0 8px 24px -4px ${COLORS.success}50`
                : node.isBoss
                  ? '0 8px 24px -4px rgba(245, 158, 11, 0.5)'
                  : SHADOWS.button,
          }}
        >
          {isLocked ? Icons.lock : isCompleted ? Icons.check : node.isBoss ? Icons.castle : (
            <span className="font-bold text-lg">{node.id}</span>
          )}
        </motion.div>
        
        {/* Lock badge */}
        {isLocked && (
          <div 
            className="absolute z-20 rounded-full p-1"
            style={{ 
              top: 0,
              right: -4,
              backgroundColor: COLORS.textMuted,
              border: `2px solid ${COLORS.bgApp}`,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
        )}
        
        {/* Progress badge */}
        {isCurrent && !isCompleted && (
          <div 
            className="absolute z-20 font-bold rounded-full px-2 py-0.5 text-xs"
            style={{ 
              bottom: -4,
              right: -8,
              backgroundColor: COLORS.surface,
              color: COLORS.primary,
              border: `2px solid ${COLORS.primary}`,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {progress}/3
          </div>
        )}

        {/* Completed sparkle */}
        {isCompleted && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute z-20"
            style={{ top: -4, right: -4 }}
          >
            <span className="text-sm">✨</span>
          </motion.div>
        )}
      </button>
      
      {/* Title */}
      <div className="mt-3 text-center">
        <div 
          className="text-sm font-medium"
          style={{ 
            color: isLocked ? COLORS.textMuted : COLORS.text,
            opacity: isLocked ? 0.6 : 1,
          }}
        >
          {node.title}
        </div>
        {(isCurrent || isCompleted) && (
          <div className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>
            {node.theme}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function NodePath({ fromX, toX, isCompleted, isNext }) {
  const height = 50;
  const width = 200;
  const centerX = width / 2;
  
  const startX = centerX + fromX;
  const endX = centerX + toX;
  
  return (
    <div className="flex justify-center" style={{ height }}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="pathGradientCompleted" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.success} />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="pathGradientActive" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.primary} />
            <stop offset="100%" stopColor={COLORS.primaryDark} />
          </linearGradient>
        </defs>
        <path
          d={`M ${startX} 0 C ${startX} ${height * 0.5}, ${endX} ${height * 0.5}, ${endX} ${height}`}
          fill="none"
          stroke={isCompleted 
            ? 'url(#pathGradientCompleted)' 
            : isNext 
              ? 'url(#pathGradientActive)' 
              : COLORS.border}
          strokeWidth="4"
          strokeDasharray={isCompleted || isNext ? "none" : "8 8"}
          strokeLinecap="round"
          opacity={isCompleted || isNext ? 1 : 0.4}
          style={{
            filter: isCompleted ? `drop-shadow(0 0 4px ${COLORS.success}50)` : 'none',
          }}
        />
      </svg>
    </div>
  );
}

export default function MapScreen({ onSelectNode, getNodeState, getNodeProgress, onBack, onReset }) {
  const scrollRef = useRef(null);
  const activeNodeRef = useRef(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const nodesReversed = [...NODES_CONFIG].reverse();
  
  const activeNodeId = NODES_CONFIG.find(node => {
    const state = getNodeState(node.id);
    return state === 'in_progress' || state === 'unlocked';
  })?.id;

  useEffect(() => {
    const timeout = setTimeout(() => {
      activeNodeRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [activeNodeId]);

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: COLORS.bgApp,
        backgroundImage: `
          radial-gradient(${COLORS.border} 1px, transparent 1px),
          radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.06), transparent)
        `,
        backgroundSize: '24px 24px, 100% 100%',
      }}
    >
      {/* Header */}
      <header 
        className="sticky top-0 z-30 backdrop-blur-md border-b"
        style={{ 
          backgroundColor: 'rgba(248, 250, 252, 0.9)', 
          borderColor: COLORS.border,
        }}
      >
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{ color: COLORS.textMuted }}
          >
            {Icons.back}
            <span className="text-sm font-medium">Voltar</span>
          </button>

          <div className="text-center">
            <h1 className="font-semibold text-sm uppercase tracking-wide" style={{ color: COLORS.text }}>
              Mundo 1
            </h1>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>Os Primeiros Passos</p>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-slate-100"
            style={{ color: COLORS.textMuted }}
          >
            Reset
          </button>
        </div>
      </header>

      {/* Trail */}
      <div 
        ref={scrollRef}
        className="overflow-y-auto pb-40 pt-12"
        style={{ height: 'calc(100vh - 72px)' }}
      >
        <div className="flex flex-col items-center px-4">
          {nodesReversed.map((node, index) => {
            const state = getNodeState(node.id);
            const progress = getNodeProgress(node.id);
            const positionX = getNodePosition(NODES_CONFIG.length - 1 - index);
            const prevPositionX = index > 0 
              ? getNodePosition(NODES_CONFIG.length - index) 
              : 0;
            
            const nextNode = nodesReversed[index + 1];
            const nextState = nextNode ? getNodeState(nextNode.id) : null;
            const isNextCurrent = nextState === 'in_progress' || nextState === 'unlocked';
            
            const isActive = node.id === activeNodeId;
            
            return (
              <div key={node.id} className="flex flex-col items-center">
                {index > 0 && (
                  <NodePath 
                    fromX={prevPositionX}
                    toX={positionX}
                    isCompleted={state === 'completed'}
                    isNext={isNextCurrent}
                  />
                )}
                
                <MapNode
                  node={node}
                  state={state}
                  progress={progress}
                  onClick={onSelectNode}
                  positionX={positionX}
                  isActive={isActive}
                  nodeRef={activeNodeRef}
                />
              </div>
            );
          })}
          
          {/* Start */}
          <div className="flex flex-col items-center mt-12 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{ 
                backgroundColor: COLORS.surface, 
                border: `1px solid ${COLORS.border}`,
                boxShadow: SHADOWS.card,
              }}
            >
              <span style={{ color: '#f59e0b' }}>{Icons.star}</span>
              <span className="text-sm font-medium" style={{ color: COLORS.text }}>Início da Jornada</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reset Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-3xl p-6 max-w-sm w-full relative overflow-hidden"
              style={{ 
                backgroundColor: COLORS.surface,
                boxShadow: SHADOWS.cardDark,
              }}
            >
              {/* Glow */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 60%)' }}
              />

              <div className="relative z-10 text-center">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: COLORS.warningLight }}
                >
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: COLORS.text }}>
                  Resetar Progresso?
                </h3>
                <p className="text-sm mb-6" style={{ color: COLORS.textMuted }}>
                  Todo seu progresso será apagado. Esta ação não pode ser desfeita.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-3 rounded-xl font-medium transition-colors"
                    style={{ backgroundColor: COLORS.border, color: COLORS.text }}
                  >
                    Cancelar
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onReset?.();
                      setShowResetConfirm(false);
                    }}
                    className="flex-1 py-3 rounded-xl font-medium text-white"
                    style={{ 
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      boxShadow: '0 8px 20px -4px rgba(239, 68, 68, 0.4)',
                    }}
                  >
                    Resetar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}