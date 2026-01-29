import { motion } from 'framer-motion';
import { COLORS, GRADIENTS } from '../../tokens';

/**
 * BottomNav - EnglishPlus 2.0
 * Visual: Mesmo padrão do card "Meu Progresso"
 */

const NAV_ITEMS = [
  { 
    id: 'home', 
    label: 'Home',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    iconFilled: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  { 
    id: 'adventure',  // ← CORRIGIDO: era 'world'
    label: 'Mapa',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    iconFilled: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
      </svg>
    ),
  },
  { 
    id: 'stories', 
    label: 'Histórias',
    color: COLORS.secondary,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    iconFilled: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1z" />
      </svg>
    ),
  },
  { 
    id: 'profile', 
    label: 'Perfil',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    iconFilled: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
  },
];

export function BottomNav({ currentSection, onNavigate }) {
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden"
      style={{ 
        background: GRADIENTS.darkCard,
        borderTop: `1px solid ${COLORS.dark.border}`,
      }}
    >
      {/* Subtle glow at top */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none"
        style={{ background: GRADIENTS.blueGlow, opacity: 0.5 }}
      />

      <div className="relative z-10 flex items-center justify-around px-2 py-2 pb-safe">
        {NAV_ITEMS.map((item) => {
          const isActive = currentSection === item.id;
          const activeColor = item.color || COLORS.primary;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id)}
              className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[64px]"
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavActive"
                  className="absolute inset-x-1 top-1 bottom-1 rounded-xl"
                  style={{ backgroundColor: activeColor }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              
              {/* Icon */}
              <span 
                className="relative z-10 transition-colors duration-200"
                style={{ color: isActive ? COLORS.textLight : COLORS.textDark }}
              >
                {isActive ? (item.iconFilled || item.icon) : item.icon}
              </span>
              
              {/* Label */}
              <span 
                className="relative z-10 text-[10px] mt-1 font-medium transition-colors duration-200"
                style={{ color: isActive ? COLORS.textLight : COLORS.textDark }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* iOS home indicator space */}
      <div className="h-safe-bottom" style={{ background: COLORS.dark.bg }} />
    </nav>
  );
}

export default BottomNav;