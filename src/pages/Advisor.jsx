import { useState, useRef, useEffect } from "react"
import { Bot, User, MessageSquareQuote, Zap, Send, TrendingUp, ShieldCheck } from "lucide-react"
import { calculateMetrics } from "../data/mockData"

function Advisor() {
  const metrics = calculateMetrics()
  const scrollRef = useRef(null)
  const [query, setQuery] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    { 
      role: "bot", 
      content: "Finalytics Core initialized. Financial data synchronized. How can I assist with your fiscal strategy today?" 
    }
  ])

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, isTyping])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim() || isTyping) return

    const userMessage = { role: "user", content: query }
    setMessages(prev => [...prev, userMessage])
    setQuery("")
    setIsTyping(true)

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            message: query, 
            context: metrics,
            projectName: "FINALYTICS" // Passing the project name to the backend
        }),
      })
      
      const data = await response.json()
      setMessages(prev => [...prev, { role: "bot", content: data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", content: "ERROR: Finalytics uplink unstable. Please check server connection." }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col p-8 animate-in fade-in duration-700">
      
      {/* 🚀 FINALYTICS HEADER */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-white">
              Finalytics <span className="text-blue-500">Advisor</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Live</p>
            </div>
          </div>
        </div>
      </div>

      {/* 💬 CHAT STREAM */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
              msg.role === "bot" 
                ? "bg-blue-600/10 border-blue-500/30 text-blue-400" 
                : "bg-slate-800 border-white/10 text-slate-400"
            }`}>
              {msg.role === "bot" ? <Zap size={18} /> : <User size={18} />}
            </div>

            <div className={`max-w-[75%] p-4 rounded-2xl border ${
              msg.role === "bot" 
                ? "bg-slate-900/50 backdrop-blur-md border-white/5 text-slate-200" 
                : "bg-blue-600 text-white border-blue-400"
            }`}>
              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {/* LOADING INDICATOR */}
        {isTyping && (
          <div className="flex gap-4 animate-pulse">
            <div className="h-10 w-10 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Bot size={18} className="animate-spin" />
            </div>
            <div className="p-4 bg-slate-900/30 rounded-2xl text-slate-500 text-xs italic">
              Finalytics is analyzing fiscal nodes...
            </div>
          </div>
        )}
      </div>

      {/* 📥 INPUT SECTION */}
      <form onSubmit={handleSubmit} className="relative">
        <div className={`bg-slate-900/80 backdrop-blur-xl border rounded-3xl p-2 flex items-center gap-2 transition-all ${isTyping ? 'opacity-50 border-white/5' : 'border-white/10 focus-within:border-blue-500/50'}`}>
          <div className="pl-4 text-slate-500">
            <MessageSquareQuote size={20} />
          </div>
          <input
            value={query}
            disabled={isTyping}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-slate-100 placeholder:text-slate-600 w-full py-3 text-sm font-medium"
            placeholder={isTyping ? "Processing..." : "Ask Finalytics about revenue, profit, or runway..."}
          />
          <button
            type="submit"
            disabled={isTyping || !query.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-2xl px-8 py-3 flex items-center gap-2 font-bold uppercase tracking-tight transition-all active:scale-95"
          >
            {isTyping ? "..." : <Send size={16} />}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Advisor