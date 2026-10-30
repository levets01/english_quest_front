import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { Card, SectionHeader } from "../components";
import "../components/ui.css";
import "./pages.css";

export function NotFound() {
  return (
    <div className="page-auth container section" style={{ paddingTop: 60, paddingBottom: 60 }}>
      <Card padded={true} className="auth-card auth-card-narrow">
        <div className="auth-header">
          <div className="auth-brand">
            <span className="brand-icon">e.</span>
            <span>english<span className="brand-highlight">quest</span></span>
          </div>
          <SectionHeader
            kicker="Página no encontrada"
            title="Esta página no existe"
            description="La ruta que buscas no está disponible. Vuelve al inicio o elige una sección del menú."
            className="auth-section-header"
          />
        </div>
        <div className="auth-footer" style={{ textAlign: "center", marginTop: 20 }}>
          <BookOpen size={48} strokeWidth={2} className="notfound-icon" aria-hidden="true" />
          <p style={{ color: "#758078", margin: "0 0 16px", fontSize: 14 }}><strong>404</strong> — Página no encontrada</p>
          <Link to="/" className="btn btn-primary btn-full">
            Volver al inicio <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </Card>
    </div>
  );
}
