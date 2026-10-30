import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { Button, Card, ProgressBar, SectionHeader } from "../components";
import {
  TEST_QUESTIONS,
  computeTestResult,
} from "../data/questions";
import { storageService } from "../services/storageService";
import type { LevelId } from "../types";
import "../components/ui.css";
import "./pages.css";

type TestStep = "intro" | "question" | "result";

export function PruebaNivel() {
  const [step, setStep] = useState<TestStep>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [testResult, setTestResult] = useState<{ level: string; message: string; correct: number; total: number } | null>(null);

  const total = TEST_QUESTIONS.length;
  const currentQuestion = TEST_QUESTIONS[currentIndex];
  const answered = currentQuestion ? answers[currentIndex] !== undefined : false;

  const handleAnswer = (optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (!answered) return;
    if (currentIndex + 1 >= total) {
      finishTest();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const finishTest = () => {
    let correct = 0;
    TEST_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correct += 1;
    });
    const result = computeTestResult(correct);
    storageService.setLevelTestResult(result.level as LevelId);
    setTestResult({ level: result.level, message: result.message, correct, total });
    setStep("result");
  };

  const progress = total > 0 ? Math.round(((currentIndex + (answered ? 1 : 0)) / total) * 100) : 0;

  if (step === "intro") {
    return (
      <div className="page-prueba container section">
        <SectionHeader
          kicker="Prueba de nivel"
          title="Descubre tu nivel de inglés"
          description="Responde unas preguntas breves para saber desde dónde comenzar tu aprendizaje. No hay respuestas malas, solo tu punto de partida."
        />
        <Card padded={true}>
          <div className="test-intro">
            <GraduationCap size={40} strokeWidth={2} className="intro-icon" aria-hidden="true" />
            <h2>¿Cómo funciona?</h2>
            <ul className="intro-list">
              <li>
                <strong>Una pregunta por pantalla.</strong> Tómate tu tiempo para leerla.
              </li>
              <li>
                <strong>Selecciona una respuesta.</strong> No podrás avanzar sin responder.
              </li>
              <li>
                <strong>Puedes regresar</strong> a la pregunta anterior si cambias de opinión.
              </li>
              <li>
                <strong>Al finalizar</strong> verás tu nivel recomendado entre A1, A2, B1 y B2.
              </li>
            </ul>
            <div className="intro-meta">
              <span><Clock size={14} strokeWidth={2} aria-hidden="true" /> {total} preguntas</span>
              <span><BookOpen size={14} strokeWidth={2} aria-hidden="true" /> Niveles A1 a B2</span>
            </div>
            <Button variant="primary" full={true} onClick={() => setStep("question")}>
              Comenzar la prueba <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        </Card>
        <div className="test-footer">
          <Link to="/" className="btn btn-text">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (step === "result") {
    const data = testResult || { level: "A1", message: "", correct: 0, total };
    return (
      <div className="page-prueba container section">
        <SectionHeader
          kicker="Tu resultado"
          title={`Nivel recomendado: ${data.level}`}
          description={data.message}
        />
        <Card padded={true}>
          <div className="test-result">
            <div className="result-level" style={{ background: "#e9f3e7" }}>
              {data.level}
            </div>
            <div className="result-score">
              <span className="score-number">{data.correct}</span>
              <span className="score-label">de {data.total} respuestas correctas</span>
            </div>
            <ProgressBar value={(data.correct / data.total) * 100} label="Tu puntuación" />
            <p className="result-message">{data.message}</p>
            <div className="result-actions">
              <Link to="/lecciones" className="btn btn-primary btn-full">
                Ir a mis lecciones <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Card>
        <div className="test-footer">
          <Button variant="outline" onClick={() => {
            setStep("intro");
            setCurrentIndex(0);
            setAnswers({});
            setTestResult(null);
          }}>
            Volver a intentar
          </Button>
        </div>
      </div>
    );
  }

  // question step
  return (
    <div className="page-prueba container section">
      <div className="test-header">
        <SectionHeader
          kicker={`Pregunta ${currentIndex + 1} de ${total}`}
          title={currentQuestion.text}
          description={currentQuestion.category}
          className="test-section-header"
        />
        <ProgressBar value={progress} label="Progreso" className="test-progress" />
      </div>

      <Card padded={true} className="test-card">
        <div className="test-question-body">
          <div className="question-text">{currentQuestion.text}</div>
          <div className="options-grid">
            {currentQuestion.options.map((opt, i) => (
              <Button
                key={i}
                variant="outline"
                full={true}
                className={`option-btn ${answered ? (i === currentQuestion.correctAnswer ? "correct" : i === answers[currentIndex] ? "incorrect" : "") : ""}`}
                disabled={answered}
                onClick={() => {
                  if (!answered) handleAnswer(i);
                }}
              >
                {opt}
              </Button>
            ))}
          </div>
          {answered && (
            <div className="answer-feedback">
              {answers[currentIndex] === currentQuestion.correctAnswer ? (
                <>
                  <CheckCircle2 size={18} strokeWidth={2} className="fb-correct" aria-hidden="true" />
                  <span className="fb-text">Respuesta correcta</span>
                </>
              ) : (
                <>
                  <span className="fb-text fb-wrong">Respuesta incorrecta</span>
                </>
              )}
              <p className="fb-explanation">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </Card>

      <div className="test-nav">
        <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          Anterior
        </Button>
        <Button variant="primary" onClick={handleNext} disabled={!answered}>
          {currentIndex + 1 >= total ? "Finalizar prueba" : "Siguiente"}
          <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </div>
      <div className="test-footer">
        <Link to="/" className="btn btn-text">
          Salir de la prueba
        </Link>
      </div>
    </div>
  );
}
