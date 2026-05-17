import { Card } from "../ui/card"

function BusinessSummary({ summary, lastUpdated }) {
  return (
    <Card className="bg-slate-900/40 border-slate-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
          AI Business Summary
        </h3>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
          {new Date(lastUpdated).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <p className="text-sm leading-7 text-slate-300">
        {summary}
      </p>
    </Card>
  )
}

export default BusinessSummary
