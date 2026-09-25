import artMusicData from "./art_music.json";
import generalCultureData from "./general_culture.json";
import geographyData from "./geography.json";
import historyData from "./history.json";
import literatureData from "./literature.json";
import scienceData from "./science.json";

// Colección completa de categorías
export const categories = [
  artMusicData,
  generalCultureData,
  geographyData,
  historyData,
  literatureData,
  scienceData,
];

/**
 * Obtiene la lista de categorías disponibles para seleccionar en el menú principal.
 * Devuelve un array con id y nombre.
 */
export function getCategoriesList() {
  return categories.map((cat) => ({
    id: cat.categoryId,
    name: cat.categoryName,
  }));
}

/**
 * Obtiene las preguntas según la categoría y el nivel de dificultad.
 * @param {string} categoryId - Ej: "history" o "geography"
 * @param {string} levelKey - Ej: "basic", "intermediate", "advanced"
 * @returns {Array} Lista de preguntas del nivel solicitado
 */
export function getQuestionsByLevel(categoryId, levelKey) {
  const category = categories.find((cat) => cat.categoryId === categoryId);
  if (!category) {
    console.warn(`Categoría ${category} no encontrada`);
    return [];
  }
  const questions = category.levels[levelKey];
  if (!questions) {
    console.warn(` La categoría ${category} no tiene un nivel ${levelKey}`);
    return [];
  }
  return questions;
}

/**
 * Valida si la opción seleccionada por el usuario es la correcta
 * @param {object} question - Objeto de la pregunta actual
 * @param {number} selectedIndex - Índice de la respuesta seleccionada por el usuario
 * @returns {boolean}
 */
export function checkAnswer(question, selectedIndex) {
  return question.correctAnswerIndex === selectedIndex;
}
