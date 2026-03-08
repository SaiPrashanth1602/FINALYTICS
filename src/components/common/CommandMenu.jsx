import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search, BarChart3, Bot, AlertTriangle, FileDown } from "lucide-react"
import { exportReport } from "../../utils/exportReport"
export function CommandMenu() {

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    function handleKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }

    window.addEventListener("keydown", handleKey)

    return () => window.removeEventListener("keydown", handleKey)

  }, [])

  const commands = [

  {
    label: "Go to Dashboard",
    icon: <BarChart3 size={16} />,
    action: () => navigate("/")
  },

  {
    label: "Open AI Advisor",
    icon: <Bot size={16} />,
    action: () => navigate("/advisor")
  },

  {
    label: "View Alerts",
    icon: <AlertTriangle size={16} />,
    action: () => {
      document.getElementById("alerts")?.scrollIntoView({ behavior: "smooth" })
    }
  },

  {
    label: "Export Financial Report",
    icon: <FileDown size={16} />,
    action: () => exportReport()
  }

]

  if (!open) return null

  return (

    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-40 z-50">

      <div className="bg-slate-900 border border-slate-800 rounded-xl w-[500px] shadow-2xl">

        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 text-slate-400">
          <Search size={16}/>
          <span className="text-sm">Type a command...</span>
        </div>

        <div className="py-2">

          {commands.map((cmd,i)=>(
            
            <button
              key={i}
              onClick={()=>{
                cmd.action()
                setOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-800 text-sm text-slate-300 transition"
            >
              {cmd.icon}
              {cmd.label}
            </button>

          ))}

        </div>

      </div>

    </div>

  )
}