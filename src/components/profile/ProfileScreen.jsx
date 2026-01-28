/**
 * ProfileScreen.jsx
 * Tela de perfil do usuário
 */

export function ProfileScreen({ user, progress, onLogout }) {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">Perfil</h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        {/* Avatar e Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <p className="text-slate-500">{user.email}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-blue-600">{progress.xp}</p>
            <p className="text-slate-500 text-sm">XP Total</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-slate-900">{progress.streak}</p>
            <p className="text-slate-500 text-sm">Streak</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-2xl font-bold text-cyan-500">{progress.diamonds}</p>
            <p className="text-slate-500 text-sm">Diamantes</p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full py-3 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition-colors"
        >
          Sair da conta
        </button>
      </div>
    </div>
  );
}

export default ProfileScreen;
