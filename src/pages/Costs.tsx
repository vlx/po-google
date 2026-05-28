import { DollarSign, Cpu } from 'lucide-react';

export function Costs() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Telemetry & Processing Costs</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Cost governance for telemetry pipeline and AI agent execution.</p>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden relative shadow-sm transition-colors duration-200 min-h-[400px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 space-y-6">
            <div className="flex items-center space-x-8 opacity-40">
              <div className="flex flex-col items-center space-y-2">
                <DollarSign className="w-12 h-12" />
                <span className="text-xs uppercase tracking-widest font-semibold">Storage</span>
              </div>
              <div className="h-0 w-8 border border-slate-300 dark:border-slate-600 border-dashed"></div>
              <div className="flex flex-col items-center space-y-2">
                <Cpu className="w-12 h-12" />
                <span className="text-xs uppercase tracking-widest font-semibold">AI Agents</span>
              </div>
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Cost Governance Module TBD</p>
              <p className="text-xs max-w-sm mx-auto text-slate-500">
                Detailed breakdowns of telemetry ingestion rates, log storage volume, metric cardinality costs, and AI agent execution token usage will be displayed here.
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}
