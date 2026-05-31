import { AlertTriangle, Zap, Info, Activity, Database, Server, ChevronRight, UserPlus, CheckCircle2, Network } from 'lucide-react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Mock telemetry data with history and forecast
const telemetryData = [
  { time: '00:00', load: 35, forecast: 45 },
  { time: '04:00', load: 50, forecast: 52 },
  { time: '08:00', load: 55, forecast: 78 },
  { time: '12:00', load: 55, forecast: 85 },
  { time: '16:00', load: 48, forecast: 70 },
  { time: '20:00', load: 45, forecast: 60 },
  { time: 'Now', load: 42, forecast: 55 },
  { time: '+04:00', forecast: 92, isPrediction: true, incident: "Conn Timeout", prob: "92%" },
  { time: '+08:00', forecast: 88, isPrediction: true },
  { time: '+12:00', forecast: 85, isPrediction: true, risk: true, incident: "Worker OOM", prob: "85%" },
  { time: '+18:00', forecast: 78, isPrediction: true , incident: "Cache Hit Drop", prob: "78%" },
  { time: '+24:00', forecast: 50, isPrediction: true },
];

const PredictionDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload.incident) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="#f43f5e" stroke="#fff" strokeWidth={2} className="dark:stroke-slate-900" />
      <text x={cx} y={cy - 12} textAnchor="middle" fill="#f43f5e" fontSize={11} fontWeight="600">
        {payload.prob}
      </text>
    </g>
  );
};

const CustomXAxisTick = ({ x, y, payload }: any) => {
  const isNow = payload.value === 'Now';
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fill={isNow ? undefined : '#64748b'}
        fontSize={12}
        fontWeight={isNow ? 'bold' : 'normal'}
        className={isNow ? 'fill-slate-900 dark:fill-slate-100' : ''}
      >
        {payload.value}
      </text>
    </g>
  );
};

const emergingPatterns = [
  { id: 10, title: "5xx Rate Anomaly", component: "payment-api", desc: "Sudden burst of 502 Bad Gateway responses on callbacks.", riskLevel: "High Risk", time: "10m ago" },
  { id: 5, title: "Disk I/O Wait Time Increase", component: "auth-db", desc: "Read latency spiking during key validation phase.", riskLevel: "High Risk", time: "15m ago" },
  { id: 6, title: "Spiky CPU Throttling", component: "index-svc", desc: "Containers hitting CPU limits during batch processing.", riskLevel: "Elevated Risk", time: "30m ago" },
  { id: 9, title: "Unhealthy Pod Churn", component: "image-proc", desc: "Multiple pod restarts due to liveness probe timeouts.", riskLevel: "Elevated Risk", time: "45m ago" },
  { id: 1, title: "DB Connection Pool Saturation", component: "checkout-db", desc: "pg-bouncer queue growing 12% hourly against stable RPS.", riskLevel: "Elevated Risk", time: "1h ago" },
  { id: 12, title: "Queue Backlog", component: "email-worker", desc: "Consumer lag indicates processing bottleneck.", riskLevel: "Elevated Risk", time: "1h ago" },
  { id: 2, title: "Memory Leak Signature", component: "nodesrv-v3", desc: "OOM risk profile matches prior regression.", riskLevel: "High Risk", time: "2h ago" },
  { id: 8, title: "Eviction Rate Spike", component: "cache-layer", desc: "Volatile-lru evictions up by 400% against baseline.", riskLevel: "Elevated Risk", time: "2h ago" },
  { id: 7, title: "Dropped Packets", component: "cluster-ingress", desc: "Packet drop rate increasing up to 2% intermittently.", riskLevel: "Anomaly", time: "4h ago" },
  { id: 3, title: "API Gateway Latency Shift", component: "api-gateway", desc: "P99 latency trailing drift towards 500ms timeout.", riskLevel: "Anomaly", time: "5h ago" },
  { id: 11, title: "High GC Pause", component: "search-api", desc: "JVM garbage collection pauses exceeding 2 seconds.", riskLevel: "Anomaly", time: "6h ago" },
  { id: 4, title: "Worker OOM Rate", component: "bg-workers", desc: "Background workers being killed slightly above baseline.", riskLevel: "Anomaly", time: "12h ago" },
];

export function Dashboard({ onRouteChange }: { onRouteChange?: (route: string) => void }) {
  const scrollToEmerging = () => {
    document.getElementById('emerging-patterns')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToPredictions = () => {
    document.getElementById('predictions-list')?.scrollIntoView({ behavior: 'smooth' });
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { 
            label: 'Predicted Incidents', 
            value: '3 Total', 
            trend: '+1', 
            trendType: 'negative',
            helpText: 'Outages or degradations likely to occur within the forecast horizon.',
            icon: <AlertTriangle className="w-5 h-5 text-rose-500 dark:text-rose-400"/>, 
            color: 'border-rose-500/20 bg-rose-500/5',
            onClick: scrollToPredictions,
            hasLink: true
          },
          { 
            label: 'Emerging Risk Signatures', 
            value: '12 Patterns', 
            trend: '+3', 
            trendType: 'negative',
            helpText: 'New behavioral patterns deviating from baselines, not yet critical.',
            icon: <Zap className="w-5 h-5 text-indigo-500 dark:text-indigo-400"/>, 
            color: 'border-indigo-500/20 bg-indigo-500/5',
            onClick: scrollToEmerging,
            hasLink: true
          }
        ].map((stat, i) => (
          <div 
            key={i} 
            onClick={stat.onClick}
            className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-all duration-200 relative group ${stat.hasLink ? 'cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:shadow-md' : ''}`}
          >
            <div className={`absolute top-0 inset-x-0 h-0.5 rounded-t-xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 ${stat.hasLink ? 'group-hover:via-indigo-500/60' : ''}`} />
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
            <div className="mt-4 flex items-end justify-between">
              <div>
                  <div className="text-3xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                      <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</div>
                      <div className="group/help relative flex cursor-help">
                          <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors" />
                          <div className="opacity-0 invisible group-hover/help:opacity-100 group-hover/help:visible transition-all duration-200 absolute bottom-full pb-2 left-1/2 -translate-x-1/2 mb-1 w-56 pointer-events-none z-10">
                            <div className="p-2.5 bg-slate-900 dark:bg-slate-800 border border-slate-700 rounded-lg shadow-xl text-xs text-slate-200 text-center font-normal relative">
                              {stat.helpText}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-700 text-slate-900 dark:text-slate-700"></div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
              {stat.hasLink && (
                 <div className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                    <ChevronRight className="w-4 h-4" />
                 </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Layout Grid */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 min-h-[400px] shadow-sm transition-colors duration-200 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-medium text-slate-800 dark:text-slate-200">Predictive Failure Forecaster</h3>
            <div className="flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                Observed System Load
              </div>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-current opacity-70"></span>
                Forecast Projection
              </div>
            </div>
          </div>
          
          <div className="w-full h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={telemetryData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={<CustomXAxisTick />}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f1f5f9' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <ReferenceLine x="Now" stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'top', value: 'Prediction Boundary', fill: '#94a3b8', fontSize: 11 }} />
                
                {/* Historical Area */}
                <Area 
                  type="monotone" 
                  dataKey="load" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLoad)" 
                  activeDot={{ r: 4, fill: '#6366f1' }}
                />
                {/* Forecast Line */}
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#f43f5e" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={<PredictionDot />}
                  activeDot={<PredictionDot />}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Predictions List View Section */}
      <div id="predictions-list" className="pt-4 scroll-mt-20">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Actionable Predictions</h2>
          <div className="text-sm text-slate-500 dark:text-slate-400">Within next 24 hours</div>
        </div>
        
        <div className="space-y-4">
          {[
            {
              id: 1,
              title: "Payment Gateway Connection Timeout",
              subsystem: "checkout-db, payment-service",
              risk: "High",
              probability: "92%",
              timeToImpact: "~4 hours",
              desc: "Sustained increase in checkout-db queue combined with P99 latency growth in payment-service indicates high probability of connection exhaustion.",
              action: "Scale up pg-bouncer instances and temporarily route non-critical reads to replicas.",
              status: "pending"
            },
            {
              id: 2,
              title: "Worker Node OOM Cascade",
              subsystem: "background-workers, memory-cache",
              risk: "High",
              probability: "85%",
              timeToImpact: "~12 hours",
              desc: "Memory leak signature detected in long-running job queues. Historical pattern leads to OOM cascade if current allocation rate continues.",
              action: "Trigger rolling restart of worker pool and isolate job batch ID #84992 for inspection.",
              status: "pending"
            },
            {
              id: 3,
              title: "Cache Hit Ratio Degradation",
              subsystem: "redis-cluster, catalog-api",
              risk: "Medium",
              probability: "78%",
              timeToImpact: "~18 hours",
              desc: "Eviction rates are growing due to expanding catalog size. Cache hit ratio expected to drop below 80% SLA threshold.",
              action: "Provision additional Redis shards and update TTL policies for low-frequency catalog items.",
              status: "pending"
            }
          ].map((prediction) => (
            <div key={prediction.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-colors duration-200">
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Status/Risk Column */}
                <div className="w-full lg:w-48 shrink-0 flex flex-row lg:flex-col justify-between lg:justify-start gap-4 lg:gap-2">
                  <div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Risk Level</div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-sm font-medium border ${
                      prediction.risk === 'High' ? 'text-rose-700 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-900/50' : 
                      'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-900/50'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                      {prediction.risk}
                    </div>
                  </div>
                  
                  <div className="flex gap-6 lg:flex-col lg:gap-2">
                    <div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Probability</div>
                      <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">{prediction.probability}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Est. Impact</div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{prediction.timeToImpact}</div>
                    </div>
                  </div>
                </div>

                {/* Details Column */}
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">{prediction.title}</h3>
                      <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                        Affected: {prediction.subsystem}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {prediction.desc}
                  </p>

                  {/* Recommended Action */}
                  <div className="mt-auto bg-slate-50 dark:bg-slate-950/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800/80">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Recommended Action
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-4">
                      {prediction.action}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                        <CheckCircle2 className="w-4 h-4" />
                        Execute Action
                      </button>
                      <button 
                        onClick={() => onRouteChange && onRouteChange('TOPOLOGY')}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm font-medium rounded-md shadow-sm transition-colors"
                      >
                        <Network className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        Explore Topology
                      </button>
                      <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 text-sm font-medium rounded-md transition-colors">
                        <UserPlus className="w-4 h-4" />
                        Assign Team
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emerging Behavioral Patterns (Full width) */}
      <div id="emerging-patterns" className="pt-4 scroll-mt-20">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-colors duration-200 flex flex-col overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-medium text-slate-800 dark:text-slate-200 mb-1">Emerging Behavioral Patterns</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Signatures detected matching historical failure precursors before incident thresholds are crossed.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead className="bg-slate-50/50 dark:bg-slate-800/20">
                 <tr className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                   <th className="font-medium px-4 py-2 border-b border-slate-200 dark:border-slate-800">Risk Indicator</th>
                   <th className="font-medium px-4 py-2 border-b border-slate-200 dark:border-slate-800">Signature & Description</th>
                   <th className="font-medium px-4 py-2 border-b border-slate-200 dark:border-slate-800">Subsystem</th>
                   <th className="font-medium px-4 py-2 border-b border-slate-200 dark:border-slate-800 text-right">First Seen</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-800/50">
                {emergingPatterns.map((pattern) => (
                  <tr key={pattern.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group cursor-pointer">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded border uppercase tracking-wider ${
                          pattern.riskLevel === 'High Risk' ? 'text-rose-600 border-rose-200 bg-rose-50 dark:text-rose-400 dark:border-rose-900/50 dark:bg-rose-500/10' :
                          pattern.riskLevel === 'Elevated Risk' ? 'text-amber-600 border-amber-200 bg-amber-50 dark:text-amber-400 dark:border-amber-900/50 dark:bg-amber-500/10' :
                          'text-indigo-600 border-indigo-200 bg-indigo-50 dark:text-indigo-400 dark:border-indigo-900/50 dark:bg-indigo-500/10'
                        }`}>
                          {pattern.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="font-medium text-[13px] text-slate-900 dark:text-slate-100 mb-0.5">{pattern.title}</div>
                      <div className="text-[12px] leading-tight text-slate-500 dark:text-slate-400">{pattern.desc}</div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="font-mono text-[11px] text-slate-600 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded">
                        {pattern.component}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-right text-[12px] text-slate-500 dark:text-slate-400">
                      {pattern.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
