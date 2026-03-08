import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function FormCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "w-full rounded-2xl border border-border bg-transparent p-6 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-1 text-xl font-medium tracking-tight">{title}</legend>
      {description ? <p className="-mt-1 text-sm text-muted-foreground">{description}</p> : null}
      {children}
    </fieldset>
  );
}

export function FormDivider() {
  return <div className="h-px w-full bg-border/50" />;
}

export function FormField({
  htmlFor,
  label,
  helper,
  children,
  className,
}: {
  htmlFor: string;
  label: string;
  helper?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex w-full flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </label>
      {children}
      {helper ? <p className="text-sm text-muted-foreground">{helper}</p> : null}
    </div>
  );
}

export function FormInput(props: InputHTMLAttributes<HTMLInputElement>) {
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

export function FormSelect(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cx(
        "h-10 w-full rounded-xl border border-border/20 bg-secondary/30 px-3 py-2 text-sm text-foreground focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20",
        props.className,
      )}
    />
  );
}

export function FormCheckbox({
  id,
  label,
  className,
  ...props
}: {
  id: string;
  label: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id">) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm text-foreground">
      <input
        id={id}
        type="checkbox"
        {...props}
        className={cx("h-4 w-4 rounded border-border/30 accent-foreground", className)}
      />
      <span>{label}</span>
    </label>
  );
}

export function FormTextarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cx(
        "min-h-24 w-full rounded-xl border border-border/20 bg-secondary/30 px-3 py-2 text-sm text-foreground placeholder:text-foreground/55 focus:border-foreground/40 focus:outline-none focus:ring-1 focus:ring-foreground/20",
        props.className,
      )}
    />
  );
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}

export function FormButton({
  children,
  variant = "default",
  ...props
}: {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const variantClass =
    variant === "outline"
      ? "border-border bg-background text-foreground hover:bg-muted"
      : variant === "ghost"
        ? "border-transparent bg-transparent text-foreground/80 hover:bg-muted"
        : "border-transparent bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <button
      {...props}
      className={cx(
        "inline-flex h-9 items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-foreground/20",
        variantClass,
        props.className,
      )}
    >
      {children}
    </button>
  );
}
