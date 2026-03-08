import { Badge } from "../ui/badge"
import { Sparkles, AlertTriangle, Lightbulb, TrendingUp, Cpu } from "lucide-react"

function AIInsights({ insights = [] }) {
  const formatInsights = insights.map((text) => {
    if (text.toLowerCase().includes("expense")) {
      return {
        type: "CRITICAL",
        icon: <AlertTriangle className="text-rose-400 group-hover:drop-shadow-[0_0_8px_rgba(251,113,133,0.5)]" size={18} />,
        bg: "bg-rose-500/5",
        border: "border-rose-500/20",
        badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        text
      }
    }
    if (text.toLowerCase().includes("revenue") || text.toLowerCase().includes("growth")) {
      return {
        type: "OPTIMAL",
        icon: <TrendingUp className="text-emerald-400 group-hover:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" size={18} />,
        bg: "bg-emerald-500/5",
        border: "border-emerald-500/20",
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        text
      }
    }
    return {
      type: "ADVISORY",
      icon: <Lightbulb className="text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" size={18} />,
      bg: "bg-blue-500/5",
      border: "border-blue-500/20",
      badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      text
    }
  })

  return (
    <div className="h-full flex flex-col justify-between">
      {/* CSS Animations */}
      <style>
        {`
          @keyframes fadeInSlide {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes moveGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-border-glow {
            background-size: 200% 200%;
            animation: moveGradient 4s linear infinite;
          }
        `}
      </style>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Cpu size={16} className="text-blue-400" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Neural Feed
            </h3>
          </div>
          <span className="text-[10px] font-mono text-blue-500/50 animate-pulse">
            ID: BW-09X-INTEL
          </span>
        </div>

        <div className="space-y-3">
          {formatInsights.map((i, index) => (
            <div
              key={index}
              className={`group flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500 hover:bg-slate-800/40 ${i.bg} ${i.border}`}
              style={{ 
                animation: `fadeInSlide 0.5s ease-out ${index * 0.15}s both` 
              }}
            >
              <div className="mt-1 shrink-0 p-2 rounded-xl bg-slate-950/50 border border-white/5 transition-transform group-hover:scale-110">
                {i.icon}
              </div>

              <div className="flex flex-col gap-3 w-full">
                <p className="text-sm text-slate-300 leading-relaxed font-medium group-hover:text-white transition-colors">
                  {i.text}
                </p>

                <div className="flex items-center justify-between">
                  <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent mr-4" />
                  <Badge className={`text-[9px] font-bold uppercase tracking-widest py-0.5 px-2 border rounded-md shadow-none ${i.badge}`}>
                    {i.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full group relative mt-6 overflow-hidden rounded-2xl p-[1px] transition-all active:scale-95 shadow-lg shadow-blue-500/10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-border-glow" />
        <div className="relative flex items-center justify-center gap-2 bg-slate-950 hover:bg-transparent transition-colors py-3 rounded-[15px]">
          <Sparkles size={16} className="text-blue-400 group-hover:text-white transition-colors" />
          <span className="text-xs font-black uppercase tracking-widest text-white">
            Run Macro-Analysis
          </span>
        </div>
      </button>
    </div>
  )
}

export default AIInsights