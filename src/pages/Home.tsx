import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowDown,
  BookOpen,
  CheckCircle2,
  Clock,
  GraduationCap,
  Smile,
  Sprout,
  Target,
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "../components/ui.css";
import "./pages.css";

const lessons: {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  duration: string;
}[] = [
  { number: "01", title: "Hello, world!", description: "Aprende a saludar en inglés.", icon: Sprout, color: "peach", duration: "5 min" },
  { number: "02", title: "My first words", description: "Descubre tus primeras palabras.", icon: BookOpen, color: "mint", duration: "7 min" },
  { number: "03", title: "Meet me!", description: "Aprende a presentarte.", icon: GraduationCap, color: "lavender", duration: "8 min" },
];

export function Home() {
  const [started, setStarted] = useState(false);
  const navigate = useNavigate();

  function startLearning() {
    setStarted(true);
    navigate("/lecciones");
  }

  return (
    <div className="page-home">
      <section className="hero" id="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot" />
            TU AVENTURA COMIENZA AQUÍ
          </div>

          <h1>
            El inglés no tiene que ser difícil.
            <span>Vamos a aprenderlo juntos.</span>
          </h1>

          <p className="hero-description">
            Aprende inglés desde cero, a tu ritmo y de una forma
            que realmente disfrutes. Un pequeño paso cada día
            puede llevarte muy lejos.
          </p>

          <div className="hero-actions">
            <button className="primary-button" onClick={startLearning}>
              {started ? "Continuar explorando" : "Comenzar mi aventura"}
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <a className="secondary-link" href="#how-it-works">
              Descubre cómo funciona <ArrowDown size={14} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>

          <div className="hero-note">
            <span className="note-icon"><Sprout size={16} strokeWidth={2} aria-hidden="true" /></span>
            No necesitas saber inglés para comenzar.
          </div>
        </div>

        <div className="hero-art" aria-label="Composición editorial de aprendizaje">
          <span className="art-shape art-shape-circle" aria-hidden="true" />
          <span className="art-shape art-shape-square" aria-hidden="true" />

          <article className="art-panel">
            <div className="art-panel-kicker">
              <BookOpen size={16} strokeWidth={2} aria-hidden="true" />
              <span>LECCIÓN DE HOY</span>
            </div>
            <strong className="art-panel-title">"Hello, world!"</strong>
            <p className="art-panel-text">Aprende a saludar en inglés con confianza.</p>
            <div className="art-panel-meta">
              <Clock size={14} strokeWidth={2} aria-hidden="true" />
              <span>5 min</span>
              <span className="art-panel-badge">PRINCIPIANTE</span>
            </div>
          </article>

          <div className="floating-card card-top">
            <span className="floating-icon floating-icon-sprout">
              <Sprout size={18} strokeWidth={2} aria-hidden="true" />
            </span>
            <span>
              <strong>¡Tú puedes!</strong>
              <small>Cada palabra cuenta</small>
            </span>
          </div>

          <div className="speech-bubble">
            <Volume2 size={18} strokeWidth={2} className="speech-icon" aria-hidden="true" />
            <span>Hello!</span>
            <small>¡Hola!</small>
          </div>

          <div className="floating-card card-bottom">
            <span className="floating-icon floating-icon-check">
              <CheckCircle2 size={18} strokeWidth={2} aria-hidden="true" />
            </span>
            <span>
              <strong>Tu primera misión</strong>
              <small>Aprender a saludar</small>
            </span>
          </div>
        </div>
      </section>

      <section className="benefits" id="how-it-works">
        <div className="benefit">
          <span className="benefit-icon mint-bg"><Sprout size={20} strokeWidth={2} aria-hidden="true" /></span>
          <div>
            <strong>Empieza desde cero</strong>
            <p>Sin conocimientos previos.</p>
          </div>
        </div>
        <div className="benefit">
          <span className="benefit-icon peach-bg"><Target size={20} strokeWidth={2} aria-hidden="true" /></span>
          <div>
            <strong>Avanza a tu ritmo</strong>
            <p>Cada paso tiene un propósito.</p>
          </div>
        </div>
        <div className="benefit">
          <span className="benefit-icon lavender-bg"><Smile size={20} strokeWidth={2} aria-hidden="true" /></span>
          <div>
            <strong>Aprende disfrutando</strong>
            <p>Practica sin miedo a equivocarte.</p>
          </div>
        </div>
      </section>

      <section className="learning-section" id="lessons">
        <div className="section-heading">
          <div>
            <span className="section-kicker">TU PRIMER PASO</span>
            <h2>Todo comienza con una palabra.</h2>
            <p>Pequeñas lecciones, grandes avances.</p>
          </div>
          <span className="level-pill">NIVEL 0 · PRINCIPIANTE</span>
        </div>
        <div className="lesson-grid">
          {lessons.map((lesson) => {
            const LessonIcon = lesson.icon;
            return (
              <article className="lesson-card" key={lesson.number}>
                <div className={`lesson-art ${lesson.color}`}>
                  <span className="lesson-number">{lesson.number}</span>
                  <LessonIcon className="lesson-icon" size={28} strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="lesson-content">
                  <div className="lesson-duration">
                    <Clock size={12} strokeWidth={2} aria-hidden="true" /> {lesson.duration}
                  </div>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  <button
                    className="lesson-button"
                    onClick={() => navigate("/lecciones")}
                  >
                    Explorar lección <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="levels-section" id="levels">
        <div>
          <span className="section-kicker">TU CAMINO, TU PROGRESO</span>
          <h2>Un nivel a la vez.</h2>
          <p>
            No tienes que aprenderlo todo hoy. Solo necesitas
            dar el primer paso y seguir avanzando.
          </p>
          <Link to="/niveles" className="btn btn-outline" style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 6 }}>
            Ver todos los niveles <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
        <div className="level-track">
          <div className="level-step current">
            <span><Sprout size={20} strokeWidth={2} aria-hidden="true" /></span>
            <strong>Nivel 0</strong>
            <small>Primeras palabras</small>
          </div>
          <div className="track-line" />
          <div className="level-step">
            <span><BookOpen size={20} strokeWidth={2} aria-hidden="true" /></span>
            <strong>A1</strong>
            <small>Principiante</small>
          </div>
          <div className="track-line" />
          <div className="level-step">
            <span><GraduationCap size={20} strokeWidth={2} aria-hidden="true" /></span>
            <strong>A2</strong>
            <small>Básico</small>
          </div>
          <div className="track-line" />
          <div className="level-step">
            <span><Target size={20} strokeWidth={2} aria-hidden="true" /></span>
            <strong>B1+</strong>
            <small>Seguiremos creciendo</small>
          </div>
        </div>
      </section>

    </div>
  );
}
