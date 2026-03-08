import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PieChart, MessageSquare, Settings, ShieldAlert, LogOut } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Terminal", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Analytics", path: "/analytics", icon: <PieChart size={18} /> },
    { name: "AI Advisor", path: "/advisor", icon: <MessageSquare size={18} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-950/50 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 sticky top-0">
      {/* 🛡️ BRAND LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <ShieldAlert size={18} className="text-white" />
        </div>
        <span className="text-xl font-black italic tracking-tighter text-white uppercase">
          Fin<span className="text-blue-500">alytics</span>
        </span>
      </div>

      {/* 🧭 NAVIGATION */}
      <nav className="space-y-1.5 flex-grow">
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 px-2">
          Systems
        </p>
        {menuItems.map((item) => {
          const isActive = location.hash === `#${item.path}` || (item.path === "/" && location.hash === "");
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group overflow-hidden ${
                isActive 
                  ? "bg-blue-600/10 text-blue-400" 
                  : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
              }`}
            >
              {/* Active Indicator Glow */}
              {isActive && (
                <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
              )}
              
              <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-blue-400" : "text-slate-500"}`}>
                {item.icon}
              </span>
              <span className="text-sm font-bold tracking-tight uppercase">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* 👤 USER PROFILE SECTION */}
      <div className="mt-auto pt-6 border-t border-white/5">
         <div className="flex items-center gap-3 px-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
               <img 
                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sai" 
                 alt="User" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="flex flex-col">
               <span className="text-sm font-bold text-slate-200">Sai Prashanth</span>
               <span className="text-[10px] text-slate-500 font-mono tracking-tighter">ADMIN_LEVEL_01</span>
            </div>
         </div>

         <div className="space-y-1">
            <button className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-slate-200 hover:bg-white/5 rounded-xl w-full transition-all group">
              <Settings size={16} className="group-hover:rotate-45 transition-transform" />
              <span className="font-bold text-xs uppercase tracking-widest">Settings</span>
            </button>
            <button className="flex items-center gap-3 px-4 py-2.5 text-rose-500/70 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl w-full transition-all">
              <LogOut size={16} />
              <span className="font-bold text-xs uppercase tracking-widest">Disconnect</span>
            </button>
         </div>
      </div>
    </aside>
  );
}

export default Sidebar;