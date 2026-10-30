import "../ui.css";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="brand footer-brand" aria-label="EnglishQuest inicio">
          <span className="brand-icon">e.</span>
          <span>english<span className="brand-highlight">quest</span></span>
        </Link>

        <div className="footer-content">
          <p>
            Un pequeño paso hoy. Un mundo de posibilidades mañana.
          </p>
          <nav className="footer-nav">
            <Link to="/niveles">Niveles</Link>
            <Link to="/lecciones">Lecciones</Link>
            <Link to="/practica">Práctica</Link>
            <Link to="/dashboard">Mi progreso</Link>
          </nav>
        </div>

        <span className="footer-copy">
          © 2026 EnglishQuest · Proyecto educativo
        </span>
      </div>
    </footer>
  );
}
