import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Headphones,
  FileText,
  Mic,
  ChevronRight,
} from "lucide-react";
import { Card, Button, SectionHeader } from "../components";
import { storageService } from "../services/storageService";
import "../components/ui.css";
import "./pages.css";

const CATEGORIES = [
  {
    id: "vocabulary",
    title: "Vocabulario",
    subtitle: "Aprende nuevas palabras",
    icon: BookOpen,
    color: "#e9f3e7",
    dot: "#479267",
  },
  {
    id: "grammar",
    title: "Gramática",
    subtitle: "Reglas y estructuras",
    icon: FileText,
    color: "#ffeadb",
    dot: "#d9a441",
  },
  {
    id: "listening",
    title: "Escucha",
    subtitle: "Comprensión auditiva",
    icon: Headphones,
    color: "#f0eafb",
    dot: "#7a5aa3",
  },
  {
    id: "speaking",
    title: "Pronunciación",
    subtitle: "Habla en inglés",
    icon: Mic,
    color: "#ffe8ec",
    dot: "#c05042",
  },
];

export function Practica() {
  const [activeTab, setActiveTab] = useState<string>("vocabulary");

  return (
    <div className="page-practica container section">
      <SectionHeader
        kicker="Sección de práctica"
        title="Practica lo aprendido"
        description="Elige una categoría para reforzar tu inglés con ejercicios interactivos."
      />

      <div className="practice-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`practice-tab ${activeTab === cat.id ? "active" : ""}`}
            onClick={() => setActiveTab(cat.id)}
          >
            <cat.icon size={18} strokeWidth={2} aria-hidden="true" />
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {activeTab === "vocabulary" && <VocabularyDemo />}
      {activeTab === "grammar" && <GrammarDemo />}
      {activeTab === "listening" && <ListeningDemo />}
      {activeTab === "speaking" && <SpeakingDemo />}
    </div>
  );
}

function VocabularyDemo() {
  const words = [
    { en: "Apple", es: "Manzana" },
    { en: "Book", es: "Libro" },
    { en: "House", es: "Casa" },
    { en: "Water", es: "Agua" },
    { en: "Friend", es: "Amigo" },
    { en: "Hello", es: "Hola" },
  ];
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  return (
    <Card padded={true} className="demo-card">
      <div className="demo-header">
        <span className="demo-kicker">Vocabulario · Tarjetas</span>
        <h3>Aprende palabras esenciales</h3>
      </div>
      <div className="flashcard" onClick={() => setFlipped(!flipped)}>
        <div className="flashcard-inner">
          <div className={`flashcard-face flashcard-front ${flipped ? "hidden" : ""}`}>
            <span style={{ fontSize: 40, fontWeight: 900, color: "#276749" }}>{words[current].en}</span>
            <p style={{ color: "#758078", fontSize: 13 }}>Haz clic para ver el significado</p>
          </div>
          <div className={`flashcard-face flashcard-back ${flipped ? "" : "hidden"}`}>
            <span style={{ fontSize: 40, fontWeight: 900, color: "#479267" }}>{words[current].es}</span>
            <p style={{ color: "#758078", fontSize: 13 }}>Palabra en español</p>
          </div>
        </div>
      </div>
      <div className="flashcard-controls">
        <Button variant="outline" onClick={() => setCurrent((c) => (c === 0 ? words.length - 1 : c - 1))}>
          Anterior
        </Button>
        <span className="flashcard-counter">{current + 1} de {words.length}</span>
        <Button variant="primary" onClick={() => setCurrent((c) => (c === words.length - 1 ? 0 : c + 1))}>
          Siguiente
        </Button>
      </div>
    </Card>
  );
}

function GrammarDemo() {
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  const options = ["am", "is", "are", "be"];
  const check = (opt: string) => {
    if (answered) return;
    setSelected(opt);
    const ok = opt === "am";
    setCorrect(ok);
    setAnswered(true);
    storageService.markExerciseCompleted("grammar-tobe-demo");
  };

  return (
    <Card padded={true} className="demo-card">
      <div className="demo-header">
        <span className="demo-kicker">Gramática · Verbo To Be</span>
        <h3>Completa la oración</h3>
      </div>
      <div className="grammar-sentence">
        I ___ a student.
      </div>
      <div className="grammar-options">
        {options.map((opt) => (
          <button
            key={opt}
            className={`grammar-opt ${answered ? (opt === "am" ? "correct" : opt === selected ? "incorrect" : "") : ""}`}
            onClick={() => check(opt)}
            disabled={answered}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <div className="grammar-feedback">
          {correct ? (
            <span style={{ color: "#2f6b43", fontWeight: 800 }}>¡Correcto!</span>
          ) : (
            <span style={{ color: "#a33a32", fontWeight: 800 }}>Incorrecto</span>
          )}
          <p style={{ marginTop: 6, fontSize: 13, color: "#758078" }}>
            Con el pronombre <strong>I</strong> se usa <strong>am</strong>.
            Ejemplo: <em>I am a student.</em> (Soy estudiante.)
          </p>
        </div>
      )}
      <div style={{ marginTop: 14 }}>
        <Link to="/lecciones" className="btn btn-outline" style={{ padding: "10px 18px" }}>
          Ver lección completa <ChevronRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}

function ListeningDemo() {
  const [played, setPlayed] = useState(false);
  return (
    <Card padded={true} className="demo-card demo-info">
      <div className="demo-header">
        <span className="demo-kicker">Escucha · Demonstración</span>
        <h3>Comprensión auditiva</h3>
      </div>
      <p style={{ color: "#758078", marginBottom: 16 }}>
        Escucha el audio y responde qué se dice. Esta sección se conectará con el
        reproductor de audio en la siguiente versión.
      </p>
      <div className="demo-placeholder">
        <Headphones size={36} strokeWidth={2} className="info-icon" aria-hidden="true" />
        <div>
          <div style={{ fontWeight: 800, color: "#24352e", marginBottom: 4 }}>Audio de ejemplo</div>
          <div style={{ fontSize: 13, color: "#758078" }}>Greetings and introductions</div>
        </div>
      </div>
      <Button variant="primary" onClick={() => setPlayed(true)} disabled={played}>
        {played ? "Reproducido" : "Reproducir audio de demostración"}
      </Button>
      <p style={{ marginTop: 10, fontSize: 12, color: "#8b9189" }}>
        Funcionalidad de audio disponible en la próxima versión.
      </p>
    </Card>
  );
}

function SpeakingDemo() {
  return (
    <Card padded={true} className="demo-card demo-info">
      <div className="demo-header">
        <span className="demo-kicker">Pronunciación · Demonstración</span>
        <h3>Practica hablando</h3>
      </div>
      <p style={{ color: "#758078", marginBottom: 16 }}>
        Repite la frase tras el modelo y compara tu pronunciación. Esta sección
        se conectará con el micrófono en la siguiente versión.
      </p>
      <div className="demo-placeholder">
        <Mic size={36} strokeWidth={2} className="info-icon" aria-hidden="true" />
        <div>
          <div style={{ fontWeight: 800, color: "#24352e", marginBottom: 4 }}>Frase de ejemplo</div>
          <div style={{ fontSize: 15, color: "#276749", fontWeight: 700 }}>"Hello, how are you?"</div>
          <div style={{ fontSize: 12, color: "#8b9189", marginTop: 4 }}>¡Hola, ¿cómo estás?</div>
        </div>
      </div>
      <Button variant="outline" disabled>
        Iniciar grabación (próximamente)
      </Button>
    </Card>
  );
}
