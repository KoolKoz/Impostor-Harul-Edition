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
    this.word = '';
  }

  /**
   * Selects impostors for the game session based on impostor count.
   * @param {number} impostorCount
   */
  selectImpostors(impostorCount) {
    // Randomly select impostors from the players array based on the impostor count.
    const shuffledPlayers = this.players.sort(() => 0.5 - Math.random());
    this.impostors = shuffledPlayers.slice(0, impostorCount);
    this.nonImpostors = shuffledPlayers.slice(impostorCount);
  }

  selectWord(selectedCategories) {
    this.word = selectWord(selectedCategories);
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
  let playersListHTML = game.players
    .map(
      (player) => `
        <li class="player-item js-player-item" data-id="${player.id}">
          <span class="player-name">${player.name}
          </span>
        </li>
      `,
    )
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
    <button id="reveal-impostor-btn" class="pink-btn">Reveal Impostor</button>
  `;

  ///// Event listeners. \\\\\\
  document.querySelectorAll('.js-player-item').forEach((item) => {
    if (item.classList.contains('greyed-out')) {
      return;
    }
    item.addEventListener('click', () => {
      renderWord(game);
    });
  });
}

// Do this after all players are selected.

// const footer = document.getElementById('footer');
//   footer.innerHTML = `
//     <button id="reveal-impostor-btn" class="pink-btn">Reveal Impostor</button>
//   `;

function renderWord(game) {
  let wordHTML = `
    <h2>Your word is:</h2>
    <div class="word-container">
      <span class="word">${game.word}</span>
    </div>
  `;

  const gameContainer = document.getElementById('main');
  gameContainer.innerHTML = wordHTML;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <button id="back-btn" class="pink-btn">← Back</button>
  `;

  ////// Event listeners. \\\\\\

  document.getElementById('back-btn').addEventListener('click', () => {
    renderGame(game);
  });
}
