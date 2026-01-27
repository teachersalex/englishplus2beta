/**
 * tokens.js
 * Design Tokens — Fonte única de verdade
 * 
 * DNA: PlayStation + Apple + Valve
 * Referência: Card "Meu Progresso" da HomeScreen
 */

export const COLORS = {
  // Marca
  primary: '#3B82F6',
  primaryDark: '#2563EB',
  primaryLight: '#EFF6FF',
  
  // Secundária (Stories)
  secondary: '#8b5cf6',
  secondaryDark: '#6d28d9',

  // Superfícies
  bgApp: '#F8FAFC',
  surface: '#FFFFFF',
  
  // Dark theme (Sidebar, BottomNav, Card principal)
  dark: {
    bg: '#0f172a',           // slate-900
    bgLight: '#1e293b',      // slate-800
    hover: '#334155',        // slate-700
    border: 'rgba(255, 255, 255, 0.1)',
    glow: 'rgba(59, 130, 246, 0.12)',
  },
  
  // Aliases para compatibilidade
  sidebar: '#1e293b',
  sidebarHover: '#334155',

  // Texto
  text: '#1E293B',
  textMuted: '#64748B',
  textLight: '#F8FAFC',
  textDark: '#94a3b8',       // slate-400

  // Feedback
  success: '#10B981',
  successLight: '#DCFCE7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',

  // Bordas
  border: '#E2E8F0',
  borderDark: 'rgba(255, 255, 255, 0.1)',
};

export const GRADIENTS = {
  // Card principal dark
  darkCard: 'linear-gradient(145deg, #1e293b 0%, #0f172a 100%)',
  
  // Accent line
  accent: 'linear-gradient(to bottom, #3b82f6, #8b5cf6)',
  
  // Botões
  blue: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  purple: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
  
  // Glows
  blueGlow: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 60%)',
  purpleGlow: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
};

export const SHADOWS = {
  card: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  cardDark: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
  button: '0 10px 20px -5px rgba(59, 130, 246, 0.4)',
  buttonSuccess: '0 10px 20px -5px rgba(16, 185, 129, 0.4)',
  buttonPurple: '0 20px 40px -12px rgba(139, 92, 246, 0.4)',
};
