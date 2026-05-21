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

export function addPlayer() {
  const player = { name: `Player ${players.length + 1}`, id: genId() };
  players.push(player);
  savePlayersToStorage();
  return true;
}

export function removePlayer(playerId) {
  if (players.length > 3) {
    players = players.filter((player) => player.id !== playerId);
    savePlayersToStorage();
    return true;
  }
  return false;
}

export function editPlayerName(playerId, newName) {
  const player = players.find((player) => player.id === playerId);
  if (!player) return false;
  player.name = newName;
  savePlayersToStorage();
  return true;
}
