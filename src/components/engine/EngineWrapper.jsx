import { COLORS } from '../../tokens';

/**
 * EngineWrapper
 * Container comum para todas as engines
 * Gerencia layout: conteúdo com scroll + footer fixo + overlay
 */
export function EngineWrapper({ children, button, overlay, showOverlay = false }) {
  return (
    <div 
      className="flex flex-col h-full"
      style={{ 
        backgroundColor: COLORS.bgApp,
        backgroundImage: `
          radial-gradient(ellipse 100% 60% at 50% -10%, rgba(59, 130, 246, 0.06), transparent 60%),
          radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.03), transparent 40%),
          radial-gradient(${COLORS.border}50 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 100% 100%, 20px 20px',
      }}
    >
      {/* Conteúdo (com scroll) */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="max-w-md mx-auto w-full">
          {children}
        </div>
      </div>

      {/* Footer - SÓ aparece se overlay NÃO estiver visível */}
      {!showOverlay && button && (
        <div 
          className="flex-shrink-0 p-5 border-t backdrop-blur-sm"
          style={{ 
            borderColor: 'rgba(0, 0, 0, 0.06)',
            backgroundColor: 'rgba(248, 250, 252, 0.8)',
          }}
        >
          <div className="max-w-md mx-auto">
            {button}
          </div>
        </div>
      )}

      {/* Overlay de resultado */}
      {overlay}
    </div>
  );
}

export default EngineWrapper;