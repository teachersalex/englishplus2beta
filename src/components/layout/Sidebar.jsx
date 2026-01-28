import { COLORS, GRADIENTS } from '../../tokens';

/**
 * Sidebar - EnglishPlus 2.0
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
  },
  { 
    id: 'world', 
    label: 'Mapa',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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
  },
  { 
    id: 'profile', 
    label: 'Perfil',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];

export function Sidebar({ currentSection, onNavigate, user, progress }) {
  return (
    <aside 
      className="fixed left-0 top-0 bottom-0 w-72 flex flex-col z-40 overflow-hidden"
      style={{ background: GRADIENTS.darkCard }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-32 -right-32 w-64 h-64 pointer-events-none"
        style={{ background: GRADIENTS.blueGlow }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Accent line */}
      <div
        className="absolute right-0 top-20 bottom-20 w-px pointer-events-none"
        style={{ background: GRADIENTS.accent, opacity: 0.3 }}
      />

      {/* Logo */}
      <div className="relative z-10 p-6 border-b" style={{ borderColor: COLORS.dark.border }}>
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: COLORS.primary }}
          >
            <span className="text-white font-bold">E+</span>
          </div>
          <div>
            <span className="font-bold text-lg tracking-tight" style={{ color: COLORS.textLight }}>
              ENGLISH
            </span>
            <span className="font-bold text-lg" style={{ color: COLORS.primary }}>
              PLUS
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 p-4">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = currentSection === item.id;
            const activeColor = item.color || COLORS.primary;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate?.(item.id)}
                  className="w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? activeColor : 'transparent',
                    color: isActive ? COLORS.textLight : COLORS.textDark,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = COLORS.dark.hover;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span className="w-6 h-6">{item.icon}</span>
                  <span className="font-medium text-base">{item.label}</span>
                  
                  {item.id === 'stories' && progress?.storyDiamonds > 0 && (
                    <span 
                      className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(139, 92, 246, 0.2)',
                        color: isActive ? COLORS.textLight : COLORS.secondary,
                      }}
                    >
                      {progress.storyDiamonds} 💎
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="relative z-10 p-4 border-t" style={{ borderColor: COLORS.dark.border }}>
        <div 
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ backgroundColor: COLORS.dark.hover }}
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: COLORS.primary }}
          >
            <span className="text-white font-bold">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate" style={{ color: COLORS.textLight }}>
              {user?.name?.split(' ')[0] || 'Aluno'}
            </p>
            <p className="text-xs" style={{ color: COLORS.textDark }}>
              Plano {user?.plan || 'Pro'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;