import genId from './utils/id.js';

import {
  players,
  savePlayersToStorage,
  addPlayer,
  removePlayer,
  editPlayerName,
} from '../data/players.js';
import {
  impostorCount,
  saveImpostorCountToStorage,
  updateImpostorCountOnRemovePlayer,
  toggleImpostorCount,
} from '../data/impostors.js';
import { gameMode, saveGameModeToStorage } from '../data/game-mode.js';
import { selectedCategories, toggleCategory } from '../data/categories.js';

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
    return true;
  }

  /**
   * Sets the game mode. Possible game modes: 'Word Game', 'Question Game', 'Charades'.
   * @param {*} gameMode
   * @returns
   */
  setGameMode(selectedGameMode) {
    setGameMode(selectedGameMode);
    this.gameMode = gameMode;
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
