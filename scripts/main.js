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
