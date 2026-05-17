const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export const initialCashFlowData = [
  { month: "Jan", revenue: 220000, expenses: 148000 },
  { month: "Feb", revenue: 238000, expenses: 162000 },
  { month: "Mar", revenue: 254000, expenses: 171000 },
  { month: "Apr", revenue: 281000, expenses: 182000 },
  { month: "May", revenue: 305000, expenses: 196000 },
  { month: "Jun", revenue: 332000, expenses: 214000 },
]

export const initialExpenseData = [
  { name: "Salaries", value: 118000 },
  { name: "Operations", value: 36000 },
  { name: "Marketing", value: 29000 },
  { name: "Software", value: 18000 },
  { name: "Logistics", value: 13000 },
]

export const initialVendorPayments = [
  {
    id: "aws",
    vendor: "AWS Cloud",
    amount: 42000,
    status: "Pending",
    due: "2026-04-24",
    category: "Infrastructure",
  },
  {
    id: "rent",
    vendor: "Orbit Office Lease",
    amount: 55000,
    status: "Paid",
    due: "2026-04-12",
    category: "Facilities",
  },
  {
    id: "marketing",
    vendor: "Nova Growth Lab",
    amount: 27000,
    status: "Pending",
    due: "2026-04-26",
    category: "Marketing",
  },
  {
    id: "licenses",
    vendor: "Figma Enterprise",
    amount: 11000,
    status: "Paid",
    due: "2026-04-10",
    category: "Software",
  },
]

export function formatCurrency(value) {
  return currencyFormatter.format(Math.round(value))
}

export function formatDueDate(value) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  })
}

export function calculateMetrics(cashFlowData) {
  const totalRevenue = cashFlowData.reduce((sum, month) => sum + month.revenue, 0)
  const totalExpenses = cashFlowData.reduce((sum, month) => sum + month.expenses, 0)
  const profit = totalRevenue - totalExpenses
  const profitMargin = totalRevenue === 0 ? 0 : (profit / totalRevenue) * 100

  const latest = cashFlowData[cashFlowData.length - 1]
  const previous = cashFlowData[cashFlowData.length - 2] ?? latest

  const revenueGrowth =
    previous.revenue === 0
      ? 0
      : ((latest.revenue - previous.revenue) / previous.revenue) * 100

  const expenseGrowth =
    previous.expenses === 0
      ? 0
      : ((latest.expenses - previous.expenses) / previous.expenses) * 100

  const burnRate = latest.expenses
  const netCashFlow = latest.revenue - latest.expenses
  const runwayMonths = burnRate === 0 ? 0 : latest.revenue / burnRate

  return {
    totalRevenue,
    totalExpenses,
    profit,
    profitMargin,
    revenueGrowth,
    expenseGrowth,
    burnRate,
    netCashFlow,
    runwayMonths,
  }
}

export function generateAlerts(metrics, vendors) {
  const alerts = []
  const pendingVendors = vendors.filter((vendor) => vendor.status !== "Paid")
  const overdueVendors = vendors.filter(
    (vendor) => vendor.status !== "Paid" && new Date(vendor.due) < new Date()
  )

  if (metrics.runwayMonths < 1.75) {
    alerts.push({
      type: "critical",
      message: "Cash runway is below 2 months. Tighten burn immediately.",
    })
  }

  if (metrics.expenseGrowth > metrics.revenueGrowth) {
    alerts.push({
      type: "warning",
      message: "Expense growth is outpacing revenue growth this cycle.",
    })
  }

  if (overdueVendors.length > 0) {
    alerts.push({
      type: "critical",
      message: `${overdueVendors.length} vendor payment${overdueVendors.length > 1 ? "s are" : " is"} overdue.`,
    })
  }

  if (pendingVendors.length > 0) {
    alerts.push({
      type: "info",
      message: `${pendingVendors.length} vendor payment${pendingVendors.length > 1 ? "s are" : " is"} awaiting action.`,
    })
  }

  if (alerts.length === 0) {
    alerts.push({
      type: "info",
      message: "Operations are stable. No immediate financial risks detected.",
    })
  }

  return alerts
}

export function generateAIInsights(metrics, expenseData, vendors) {
  const insights = []
  const highestExpense = [...expenseData].sort((left, right) => right.value - left.value)[0]
  const pendingTotal = vendors
    .filter((vendor) => vendor.status !== "Paid")
    .reduce((sum, vendor) => sum + vendor.amount, 0)

  if (metrics.revenueGrowth >= 8) {
    insights.push("Revenue momentum is healthy. You can keep leaning into winning acquisition channels.")
  }

  if (metrics.expenseGrowth > metrics.revenueGrowth) {
    insights.push("Expense pressure is rising faster than revenue. Review discretionary spending before scaling further.")
  }

  if (highestExpense) {
    insights.push(
      `${highestExpense.name} is your largest expense bucket at ${formatCurrency(highestExpense.value)}.`
    )
  }

  if (pendingTotal > 0) {
    insights.push(`There is ${formatCurrency(pendingTotal)} tied up in unpaid vendor obligations.`)
  }

  insights.push(
    `Current runway is ${metrics.runwayMonths.toFixed(1)} months with a latest-month net cash flow of ${formatCurrency(metrics.netCashFlow)}.`
  )

  return insights
}

export function generateForecast(data) {
  const recent = data.slice(-4)
  const revenueChanges = []
  const expenseChanges = []

  for (let index = 1; index < recent.length; index += 1) {
    revenueChanges.push(recent[index].revenue - recent[index - 1].revenue)
    expenseChanges.push(recent[index].expenses - recent[index - 1].expenses)
  }

  const avgRevenueDelta =
    revenueChanges.reduce((sum, value) => sum + value, 0) / (revenueChanges.length || 1)
  const avgExpenseDelta =
    expenseChanges.reduce((sum, value) => sum + value, 0) / (expenseChanges.length || 1)

  const latest = data[data.length - 1]
  const predictedRevenue = latest.revenue + avgRevenueDelta
  const predictedExpenses = latest.expenses + avgExpenseDelta
  const predictedProfit = predictedRevenue - predictedExpenses

  const volatility =
    revenueChanges.reduce((sum, value) => sum + Math.abs(value - avgRevenueDelta), 0) /
    (revenueChanges.length || 1)

  const confidence = Math.max(62, Math.min(96, Math.round(94 - volatility / 1200)))

  return {
    predictedRevenue,
    predictedExpenses,
    predictedProfit,
    confidence,
    narrative:
      predictedProfit > 0
        ? "Momentum suggests another profitable month if cost growth stays contained."
        : "The next cycle may slip negative unless expenses are trimmed or collections improve.",
  }
}

export function generateBenchmarks(metrics) {
  const industryRevenueGrowth = 7.8
  const expenseRatio = (metrics.totalExpenses / metrics.totalRevenue) * 100
  const industryExpenseRatio = 68

  return {
    revenueGrowth: {
      company: metrics.revenueGrowth,
      industry: industryRevenueGrowth,
      status: metrics.revenueGrowth >= industryRevenueGrowth ? "Above Avg" : "Below Avg",
    },
    expenseRatio: {
      company: expenseRatio,
      industry: industryExpenseRatio,
      status: expenseRatio <= industryExpenseRatio ? "Healthy" : "High",
    },
    cashHealth:
      metrics.runwayMonths >= 2.5 ? "Strong" : metrics.runwayMonths >= 1.5 ? "Watch" : "Risk",
  }
}

export function generateExpenseInsights(expenseData, totalExpenses) {
  return [...expenseData]
    .sort((left, right) => right.value - left.value)
    .slice(0, 4)
    .map((category) => ({
      ...category,
      share: totalExpenses === 0 ? 0 : (category.value / totalExpenses) * 100,
    }))
}

export function generateBusinessSummary(metrics, forecast, alerts) {
  const leadingAlert = alerts.find((alert) => alert.type !== "info")

  if (leadingAlert) {
    return `The business is profitable, but ${leadingAlert.message.toLowerCase()} Forecasted next-month profit is ${formatCurrency(
      forecast.predictedProfit
    )}.`
  }

  return `Revenue is growing at ${metrics.revenueGrowth.toFixed(
    1
  )}% month over month, profit margin is ${metrics.profitMargin.toFixed(
    1
  )}%, and the business is projected to close next month at ${formatCurrency(forecast.predictedProfit)} profit.`
}

export function generateAnomalies(data) {
  return data
    .filter((month, index) => index > 0)
    .map((month, index) => {
      const previous = data[index]
      const expenseDelta = ((month.expenses - previous.expenses) / previous.expenses) * 100

      return {
        month: month.month,
        expenseDelta,
        isAnomaly: expenseDelta >= 8,
      }
    })
    .filter((entry) => entry.isAnomaly)
    .slice(-3)
}
