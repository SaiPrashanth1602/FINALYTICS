import { useEffect, useState } from "react"
import {
  calculateMetrics,
  generateAIInsights,
  generateAlerts,
  generateAnomalies,
  generateBenchmarks,
  generateBusinessSummary,
  generateExpenseInsights,
  generateForecast,
  initialCashFlowData,
  initialExpenseData,
  initialVendorPayments,
} from "../data/mockData"
import { FinancialDataContext } from "./financialDataContext"

const STORAGE_KEY = "finalytics-financial-state"

function buildDerivedState(cashFlowData, expenseData, vendors) {
  const metrics = calculateMetrics(cashFlowData)
  const alerts = generateAlerts(metrics, vendors)
  const insights = generateAIInsights(metrics, expenseData, vendors)
  const forecast = generateForecast(cashFlowData)
  const benchmarks = generateBenchmarks(metrics)
  const expenseInsights = generateExpenseInsights(expenseData, metrics.totalExpenses)
  const anomalies = generateAnomalies(cashFlowData)
  const businessSummary = generateBusinessSummary(metrics, forecast, alerts)

  return {
    metrics,
    alerts,
    insights,
    forecast,
    benchmarks,
    expenseInsights,
    anomalies,
    businessSummary,
  }
}

function loadInitialState() {
  if (typeof window === "undefined") {
    return {
      cashFlowData: initialCashFlowData,
      expenseData: initialExpenseData,
      vendors: initialVendorPayments,
      lastUpdated: new Date().toISOString(),
      analysisRuns: 0,
    }
  }

  const savedState = window.localStorage.getItem(STORAGE_KEY)

  if (!savedState) {
    return {
      cashFlowData: initialCashFlowData,
      expenseData: initialExpenseData,
      vendors: initialVendorPayments,
      lastUpdated: new Date().toISOString(),
      analysisRuns: 0,
    }
  }

  try {
    const parsed = JSON.parse(savedState)

    return {
      cashFlowData: parsed.cashFlowData ?? initialCashFlowData,
      expenseData: parsed.expenseData ?? initialExpenseData,
      vendors: parsed.vendors ?? initialVendorPayments,
      lastUpdated: parsed.lastUpdated ?? new Date().toISOString(),
      analysisRuns: parsed.analysisRuns ?? 0,
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)

    return {
      cashFlowData: initialCashFlowData,
      expenseData: initialExpenseData,
      vendors: initialVendorPayments,
      lastUpdated: new Date().toISOString(),
      analysisRuns: 0,
    }
  }
}

export function FinancialDataProvider({ children }) {
  const [state, setState] = useState(loadInitialState)
  const { cashFlowData, expenseData, vendors, lastUpdated, analysisRuns } = state

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const derived = buildDerivedState(cashFlowData, expenseData, vendors)

  function refreshFinancials() {
    setState((current) => ({
      ...current,
      cashFlowData: current.cashFlowData.map((month, index) => {
        if (index !== current.cashFlowData.length - 1) {
          return month
        }

        const revenueShift = 8000 + Math.round(Math.random() * 12000)
        const expenseShift = 3000 + Math.round(Math.random() * 9000)

        return {
          ...month,
          revenue: month.revenue + revenueShift,
          expenses: month.expenses + expenseShift,
        }
      }),
      expenseData: current.expenseData.map((category) => ({
        ...category,
        value: Math.max(4000, Math.round(category.value * (0.98 + Math.random() * 0.08))),
      })),
      analysisRuns: current.analysisRuns + 1,
      lastUpdated: new Date().toISOString(),
    }))
  }

  function toggleVendorStatus(vendorId) {
    setState((current) => ({
      ...current,
      vendors: current.vendors.map((vendor) =>
        vendor.id === vendorId
          ? {
              ...vendor,
              status: vendor.status === "Paid" ? "Pending" : "Paid",
            }
          : vendor
      ),
      lastUpdated: new Date().toISOString(),
    }))
  }

  function resetFinancials() {
    setState({
      cashFlowData: initialCashFlowData,
      expenseData: initialExpenseData,
      vendors: initialVendorPayments,
      analysisRuns: 0,
      lastUpdated: new Date().toISOString(),
    })
  }

  return (
    <FinancialDataContext.Provider
      value={{
        cashFlowData,
        expenseData,
        vendors,
        lastUpdated,
        analysisRuns,
        ...derived,
        refreshFinancials,
        toggleVendorStatus,
        resetFinancials,
      }}
    >
      {children}
    </FinancialDataContext.Provider>
  )
}
