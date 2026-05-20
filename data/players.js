import genId from '../scripts/utils/id.js';

export let players;

loadPlayersFromStorage();

export function loadPlayersFromStorage() {
  players = JSON.parse(localStorage.getItem('players'));

  if (!players) {
    players = [
      { name: 'Player 1', id: genId() },
      { name: 'Player 2', id: genId() },
      { name: 'Player 3', id: genId() },
    ];
  }
}

export function savePlayersToStorage() {
  localStorage.setItem('players', JSON.stringify(players));
}
