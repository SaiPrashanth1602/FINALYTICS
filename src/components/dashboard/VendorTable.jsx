import { Badge } from "../ui/badge"
import { CheckCircle2, AlertTriangle, ShieldCheck, Activity } from "lucide-react"
import { formatCurrency, formatDueDate } from "../../data/mockData"

function calculateVendorRisk(amount) {
  if (amount > 30000) {
    return {
      label: "High",
      icon: <AlertTriangle size={12} />,
      className: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    }
  }

  if (amount > 15000) {
    return {
      label: "Medium",
      icon: <Activity size={12} />,
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    }
  }

  return {
    label: "Low",
    icon: <ShieldCheck size={12} />,
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  }
}

function VendorTable({ vendors = [], onToggleStatus }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card/60 transition-colors">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Vendor Payments
        </h3>
        <span className="text-xs text-slate-500 font-medium transition-colors">
          {vendors.filter((vendor) => vendor.status !== "Paid").length} pending
        </span>
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
            {vendors.map((vendor) => {
              const risk = calculateVendorRisk(vendor.amount)

              return (
                <tr key={vendor.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                        {vendor.vendor.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="block font-medium text-slate-700 dark:text-slate-200 truncate max-w-[160px]">
                          {vendor.vendor}
                        </span>
                        <span className="block text-[11px] uppercase tracking-widest text-slate-500">
                          {vendor.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="font-mono text-slate-600 dark:text-slate-300 font-medium">
                      {formatCurrency(vendor.amount)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Badge className={`flex items-center gap-1.5 justify-center ${risk.className}`}>
                      {risk.icon}
                      {risk.label}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Badge
                      className={
                        vendor.status === "Paid"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                      }
                    >
                      {vendor.status}
                    </Badge>
                  </td>

                  <td className="px-6 py-4 text-center text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    {formatDueDate(vendor.due)}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(vendor.id)}
                      className="focus-ring inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-100 dark:hover:bg-white/5"
                    >
                      <CheckCircle2 size={14} />
                      {vendor.status === "Paid" ? "Reopen" : "Mark Paid"}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default VendorTable
