import { selectCategory, selectWord } from '../data/categories.js';
import { renderSettings } from './settings.js';

/**
 * Represents a game session with players, impostors, and non-impostors. WIP
 * Default amount of players is 3.
 * @class
 */
class Game {
  constructor(gameMode, selectedCategories, players) {
    this.gameMode = gameMode;
    this.selectedCategories = selectedCategories;
    this.selectedCategory = selectCategory(selectedCategories);
    this.players = players;
    this.impostors = [];
    this.nonImpostors = [];
    this.selectedPlayers = [];
    this.startingPlayer = this.selectStartingPlayer();
    this.word = selectWord(this);
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

  addSelectedPlayer(playerId) {
    const player = this.players.find((p) => p.id === playerId);
    this.selectedPlayers.push(player);
  }

  selectStartingPlayer() {
    const randomIndex = Math.floor(Math.random() * this.players.length);
    return this.players[randomIndex];
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

export function renderGame(game, settings) {
  if (game.selectedPlayers.length === game.players.length) {
    // All players have selected their words/impostor status, render the final screen.
    renderInstructions(game, settings);
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
  footer.innerHTML = `
    <button id="quit-btn" class="pink-btn">&times; Quit</button>
  `;

  ///// Event listeners. \\\\\\
  document.querySelectorAll('.js-player-item').forEach((item) => {
    if (item.classList.contains('greyed-out')) {
      return;
    }
    item.addEventListener('click', () => {
      renderWord(game, item.dataset.id, settings);
      game.addSelectedPlayer(item.dataset.id);
    });
  });

  document.getElementById('quit-btn').addEventListener('click', () => {
    const header = document.getElementById('header');
    header.classList.remove('h1-fade-out');
    header.classList.add('h1-fade-in');

    renderSettings(settings);
  });
}

function renderWord(game, playerId, settings) {
  const isImpostor = game.impostors.some(
    (impostor) => impostor.id === playerId,
  );

  let wordHTML = `
    <h2>Category:</h2>
    <span class="bottom-text" style="margin-bottom: 20px">${game.selectedCategory}</span>
    <h2>${isImpostor ? 'You are the' : 'Your word is:'}</h2>
    <div class="word-container">
      <span class="bottom-text ${isImpostor ? 'impostor-word' : 'player-word'}">${isImpostor ? 'Impostor' : game.word}</span>
    </div>
    `;

  const wordContainer = document.getElementById('main');
  wordContainer.innerHTML = wordHTML;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <button id="back-btn" class="pink-btn">Got it!</button>
  `;

  ////// Event listeners. \\\\\\

  document.getElementById('back-btn').addEventListener('click', () => {
    renderGame(game, settings);
  });
}

function renderInstructions(game, settings) {
  const instructionsContainer = document.getElementById('main');
  instructionsContainer.innerHTML = `
  <h2>Instructions</h2>
  <div class="instructions-divider">
  <p class="instructions"><u>${game.startingPlayer.name}</u> starts.</p>
  <p class="instructions">Go <u>clockwise</u>.</p>
  <p class="instructions">Say a word/phrase related to the secret word.</p>
  <p class="instructions">Vote.</p>
  </div>
  `;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <button id="reveal-impostor-btn" class="pink-btn">Reveal Impostor</button>
  `;

  ////// Event listeners. \\\\\\

  document
    .getElementById('reveal-impostor-btn')
    .addEventListener('click', () => {
      renderImpostor(game, settings);
    });
}

function renderImpostor(game, settings) {
  const impostorContainer = document.getElementById('main');
  impostorContainer.innerHTML = `
    <h2>${game.impostors.length > 1 ? 'The impostors were:' : 'The impostor was:'}</h2>
    <span class="bottom-text impostor-word">${game.impostors.map((impostor) => impostor.name).join(', ')}</span>
    `;

  const footer = document.getElementById('footer');
  footer.innerHTML = `<button id="back-btn" class="pink-btn">← Back</button>`;

  ////// Event listeners. \\\\\\

  document.getElementById('back-btn').addEventListener('click', () => {
    const header = document.getElementById('header');
    header.classList.remove('h1-fade-out');
    header.classList.add('h1-fade-in');

    renderSettings(settings);
  });
}
