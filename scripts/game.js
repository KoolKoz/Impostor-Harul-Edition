import { selectWord } from '../data/categories.js';

/**
 * Represents a game session with players, impostors, and non-impostors. WIP
 * Default amount of players is 3.
 * @class
 */
class Game {
  constructor(gameMode, selectedCategories, players) {
    this.gameMode = gameMode;
    this.selectedCategories = selectedCategories;
    this.players = players;
    this.impostors = [];
    this.nonImpostors = [];
    this.selectedPlayers = [];
    this.startingPlayer;
    this.word = '';
  }

  /**
   * Selects impostors for the game session based on impostor count.
   * @param {number} impostorCount
   */
  selectImpostors(impostorCount) {
    // Randomly select impostors from the players array based on the impostor count.
    const shuffledPlayers = [...this.players].sort(() => 0.5 - Math.random());
    this.impostors = shuffledPlayers.slice(0, impostorCount);
    this.nonImpostors = shuffledPlayers.slice(impostorCount);
  }

  selectWord(selectedCategories) {
    this.word = selectWord(selectedCategories);
  }

  addSelectedPlayer(playerId) {
    const player = this.players.find((p) => p.id === playerId);
    this.selectedPlayers.push(player);
  }

  selectStartingPlayer() {
    const randomIndex = Math.floor(Math.random() * this.players.length);
    this.startingPlayer = this.players[randomIndex];
  }
}

/**
 * Generate game session.
 * @param {string} gameMode
 * @param {*} selectedCategories
 * @param {*} players
 * @returns
 */
export function genGame(gameMode, selectedCategories, players) {
  return new Game(gameMode, selectedCategories, players);
}

export function renderGame(game) {
  if (game.selectedPlayers.length === game.players.length) {
    // All players have selected their words/impostor status, render the final screen.
    renderInstructions(game);
    return;
  }

  let playersListHTML = game.players
    .map((player) => {
      const isSelected = game.selectedPlayers.some((p) => p.id === player.id);
      return `
        <li class="player-item js-player-item ${isSelected ? 'greyed-out' : ''}" data-id="${player.id}">
          <span class="player-name">${player.name}
          </span>
        </li>
      `;
    })
    .join('');

  let gameHTML = `
  <h2>Select your name, reveal your word (or whether you're the impostor), then pass the device to the next player.</h2>
    <ul class="players-list">
      ${playersListHTML}
    </ul>
  `;

  const gameContainer = document.getElementById('main');
  gameContainer.innerHTML = gameHTML;

  const footer = document.getElementById('footer');
  footer.innerHTML = ``;

  ///// Event listeners. \\\\\\
  document.querySelectorAll('.js-player-item').forEach((item) => {
    if (item.classList.contains('greyed-out')) {
      return;
    }
    item.addEventListener('click', () => {
      renderWord(game, item.dataset.id);
      game.addSelectedPlayer(item.dataset.id);
    });
  });
}

function renderWord(game, playerId) {
  const isImpostor = game.impostors.some(
    (impostor) => impostor.id === playerId,
  );

  let wordHTML = `
    <h2>Category:</h2>
    <span class="bottom-text" style="margin-bottom: 20px">Example</span>
    <h2>${isImpostor ? 'You are the' : 'Your word is:'}</h2>
    <div class="word-container">
      <span class="bottom-text ${isImpostor ? 'impostor-word' : 'player-word'}">${isImpostor ? 'Impostor' : game.word}</span>
    </div>
    `;

  const wordContainer = document.getElementById('main');
  wordContainer.innerHTML = wordHTML;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <button id="back-btn" class="pink-btn">← Back</button>
  `;

  ////// Event listeners. \\\\\\

  document.getElementById('back-btn').addEventListener('click', () => {
    renderGame(game);
  });
}

function renderInstructions(game) {
  const instructionsContainer = document.getElementById('main');
  instructionsContainer.innerHTML = `<h2>Instructions</h2><p>Welcome to the game!</p>`;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <button id="reveal-impostor-btn" class="pink-btn">Reveal Impostor</button>
  `;

  console.log('Instructions');
}
