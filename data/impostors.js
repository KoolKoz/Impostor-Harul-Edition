import { players } from './players.js';

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

export function updateImpostorCountOnRemovePlayer() {
  if (players.length <= impostorCount) {
    impostorCount = players.length - 1;
    saveImpostorCountToStorage();
    return true;
  }
  return false;
}

export function toggleImpostorCount() {
  const currentImpostorCount = impostorCount;

  if (currentImpostorCount >= players.length - 1) {
    impostorCount = 1;
  } else {
    impostorCount = currentImpostorCount + 1;
  }
  saveImpostorCountToStorage();
  return true;
}
