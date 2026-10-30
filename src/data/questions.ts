import type { TestQuestion } from "../types";

export const TEST_QUESTIONS: TestQuestion[] = [
  // A1 - Vocabulario
  {
    id: 1,
    text: "¿Cómo se dice «hola» en inglés?",
    options: ["Goodbye", "Hello", "Thank you", "Please"],
    correctAnswer: 1,
    level: "A1",
    category: "Vocabulario",
    explanation: "Hello significa «hola».",
  },
  {
    id: 2,
    text: "¿Qué significa «Thank you»?",
    options: ["Por favor", "Gracias", "Disculpe", "Adiós"],
    correctAnswer: 1,
    level: "A1",
    category: "Vocabulario",
    explanation: "Thank you significa «gracias».",
  },
  {
    id: 3,
    text: "Selecciona el número correcto: «Three» es:",
    options: ["Dos", "Tres", "Cuatro", "Cinco"],
    correctAnswer: 1,
    level: "A1",
    category: "Vocabulario",
    explanation: "Three significa «tres».",
  },
  // A1 - Gramática (To Be)
  {
    id: 4,
    text: "Completa: I ___ a student.",
    options: ["is", "are", "am", "be"],
    correctAnswer: 2,
    level: "A1",
    category: "Gramática",
    explanation: "Con el pronombre I se usa am: I am a student.",
  },
  {
    id: 5,
    text: "Completa: She ___ my friend.",
    options: ["am", "is", "are", "be"],
    correctAnswer: 1,
    level: "A1",
    category: "Gramática",
    explanation: "Con she se usa is: She is my friend.",
  },
  // A1 - Comprensión de oraciones
  {
    id: 6,
    text: "¿Qué significa «Good morning»?",
    options: ["Buenas noches", "Buenos días", "Buenas tardes", "Hola"],
    correctAnswer: 1,
    level: "A1",
    category: "Comprensión de oraciones",
    explanation: "Good morning se usa por la mañana para saludar.",
  },
  // A2 - Vocabulario
  {
    id: 7,
    text: "¿Qué significa «family»?",
    options: ["Amigo", "Familia", "Casa", "Escuela"],
    correctAnswer: 1,
    level: "A2",
    category: "Vocabulario",
    explanation: "Family significa «familia».",
  },
  {
    id: 8,
    text: "Completa: I ___ coffee every morning.",
    options: ["drink", "drinks", "drinking", "drank"],
    correctAnswer: 0,
    level: "A2",
    category: "Gramática",
    explanation: "Con I se usa la base del verbo: I drink coffee.",
  },
  {
    id: 9,
    text: "¿Qué hora es? «It is 5 o'clock» significa:",
    options: ["Son las 5 en punto", "Son las 5 y media", "Faltan 5 para las", "Son las 5 menos cuarto"],
    correctAnswer: 0,
    level: "A2",
    category: "Comprensión de oraciones",
    explanation: "O'clock significa «en punto».",
  },
  // A2 - Uso de verbos
  {
    id: 10,
    text: "Completa: She ___ to music every day.",
    options: ["listen", "listens", "listening", "listened"],
    correctAnswer: 1,
    level: "A2",
    category: "Uso de verbos",
    explanation: "Con she en presente simple se añade -s: she listens.",
  },
  // B1 - Gramática (Pasado)
  {
    id: 11,
    text: "Completa: I ___ to the cinema yesterday.",
    options: ["go", "goes", "went", "going"],
    correctAnswer: 2,
    level: "B1",
    category: "Gramática",
    explanation: "Went es el pasado irregular de go. Yesterday indica pasado.",
  },
  {
    id: 12,
    text: "¿Qué significa «I have been to Paris»?",
    options: ["He estado en París", "Estoy en París", "Estaré en París", "Estaba en París"],
    correctAnswer: 0,
    level: "B1",
    category: "Comprensión de oraciones",
    explanation: "Present perfect: he estado en París (experiencia de vida).",
  },
  // B1 - Vocabulario / Expresiones
  {
    id: 13,
    text: "Selecciona el sinónimo más cercano de «big»:",
    options: ["small", "large", "tiny", "short"],
    correctAnswer: 1,
    level: "B1",
    category: "Vocabulario",
    explanation: "Large es sinónimo de big (grande).",
  },
  // B2 - Gramática (Condicionales)
  {
    id: 14,
    text: "Completa: If I ___ rich, I would travel the world.",
    options: ["am", "were", "was", "be"],
    correctAnswer: 1,
    level: "B2",
    category: "Gramática",
    explanation: "Second conditional: If I were... (condicional irreal).",
  },
  {
    id: 15,
    text: "¿Qué significa «I look forward to hearing from you»?",
    options: ["Espero tener noticias tuyas", "Te veo mañana", "Te llamo ahora", "No te entiendo"],
    correctAnswer: 0,
    level: "B2",
    category: "Expresiones cotidianas",
    explanation: "Expresión formal usada al cerrar correos electrónicos.",
  },
  // B2 - Uso de verbos / Phrasal verbs
  {
    id: 16,
    text: "¿Qué significa «give up»?",
    options: ["Rendirse", "Subir", "Entregar", "Levantar"],
    correctAnswer: 0,
    level: "B2",
    category: "Expresiones cotidianas",
    explanation: "Give up significa rendirse.",
  },
];

export const TEST_CONFIG = {
  totalQuestions: TEST_QUESTIONS.length,
  passingLevels: {
    A1: 0,
    A2: 5,
    B1: 11,
    B2: 14,
  } as Record<string, number>,
};

export function computeTestResult(score: number): { level: string; message: string } {
  if (score >= TEST_CONFIG.passingLevels.B2) {
    return {
      level: "B2",
      message: "¡Excelente! Tu nivel aproximado es B2 (Intermedio alto). Tienes un buen dominio del inglés y puedes comunicarte con soltura en la mayoría de situaciones.",
    };
  }
  if (score >= TEST_CONFIG.passingLevels.B1) {
    return {
      level: "B1",
      message: "Muy bien. Tu nivel aproximado es B1 (Intermedio). Puedes desenvolverte en situaciones cotidianas y de viaje con confianza.",
    };
  }
  if (score >= TEST_CONFIG.passingLevels.A2) {
    return {
      level: "A2",
      message: "Buen comienzo. Tu nivel aproximado es A2 (Elemental). Conoces lo básico y puedes comunicarte en situaciones simples.",
    };
  }
  return {
    level: "A1",
    message: "Tu nivel aproximado es A1 (Principiante). Es un buen punto de partida. Comienza desde cero con nuestras primeras lecciones.",
  };
}
