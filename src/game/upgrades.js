import { CARD_DEFS, BULLET_DAMAGE_STEP, BULLET_RADIUS_STEP, FIRE_RATE_MULTIPLIER_STEP, MAX_SLOW_PERCENT, SLOW_STEP } from "./constants.js";



//player upgrades



export function applyUpgrade(upgradeId, s){

    if (upgradeId === "bigger_bullets") {

        s.upgrades.bulletRadiusBonus += BULLET_RADIUS_STEP;

    } else if (upgradeId === "faster_shooting") {

        s.upgrades.fireIntervalMultiplier *= FIRE_RATE_MULTIPLIER_STEP;

    } else if (upgradeId === "more_damage") {

        s.upgrades.bulletDamage += BULLET_DAMAGE_STEP;

    } else if (upgradeId === "slowing_field") {

        s.upgrades.slowPercent = Math.min(MAX_SLOW_PERCENT, s.upgrades.slowPercent + SLOW_STEP);

    }

}



export function shuffledCards(){

    const copy =[...CARD_DEFS];



    for (let i = copy.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));



        const temp = copy[i];

        copy[i] = copy[j];

        copy[j] = temp;



    }

    return copy;

}

