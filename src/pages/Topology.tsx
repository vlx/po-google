import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Network, Server, Database, Activity, AlertTriangle, 
  ShieldAlert, AlertCircle, CheckCircle2, Clock, UserPlus, Scale, RotateCcw, FileText
} from 'lucide-react';

const nodes = [
  { id: 'lb', label: 'Ingress LB', type: 'network', x: 10, y: 50 },
  { id: 'api', label: 'API Gateway', type: 'service', x: 25, y: 50 },
  
  { id: 'auth', label: 'Auth Service', type: 'service', x: 45, y: 20 },
  { id: 'auth-db', label: 'Auth DB', type: 'database', x: 75, y: 15 },
  
  { id: 'payment', label: 'Payment Svc', type: 'service', x: 45, y: 45 },
  { id: 'checkout-db', label: 'Checkout DB', type: 'database', x: 75, y: 45 },
  
  { id: 'catalog', label: 'Catalog API', type: 'service', x: 45, y: 70 },
  { id: 'redis', label: 'Redis Cache', type: 'database', x: 75, y: 70 },

  { id: 'worker', label: 'Job Worker', type: 'service', x: 45, y: 92 },
  { id: 'email', label: 'Email Svc', type: 'service', x: 75, y: 92 },
];

const edges = [
  { source: 'lb', target: 'api' },
  { source: 'api', target: 'auth' },
  { source: 'api', target: 'payment' },
  { source: 'api', target: 'catalog' },
  
  { source: 'auth', target: 'auth-db' },
  { source: 'payment', target: 'checkout-db' },
  { source: 'catalog', target: 'redis' },
  
  { source: 'api', target: 'worker' },
  { source: 'worker', target: 'email' },
  { source: 'email', target: 'auth-db', dashed: true },
];

const forecastStates = [
  { 
    time: 'Now', 
    label: 'Observations Baseline', 
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    desc: 'System operating within acceptable tolerance. Minor anomalies detected in isolated components.',
    nodeStates: {
      'checkout-db': { status: 'warning', alert: 'Queue +12%' }
    },
    blastRadiuses: []
  },
  { 
    time: '+4h', 
    label: 'High Probability: Connection Exhaustion', 
    icon: <AlertCircle className="w-5 h-5 text-rose-500" />,
    desc: 'Projected query buildup causes cascading timeouts on edge services interacting with payment gateway.',
    nodeStates: {
      'checkout-db': { status: 'critical', alert: 'Resource Saturation' },
      'payment': { status: 'warning', alert: 'Connection Drops' },
      'api': { status: 'warning', alert: 'High Latency' }
    },
    blastRadiuses: [
      { centerId: 'checkout-db', radius: '40vw', color: 'rose' }
    ]
  },
  { 
    time: '+12h', 
    label: 'Critical Risk: Subsystem Failure', 
    icon: <ShieldAlert className="w-5 h-5 text-fuchsia-500" />,
    desc: 'Unmitigated memory leaks project high potential for synchronized pod evictions across task pipelines.',
    nodeStates: {
      'worker': { status: 'critical', alert: 'OOM Threshold' },
      'email': { status: 'warning', alert: 'Queue Saturation' },
      'api': { status: 'warning', alert: '5xx Escalation' }
    },
    blastRadiuses: [
      { centerId: 'worker', radius: '45vw', color: 'fuchsia' }
    ]
  },
];

export function Topology() {
  const [timelineIndex, setTimelineIndex] = useState(0);
  const currentForecast = forecastStates[timelineIndex];
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getNodeState = (id: string) => {
    return currentForecast.nodeStates[id as keyof typeof currentForecast.nodeStates] || { status: 'healthy' };
  };

  const getStyleForStatus = (status: string) => {
    switch(status) {
      case 'critical': return 'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-400';
      case 'warning': return 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400';
      default: return 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Risk Topology</h1>
         <div className="flex gap-2 p-1.5 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg shadow-inner">
            {forecastStates.map((state, idx) => (
              <button 
                key={state.time}
                onClick={() => setTimelineIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  timelineIndex === idx 
                    ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-slate-100' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {timelineIndex === idx ? state.icon : <Clock className="w-4 h-4 opacity-50" />}
                <span className="hidden sm:inline">{timelineIndex === idx ? state.time + ' - ' + state.label : state.time}</span>
                <span className="sm:hidden">{state.time}</span>
              </button>
            ))}
         </div>
      </div>

      <div className="flex-1 bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden relative shadow-sm transition-colors flex flex-col min-h-[500px]">
        
        {/* Forecast Details Panel (Top Bar) */}
        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-5 shrink-0 relative z-20">
           <div className="flex items-center justify-between w-full">
               <div className="flex items-start gap-4 max-w-3xl">
                   <div className="mt-0.5 p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 shrink-0">
                      {currentForecast.icon}
                   </div>
                   <div>
                      <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-1.5">
                         <span className="opacity-75">{currentForecast.time} System State:</span> <span className="text-indigo-600 dark:text-indigo-400 font-bold ml-1">{currentForecast.label}</span>
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                         {currentForecast.desc}
                      </p>
                   </div>
               </div>
               
               {/* Global Actions */}
               {currentForecast.time !== 'Now' && (
                 <div className="flex flex-col sm:flex-row gap-3 shrink-0 ml-4">
                   <button className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900">
                     <CheckCircle2 className="w-4 h-4" />
                     Implement Strategy
                   </button>
                   <button className="inline-flex justify-center items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs font-semibold rounded-lg shadow-sm transition-colors">
                     <UserPlus className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                     Assign Team
                   </button>
                 </div>
               )}
           </div>
        </div>
        
        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden" onClick={() => setSelectedNode(null)}>
          
          {/* Radial Gradients for Blast Radius */}
          {currentForecast.blastRadiuses.map((blast, i) => {
             const centerNode = nodes.find(n => n.id === blast.centerId);
             if (!centerNode) return null;
             
             return (
               <motion.div 
                 key={`blast-${timelineIndex}-${i}`}
                 initial={{ scale: 0, opacity: 0 }}
                 animate={{ scale: 1, opacity: 0.12 }}
                 transition={{ type: "spring", bounce: 0.3, duration: 1.2 }}
                 className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                 style={{
                   left: `${centerNode.x}%`,
                   top: `${centerNode.y}%`,
                   width: blast.radius,
                   height: blast.radius,
                   background: blast.color === 'rose' 
                     ? 'radial-gradient(circle, rgba(244,63,94,1) 0%, rgba(244,63,94,0) 70%)'
                     : 'radial-gradient(circle, rgba(217,70,239,1) 0%, rgba(217,70,239,0) 70%)'
                 }}
               />
             );
          })}

          {/* SVG Edges connecting nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
             {edges.map((edge, i) => {
                const source = nodes.find(n => n.id === edge.source);
                const target = nodes.find(n => n.id === edge.target);
                if (!source || !target) return null;
                
                const srcState = getNodeState(edge.source);
                const tgtState = getNodeState(edge.target);
                const isRiskPath = (srcState.status !== 'healthy') && (tgtState.status !== 'healthy');
                
                return (
                  <motion.line 
                    key={`${edge.source}-${edge.target}-${i}`}
                    x1={`${source.x}%`} 
                    y1={`${source.y}%`} 
                    x2={`${target.x}%`} 
                    y2={`${target.y}%`} 
                    stroke={isRiskPath ? "#f43f5e" : "#64748b"} 
                    strokeWidth={isRiskPath ? 2 : 1}
                    strokeDasharray={edge.dashed ? "4,4" : "none"}
                    strokeOpacity={isRiskPath ? 0.6 : 0.25}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
             })}
          </svg>

          {/* HTML Nodes */}
          {nodes.map((node) => {
            const state = getNodeState(node.id);
            const isSelected = selectedNode === node.id;
            
            return (
              <motion.div
                key={node.id}
                layoutId={`node-${node.id}`}
                onClick={(e) => { e.stopPropagation(); setSelectedNode(node.id); }}
                className="absolute shadow-sm -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 font-sans"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`
                    pl-3 pr-4 py-2.5 rounded-lg border flex flex-col items-center justify-center min-w-[120px] transition-all bg-opacity-90 backdrop-blur-sm
                    ${getStyleForStatus(state.status)}
                    ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-950 shadow-md' : 'hover:shadow-md'}
                `}>
                   <div className="flex flex-col items-center gap-1.5 opacity-90">
                     {node.type === 'database' ? <Database className="w-5 h-5 mb-0.5" /> : 
                      node.type === 'network' ? <Network className="w-5 h-5 mb-0.5" /> : 
                      <Server className="w-5 h-5 mb-0.5" />}
                     <span className="text-xs font-semibold whitespace-nowrap tracking-wide">{node.label}</span>
                   </div>
                   
                   {/* Alert Bubble */}
                   {(state as any).alert && (
                     <motion.div 
                       initial={{ scale: 0 }} 
                       animate={{ scale: 1 }}
                       transition={{ type: "spring", bounce: 0.5 }}
                       className={`absolute -top-3 -right-3 whitespace-nowrap border text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-20 ${
                         state.status === 'critical' 
                          ? 'bg-rose-500 text-white border-rose-600' 
                          : 'bg-amber-400 text-amber-950 border-amber-500'
                       }`}
                     >
                       {(state as any).alert}
                     </motion.div>
                   )}
                </div>
              </motion.div>
            )
          })}

        </div>

        {/* Inspector Panel Floating Right */}
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-4 top-4 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-2xl z-40"
          >
               <div className="flex items-center justify-between mb-5">
                 <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Node Inspector</div>
                 <button className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded transition-colors" onClick={() => setSelectedNode(null)}>✕</button>
               </div>
               
               <div className="space-y-5">
                   <div>
                      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Target Resource</div>
                      <div className="text-sm text-slate-900 dark:text-slate-100 font-semibold">{nodes.find(n => n.id === selectedNode)?.label}</div>
                      <div className="text-xs text-slate-500 font-mono mt-1 opacity-75">ID: {selectedNode}</div>
                   </div>
                   
                   <div>
                      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">State at {currentForecast.time}</div>
                      
                      {getNodeState(selectedNode).status === 'healthy' ? (
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg border border-emerald-200 dark:border-emerald-900/50">
                           <Activity className="w-4 h-4" /> Healthy & Stable
                        </div>
                      ) : (
                        <div className={`p-4 rounded-lg border text-sm ${getStyleForStatus(getNodeState(selectedNode).status)}`}>
                           <div className="font-semibold mb-2 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" /> 
                              {(getNodeState(selectedNode) as any).alert}
                           </div>
                           <div className="text-xs opacity-90 leading-relaxed text-slate-700 dark:text-slate-300">
                              This component is within the projected impact radius for the current timeline.
                           </div>
                        </div>
                      )}
                   </div>

                   {getNodeState(selectedNode).status !== 'healthy' ? (
                     <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Recommended Actions</div>
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-lg transition-colors shadow-sm ring-1 ring-inset ring-indigo-500 dark:ring-indigo-800">
                           <CheckCircle2 className="w-3.5 h-3.5" /> Implement Isolation
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <button className="flex items-center justify-center gap-1.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                            <Scale className="w-3.5 h-3.5" /> Scale Up
                          </button>
                          <button className="flex items-center justify-center gap-1.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                            <RotateCcw className="w-3.5 h-3.5" /> Restart
                          </button>
                        </div>
                     </div>
                   ) : (
                     <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-lg transition-colors border border-slate-200 dark:border-slate-700 shadow-sm">
                           <FileText className="w-3.5 h-3.5" /> View Logs
                        </button>
                     </div>
                   )}
               </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
