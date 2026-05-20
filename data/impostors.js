export let impostorCount;

loadImpostorCountFromStorage();

export function loadImpostorCountFromStorage() {
  impostorCount = JSON.parse(localStorage.getItem('impostorCount'));

  if (!impostorCount) {
    impostorCount = 1;
  }
}

export function saveImpostorCountToStorage() {
  localStorage.setItem('impostorCount', JSON.stringify(impostorCount));
}
