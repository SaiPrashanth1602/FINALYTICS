// src/components/dashboard/StatCards.jsx
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { TrendingUp, TrendingDown, Wallet, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import CountUp from "react-countup"

function StatCards({ metrics }) {
  // Cleaned up the array (removed the stray <Card> tag from the variable declaration)
  const stats = [
    {
      title: "Total Revenue",
      value: metrics.totalRevenue,
      tag: `${metrics.revenueGrowth}%`,
      trend: metrics.revenueGrowth > 0 ? "up" : "down",
      icon: <TrendingUp className="text-emerald-500 dark:text-emerald-400" size={20} />
    },
    {
      title: "Total Expenses",
      value: metrics.totalExpenses,
      tag: `${metrics.expenseGrowth}%`,
      trend: metrics.expenseGrowth > 0 ? "down" : "up", // Expenses going up is usually "down" trend
      icon: <TrendingDown className="text-rose-500 dark:text-rose-400" size={20} />
    },
    {
      title: "Profit",
      value: metrics.profit,
      tag: `${metrics.profitMargin}% margin`,
      trend: metrics.profit > 0 ? "up" : "down",
      icon: <Wallet className="text-blue-500 dark:text-blue-400" size={20} />
    },
    {
      title: "Cash Runway",
      value: metrics.runwayMonths,
      unit: " months",
      tag: "Burn Rate",
      trend: metrics.runwayMonths < 2 ? "down" : "up",
      icon: <Clock className="text-amber-500 dark:text-amber-400" size={20} />
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <Card
          key={i}
          className="relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 hover:border-blue-400 dark:hover:border-slate-700 transition-all duration-300 group shadow-sm dark:shadow-none"
        >
          {/* Subtle Background Glow */}
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />

          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
              {s.icon}
            </div>

            <Badge
              variant="outline"
              className={`font-medium transition-colors ${
                s.trend === "up"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
              }`}
            >
              <span className="flex items-center gap-1 text-[10px]">
                {s.trend === "up" && <ArrowUpRight size={12} />}
                {s.trend === "down" && <ArrowDownRight size={12} />}
                {s.tag}
              </span>
            </Badge>
          </div>

          <div className="relative z-10">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              {s.title}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {typeof s.value === 'number' && !s.title.includes('Runway') ? '₹' : ''}
              <CountUp
                end={s.value}
                duration={1.5}
                separator=","
              />
              {s.unit || ""}
            </h3>
          </div>

          {/* Progress Mini-Bar */}
          <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                s.trend === "up" ? "bg-emerald-500" : "bg-rose-500"
              } opacity-60 dark:opacity-40`}
              style={{ width: "65%" }}
            />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default StatCards