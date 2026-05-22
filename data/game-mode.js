export let gameMode; // Possible game modes: 'Word Game', 'Question Game', 'Charades'.

loadGameModeFromStorage();

export function loadGameModeFromStorage() {
  gameMode = localStorage.getItem('gameMode');

  if (!gameMode) {
    gameMode = 'Word Game';
  }
}

export function saveGameModeToStorage() {
  localStorage.setItem('gameMode', JSON.stringify(gameMode));
}

export function setGameMode(gameMode) {
  gameMode = gameMode;
  saveGameModeToStorage();
  return true;
}
