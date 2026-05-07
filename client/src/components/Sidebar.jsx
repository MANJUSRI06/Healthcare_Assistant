import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ActivitySquare, MessageSquare, Settings, LogOut, Activity, Navigation, ShieldAlert, Calendar } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const { t } = useTranslation();

  const navItems = [
    { name: t('dashboard.clinicalDashboard'), path: '/dashboard', icon: LayoutDashboard },
    { name: t('dashboard.newAssessment') || 'Assessments', path: '/predict', icon: ActivitySquare },
    { name: t('appointment.title'), path: '/appointment-booking', icon: Calendar },
    { name: t('healthcareFinder.title'), path: '/healthcare-finder', icon: Navigation },
    { name: t('emergency.title'), path: '/emergency-support', icon: ShieldAlert },
    { name: 'Health Tips', path: '/tips', icon: FileText },
    { name: 'Profile', path: '/profile', icon: Settings },
  ];

  return (
    <div className="w-64 glass-card border-r border-white/40 shadow-[4px_0_24px_rgba(0,0,0,0.02)] h-[96vh] my-[2vh] ml-[2vh] fixed left-0 top-0 flex flex-col justify-between py-6 rounded-3xl z-20">
      <div>
        <div className="px-6 mb-10 flex items-center mt-2">
          <div className="w-10 h-10 rounded-xl premium-gradient-bg flex items-center justify-center shadow-lg shadow-blue-500/30 mr-3">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <Link to="/" className="flex flex-col">
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">LifeGuard AI</span>
            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Clinical Portal</span>
          </Link>
        </div>

        <nav className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (location.pathname.startsWith('/result') && item.path === '/predict');
            const Icon = item.icon;
            return (
              <Link key={item.name} to={item.path} className="block outline-none">
                <motion.div 
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden group ${isActive ? 'bg-white shadow-md border border-white/60 text-blue-700 font-bold' : 'text-gray-500 hover:bg-white/50 hover:text-blue-600 font-medium'}`}
                >
                  {isActive && <motion.div layoutId="activeNavIndicator" className="absolute left-0 top-0 bottom-0 w-1.5 premium-gradient-bg rounded-r-full"></motion.div>}
                  <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} />
                  {item.name}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-6 flex flex-col gap-3">
        <LanguageSelector />
        <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm flex items-center hover:bg-white transition-colors cursor-pointer group">
          <div className="w-10 h-10 premium-gradient-bg text-white rounded-full flex items-center justify-center font-bold text-lg mr-3 shadow-md group-hover:scale-105 transition-transform shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-extrabold text-gray-900 truncate">{user?.name}</p>
            <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout} 
          className="w-full flex items-center justify-center py-3.5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
        >
          <LogOut className="w-4 h-4 mr-2" /> Log Out
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;