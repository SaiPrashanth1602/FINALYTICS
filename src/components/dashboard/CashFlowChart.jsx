import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-8">
              <span className="text-xs font-medium text-slate-300 capitalize">{entry.name}:</span>
              <span className="text-xs font-bold text-white">₹{(entry.value).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

function CashFlowChart({ data }) {
  return (
    <div className="w-full h-full min-h-[320px] flex flex-col">
      {/* Chart Legend / Stats */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/70 block mb-1">
            Data Stream 01
          </span>
          <h3 className="text-xl font-bold tracking-tighter text-white italic uppercase">
            Market Trajectory
          </h3>
        </div>
        
        <div className="flex gap-4 p-2 bg-white/5 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Expenses</span>
          </div>
        </div>
      </div>

      <div className="flex-grow w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
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
              tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
              dy={15}
            />

            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#64748b", fontSize: 10, fontWeight: 700 }}
              tickFormatter={(val) => `₹${val/1000}k`}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />

            <Area
              name="revenue"
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={4}
              fillOpacity={1}
              fill="url(#colorRev)"
              strokeLinecap="round"
              activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
            />

            <Area
              name="expenses"
              type="monotone"
              dataKey="expenses"
              stroke="#f43f5e"
              strokeWidth={2}
              strokeDasharray="5 5"
              fillOpacity={1}
              fill="url(#colorExp)"
              activeDot={{ r: 4, strokeWidth: 0, fill: '#f43f5e' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CashFlowChart