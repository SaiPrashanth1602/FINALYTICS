import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "../components/ui/card"
import { CommandMenu } from "../components/common/CommandMenu.jsx"
import { ThemeToggle } from "../components/ui/themeToggle.jsx"
import { useFinancialData } from "../context/useFinancialData"
import { formatCurrency } from "../data/mockData"
import StatCards from "../components/dashboard/StatCards"
import HealthScore from "../components/dashboard/HealthScore"
import CashFlowChart from "../components/dashboard/CashFlowChart"
import ExpensePieChart from "../components/dashboard/ExpensePieChart"
import VendorTable from "../components/dashboard/VendorTable"
import AIInsights from "../components/dashboard/AIInsights"
import Forecast from "../components/dashboard/Forecast"
import Alerts from "../components/dashboard/Alerts"
import Benchmark from "../components/dashboard/Benchmark"
import Profitability from "../components/dashboard/Profitability"
import ExpenseInsights from "../components/dashboard/ExpenseInsights"
import BusinessSummary from "../components/dashboard/BusinessSummary"

function Dashboard() {
  const navigate = useNavigate()
  const [justSynced, setJustSynced] = useState(false)
  const {
    cashFlowData,
    expenseData,
    vendors,
    metrics,
    alerts,
    insights,
    forecast,
    benchmarks,
    expenseInsights,
    businessSummary,
    analysisRuns,
    lastUpdated,
    refreshFinancials,
    toggleVendorStatus,
  } = useFinancialData()

  useEffect(() => {
    const interval = setInterval(() => {
      refreshFinancials()
      setJustSynced(true)
    }, 20000)

    return () => clearInterval(interval)
  }, [refreshFinancials])

  useEffect(() => {
    if (!justSynced) {
      return undefined
    }

    const timeout = setTimeout(() => setJustSynced(false), 2000)
    return () => clearTimeout(timeout)
  }, [justSynced])

  return (
    <div id="dashboard" className="p-6 bg-background min-h-screen text-foreground transition-colors duration-500 overflow-x-hidden">
      <CommandMenu />

      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-bitwars-primary via-bitwars-secondary to-bitwars-accent bg-clip-text text-transparent italic uppercase">
            Finalytics
          </h1>
          <p className="app-muted mt-1 font-medium flex items-center gap-2">
            System Status: <span className="text-emerald-400 font-bold">Operational</span>
          </p>
          <p className="text-xs uppercase tracking-[0.2em] app-muted mt-3">
            Last sync {new Date(lastUpdated).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>

        <div className="flex items-center gap-4 app-panel p-2 rounded-2xl border backdrop-blur-md shadow-xl">
          <ThemeToggle />
          <div className="h-4 w-[1px] bg-white/10" />
          <button
            type="button"
            onClick={() => {
              refreshFinancials()
              setJustSynced(true)
            }}
            className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[10px] font-black flex items-center gap-2 uppercase tracking-[0.2em]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {justSynced ? "Synced" : "Refresh Feed"}
          </button>
        </div>
      </header>

      <div className="mb-8 animate-in fade-in zoom-in-95 duration-700 delay-100">
        <StatCards metrics={metrics} />
      </div>

      <div className="grid grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)] animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
        <Card
          colSpan="col-span-12 lg:col-span-8"
          rowSpan="row-span-2"
          title="Revenue Pipeline"
          description="Shared live model across dashboard and analytics"
        >
          <CashFlowChart data={cashFlowData} />
        </Card>

        <Card
          colSpan="col-span-12 lg:col-span-4"
          rowSpan="row-span-2"
          className="bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent border-blue-500/30"
          title="AI Strategist"
        >
          <AIInsights
            insights={insights}
            onRunAnalysis={() => {
              refreshFinancials()
              setJustSynced(true)
            }}
            analysisRuns={analysisRuns}
          />
        </Card>

        <Card colSpan="col-span-12 md:col-span-4" title="Health Score">
          <HealthScore metrics={metrics} />
        </Card>

        <Card colSpan="col-span-12 md:col-span-4" title="Risk Alerts">
          <div id="alerts">
            <Alerts alerts={alerts} />
          </div>
        </Card>

        <Card colSpan="col-span-12 md:col-span-4" title="Growth Forecast">
          <Forecast forecast={forecast} />
        </Card>

        <Card
          colSpan="col-span-12 lg:col-span-9"
          title="Vendor Intelligence"
          headerAction={
            <span className="text-[10px] font-black tracking-widest app-muted">
              {formatCurrency(vendors.reduce((sum, vendor) => sum + vendor.amount, 0))} total
            </span>
          }
        >
          <VendorTable vendors={vendors} onToggleStatus={toggleVendorStatus} />
        </Card>

        <Card colSpan="col-span-12 lg:col-span-3" title="Profitability Index">
          <Profitability metrics={metrics} />
        </Card>

        <Card colSpan="col-span-12 md:col-span-4" title="Expense Breakdown">
          <ExpensePieChart data={expenseData} />
        </Card>

        <Card colSpan="col-span-12 md:col-span-4" title="Deep Analysis">
          <ExpenseInsights insights={expenseInsights} />
        </Card>

        <Card
          colSpan="col-span-12 md:col-span-4"
          className="flex items-center justify-center text-center bg-bitwars-primary/10 border-bitwars-primary/20 hover:border-bitwars-primary/50 transition-all duration-500"
        >
          <div className="flex flex-col items-center p-4">
            <div className="w-16 h-16 rounded-3xl bg-bitwars-primary/20 flex items-center justify-center mb-4 shadow-inner">
              <span className="text-3xl">Audit</span>
            </div>
            <h4 className="text-xl font-bold italic uppercase tracking-tighter">Audit Mode</h4>
            <p className="app-muted text-xs mt-2 mb-6 max-w-[200px] leading-relaxed">
              Open the analytics workspace and review anomaly detection, expense volatility, and efficiency signals.
            </p>
            <button
              type="button"
              onClick={() => navigate("/analytics")}
              className="w-full py-3 bg-bitwars-primary hover:bg-blue-400 text-white font-black rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 uppercase tracking-tighter"
            >
              Generate Report
            </button>
          </div>
        </Card>

        <Card colSpan="col-span-12 lg:col-span-6" title="Benchmark Snapshot">
          <Benchmark benchmarks={benchmarks} />
        </Card>

        <Card colSpan="col-span-12 lg:col-span-6" title="Executive Summary">
          <BusinessSummary summary={businessSummary} lastUpdated={lastUpdated} />
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
