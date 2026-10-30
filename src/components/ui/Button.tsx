import "../ui.css";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "text";
  full?: boolean;
}

export function Button({
  children,
  variant = "primary",
  full = false,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "btn " +
    (variant === "primary"
      ? "btn-primary"
      : variant === "outline"
        ? "btn-outline"
        : "btn-text") +
    (full ? " btn-full" : "") +
    (className ? " " + className : "");

  return <button className={base} {...props}>{children}</button>;
}
