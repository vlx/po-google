import { Network } from 'lucide-react';

export function Topology() {
  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex items-center justify-between">
         <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Risk Topology</h1>
         <div className="flex gap-2 text-sm">
            <span className="flex items-center gap-1.5 bg-rose-500/10 text-rose-400 px-3 py-1.5 rounded-lg border border-rose-500/20"><div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div> Critical Risk Path</span>
         </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden relative shadow-sm dark:shadow-inner transition-colors duration-200">
        {/* Placeholder for visual canvas/graph */}
        <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400 dark:text-slate-500 space-y-4">
            <Network className="w-16 h-16 opacity-20" />
            <p className="text-sm font-medium">[ Interactive Dependency Graph Placeholder ]</p>
            <p className="text-xs max-w-sm text-center opacity-60 text-slate-500">Visualizing Kubernetes pods, external services, and network paths with highlighted predictive impact radii.</p>
        </div>

        {/* Mock Floating Panel for Selected Node Data */}
        <div className="absolute right-4 top-4 w-72 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xl transition-colors duration-200">
             <div className="text-xs font-semibold text-slate-500 uppercase mb-3 tracking-wider">Node Inspector</div>
             <div className="space-y-3">
                 <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Service</div>
                    <div className="text-base text-slate-800 dark:text-slate-200 font-medium">billing-api-prod</div>
                 </div>
                 <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Predicted State (1h)</div>
                    <div className="text-rose-500 dark:text-rose-400 text-sm font-medium mt-1">Latency spike imminent (&gt;400ms)</div>
                 </div>
                 <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm border border-slate-300 dark:border-slate-700 rounded transition-colors">
                        View AI Investigation
                    </button>
                 </div>
             </div>
        </div>
      </div>
    </div>
  );
}
