import { useState } from 'react';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Topology } from './pages/Topology';
import { Costs } from './pages/Costs';
import type { AppRoute, UserContext } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('DASHBOARD');

  const user: UserContext = {
    id: 'u-1',
    name: 'SRE Lead',
    role: 'Staff Reliability Engineer',
    email: 'sre@acme.com'
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  const renderContent = () => {
    switch (currentRoute) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'TOPOLOGY':
        return <Topology />;
      case 'INCIDENTS':
        return <div className="text-slate-600 dark:text-slate-400 p-8 border border-slate-200 dark:border-slate-800/50 rounded-lg text-center">Active Incidents module pending implementation...</div>;
      case 'COSTS':
        return <Costs />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentRoute={currentRoute} 
      onRouteChange={setCurrentRoute}
      user={user}
      onLogout={() => {
        setIsAuthenticated(false);
        setCurrentRoute('DASHBOARD');
      }}
    >
      {renderContent()}
    </Layout>
  );
}
