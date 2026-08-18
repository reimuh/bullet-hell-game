import { CANVAS_WIDTH, BOSS_HP } from "./constants.js";

// logic for controlling the boss

function spawnBoss(){

    return {
        id: `boss-${Math.random()}`,
        isBoss: true,
        x: CANVAS_WIDTH / 2,
        y: 120,
        hp: BOSS_HP,
        maxHp: BOSS_HP,
        shootTimer: 60,
        slowTimer: 0,
        slowFactor: 1,

    };
}

export function updateBosss (boss, state) {

    const sway = Math.sin(state.frameCount * 0.01  * boss.slowFactor);

    boss.x = CANVAS_WIDTH / 2 + sway * (CANVAS_WIDTH / 2 - BOSS_RADIUS - 40);

    fireBossPattern(boss, state);
}

function fireBossPattern(boss, state) {

    boss.shootTimer -= 1;

    if(boss.shootTimer > 0) {
        return;
    }

    const phase = Math.floor(state.frameCount / BOSS_PATTERN_SWITCH_FRAMES) % 2;

    // terminar aqui
}