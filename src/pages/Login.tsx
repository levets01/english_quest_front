import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Card, Button, Input, SectionHeader } from "../components";
import { storageService } from "../services/storageService";
import "../components/ui.css";
import "./pages.css";

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = "Ingresa tu correo electrónico.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo no válido.";
    if (!form.password) e.password = "Ingresa tu contraseña.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const res = storageService.signIn(form.email.trim(), form.password);
    if (res.ok) {
      navigate("/dashboard");
    } else {
      setStatus({ kind: "error", message: res.error || "Correo o contraseña incorrectos." });
    }
  };

  return (
    <div className="page-auth container section" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <div className="auth-wrapper">
        <Card padded={true} className="auth-card">
          <div className="auth-header">
            <div className="auth-brand">
              <span className="brand-icon">e.</span>
              <span>english<span className="brand-highlight">quest</span></span>
            </div>
            <SectionHeader kicker="Bienvenido de vuelta" title="Inicia sesión" description="Accede a tu cuenta y continúa tu aprendizaje." className="auth-section-header" />
          </div>
          {status && (
            <div className={`auth-status ${status.kind}`}>
              <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />
              <span>{status.message}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Correo electrónico"
              placeholder="juan@correo.com"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <Input
              label="Contraseña"
              placeholder="••••••••"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
            <Button variant="primary" full={true} type="submit">
              Iniciar sesión
            </Button>
          </form>
          <div className="auth-footer">
            ¿Olvidaste tu contraseña?{" "}
            <Link to="/recuperar-password" style={{ color: "#276749", fontWeight: 700 }}>
              Recuperarla
            </Link>
          </div>
          <div className="auth-divider">
            <span>o</span>
          </div>
          <div className="auth-footer">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" style={{ color: "#276749", fontWeight: 700 }}>
              Regístrate gratis
            </Link>
          </div>
        </Card>
      </div>
      <div className="auth-footer-bottom">
        <Link to="/" className="btn btn-text">Volver al inicio</Link>
      </div>
    </div>
  );
}
