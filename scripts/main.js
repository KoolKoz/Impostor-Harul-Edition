import { genSettings, renderSettings } from './settings.js';
import { genGame } from './game.js';

import { players, savePlayersToStorage } from '../data/players.js';
import {
  impostorCount,
  saveImpostorCountToStorage,
} from '../data/impostors.js';
import { gameMode, saveGameModeToStorage } from '../data/game-mode.js';
import { selectedCategories } from '../data/categories.js';

navigator.serviceWorker?.register('sw.js');

const settings = genSettings(
  gameMode,
  selectedCategories,
  players,
  impostorCount,
);

renderSettings(settings);
