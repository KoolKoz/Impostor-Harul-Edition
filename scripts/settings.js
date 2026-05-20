import genId from './utils/id.js';

/**
 * Settings.
 * Default game mode is 'Word Game'.
 * @class
 */
export class Settings {
  constructor(gameMode, selectedCategories, players) {
    this.gameMode = gameMode;
    this.selectedCategories = selectedCategories;
    this.players = players;
    this.impostorCount = 1; // Temporary default val; will be updated based on localStorage.
  }

  /**
   * Adds a player to the game with a unique ID.
   * @returns
   */
  addPlayer() {
    this.players.push({
      name: `Player ${this.players.length + 1}`,
      id: genId(),
    });
    return true;
  }

  /**
   * Removes a player from the game based on their ID.
   * @param {*} playerId
   * @returns
   */
  removePlayer(playerId) {
    this.players = this.players.filter((player) => player.id !== playerId);

    // Update impostor count if player count is less than or equal to impostor count.
    if (this.players.length <= this.impostorCount) {
      this.impostorCount = this.players.length - 1;
    }
    return true;
  }

  /**
   * Edits the name of a player based on their ID.
   * @param {*} playerId
   * @param {*} newName
   * @returns
   */
  editPlayerName(playerId, newName) {
    const player = this.players.find((player) => player.id === playerId);
    if (player) {
      player.name = newName;
      return true;
    }
    return false;
  }

  /**
   * Toggles the impostor count.
   * @returns
   */
  toggleImpostorCount() {
    let currentImpostorCount = this.impostorCount;

    if (currentImpostorCount >= this.players.length - 1) {
      this.impostorCount = 1;
    } else {
      this.impostorCount = currentImpostorCount + 1;
    }
    return true;
  }

  /**
   * Sets the game mode. Possible game modes: 'Word Game', 'Question Game', 'Charades'.
   * @param {*} gameMode
   * @returns
   */
  setGameMode(gameMode) {
    this.gameMode = gameMode;
    return true;
  }

  /**
   * Toggles a category. Possible categories: 'People/Pets', 'Games', 'Places', 'Objects', 'Animals'.
   * @param {*} category
   */
  toggleCategory(category) {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(
        (cat) => cat !== category,
      );
    } else {
      this.selectedCategories.push(category);
    }
    return true;
  }
}

function genSettings(gameMode, selectedCategories, players) {
  return new Settings(gameMode, selectedCategories, players);
}
