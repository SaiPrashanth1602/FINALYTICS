import { useState, useRef, useEffect } from "react"
import { Bot, User, MessageSquareQuote, Zap, Send } from "lucide-react"
import { useFinancialData } from "../context/useFinancialData"
import { formatCurrency } from "../data/mockData"

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "")

function buildOfflineReply(query, metrics) {
  const normalizedQuery = query.toLowerCase()

  if (normalizedQuery.includes("runway")) {
    return `Current runway is ${metrics.runwayMonths.toFixed(1)} months. Latest monthly burn is ${formatCurrency(metrics.burnRate)}, so protecting cash conversion should be the priority.`
  }

  if (normalizedQuery.includes("profit") || normalizedQuery.includes("margin")) {
    return `Profit is ${formatCurrency(metrics.profit)} with a ${metrics.profitMargin.toFixed(1)}% margin. Margin stays healthy while revenue growth continues to outpace fixed-cost drag.`
  }

  if (normalizedQuery.includes("revenue") || normalizedQuery.includes("growth")) {
    return `Revenue growth is running at ${metrics.revenueGrowth.toFixed(1)}% month over month. Keep pushing the channels driving growth, but watch expense growth at ${metrics.expenseGrowth.toFixed(1)}%.`
  }

  return `Revenue stands at ${formatCurrency(metrics.totalRevenue)}, expenses at ${formatCurrency(metrics.totalExpenses)}, and runway at ${metrics.runwayMonths.toFixed(1)} months. The healthiest next move is tightening spend while preserving revenue momentum.`
}

function Advisor() {
  const { metrics } = useFinancialData()
  const scrollRef = useRef(null)
  const [query, setQuery] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [connectionState, setConnectionState] = useState("checking")
  const [apiError, setApiError] = useState("")
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Finalytics Core initialized. Financial data synchronized. Ask me about revenue, runway, profit, or spend pressure.",
    },
  ])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    let cancelled = false

    async function checkApiHealth() {
      try {
        const response = await fetch(`${apiBaseUrl}/api/health`)
        const data = await response.json()

        if (!cancelled) {
          setConnectionState(data.geminiConfigured ? "live" : "missing-key")
          setApiError(data.geminiConfigured ? "" : "GEMINI_API_KEY is missing on the API server.")
        }
      } catch {
        if (!cancelled) {
          setConnectionState("offline")
          setApiError("API server is not running. Start it with npm run dev:full or npm run server.")
        }
      }
    }

    checkApiHealth()
    return () => {
      cancelled = true
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()

    if (!query.trim() || isTyping) {
      return
    }

    const prompt = query
    const userMessage = { role: "user", content: prompt }
    setMessages((current) => [...current, userMessage])
    setQuery("")
    setIsTyping(true)

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          context: metrics,
          projectName: "FINALYTICS",
        }),
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}))
        throw new Error(errorPayload.error || "Backend unavailable")
      }

      const data = await response.json()
      setConnectionState("live")
      setApiError("")
      setMessages((current) => [...current, { role: "bot", content: data.reply }])
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gemini is unavailable, using offline analysis."
      setConnectionState("fallback")
      setApiError(message)
      setMessages((current) => [
        ...current,
        {
          role: "bot",
          content: `${buildOfflineReply(prompt, metrics)}\n\nGemini fallback: ${message}`,
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col p-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter text-foreground">
              Finalytics <span className="text-blue-500">Advisor</span>
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  connectionState === "live"
                    ? "bg-emerald-500 animate-pulse"
                    : connectionState === "checking"
                    ? "bg-blue-500 animate-pulse"
                    : "bg-amber-500"
                }`}
              ></span>
              <p className="text-[10px] font-bold app-muted uppercase tracking-widest">
                {connectionState === "live"
                  ? "Gemini Live"
                  : connectionState === "checking"
                  ? "Checking API"
                  : "Offline Fallback"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {apiError && (
        <div className="mb-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs font-medium text-amber-700 dark:text-amber-200">
          {apiError}
        </div>
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-6 mb-6 pr-4 custom-scrollbar">
        {messages.map((message, index) => (
          <div key={index} className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                message.role === "bot"
                  ? "bg-blue-600/10 border-blue-500/30 text-blue-400"
                  : "bg-card border-border app-muted"
              }`}
            >
              {message.role === "bot" ? <Zap size={18} /> : <User size={18} />}
            </div>

            <div
              className={`max-w-[75%] p-4 rounded-2xl border ${
                message.role === "bot"
                  ? "app-panel backdrop-blur-md border text-card-foreground"
                  : "bg-blue-600 text-white border-blue-400"
              }`}
            >
              <p className="text-sm font-medium leading-relaxed">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-4 animate-pulse">
            <div className="h-10 w-10 rounded-xl bg-blue-900/30 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Bot size={18} className="animate-spin" />
            </div>
            <div className="p-4 app-panel rounded-2xl app-muted text-xs italic">
              Finalytics is analyzing fiscal nodes...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className={`app-panel-strong backdrop-blur-xl border rounded-3xl p-2 flex items-center gap-2 transition-all ${isTyping ? "opacity-50" : "focus-within:border-blue-500/50"}`}>
          <div className="pl-4 app-muted">
            <MessageSquareQuote size={20} />
          </div>
          <input
            value={query}
            disabled={isTyping}
            onChange={(event) => setQuery(event.target.value)}
            className="bg-transparent border-none focus:outline-none focus:ring-0 text-foreground placeholder:text-slate-500 w-full py-3 text-sm font-medium"
            placeholder={isTyping ? "Processing..." : "Ask about revenue, profit, runway, or expense pressure..."}
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
