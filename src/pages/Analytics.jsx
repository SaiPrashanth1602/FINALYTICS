import { Card } from "../components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts"
import { cashFlowData } from "../data/mockData"

// Custom Tooltip to match the dashboard aesthetic
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{label}</p>
        <div className="flex items-center justify-between gap-8">
          <span className="text-xs font-medium text-slate-300">Net Expense:</span>
          <span className="text-xs font-bold text-rose-400">₹{payload[0].value.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

function Analytics() {
  return (
    <div className="p-8 w-full animate-in fade-in duration-700">
      {/* 🚀 PAGE HEADER */}
      <div className="mb-10">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 block mb-2">
          Deep Analysis Engine
        </span>
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
          Financial <span className="text-slate-500">Analytics</span>
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* MAIN BAR CHART */}
        <Card 
          colSpan="col-span-12" 
          title="Monthly Expense Volatility"
          description="High-fidelity tracking of capital outflow across Q1-Q4"
        >
          <div className="w-full h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlowData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#ffffff" 
                  opacity={0.05} 
                />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }}
                  tickFormatter={(val) => `₹${val/1000}k`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                
                <Bar 
                  dataKey="expenses" 
                  radius={[6, 6, 0, 0]} 
                  fill="url(#barGradient)"
                  barSize={40}
                >
                  {cashFlowData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      className="transition-all duration-500 hover:opacity-100 opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* 🍱 SIDE BENTO ITEMS FOR ANALYTICS */}
        <Card colSpan="col-span-12 md:col-span-6" title="Anomalies Detected">
          <div className="flex flex-col gap-4">
             {[1, 2].map((_, i) => (
               <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-rose-500/30 transition-all">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold">!</div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">Unusual Spend in {cashFlowData[i].month}</p>
                    <p className="text-xs text-slate-500">14% increase above projected baseline</p>
                  </div>
               </div>
             ))}
          </div>
        </Card>

        <Card colSpan="col-span-12 md:col-span-6" title="Efficiency Rating">
           <div className="flex flex-col items-center justify-center h-full py-4">
              <span className="text-5xl font-black text-emerald-400 italic">88%</span>
              <p className="text-slate-500 uppercase tracking-widest text-[10px] mt-2 font-bold">Optimization Score</p>
           </div>
        </Card>
      </div>
    </div>
  )
}

export default Analytics