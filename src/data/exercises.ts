import type { LessonContent, Exercise } from "../types";

const E = (overrides: Partial<Exercise>): Exercise => ({
  id: "",
  type: "translation",
  instruction: "",
  question: "",
  options: [],
  answer: "",
  explanation: "",
  ...overrides,
});

export const LESSON_EXERCISES: Record<string, Exercise[]> = {
  // A1 Unidad 1 - Saludos y despedidas
  "a1-u1-saludos": [
    E({
      id: "ex-1-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta al español.",
      question: "Hello!",
      options: [
        { id: "o1", text: "¡Hola!", isCorrect: true },
        { id: "o2", text: "¡Adiós!" },
        { id: "o3", text: "¡Gracias!" },
        { id: "o4", text: "¡Perdón!" },
      ],
      answer: "¡Hola!",
      explanation: "Hello significa «hola» y se usa para saludar a alguien.",
      example: "Hello! How are you? (¡Hola! ¿Cómo estás?)",
    }),
    E({
      id: "ex-1-2",
      type: "translation",
      instruction: "Selecciona la traducción correcta al español.",
      question: "Goodbye!",
      options: [
        { id: "o1", text: "¡Hola!" },
        { id: "o2", text: "¡Gracias!" },
        { id: "o3", text: "¡Adiós!", isCorrect: true },
        { id: "o4", text: "¡Buenos días!" },
      ],
      answer: "¡Adiós!",
      explanation: "Goodbye se usa para despedirse de alguien.",
      example: "Goodbye! See you tomorrow. (¡Adiós! Nos vemos mañana.)",
    }),
    E({
      id: "ex-1-3",
      type: "fill-blank",
      instruction: "Completa la oración con la palabra correcta.",
      question: "___! My name is Ana.",
      options: [
        { id: "o1", text: "Goodbye" },
        { id: "o2", text: "Hello", isCorrect: true },
        { id: "o3", text: "Thank you" },
      ],
      answer: "Hello",
      explanation: "Hello se usa al iniciar una presentación o saludo.",
      example: "Hello! My name is Ana. (¡Hola! Me llamo Ana.)",
    }),
  ],
  // A1 Unidad 1 - Presentaciones personales
  "a1-u1-presentaciones": [
    E({
      id: "ex-2-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "What is your name?",
      options: [
        { id: "o1", text: "¿Cómo estás?", isCorrect: false },
        { id: "o2", text: "¿Cuál es tu nombre?", isCorrect: true },
        { id: "o3", text: "¿De dónde eres?" },
        { id: "o4", text: "¿Qué haces?" },
      ],
      answer: "¿Cuál es tu nombre?",
      explanation: "What is your name? se pregunta el nombre de la persona.",
    }),
    E({
      id: "ex-2-2",
      type: "fill-blank",
      instruction: "Completa la oración.",
      question: "I ___ from Spain.",
      options: [
        { id: "o1", text: "am", isCorrect: true },
        { id: "o2", text: "is" },
        { id: "o3", text: "are" },
      ],
      answer: "am",
      explanation: "Con el pronombre I se usa el verbo to be en forma am.",
      example: "I am from Spain. (Soy de España.)",
    }),
    E({
      id: "ex-2-3",
      type: "select-word",
      instruction: "Selecciona la palabra correcta para completar.",
      question: "She ___ a student.",
      options: [
        { id: "o1", text: "am" },
        { id: "o2", text: "is", isCorrect: true },
        { id: "o3", text: "are" },
      ],
      answer: "is",
      explanation: "Con el pronombre She se usa el verbo to be en forma is.",
      example: "She is a student. (Ella es estudiante.)",
    }),
  ],
  // A1 Unidad 1 - El alfabeto
  "a1-u1-alfabeto": [
    E({
      id: "ex-3-1",
      type: "select-word",
      instruction: "¿Cómo se pronuncia la letra A en inglés?",
      question: "A",
      options: [
        { id: "o1", text: "éi" },
        { id: "o2", text: "ái", isCorrect: true },
        { id: "o3", text: "íi" },
        { id: "o4", text: "óu" },
      ],
      answer: "ái",
      explanation: "La letra A se pronuncia /eɪ/ («ái») en inglés.",
    }),
    E({
      id: "ex-3-2",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "Can you spell your name?",
      options: [
        { id: "o1", text: "¿Puedes deletrear tu nombre?", isCorrect: true },
        { id: "o2", text: "¿Puedes escribir tu nombre?" },
        { id: "o3", text: "¿Cuál es tu nombre?" },
      ],
      answer: "¿Puedes deletrear tu nombre?",
      explanation: "To spell significa deletrear, decir letra por letra.",
    }),
  ],
  // A1 Unidad 1 - Números
  "a1-u1-numeros": [
    E({
      id: "ex-4-1",
      type: "translation",
      instruction: "Selecciona el número correcto en español.",
      question: "Five",
      options: [
        { id: "o1", text: "Cuatro" },
        { id: "o2", text: "Cinco", isCorrect: true },
        { id: "o3", text: "Seis" },
        { id: "o4", text: "Siete" },
      ],
      answer: "Cinco",
      explanation: "Five significa «cinco».",
    }),
    E({
      id: "ex-4-2",
      type: "fill-blank",
      instruction: "Completa la oración.",
      question: "I have ___ apples.",
      options: [
        { id: "o1", text: "two", isCorrect: true },
        { id: "o2", text: "twenty" },
        { id: "o3", text: "twelve" },
      ],
      answer: "two",
      explanation: "Two significa «dos». I have two apples. (Tengo dos manzanas.)",
    }),
  ],
  // A1 Unidad 2 - Colores
  "a1-u2-colores": [
    E({
      id: "ex-5-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "Red",
      options: [
        { id: "o1", text: "Azul" },
        { id: "o2", text: "Verde" },
        { id: "o3", text: "Rojo", isCorrect: true },
        { id: "o4", text: "Amarillo" },
      ],
      answer: "Rojo",
      explanation: "Red significa «rojo».",
    }),
    E({
      id: "ex-5-2",
      type: "select-word",
      instruction: "Selecciona el color correcto.",
      question: "The sky is ___.",
      options: [
        { id: "o1", text: "blue", isCorrect: true },
        { id: "o2", text: "red" },
        { id: "o3", text: "green" },
      ],
      answer: "blue",
      explanation: "Blue significa «azul». The sky is blue. (El cielo es azul.)",
    }),
  ],
  // A1 Unidad 2 - Familia
  "a1-u2-familia": [
    E({
      id: "ex-6-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "Mother",
      options: [
        { id: "o1", text: "Hermano" },
        { id: "o2", text: "Madre", isCorrect: true },
        { id: "o3", text: "Hijo" },
        { id: "o4", text: "Padre" },
      ],
      answer: "Madre",
      explanation: "Mother significa «madre».",
    }),
    E({
      id: "ex-6-2",
      type: "fill-blank",
      instruction: "Completa la oración.",
      question: "This is my ___.",
      options: [
        { id: "o1", text: "father", isCorrect: true },
        { id: "o2", text: "teacher" },
        { id: "o3", text: "doctor" },
      ],
      answer: "father",
      explanation: "Father significa «padre».",
    }),
  ],
  // A1 Unidad 2 - Objetos
  "a1-u2-objetos": [
    E({
      id: "ex-7-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "Book",
      options: [
        { id: "o1", text: "Cuaderno" },
        { id: "o2", text: "Libro", isCorrect: true },
        { id: "o3", text: "Lápiz" },
        { id: "o4", text: "Mochila" },
      ],
      answer: "Libro",
      explanation: "Book significa «libro».",
    }),
  ],
  // A1 Unidad 2 - Animales
  "a1-u2-animales": [
    E({
      id: "ex-8-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "Cat",
      options: [
        { id: "o1", text: "Perro" },
        { id: "o2", text: "Gato", isCorrect: true },
        { id: "o3", text: "Pájaro" },
        { id: "o4", text: "Pez" },
      ],
      answer: "Gato",
      explanation: "Cat significa «gato».",
    }),
  ],
  // A1 Unidad 3 - Pronombres
  "a1-u3-pronombres": [
    E({
      id: "ex-9-1",
      type: "translation",
      instruction: "Selecciona el pronombre correcto.",
      question: "He",
      options: [
        { id: "o1", text: "Él", isCorrect: true },
        { id: "o2", text: "Ella" },
        { id: "o3", text: "Tú" },
        { id: "o4", text: "Nosotros" },
      ],
      answer: "Él",
      explanation: "He se refiere a una persona masculina (él).",
    }),
    E({
      id: "ex-9-2",
      type: "fill-blank",
      instruction: "Completa con el pronombre correcto.",
      question: "___ am a student.",
      options: [
        { id: "o1", text: "I", isCorrect: true },
        { id: "o2", text: "You" },
        { id: "o3", text: "He" },
      ],
      answer: "I",
      explanation: "I significa «yo». I am a student. (Soy estudiante.)",
    }),
  ],
  // A1 Unidad 3 - To Be
  "a1-u3-tobe": [
    E({
      id: "ex-10-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "She is happy.",
      options: [
        { id: "o1", text: "Ella está feliz.", isCorrect: true },
        { id: "o2", text: "Él está feliz." },
        { id: "o3", text: "Nosotros estamos felices." },
        { id: "o4", text: "Yo soy feliz." },
      ],
      answer: "Ella está feliz.",
      explanation: "She is = ella está / ella es. Happy = feliz.",
    }),
    E({
      id: "ex-10-2",
      type: "fill-blank",
      instruction: "Completa con la forma correcta del verbo to be.",
      question: "They ___ my friends.",
      options: [
        { id: "o1", text: "is" },
        { id: "o2", text: "are", isCorrect: true },
        { id: "o3", text: "am" },
      ],
      answer: "are",
      explanation: "Con they se usa are. They are my friends. (Ellos son mis amigos.)",
    }),
  ],
  // A1 Unidad 3 - Artículos
  "a1-u3-articulos": [
    E({
      id: "ex-11-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "an apple",
      options: [
        { id: "o1", text: "una manzana", isCorrect: true },
        { id: "o2", text: "el manzana" },
        { id: "o3", text: "unos manzanas" },
      ],
      answer: "una manzana",
      explanation: "An se usa antes de sonidos vocálicos (apple comienza con vocal).",
    }),
  ],
  // A1 Unidad 3 - Oraciones sencillas
  "a1-u3-oraciones": [
    E({
      id: "ex-12-1",
      type: "order-words",
      instruction: "Ordena las palabras para formar una oración.",
      question: "am / I / a / student / .",
      answer: "I am a student.",
      explanation: "I am a student. (Soy estudiante.)",
    }),
    E({
      id: "ex-12-2",
      type: "order-words",
      instruction: "Ordena las palabras para formar una oración.",
      question: "She / is / a / teacher / .",
      answer: "She is a teacher.",
      explanation: "She is a teacher. (Ella es maestra.)",
    }),
  ],
  // A2 - Unidad 1 - Rutina
  "a2-u1-rutina": [
    E({
      id: "ex-13-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "I wake up at 7 o'clock.",
      options: [
        { id: "o1", text: "Me despierto a las 7 en punto.", isCorrect: true },
        { id: "o2", text: "Me acuesto a las 7 en punto." },
        { id: "o3", text: "Desayuno a las 7 en punto." },
      ],
      answer: "Me despierto a las 7 en punto.",
      explanation: "Wake up = despertarse. At 7 o'clock = a las 7 en punto.",
    }),
  ],
  // A2 - Unidad 2 - Compras
  "a2-u2-compras": [
    E({
      id: "ex-17-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "How much is it?",
      options: [
        { id: "o1", text: "¿Cuánto cuesta?", isCorrect: true },
        { id: "o2", text: "¿Dónde está?" },
        { id: "o3", text: "¿Qué es esto?" },
      ],
      answer: "¿Cuánto cuesta?",
      explanation: "How much is it? se usa para preguntar el precio.",
    }),
  ],
  // B1 - Unidad 1 - Pasado
  "b1-u1-pasado": [
    E({
      id: "ex-19-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "I visited London last year.",
      options: [
        { id: "o1", text: "Visité Londres el año pasado.", isCorrect: true },
        { id: "o2", text: "Visitaré Londres el año que viene." },
        { id: "o3", text: "Visito Londres cada año." },
      ],
      answer: "Visité Londres el año pasado.",
      explanation: "Visited es pasado simple de visit. Last year = el año pasado.",
    }),
  ],
  // B2 - Unidad 1 - Presentaciones profesionales
  "b2-u1-presentaciones": [
    E({
      id: "ex-22-1",
      type: "translation",
      instruction: "Selecciona la traducción correcta.",
      question: "I would like to present our new project.",
      options: [
        { id: "o1", text: "Me gustaría presentar nuestro nuevo proyecto.", isCorrect: true },
        { id: "o2", text: "Presenté nuestro nuevo proyecto." },
        { id: "o3", text: "Presentaré nuestro nuevo proyecto." },
      ],
      answer: "Me gustaría presentar nuestro nuevo proyecto.",
      explanation: "I would like to = me gustaría. Se usa para hacer propuestas de forma cortés.",
    }),
  ],
};

export const LESSONS_CONTENT: Record<string, LessonContent> = (Object.entries(
  LESSON_EXERCISES
) as [string, Exercise[]][]).reduce<Record<string, LessonContent>>(
  (acc, [lessonId, exercises]) => {
    acc[lessonId] = {
      id: `content-${lessonId}`,
      lessonId,
      title: "Contenido de la lección",
      exercises,
    };
    return acc;
  },
  {}
);
