import { BOSS_WAVE, HP_INCREASE_PER_WAVE, BASE_ENEMY_HP, CANVAS_HEIGHT, CANVAS_WIDTH, ENEMY_SPEED, ENEMY_ZONE_BOTTOM, ENEMY_RADIUS, ENEMY_FIRE_CHANCE, ENEMY_BULLET_SPEED, PLAYER_SIZE, } from "./constants.js";
import { spawnBoss } from "./boss.js";


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

export function decrementSlowTimer(enemy) {

    if (enemy.slowTimer > 0) {
        enemy.slowTimer -= 1;
        if (enemy.slowTimer <= 0) {
            enemy.slowFactor = 1;
        }
    }
}

export function updateEnemy(enemy, state) {

    enemy.x += enemy.vx * enemy.slowFactor;
    enemy.y += enemy.vy * enemy.slowFactor;

    if (enemy.x < ENEMY_RADIUS || enemy.x > CANVAS_WIDTH - ENEMY_RADIUS) {
        enemy.vx *= -1;
        enemy.x = Math.max(ENEMY_RADIUS, Math.min(CANVAS_WIDTH - ENEMY_RADIUS, enemy.x));
    }

    if (enemy.y < ENEMY_RADIUS || enemy.y > ENEMY_ZONE_BOTTOM - ENEMY_RADIUS) {
        enemy.vy *= -1;
        enemy.y = Math.max(ENEMY_RADIUS, Math.min(ENEMY_ZONE_BOTTOM - ENEMY_RADIUS, enemy.y));

    }

    enemy.changeDirIn -= 1;

    if (enemy.changeDirIn <= 0) {
        enemy.vx = (Math.random() - 0.5) * ENEMY_SPEED;
        enemy.vy = (Math.random() - 0.5) * ENEMY_SPEED;
        enemy.changeDirIn = 60 + Math.floor(Math.random() * 60);
    }

    if (Math.random() < ENEMY_FIRE_CHANCE) {
        const targetX = state.player.x + PLAYER_SIZE / 2;
        const targetY = state.player.y + PLAYER_SIZE / 2;
        const dx = targetX - enemy.x;
        const dy = targetY - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        state.enemyBullets.push({
            x: enemy.x,
            y: enemy.y,
            vx: (dx / dist) * ENEMY_BULLET_SPEED,
            vy: (dy / dist) * ENEMY_BULLET_SPEED,
            
        });
    }
}