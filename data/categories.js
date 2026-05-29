let categoriesData;

async function loadCategoriesData() {
  const response = await fetch('./data/categories.json');
  categoriesData = await response.json();
}

loadCategoriesData();

export let selectedCategories = [];

loadSelectedCategoriesFromStorage();

export function loadSelectedCategoriesFromStorage() {
  selectedCategories = JSON.parse(localStorage.getItem('selectedCategories'));

  if (!selectedCategories) {
    selectedCategories = [
      'People/Pets',
      'Games',
      'Places',
      'Objects',
      'Animals',
    ];
  }
}

export function saveSelectedCategoriesToStorage() {
  localStorage.setItem(
    'selectedCategories',
    JSON.stringify(selectedCategories),
  );
}

export function toggleCategory(category) {
  if (selectedCategories.includes(category)) {
    selectedCategories = selectedCategories.filter((cat) => cat !== category);
  } else {
    selectedCategories.push(category);
  }
  saveSelectedCategoriesToStorage();
  return true;
}

/**
 * Selects a random word from one of the selected categories.
 * @param {Array<string>} selectedCats - Array of category names (e.g., ['People/Pets', 'Games'])
 * @returns {string|null} - A random word from a selected category, or null if no categories available
 */
export function selectWord(selectedCats) {
  if (!selectedCats || selectedCats.length === 0) return null;

  // Convert UI category names to JSON keys (e.g., 'People/Pets' -> 'people/pets')
  const categoryKeys = selectedCats.map((cat) => cat.toLowerCase());

  // Filter categories that exist in the data
  const availableCategories = categoryKeys.filter(
    (key) => key in categoriesData,
  );

  if (availableCategories.length === 0) return null;

  // Randomly select a category
  const randomCategoryIndex = Math.floor(
    Math.random() * availableCategories.length,
  );
  const selectedCategory = availableCategories[randomCategoryIndex];

  // Get the words in that category
  const words = categoriesData[selectedCategory];

  if (!words || words.length === 0) return null;

  // Randomly select a word from the category
  const randomWordIndex = Math.floor(Math.random() * words.length);
  return words[randomWordIndex];
}
