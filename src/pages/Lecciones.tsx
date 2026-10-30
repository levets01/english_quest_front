import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Card, SectionHeader } from "../components";
import { LESSONS_BY_LEVEL } from "../data/lessons";
import { getLessonStatus } from "../hooks/useProgress";
import "../components/ui.css";
import "./pages.css";

export function Lecciones() {
  return (
    <div className="page-lecciones container section">
      <SectionHeader
        kicker="Mis lecciones"
        title="Todas tus lecciones"
        description="Organizadas por nivel y unidad. Completa cada lección para avanzar en tu camino."
      />

      <div className="levels-list">
        {Object.entries(LESSONS_BY_LEVEL).map(([levelId, lessons]) => {
          const completed = lessons.filter((l) => getLessonStatus(l.id) === "completada").length;
          return (
            <section key={levelId} className="level-section">
              <div className="level-section-header">
                <h3>Nivel {levelId}</h3>
                <span className="level-progress-text">{completed} de {lessons.length}</span>
              </div>
              <div className="lesson-grid">
                {lessons.map((lesson) => {
                  const status = getLessonStatus(lesson.id);
                  return (
                    <Card
                      key={lesson.id}
                      padded={false}
                      className={`lesson-card status-${status}`}
                    >
                      <Link to={`/lecciones/${lesson.id}`} className="lesson-link">
                        <div className="lesson-card-body">
                          <div className="lesson-card-top">
                            <span className="lesson-number">{lesson.order}</span>
                            <span className={`status-chip status-${status}`}>
                              {status === "completada" ? "Completada" : status === "disponible" ? "Disponible" : "Bloqueada"}
                            </span>
                          </div>
                          <div className="lesson-card-meta">
                            <Clock size={13} strokeWidth={2} className="meta-icon" aria-hidden="true" />
                            <span className="meta-text">{lesson.duration}</span>
                          </div>
                          <h4 className="lesson-card-title">{lesson.title}</h4>
                          <p className="lesson-card-desc">{lesson.description}</p>
                          <div className="lesson-card-unit">
                            <BookOpen size={13} strokeWidth={2} className="meta-icon" aria-hidden="true" />
                            <span className="meta-text">{lesson.unitTitle}</span>
                          </div>
                        </div>
                        <ChevronRight size={16} strokeWidth={2} className="lesson-arrow" aria-hidden="true" />
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
