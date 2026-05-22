/**
 * Represents a game session with players, impostors, and non-impostors. WIP
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

function genGame(gameMode, selectedCategories) {}
