export let gameMode; // Possible game modes: 'Word Game', 'Question Game', 'Charades'.

loadgameModeFromStorage();

export function loadgameModeFromStorage() {
  gameMode = localStorage.getItem('gameMode');

  if (!gameMode) {
    gameMode = 'Word Game';
  }
}

export function savegameModeToStorage() {
  localStorage.setItem('gameMode', JSON.stringify(gameMode));
}
