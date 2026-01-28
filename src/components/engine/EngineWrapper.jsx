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
      style={{ backgroundColor: COLORS.bgApp }}
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
          className="flex-shrink-0 p-5 border-t"
          style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}
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