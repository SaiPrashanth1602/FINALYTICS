export function Card({
  className = "",
  title,
  description,
  children,
  headerAction,
  colSpan = "",
  rowSpan = "",
}) {
  return (
    <div
      className={`
        ${colSpan} ${rowSpan}
        relative overflow-hidden rounded-2xl border app-panel backdrop-blur-md
        transition-all duration-300 ease-out
        hover:shadow-xl hover:shadow-blue-500/10
        group
        ${className}
      `}
    >
      {/* Subtle Glow Effect on Hover */}
      <div className="pointer-events-none absolute -inset-px bg-gradient-to-br from-blue-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 h-full flex flex-col">
        {(title || headerAction) && (
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && (
                <h3 className="text-lg font-bold tracking-tight text-card-foreground">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs app-muted mt-0.5">{description}</p>
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
