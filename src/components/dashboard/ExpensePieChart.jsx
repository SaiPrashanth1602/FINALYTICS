import { Card } from "../ui/card"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"]

function ExpensePieChart({ data }) {

  return (
    <Card className="bg-slate-900/40 border-slate-800 p-6">

      <h3 className="text-lg font-semibold text-slate-100 mb-6">
        Expense Breakdown
      </h3>

      <div className="w-full h-[280px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </Card>
  )
}

export default ExpensePieChart