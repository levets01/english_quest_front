import type { User, UserProgress, LevelId } from "../types";

const STORAGE_KEYS = {
  user: "eq_user",
  progress: "eq_progress",
  settings: "eq_settings",
  levelTest: "eq_level_test",
} as const;

const DEFAULT_USER: User = {
  id: "user_1",
  name: "Estudiante",
  email: "estudiante@englishquest.com",
  level: "A1",
  joinedAt: new Date().toISOString(),
};

const DEFAULT_PROGRESS: UserProgress = {
  userId: "user_1",
  completedLessons: {},
  completedExercises: {},
  levelTestResult: null,
  streak: 0,
  lastActivity: null,
  wordsLearned: 0,
  dailyGoal: 1,
  dailyCompleted: 0,
  weeklyActivity: {},
  settings: {
    sound: true,
    notifications: true,
  },
};

class StorageService {
  private get<T>(key: string, fallback: T): T {
    if (typeof window === "undefined") return fallback;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // silencioso: localStorage puede estar bloqueado en modo privado
    }
  }

  // Usuario
  getUser(): User {
    return this.get(STORAGE_KEYS.user, DEFAULT_USER);
  }

  setUser(user: User): void {
    this.set(STORAGE_KEYS.user, user);
  }

  // Progreso
  getProgress(): UserProgress {
    return this.get(STORAGE_KEYS.progress, DEFAULT_PROGRESS);
  }

  setProgress(progress: UserProgress): void {
    this.set(STORAGE_KEYS.progress, progress);
  }

  // Resultado de prueba de nivel
  getLevelTestResult(): LevelId | null {
    const progress = this.getProgress();
    return progress.levelTestResult;
  }

  setLevelTestResult(level: LevelId): void {
    const progress = this.getProgress();
    this.setProgress({ ...progress, levelTestResult: level });
  }

  // Lección completada
  markLessonCompleted(lessonId: string): void {
    const progress = this.getProgress();
    const now = new Date().toISOString();
    const today = now.split("T")[0];

    const completedLessons = {
      ...progress.completedLessons,
      [lessonId]: true,
    };

    const weeklyActivity = {
      ...progress.weeklyActivity,
      [today]: (progress.weeklyActivity[today] || 0) + 1,
    };

    let streak = progress.streak;
    const last = progress.lastActivity;
    if (last) {
      const lastDay = last.split("T")[0];
      if (lastDay !== today) {
        const lastDate = new Date(lastDay);
        const todayDate = new Date(today);
        const diffDays = Math.floor(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) {
          streak += 1;
        } else if (diffDays > 1) {
          streak = 1;
        }
      }
    } else {
      streak = 1;
    }

    const dailyGoal = progress.dailyGoal;
    const completedCount = Object.values(completedLessons).filter(Boolean).length;
    const dailyCompleted = Math.min(completedCount, dailyGoal);

    const wordsLearned = progress.wordsLearned + 5;

    this.setProgress({
      ...progress,
      completedLessons,
      lastActivity: now,
      streak,
      weeklyActivity,
      dailyCompleted,
      wordsLearned,
    });
  }

  isLessonCompleted(lessonId: string): boolean {
    return !!this.getProgress().completedLessons[lessonId];
  }

  isExerciseCompleted(exerciseId: string): boolean {
    return !!this.getProgress().completedExercises[exerciseId];
  }

  markExerciseCompleted(exerciseId: string): void {
    const progress = this.getProgress();
    this.setProgress({
      ...progress,
      completedExercises: {
        ...progress.completedExercises,
        [exerciseId]: true,
      },
    });
  }

  // Configuración
  getSettings() {
    return this.get(STORAGE_KEYS.settings, {
      sound: true,
      notifications: true,
    });
  }

  setSettings(settings: { sound: boolean; notifications: boolean }) {
    this.set(STORAGE_KEYS.settings, settings);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signUp(name: string, email: string, _password: string): { ok: boolean; user?: User; error?: string } {
    const users = this.get<string[]>("eq_users_signup_demo", []);
    if (users.includes(email)) {
      return { ok: false, error: "Este correo ya está registrado." };
    }
    this.set("eq_users_signup_demo", [...users, email]);
    const user: User = {
      ...DEFAULT_USER,
      name,
      email,
      id: `user_${Date.now()}`,
      joinedAt: new Date().toISOString(),
    };
    this.setUser(user);
    return { ok: true, user };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn(email: string, _password: string): { ok: boolean; user?: User; error?: string } {
    const users = this.get<string[]>("eq_users_signup_demo", []);
    if (!users.includes(email)) {
      return { ok: false, error: "Correo o contraseña incorrectos." };
    }
    const user = this.getUser();
    if (user.email !== email) {
      this.setUser({ ...user, email });
    }
    return { ok: true, user };
  }

  signOut(): void {
    this.set(STORAGE_KEYS.user, DEFAULT_USER);
    this.set(STORAGE_KEYS.progress, DEFAULT_PROGRESS);
  }

  resetPassword(email: string): { ok: boolean; error?: string } {
    const users = this.get<string[]>("eq_users_signup_demo", []);
    if (!users.includes(email)) {
      return { ok: false, error: "No encontramos una cuenta con ese correo." };
    }
    return { ok: true };
  }
}

export const storageService = new StorageService();
