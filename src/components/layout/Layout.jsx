import { COLORS } from '../../tokens';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

/**
 * Layout
 * Nova paleta: Azul elétrico + Off-white
 * Sistema de navegação adaptativo (CSS puro, sem flicker)
 */

export function Layout({ 
  children, 
  currentSection = 'home',
  onNavigate,
  user,
  progress,
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgApp }}>
      {/* Desktop: Sidebar (hidden no mobile) */}
      <div className="hidden md:block">
        <Sidebar 
          currentSection={currentSection}
          onNavigate={onNavigate}
          user={user}
          progress={progress}
        />
      </div>

      {/* Main Content */}
      <main className="min-h-screen pb-20 md:pb-0 md:ml-72 transition-all duration-300">
        {children}
      </main>

      {/* Mobile: Bottom Nav (hidden no desktop) */}
      <div className="md:hidden">
        <BottomNav 
          currentSection={currentSection}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
}

export default Layout;