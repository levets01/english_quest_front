import "../ui.css";

export interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`section-header ${className}`}>
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
