export let gameMode; // Possible game modes: 'Word Game', 'Charades'.

loadGameModeFromStorage();

export function loadGameModeFromStorage() {
  gameMode = localStorage.getItem('gameMode');

  if (!gameMode) {
    gameMode = 'Word Game';
  }
}

export function saveGameModeToStorage() {
  localStorage.setItem('gameMode', gameMode);
}

export function setGameMode(selectedGameMode) {
  gameMode = selectedGameMode;
  saveGameModeToStorage();
  return true;
}
