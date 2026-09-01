import { PLAYER_SIZE, XP_LEVEL_BASE } from "./constants";
import { createPlayer, updatePlayerMovement, updatePlayerFiring, levelUpPlayer } from "./player";
import { spawnWave, decrementSlowTimer, updateEnemy } from "./enemies";
import { updateBoss } from "./boss";
import { updatePlayerBullets, updateEnemyBullets } from "./bullets";
import { updateXpOrbs } from "./xpOrbs";
import { resolvePlayerBulletsVsEnemies, resolveHitsOnPlayer } from "./combat";
import { shuffledCards } from "./upgrades";

export function createInitialState() {
    return {
        player: createPlayer(),
        upgrades: {
            bulletRadiusBonus: 0,
            fireIntervalMultiplier: 1,
            bulletDamage: 1,
            slowPercent: 0,
        },
        keys: {},
        playerBullets: [],
        enemyBullets: [],
        enemies: spawnWave(1),
        xpOrbs: [],
        waveNumber: 1,
        lastShotTime: 0,
        frameCount: 0,
        dead: false,
        paused: false,
    };

}
 
export function update(state, timestamp) {
    const events = {
        scoreGained: 0,
        xpGained: 0,
        leveledUp: false,
        newCards: null,
        tookDamage: false,
        died: false,
        waveAdvanced: false,
        newWave: null,
    };
 
    if (state.dead || state.paused) {
        return events;
    }
 
    state.frameCount += 1;
 
    updatePlayerMovement(state.player, state.keys);
    updatePlayerFiring(state, timestamp);
    updatePlayerBullets(state);
 
    state.enemies.forEach((enemy) => {
        decrementSlowTimer(enemy);
        if (enemy.isBoss) {
            updateBoss(enemy, state);
        } else {
            updateEnemy(enemy, state);
        }
    });
 
    updateEnemyBullets(state);
 
    events.scoreGained = resolvePlayerBulletsVsEnemies(state);
 
    const playerRect = { x: state.player.x, y: state.player.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
 
    events.xpGained = updateXpOrbs(state, playerRect);
 
    if (events.xpGained > 0) {
        state.player.xp += events.xpGained;
    }
 
    if (!state.paused && state.player.xp >= state.player.xpToNext) {
        levelUpPlayer(state.player);
        state.paused = true;
        events.leveledUp = true;
        events.newCards = shuffledCards();

    }
 
    const hitResult = resolveHitsOnPlayer(state, playerRect);
    events.tookDamage = hitResult.tookDamage;
    events.died = hitResult.died;
 
    if (state.enemies.length === 0 && !state.dead) {
        state.waveNumber += 1;
        state.enemies = spawnWave(state.waveNumber);
        events.waveAdvanced = true;
        events.newWave = state.waveNumber;
        
    }

 
    return events;
}