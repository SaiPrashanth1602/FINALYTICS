

export function Badge({
  children,
  variant = "stateless",
  className = "",
}) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";

  const variantClasses = {
    stateless: "bg-muted text-foreground/90 border border-border/10",
    stateful: "bg-emerald-600 text-white",
    outline: "border bg-transparent",
  };

  return (
    <span className={`${base} ${variantClasses[variant] || ""} ${className}`}>{children}</span>
  );
}

export default Badge;
