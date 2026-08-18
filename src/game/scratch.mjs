import {createPlayer, updatePlayerMovement} from './player.js';
import {spawnWave} from './enemies.js';

const p = createPlayer();

updatePlayerMovement(p, { 'arrowup': true });

for (let i = 0; i < 500; i++) updatePlayerMovement(p, { arrowleft: true });

console.log(spawnWave(2))


