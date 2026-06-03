import { renderSettings } from '../scripts/settings.js';

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
      // 'Foods/Drinks',
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
 * Selects a random category from the selected categories.
 * @param {Array<string>} selectedCats - Array of category names (e.g., ['People/Pets', 'Games'])
 * @returns {string|null} - A random category key, or null if no categories available
 */
export function selectCategory(selectedCats) {
  if (!selectedCats || selectedCats.length === 0) return null;

  const categoryKeys = selectedCats;

  // Filter categories that exist in the data
  const availableCategories = categoryKeys.filter(
    (key) => key in categoriesData,
  );

  if (availableCategories.length === 0) return null;

  // Randomly select a category
  const randomCategoryIndex = Math.floor(
    Math.random() * availableCategories.length,
  );
  return availableCategories[randomCategoryIndex];
}

/**
 * Selects a random word from one of the selected categories.
 * @param {Array<string>} selectedCats - Array of category names (e.g., ['People/Pets', 'Games'])
 * @returns {string|null} - A random word from a selected category, or null if no categories available
 */
export function selectWord(game) {
  const selectedCategory = game.selectedCategory;

  if (!selectedCategory) return null;

  // Get the words in that category
  const words = categoriesData[selectedCategory];

  if (!words || words.length === 0) return null;

  // Randomly select a word from the category
  const randomWordIndex = Math.floor(Math.random() * words.length);
  return words[randomWordIndex];
}

export async function renderCategoriesTab(settings) {
  if (!categoriesData) {
    await loadCategoriesData();
  }

  const categoryKeys = Object.keys(categoriesData || {});

  const categoriesListHTML = categoryKeys
    .map(
      (category) =>
        `
        <li class="category-item js-category-item ${settings.selectedCategories.includes(category) ? '' : 'greyed-out'}" data-category="${category}">
          ${category}
          <span class="toggle-indicator">${settings.selectedCategories.includes(category) ? '✓' : '&bull;'}</span>
        </li>
    `,
    )
    .join('');

  let categoriesHTML = `
    <h2>Categories</h2>
    <ul class="categories-list">
      ${categoriesListHTML}
    </ul>
  `;

  // let playersListHTML = settings.players
  // .map(
  //   (player) => `
  //     <li class="player-item" data-id="${player.id}">
  //       <input type="text" class="player-name-input" value="${player.name}" data-player-id="${player.id}" />
  //       <span data-id="${player.id}" class="delete js-delete">&times;</span>
  //     </li>
  //   `,
  // )
  // .join('');

  const categoriesContainer = document.getElementById('main');
  categoriesContainer.innerHTML = categoriesHTML;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <button id="back-btn" class="pink-btn">← Back</button>
  `;

  ////// Event listeners. \\\\\\

  document.querySelectorAll('.js-category-item').forEach((item) => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      settings.toggleCategory(category);
      renderCategoriesTab(settings);
    });
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    renderSettings(settings);
  });
}
