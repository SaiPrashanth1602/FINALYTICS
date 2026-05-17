import { useState } from "react"
import Navbar from "./components/common/Navbar"
import Sidebar from "./components/common/Sidebar"
import Dashboard from "./pages/Dashboard"
import Analytics from "./pages/Analytics"
import Advisor from "./pages/Advisor"
import { ThemeToggle } from "./components/ui/themeToggle.jsx"
import { useFinancialData } from "./context/useFinancialData"
import { X, RotateCcw, WifiOff, Wifi } from "lucide-react"

import { HashRouter, Routes, Route, Navigate } from "react-router-dom"

function App() {
  const { resetFinancials, lastUpdated } = useFinancialData()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [disconnected, setDisconnected] = useState(false)

  return (
    <HashRouter>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden transition-colors duration-300">
        <Sidebar
          disconnected={disconnected}
          onOpenSettings={() => setSettingsOpen(true)}
          onDisconnect={() => setDisconnected(true)}
        />
        <div className="flex-grow flex flex-col min-w-0 overflow-hidden">
          <Navbar disconnected={disconnected} onReconnect={() => setDisconnected(false)} />
          <main id="report-root" className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            {disconnected && (
              <div className="m-6 flex flex-col gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-700 dark:text-amber-200 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <WifiOff size={18} />
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest">Data feed disconnected</p>
                    <p className="text-xs opacity-80">Live refresh is paused locally. Reconnect to resume dashboard updates.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDisconnected(false)}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-950 transition hover:bg-amber-400 active:scale-95"
                >
                  <Wifi size={14} />
                  Reconnect
                </button>
              </div>
            )}
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="advisor" element={<Advisor />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>

        {settingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <section className="app-panel-strong w-full max-w-lg rounded-2xl border p-6 shadow-2xl">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Settings</h2>
                  <p className="mt-1 text-sm app-muted">Adjust display and local dashboard data.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  className="focus-ring rounded-xl p-2 app-hover app-muted transition hover:text-foreground"
                  aria-label="Close settings"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4">
                  <div>
                    <p className="text-sm font-bold">Appearance</p>
                    <p className="text-xs app-muted">Light and dark mode are saved on this device.</p>
                  </div>
                  <ThemeToggle />
                </div>

                <div className="rounded-2xl border border-border p-4">
                  <p className="text-sm font-bold">Financial model</p>
                  <p className="mt-1 text-xs app-muted">
                    Last synced {new Date(lastUpdated).toLocaleString("en-IN")}.
                  </p>
                  <button
                    type="button"
                    onClick={resetFinancials}
                    className="focus-ring mt-4 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-black uppercase tracking-widest transition app-hover"
                  >
                    <RotateCcw size={14} />
                    Reset Demo Data
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </HashRouter>
  )
}

export default App
