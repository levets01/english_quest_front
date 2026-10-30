import "../ui.css";
import type { Exercise } from "../../types";
import { ExerciseFeedback } from "./ExerciseFeedback";
import { useState } from "react";

interface BaseExerciseProps {
  exercise: Exercise;
  onComplete: (correct: boolean) => void;
}

function OrderWordsExercise({ exercise, onComplete }: BaseExerciseProps) {
  const words = exercise.question.split(/[\s/]+/).filter(Boolean);
  const [order, setOrder] = useState<string[]>(() => [...words].sort(() => 0.5 - Math.random()));
  const [checked, setChecked] = useState<boolean | null>(null);

  const handleMove = (from: number, to: number) => {
    if (checked) return;
    const next = [...order];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed);
    setOrder(next);
  };

  const handleCheck = () => {
    const correct = order.join(" ") === exercise.answer;
    setChecked(correct);
    onComplete(correct);
  };

  return (
    <div className="exercise-wrapper">
      <div className="exercise-instruction">{exercise.instruction}</div>
      <div className="order-words">
        {order.map((w, i) => (
          <button
            key={`${w}-${i}`}
            className="order-word"
            onClick={() => handleMove(i, i > 0 ? i - 1 : i)}
            style={{
              order: i,
              background: checked
                ? order.join(" ") === exercise.answer
                  ? "#e9f3e7"
                  : "#fdecea"
                : "white",
            }}
            disabled={checked !== null}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="order-result" style={{ marginTop: 14, fontSize: 13, color: "#758078", fontWeight: 700, textAlign: "center" }}>
        {order.join(" ")}
      </div>
      {!checked && (
        <button className="btn btn-outline" onClick={handleCheck} style={{ marginTop: 14 }}>
          Verificar orden
        </button>
      )}
      {checked && (
        <ExerciseFeedback
          correct={checked}
          explanation={exercise.explanation}
          example={exercise.example}
          onContinue={() => setChecked(null)}
          show={true}
        />
      )}
    </div>
  );
}

export default OrderWordsExercise;
