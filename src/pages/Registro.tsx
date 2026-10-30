import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, CheckCircle2 } from "lucide-react";import { Card, Button, Input, SectionHeader } from "../components";
import { storageService } from "../services/storageService";
import "../components/ui.css";
import "./pages.css";

export function Registro() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Ingresa tu nombre completo.";
    if (!form.email.trim()) e.email = "Ingresa tu correo electrónico.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo no válido.";
    if (!form.password) e.password = "Ingresa una contraseña.";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres.";
    if (form.password !== form.confirm) e.confirm = "Las contraseñas no coinciden.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const res = storageService.signUp(form.name.trim(), form.email.trim(), form.password);
    if (res.ok) {
      setStatus({ kind: "success", message: "Cuenta creada correctamente. Ya puedes iniciar sesión." });
      setForm({ name: "", email: "", password: "", confirm: "" });
      setErrors({});
    } else {
      setStatus({ kind: "error", message: res.error || "No se pudo crear la cuenta." });
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
            <SectionHeader kicker="Crear cuenta" title="Registro" description="Únete a EnglishQuest y comienza tu aprendizaje." className="auth-section-header" />
          </div>
          {status && (
            <div className={`auth-status ${status.kind}`}>
              {status.kind === "success" ? <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" /> : <AlertCircle size={16} strokeWidth={2} aria-hidden="true" />}
              <span>{status.message}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Nombre completo"
              placeholder="Juan Pérez"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              error={errors.name}
            />
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
              hint="Mínimo 6 caracteres"
            />
            <Input
              label="Confirmar contraseña"
              placeholder="••••••••"
              type="password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              error={errors.confirm}
            />
            <Button variant="primary" full={true} type="submit">
              Crear cuenta
            </Button>
          </form>
          <div className="auth-footer">
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: "#276749", fontWeight: 700 }}>Inicia sesión</Link>
          </div>
        </Card>
        <div className="auth-info">
          <h3>Aprende inglés desde cero</h3>
          <p>EnglishQuest te acompaña con lecciones interactivas, ejercicios prácticos y un seguimiento de tu progreso. Todo desde cero, a tu ritmo.</p>
        </div>
      </div>
      <div className="auth-footer-bottom">
        <Link to="/" className="btn btn-text">Volver al inicio</Link>
      </div>
    </div>
  );
}
