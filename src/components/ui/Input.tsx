import "../ui.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, className = "", ...props }: InputProps) {
  return (
    <div style={{ width: "100%" }}>
      {label && <label className="field-label">{label}</label>}
      <input
        className={`input ${error ? "input-error" : ""} ${className}`}
        {...props}
      />
      {error && <span className="field-error">{error}</span>}
      {hint && !error && <span className="field-hint">{hint}</span>}
    </div>
  );
}
