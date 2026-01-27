import { useState, useEffect } from 'react';
import { COLORS } from '../../tokens';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

/**
 * Layout
 * Nova paleta: Azul elétrico + Off-white
 * Sistema de navegação adaptativo
 */

export function Layout({ 
  children, 
  currentSection = 'home',
  onNavigate,
  user,
  progress,
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bgApp }}>
      {/* Desktop: Sidebar */}
      {!isMobile && (
        <Sidebar 
          currentSection={currentSection}
          onNavigate={onNavigate}
          user={user}
          progress={progress}
        />
      )}

      {/* Main Content */}
      <main className={`
        min-h-screen transition-all duration-300
        ${isMobile ? 'pb-20' : 'md:ml-72'}
      `}>
        {children}
      </main>

      {/* Mobile: Bottom Nav */}
      {isMobile && (
        <BottomNav 
          currentSection={currentSection}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}

export default Layout;