/**
 * Represents a game session with players, impostors, and non-impostors.
 * Default amount of players is 3.
 * @class
 */
class Game {
  constructor(gameMode, selectedCategories = []) {
    this.gameMode = gameMode;
    this.selectedCategories = selectedCategories;
    this.players = [];
    this.impostors = [];
    this.nonImpostors = [];
  }
}
