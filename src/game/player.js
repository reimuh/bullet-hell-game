import { PLAYER_SIZE, PLAYER_SPEED, PLAYER_MAX_HEARTS, CANVAS_HEIGHT, CANVAS_WIDTH, XP_LEVEL_BASE} from './constants.js';


export function createPlayer(x, y, radius, hearts) {
    return {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT - PLAYER_SIZE - 60,
        hearts: PLAYER_MAX_HEARTS,
        level: 1,
        xp: 0,
        xpToNextLevel: XP_LEVEL_BASE,
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

export function updatePlayerFiring(player, keys, bullets){
    
}