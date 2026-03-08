import { type JSX } from "react";

interface CardProps {
  className?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  headerAction?: React.ReactNode;
  // Bento-specific props
  colSpan?: string; // e.g., "md:col-span-4"
  rowSpan?: string; // e.g., "md:row-span-2"
}

export function Card({
  className = "",
  title,
  description,
  children,
  headerAction,
  colSpan = "col-span-12",
  rowSpan = "row-span-1",
}: CardProps): JSX.Element {
  return (
    <div
      className={`
        ${colSpan} ${rowSpan}
        relative overflow-hidden rounded-3xl border border-white/10
        bg-slate-900/40 backdrop-blur-md
        transition-all duration-300 ease-out
        hover:bg-slate-900/60 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10
        group
        ${className}
      `}
    >
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 h-full flex flex-col">
        {(title || headerAction) && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && (
                <h3 className="text-lg font-bold tracking-tight text-slate-100">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-slate-400 mt-0.5">{description}</p>
              )}
            </div>
            {headerAction && <div className="z-10">{headerAction}</div>}
          </div>
        )}

        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
}