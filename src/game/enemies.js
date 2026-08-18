import { BOSS_WAVE, HP_INCREASE_PER_WAVE, BASE_ENEMY_HP, CANVAS_HEIGHT, CANVAS_WIDTH, ENEMY_SPEED, ENEMY_ZONE_BOTTOM, } from "./constants.js";


export function spawnWave(waveNumber) {
    if (waveNumber === BOSS_WAVE){
        return [spawnBoss()];
    }

    let enemyCount = 0;

    if (waveNumber > 5) {
        enemyCount = 5;
    } else {
        enemyCount = waveNumber;
    }
    

    const hp = BASE_ENEMY_HP + (waveNumber - 1) * HP_INCREASE_PER_WAVE;

    const enemies = [];

    for (let i = 0; i < enemyCount; i++) {
        enemies.push({
            id: `${waveNumber}-${i}-${Math.random()}`,
            isBoss: false,
            x: Math.random() * CANVAS_WIDTH,
            y: 40 + Math.random() * (ENEMY_ZONE_BOTTOM - 80),
            vx: (Math.random() - 0.5) * ENEMY_SPEED,
            vy: (Math.random() - 0.5) * ENEMY_SPEED,
            hp: hp,
            maxHp: hp,
            changeDirIn: 60 + Math.floor(Math.random() * 60),
            slowTimer: 0,
            slowFactor: 1,
        });
    }
    return enemies;
}

