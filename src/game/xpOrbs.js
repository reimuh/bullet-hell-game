import { XP_ORB_RADIUS, XP_ORB_FALL_SPEED, XP_PER_NORMAL_KILL, XP_PER_BOSS_KILL, CANVAS_HEIGHT } from "./constants";
 
import { rectCircleCollide } from "./collisions";
 
export function dropXpOrb(state, enemy) {
    state.xpOrbs.push({

        x: enemy.x,
        y: enemy.y,
        value: enemy.isBoss ? XP_PER_BOSS_KILL : XP_PER_NORMAL_KILL,

    });
}
 
export function updateXpOrbs(state, playerRect) {
    const remainingOrbs = [];
    let xpGained = 0;
 
    state.xpOrbs.forEach((orb) => {

        orb.y += XP_ORB_FALL_SPEED;
        
        if (orb.y - XP_ORB_RADIUS > CANVAS_HEIGHT) {
            return;
        }
        if (rectCircleCollide(playerRect.x, playerRect.y, playerRect.w, playerRect.h, orb.x, orb.y, XP_ORB_RADIUS)) {
            xpGained += orb.value;
        } else {
            remainingOrbs.push(orb);
        }
    });
 
    state.xpOrbs = remainingOrbs;
 
    return xpGained;
}