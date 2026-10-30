import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  BookOpen,
  Activity,
  Target,
  TrendingUp,
  User,
  ChevronRight,
} from "lucide-react";
import { Card, Button, ProgressBar, SectionHeader } from "../components";
import { useProgress } from "../hooks/useProgress";
import { LESSONS } from "../data/lessons";
import "../components/ui.css";
import "./pages.css";

export function Dashboard() {
  const { progress, percentage, completedLessonsCount, totalLessons } = useProgress();

  const streak = progress.streak;
  const wordsLearned = progress.wordsLearned;
  const dailyGoal = progress.dailyGoal;
  const dailyCompleted = progress.dailyCompleted;
  const lastActivity = progress.lastActivity;
  const levelTest = progress.levelTestResult;

  const [weekView, setWeekView] = useState<"days" | "lessons">("days");

  const weekly = progress.weeklyActivity;
  const todayKey = new Date().toISOString().split("T")[0];
  const last7Days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push(d.toISOString().split("T")[0]);
  }

  const nextLesson = LESSONS.find((l) => !progress.completedLessons[l.id]);

  const maxDay = Math.max(1, ...(Object.values(weekly) as number[]));

  return (
    <div className="page-dashboard container section">
      <div className="dashboard-header">
        <div>
          <SectionHeader
            kicker="Mi progreso"
            title={`Hola, ${progress.userId === "user_1" ? "Estudiante" : ""}`}
            description="Aquí tienes tu resumen de aprendizaje. Sigue así, paso a paso."
          />
        </div>
        <div className="dashboard-avatar">
          <div className="avatar">E.</div>
        </div>
      </div>

      <div className="dashboard-stats">
        <Card padded={true} className="stat-card">
          <div className="stat">
            <Activity size={18} strokeWidth={2} className="stat-icon" aria-hidden="true" />
            <div>
              <div className="stat-label">Racha actual</div>
              <div className="stat-value">{streak} {streak === 1 ? "día" : "días"}</div>
            </div>
          </div>
        </Card>
        <Card padded={true} className="stat-card">
          <div className="stat">
            <BookOpen size={18} strokeWidth={2} className="stat-icon" aria-hidden="true" />
            <div>
              <div className="stat-label">Palabras aprendidas</div>
              <div className="stat-value">{wordsLearned}</div>
            </div>
          </div>
        </Card>
        <Card padded={true} className="stat-card">
          <div className="stat">
            <Target size={18} strokeWidth={2} className="stat-icon" aria-hidden="true" />
            <div>
              <div className="stat-label">Nivel actual</div>
              <div className="stat-value">{levelTest || "—"}</div>
            </div>
          </div>
        </Card>
        <Card padded={true} className="stat-card">
          <div className="stat">
            <Clock size={18} strokeWidth={2} className="stat-icon" aria-hidden="true" />
            <div>
              <div className="stat-label">Objetivo diario</div>
              <div className="stat-value">{dailyCompleted}/{dailyGoal}</div>
            </div>
          </div>
        </Card>
      </div>

      <div className="dashboard-progress">
        <Card padded={true} className="progress-card">
          <div className="progress-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
            <div>
              <div className="progress-label">Progreso general</div>
              <div className="progress-value">{percentage}%</div>
            </div>
            <div className="progress-count">
              {completedLessonsCount} de {totalLessons} lecciones
            </div>
          </div>
          <ProgressBar value={percentage} label="" />
        </Card>
      </div>

      <div className="dashboard-weekly">
        <Card padded={true} className="weekly-card">
          <div className="weekly-header">
            <div>
              <TrendingUp size={18} strokeWidth={2} className="stat-icon" aria-hidden="true" />
              <div style={{ marginLeft: 8, fontWeight: 800, color: "#24352e" }}>Actividad semanal</div>
            </div>
            <div className="weekly-toggle" style={{ display: "flex", gap: 6 }}>
              <Button variant={weekView === "days" ? "primary" : "outline"} onClick={() => setWeekView("days")}>Días</Button>
              <Button variant={weekView === "lessons" ? "primary" : "outline"} onClick={() => setWeekView("lessons")}>Lecciones</Button>
            </div>
          </div>
          <div className="weekly-chart">
            {last7Days.map((day) => {
              const value = weekly[day] || 0;
              const label = day === todayKey ? "Hoy" : new Date(day).toLocaleDateString("es-ES", { weekday: "short" });
              const h = maxDay > 0 ? Math.max(20, (value / maxDay) * 100) : 0;
              return (
                <div key={day} className="weekly-col">
                  <div
                    className={`weekly-bar ${value > 0 ? "active" : ""}`}
                    style={{ height: `${h}%`, background: value > 0 ? "#276749" : "#e7ebe3" }}
                  />
                  <span className="weekly-label">{label}</span>
                  <span className="weekly-value">{value}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="dashboard-next">
        <Card padded={true} className="next-card">
          <div className="next-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <User size={18} strokeWidth={2} className="stat-icon" aria-hidden="true" />
              <div style={{ marginLeft: 8, fontWeight: 800, color: "#24352e" }}>Próxima lección recomendada</div>
            </div>
            <div style={{ fontSize: 11, color: "#758078" }}>
              {lastActivity ? `Última actividad: ${new Date(lastActivity).toLocaleDateString("es-ES")}` : "Sin actividad reciente"}
            </div>
          </div>
          {nextLesson ? (
            <div className="next-lesson">
              <div className="next-info">
                <div className="next-title">{nextLesson.title}</div>
                <div className="next-sub">{nextLesson.unitTitle} · Nivel {nextLesson.levelId}</div>
              </div>
              <Link to={`/lecciones/${nextLesson.id}`} className="btn btn-primary">
                Continuar <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="next-empty">
              <p style={{ color: "#758078", margin: 0 }}>¡Has completado todas las lecciones disponibles! ¡Felicidades!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
