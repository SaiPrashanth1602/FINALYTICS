import { Card } from "../ui/card"

function BusinessSummary() {

  return (
    <div style={{ marginTop: "30px" }}>
      <Card>
        <div style={{ padding: "20px" }}>
          <h3>AI Business Summary</h3>

          <p style={{ marginTop: "10px" }}>
            Your business is showing healthy revenue growth with stable cash
            reserves. However, marketing expenses are rising faster than
            operational growth. Consider optimizing marketing campaigns to
            improve profitability.
          </p>

        </div>
      </Card>
    </div>
  )
}

export default BusinessSummary