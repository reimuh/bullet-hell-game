import { CANVAS_WIDTH, CANVAS_HEIGHT, ENEMY_ZONE_BOTTOM, PLAYER_SIZE, PLAYER_BULLET_RADIUS_BASE, XP_ORB_RADIUS, ENEMY_RADIUS, BOSS_RADIUS, ENEMY_BULLET_RADIUS,} from "../game/constants";


export function draw(ctx, state) {
    ctx.fillStyle = "#0b0b14";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(0, ENEMY_ZONE_BOTTOM);
    ctx.lineTo(CANVAS_WIDTH, ENEMY_ZONE_BOTTOM);
    ctx.stroke();

    const isFlickeredOut = state.player.invulnTimer > 0 && Math.floor(state.frameCount / 4) % 2 === 0;
    if (!isFlickeredOut) {
        ctx.fillStyle = "#5ee1ff";
        ctx.fillRect(state.player.x, state.player.y, PLAYER_SIZE, PLAYER_SIZE);
    }

    const effectiveBulletRadius = PLAYER_BULLET_RADIUS_BASE + state.upgrades.bulletRadiusBonus;
    ctx.fillStyle = "#ffe066";
    state.playerBullets.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, effectiveBulletRadius, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.fillStyle = "#b6ff6b";
    state.xpOrbs.forEach((orb) => {
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, XP_ORB_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    });
    

    state.enemies.forEach((enemy) => {
        if (enemy.isBoss) {
            ctx.fillStyle = "#c26bff";
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, BOSS_RADIUS, 0, Math.PI * 2);
            ctx.fill();

            const barWidth = CANVAS_WIDTH - 40;
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.fillRect(20, 14, barWidth, 10);
            ctx.fillStyle = "#c26bff";
            ctx.fillRect(20, 14, barWidth * (enemy.hp / enemy.maxHp), 10);
        } else {
            ctx.fillStyle = "#ff5d8f";
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, ENEMY_RADIUS, 0, Math.PI * 2);
            ctx.fill();

            const barWidth = ENEMY_RADIUS * 2;
            const barX = enemy.x - ENEMY_RADIUS;
            const barY = enemy.y - ENEMY_RADIUS - 10;
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.fillRect(barX, barY, barWidth, 4);
            ctx.fillStyle = "#7CFC7C";
            ctx.fillRect(barX, barY, barWidth * (enemy.hp / enemy.maxHp), 4);
        }
    });


    ctx.fillStyle = "#ff9d4d";
    state.enemyBullets.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, ENEMY_BULLET_RADIUS, 0, Math.PI * 2);
        ctx.fill();
    });
}