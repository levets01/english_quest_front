import "../ui.css";

export interface ExerciseOptionCardProps {
  option: { id: string; text: string };
  selected: boolean;
  correct: boolean | null;
  disabled: boolean;
  onSelect: (id: string) => void;
}

export function ExerciseOptionCard({
  option,
  selected,
  correct,
  disabled,
  onSelect,
}: ExerciseOptionCardProps) {
  const isCorrect = correct === true;
  const isIncorrect = selected && correct === false;
  const bg = isCorrect
    ? "#e9f3e7"
    : isIncorrect
      ? "#fdecea"
      : "#fff";
  const border = isCorrect
    ? "#479267"
    : isIncorrect
      ? "#c05042"
      : "#eeece3";
  const text = isCorrect
    ? "#2f6b43"
    : isIncorrect
      ? "#a33a32"
      : "#24352e";

  return (
    <button
      className="option-card"
      onClick={() => onSelect(option.id)}
      disabled={disabled}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        color: text,
        opacity: disabled ? 0.85 : 1,
      }}
    >
      {option.text}
    </button>
  );
}
