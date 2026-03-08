import { useState, useRef, useEffect } from "react"
import { FormInput, FormButton, FormField } from "../components/ui/form"
import { Sparkles, Send, Bot, User, MessageSquareQuote, Zap, ShieldCheck, TrendingUp } from "lucide-react"
import { calculateMetrics, generateAIInsights } from "../data/mockData"

function Advisor() {
  const metrics = calculateMetrics()
  const insights = generateAIInsights()
  const scrollRef = useRef(null)

  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "System initialized. I am your BitWars Strategic Advisor. I have analyzed your Q1-Q4 fiscal data. How shall we proceed?"
    }
  ])
  const [query, setQuery] = useState("")

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  function generateResponse(question) {
    const q = question.toLowerCase()
    if (q.includes("revenue")) return `Current Revenue Stream: ₹${metrics.totalRevenue.toLocaleString()}. Growth Velocity: ${metrics.revenueGrowth}%.`
    if (q.includes("expense") || q.includes("spend")) return `Expenditure Alert: Total outflow is ₹${metrics.totalExpenses.toLocaleString()}. Momentum is at ${metrics.expenseGrowth}%. Recommend immediate cost-node optimization.`
    if (q.includes("profit")) return `Net Yield: ₹${metrics.profit.toLocaleString()}. Margin Stability: ${metrics.profitMargin}%.`
    if (q.includes("runway") || q.includes("cash")) return `Survival Projection: At current burn, the terminal runway is ${metrics.runwayMonths} months.`
    if (q.includes("advice") || q.includes("improve")) return `Strategic Intel: ${insights[0]} Additionally, ${insights[1]}`
    return "Query unrecognized. Please target: Revenue, Profit, Runway, or Strategic Advice."
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    const userMsg = { role: "user", content: query }
    setMessages(prev => [...prev, userMsg])
    setQuery("")

    // Simulate "Neural Processing" delay
    setTimeout(() => {
      const botMsg = { role: "bot", content: generateResponse(query) }
      setMessages(prev => [...prev, botMsg])
    }, 6000) // 0.6s delay
  }

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 🚀 AI STATUS HEADER */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="relative">
             <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-40 animate-pulse"></div>
             <div className="relative h-12 w-12 bg-slate-900 border border-blue-500/50 rounded-2xl flex items-center justify-center text-blue-400">
               <Bot size={24} />
             </div>
          </div>
          <div>
            <h2 className="text-xl font-black italic uppercase tracking-tighter text-white">Advisor <span className="text-blue-500">Core</span></h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Neural Link: Active</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex gap-2">
           {["Aggressive", "Conservative", "Balanced"].map(mode => (
             <button key={mode} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-bold text-slate-400 hover:text-white uppercase transition-colors">
               {mode}
             </button>
           ))}
        </div>
      </div>

      {/* 💬 CHAT STREAM */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
              msg.role === "bot" 
                ? "bg-blue-600/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]" 
                : "bg-slate-800 border-white/10 text-slate-400"
            }`}>
              {msg.role === "bot" ? <Zap size={18} /> : <User size={18} />}
            </div>

            <div className={`max-w-[75%] p-4 rounded-2xl border transition-all ${
              msg.role === "bot" 
                ? "bg-slate-900/50 backdrop-blur-md border-white/5 text-slate-200" 
                : "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/20"
            }`}>
              <p className="text-sm font-medium leading-relaxed tracking-tight">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ⚡ QUICK ACTIONS */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { label: "Runway Audit", icon: <ShieldCheck size={12}/> },
          { label: "Growth Advice", icon: <TrendingUp size={12}/> },
          { label: "Risk Scan", icon: <Zap size={12}/> }
        ].map(btn => (
          <button 
            key={btn.label}
            onClick={() => { setQuery(btn.label); }}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest"
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      {/* 📥 NEURAL INPUT */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-2 shadow-2xl flex items-center gap-2 focus-within:border-blue-500/50 transition-all">
          <div className="pl-4 text-slate-500">
            <MessageSquareQuote size={20} />
          </div>
          <input
            id="ai-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-slate-100 placeholder:text-slate-600 w-full py-3 text-sm font-medium"
            placeholder="Interrogate the core... (e.g. 'What is my burn rate?')"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-2xl px-8 py-3 flex items-center gap-2 font-black uppercase italic tracking-tighter transition-all active:scale-95 shadow-lg shadow-blue-500/30"
          >
            SEND <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}

export default Advisor