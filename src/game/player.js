import { PLAYER_SIZE, PLAYER_SPEED, PLAYER_MAX_HEARTS, CANVAS_HEIGHT, CANVAS_WIDTH, XP_LEVEL_BASE, XP_LEVEL_GROWTH, PLAYER_FIRE_INTERVAL_BASE, PLAYER_FIRE_INTERVAL_MIN} from './constants.js';


export function createPlayer(x, y, radius, hearts) {

    return {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - PLAYER_SIZE - 60,
        hearts: PLAYER_MAX_HEARTS,
        level: 1,
        xp: 0,
        xpToNext: XP_LEVEL_BASE,
        invulnTimer: 0,
    }
}



export function updatePlayerMovement(player, keys){

    const speed = PLAYER_SPEED;

    if (keys['arrowup'] || keys['w']) {
        player.y -= speed;
    }
    if (keys['arrowdown'] || keys['s']) {
        player.y += speed;
    }
    if (keys['arrowleft'] || keys['a']){
        player.x -= speed;
    }
    if (keys['arrowright'] || keys['d']){
        player.x += speed;
    }

    player.x = Math.max(0, Math.min(CANVAS_WIDTH - PLAYER_SIZE, player.x));
    player.y = Math.max(0, Math.min(CANVAS_HEIGHT - PLAYER_SIZE, player.y));

}



export function updatePlayerFiring(state, timestamp){

    if (!state.keys[' ']) {
        return;
    }

    const fireInterval = Math.max(
        PLAYER_FIRE_INTERVAL_MIN,
        PLAYER_FIRE_INTERVAL_BASE * state.upgrades.fireIntervalMultiplier
    );

    if (timestamp - state.lastShotTime < fireInterval) {
        return;
    }

    state.lastShotTime = timestamp;
    state.playerBullets.push({

        x: state.player.x + PLAYER_SIZE / 2,
        y: state.player.y,

    });

}


export function levelUpPlayer(player){

    player.xp -= player.xpToNext;
    player.level += 1;
    player.xpToNext += XP_LEVEL_GROWTH;

}
