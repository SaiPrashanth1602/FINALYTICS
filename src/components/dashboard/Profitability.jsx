import { Card } from "../ui/card"
import { Badge } from "../ui/badge"

function Profitability({ metrics }) {
  const margin = Math.round(metrics.profitMargin)
  let status = "Healthy"

  if (margin < 20) {
    status = "Low"
  } else if (margin < 35) {
    status = "Moderate"
  }

  return (
    <Card className="bg-slate-900/40 border-slate-800 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
        Profitability Analysis
      </h3>

      <div className="text-4xl font-black text-white tracking-tight">
        {margin}% Margin
      </div>

      <div className="mt-3">
        <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          {status}
        </Badge>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Margin is calculated from total revenue and total expenses across the active reporting window.
      </p>
    </Card>
  )
}

export default Profitability
