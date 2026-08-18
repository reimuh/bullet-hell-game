import { PLAYER_BULLET_SPEED, PLAYER_BULLET_RADIUS_BASE } from "./constants.js";


export function updatePlayerBullets(state) {

    state.playerBullets = state.playerBullets
    .map((b) => ({ ...b, y: b.y - PLAYER_BULLET_SPEED }))

    .filter((b) => b.y + PLAYER_BULLET_RADIUS_BASE > 0);

}

export function updateEnemeyBullets(state) {

    state.enemyBullets = state.enemyBullets
    .map((b) => ({ ...b, y: b.y + b.speed }))
    .filter((b) => b.x > -20 && b.x < CANVAS_WIDTH + 20 && b.y < CANVAS_HEIGHT + 20);
}