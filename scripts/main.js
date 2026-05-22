import { Settings, genSettings } from './settings.js';

import { players, savePlayersToStorage } from '../data/players.js';
import {
  impostorCount,
  saveImpostorCountToStorage,
} from '../data/impostors.js';
import { gameMode, saveGameModeToStorage } from '../data/game-mode.js';
import { selectedCategories } from '../data/categories.js';

//Debugging.
const settings = genSettings(
  gameMode,
  selectedCategories,
  players,
  impostorCount,
);
console.log(settings);

settings.toggleImpostorCount();
console.log(settings);

settings.removePlayer(players[0].id);
console.log(settings);

settings.addPlayer();
console.log(settings);

settings.removePlayer(players[3].id);
console.log(settings);

settings.removePlayer(players[2].id);
console.log(settings);

settings.toggleCategory('Animals');
console.log(settings);
