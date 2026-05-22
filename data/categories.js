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
