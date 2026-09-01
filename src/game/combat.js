import { BOSS_RADIUS, ENEMY_RADIUS, ENEMY_BULLET_RADIUS, PLAYER_BULLET_RADIUS_BASE, PLAYER_INVULN_FRAMES, SLOW_DURATION_FRAMES } from "./constants";
import { circlesCollide, rectCircleCollide } from "./collisions";
import { dropXpOrb } from "./xpOrbs";

export function resolvePlayerBulletsVsEnemies(state) {
    const effectiveBulletRadius = PLAYER_BULLET_RADIUS_BASE + state.upgrades.bulletRadiusBonus;

    const survivingEnemies = [];
    let scoreGained = 0;

    state.enemies.forEach((enemy) => {
        let hitCount = 0;
        state.playerBullets = state.playerBullets.filter((b) => {
            const enemyRadius = enemy.isBoss ? BOSS_RADIUS : ENEMY_RADIUS;
            if (circlesCollide(b.x, b.y, effectiveBulletRadius, enemy.x, enemy.y, enemyRadius)) {
                hitCount += 1;
                return false;
            }
            return true;
        });

        if (hitCount > 0) {
            enemy.hp -= hitCount * state.upgrades.bulletDamage;
            if (state.upgrades.slowPercent > 0) {
                enemy.slowFactor = 1 - state.upgrades.slowPercent;
                enemy.slowTimer = SLOW_DURATION_FRAMES;
            }
        }

        if (enemy.hp > 0) {
            survivingEnemies.push(enemy);
        } else {
            scoreGained += enemy.isBoss ? 5000 : 100;
            dropXpOrb(state, enemy);
        }
    });

    state.enemies = survivingEnemies;

    return scoreGained;
}


export function resolveHitsOnPlayer(state, playerRect) {
    const wasHit = state.enemyBullets.some((b) =>
        rectCircleCollide(playerRect.x, playerRect.y, playerRect.w, playerRect.h, b.x, b.y, ENEMY_BULLET_RADIUS)
    );

    const wasRammed = state.enemies.some((enemy) =>
        rectCircleCollide(
            playerRect.x,
            playerRect.y,
            playerRect.w,
            playerRect.h,
            enemy.x,
            enemy.y,
            enemy.isBoss ? BOSS_RADIUS : ENEMY_RADIUS
        )
    );

    if (state.player.invulnTimer > 0) {
        state.player.invulnTimer -= 1;
    }

    let tookDamage = false;
    let died = false;

    if ((wasHit || wasRammed) && state.player.invulnTimer <= 0) {
        state.player.hearts -= 1;
        state.player.invulnTimer = PLAYER_INVULN_FRAMES;
        tookDamage = true;

        if (state.player.hearts <= 0) {
            state.dead = true;
            died = true;
        }
    }

    return { tookDamage, died };
}