import { useEffect, useState } from "react";

export function ThemeToggle() {
  // Initialize state based on local storage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || 
             (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return true; // Default to dark for your dashboard
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <label className="inline-flex cursor-pointer items-center gap-3 group">
      <span className="text-sm font-medium app-muted group-hover:text-foreground transition-colors">
        {isDark ? "Dark Mode" : "Light Mode"}
      </span>
      <div className="relative">
        <input 
          type="checkbox" 
          className="peer sr-only" 
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
        />
        {/* Toggle Track */}
        <div className="h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-800 border border-border transition-colors 
          after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full 
          after:bg-white dark:after:bg-slate-400 after:shadow-sm after:transition-all 
          peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:bg-white">
        </div>
      </div>
    </label>
  );
}
