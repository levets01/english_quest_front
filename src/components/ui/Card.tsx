import "../ui.css";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}

export function Card({ children, className = "", padded = true }: CardProps) {
  return (
    <div className={`card ${padded ? "card-body" : ""} ${className}`}>
      {children}
    </div>
  );
}
