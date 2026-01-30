/**
 * MapNode.jsx
 * 
 * "Cada passo é uma vitória."
 *  — Provérbio Japonês
 */
import { motion } from 'framer-motion';
import { COLORS } from '../../tokens';
import { MapIcons } from './MapIcons';

export function MapNode({ node, state, progress, onClick, positionX, isActive, nodeRef }) {
  const isLocked = state === 'locked';
  const isCompleted = state === 'completed';
  const isCurrent = state === 'in_progress' || state === 'unlocked';
  
  const nodeSize = node.isBoss ? 72 : 60;
  
  // Total de steps dinâmico (suporta nodes com quantidades diferentes)
  const totalSteps = node?.levels?.length ?? 3;
  const safeProgress = Math.max(0, Math.min(totalSteps, Number(progress ?? 0)));
  
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
          
          {isCurrent && safeProgress > 0 && (
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
                strokeDashoffset={Math.PI * (nodeSize + 4) * (1 - safeProgress / totalSteps)}
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
            {isLocked ? MapIcons.lock : isCompleted ? MapIcons.check : node.isBoss ? MapIcons.castle : (
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
              {safeProgress}/{totalSteps}
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