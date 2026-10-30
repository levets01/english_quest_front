import "../ui.css";
import type { Exercise } from "../../types";
import { ExerciseOptionCard } from "./ExerciseOptionCard";
import { ExerciseFeedback } from "./ExerciseFeedback";
import { useState } from "react";

interface BaseExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

function FillBlankExercise({ exercise, onComplete }: BaseExerciseProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<boolean | null>(null);

  const handleSelect = (id: string) => {
    if (checked) return;
    setSelected(id);
  };

  const handleCheck = () => {
    if (!selected) return;
    const option = exercise.options?.find((o) => o.id === selected);
    const correct = option?.isCorrect ?? false;
    setChecked(correct);
    onComplete(correct);
  };

  return (
    <div className="exercise-wrapper">
      <div className="exercise-instruction">{exercise.instruction}</div>
      <div className="exercise-question">{exercise.question}</div>
      <div className="options-grid">
        {exercise.options?.map((opt) => {
          const isSelected = selected === opt.id;
          let correct: boolean | null = null;
          if (checked) correct = opt.isCorrect ?? false;
          return (
            <ExerciseOptionCard
              key={opt.id}
              option={opt}
              selected={isSelected}
              correct={correct}
              disabled={checked !== null}
              onSelect={handleSelect}
            />
          );
        })}
      </div>
      {!checked && (
        <button className="btn btn-outline" onClick={handleCheck} disabled={!selected}>
          Verificar respuesta
        </button>
      )}
      {checked && (
        <ExerciseFeedback
          correct={checked}
          explanation={exercise.explanation}
          example={exercise.example}
          onContinue={() => {
            setChecked(null);
            setSelected(null);
          }}
          show={true}
        />
      )}
    </div>
  );
}

export default FillBlankExercise;
