import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  LogOut,
  MessageSquare,
  PieChart,
  Settings,
  ShieldAlert,
} from "lucide-react"

function Sidebar({ disconnected = false, onOpenSettings, onDisconnect }) {
  const location = useLocation()

  const menuItems = [
    { name: "Terminal", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Analytics", path: "/analytics", icon: <PieChart size={18} /> },
    { name: "AI Advisor", path: "/advisor", icon: <MessageSquare size={18} /> },
  ]

  return (
    <aside className="w-64 h-screen app-sidebar backdrop-blur-xl border-r flex flex-col p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <ShieldAlert size={18} className="text-white" />
        </div>
        <span className="text-xl font-black italic tracking-tighter text-foreground uppercase">
          Fin<span className="text-blue-500">alytics</span>
        </span>
      </div>

      <nav className="space-y-1.5 flex-grow">
        <p className="text-[10px] font-black app-muted uppercase tracking-[0.3em] mb-4 px-2">
          Systems
        </p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`focus-ring relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group overflow-hidden ${
                isActive ? "bg-blue-600/10 text-blue-500" : "app-muted hover:text-foreground app-hover"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
              )}

              <span
                className={`transition-transform duration-300 group-hover:scale-110 ${
                  isActive ? "text-blue-500" : "app-muted"
                }`}
              >
                {item.icon}
              </span>
              <span className="text-sm font-bold tracking-tight uppercase">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sai"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Sai Prashanth</span>
            <span className="text-[10px] app-muted font-mono tracking-tighter">
              {disconnected ? "DISCONNECTED" : "ADMIN_LEVEL_01"}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <button
            type="button"
            onClick={onOpenSettings}
            className="focus-ring flex items-center gap-3 px-4 py-2.5 app-muted hover:text-foreground app-hover rounded-xl w-full transition-all group"
          >
            <Settings size={16} className="group-hover:rotate-45 transition-transform" />
            <span className="font-bold text-xs uppercase tracking-widest">Settings</span>
          </button>
          <button
            type="button"
            onClick={onDisconnect}
            disabled={disconnected}
            className="focus-ring flex items-center gap-3 px-4 py-2.5 text-rose-500/80 hover:text-rose-500 hover:bg-rose-500/10 disabled:opacity-60 rounded-xl w-full transition-all"
          >
            <LogOut size={16} />
            <span className="font-bold text-xs uppercase tracking-widest">
              {disconnected ? "Disconnected" : "Disconnect"}
            </span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
