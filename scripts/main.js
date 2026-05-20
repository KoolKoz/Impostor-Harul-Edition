import { Settings } from './settings.js';

//Debugging.
const settings = new Settings(
  'Word Game',
  ['Animals', 'Food', 'Countries'],
  [
    { name: 'Player 1', id: '123' },
    { name: 'Player 2', id: '456' },
    { name: 'Player 3', id: '789' },
  ],
);
console.log(settings);

settings.addPlayer();
console.log(settings);

settings.addPlayer();
console.log(settings);

settings.editPlayerName(settings.players[0].id, 'John');
console.log(settings);

// settings.removePlayer(settings.players[0].id);
// console.log(settings);

settings.addPlayer();
console.log(settings);

settings.toggleImpostorCount();
console.log(settings);

settings.toggleImpostorCount();
console.log(settings);

settings.toggleImpostorCount();
console.log(settings);

settings.removePlayer(settings.players[0].id);
console.log(settings);

settings.setGameMode('Question Game');
console.log(settings);

settings.setGameMode('Charades');
console.log(settings);

settings.toggleCategory('People');
console.log(settings);

settings.toggleCategory('Places');
console.log(settings);

settings.toggleCategory('Food');
console.log(settings);
