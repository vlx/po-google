import { useState } from 'react';
import { Login } from './pages/Login';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Topology } from './pages/Topology';
import { Incidents } from './pages/Incidents';
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
        return <Dashboard onRouteChange={setCurrentRoute as any} />;
      case 'TOPOLOGY':
        return <Topology />;
      case 'INCIDENTS':
        return <Incidents />;
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
