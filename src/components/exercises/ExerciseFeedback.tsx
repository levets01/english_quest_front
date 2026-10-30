import "../ui.css";
import { CheckCircle2, XCircle } from "lucide-react";

interface ExerciseFeedbackProps {
  correct: boolean | null;
  explanation: string;
  example?: string;
  onContinue: () => void;
  show: boolean;
}

export function ExerciseFeedback({
  correct,
  explanation,
  example,
  onContinue,
  show,
}: ExerciseFeedbackProps) {
  if (!show) return null;
  return (
    <div className="feedback-card">
      <div className="feedback-header">
        {correct ? (
          <>
            <CheckCircle2 size={20} strokeWidth={2} className="feedback-icon-correct" aria-hidden="true" />
            <span className="feedback-title">¡Correcto!</span>
          </>
        ) : (
          <>
            <XCircle size={20} strokeWidth={2} className="feedback-icon-incorrect" aria-hidden="true" />
            <span className="feedback-title">Respuesta incorrecta</span>
          </>
        )}
      </div>
      <p className="feedback-text">{explanation}</p>
      {example && (
        <p className="feedback-example">
          <span className="feedback-example-label">Ejemplo:</span> {example}
        </p>
      )}
      <ButtonFull onClick={onContinue}>Continuar</ButtonFull>
    </div>
  );
}

function ButtonFull({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="btn btn-primary btn-full"
      style={{ marginTop: 10 }}
    >
      {children}
    </button>
  );
}
