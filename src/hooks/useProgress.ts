import { storageService } from "../services/storageService";

export function useProgress() {
  const progress = storageService.getProgress();

  const completedLessonsCount = Object.values(
    progress.completedLessons
  ).filter(Boolean).length;

  const totalLessons = 23; // total de lecciones definidas en data/lessons.ts

  const percentage = totalLessons > 0
    ? Math.round((completedLessonsCount / totalLessons) * 100)
    : 0;

  return {
    progress,
    completedLessonsCount,
    totalLessons,
    percentage,
    storageService,
  };
}

export function getLessonStatus(lessonId: string): "completada" | "disponible" | "bloqueada" {
  const progress = storageService.getProgress();
  if (progress.completedLessons[lessonId]) return "completada";
  return "disponible";
}
