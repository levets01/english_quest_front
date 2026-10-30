export type LevelId = "A1" | "A2" | "B1" | "B2" | "C1";

export interface Level {
  id: LevelId;
  title: string;
  subtitle: string;
  description: string;
  objectives: string[];
  topics: string[];
  units: number;
  color: string;
  icon: string;
}

export interface Lesson {
  id: string;
  levelId: LevelId;
  unit: number;
  unitTitle: string;
  title: string;
  description: string;
  duration: string;
  order: number;
}

export type ExerciseType =
  | "translation"
  | "fill-blank"
  | "select-word"
  | "order-words"
  | "match";

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  instruction: string;
  question: string;
  options?: ExerciseOption[];
  answer?: string;
  pairs?: MatchPair[];
  explanation: string;
  example?: string;
}

export interface LessonContent {
  id: string;
  lessonId: string;
  title: string;
  exercises: Exercise[];
}

export type ExerciseStatus = "idle" | "correct" | "incorrect";

export interface User {
  id: string;
  name: string;
  email: string;
  level: LevelId;
  joinedAt: string;
}

export interface UserProgress {
  userId: string;
  completedLessons: Record<string, boolean>;
  completedExercises: Record<string, boolean>;
  levelTestResult: LevelId | null;
  streak: number;
  lastActivity: string | null;
  wordsLearned: number;
  dailyGoal: number;
  dailyCompleted: number;
  weeklyActivity: Record<string, number>;
  settings: {
    sound: boolean;
    notifications: boolean;
  };
}

export interface TestQuestion {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  level: LevelId;
  category: string;
  explanation: string;
}

export interface TestResult {
  level: LevelId;
  score: number;
  total: number;
  message: string;
}
