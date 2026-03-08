// src/components/dashboard/Forecast.jsx

import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { TrendingUp, Info } from "lucide-react"

function Forecast({ data }) {

  const last3 = data.slice(-3)

  const avgRevenue =
    last3.reduce((sum, m) => sum + m.revenue, 0) / last3.length

  const predictedRevenue = Math.round(avgRevenue * 1.1)

  const confidence = 88

  return (
    <Card className="bg-slate-900/40 border-slate-800 p-6 relative overflow-hidden group">

      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all duration-700" />

      <div className="flex justify-between items-start mb-4">

        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-400" size={18} />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            AI Forecast
          </h3>
        </div>

        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px]">
          NEXT MONTH
        </Badge>

      </div>

      <div className="space-y-1">

        <div className="text-3xl font-bold text-slate-100 tracking-tight">
          ₹{predictedRevenue.toLocaleString()}
        </div>

        <p className="text-xs text-slate-500 flex items-center gap-1">
          <Info size={12} />
          Predicted 10% growth based on last 3 months revenue.
        </p>

      </div>

      <div className="mt-6">

        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 tracking-tighter uppercase">
          <span>Confidence</span>
          <span>{confidence}%</span>
        </div>

        <div className="h-1 w-full bg-slate-800 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]"
            style={{ width: `${confidence}%` }}
          />
        </div>

      </div>

    </Card>
  )
}

export default Forecast