/**
 * DecoElements.jsx
 * 
 * "A natureza não tem pressa, e no entanto tudo se realiza."
 *  — Lao Tzu
 * 
 * Elementos decorativos SVG - Vale com rio
 */
import { motion } from 'framer-motion';

export function DecoElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* ═══════════════════════════════════════════════════════════
          CÉU E ATMOSFERA
          ═══════════════════════════════════════════════════════════ */}
      
      {/* Sol com halo suave */}
      <div 
        className="absolute top-16 right-[15%] w-20 h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.25) 0%, rgba(251, 191, 36, 0.1) 40%, transparent 70%)',
        }}
      />
      <div 
        className="absolute top-20 right-[17%] w-8 h-8 rounded-full"
        style={{
          background: 'radial-gradient(circle, #fef3c7 0%, #fcd34d 40%, transparent 100%)',
          opacity: 0.4,
        }}
      />

      {/* Nuvens - Volumétricas e naturais */}
      <svg className="absolute top-8 left-[8%] w-48 h-20 opacity-[0.18]" viewBox="0 0 140 50">
        <ellipse cx="25" cy="35" rx="20" ry="12" fill="#E2E8F0"/>
        <ellipse cx="50" cy="28" rx="28" ry="16" fill="#F1F5F9"/>
        <ellipse cx="80" cy="32" rx="24" ry="14" fill="#E2E8F0"/>
        <ellipse cx="105" cy="38" rx="18" ry="10" fill="#F1F5F9"/>
        <ellipse cx="65" cy="22" rx="18" ry="10" fill="white" opacity="0.7"/>
      </svg>
      
      <svg className="absolute top-20 right-[5%] w-40 h-16 opacity-[0.14]" viewBox="0 0 120 40">
        <ellipse cx="20" cy="28" rx="18" ry="10" fill="#E2E8F0"/>
        <ellipse cx="45" cy="22" rx="22" ry="13" fill="#F1F5F9"/>
        <ellipse cx="75" cy="26" rx="20" ry="11" fill="#E2E8F0"/>
        <ellipse cx="100" cy="30" rx="16" ry="9" fill="#F1F5F9"/>
        <ellipse cx="55" cy="18" rx="12" ry="7" fill="white" opacity="0.6"/>
      </svg>

      {/* Nuvem média flutuando */}
      <motion.svg 
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[2%] w-32 h-14 opacity-[0.12]" 
        viewBox="0 0 100 35"
      >
        <ellipse cx="20" cy="24" rx="16" ry="9" fill="#94A3B8"/>
        <ellipse cx="42" cy="18" rx="20" ry="12" fill="#94A3B8"/>
        <ellipse cx="68" cy="22" rx="18" ry="10" fill="#94A3B8"/>
        <ellipse cx="50" cy="14" rx="12" ry="7" fill="#CBD5E1" opacity="0.8"/>
      </motion.svg>

      <motion.svg 
        animate={{ x: [0, -12, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] right-[3%] w-28 h-12 opacity-[0.10]" 
        viewBox="0 0 90 30"
      >
        <ellipse cx="18" cy="20" rx="14" ry="8" fill="#94A3B8"/>
        <ellipse cx="38" cy="15" rx="18" ry="10" fill="#94A3B8"/>
        <ellipse cx="62" cy="18" rx="16" ry="9" fill="#94A3B8"/>
        <ellipse cx="45" cy="12" rx="10" ry="6" fill="#CBD5E1" opacity="0.7"/>
      </motion.svg>

      {/* Pássaros voando */}
      <motion.svg 
        animate={{ x: [0, 30, 60], y: [0, -5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-[15%] left-[10%] w-16 h-8 opacity-[0.20]" 
        viewBox="0 0 50 20"
      >
        <path d="M5 10 Q10 5 15 10" stroke="#475569" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M20 8 Q26 2 32 8" stroke="#475569" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <path d="M36 12 Q40 8 44 12" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </motion.svg>

      <motion.svg 
        animate={{ x: [0, -20, -40], y: [0, -3, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 3 }}
        className="absolute top-[22%] right-[15%] w-12 h-6 opacity-[0.15]" 
        viewBox="0 0 40 15"
      >
        <path d="M4 8 Q9 3 14 8" stroke="#64748B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M18 6 Q24 1 30 6" stroke="#64748B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </motion.svg>

      {/* ═══════════════════════════════════════════════════════════
          MONTANHAS LATERAIS (VALE) - Formas orgânicas
          ═══════════════════════════════════════════════════════════ */}

      {/* Montanha esquerda - distante */}
      <svg className="absolute top-[22%] -left-16 w-56 h-[55vh] opacity-[0.08]" viewBox="0 0 120 220">
        <defs>
          <linearGradient id="mtnLeftFar" x1="100%" y1="0%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#64748B"/>
            <stop offset="100%" stopColor="#94A3B8"/>
          </linearGradient>
          <linearGradient id="mtnFadeLeft" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="white"/>
            <stop offset="60%" stopColor="white"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <mask id="maskLeft">
            <rect width="120" height="220" fill="url(#mtnFadeLeft)"/>
          </mask>
        </defs>
        <path 
          d="M120 220 
             C120 220 115 180 110 150
             C105 120 95 100 85 80
             Q75 55 65 45
             Q50 30 40 35
             Q25 42 20 60
             Q10 85 5 120
             C0 160 0 220 0 220 Z" 
          fill="url(#mtnLeftFar)"
          mask="url(#maskLeft)"
        />
        <ellipse cx="62" cy="48" rx="8" ry="4" fill="white" opacity="0.4" transform="rotate(-15 62 48)"/>
      </svg>

      {/* Montanha esquerda - próxima */}
      <svg className="absolute top-[38%] -left-12 w-44 h-[48vh] opacity-[0.12]" viewBox="0 0 100 200">
        <defs>
          <linearGradient id="mtnLeftNear" x1="100%" y1="0%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#475569"/>
            <stop offset="100%" stopColor="#64748B"/>
          </linearGradient>
          <mask id="maskLeftNear">
            <rect width="100" height="200" fill="url(#mtnFadeLeft)"/>
          </mask>
        </defs>
        <path 
          d="M100 200 
             C100 200 95 160 90 130
             Q85 100 75 75
             Q65 50 55 40
             Q40 28 30 35
             Q15 48 10 75
             Q5 110 0 200 Z" 
          fill="url(#mtnLeftNear)"
          mask="url(#maskLeftNear)"
        />
        <ellipse cx="52" cy="42" rx="6" ry="3" fill="white" opacity="0.45" transform="rotate(-10 52 42)"/>
      </svg>

      {/* Montanha direita - distante */}
      <svg className="absolute top-[25%] -right-24 w-48 h-[45vh] opacity-[0.06]" viewBox="0 0 120 220">
        <defs>
          <linearGradient id="mtnRightFar" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#64748B"/>
            <stop offset="100%" stopColor="#94A3B8"/>
          </linearGradient>
          <linearGradient id="mtnFadeRight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white"/>
            <stop offset="40%" stopColor="white"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <mask id="maskRight">
            <rect width="120" height="220" fill="url(#mtnFadeRight)"/>
          </mask>
        </defs>
        <path 
          d="M0 220 
             C0 220 5 180 10 150
             C15 120 25 100 35 80
             Q45 55 55 45
             Q70 30 80 35
             Q95 42 100 60
             Q110 85 115 120
             C120 160 120 220 120 220 Z" 
          fill="url(#mtnRightFar)"
          mask="url(#maskRight)"
        />
      </svg>

      {/* Colina suave no fundo */}
      <svg className="absolute bottom-[8%] -left-6 w-36 h-32 opacity-[0.06]" viewBox="0 0 90 80">
        <path 
          d="M0 80 Q15 55 35 48 Q55 40 75 52 Q90 62 90 80 Z" 
          fill="#475569"
        />
      </svg>

      {/* ═══════════════════════════════════════════════════════════
          RIO (FLOW) - Centro
          ═══════════════════════════════════════════════════════════ */}

      <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0"/>
            <stop offset="30%" stopColor="#3B82F6" stopOpacity="0.3"/>
            <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        <path 
          d="M48 0 
             Q52 10 50 20 
             Q47 30 53 40 
             Q58 50 50 60 
             Q42 70 48 80 
             Q54 90 50 100" 
          stroke="url(#riverGrad)" 
          strokeWidth="3" 
          fill="none"
          strokeLinecap="round"
        />
        <path 
          d="M46 0 
             Q50 10 48 20 
             Q45 30 51 40 
             Q56 50 48 60 
             Q40 70 46 80 
             Q52 90 48 100" 
          stroke="#3B82F6" 
          strokeWidth="0.5" 
          fill="none"
          opacity="0.3"
        />
        <path 
          d="M50 0 
             Q54 10 52 20 
             Q49 30 55 40 
             Q60 50 52 60 
             Q44 70 50 80 
             Q56 90 52 100" 
          stroke="#06B6D4" 
          strokeWidth="0.5" 
          fill="none"
          opacity="0.3"
        />
      </svg>

      {/* Brilhos na água */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[48%] w-1 h-1 rounded-full bg-white"
      />
      <motion.div
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[60%] left-[51%] w-1.5 h-1.5 rounded-full bg-cyan-200"
      />
      <motion.div
        animate={{ opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[75%] left-[49%] w-1 h-1 rounded-full bg-white"
      />

      {/* ═══════════════════════════════════════════════════════════
          VEGETAÇÃO
          ═══════════════════════════════════════════════════════════ */}

      {/* Árvores/folhagem esquerda */}
      <svg className="absolute top-[45%] -left-2 w-24 h-48 opacity-[0.18]" viewBox="0 0 50 100">
        <path d="M25 100 Q5 70 15 45 Q25 20 20 0" stroke="#047857" strokeWidth="2.5" fill="none"/>
        <ellipse cx="12" cy="60" rx="10" ry="5" fill="#10B981" transform="rotate(-40 12 60)"/>
        <ellipse cx="24" cy="45" rx="9" ry="4.5" fill="#059669" transform="rotate(35 24 45)"/>
        <ellipse cx="10" cy="32" rx="8" ry="4" fill="#10B981" transform="rotate(-30 10 32)"/>
        <ellipse cx="22" cy="18" rx="7" ry="3.5" fill="#059669" transform="rotate(25 22 18)"/>
        <ellipse cx="18" cy="75" rx="5" ry="2.5" fill="#34D399" transform="rotate(-45 18 75)"/>
        <ellipse cx="6" cy="48" rx="4" ry="2" fill="#34D399" transform="rotate(-35 6 48)"/>
      </svg>

      {/* Árvores/folhagem direita */}
      <svg className="absolute top-[48%] -right-4 w-20 h-40 opacity-[0.12]" viewBox="0 0 50 100">
        <path d="M25 100 Q45 70 35 45 Q25 20 30 0" stroke="#047857" strokeWidth="2" fill="none"/>
        <ellipse cx="38" cy="60" rx="8" ry="4" fill="#10B981" transform="rotate(40 38 60)"/>
        <ellipse cx="26" cy="45" rx="7" ry="3.5" fill="#059669" transform="rotate(-35 26 45)"/>
        <ellipse cx="36" cy="32" rx="6" ry="3" fill="#10B981" transform="rotate(30 36 32)"/>
      </svg>

      {/* Flores pequenas */}
      <svg className="absolute top-[60%] left-4 w-6 h-6 opacity-[0.22]" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="2.5" fill="#F472B6"/>
        <circle cx="10" cy="5" r="1.8" fill="#FBCFE8"/>
        <circle cx="14" cy="8" r="1.8" fill="#FBCFE8"/>
        <circle cx="14" cy="13" r="1.8" fill="#FBCFE8"/>
        <circle cx="10" cy="15" r="1.8" fill="#FBCFE8"/>
        <circle cx="6" cy="13" r="1.8" fill="#FBCFE8"/>
        <circle cx="6" cy="8" r="1.8" fill="#FBCFE8"/>
      </svg>

      <svg className="absolute top-[58%] right-6 w-4 h-4 opacity-[0.12]" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="2" fill="#A78BFA"/>
        <circle cx="10" cy="5.5" r="1.5" fill="#DDD6FE"/>
        <circle cx="13.5" cy="8" r="1.5" fill="#DDD6FE"/>
        <circle cx="13.5" cy="12.5" r="1.5" fill="#DDD6FE"/>
        <circle cx="10" cy="14.5" r="1.5" fill="#DDD6FE"/>
        <circle cx="6.5" cy="12.5" r="1.5" fill="#DDD6FE"/>
        <circle cx="6.5" cy="8" r="1.5" fill="#DDD6FE"/>
      </svg>

      {/* ═══════════════════════════════════════════════════════════
          PARTÍCULAS FLUTUANTES
          ═══════════════════════════════════════════════════════════ */}
      
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[35%] left-[18%] w-1.5 h-1.5 rounded-full opacity-[0.20]"
        style={{ backgroundColor: '#fbbf24' }}
      />
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[50%] right-[22%] w-1 h-1 rounded-full opacity-[0.18]"
        style={{ backgroundColor: '#a78bfa' }}
      />
      <motion.div
        animate={{ y: [0, -18, 0], x: [0, 5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[68%] left-[20%] w-1 h-1 rounded-full opacity-[0.15]"
        style={{ backgroundColor: '#34d399' }}
      />

      {/* Pinheiro distante */}
      <svg className="absolute bottom-[15%] left-[6%] w-5 h-12 opacity-[0.07]" viewBox="0 0 18 45">
        <path d="M9 45 L9 32" stroke="#1e293b" strokeWidth="1.8"/>
        <path d="M9 35 L3 18 L9 22 L15 18 Z" fill="#1e293b"/>
        <path d="M9 23 L5 10 L9 14 L13 10 Z" fill="#1e293b"/>
        <path d="M9 14 L6 3 L9 7 L12 3 Z" fill="#1e293b"/>
      </svg>

    </div>
  );
}
