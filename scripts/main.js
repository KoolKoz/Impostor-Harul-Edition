import { Settings } from './settings.js';

//Debugging.
const settings = new Settings('Word Game', ['Animals', 'Food', 'Countries']);
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

settings.toggleGameMode();
console.log(settings);

settings.toggleGameMode();
console.log(settings);
