import { COLORS } from '../../tokens';

/**
 * EngineHeader
 * Header comum para todas as engines
 * Elimina ~160 linhas de duplicação
 */
export function EngineHeader({ label, title, instruction, defaultTitle = 'Atividade' }) {
  return (
    <>
      {label && (
        <span 
          className="inline-block text-xs font-extrabold uppercase tracking-wide px-3 py-1.5 rounded-lg mb-3"
          style={{ backgroundColor: COLORS.primaryLight, color: COLORS.primaryDark }}
        >
          {label}
        </span>
      )}
      
      <h1 className="text-2xl font-bold mb-2" style={{ color: COLORS.text }}>
        {title || defaultTitle}
      </h1>
      
      {instruction && (
        <p className="mb-4" style={{ color: COLORS.textMuted }}>
          {instruction}
        </p>
      )}
    </>
  );
}

export default EngineHeader;
