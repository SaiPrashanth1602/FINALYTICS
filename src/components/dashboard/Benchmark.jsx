import { Card } from "../ui/card"
import { Badge } from "../ui/badge"

function Benchmark() {

  const revenueGrowth = 12
  const industryGrowth = 8

  const expenseRatio = 65
  const industryExpense = 70

  const cashHealth = "Good"

  return (
    <div style={{ marginTop: "30px" }}>
      <Card>
        <div style={{ padding: "20px" }}>
          <h3>SME Benchmarking</h3>

          <div style={{ marginTop: "15px", display: "grid", gap: "10px" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Revenue Growth</span>
              <Badge>
                {revenueGrowth > industryGrowth ? "Above Avg" : "Below Avg"}
              </Badge>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Expense Ratio</span>
              <Badge>
                {expenseRatio < industryExpense ? "Healthy" : "High"}
              </Badge>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Cash Health</span>
              <Badge>{cashHealth}</Badge>
            </div>

          </div>
        </div>
      </Card>
    </div>
  )
}

export default Benchmark