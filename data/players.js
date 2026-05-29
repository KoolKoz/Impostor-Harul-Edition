import genId from '../scripts/utils/id.js';

import { renderSettings } from '../scripts/settings.js';

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

export function renderPlayersTab(settings) {
  let playersListHTML = settings.players // REMEMBER TO MAKE THE PLAYER NAME AN INPUT SO YOU CAN CHANGE IT!!!
    .map(
      (player) => `
        <li class="player-item" data-id="${player.id}">
          <input type="text" class="player-name-input" value="${player.name}" data-player-id="${player.id}" />
          <span data-id="${player.id}" class="delete js-delete">&times;</span>
        </li>
      `,
    )
    .join('');

  let playersHTML = `
    <h2>Players (${settings.players.length})</h2>
    <ul class="players-list">
      ${playersListHTML}
    </ul>
    <button id="add-player-btn" class="pink-btn add-player-btn">+</button>
  `;

  const playersContainer = document.getElementById('main');
  playersContainer.innerHTML = playersHTML;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <button id="back-btn" class="pink-btn">← Back</button>
  `;

  ////// Event listeners. \\\\\\

  document.querySelectorAll('.player-name-input').forEach((input) => {
    input.addEventListener('blur', (event) => {
      const playerId = event.target.dataset.playerId;
      const newName = event.target.value.trim();

      if (newName) {
        settings.editPlayerName(playerId, newName);
        renderPlayersTab(settings);
      }
    });
  });

  document.getElementById('back-btn').addEventListener('click', () => {
    renderSettings(settings);
  });

  document.getElementById('add-player-btn').addEventListener('click', () => {
    settings.addPlayer();
    renderPlayersTab(settings);
  });

  document.querySelectorAll('.js-delete').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const playerId = e.currentTarget.dataset.id;
      settings.removePlayer(playerId);
      renderPlayersTab(settings);
    });
  });
}
