/**
 * WorldSelect.jsx
 * 
 * "Toda grande jornada começa com um primeiro passo."
 *  — Lao Tzu
 * 
 * Zelda style: castelo é objetivo visual futuro
 * Ilhas clicáveis: Mapa 0, 1 e 2
 * Ilhas locked: mistério, futuro
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, GRADIENTS, SHADOWS } from '../../tokens';

// Mundos CLICÁVEIS (mapas reais) - posições em percentual
const PLAYABLE_WORLDS = [
  { 
    id: 0, 
    name: 'A Chegada', 
    subtitle: 'Primeiros Passos', 
    nodes: 10, 
    icon: '⛵', 
    color: '#60A5FA', 
    x: 42,
    y: 70 
  },
  { 
    id: 1, 
    name: 'O Despertar', 
    subtitle: 'Verb To Be', 
    nodes: 10, 
    icon: '🌅', 
    color: '#A78BFA', 
    x: 62, 
    y: 48 
  },
  { 
    id: 2, 
    name: 'A Casa', 
    subtitle: 'Preposições & Possessivos', 
    nodes: 5, 
    icon: '🏠', 
    color: '#34D399', 
    x: 25, 
    y: 55 
  },
];

// Ilhas LOCKED (futuro, mistério) - em percentual, size fixo
const LOCKED_ISLANDS = [
  { id: 'future1', x: 78, y: 62, size: 0.75 },
  { id: 'future2', x: 15, y: 28, size: 0.90 },
  { id: 'future3', x: 85, y: 35, size: 0.70 },
  { id: 'future4', x: 50, y: 28, size: 0.80 },
  { id: 'future5', x: 72, y: 78, size: 0.78 },
];

function PlayableIsland({ world, isSelected, onClick }) {
  return (
    <g 
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(world)}
    >
      {/* Sombra */}
      <ellipse
        cx={0}
        cy={22}
        rx={38}
        ry={14}
        fill="rgba(0,0,0,0.2)"
      />
      
      {/* Ilha base */}
      <ellipse
        cx={0}
        cy={10}
        rx={35}
        ry={18}
        fill="#90be6d"
        stroke="#2d6a4f"
        strokeWidth="2"
      />
      
      {/* Grama */}
      <ellipse cx={-12} cy={4} rx={10} ry={5} fill="#52b788" />
      <ellipse cx={14} cy={8} rx={8} ry={4} fill="#40916c" />
      
      {/* Pulse */}
      <circle cx={0} cy={-18} r={22} fill={world.color} opacity="0.2">
        <animate attributeName="r" values="20;26;20" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.25;0.1;0.25" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Marcador */}
      <circle
        cx={0}
        cy={-18}
        r={24}
        fill={world.color}
        stroke={isSelected ? '#fff' : 'rgba(0,0,0,0.2)'}
        strokeWidth={isSelected ? 3 : 2}
      />
      <text
        x={0}
        y={-14}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={20}
        style={{ pointerEvents: 'none' }}
      >
        {world.icon}
      </text>
      
      {/* Nome sempre visível */}
      <text
        x={0}
        y={42}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
        style={{ 
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          pointerEvents: 'none',
        }}
      >
        {world.name}
      </text>
      
      {/* Label expandido ao selecionar */}
      {isSelected && (
        <g transform="translate(0, 55)">
          <rect x="-55" y="0" width="110" height="28" rx="6" fill="rgba(0,0,0,0.85)" />
          <text x="0" y="18" textAnchor="middle" fill="#94a3b8" fontSize="10">
            {world.nodes} nodes • {world.subtitle}
          </text>
        </g>
      )}
    </g>
  );
}

function LockedIsland({ size = 1 }) {
  const s = size;
  return (
    <g>
      {/* Sombra */}
      <ellipse
        cx={0}
        cy={12 * s}
        rx={22 * s}
        ry={8 * s}
        fill="rgba(0,0,0,0.15)"
      />
      
      {/* Ilha escura */}
      <ellipse
        cx={0}
        cy={5 * s}
        rx={20 * s}
        ry={10 * s}
        fill="#475569"
        stroke="#334155"
        strokeWidth="1.5"
      />
      
      {/* Cadeado */}
      <circle
        cx={0}
        cy={-8 * s}
        r={12 * s}
        fill="#64748B"
        stroke="#475569"
        strokeWidth="1.5"
      />
      <text
        x={0}
        y={-5 * s}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12 * s}
        style={{ pointerEvents: 'none' }}
      >
        🔒
      </text>
    </g>
  );
}

function DecorativeCastle() {
  return (
    <g opacity="0.9">
      {/* Ilha do castelo */}
      <ellipse cx={0} cy={35} rx={55} ry={22} fill="rgba(0,0,0,0.15)" />
      <ellipse cx={0} cy={28} rx={50} ry={20} fill="#6b7280" stroke="#4b5563" strokeWidth="2" />
      
      {/* Névoa misteriosa */}
      <ellipse cx={-30} cy={20} rx={20} ry={8} fill="rgba(148,163,184,0.3)" />
      <ellipse cx={30} cy={25} rx={18} ry={6} fill="rgba(148,163,184,0.25)" />
      
      {/* Castelo em silhueta */}
      <g transform="translate(-25, -25)" opacity="0.7">
        {/* Base */}
        <rect x="10" y="30" width="30" height="25" fill="#374151" />
        {/* Porta */}
        <rect x="20" y="42" width="10" height="13" fill="#1f2937" rx="5" />
        {/* Torre esquerda */}
        <rect x="2" y="18" width="12" height="22" fill="#374151" />
        <polygon points="0,18 8,8 16,18" fill="#4b5563" />
        {/* Torre direita */}
        <rect x="36" y="18" width="12" height="22" fill="#374151" />
        <polygon points="34,18 42,8 50,18" fill="#4b5563" />
        {/* Torre central */}
        <rect x="18" y="8" width="14" height="26" fill="#374151" />
        <polygon points="16,8 25,-2 34,8" fill="#4b5563" />
        {/* Bandeira */}
        <line x1="25" y1="-2" x2="25" y2="-14" stroke="#6b7280" strokeWidth="1.5" />
        <polygon points="25,-14 33,-10 25,-6" fill="#9ca3af" />
      </g>
      
      {/* "???" */}
      <text
        x={0}
        y={55}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="14"
        fontWeight="bold"
        fontStyle="italic"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
      >
        ???
      </text>
    </g>
  );
}

// Componente de nuvem
function Cloud({ x, y, scale = 1 }) {
  return (
    <ellipse 
      cx={x} 
      cy={y} 
      rx={45 * scale} 
      ry={15 * scale} 
      fill="rgba(255,255,255,0.15)" 
    />
  );
}

export default function WorldSelect({ onSelectWorld, onBack }) {
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [containerSize, setContainerSize] = useState({ width: 900, height: 600 });
  const containerRef = useRef(null);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  
  // Medir container
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({ width: rect.width, height: rect.height });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Música ambiente (volume reduzido)
  useEffect(() => {
    const audio = new Audio('/audio/worldTheme.mp3');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    
    const targetVolume = 0.09;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        let vol = 0;
        fadeIntervalRef.current = setInterval(() => {
          vol += 0.02;
          if (vol >= targetVolume) {
            audio.volume = targetVolume;
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          } else {
            audio.volume = vol;
          }
        }, 50);
      }).catch(() => {});
    }
    
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const handleNavigate = (callback) => {
    if (audioRef.current && audioRef.current.volume > 0) {
      const audio = audioRef.current;
      let vol = audio.volume;
      const fadeOut = setInterval(() => {
        vol -= 0.01;
        if (vol <= 0) {
          audio.pause();
          clearInterval(fadeOut);
          callback();
        } else {
          audio.volume = vol;
        }
      }, 30);
    } else {
      callback();
    }
  };
  
  const handleWorldClick = (world) => {
    if (selectedWorld?.id === world.id) {
      handleNavigate(() => onSelectWorld(world.id));
    } else {
      setSelectedWorld(world);
    }
  };
  
  const handleBack = () => {
    handleNavigate(() => onBack());
  };
  
  const handleExplore = () => {
    if (selectedWorld) {
      handleNavigate(() => onSelectWorld(selectedWorld.id));
    }
  };

  // Converter percentual para pixels
  const toX = (percent) => (percent / 100) * containerSize.width;
  const toY = (percent) => (percent / 100) * containerSize.height;
  
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ backgroundColor: '#0c4a6e' }}>
      {/* Header */}
      <header className="flex-shrink-0 p-3 flex items-center justify-between bg-gradient-to-b from-black/40 to-transparent relative z-10">
        <button 
          onClick={handleBack}
          className="text-white/70 hover:text-white flex items-center gap-1.5 text-sm transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
          <span>Voltar</span>
        </button>
        <h1 className="text-white font-bold text-sm sm:text-base drop-shadow-lg flex items-center gap-2">
          <span>🏰</span>
          <span>A Minha Jornada</span>
        </h1>
        <div className="w-16" />
      </header>
      
      {/* Mapa - Background CSS + SVG elementos */}
      <div 
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #38bdf8 0%, #0369a1 100%)',
        }}
      >
        {/* Waves pattern via CSS */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='25'%3E%3Cpath d='M0 12 Q20 6 40 12 T80 12' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
        
        {/* SVG com elementos posicionados em % */}
        <svg 
          className="absolute inset-0 w-full h-full"
          style={{ overflow: 'visible' }}
        >
          {/* Nuvens */}
          <Cloud x={toX(12)} y={toY(10)} scale={1.2} />
          <Cloud x={toX(88)} y={toY(8)} />
          <Cloud x={toX(50)} y={toY(5)} scale={0.8} />
          <Cloud x={toX(30)} y={toY(14)} scale={0.9} />
          <Cloud x={toX(70)} y={toY(18)} scale={0.7} />
          
          {/* Castelo decorativo - topo centro */}
          <g transform={`translate(${toX(50)}, ${toY(14)})`}>
            <DecorativeCastle />
          </g>
          
          {/* Caminhos dourados conectando os mundos */}
          <g fill="none" stroke="#e6c288" strokeWidth="3" strokeDasharray="12,8" strokeLinecap="round" opacity="0.4">
            {/* Chegada -> Despertar */}
            <path d={`M ${toX(42)} ${toY(70)} Q ${toX(52)} ${toY(58)} ${toX(62)} ${toY(48)}`} />
            {/* Chegada -> Casa */}
            <path d={`M ${toX(42)} ${toY(70)} Q ${toX(32)} ${toY(62)} ${toX(25)} ${toY(55)}`} />
            {/* Casa -> futuro (castelo) */}
            <path d={`M ${toX(25)} ${toY(55)} Q ${toX(35)} ${toY(35)} ${toX(50)} ${toY(22)}`} opacity="0.25" strokeDasharray="8,12" />
            {/* Despertar -> futuro (castelo) */}
            <path d={`M ${toX(62)} ${toY(48)} Q ${toX(56)} ${toY(32)} ${toX(50)} ${toY(22)}`} opacity="0.25" strokeDasharray="8,12" />
          </g>
          
          {/* Ilhas LOCKED */}
          {LOCKED_ISLANDS.map((island) => (
            <g key={island.id} transform={`translate(${toX(island.x)}, ${toY(island.y)})`}>
              <LockedIsland size={island.size} />
            </g>
          ))}
          
          {/* Ilhas JOGÁVEIS */}
          {PLAYABLE_WORLDS.map((world) => (
            <g key={world.id} transform={`translate(${toX(world.x)}, ${toY(world.y)})`}>
              <PlayableIsland
                world={world}
                isSelected={selectedWorld?.id === world.id}
                onClick={handleWorldClick}
              />
            </g>
          ))}
          
          {/* Bússola - canto inferior direito */}
          <g transform={`translate(${toX(92)}, ${toY(90)})`}>
            <circle r="20" fill="rgba(0,0,0,0.25)" />
            <circle r="16" fill="#1e3a5f" stroke="#e6c288" strokeWidth="1.5" />
            <text y="-4" textAnchor="middle" fill="#e6c288" fontSize="9" fontWeight="bold">N</text>
            <polygon points="0,-11 -3,-5 3,-5" fill="#e6c288" />
            <polygon points="0,11 -3,5 3,5" fill="#64748b" />
          </g>
        </svg>
      </div>
      
      {/* ═══════════════════════════════════════════════════════════
          PAINEL INFERIOR - Visual Dark Premium
          ═══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedWorld && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex-shrink-0 relative overflow-hidden"
            style={{
              background: GRADIENTS.darkCard,
              borderTop: `1px solid ${selectedWorld.color}30`,
            }}
          >
            {/* Grid texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
              }}
            />

            {/* Glow do mundo selecionado */}
            <div
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
              style={{ 
                background: `radial-gradient(ellipse, ${selectedWorld.color}25 0%, transparent 70%)`,
              }}
            />

            {/* Accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ 
                background: `linear-gradient(90deg, transparent 0%, ${selectedWorld.color} 50%, transparent 100%)`,
                opacity: 0.5,
              }}
            />

            <div className="relative z-10 p-4">
              <div className="flex items-center justify-between max-w-md mx-auto gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Icon com glow */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ 
                      backgroundColor: `${selectedWorld.color}20`,
                      border: `1px solid ${selectedWorld.color}40`,
                      boxShadow: `0 0 20px ${selectedWorld.color}30`,
                    }}
                  >
                    {selectedWorld.icon}
                  </motion.div>

                  <div className="min-w-0">
                    <motion.h2 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-bold truncate"
                      style={{ color: COLORS.textLight }}
                    >
                      {selectedWorld.name}
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="text-sm truncate"
                      style={{ color: COLORS.textDark }}
                    >
                      {selectedWorld.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-center gap-2 mt-1"
                    >
                      <span 
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ 
                          backgroundColor: `${selectedWorld.color}20`,
                          color: selectedWorld.color,
                        }}
                      >
                        {selectedWorld.nodes} nodes
                      </span>
                    </motion.div>
                  </div>
                </div>
                
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl font-bold text-white flex-shrink-0 transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${selectedWorld.color}, ${selectedWorld.color}CC)`,
                    boxShadow: `0 8px 24px -4px ${selectedWorld.color}50`,
                  }}
                  onClick={handleExplore}
                >
                  Explorar →
                </motion.button>
              </div>
            </div>

            {/* Safe area bottom */}
            <div className="h-safe-bottom" style={{ background: COLORS.dark?.bg || '#0f172a' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}