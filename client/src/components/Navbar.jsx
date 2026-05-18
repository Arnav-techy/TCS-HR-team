import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/formatters';

const NAV_LINKS = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/employees', label: 'Employees', icon: '👥' },
  { to: '/ai-insights', label: 'AI Insights', icon: '🤖' },
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center shadow-lg shadow-primary-900/40 group-hover:shadow-primary-800/50 transition-all duration-200">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <span className="font-bold text-white text-lg hidden sm:block">
              HR<span className="gradient-text">Analytics</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                      : 'text-dark-400 hover:text-dark-100 hover:bg-dark-800'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  <span className="hidden md:block">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                  {getInitials(user.name)}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-dark-200 text-xs font-medium">{user.name}</span>
                  <span className="text-dark-500 text-[10px] capitalize">{user.role}</span>
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-dark-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
