import { CANVAS_WIDTH, BOSS_HP, BOSS_RADIUS, PLAYER_SIZE, BOSS_PATTERN_SWITCH_FRAMES, BOSS_RING_BULLET_SPEED, BOSS_AIMED_BULLET_SPEED } from "./constants.js";


// logic for controlling the boss


export function spawnBoss(){

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



export function updateBoss (boss, state) {

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



    if (phase === 0) {

        const bulletCount = 20;

        const angleOffset = (state.frameCount * 3 * Math.PI) / 180;

        for (let i = 0; i < bulletCount; i++) {



            const angle = angleOffset + (i * (2 * Math.PI)) / bulletCount;



            state.enemyBullets.push({

                x: boss.x,
                y: boss.y,



                vx: Math.cos(angle) * BOSS_RING_BULLET_SPEED,
                vy: Math.sin(angle) * BOSS_RING_BULLET_SPEED,

            });

        }

        boss.shootTimer = 14;

    } else {

        const targetX = state.player.x + PLAYER_SIZE / 2;
        const targetY = state.player.y + PLAYER_SIZE / 2;

        const dx = targetX - boss.x;
        const dy = targetY - boss.y;

        const baseAngle = Math.atan2(dy, dx);

        const bulletCount = 5;

        const spread = (30 * Math.PI) / 180;



        for (let i = 0; i < bulletCount; i++) {

            const t = bulletCount === 1 ? 0 : i / (bulletCount - 1) - 0.5;

            const angle = baseAngle + t * spread;



            state.enemyBullets.push({

                x: boss.x,
                y: boss.y,

                vx: Math.cos(angle) * BOSS_AIMED_BULLET_SPEED,
                vy: Math.sin(angle) * BOSS_AIMED_BULLET_SPEED,

            });

        }

        

        boss.shootTimer = 40;

    }

}
