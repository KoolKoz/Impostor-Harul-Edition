import { genSettings, renderSettings } from './settings.js';
import { genGame } from './game.js';

import { players, savePlayersToStorage } from '../data/players.js';
import {
  impostorCount,
  saveImpostorCountToStorage,
} from '../data/impostors.js';
import { gameMode, saveGameModeToStorage } from '../data/game-mode.js';
import { selectedCategories } from '../data/categories.js';

// Debugging.
export const settings = genSettings(
  gameMode,
  selectedCategories,
  players,
  impostorCount,
);
console.log(settings);

renderSettings(settings);

// const game = genGame(
//   settings.gameMode,
//   settings.selectedCategories,
//   settings.players,
// );
// console.log(game);

// game.selectImpostors(settings.impostorCount);
// console.log(game);
