import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Cpu,
  Download,
  Search,
  Wifi,
} from "lucide-react"
import { exportReport } from "../../utils/exportReport"
import { useFinancialData } from "../../context/useFinancialData"

export default function Navbar({ disconnected = false, onReconnect }) {
  const navigate = useNavigate()
  const { alerts, lastUpdated } = useFinancialData()
  const [query, setQuery] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [exportState, setExportState] = useState("idle")

  async function handleExport(event) {
    event.preventDefault()
    event.stopPropagation()

    setExportState("working")
    const result = await exportReport()
    setExportState(result?.ok ? "done" : "failed")
    window.setTimeout(() => setExportState("idle"), 2400)
  }

  function handleSearch(event) {
    if (event.key !== "Enter") {
      return
    }

    const normalized = query.trim().toLowerCase()

    if (normalized.includes("advisor") || normalized.includes("ai")) {
      navigate("/advisor")
    } else if (
      normalized.includes("analytics") ||
      normalized.includes("audit") ||
      normalized.includes("report")
    ) {
      navigate("/analytics")
    } else if (normalized.includes("dashboard") || normalized.includes("terminal")) {
      navigate("/")
    } else if (normalized.includes("alert") || normalized.includes("notification")) {
      setNotificationsOpen(true)
    }

    setQuery("")
  }

  return (
    <nav className="h-20 border-b app-panel backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex-grow max-w-md hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearch}
            className="focus-ring block w-full rounded-2xl border border-border bg-background/70 py-2 pl-10 pr-3 text-xs font-bold text-foreground placeholder:text-slate-500 focus:bg-card transition-all uppercase tracking-widest"
            placeholder="Search dashboard, alerts, audit..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden lg:flex items-center gap-3 pr-6 border-r border-border">
          <div className="text-right">
            <p className="text-[10px] font-black app-muted uppercase tracking-tighter">
              {disconnected ? "Offline" : "Last Sync"}
            </p>
            <p className="text-[10px] font-mono text-blue-500">
              {disconnected
                ? "Paused"
                : new Date(lastUpdated).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
            </p>
          </div>
          <div
            className={`p-2 rounded-xl border ${
              disconnected
                ? "bg-amber-500/10 border-amber-500/20"
                : "bg-blue-500/10 border-blue-500/20"
            }`}
          >
            {disconnected ? (
              <Wifi size={14} className="text-amber-500" />
            ) : (
              <Cpu size={14} className="text-blue-400" />
            )}
          </div>
        </div>

        {disconnected && (
          <button
            type="button"
            onClick={onReconnect}
            className="focus-ring hidden sm:inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-300 transition hover:bg-amber-500/20"
          >
            Reconnect
          </button>
        )}

        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen((open) => !open)}
            className="focus-ring relative p-2 app-muted hover:text-foreground transition-colors"
            aria-label="Open notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-background"></span>
          </button>

          {notificationsOpen && (
            <div className="app-panel-strong absolute right-0 top-12 w-80 rounded-2xl border p-3 shadow-2xl">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="text-xs font-black uppercase tracking-widest">Notifications</p>
                <span className="text-[10px] app-muted">{alerts.length} active</span>
              </div>
              <div className="space-y-2">
                {alerts.map((alert, index) => (
                  <div
                    key={`${alert.message}-${index}`}
                    className="flex gap-3 rounded-xl border border-border p-3 text-sm"
                  >
                    <AlertCircle
                      size={16}
                      className={
                        alert.type === "critical"
                          ? "text-rose-500"
                          : alert.type === "warning"
                          ? "text-amber-500"
                          : "text-blue-500"
                      }
                    />
                    <p className="text-xs leading-relaxed app-muted">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleExport}
          disabled={exportState === "working"}
          className="focus-ring group relative flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-500/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {exportState === "done" ? (
            <CheckCircle2 size={14} />
          ) : (
            <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          )}
          <span>
            {exportState === "working"
              ? "Exporting"
              : exportState === "done"
              ? "Exported"
              : exportState === "failed"
              ? "Retry Export"
              : "Export Audit"}
          </span>
        </button>
      </div>
    </nav>
  )
}
