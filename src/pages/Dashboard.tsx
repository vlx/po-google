import { AlertTriangle, Radar, Zap, Info } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
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

      {/* KPI Cards: Predictive Intelligence Focus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            label: 'Active Anomalies', 
            value: '3', 
            trend: '-2', 
            trendType: 'positive',
            helpText: 'Current anomalies detected in production telemetry streams.',
            icon: <Radar className="w-5 h-5 text-amber-500 dark:text-amber-400"/>, 
            color: 'border-amber-500/20 bg-amber-500/5' 
          },
          { 
            label: 'Predicted Incidents', 
            value: '2 High Risk', 
            trend: '+1', 
            trendType: 'negative',
            helpText: 'Outages or degradations likely to occur within the forecast horizon.',
            icon: <AlertTriangle className="w-5 h-5 text-rose-500 dark:text-rose-400"/>, 
            color: 'border-rose-500/20 bg-rose-500/5' 
          },
          { 
            label: 'Emerging Risk Signatures', 
            value: '12 Patterns', 
            trend: '+3', 
            trendType: 'negative',
            helpText: 'New behavioral patterns deviating from baselines, not yet critical.',
            icon: <Zap className="w-5 h-5 text-indigo-500 dark:text-indigo-400"/>, 
            color: 'border-indigo-500/20 bg-indigo-500/5' 
          }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-200 relative">
            <div className="absolute top-0 inset-x-0 h-0.5 rounded-t-xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0" />
            <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                    {stat.icon}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                  stat.trendType === 'positive' 
                    ? 'text-emerald-700 bg-emerald-100/80 dark:text-emerald-400 dark:bg-emerald-500/10' 
                    : stat.trendType === 'negative'
                    ? 'text-rose-700 bg-rose-100/80 dark:text-rose-400 dark:bg-rose-500/10'
                    : 'text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-800'
                }`}>{stat.trend}</span>
            </div>
            <div className="mt-4">
                <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</div>
                <div className="flex items-center gap-1.5 mt-1">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
                    <div className="group relative flex cursor-help">
                        <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors" />
                        <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 absolute bottom-full pb-2 left-1/2 -translate-x-1/2 mb-1 w-56 pointer-events-none z-10">
                          <div className="p-2.5 bg-slate-900 dark:bg-slate-800 border border-slate-700 rounded-lg shadow-xl text-xs text-slate-200 text-center font-normal relative">
                            {stat.helpText}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-700 text-slate-900 dark:text-slate-700"></div>
                          </div>
                        </div>
                    </div>
                </div>
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
