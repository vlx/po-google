export type AppRoute = 'DASHBOARD' | 'TOPOLOGY' | 'INCIDENTS' | 'COSTS';

export interface UserContext {
  id: string;
  name: string;
  role: string;
  email: string;
}
