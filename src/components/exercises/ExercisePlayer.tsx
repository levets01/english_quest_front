import "../ui.css";
import "./exercises.css";
import type { Exercise } from "../../types";
import TranslationExercise from "./TranslationExercise";
import FillBlankExercise from "./FillBlankExercise";
import SelectWordExercise from "./SelectWordExercise";
import OrderWordsExercise from "./OrderWordsExercise";
import MatchExercise from "./MatchExercise";

interface ExercisePlayerProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

export function ExercisePlayer({ exercise, onComplete }: ExercisePlayerProps) {
  return (
    <div className="exercise-player">
      <div className="exercise-type-label">{exercise.instruction}</div>
      {exercise.type === "translation" && (
        <TranslationExercise exercise={exercise} onComplete={onComplete} />
      )}
      {exercise.type === "fill-blank" && (
        <FillBlankExercise exercise={exercise} onComplete={onComplete} />
      )}
      {exercise.type === "select-word" && (
        <SelectWordExercise exercise={exercise} onComplete={onComplete} />
      )}
      {exercise.type === "order-words" && (
        <OrderWordsExercise exercise={exercise} onComplete={onComplete} />
      )}
      {exercise.type === "match" && (
        <MatchExercise exercise={exercise} onComplete={onComplete} />
      )}
    </div>
  );
}
