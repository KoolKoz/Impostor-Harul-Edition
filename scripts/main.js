import { Settings, genSettings } from './settings.js';

import { players, savePlayersToStorage } from '../data/players.js';
import {
  impostorCount,
  saveImpostorCountToStorage,
} from '../data/impostors.js';
import { gameMode, savegameModeToStorage } from '../data/game-mode.js';

//Debugging.
const settings = genSettings(
  gameMode,
  ['Animals', 'Food'],
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
