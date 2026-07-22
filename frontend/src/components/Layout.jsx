import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, login } = useAuth();

  // Helper to dynamically switch roles for easy testing
  const toggleRole = () => {
    if (!user) return;
    const nextRole = user.role === 'admin' ? 'user' : 'admin';
    login({ ...user, role: nextRole });
  };

  return (
    <div className="min-h-screen bg-surface text-ink flex flex-col md:flex-row">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-6 fixed h-full z-20 justify-between">
        <div className="space-y-8">
          
          {/* BRAND HEADER WITH GROWTH NODE LOGO */}
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#0f172a" />
              <path d="M8 20L13 15L17 19L24 11" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="11" r="2.5" fill="#34d399" />
            </svg>
            
            <div>
              <h1 className="text-base font-bold tracking-tight text-white leading-tight">LENO BANK</h1>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Enterprise</p>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="space-y-1">
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  isActive 
                    ? 'bg-slate-800 text-emerald-400 font-semibold' 
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </NavLink>

            <NavLink 
              to="/transfer" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  isActive 
                    ? 'bg-slate-800 text-emerald-400 font-semibold' 
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Transfer
            </NavLink>

            <NavLink 
              to="/history" 
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  isActive 
                    ? 'bg-slate-800 text-emerald-400 font-semibold' 
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`
              }
            >
              <span className="text-sm leading-none">📊</span>
              History
            </NavLink>

            {/* Render Admin Link ONLY if user is an admin */}
            {user?.role === 'admin' && (
              <div className="pt-3 mt-3 border-t border-slate-800">
                <NavLink 
                  to="/admin" 
                  className={({ isActive }) => 
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                      isActive 
                        ? 'bg-red-950/60 text-red-400 border border-red-900/50 font-semibold' 
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`
                  }
                >
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Admin Console
                </NavLink>
              </div>
            )}
          </nav>
        </div>

        {/* FOOTER & ROLE SWITCHER */}
        <div className="space-y-4">
          
          {/* Dev Role Switcher Widget */}
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-xs space-y-2">
            <div className="flex justify-between items-center text-[10px] uppercase font-mono text-slate-400">
              <span>Dev Control</span>
              <span className={`px-1.5 py-0.5 rounded font-bold ${user?.role === 'admin' ? 'bg-red-950 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                {user?.role}
              </span>
            </div>
            
            <button 
              onClick={toggleRole}
              className="w-full py-1.5 bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-200 rounded-lg font-medium transition text-[11px] border border-slate-600/50"
            >
              Switch to {user?.role === 'admin' ? 'User' : 'Admin'}
            </button>
          </div>

          <div className="text-[11px] text-slate-500 font-mono border-t border-slate-800/80 pt-3">
            <p className="text-slate-400">Leno System v2.4</p>
            <p className="text-[10px]">Encrypted Session</p>
          </div>

        </div>
      </aside>

      {/* --- MAIN PAGE VIEW --- */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* --- MOBILE NAVIGATION BAR --- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-around items-center z-50 shadow-lg">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            `flex flex-col items-center text-[10px] font-medium gap-1 ${isActive ? 'text-emerald-600 font-bold' : 'text-slate-500'}`
          }
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 00-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Home
        </NavLink>

        <NavLink 
          to="/transfer" 
          className={({ isActive }) => 
            `flex flex-col items-center text-[10px] font-medium gap-1 ${isActive ? 'text-emerald-600 font-bold' : 'text-slate-500'}`
          }
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Transfer
        </NavLink>

        <NavLink 
          to="/history" 
          className={({ isActive }) => 
            `flex flex-col items-center text-[10px] font-medium gap-1 ${isActive ? 'text-emerald-600 font-bold' : 'text-slate-500'}`
          }
        >
          <span className="text-base leading-none">📊</span>
          History
        </NavLink>

        {user?.role === 'admin' && (
          <NavLink 
            to="/admin" 
            className={({ isActive }) => 
              `flex flex-col items-center text-[10px] font-medium gap-1 ${isActive ? 'text-red-600 font-bold' : 'text-slate-500'}`
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Admin
          </NavLink>
        )}
      </nav>

    </div>
  );
}