import type { InputHTMLAttributes, ReactNode } from "react";

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ExampleCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "w-full rounded-2xl border border-dashed p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ExampleTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-2xl font-medium tracking-tight text-foreground">{children}</h3>;
}

export function ExampleDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>;
}

export function ExampleInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        "h-10 w-full rounded-xl border border-border/20 bg-secondary/30 px-3 py-2 text-sm text-foreground placeholder:text-foreground/55 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20",
        props.className,
      )}
    />
  );
}

export function ExampleChip({
  children,
  active,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        active
          ? "border-foreground/25 bg-foreground/10 text-foreground"
          : "border-border/40 bg-muted/30 text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

export function ExampleSeparator() {
  return <div className="h-px w-full bg-border/40" />;
}

export function ExampleProgress({ value }: { value: number }) {
  const width = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-muted/40">
      <div className="h-full rounded-full bg-foreground/85" style={{ width: `${width}%` }} />
    </div>
  );
}

export function ExampleToggle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={cx(
        "relative inline-flex h-6 w-10 shrink-0 rounded-full border transition-colors",
        enabled ? "border-transparent bg-foreground/90" : "border-border/40 bg-muted/40",
      )}
      aria-hidden="true"
    >
      <span
        className={cx(
          "absolute top-0.5 h-5 w-5 rounded-full bg-background transition-transform",
          enabled ? "translate-x-[19px]" : "translate-x-[1px]",
        )}
      />
    </span>
  );
}
