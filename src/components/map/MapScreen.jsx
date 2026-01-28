/**
 * MapScreen - EnglishPlus 2.0
 * Visual rico com elementos decorativos SVG
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, GRADIENTS, SHADOWS } from '../../tokens';
import { getMapData } from '../../data/maps/mapsConfig';

const getNodePosition = (index, total) => {
  const positions5 = [0, -50, -70, -30, 30];
  const positions10 = [0, -60, -80, -40, 20, 70, 80, 40, -20, 0];
  
  if (total <= 5) {
    return positions5[index] || 0;
  }
  return positions10[index] || 0;
};

// Elementos decorativos SVG
function DecoElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Nuvens */}
      <svg className="absolute top-16 -left-6 w-36 h-24 opacity-[0.15]" viewBox="0 0 100 50">
        <ellipse cx="30" cy="35" rx="25" ry="12" fill="#94A3B8"/>
        <ellipse cx="55" cy="28" rx="22" ry="16" fill="#94A3B8"/>
        <ellipse cx="78" cy="35" rx="18" ry="11" fill="#94A3B8"/>
      </svg>
      
      <svg className="absolute top-32 -right-4 w-32 h-20 opacity-[0.12]" viewBox="0 0 100 50">
        <ellipse cx="22" cy="32" rx="20" ry="12" fill="#94A3B8"/>
        <ellipse cx="48" cy="26" rx="24" ry="15" fill="#94A3B8"/>
        <ellipse cx="72" cy="33" rx="16" ry="10" fill="#94A3B8"/>
      </svg>

      <svg className="absolute top-2/3 -left-8 w-28 h-18 opacity-[0.10]" viewBox="0 0 100 50">
        <ellipse cx="30" cy="30" rx="18" ry="10" fill="#94A3B8"/>
        <ellipse cx="52" cy="25" rx="20" ry="12" fill="#94A3B8"/>
      </svg>

      {/* Galhos/plantas esquerda */}
      <svg className="absolute top-1/4 -left-2 w-24 h-48 opacity-[0.18]" viewBox="0 0 50 100">
        <path d="M25 100 Q8 75 18 50 Q28 25 25 0" stroke="#059669" strokeWidth="2.5" fill="none"/>
        <ellipse cx="14" cy="65" rx="10" ry="5" fill="#10B981" transform="rotate(-35 14 65)"/>
        <ellipse cx="30" cy="45" rx="9" ry="4.5" fill="#059669" transform="rotate(30 30 45)"/>
        <ellipse cx="12" cy="30" rx="8" ry="4" fill="#10B981" transform="rotate(-25 12 30)"/>
        <ellipse cx="28" cy="18" rx="6" ry="3" fill="#059669" transform="rotate(20 28 18)"/>
      </svg>

      {/* Galhos/plantas direita */}
      <svg className="absolute top-1/3 -right-2 w-24 h-48 opacity-[0.18]" viewBox="0 0 50 100">
        <path d="M25 100 Q42 75 32 50 Q22 25 25 0" stroke="#059669" strokeWidth="2.5" fill="none"/>
        <ellipse cx="36" cy="65" rx="10" ry="5" fill="#10B981" transform="rotate(35 36 65)"/>
        <ellipse cx="20" cy="45" rx="9" ry="4.5" fill="#059669" transform="rotate(-30 20 45)"/>
        <ellipse cx="38" cy="30" rx="8" ry="4" fill="#10B981" transform="rotate(25 38 30)"/>
        <ellipse cx="22" cy="18" rx="6" ry="3" fill="#059669" transform="rotate(-20 22 18)"/>
      </svg>

      {/* Galhos menores embaixo */}
      <svg className="absolute bottom-1/4 -left-4 w-20 h-36 opacity-[0.14]" viewBox="0 0 40 80">
        <path d="M20 80 Q5 55 15 35 Q25 15 20 0" stroke="#0D9488" strokeWidth="2" fill="none"/>
        <ellipse cx="10" cy="50" rx="8" ry="4" fill="#14B8A6" transform="rotate(-30 10 50)"/>
        <ellipse cx="25" cy="30" rx="7" ry="3.5" fill="#0D9488" transform="rotate(25 25 30)"/>
      </svg>

      {/* Montanhas distantes */}
      <svg className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.08]" viewBox="0 0 400 120" preserveAspectRatio="none">
        {/* Camada de trás - mais clara */}
        <path d="M0 120 L40 70 L80 90 L130 50 L180 75 L230 35 L280 60 L330 45 L380 70 L400 55 L400 120 Z" fill="#64748B" opacity="0.5"/>
        {/* Camada da frente - mais escura */}
        <path d="M0 120 L60 85 L100 100 L150 65 L200 85 L250 55 L300 80 L350 60 L400 90 L400 120 Z" fill="#475569"/>
      </svg>
    </div>
  );
}

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
  flag: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
    </svg>
  ),
};

function MapNode({ node, state, progress, onClick, positionX, isActive, nodeRef, totalNodes }) {
  const isLocked = state === 'locked';
  const isCompleted = state === 'completed';
  const isCurrent = state === 'in_progress' || state === 'unlocked';
  
  const nodeSize = node.isBoss ? 72 : 60;
  
  const displayTitle = node.isBoss && isLocked ? '???' : node.title;
  const displayTheme = node.isBoss && isLocked ? '???' : node.theme;
  
  return (
    <motion.div 
      ref={isActive ? nodeRef : null}
      initial={{ opacity: 0, scale: 0.8, x: positionX }}
      animate={{ opacity: 1, scale: 1, x: positionX }}
      className="flex flex-col items-center relative z-10"
    >
      <button
        onClick={() => !isLocked && onClick(node.id)}
        disabled={isLocked}
        className="flex flex-col items-center group"
        style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
      >
        <div 
          className="relative flex items-center justify-center"
          style={{ width: nodeSize + 24, height: nodeSize + 24 }}
        >
          {isCompleted && (
            <div 
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: `radial-gradient(circle, ${COLORS.success}30 0%, transparent 70%)` }}
            />
          )}

          {isCurrent && (
            <>
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute rounded-full opacity-30"
                style={{ width: nodeSize + 20, height: nodeSize + 20, backgroundColor: COLORS.primary }}
              />
              <div 
                className="absolute rounded-full"
                style={{ width: nodeSize + 12, height: nodeSize + 12, backgroundColor: `${COLORS.primary}20` }}
              />
            </>
          )}
          
          {isCompleted && (
            <div 
              className="absolute rounded-full"
              style={{ 
                width: nodeSize + 10, 
                height: nodeSize + 10,
                border: `3px solid ${COLORS.success}`,
                boxShadow: `0 0 12px ${COLORS.success}50`,
              }}
            />
          )}
          
          {isCurrent && progress > 0 && (
            <svg 
              className="absolute"
              style={{ width: nodeSize + 12, height: nodeSize + 12, transform: 'rotate(-90deg)' }}
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
          
          <motion.div 
            whileHover={!isLocked ? { scale: 1.08 } : {}}
            whileTap={!isLocked ? { scale: 0.95 } : {}}
            className="rounded-full flex items-center justify-center relative z-10"
            style={{ 
              width: nodeSize, 
              height: nodeSize,
              background: isLocked 
                ? `linear-gradient(135deg, ${COLORS.border} 0%, #CBD5E1 100%)`
                : isCompleted 
                  ? `linear-gradient(135deg, ${COLORS.success} 0%, #059669 100%)`
                  : node.isBoss
                    ? `linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`
                    : `linear-gradient(135deg, ${COLORS.primary} 0%, #2563EB 100%)`,
              color: isLocked ? COLORS.textMuted : COLORS.textLight,
              boxShadow: isLocked 
                ? 'inset 0 2px 4px rgba(0,0,0,0.1)' 
                : isCompleted
                  ? `0 8px 24px -4px ${COLORS.success}50`
                  : node.isBoss
                    ? '0 8px 24px -4px rgba(245, 158, 11, 0.5)'
                    : `0 8px 24px -4px ${COLORS.primary}50`,
            }}
          >
            {isLocked ? Icons.lock : isCompleted ? Icons.check : node.isBoss ? Icons.castle : (
              <span className="font-bold text-lg">{node.id}</span>
            )}
          </motion.div>
          
          {isLocked && (
            <div 
              className="absolute z-20 rounded-full p-1"
              style={{ top: 4, right: 4, backgroundColor: COLORS.textMuted, border: `2px solid ${COLORS.bgApp}` }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z"/>
              </svg>
            </div>
          )}
          
          {isCurrent && !isCompleted && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute z-20 font-bold rounded-full px-2 py-0.5 text-xs"
              style={{ 
                bottom: 4, right: 0,
                backgroundColor: COLORS.surface,
                color: COLORS.primary,
                border: `2px solid ${COLORS.primary}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              {progress}/3
            </motion.div>
          )}

          {isCompleted && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute z-20"
              style={{ top: 0, right: 0 }}
            >
              <span className="text-sm">✨</span>
            </motion.div>
          )}
        </div>
        
        <div className="mt-1 text-center">
          <div 
            className="text-sm font-semibold"
            style={{ 
              color: isLocked ? COLORS.textMuted : COLORS.text,
              opacity: isLocked ? 0.6 : 1,
              fontStyle: node.isBoss && isLocked ? 'italic' : 'normal',
            }}
          >
            {displayTitle}
          </div>
          {(isCurrent || isCompleted || (node.isBoss && isLocked)) && (
            <div 
              className="text-xs mt-0.5" 
              style={{ color: COLORS.textMuted, fontStyle: node.isBoss && isLocked ? 'italic' : 'normal' }}
            >
              {displayTheme}
            </div>
          )}
        </div>
      </button>
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
    <div className="flex justify-center relative z-10" style={{ height }}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id="pathGradientCompleted" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.success} />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="pathGradientActive" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.primary} />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor={COLORS.primary} />
          </linearGradient>
          <filter id="pathGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Sombra do caminho */}
        <path
          d={`M ${startX} 0 C ${startX} ${height * 0.5}, ${endX} ${height * 0.5}, ${endX} ${height}`}
          fill="none"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Caminho principal */}
        <path
          d={`M ${startX} 0 C ${startX} ${height * 0.5}, ${endX} ${height * 0.5}, ${endX} ${height}`}
          fill="none"
          stroke={isCompleted ? 'url(#pathGradientCompleted)' : isNext ? 'url(#pathGradientActive)' : COLORS.border}
          strokeWidth={isCompleted || isNext ? 5 : 4}
          strokeDasharray={isCompleted || isNext ? "none" : "8 8"}
          strokeLinecap="round"
          opacity={isCompleted || isNext ? 1 : 0.4}
          filter={isCompleted || isNext ? 'url(#pathGlow)' : 'none'}
        />
        
        {/* Pontos decorativos no caminho ativo */}
        {isNext && (
          <>
            <circle cx={startX} cy={height * 0.25} r="3" fill={COLORS.primary} opacity="0.5"/>
            <circle cx={(startX + endX) / 2} cy={height * 0.5} r="3" fill="#8B5CF6" opacity="0.5"/>
            <circle cx={endX} cy={height * 0.75} r="3" fill={COLORS.primary} opacity="0.5"/>
          </>
        )}
      </svg>
    </div>
  );
}

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

  // Calcula progresso geral (protegido contra divisão por zero)
  const completedCount = NODES_CONFIG.filter(node => getNodeState(node.id) === 'completed').length;
  const progressPercent = NODES_CONFIG.length > 0 ? (completedCount / NODES_CONFIG.length) * 100 : 0;

  useEffect(() => {
    setHasScrolled(false);
  }, [mapId]);

  useEffect(() => {
    if (!scrollRef.current || hasScrolled) return;
    
    const container = scrollRef.current;
    container.scrollTop = 0;
    
    const scrollDownTimer = setTimeout(() => {
      container.scrollTo({ top: container.scrollHeight * 0.3, behavior: 'smooth' });
    }, 300);
    
    const scrollToActiveTimer = setTimeout(() => {
      if (activeNodeRef.current) {
        activeNodeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setHasScrolled(true);
    }, 1200);
    
    return () => {
      clearTimeout(scrollDownTimer);
      clearTimeout(scrollToActiveTimer);
    };
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
      {/* Elementos decorativos */}
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
            {Icons.back}
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
        
        {/* Barra de progresso sutil */}
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
        style={{ height: 'calc(100vh - 80px)' }}
      >
        <div className="flex flex-col items-center px-4">
          {nodesReversed.map((node, index) => {
            const state = getNodeState(node.id);
            const progress = getNodeProgress(node.id);
            const positionX = getNodePosition(NODES_CONFIG.length - 1 - index, NODES_CONFIG.length);
            const prevPositionX = index > 0 ? getNodePosition(NODES_CONFIG.length - index, NODES_CONFIG.length) : 0;
            
            // Path colorido: se o node atual (de cima) está completo OU é o atual
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
                  totalNodes={NODES_CONFIG.length}
                />
              </div>
            );
          })}
          
          {/* Início da jornada */}
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
              <span style={{ color: '#f59e0b' }}>{Icons.flag}</span>
              <span className="text-sm font-semibold" style={{ color: '#D97706' }}>Início da Jornada</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal Reset */}
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
              style={{ backgroundColor: COLORS.surface, boxShadow: SHADOWS.cardDark }}
            >
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