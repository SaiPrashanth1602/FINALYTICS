// src/components/dashboard/Alerts.jsx

import { Card } from "../ui/card"
import { AlertCircle, BellRing, ChevronRight } from "lucide-react"

function Alerts({ alerts }) {

  return (
    <Card className="bg-slate-900/40 border-slate-800 p-6 h-full">

      <div className="flex items-center gap-2 mb-6">
        <BellRing className="text-rose-500 animate-bounce" size={18} />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          Risk Radar
        </h3>
      </div>

      <div className="grid gap-3">

        {alerts.length === 0 && (
          <div className="text-xs text-slate-400">
            No financial risks detected.
          </div>
        )}

        {alerts.map((a, i) => (

          <div
            key={i}
            className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
              a.type === "critical"
                ? "bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40"
                : a.type === "warning"
                ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40"
                : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600"
            }`}
          >

            <div className="flex items-center gap-3">

              <AlertCircle
                size={16}
                className={
                  a.type === "critical"
                    ? "text-rose-500"
                    : a.type === "warning"
                    ? "text-amber-400"
                    : "text-slate-400"
                }
              />

              <span
                className={`text-xs font-medium ${
                  a.type === "critical"
                    ? "text-rose-200"
                    : a.type === "warning"
                    ? "text-amber-200"
                    : "text-slate-300"
                }`}
              >
                {a.message}
              </span>

            </div>

            <ChevronRight
              size={14}
              className="text-slate-600 group-hover:translate-x-1 transition-transform"
            />

          </div>

        ))}

      </div>

    </Card>
  )
}

export default Alerts