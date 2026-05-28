import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  Network, 
  AlertOctagon, 
  DollarSign, 
  LogOut, 
  Search, 
  Bell, 
  Settings,
  Moon,
  Sun,
  Menu,
  ChevronDown
} from 'lucide-react';
import type { AppRoute, UserContext } from '../types';
import { useTheme } from '../ThemeContext';

interface LayoutProps {
  children: ReactNode;
  currentRoute: AppRoute;
  onRouteChange: (route: AppRoute) => void;
  user: UserContext;
  onLogout: () => void;
}

export function Layout({ children, currentRoute, onRouteChange, user, onLogout }: LayoutProps) {
  const { theme, toggleTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: { id: AppRoute; label: string; icon: ReactNode }[] = [
    { id: 'DASHBOARD', label: 'Executive Summary', icon: <Radar className="w-5 h-5" /> },
    { id: 'TOPOLOGY', label: 'Risk Topology', icon: <Network className="w-5 h-5" /> },
    { id: 'INCIDENTS', label: 'Active Incidents', icon: <AlertOctagon className="w-5 h-5" /> },
    { id: 'COSTS', label: 'Telemetry Costs', icon: <DollarSign className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex overflow-hidden font-sans text-slate-700 dark:text-slate-300 transition-colors duration-200">
      {/* Sidebar Navigation */}
      <nav className={`relative flex flex-col z-20 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-[360px]'}`}>
        <div className="h-16 flex items-center px-5 border-b border-slate-200 dark:border-slate-800">
          <div className={`flex items-center text-indigo-500 dark:text-indigo-400 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
            <Radar className="w-6 h-6 shrink-0" />
            {!isCollapsed && (
              <div className="flex items-center ml-3 shrink-0">
                <span className="font-semibold tracking-tight text-slate-900 dark:text-white">SRE Predict</span>
                <span className="mx-3 text-slate-300 dark:text-slate-700">|</span>
                <button className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 py-1.5 px-2.5 rounded-lg transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <span>Production</span>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-slate-500 dark:text-slate-400">Health:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">98.4%</span>
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-0.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 py-6 px-3 space-y-1 overflow-x-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onRouteChange(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`w-full flex items-center py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
              } ${
                currentRoute === item.id 
                  ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-300' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="shrink-0">{item.icon}</div>
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-1'}`}>
            <div 
              className="w-8 h-8 shrink-0 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer hover:ring-2 ring-indigo-500/50 transition-all"
              title={isCollapsed ? "Logout" : undefined}
              onClick={isCollapsed ? onLogout : undefined}
            >
              {user.name.charAt(0)}
            </div>
            {!isCollapsed && (
              <>
                <div className="flex-1 overflow-hidden">
                  <div className="text-sm font-medium text-slate-900 dark:text-slate-200 truncate">{user.name}</div>
                  <div className="text-xs text-slate-500 truncate">{user.role}</div>
                </div>
                <button onClick={onLogout} className="p-1.5 shrink-0 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors" title="Log out">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800/50 flex items-center justify-between px-4 sm:px-8 z-10 sticky top-0">
          <div className="flex items-center gap-2 sm:gap-4 flex-1">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              className="p-2 -ml-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Search across metrics, traces, or risks..." 
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-1.5 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-shadow"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-950"></span>
            </button>
            <button className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-auto bg-slate-50/50 dark:bg-[#080b14] transition-colors duration-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoute}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
