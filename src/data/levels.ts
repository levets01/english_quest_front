import type { Level, LevelId } from "../types";

export const LEVELS: Level[] = [
  {
    id: "A1",
    title: "A1 · Principiante",
    subtitle: "Primeros pasos en inglés",
    description:
      "Ideal si nunca has estudiado inglés o tienes conocimientos muy básicos. Aprenderás a saludar, presentarte y usar expresiones sencillas del día a día.",
    objectives: [
      "Entender y usar expresiones cotidianas de uso frecuente.",
      "Presentarte a ti mismo y a otras personas.",
      "Hacer y responder preguntas personales sencillas.",
      "Interactuar de forma básica si la otra persona habla despacio.",
    ],
    topics: [
      "Saludos y despedidas",
      "El alfabeto y los números",
      "Pronombres personales",
      "El verbo to be",
      "Artículos determinados e indeterminados",
    ],
    units: 3,
    color: "#e9f3e7",
    icon: "sprout",
  },
  {
    id: "A2",
    title: "A2 · Elemental",
    subtitle: "Comunícate en situaciones simples",
    description:
      "Para quienes ya conocen lo básico y quieren ampliar su vocabulario para situaciones cotidianas como viajar, comprar o hablar de su rutina.",
    objectives: [
      "Entender frases frecuentes relacionadas con áreas de experiencia inmediata.",
      "Comunicarte en tareas sencillas y rutinarias.",
      "Describir tu entorno, familia y necesidades básicas.",
      "Leer textos cortos y sencillos.",
    ],
    topics: [
      "Colores, familia y animales",
      "Objetos cotidianos y la casa",
      "Presente simple y continuo",
      "Adjetivos y comparativos",
      "Expresiones de tiempo y lugar",
    ],
    units: 3,
    color: "#ffeadb",
    icon: "book-open",
  },
  {
    id: "B1",
    title: "B1 · Intermedio",
    subtitle: "Expresa tus ideas con confianza",
    description:
      "Para usuarios que ya se manejan en inglés básico y quieren desenvolverse en la mayoría de situaciones al viajar o trabajar.",
    objectives: [
      "Entender los puntos principales de textos claros y estándar.",
      "Describir experiencias, eventos, metas y aspiraciones.",
      "Redactar textos simples y cohesionados sobre temas familiares.",
      "Mantener una conversación espontánea sobre temas cotidianos.",
    ],
    topics: [
      "Pasado simple y continuo",
      "Futuro: will y going to",
      "Modales: can, could, may, must",
      "Conectores básicos",
      "Vocabulario de trabajo y viajes",
    ],
    units: 3,
    color: "#f0eafb",
    icon: "graduation-cap",
  },
  {
    id: "B2",
    title: "B2 · Intermedio alto",
    subtitle: "Domina el inglés en contextos variados",
    description:
      "Para usuarios que se comunican con soltura y quieren perfeccionar su expresión oral y escrita en contextos profesionales y académicos.",
    objectives: [
      "Entender ideas complejas en textos concretos y abstractos.",
      "Interactuar con hablantes nativos con fluidez y naturalidad.",
      "Redactar textos detallados defendiendo un punto de vista.",
      "Expresar opiniones y ventajas/desventajas de distintos temas.",
    ],
    topics: [
      "Condicionales",
      "Voz pasiva",
      "Phrasal verbs",
      "Discursos directos e indirectos",
      "Técnicas de presentación y debate",
    ],
    units: 3,
    color: "#e3f1e5",
    icon: "target",
  },
  {
    id: "C1",
    title: "C1 · Avanzado",
    subtitle: "Perfecciona tu dominio del idioma",
    description:
      "Para usuarios con un nivel sólido que buscan expresarse con precisión, fluidez y flexibilidad en contextos académicos y profesionales exigentes.",
    objectives: [
      "Entender textos largos y exigentes, reconociendo significados implícitos.",
      "Expresarte con fluidez y espontaneidad sin buscar palabras.",
      "Usar el inglés de forma flexible y eficaz para fines sociales, académicos y profesionales.",
      "Redactar textos claros, bien estructurados y detallados sobre temas complejos.",
    ],
    topics: [
      "Gramática avanzada y matices",
      "Lectura de textos académicos y literarios",
      "Redacción de ensayos y reportes",
      "Comprensión auditiva de charlas y conferencias",
      "Expresión oral avanzada",
    ],
    units: 0,
    color: "#f0eafb",
    icon: "award",
  },
];

export const LEVEL_BY_ID: Record<LevelId, Level> = Object.fromEntries(
  LEVELS.map((l) => [l.id, l])
) as Record<LevelId, Level>;
