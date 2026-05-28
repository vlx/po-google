import { Activity, AlertTriangle, Shield, Target } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Executive Summary</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Real-time operational health and predictive risks.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Forecast Horizon:</span>
            <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-lg px-3 py-1.5 outline-none focus:border-indigo-500 shadow-sm transition-colors duration-200">
                <option>Next 24 Hours</option>
                <option>Next 48 Hours</option>
                <option>Next 7 Days</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'System Health Score', value: '98.4%', trend: '+0.2%', icon: <Activity className="w-5 h-5 text-emerald-400"/>, color: 'border-emerald-500/20 bg-emerald-500/5' },
          { label: 'Predicted Incidents (48h)', value: '2 High Risk', trend: '+1', icon: <AlertTriangle className="w-5 h-5 text-rose-400"/>, color: 'border-rose-500/20 bg-rose-500/5' },
          { label: 'Error Budget Remaining', value: '84.2%', trend: '-1.5%', icon: <Shield className="w-5 h-5 text-indigo-500 dark:text-indigo-400"/>, color: 'border-indigo-500/20 bg-indigo-500/5' },
          { label: 'SLO Attainment', value: '99.98%', trend: '+0.05%', icon: <Target className="w-5 h-5 text-amber-500 dark:text-amber-400"/>, color: 'border-amber-500/20 bg-amber-500/5' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-200">
            <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                </div>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md transition-colors">{stat.trend}</span>
            </div>
            <div className="mt-4">
                <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Layout Grids Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 min-h-[400px] shadow-sm transition-colors duration-200">
          <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-4">Predictive Failure Forecaster</h3>
          <div className="w-full h-4/5 rounded border border-slate-200 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-950/50 flex items-center justify-center transition-colors">
             <span className="text-slate-500 dark:text-slate-500 text-sm">[ Time-series forecast chart placeholder ]</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors duration-200">
          <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-4">Emerging Behavioral Patterns</h3>
          <ul className="space-y-3">
             {[1,2,3,4].map((i) => (
                <li key={i} className="flex flex-col gap-1 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 transition-colors">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 w-3/4 animate-pulse rounded"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800/50 w-1/2 animate-pulse rounded mt-2"></div>
                </li>
             ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
