import { Card } from "../ui/card"
import { formatCurrency } from "../../data/mockData"

function ExpenseInsights({ insights }) {
  return (
    <Card className="bg-slate-900/40 border-slate-800 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-5">
        Top Expense Categories
      </h3>

      <div className="space-y-4">
        {insights.map((category) => (
          <div
            key={category.name}
            className="rounded-2xl border border-white/5 bg-white/5 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-200">{category.name}</span>
              <span className="text-sm font-mono text-slate-300">{formatCurrency(category.value)}</span>
            </div>
            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${Math.min(category.share, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {category.share.toFixed(1)}% of total expenses
            </p>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default ExpenseInsights
