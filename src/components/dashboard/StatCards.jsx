import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { TrendingUp, TrendingDown, Wallet, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"
import CountUp from "react-countup"

function CurrencyValue({ value }) {
  const absoluteValue = Math.abs(value)

  return (
    <>
      {value < 0 ? "-" : ""}₹
      <CountUp end={absoluteValue} duration={1.5} separator="," />
    </>
  )
}

function StatCards({ metrics }) {
  const stats = [
    {
      title: "Total Revenue",
      value: metrics.totalRevenue,
      tag: `${metrics.revenueGrowth.toFixed(1)}%`,
      trend: metrics.revenueGrowth > 0 ? "up" : "down",
      icon: <TrendingUp className="text-emerald-500 dark:text-emerald-400" size={20} />,
    },
    {
      title: "Total Expenses",
      value: metrics.totalExpenses,
      tag: `${metrics.expenseGrowth.toFixed(1)}%`,
      trend: metrics.expenseGrowth > 0 ? "down" : "up",
      icon: <TrendingDown className="text-rose-500 dark:text-rose-400" size={20} />,
    },
    {
      title: "Profit",
      value: metrics.profit,
      tag: `${metrics.profitMargin.toFixed(1)}% margin`,
      trend: metrics.profit > 0 ? "up" : "down",
      icon: <Wallet className="text-blue-500 dark:text-blue-400" size={20} />,
    },
    {
      title: "Cash Runway",
      value: metrics.runwayMonths,
      unit: " months",
      tag: `${metrics.netCashFlow >= 0 ? "Positive" : "Negative"} cash`,
      trend: metrics.runwayMonths < 2 ? "down" : "up",
      icon: <Clock className="text-amber-500 dark:text-amber-400" size={20} />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 hover:border-blue-400 dark:hover:border-slate-700 transition-all duration-300 group shadow-sm dark:shadow-none"
        >
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/5 blur-3xl rounded-full group-hover:bg-blue-500/10 transition-colors" />

          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
              {stat.icon}
            </div>

            <Badge
              variant="outline"
              className={`font-medium transition-colors ${
                stat.trend === "up"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
              }`}
            >
              <span className="flex items-center gap-1 text-[10px]">
                {stat.trend === "up" && <ArrowUpRight size={12} />}
                {stat.trend === "down" && <ArrowDownRight size={12} />}
                {stat.tag}
              </span>
            </Badge>
          </div>

          <div className="relative z-10">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              {stat.title}
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {stat.title === "Cash Runway" ? (
                <>
                  <CountUp end={stat.value} duration={1.5} decimals={1} />
                  {stat.unit}
                </>
              ) : (
                <CurrencyValue value={stat.value} />
              )}
            </h3>
          </div>

          <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                stat.trend === "up" ? "bg-emerald-500" : "bg-rose-500"
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
