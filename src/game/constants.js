import React, { useEffect, useRef, useState } from "react";

export const CANVAS_WIDTH = 900;
// the pixel width of the play area

export const CANVAS_HEIGHT = 650;
// the pixel height of the play area



export const PLAYER_SIZE = 18;
// the width and height of the player square in px

export const PLAYER_SPEED = 4;
// how many pixels the player moves per frame when a movement key is held

export const PLAYER_FIRE_INTERVAL_BASE = 250;
// the base milliseconds between automatic player shots

export const PLAYER_FIRE_INTERVAL_MIN = 60;
// the fastest the player is ever allowed to fire

export const PLAYER_BULLET_SPEED = 7;
// how many pixels a player bullet travels up per frame

export const PLAYER_BULLET_RADIUS_BASE = 3;
// the base radius used to draw and collide player bullets

export const PLAYER_MAX_HEARTS = 3;
// how many hits the player can take before dying

export const PLAYER_INVULN_FRAMES = 90;
// how many frames the player is briefly invulnerable for after taking a hit



export const ENEMY_RADIUS = 18;
// the radius of a normal enemy circle in pixels

export const ENEMY_SPEED = 1.6;
// how many pixels a normal enemy moves

export const ENEMY_ZONE_BOTTOM = CANVAS_HEIGHT / 2;
// enemies are only allowed to roam in the top half of the canvas

export const ENEMY_BULLET_SPEED = 2;
// how many pixels a normal enemy's bullet travels per frame

export const ENEMY_BULLET_RADIUS = 4;
// the radius used to draw and collide enemy bullets, both normal and boss ones

export const ENEMY_FIRE_CHANCE = 0.02;
// the probability checked every frame per normal enemy that it fires a bullet

export const BASE_ENEMY_HP = 5;
// base enemy hp

export const HP_INCREASE_PER_WAVE = 3;
// how many extra hp each new wave adds to every normal enemy



export const XP_ORB_RADIUS = 6;
// the radius used to draw and collide experience orbs dropped by dead enemies

export const XP_ORB_FALL_SPEED = 1.8;
// how many pixels an experience orb falls per frame after being dropped

export const XP_PER_NORMAL_KILL = 5;
// how much experience a normal enemy's orb is worth

export const XP_PER_BOSS_KILL = 150;
// how much experience the boss's orb is worth

export const XP_LEVEL_BASE = 10;
// how much experience is needed to go from level 1 to level 2

export const XP_LEVEL_GROWTH = 6;
// how much more experience each subsequent level requires



export const BOSS_WAVE = 5;
// the wave number on which the boss appears instead of normal enemies

export const BOSS_RADIUS = 55;
// the radius of the boss circle, in pixels, much bigger than a normal enemy

export const BOSS_HP = 400;
// the boss's starting and maximum hit points

export const BOSS_RING_BULLET_SPEED = 1.4;
// how fast bullets travel in the boss's spinning ring pattern

export const BOSS_AIMED_BULLET_SPEED = 2.8;
// how fast bullets travel in the boss's pattern

export const BOSS_PATTERN_SWITCH_FRAMES = 240;
// how many frames the boss spends on one attack pattern before switching to the other



export const SLOW_DURATION_FRAMES = 90;
// how many frames a slowed enemy stays slowed after being hit

export const SLOW_STEP = 0.12;
// how much extra slow percentage each slowing field card adds

export const MAX_SLOW_PERCENT = 0.7;
// the maximum fraction an enemy's speed can ever be reduced to

export const BULLET_RADIUS_STEP = 1.5;
// how many extra pixels of bullet radius each bigger bullets card adds

export const FIRE_RATE_MULTIPLIER_STEP = 0.85;
// each faster shooting card multiplies the fire interval by this

export const BULLET_DAMAGE_STEP = 1;
// how much extra damage each more damage card adds to every player bullet

export const CARD_DEFS = [
    {
        id: "bigger_bullets",
        title: "Bigger Bullets",
        desc: "Your bullets are bigger, making them easier to hit enemies with.",
    },
    {
        id: "faster_shooting",
        title: "Faster Shooting",
        desc: "You shoot faster, allowing you to fire more bullets in the same amount of time.",
    },
    {
        id: "more_damage",
        title: "More Damage",
        desc: "Your bullets deal more damage, making them more effective against enemies.",
    },
    {
        id: "slowing_field",
        title: "Slowing Field",
        desc: "Your bullets slow down enemies, making them easier to hit.",
    },
];