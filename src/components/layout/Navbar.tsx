import "../ui.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Target,
  User,
} from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Inicio", icon: BookOpen },
  { to: "/niveles", label: "Niveles", icon: GraduationCap },
  { to: "/prueba-nivel", label: "Prueba de nivel", icon: Target },
  { to: "/lecciones", label: "Lecciones", icon: BookOpen },
  { to: "/practica", label: "Práctica", icon: Target },
  { to: "/dashboard", label: "Mi progreso", icon: User },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => location.pathname === to;

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="EnglishQuest inicio">
          <span className="brand-icon">e.</span>
          <span>english<span className="brand-highlight">quest</span></span>
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((m) => !m)}
          aria-label="Abrir o cerrar menú"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} strokeWidth={2} aria-hidden="true" /> : <Menu size={20} strokeWidth={2} aria-hidden="true" />}
        </button>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${isActive(link.to) ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={16} strokeWidth={2} aria-hidden="true" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <Link to="/login" className="nav-cta">
            Iniciar sesión <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
