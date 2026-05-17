import { Card } from "../components/ui/card"
import { useFinancialData } from "../context/useFinancialData"
import { formatCurrency } from "../data/mockData"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="app-panel-strong backdrop-blur-xl border p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest app-muted mb-2">{label}</p>
        <div className="flex items-center justify-between gap-8">
          <span className="text-xs font-medium text-card-foreground">Net Expense:</span>
          <span className="text-xs font-bold text-rose-400">{formatCurrency(payload[0].value)}</span>
        </div>
      </div>
    )
  }

  return null
}

function Analytics() {
  const { cashFlowData, anomalies, forecast, benchmarks, metrics } = useFinancialData()

  return (
    <div className="p-8 w-full animate-in fade-in duration-700">
      <div className="mb-10">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 block mb-2">
          Deep Analysis Engine
        </span>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-foreground">
          Financial <span className="app-muted">Analytics</span>
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <Card
          colSpan="col-span-12"
          title="Monthly Expense Volatility"
          description="Live reporting from the shared financial model"
        >
          <div className="w-full h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#ffffff"
                  opacity={0.05}
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }}
                  tickFormatter={(value) => `₹${Math.round(value / 1000)}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />

                <Bar
                  dataKey="expenses"
                  radius={[6, 6, 0, 0]}
                  fill="url(#barGradient)"
                  barSize={40}
                >
                  {cashFlowData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.month}-${index}`}
                      className="transition-all duration-500 hover:opacity-100 opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card colSpan="col-span-12 md:col-span-6" title="Anomalies Detected">
          <div className="flex flex-col gap-4">
            {anomalies.length === 0 && (
              <div className="p-4 rounded-2xl app-panel border text-sm app-muted">
                No expense spikes breached the anomaly threshold in the current dataset.
              </div>
            )}

            {anomalies.map((entry) => (
              <div
                key={entry.month}
                className="flex items-center gap-4 p-4 rounded-2xl app-panel border group hover:border-rose-500/30 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold">
                  !
                </div>
                <div>
                  <p className="text-sm font-bold text-card-foreground">Unusual Spend in {entry.month}</p>
                  <p className="text-xs app-muted">{entry.expenseDelta.toFixed(1)}% increase over prior month</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card colSpan="col-span-12 md:col-span-6" title="Efficiency Rating">
          <div className="flex flex-col items-center justify-center h-full py-4">
            <span className="text-5xl font-black text-emerald-400 italic">
              {Math.round(100 - benchmarks.expenseRatio.company / 2)}%
            </span>
            <p className="app-muted uppercase tracking-widest text-[10px] mt-2 font-bold">
              Optimization Score
            </p>
            <p className="text-xs app-muted mt-4 max-w-xs text-center">
              Forecasted next-month profit is {formatCurrency(forecast.predictedProfit)} with a current margin of {metrics.profitMargin.toFixed(1)}%.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Analytics
