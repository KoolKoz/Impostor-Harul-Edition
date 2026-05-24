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
