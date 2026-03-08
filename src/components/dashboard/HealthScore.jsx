// src/components/dashboard/HealthScore.jsx

import { Card } from "../ui/card"
import { Activity, ShieldCheck, AlertCircle } from "lucide-react"

function HealthScore({ metrics }) {

  let score = 0

  // Profitability
  if (metrics.profit > 0) score += 40

  // Runway / liquidity
  if (metrics.runwayMonths > 3) score += 30
  else if (metrics.runwayMonths > 1.5) score += 15

  // Growth stability
  if (metrics.revenueGrowth > metrics.expenseGrowth) score += 30
  else if (metrics.revenueGrowth > 0) score += 15


  const config = {
    Healthy: {
      color: "text-emerald-500",
      stroke: "#10b981",
      bg: "bg-emerald-500/10",
      icon: <ShieldCheck size={16} />
    },
    Moderate: {
      color: "text-amber-500",
      stroke: "#f59e0b",
      bg: "bg-amber-500/10",
      icon: <Activity size={16} />
    },
    Risk: {
      color: "text-rose-500",
      stroke: "#f43f5e",
      bg: "bg-rose-500/10",
      icon: <AlertCircle size={16} />
    }
  }

  let status = "Healthy"

  if (score < 50) status = "Risk"
  else if (score < 75) status = "Moderate"

  const { color, stroke, bg, icon } = config[status]


  const radius = 36
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference


  return (
    <Card className="bg-slate-900/40 border-slate-800 p-6 flex flex-col items-center justify-center relative overflow-hidden">

      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Activity size={80} className="text-slate-100" />
      </div>

      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6 w-full">
        Business Health
      </h3>

      <div className="relative flex items-center justify-center">

        <svg className="w-32 h-32 transform -rotate-90">

          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-800"
          />

          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke={stroke}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            style={{
              strokeDashoffset: offset,
              transition: "stroke-dashoffset 1.5s ease-in-out"
            }}
            strokeLinecap="round"
          />

        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-100 leading-none">
            {score}
          </span>
          <span className="text-[10px] text-slate-500 font-bold uppercase mt-1">
            Score
          </span>
        </div>

      </div>

      <div className={`mt-6 px-4 py-2 rounded-full border border-slate-700/50 flex items-center gap-2 ${bg}`}>
        <span className={color}>{icon}</span>
        <span className={`text-xs font-bold uppercase tracking-tight ${color}`}>
          {status} Status
        </span>
      </div>

      <p className="text-[11px] text-slate-500 mt-4 text-center leading-tight">
        Based on liquidity, profitability, and <br /> financial growth stability.
      </p>

    </Card>
  )
}

export default HealthScore