import genId from './utils/id.js';

import {
  players,
  savePlayersToStorage,
  addPlayer,
  removePlayer,
  editPlayerName,
  renderPlayersTab,
} from '../data/players.js';
import {
  impostorCount,
  saveImpostorCountToStorage,
  updateImpostorCountOnRemovePlayer,
  toggleImpostorCount,
} from '../data/impostors.js';
import {
  gameMode,
  saveGameModeToStorage,
  setGameMode,
} from '../data/game-mode.js';
import { selectedCategories, toggleCategory } from '../data/categories.js';

import { genGame, renderGame } from './game.js';

/**
 * Settings.
 * Default game mode is 'Word Game'.
 * @class
 */
export class Settings {
  constructor(gameMode, selectedCategories, players, impostorCount) {
    this.gameMode = gameMode;
    this.selectedCategories = selectedCategories;
    this.players = players;
    this.impostorCount = impostorCount;
  }

  /**
   * Adds a player to the game with a unique ID.
   * @returns
   */
  addPlayer() {
    addPlayer();
    this.players = players;
    return true;
  }

  /**
   * Removes a player from the game based on their ID.
   * @param {*} playerId
   * @returns
   */
  removePlayer(playerId) {
    const ok = removePlayer(playerId);
    if (!ok) return false;
    this.players = players;

    // Update impostor count if player count is less than or equal to impostor count.
    updateImpostorCountOnRemovePlayer();
    this.impostorCount = impostorCount;
    return true;
  }

  /**
   * Edits the name of a player based on their ID.
   * @param {*} playerId
   * @param {*} newName
   * @returns
   */
  editPlayerName(playerId, newName) {
    const ok = editPlayerName(playerId, newName);
    if (!ok) return false;
    this.players = players;
    return true;
  }

  /**
   * Toggles the impostor count.
   * @returns
   */
  toggleImpostorCount() {
    toggleImpostorCount();
    this.impostorCount = impostorCount;
    renderSettings(this);
    return true;
  }

  /**
   * Sets the game mode. Possible game modes: 'Word Game', 'Charades'.
   * @param {*} gameMode
   * @returns
   */
  setGameMode(selectedGameMode) {
    setGameMode(selectedGameMode);
    this.gameMode = selectedGameMode;
    return true;
  }

  /**
   * Toggles a category. Possible categories: 'People/Pets', 'Games', 'Places', 'Objects', 'Animals'.
   * @param {*} category
   */
  toggleCategory(category) {
    toggleCategory(category);
    this.selectedCategories = selectedCategories;
    return true;
  }
}

/**
 * Generate settings object.
 * @param {*} gameMode
 * @param {*} selectedCategories
 * @param {*} players
 * @param {*} impostorCount
 * @returns
 */
export function genSettings(
  gameMode,
  selectedCategories,
  players,
  impostorCount,
) {
  return new Settings(gameMode, selectedCategories, players, impostorCount);
}

export function renderSettings(settings) {
  let settingsHTML = `
    <h2>Players</h2>
      <div class="settings-btn-container">
        <button id="players-btn" class="settings-btn">
          <span class="top-text">Players</span>
          <span class="bottom-text">${settings.players.length}</span>
        </button>
        <button id="impostors-btn" class="settings-btn">
          <span class="top-text">Impostors</span>
          <input
            type="number"
            class="bottom-text input-field"
            value="${settings.impostorCount}"
            min="1"
            max="3"
          />
        </button>
      </div>
      <h2>Game Mode</h2>
      <div class="settings-btn-container">
        <button id="word-btn" class="settings-btn ${settings.gameMode === 'Word Game' ? 'selected' : ''}">
          <span class="bottom-text">Word Game</span>
        </button>
        <button id="charades-btn" class="settings-btn ${settings.gameMode === 'Charades' ? 'selected' : ''}">
          <span class="bottom-text">Charades</span>
        </button>
      </div>
      <h2>Categories</h2>
      <div class="settings-btn-container">
        <button id="categories-btn" class="settings-btn">
          <span class="bottom-text">Show Categories</span>
        </button>
      </div>
  `;

  const settingsContainer = document.getElementById('main');
  settingsContainer.innerHTML = settingsHTML;

  const footer = document.getElementById('footer');
  footer.innerHTML = `
    <button id="start-btn" class="pink-btn">Start</button>
  `;

  ////// Event listeners. \\\\\\

  document.getElementById('players-btn').addEventListener('click', () => {
    renderPlayersTab(settings);
  });

  document.getElementById('impostors-btn').addEventListener('click', () => {
    settings.toggleImpostorCount();

    // Debugging.
    console.log(settings);
  });

  document.getElementById('word-btn').addEventListener('click', () => {
    settings.setGameMode('Word Game');

    document.getElementById('word-btn').classList.add('selected');
    document.getElementById('charades-btn').classList.remove('selected');

    // Debugging.
    console.log(settings);
  });

  document.getElementById('charades-btn').addEventListener('click', () => {
    settings.setGameMode('Charades');

    document.getElementById('charades-btn').classList.add('selected');
    document.getElementById('word-btn').classList.remove('selected');

    // Debugging.
    console.log(settings);
  });

  document.getElementById('start-btn').addEventListener('click', () => {
    const game = genGame(
      settings.gameMode,
      settings.selectedCategories,
      settings.players,
    );
    renderGame(game, settings);
    game.selectImpostors(settings.impostorCount);

    // Debugging.
    console.log(game);
  });
}
