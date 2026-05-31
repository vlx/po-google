import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, ShieldCheck, Activity, Terminal, AlertCircle, 
  Clock, Play, Pause, XCircle, SlidersHorizontal, CheckCircle2, History
} from 'lucide-react';

const activeCountermeasures = [
  {
    id: 'cm-101',
    title: 'Automated Replica Scaling',
    target: 'payment-api',
    trigger: '5xx Rate Anomaly (High Risk)',
    status: 'In Progress',
    progress: 65,
    predictedMTTR: '4 mins',
    confidence: '92%',
    actionTokens: ['Scale +3 pods', 'Route traffic shift'],
    type: 'automation'
  },
  {
    id: 'cm-102',
    title: 'Volatile Cache Purge',
    target: 'cache-layer',
    trigger: 'Eviction Rate Spike (Elevated Risk)',
    status: 'Completed',
    progress: 100,
    predictedMTTR: 'Resolved',
    confidence: '88%',
    actionTokens: ['Purge stale keys', 'Drop connections'],
    type: 'automation'
  }
];

const pendingApprovals = [
  {
    id: 'hitl-201',
    title: 'Predictive Pod Eviction',
    target: 'worker-pool-b',
    trigger: 'Memory Leak Signature (High Risk)',
    status: 'Pending Approval',
    reason: 'Action exceeds autonomous budgetary limits (cost-cap limit).',
    confidence: '96%',
    predictedMTTR: '12 mins',
    type: 'human-in-the-loop'
  },
  {
    id: 'hitl-202',
    title: 'Database Failover Sequence',
    target: 'checkout-db-primary',
    trigger: 'DB Connection Pool Saturation (Elevated Risk)',
    status: 'Pending Approval',
    reason: 'Requires explicit SRE acknowledgement for active-primary transition.',
    confidence: '78%',
    predictedMTTR: '25 mins',
    type: 'human-in-the-loop'
  }
];

export function Incidents() {
  const [activeTab, setActiveTab] = useState<'countermeasures' | 'approvals'>('countermeasures');

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Active Countermeasures & Tuning</h1>
         
         {/* Top Tabs */}
         <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg">
           <button 
             onClick={() => setActiveTab('countermeasures')}
             className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
               activeTab === 'countermeasures' 
                 ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                 : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
             }`}
           >
             Active Automations
           </button>
           <button 
             onClick={() => setActiveTab('approvals')}
             className={`px-4 py-2 text-sm font-medium rounded-md transition-all flex items-center gap-2 ${
               activeTab === 'approvals' 
                 ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                 : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
             }`}
           >
             Action Required
             <span className="bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 text-[10px] px-1.5 py-0.5 rounded-full font-bold">2</span>
           </button>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-4">
          
          {activeTab === 'countermeasures' && (
            <div className="space-y-4">
              {activeCountermeasures.map(cm => (
                <motion.div 
                  key={cm.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/60 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <Terminal className="w-5 h-5 text-indigo-500" />
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">{cm.title}</h3>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Targeting: <span className="font-mono text-xs font-semibold bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-slate-700 dark:text-slate-300">{cm.target}</span> via {cm.trigger}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm font-medium text-slate-900 dark:text-slate-100 flex items-center justify-end gap-1.5">
                        <Clock className="w-4 h-4 text-slate-400" /> {cm.predictedMTTR} MTTR
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">AI Confidence: {cm.confidence}</div>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-50/50 dark:bg-[#080b14]/50 flex items-end justify-between">
                    <div className="flex-1 mr-8">
                       <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                         <span>Execution Progress</span>
                         <span className={cm.progress === 100 ? 'text-emerald-500' : 'text-indigo-500'}>{cm.progress}%</span>
                       </div>
                       <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div 
                           className={`h-full rounded-full transition-all duration-1000 ${cm.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-500 relative overflow-hidden'}`} 
                           style={{ width: `${cm.progress}%` }}
                         >
                            {cm.progress < 100 && (
                              <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -translate-x-full" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}></div>
                            )}
                         </div>
                       </div>
                       <div className="mt-3 flex gap-2">
                         {cm.actionTokens.map(token => (
                           <span key={token} className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 bg-white dark:bg-slate-800">
                             {token}
                           </span>
                         ))}
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      {cm.progress < 100 ? (
                        <>
                          <button className="p-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Pause Automation">
                            <Pause className="w-4 h-4" />
                          </button>
                          <button className="p-2 border border-slate-200 dark:border-slate-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors" title="Graceful Abort">
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1.5">
                          <History className="w-3.5 h-3.5" /> View Logs
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'approvals' && (
            <div className="space-y-4">
               {pendingApprovals.map(approval => (
                 <motion.div 
                   key={approval.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-amber-50/30 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-700/30 rounded-xl overflow-hidden shadow-sm"
                 >
                   <div className="p-5 border-b border-amber-100 dark:border-amber-900/40">
                     <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 p-1.5 bg-amber-100 dark:bg-amber-800/50 rounded-lg">
                            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 tracking-tight">{approval.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{approval.trigger}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
                             <Activity className="w-3.5 h-3.5 text-indigo-500" /> Conf: {approval.confidence}
                          </div>
                        </div>
                     </div>
                     <div className="mt-4 pl-11">
                       <div className="text-sm border-l-2 border-amber-300 dark:border-amber-700 pl-3 py-1 text-slate-700 dark:text-slate-300 mb-4 bg-white/50 dark:bg-slate-900/50 rounded-r-md">
                         <span className="font-semibold text-amber-800 dark:text-amber-300">Escalation Reason:</span> {approval.reason}
                       </div>
                       <p className="text-xs text-slate-500 dark:text-slate-400">If approved, projected MTTR is <strong className="text-slate-700 dark:text-slate-300">{approval.predictedMTTR}</strong> targeting <span className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-700">{approval.target}</span>.</p>
                     </div>
                   </div>
                   <div className="p-4 bg-white/50 dark:bg-[#080b14]/30 flex justify-end gap-3">
                     <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center gap-2">
                       <SlidersHorizontal className="w-4 h-4" /> Fine-tune Action
                     </button>
                     <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-sm font-semibold rounded-lg shadow-sm transition-colors">
                       Discard
                     </button>
                     <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors shadow-indigo-500/20 flex items-center gap-2">
                       <Play className="w-4 h-4" /> Approve & Execute
                     </button>
                   </div>
                 </motion.div>
               ))}
            </div>
          )}
        </div>

        {/* Sidebar / Context Widget */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
             <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest mb-4">Automation Profile</h4>
             
             <div className="space-y-4">
               <div>
                 <div className="flex justify-between text-xs font-semibold mb-1 uppercase tracking-wide">
                   <span className="text-slate-500">Autonomous Resolves</span>
                   <span className="text-emerald-600 dark:text-emerald-400">84%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 rounded-full" style={{ width: '84%' }}></div>
                 </div>
               </div>

               <div>
                 <div className="flex justify-between text-xs font-semibold mb-1 uppercase tracking-wide">
                   <span className="text-slate-500">Escalated to Human</span>
                   <span className="text-amber-600 dark:text-amber-400">16%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500 rounded-full" style={{ width: '16%' }}></div>
                 </div>
               </div>
             </div>

             <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mb-3">
                   <ShieldCheck className="w-4 h-4 text-emerald-500" />
                   AI limits bounded by <strong>Strict Ruleset</strong>
                </div>
                <button className="w-full py-2 text-xs font-semibold border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-slate-700 dark:text-slate-300">
                  Configure Guardrails
                </button>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
