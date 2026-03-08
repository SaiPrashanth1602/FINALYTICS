import { Badge } from "../ui/badge"
import { Card } from "../ui/card"
import { ExternalLink, AlertTriangle, ShieldCheck, Activity } from "lucide-react"

function calculateVendorRisk(amount) {
  const value = parseInt(amount.replace(/[^0-9]/g, ''))
  if (value > 30000) return { label: "High", color: "rose", icon: <AlertTriangle size={12} /> }
  if (value > 15000) return { label: "Medium", color: "amber", icon: <Activity size={12} /> }
  return { label: "Low", color: "emerald", icon: <ShieldCheck size={12} /> }
}

function VendorTable({ vendors = [] }) {
  return (
    <Card className="bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm dark:shadow-none transition-colors">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Vendor Payments
        </h3>
        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium transition-colors">
          View All Transactions
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/30 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Vendor</th>
              <th className="px-6 py-4 font-semibold text-center">Amount</th>
              <th className="px-6 py-4 font-semibold text-center">Risk Level</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-center">Due Date</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {vendors.map((v, i) => {
              const risk = calculateVendorRisk(v.amount);
              return (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  {/* Vendor Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {v.vendor.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[120px]">
                        {v.vendor}
                      </span>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-slate-600 dark:text-slate-300 font-medium">
                      {v.amount}
                    </span>
                  </td>

                  {/* Risk Badge (New Column) */}
                  <td className="px-6 py-4 text-center">
                    <Badge className={`flex items-center gap-1.5 justify-center bg-${risk.color}-500/10 text-${risk.color}-600 dark:text-${risk.color}-400 border-${risk.color}-500/20`}>
                      {risk.icon}
                      {risk.label}
                    </Badge>
                  </td>

                  {/* Payment Status */}
                  <td className="px-6 py-4 text-center">
                    <Badge className={
                      v.status === "Paid"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    }>
                      {v.status}
                    </Badge>
                  </td>

                  {/* Due Date */}
                  <td className="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    {v.due}
                  </td>

                  {/* Action */}
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-slate-200 opacity-0 group-hover:opacity-100 transition-all">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default VendorTable