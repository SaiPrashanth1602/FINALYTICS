import { Card } from "../ui/card"
import { Badge } from "../ui/badge"

function Benchmark({ benchmarks }) {
  return (
    <Card className="bg-slate-900/40 border-slate-800 p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          SME Benchmarking
        </h3>
        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
          Live Compare
        </Badge>
      </div>

      <div className="grid gap-4 text-sm">
        <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
          <div>
            <p className="text-slate-200 font-semibold">Revenue Growth</p>
            <p className="text-xs text-slate-500">
              {benchmarks.revenueGrowth.company.toFixed(1)}% vs industry {benchmarks.revenueGrowth.industry.toFixed(1)}%
            </p>
          </div>
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            {benchmarks.revenueGrowth.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
          <div>
            <p className="text-slate-200 font-semibold">Expense Ratio</p>
            <p className="text-xs text-slate-500">
              {benchmarks.expenseRatio.company.toFixed(1)}% vs industry {benchmarks.expenseRatio.industry.toFixed(1)}%
            </p>
          </div>
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
            {benchmarks.expenseRatio.status}
          </Badge>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4">
          <div>
            <p className="text-slate-200 font-semibold">Cash Health</p>
            <p className="text-xs text-slate-500">Based on runway and latest net cash flow.</p>
          </div>
          <Badge className="bg-slate-800 text-slate-200 border border-white/10">
            {benchmarks.cashHealth}
          </Badge>
        </div>
      </div>
    </Card>
  )
}

export default Benchmark
