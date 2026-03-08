import { Card } from "../ui/card"
import { Badge } from "../ui/badge"

function Profitability() {

  const revenue = 245000
  const expenses = 160000

  const profit = revenue - expenses
  const margin = Math.round((profit / revenue) * 100)

  let status = "Healthy"

  if (margin < 20) status = "Low"
  else if (margin < 35) status = "Moderate"

  return (
    <div style={{ marginTop: "30px" }}>
      <Card>
        <div style={{ padding: "20px" }}>
          <h3>Profitability Analysis</h3>

          <div
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              marginTop: "10px"
            }}
          >
            {margin}% Profit Margin
          </div>

          <div style={{ marginTop: "10px" }}>
            <Badge>{status}</Badge>
          </div>

        </div>
      </Card>
    </div>
  )
}

export default Profitability