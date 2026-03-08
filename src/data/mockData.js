export const cashFlowData = [
  { month: "Jan", revenue: 20000, expenses: 15000 },
  { month: "Feb", revenue: 24000, expenses: 17000 },
  { month: "Mar", revenue: 28000, expenses: 20000 },
  { month: "Apr", revenue: 32000, expenses: 21000 },
  { month: "May", revenue: 36000, expenses: 25000 },
  { month: "Jun", revenue: 40000, expenses: 30000 }
]

export const expenseData = [
  { name: "Salaries", value: 40000 },
  { name: "Rent", value: 20000 },
  { name: "Marketing", value: 15000 },
  { name: "Software", value: 10000 },
  { name: "Operations", value: 12000 }
]

export const vendorPayments = [
  { vendor: "AWS", amount: "₹12,000", status: "Paid", due: "Mar 5" },
  { vendor: "Office Rent", amount: "₹40,000", status: "Pending", due: "Mar 10" },
  { vendor: "Marketing Agency", amount: "₹15,000", status: "Paid", due: "Mar 2" },
  { vendor: "Software Licenses", amount: "₹8,000", status: "Pending", due: "Mar 12" }
]

/* ---------------- FINANCIAL ENGINE ---------------- */

export function calculateMetrics() {
  const totalRevenue = cashFlowData.reduce((sum, m) => sum + m.revenue, 0)
  const totalExpenses = cashFlowData.reduce((sum, m) => sum + m.expenses, 0)

  const profit = totalRevenue - totalExpenses
  const profitMargin = ((profit / totalRevenue) * 100).toFixed(1)

  const latest = cashFlowData[cashFlowData.length - 1]
  const previous = cashFlowData[cashFlowData.length - 2]

  const revenueGrowth = (
    ((latest.revenue - previous.revenue) / previous.revenue) *
    100
  ).toFixed(1)

  const expenseGrowth = (
    ((latest.expenses - previous.expenses) / previous.expenses) *
    100
  ).toFixed(1)

  const burnRate = latest.expenses
  const runwayMonths = (latest.revenue / burnRate).toFixed(1)

  return {
    totalRevenue,
    totalExpenses,
    profit,
    profitMargin,
    revenueGrowth,
    expenseGrowth,
    burnRate,
    runwayMonths
  }
}

/* ---------------- ALERT SYSTEM ---------------- */

export function generateAlerts() {
  const alerts = []
  const metrics = calculateMetrics()

  if (metrics.runwayMonths < 2) {
    alerts.push({
      type: "critical",
      message: "Cash runway below 2 months. Immediate action needed."
    })
  }

  if (metrics.expenseGrowth > metrics.revenueGrowth) {
    alerts.push({
      type: "warning",
      message: "Expenses are growing faster than revenue."
    })
  }

  const pendingVendors = vendorPayments.filter(v => v.status === "Pending")

  if (pendingVendors.length > 1) {
    alerts.push({
      type: "info",
      message: `${pendingVendors.length} vendor payments pending.`
    })
  }

  return alerts
}

/* ---------------- AI INSIGHTS ---------------- */

export function generateAIInsights() {
  const metrics = calculateMetrics()

  const insights = []

  if (metrics.revenueGrowth > 10) {
    insights.push(
      "Revenue growth is strong. Consider reinvesting into growth channels."
    )
  }

  if (metrics.expenseGrowth > metrics.revenueGrowth) {
    insights.push(
      "Expenses are rising faster than revenue. Review marketing and operational costs."
    )
  }

  if (metrics.profitMargin > 25) {
    insights.push(
      "Profit margins are healthy. This is a good time to scale operations."
    )
  }

  insights.push(
    `Current runway is approximately ${metrics.runwayMonths} months based on latest burn rate.`
  )

  return insights
}