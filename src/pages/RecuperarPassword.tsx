import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Card, Button, Input, SectionHeader } from "../components";
import { storageService } from "../services/storageService";
import "../components/ui.css";
import "./pages.css";

export function RecuperarPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Ingresa tu correo electrónico.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Correo no válido.");
      return;
    }
    const res = storageService.resetPassword(email.trim());
    if (res.ok) {
      setSent(true);
    } else {
      setError(res.error || "No se pudo procesar la solicitud.");
    }
  };

  return (
    <div className="page-auth container section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="auth-wrapper">
        <Card padded={true} className="auth-card auth-card-narrow">
          <div className="auth-header">
            <div className="auth-brand">
              <span className="brand-icon">e.</span>
              <span>english<span className="brand-highlight">quest</span></span>
            </div>
            <SectionHeader
              kicker="Recuperar contraseña"
              title="Restablecer acceso"
              description="Ingresa tu correo y te enviaremos instrucciones para crear una nueva contraseña."
              className="auth-section-header"
            />
          </div>
          {!sent ? (
            <>
              {error && (
                <div className="auth-status error">
                  <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
                  <span>{error}</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="auth-form">
                <Input
                  label="Correo electrónico"
                  placeholder="juan@correo.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                />
                <Button variant="primary" full={true} type="submit">
                  Enviar instrucciones
                </Button>
              </form>
            </>
          ) : (
            <>
              <div className="auth-status success">
                <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" />
                <span>Te hemos enviado las instrucciones a {email}.</span>
              </div>
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <Button variant="outline" full={true} onClick={() => navigate("/login")}>
                  Ir a iniciar sesión
                </Button>
              </div>
            </>
          )}
          <div className="auth-footer">
            ¿Recuerdas tu contraseña? <Link to="/login" style={{ color: "#276749", fontWeight: 700 }}>Inicia sesión</Link>
          </div>
        </Card>
      </div>
      <div className="auth-footer-bottom">
        <Link to="/" className="btn btn-text">Volver al inicio</Link>
      </div>
    </div>
  );
}
