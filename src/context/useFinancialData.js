import { useContext } from "react"
import { FinancialDataContext } from "./financialDataContext"

export function useFinancialData() {
  const value = useContext(FinancialDataContext)

  if (!value) {
    throw new Error("useFinancialData must be used within a FinancialDataProvider")
  }

  return value
}
