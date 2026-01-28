import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, GRADIENTS, SHADOWS } from '../../tokens';
import { TIPS, FireIcon } from './homeData';
import { getVisibleAchievements, getAchievementStats } from '../../data/achievementsData';
import AchievementGrid from '../achievements/AchievementGrid';

/**
 * HomeScreen - EnglishPlus 2.0
 *
 * "Là, tout n'est qu'ordre et beauté,
 *  Luxe, calme et volupté."
 *  — Charles Baudelaire
 */

export default function HomeScreen({
  user,
  progress = {},
  nextLesson,
  onNavigate,
}) {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const tip = TIPS[Math.floor(Date.now() / 86400000) % TIPS.length];

  const xpPerLevel = 500;
  const currentLevel = progress?.level || 1;
  const totalXp = progress?.xp || 0;
  const xpInLevel = totalXp % xpPerLevel;
  const xpPercent = Math.round((xpInLevel / xpPerLevel) * 100);
  const firstName = user?.name?.split(' ')[0] || 'Aluno';
  const streak = progress?.streak || 0;

  // Achievement system
  const earnedAchievements = progress?.earnedAchievements || [];
  const visibleAchievements = getVisibleAchievements(earnedAchievements);
  const stats = getAchievementStats(earnedAchievements);

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundColor: COLORS.bgApp,
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.08), transparent),
          radial-gradient(ellipse 60% 40% at 100% 100%, rgba(139, 92, 246, 0.05), transparent)
        `,
      }}
    >
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: COLORS.text }}>
              Olá, {firstName}!
            </h1>
            <p className="mt-1 text-base" style={{ color: COLORS.textMuted }}>
              Continue sua jornada
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 mt-2"
          >
            <FireIcon className="w-7 h-7" />
            <span className="text-2xl font-bold text-amber-500">{streak}</span>
          </motion.div>
        </header>

        {/* CARD PRINCIPAL — Meu Progresso + Minhas Conquistas */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden"
          style={{
            background: GRADIENTS.darkCard,
            boxShadow: SHADOWS.cardDark,
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute -top-32 -right-32 w-96 h-96 pointer-events-none"
            style={{ background: GRADIENTS.blueGlow }}
          />

          {/* Grid texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
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
            className="absolute left-0 top-6 bottom-6 w-1 rounded-full pointer-events-none"
            style={{ background: GRADIENTS.accent, opacity: 0.6 }}
          />

          <div className="relative z-10">
            {/* MEU PROGRESSO */}
            <div className="mb-8">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: COLORS.textDark }}>
                  Meu Progresso
                </h2>
                <span className="text-sm font-semibold text-blue-400">
                  {totalXp.toLocaleString()} XP total
                </span>
              </div>

              <div className="flex items-baseline justify-between mb-3">
                <span className="text-3xl font-bold" style={{ color: COLORS.textLight }}>
                  Nível {currentLevel}
                </span>
                <span className="text-sm" style={{ color: COLORS.textMuted }}>
                  {xpInLevel}/{xpPerLevel} XP
                </span>
              </div>

              {/* Barra XP */}
              <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                  className="h-full rounded-full"
                  style={{
                    background: GRADIENTS.blue,
                    boxShadow: `0 0 20px ${COLORS.dark.glow}`,
                  }}
                />
              </div>
            </div>

            {/* MINHAS CONQUISTAS - Agora com imagens PNG */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: COLORS.textDark }}>
                  Minhas Conquistas
                </h2>
                <span className="text-sm" style={{ color: COLORS.textMuted }}>
                  {stats.visible}/{stats.visibleTotal}
                </span>
              </div>

              {/* NOVO: Usando AchievementGrid com imagens */}
              <AchievementGrid
                achievements={visibleAchievements}
                earnedAchievements={earnedAchievements}
                progress={progress}
                onSelectAchievement={setSelectedAchievement}
              />
            </div>
          </div>
        </motion.section>

        {/* CARDS CTA — Modo Aventura + Modo História */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

          {/* MODO AVENTURA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate?.('adventure')}
            className="md:col-span-3 text-left rounded-3xl p-6 relative overflow-hidden group"
            style={{
              background: GRADIENTS.blue,
              boxShadow: SHADOWS.button,
            }}
          >
            {/* Diagonal pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.08]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  -45deg,
                  transparent,
                  transparent 14px,
                  rgba(255,255,255,0.5) 14px,
                  rgba(255,255,255,0.5) 15px
                )`,
              }}
            />

            {/* Light bloom */}
            <div
              className="absolute -top-16 -right-16 w-48 h-48 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 60%)' }}
            />

            <div className="relative z-10">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-blue-200">
                Modo Aventura
              </p>
              <h2 className="text-xl font-bold text-white mb-auto">
                Treine seu Vocabulário
              </h2>

              {/* Play button */}
              <div className="flex items-center gap-2 mt-5 text-sm font-bold text-blue-200/80 group-hover:gap-3 transition-all">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span>JOGAR AGORA</span>
              </div>
            </div>
          </motion.button>

          {/* MODO HISTÓRIA */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate?.('stories')}
            className="md:col-span-2 text-left rounded-3xl p-6 relative overflow-hidden group"
            style={{
              background: GRADIENTS.purple,
              boxShadow: SHADOWS.buttonPurple,
            }}
          >
            {/* Glow sutil */}
            <div
              className="absolute -top-20 -right-20 w-40 h-40 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)' }}
            />

            {/* Wave pattern */}
            <svg
              className="absolute bottom-0 left-0 w-full h-24 pointer-events-none"
              viewBox="0 0 200 80"
              preserveAspectRatio="none"
            >
              <path fill="rgba(255,255,255,0.08)" d="M0,80 L0,50 Q50,30 100,50 T200,40 L200,80 Z" />
              <path fill="rgba(255,255,255,0.05)" d="M0,80 L0,60 Q50,45 100,60 T200,55 L200,80 Z" />
            </svg>

            <div className="relative z-10 h-full flex flex-col">
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider mb-1 text-violet-200">
                Modo História
              </p>
              <h3 className="text-xl font-bold text-white mb-auto">
                Treine seu Listening
              </h3>

              {/* Play button */}
              <div className="flex items-center gap-2 mt-5 text-sm font-bold text-violet-200/80 group-hover:gap-3 transition-all">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span>OUVIR AGORA</span>
              </div>
            </div>
          </motion.button>
        </div>

        {/* DICA DO DIA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            backgroundColor: COLORS.surface,
            boxShadow: SHADOWS.card,
            borderLeft: `3px solid ${COLORS.primary}`,
          }}
        >
          {/* Glow sutil */}
          <div
            className="absolute -right-8 -top-8 w-32 h-32 pointer-events-none"
            style={{ background: GRADIENTS.blueGlow }}
          />
          
          {/* Sparkle decorativo */}
          <div
            className="absolute right-4 top-4 w-2 h-2 rounded-full pointer-events-none"
            style={{ backgroundColor: COLORS.primary, opacity: 0.3 }}
          />
          <div
            className="absolute right-8 top-6 w-1 h-1 rounded-full pointer-events-none"
            style={{ backgroundColor: COLORS.primary, opacity: 0.2 }}
          />

          <div className="relative z-10 flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ 
                background: `linear-gradient(135deg, ${COLORS.primary}20 0%, ${COLORS.primary}10 100%)`,
                border: `1px solid ${COLORS.primary}20`,
              }}
            >
              <svg className="w-5 h-5" fill={COLORS.primary} viewBox="0 0 24 24">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold mb-0.5" style={{ color: COLORS.text }}>
                Dica do dia
              </p>
              <p className="text-sm" style={{ color: COLORS.textMuted }}>
                {tip}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="h-24 md:h-0" />
      </div>

      {/* Modal de Conquista - Atualizado para imagens */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-3xl p-6 max-w-xs w-full text-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{
                backgroundColor: COLORS.surface,
                boxShadow: SHADOWS.cardDark,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: GRADIENTS.blueGlow }}
              />

              {(() => {
                const a = selectedAchievement;
                const earned = earnedAchievements.includes(a.id);
                const currentValue = a.getValue(progress);
                const percent = Math.min(100, Math.round((currentValue / a.target) * 100));
                
                // Mapeamento de ícones
                const iconMap = {
                  lesson1: 'shield', node1: 'castle', lesson6: 'book',
                  node3: 'map', perfect5: 'target', node5: 'globe',
                  story1: 'music', xp500: 'bolt', level5: 'rocket',
                  diamond10: 'diamond', node7: 'mountain', node10: 'star',
                  master: 'trophy',
                };
                const iconName = iconMap[a.id] || 'shield';

                return (
                  <div className="relative z-10">
                    {/* Imagem do ícone */}
                    <div className="mb-4 flex justify-center">
                      <img
                        src={`/achievements/${iconName}.png`}
                        alt={a.title}
                        className="w-24 h-24 object-contain"
                        style={{ 
                          filter: earned ? 'none' : 'grayscale(0.8)', 
                          opacity: earned ? 1 : 0.5 
                        }}
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1" style={{ color: COLORS.text }}>
                      {a.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: COLORS.textMuted }}>
                      {a.desc}
                    </p>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1" style={{ color: COLORS.textMuted }}>
                        <span>{currentValue}</span>
                        <span>{a.target}</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: COLORS.border }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percent}%` }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: earned ? COLORS.success : COLORS.primary,
                            boxShadow: earned ? '0 0 12px rgba(16, 185, 129, 0.4)' : 'none',
                          }}
                        />
                      </div>
                    </div>

                    <p
                      className="text-sm font-semibold mb-4"
                      style={{ color: earned ? COLORS.success : COLORS.primary }}
                    >
                      {earned ? 'Conquistado!' : `${percent}% completo`}
                    </p>

                    <button
                      onClick={() => setSelectedAchievement(null)}
                      className="px-6 py-2 rounded-xl font-medium text-sm transition-colors"
                      style={{ 
                        backgroundColor: COLORS.border, 
                        color: COLORS.text,
                      }}
                    >
                      Fechar
                    </button>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}