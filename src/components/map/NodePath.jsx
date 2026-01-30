/**
 * NodePath.jsx
 * 
 * "Entre dois pontos, a linha curva é a mais bela."
 *  — Oscar Niemeyer
 */
import { useId } from 'react';
import { COLORS } from '../../tokens';

export function NodePath({ fromX, toX, isCompleted, isNext }) {
  const id = useId();
  const gradCompleted = `pathGradientCompleted-${id}`;
  const gradActive = `pathGradientActive-${id}`;
  const glow = `pathGlow-${id}`;

  const height = 50;
  const width = 200;
  const centerX = width / 2;
  const startX = centerX + fromX;
  const endX = centerX + toX;
  
  return (
    <div className="flex justify-center relative z-10" style={{ height }}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradCompleted} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.success} />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id={gradActive} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={COLORS.primary} />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor={COLORS.primary} />
          </linearGradient>
          <filter id={glow}>
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
          stroke={isCompleted ? `url(#${gradCompleted})` : isNext ? `url(#${gradActive})` : COLORS.border}
          strokeWidth={isCompleted || isNext ? 5 : 4}
          strokeDasharray={isCompleted || isNext ? undefined : "8 8"}
          strokeLinecap="round"
          opacity={isCompleted || isNext ? 1 : 0.4}
          filter={isCompleted || isNext ? `url(#${glow})` : undefined}
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