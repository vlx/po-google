import { DollarSign, Cpu, TrendingDown, TrendingUp, CheckCircle2, XCircle, AlertTriangle, ListChecks, ShieldCheck, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dataCostSavings = [
  { month: 'Jan', cost: 12000, savings: 8000 },
  { month: 'Feb', cost: 12500, savings: 15000 },
  { month: 'Mar', cost: 13000, savings: 22000 },
  { month: 'Apr', cost: 15000, savings: 28000 },
  { month: 'May', cost: 14500, savings: 45000 },
  { month: 'Jun', cost: 15200, savings: 61000 },
];

const predictionLog = [
  { id: 1, time: '2 hours ago', prediction: 'auth-db: Key Validation Latency Spike', confidence: '94%', outcome: 'Latency spiked to 800ms. AI triggered pre-scaling.', accuracy: 'True Positive' },
  { id: 2, time: '5 hours ago', prediction: 'checkout-db: Connection Pool Exhaustion', confidence: '82%', outcome: 'Traffic dropped unexpectedly. No exhaustion occurred.', accuracy: 'False Positive' },
  { id: 3, time: 'Yesterday', prediction: 'payment-api: 5xx Error Burst', confidence: '91%', outcome: 'Downstream provider blip resulted in 5xx. Traffic routed.', accuracy: 'True Positive' },
  { id: 4, time: '2 days ago', prediction: 'search-api: High GC Pause (JVM)', confidence: '88%', outcome: 'GC pause reached 2.4s. AI restarted node gracefully.', accuracy: 'True Positive' },
  { id: 5, time: '4 days ago', prediction: 'image-proc: OOM Crash Risk', confidence: '75%', outcome: 'Pod RAM usage stabilized without intervention.', accuracy: 'False Positive' },
];

export function Costs() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-full flex flex-col pb-8">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Telemetry Costs & AI ROI</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Executive justification for observability spend and AI prediction accuracy.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
            <DollarSign className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">Monthly Telemetry Cost</h3>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">$15,200</div>
          <div className="text-xs text-rose-500 dark:text-rose-400 mt-1 flex items-center gap-1">+4.8% vs last month</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
            <TrendingDown className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">Est. Incident Savings</h3>
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">$61,000</div>
          <div className="text-xs text-emerald-500 dark:text-emerald-400 mt-1 flex items-center gap-1">Downtime prevented (Est.)</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
            <Activity className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">MTTR Reduction</h3>
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">68%</div>
          <div className="text-xs text-emerald-500 dark:text-emerald-400 mt-1 flex items-center gap-1">Avg 14m → 4.5m</div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 border border-indigo-400 dark:border-indigo-500 p-4 rounded-xl shadow-sm text-white">
          <div className="flex items-center gap-2 text-indigo-100 mb-2">
            <TrendingUp className="w-4 h-4" />
            <h3 className="text-xs font-semibold uppercase tracking-wider">Overall AI ROI</h3>
          </div>
          <div className="text-2xl font-bold">4.01x</div>
          <div className="text-xs text-indigo-100 mt-1 flex items-center gap-1">Return on Observability Spend</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Chart Column */}
        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col min-h-[300px] flex-1">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4">
               <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest">Costs vs. Savings Projection</h3>
               <div className="flex items-center gap-4 text-xs font-semibold">
                 <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                   <span className="text-slate-600 dark:text-slate-400">Telemetry Cost</span>
                 </div>
                 <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span className="text-slate-600 dark:text-slate-400">AI Savings</span>
                 </div>
               </div>
            </div>
            <div className="p-5 flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataCostSavings} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-slate-800" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`$${value}`, '']}
                  />
                  <Area type="monotone" dataKey="savings" name="AI Savings" stroke="#10b981" fillOpacity={1} fill="url(#colorSavings)" />
                  <Area type="monotone" dataKey="cost" name="Telemetry Cost" stroke="#f43f5e" fillOpacity={1} fill="url(#colorCost)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* SLO & Agent Active States */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm p-5">
             <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest">Operational Metrics & SLO Impact</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">System Availability</div>
                  <div className="flex items-end gap-2">
                    <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">99.98%</span>
                    <span className="text-emerald-500 text-xs font-semibold pb-1">↑ from 99.91%</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">P99 Latency Goal</div>
                  <div className="flex items-end gap-2">
                    <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">142ms</span>
                    <span className="text-emerald-500 text-xs font-semibold pb-1">↓ from 280ms</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">Telemetry Ingested</div>
                  <div className="flex items-end gap-2">
                    <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">14.2 TB</span>
                    <span className="text-emerald-500 text-xs font-semibold pb-1">↓ 1.2 TB (optimized)</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">Active Predictors</div>
                  <div className="flex items-end gap-2">
                    <span className="text-slate-900 dark:text-slate-100 text-xl font-bold">24</span>
                    <span className="text-slate-500 text-xs font-semibold pb-1">AI Agents active</span>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Tuning Log */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
             <div className="flex items-center gap-2">
                <ListChecks className="w-5 h-5 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest">Tuning & Accuracy Log</h3>
             </div>
             <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-900/50 px-2 py-0.5 rounded">
               84% Accuracy Model
             </span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 leading-relaxed">
               A historical log of AI predictions vs. real-world outcomes. Review to verify agent reliability and approve retraining batches.
             </p>
             
             {predictionLog.map((log) => (
                <div key={log.id} className="border border-slate-100 dark:border-slate-800 rounded-lg p-3 bg-white dark:bg-slate-900 shadow-sm relative overflow-hidden group hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors">
                  {log.accuracy === 'True Positive' && (
                     <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500"></div>
                  )}
                  {log.accuracy === 'False Positive' && (
                     <div className="absolute top-0 right-0 w-1 h-full bg-amber-500"></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2 pr-2">
                    <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{log.time}</div>
                    <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                      Conf: <span className="text-slate-600 dark:text-slate-300 font-bold">{log.confidence}</span>
                    </div>
                  </div>
                  
                  <div className="font-medium text-sm text-slate-800 dark:text-slate-200 mb-2">{log.prediction}</div>
                  
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded text-xs text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 mb-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Actual Outcome:</span> {log.outcome}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className={`flex items-center gap-1 text-[11px] font-semibold ${log.accuracy === 'True Positive' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {log.accuracy === 'True Positive' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {log.accuracy}
                    </div>
                    {log.accuracy === 'False Positive' && (
                      <button className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                        Mark for Retraining
                      </button>
                    )}
                  </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
