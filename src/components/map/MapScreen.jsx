/**
 * MapScreen.jsx - EnglishPlus 2.0
 * 
 * "O caminho faz-se caminhando."
 *  — Antonio Machado
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, GRADIENTS, SHADOWS } from '../../tokens';
import { getMapData } from '../../data/maps/mapsConfig';

import { DecoElements } from './DecoElements';
import { MapNode } from './MapNode';
import { NodePath } from './NodePath';
import { MapIcons } from './MapIcons';

const getNodePosition = (index, total) => {
  const positions5 = [0, -50, -70, -30, 30];
  const positions10 = [0, -60, -80, -40, 20, 70, 80, 40, -20, 0];
  
  if (total <= 5) {
    return positions5[index] || 0;
  }
  return positions10[index] || 0;
};

const smoothScrollTo = (container, targetY, duration = 800) => {
  const startY = container.scrollTop;
  const difference = targetY - startY;
  const startTime = performance.now();
  
  const easeInOutCubic = (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  
  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(progress);
    
    container.scrollTop = startY + (difference * easedProgress);
    
    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };
  
  requestAnimationFrame(animateScroll);
};

export default function MapScreen({ mapId = 0, onSelectNode, getNodeState, getNodeProgress, onBack, onReset }) {
  const scrollRef = useRef(null);
  const activeNodeRef = useRef(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const mapData = getMapData(mapId);
  const NODES_CONFIG = mapData?.nodes || [];
  const mapTitle = mapData?.title || 'Mapa';
  const mapSubtitle = mapData?.subtitle || '';

  const nodesReversed = [...NODES_CONFIG].reverse();
  
  const activeNodeId = NODES_CONFIG.find(node => {
    const state = getNodeState(node.id);
    return state === 'in_progress' || state === 'unlocked';
  })?.id;

  const completedCount = NODES_CONFIG.filter(node => getNodeState(node.id) === 'completed').length;
  const progressPercent = NODES_CONFIG.length > 0 ? (completedCount / NODES_CONFIG.length) * 100 : 0;

  useEffect(() => {
    setHasScrolled(false);
  }, [mapId]);

  useEffect(() => {
    if (!scrollRef.current || hasScrolled) return;
    
    const scrollTimer = setTimeout(() => {
      if (activeNodeRef.current && scrollRef.current) {
        const containerRect = scrollRef.current.getBoundingClientRect();
        const nodeRect = activeNodeRef.current.getBoundingClientRect();
        const containerScrollTop = scrollRef.current.scrollTop;
        
        const targetY = containerScrollTop + nodeRect.top - containerRect.top - (containerRect.height / 2) + (nodeRect.height / 2);
        
        smoothScrollTo(scrollRef.current, targetY, 800);
      }
      setHasScrolled(true);
    }, 300);
    
    return () => clearTimeout(scrollTimer);
  }, [hasScrolled, activeNodeId]);

  if (!mapData) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.bgApp }}>
        <p style={{ color: COLORS.textMuted }}>Mapa não encontrado</p>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        backgroundColor: COLORS.bgApp,
        backgroundImage: `
          radial-gradient(ellipse 120% 80% at 50% -20%, rgba(59, 130, 246, 0.06), transparent 60%),
          radial-gradient(ellipse 100% 60% at 20% 100%, rgba(16, 185, 129, 0.04), transparent 50%),
          radial-gradient(ellipse 80% 50% at 80% 80%, rgba(139, 92, 246, 0.03), transparent 50%),
          radial-gradient(${COLORS.border}40 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 100% 100%, 20px 20px',
      }}
    >
      <DecoElements />

      <header 
        className="sticky top-0 z-30 backdrop-blur-md border-b"
        style={{ backgroundColor: 'rgba(248, 250, 252, 0.85)', borderColor: COLORS.border }}
      >
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{ color: COLORS.textMuted }}
          >
            {MapIcons.back}
            <span className="text-sm font-medium">Voltar</span>
          </button>

          <div className="text-center">
            <h1 className="font-bold text-sm uppercase tracking-wide" style={{ color: COLORS.text }}>
              {mapTitle}
            </h1>
            <div className="flex items-center justify-center gap-1.5 mt-0.5">
              <div 
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
              />
              <p className="text-xs" style={{ color: COLORS.textMuted }}>{mapSubtitle}</p>
            </div>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-slate-100"
            style={{ color: COLORS.textMuted }}
          >
            Reset
          </button>
        </div>
        
        <div className="h-0.5" style={{ backgroundColor: COLORS.border }}>
          <motion.div 
            className="h-full"
            style={{ 
              background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.success})`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="overflow-y-auto pb-40 pt-12 relative z-10"
        style={{ height: 'calc(100dvh - 80px)' }}
      >
        <div className="flex flex-col items-center px-4">
          {nodesReversed.map((node, index) => {
            const state = getNodeState(node.id);
            const progress = getNodeProgress(node.id);
            const positionX = getNodePosition(NODES_CONFIG.length - 1 - index, NODES_CONFIG.length);
            const prevPositionX = index > 0 ? getNodePosition(NODES_CONFIG.length - index, NODES_CONFIG.length) : 0;
            
            const isNodeCompleted = state === 'completed';
            const isNodeCurrent = state === 'in_progress' || state === 'unlocked';
            const isActive = node.id === activeNodeId;
            
            return (
              <div key={node.id} className="flex flex-col items-center">
                {index > 0 && (
                  <NodePath 
                    fromX={prevPositionX}
                    toX={positionX}
                    isCompleted={isNodeCompleted}
                    isNext={isNodeCurrent}
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
          
          <div className="flex flex-col items-center mt-12 mb-8">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
              style={{ 
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.05))',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                boxShadow: '0 4px 12px rgba(251, 191, 36, 0.1)',
              }}
            >
              <span style={{ color: '#f59e0b' }}>{MapIcons.flag}</span>
              <span className="text-sm font-semibold" style={{ color: '#D97706' }}>Início da Jornada</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          MODAL RESET - Visual Dark Premium
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setShowResetConfirm(false)}
          >
            {/* Backdrop com blur */}
            <div 
              className="absolute inset-0"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
              }}
            />

            {/* Glow vermelho sutil */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{ 
                background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(239, 68, 68, 0.15), transparent 60%)',
              }}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-3xl p-6 max-w-sm w-full overflow-hidden"
              style={{ 
                background: GRADIENTS.darkCard,
                boxShadow: SHADOWS.cardDark,
              }}
            >
              {/* Grid texture */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Accent line vermelha */}
              <div
                className="absolute left-0 top-6 bottom-6 w-1 rounded-full pointer-events-none"
                style={{ 
                  background: 'linear-gradient(to bottom, #ef4444, #dc2626)',
                  opacity: 0.6,
                }}
              />

              {/* Top glow */}
              <div
                className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 pointer-events-none"
                style={{ 
                  background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 60%)',
                }}
              />

              <div className="relative z-10 text-center">
                {/* Icon */}
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                  }}
                >
                  <span className="text-4xl">⚠️</span>
                </motion.div>

                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-xl font-bold mb-2" 
                  style={{ color: COLORS.textLight }}
                >
                  Resetar Progresso?
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm mb-6" 
                  style={{ color: COLORS.textDark }}
                >
                  Todo seu progresso será apagado.
                  <br />
                  <span style={{ color: COLORS.error }}>Esta ação não pode ser desfeita.</span>
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowResetConfirm(false)}
                    className="flex-1 py-3.5 rounded-xl font-semibold transition-all"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: COLORS.textLight,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    Cancelar
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onReset?.();
                      setShowResetConfirm(false);
                    }}
                    className="flex-1 py-3.5 rounded-xl font-bold text-white transition-all"
                    style={{ 
                      background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.5)',
                    }}
                  >
                    Resetar
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}