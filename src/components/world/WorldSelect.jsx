/**
 * WorldSelect.jsx
 * O MUNDO DO TEACHER ALEX
 * 
 * Zelda style: castelo é objetivo visual futuro
 * Ilhas clicáveis: Mapa 0 e Mapa 1
 * Ilhas locked: mistério, futuro
 */
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mundos CLICÁVEIS (mapas reais)
const PLAYABLE_WORLDS = [
  { 
    id: 0, 
    name: 'A Chegada', 
    subtitle: 'Primeiros Passos', 
    nodes: 5, 
    icon: '⛵', 
    color: '#60A5FA', 
    x: 350, 
    y: 420 
  },
  { 
    id: 1, 
    name: 'O Despertar', 
    subtitle: 'Verb To Be', 
    nodes: 10, 
    icon: '🌅', 
    color: '#A78BFA', 
    x: 550, 
    y: 300 
  },
];

// Ilhas LOCKED (futuro, mistério)
const LOCKED_ISLANDS = [
  { id: 'future1', x: 180, y: 320 },
  { id: 'future2', x: 720, y: 400 },
  { id: 'future3', x: 120, y: 180 },
  { id: 'future4', x: 780, y: 220 },
  { id: 'future5', x: 450, y: 180 },
  { id: 'future6', x: 250, y: 200 },
  { id: 'future7', x: 650, y: 480 },
];

function PlayableIsland({ world, isSelected, onClick }) {
  const scale = 1;
  
  return (
    <g 
      transform={`translate(${world.x}, ${world.y})`}
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

function LockedIsland({ x, y, size = 1 }) {
  const s = size;
  return (
    <g transform={`translate(${x}, ${y})`}>
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

function DecorativeCastle({ x, y }) {
  return (
    <g transform={`translate(${x}, ${y})`} opacity="0.9">
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

export default function WorldSelect({ onSelectWorld, onBack }) {
  const [selectedWorld, setSelectedWorld] = useState(null);
  const audioRef = useRef(null);
  
  // Música ambiente
  useEffect(() => {
    const audio = new Audio('/audio/worldTheme.mp3');
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        let vol = 0;
        const fadeIn = setInterval(() => {
          vol += 0.02;
          if (vol >= 0.3) {
            audio.volume = 0.3;
            clearInterval(fadeIn);
          } else {
            audio.volume = vol;
          }
        }, 50);
      }).catch(() => {});
    }
    
    return () => {
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
        vol -= 0.05;
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
          <span>O Mundo do Teacher Alex</span>
        </h1>
        <div className="w-16" />
      </header>
      
      {/* Mapa */}
      <div className="flex-1 relative overflow-hidden">
        <svg 
          viewBox="0 0 900 600"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <pattern id="waves" patternUnits="userSpaceOnUse" width="80" height="25">
              <path d="M0 12 Q20 6 40 12 T80 12" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2"/>
            </pattern>
          </defs>
          
          {/* Oceano */}
          <rect x="-100" y="-100" width="1100" height="800" fill="url(#ocean)" />
          <rect x="-100" y="-100" width="1100" height="800" fill="url(#waves)" />
          
          {/* Nuvens */}
          <g fill="rgba(255,255,255,0.15)">
            <ellipse cx="120" cy="70" rx="55" ry="18" />
            <ellipse cx="750" cy="55" rx="45" ry="15" />
            <ellipse cx="450" cy="40" rx="35" ry="12" />
            <ellipse cx="850" cy="140" rx="40" ry="14" />
            <ellipse cx="60" cy="250" rx="30" ry="10" />
            <ellipse cx="300" cy="90" rx="40" ry="13" />
            <ellipse cx="620" cy="100" rx="35" ry="11" />
          </g>
          
          {/* Castelo decorativo - OBJETIVO FUTURO */}
          <DecorativeCastle x={450} y={80} />
          
          {/* Caminho dourado: Chegada → Despertar → (futuro) Castelo */}
          <g fill="none" stroke="#e6c288" strokeWidth="3" strokeDasharray="12,8" strokeLinecap="round" opacity="0.4">
            {/* Chegada → Despertar */}
            <path d="M 350 420 Q 450 360 550 300" />
            {/* Despertar → Castelo (mais fraco, futuro) */}
            <path d="M 550 300 Q 500 200 450 140" opacity="0.3" strokeDasharray="8,12" />
          </g>
          
          {/* Ilhas LOCKED */}
          {LOCKED_ISLANDS.map((island, i) => (
            <LockedIsland 
              key={island.id} 
              x={island.x} 
              y={island.y} 
              size={0.7 + Math.random() * 0.3}
            />
          ))}
          
          {/* Ilhas JOGÁVEIS */}
          {PLAYABLE_WORLDS.map((world) => (
            <PlayableIsland
              key={world.id}
              world={world}
              isSelected={selectedWorld?.id === world.id}
              onClick={handleWorldClick}
            />
          ))}
          
          {/* Bússola */}
          <g transform="translate(850, 550)">
            <circle r="20" fill="rgba(0,0,0,0.25)" />
            <circle r="16" fill="#1e3a5f" stroke="#e6c288" strokeWidth="1.5" />
            <text y="-4" textAnchor="middle" fill="#e6c288" fontSize="9" fontWeight="bold">N</text>
            <polygon points="0,-11 -3,-5 3,-5" fill="#e6c288" />
            <polygon points="0,11 -3,5 3,5" fill="#64748b" />
          </g>
        </svg>
      </div>
      
      {/* Painel inferior */}
      <AnimatePresence>
        {selectedWorld && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="flex-shrink-0 p-4 border-t"
            style={{
              backgroundColor: '#0f172a',
              borderColor: selectedWorld.color + '40',
            }}
          >
            <div className="flex items-center justify-between max-w-md mx-auto gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: selectedWorld.color + '20' }}
                >
                  {selectedWorld.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="text-white font-bold truncate">{selectedWorld.name}</h2>
                  <p className="text-white/50 text-sm truncate">{selectedWorld.subtitle} • {selectedWorld.nodes} nodes</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl font-bold text-white flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${selectedWorld.color}, ${selectedWorld.color}CC)`,
                  boxShadow: `0 4px 14px ${selectedWorld.color}40`,
                }}
                onClick={handleExplore}
              >
                Explorar →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}