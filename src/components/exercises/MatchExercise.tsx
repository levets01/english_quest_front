import "../ui.css";
import type { Exercise } from "../../types";
import { ExerciseFeedback } from "./ExerciseFeedback";
import { useState } from "react";

interface BaseExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

function MatchExercise({ exercise, onComplete }: BaseExerciseProps) {
  const pairs = exercise.pairs ?? [];
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState<boolean | null>(null);

  const handleLeftSelect = (id: string) => {
    if (checked) return;
    setLeftSelected(id);
  };

  const handleRightSelect = (id: string) => {
    if (checked || !leftSelected) return;
    const left = pairs.find((p) => p.id === leftSelected);
    const right = pairs.find((p) => p.id === id);
    const ok = (left && right && left.right === right.right) ?? false;
    if (ok) {
      setMatched((prev) => new Set([...prev, leftSelected, id]));
    }
    setLeftSelected(null);
    setChecked(ok);
    onComplete(ok);
  };

  const isMatched = (id: string) => matched.has(id);
  const isSelectedLeft = (id: string) => id === leftSelected;

  return (
    <div className="exercise-wrapper">
      <div className="exercise-instruction">{exercise.instruction}</div>
      <div className="match-container">
        <div className="match-col">
          {pairs.map((p) => (
            <button
              key={`l-${p.id}`}
              className={`match-item ${isMatched(p.id) ? "matched" : ""} ${isSelectedLeft(p.id) ? "selected" : ""}`}
              onClick={() => handleLeftSelect(p.id)}
              disabled={!!checked || isMatched(p.id)}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="match-col">
          {pairs.map((p) => (
            <button
              key={`r-${p.id}`}
              className={`match-item ${isMatched(p.id) ? "matched" : ""} ${isSelectedLeft(p.id) ? "" : ""}`}
              onClick={() => handleRightSelect(p.id)}
              disabled={!!checked || isMatched(p.id)}
            >
              {p.right}
            </button>
          ))}
        </div>
      </div>
      {checked !== null && (
        <ExerciseFeedback
          correct={checked}
          explanation={exercise.explanation}
          example={exercise.example}
          onContinue={() => {
            setChecked(null);
          }}
          show={true}
        />
      )}
    </div>
  );
}

export default MatchExercise;
