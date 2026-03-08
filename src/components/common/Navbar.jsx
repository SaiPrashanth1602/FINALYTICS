import { Download, Search, Bell, Cpu } from "lucide-react";
import { exportReport } from "../../utils/exportReport";

export default function Navbar() {
  const handleExport = (e) => {
    // 🛑 STOP the event from bubbling up to any hidden <Link> or <a> tags
    e.preventDefault();
    e.stopPropagation();
    
    console.log("Export triggered from Navbar");
    exportReport();
  };

  return (
    <nav className="h-20 border-b border-white/5 bg-slate-950/20 backdrop-blur-xl sticky top-0 z-40 px-8 flex items-center justify-between">
      
      {/* 🔍 SYSTEM SEARCH */}
      <div className="flex-grow max-w-md hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-slate-500 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full bg-white/5 border border-white/5 rounded-2xl py-2 pl-10 pr-3 text-xs font-bold text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:bg-white/10 transition-all uppercase tracking-widest"
            placeholder="Search Network Nodes..."
          />
        </div>
      </div>

      {/* 🛠️ GLOBAL ACTIONS */}
      <div className="flex items-center gap-6">
        
        {/* NETWORK STATUS */}
        <div className="hidden lg:flex items-center gap-3 pr-6 border-r border-white/10">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Last Sync</p>
            <p className="text-[10px] font-mono text-blue-400">0.042ms ago</p>
          </div>
          <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Cpu size={14} className="text-blue-400" />
          </div>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-950"></span>
        </button>

        {/* 📥 EXPORT BUTTON (CLEAN) */}
        <button 
          type="button" // Explicitly set type to avoid form submission behavior
          onClick={handleExport}
          className="group relative flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95 shadow-xl shadow-blue-500/20 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          <span>Export Audit</span>
        </button>
      </div>
    </nav>
  );
}