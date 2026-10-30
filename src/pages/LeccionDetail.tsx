import { useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
} from "lucide-react";
import { Card, Button, ProgressBar, SectionHeader } from "../components";
import { ExercisePlayer } from "../components/exercises";
import { LESSON_BY_ID } from "../data/lessons";
import { LESSON_EXERCISES } from "../data/exercises";
import { storageService } from "../services/storageService";
import "../components/ui.css";
import "./pages.css";

export function LeccionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const lesson = LESSON_BY_ID[id ?? ""];

  const exercises = lesson ? (LESSON_EXERCISES[lesson.id] ?? []) : [];
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [showingFeedback, setShowingFeedback] = useState(false);

  const total = exercises.length;
  const current = exercises[currentExIndex];
  const isCompleted = storageService.isLessonCompleted(lesson?.id ?? "");

  const handleExerciseResult = useCallback((correct: boolean) => {
    setScores((prev) => ({ ...prev, [current?.id ?? ""]: correct }));
    storageService.markExerciseCompleted(current?.id ?? "");
    setShowingFeedback(true);
  }, [current]);

  const handleContinue = () => {
    setShowingFeedback(false);
    if (currentExIndex + 1 >= total) {
      storageService.markLessonCompleted(lesson?.id ?? "");
      setFinished(true);
    } else {
      setCurrentExIndex((i) => i + 1);
    }
  };

  if (!lesson) {
    return (
      <div className="container section">
        <SectionHeader kicker="Lección" title="Lección no encontrada" />
        <p>La lección solicitada no existe.</p>
        <Link to="/lecciones" className="btn btn-primary">
          Volver a lecciones
        </Link>
      </div>
    );
  }

  const correctCount = Object.values(scores).filter(Boolean).length;
  const progressPct = total > 0 ? Math.round((currentExIndex / total) * 100) : 0;

  if (finished) {
    return (
      <div className="page-leccion container section">
        <SectionHeader
          kicker="Lección completada"
          title="¡Bien hecho!"
          description="Has terminado esta lección. Sigue avanzando para completar el nivel."
        />
        <Card padded={true} className="lesson-summary">
          <div className="summary-result">
            <CheckCircle2 size={40} strokeWidth={2} className="summary-icon" aria-hidden="true" />
            <div>
              <div className="summary-title">Lección terminada</div>
              <div className="summary-score">
                {correctCount} de {total} ejercicios correctos
              </div>
            </div>
          </div>
          <ProgressBar value={total > 0 ? (correctCount / total) * 100 : 0} label="Aprovechamiento" />
          <div className="summary-actions" style={{ display: "flex", gap: 10, flexDirection: "column" }}>
            <Link to="/lecciones" className="btn btn-primary btn-full">
              Ver todas las lecciones <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
            <Button variant="outline" full={true} onClick={() => navigate(-1)}>
              Repetir lección
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-leccion container section">
      <nav className="lesson-breadcrumbs" style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#758078", fontWeight: 700 }}>
        <Link to="/lecciones" style={{ color: "#479267" }}>Lecciones</Link>
        <span style={{ color: "#c9d2ca" }}>/</span>
        <span>{lesson.title}</span>
      </nav>
      <SectionHeader
        kicker={`Nivel ${lesson.levelId} · ${lesson.unitTitle}`}
        title={lesson.title}
        description={lesson.description}
      />
      <div className="lesson-meta-bar">
        <span className="meta-pill">
          <Clock size={14} strokeWidth={2} aria-hidden="true" />
          {lesson.duration}
        </span>
        <span className="meta-pill level-pill">
          <BookOpen size={14} strokeWidth={2} aria-hidden="true" />
          Nivel {lesson.levelId}
        </span>
        <span className="meta-pill">
          {isCompleted ? (
            <>
              <CheckCircle2 size={14} strokeWidth={2} className="meta-check" aria-hidden="true" />
              Completada
            </>
          ) : (
            "Disponible"
          )}
        </span>
      </div>

      <div className="lesson-exercises">
        <div className="exercise-nav">
          <span className="exercise-counter">
            Ejercicio {currentExIndex + 1} de {total}
          </span>
          <ProgressBar value={progressPct} label="" />
        </div>

        {current && (
          <ExercisePlayer
            exercise={current}
            onComplete={handleExerciseResult}
          />
        )}

        {!showingFeedback && current && (
          <div className="exercise-controls">
            <Button variant="outline" onClick={() => setCurrentExIndex((i) => Math.max(0, i - 1))} disabled={currentExIndex === 0}>
              <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
              Anterior
            </Button>
            <Button variant="primary" onClick={handleContinue}>
              {currentExIndex + 1 >= total ? "Finalizar lección" : "Siguiente ejercicio"}
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
