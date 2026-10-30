import { useParams, Link } from "react-router-dom";
import { ChevronRight, ArrowRight, BookOpen, Monitor, CheckCircle2, GraduationCap } from "lucide-react";
import { Card, SectionHeader } from "../components";
import { LEVEL_BY_ID } from "../data/levels";
import type { LevelId } from "../types";
import "../components/ui.css";
import "./pages.css";

export function Niveles() {
  return (
    <div className="page-niveles container section">
      <SectionHeader
        kicker="Tu camino, tu progreso"
        title="Elige tu nivel de inglés"
        description="Cada nivel tiene objetivos claros, temas prácticos y unidades diseñadas para avanzar paso a paso."
      />
      <div className="levels-grid">
        {Object.values(LEVEL_BY_ID).map((level) => (
          <Card key={level.id} padded={false}>
            <div className="level-card">
              <div className="level-card-header">
                <div className="level-badge" style={{ background: level.color }}>{level.id}</div>
                <div className="level-card-info">
                  <h3>{level.title}</h3>
                  <p className="level-subtitle">{level.subtitle}</p>
                </div>
                <ChevronRight size={18} strokeWidth={2} className="level-arrow" aria-hidden="true" />
              </div>
              <div className="level-card-body">
                <p className="level-description">{level.description}</p>
                <div className="level-meta">
                  <span className="meta-item">
                    <BookOpen size={14} strokeWidth={2} aria-hidden="true" />
                    {level.units} unidades
                  </span>
                  <span className="meta-item">
                    <Monitor size={14} strokeWidth={2} aria-hidden="true" />
                    {level.topics.length} temas
                  </span>
                </div>
                <div className="level-topics">
                  {level.topics.slice(0, 4).map((t) => (
                    <span key={t} className="topic-chip">{t}</span>
                  ))}
                </div>
              </div>
              <div className="level-card-footer">
                <Link to={`/niveles/${level.id}`} className="btn btn-outline btn-full">
                  Comenzar nivel {level.id} <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="levels-note">
        <Monitor size={16} strokeWidth={2} aria-hidden="true" />
        <span>
          Estos niveles son una guía de aprendizaje. EnglishQuest no emite certificaciones
          oficiales internacionales al completar la plataforma.
        </span>
      </div>
    </div>
  );
}

export function NivelDetail() {
  const { level } = useParams<{ level: LevelId }>();
  const data = Object.values(LEVEL_BY_ID).find((l) => l.id === (level || "A1"));

  if (!data) {
    return (
      <div className="container section">
        <SectionHeader kicker="Nivel" title="Nivel no encontrado" />
        <p>El nivel solicitado no existe.</p>
        <Link to="/niveles" className="btn btn-primary">
          Volver a niveles
        </Link>
      </div>
    );
  }

  return (
    <div className="page-nivel container section">
      <SectionHeader
        kicker={`Nivel ${data.id}`}
        title={data.title}
        description={data.description}
      />
      <div className="nivel-grid">
        <div className="nivel-col objetivo">
          <h4>Objetivos de aprendizaje</h4>
          <ul className="check-list">
            {data.objectives.map((obj: string, i: number) => (
              <li key={i}>
                <CheckCircle2 size={16} strokeWidth={2} className="check-icon" aria-hidden="true" />
                {obj}
              </li>
            ))}
          </ul>
        </div>
        <div className="nivel-col temas">
          <h4>Temas principales</h4>
          <div className="temas-grid">
            {data.topics.map((t: string) => (
              <Card key={t} padded={true}>
                <GraduationCap size={16} strokeWidth={2} className="tema-icon" aria-hidden="true" />
                <span className="tema-text">{t}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="nivel-unidades">
        <h4>Unidades de demostración</h4>
        <p>{data.units} unidades disponibles para explorar en este nivel.</p>
        <div className="nivel-cta">
          <Link to="/lecciones" className="btn btn-primary btn-full">
            Ir a las lecciones <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="nivel-note">
        <p>Este nivel es parte del recorrido educativo de EnglishQuest. Al completarlo no se otorga una certificación oficial internacional.</p>
      </div>
    </div>
  );
}
