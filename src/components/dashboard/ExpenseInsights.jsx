import { Card } from "../ui/card"

function ExpenseInsights() {

  const categories = [
    { name: "Salaries", amount: 40000 },
    { name: "Rent", amount: 20000 },
    { name: "Marketing", amount: 15000 }
  ]

  return (
    <div style={{ marginTop: "30px" }}>
      <Card>
        <div style={{ padding: "20px" }}>
          <h3>Top Expense Categories</h3>

          <div style={{ marginTop: "15px" }}>
            {categories.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px"
                }}
              >
                <span>{c.name}</span>
                <span>₹{c.amount}</span>
              </div>
            ))}
          </div>

        </div>
      </Card>
    </div>
  )
}

export default ExpenseInsights