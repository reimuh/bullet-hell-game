import { useRef, useState } from "react";
import { CANVAS_WIDTH, CANVAS_HEIGHT, PLAYER_MAX_HEARTS, XP_LEVEL_BASE } from "../game/constants";
import { applyUpgrade } from "../game/upgrades";
import { useGameLoop } from "../hooks/useGameLoop";
import { useKeyboard } from "../hooks/useKeyboard";
import HUD from "./Hud";
import LevelUpOverlay from "./LevelUpOverlay";
import GameOverOverlay from "./GameOverOverlay";


export default function BulletHell() {
    const canvasRef = useRef(null);
 
    const [score, setScore] = useState(0);
    const [wave, setWave] = useState(1);
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
    const [xpToNext, setXpToNext] = useState(XP_LEVEL_BASE);
    const [hearts, setHearts] = useState(PLAYER_MAX_HEARTS);
    const [gameOver, setGameOver] = useState(false);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [levelUpOptions, setLevelUpOptions] = useState([]);
    const [runId, setRunId] = useState(0);
 
    function resetUI() {
        setScore(0);
        setWave(1);
        setLevel(1);
        setXp(0);
        setXpToNext(XP_LEVEL_BASE);
        setHearts(PLAYER_MAX_HEARTS);
        setGameOver(false);
        setShowLevelUp(false);
        setLevelUpOptions([]);

    }
 
    const stateRef = useGameLoop({
        canvasRef,
        runId,
        setters: {
            setScore,
            setWave,
            setLevel,
            setXp,
            setXpToNext,
            setHearts,
            setGameOver,
            setShowLevelUp,
            setLevelUpOptions,
            resetUI,
        },
    });
 
    useKeyboard(stateRef);
 
    function handleCardChoice(cardId) {
        applyUpgrade(cardId, stateRef.current);
        stateRef.current.paused = false;
        setShowLevelUp(false);

    }
 
    function handleRestart() {
        setRunId((id) => id + 1);
    }
 
    return (
        <div className="flex flex-col items-center gap-3 bg-slate-950 p-4 rounded-lg">
            <HUD score={score} wave={wave} level={level} hearts={hearts} xp={xp} xpToNext={xpToNext} />
 
            <div className="relative">
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="rounded-md border border-slate-700"
                    />
 
                {showLevelUp && <LevelUpOverlay options={levelUpOptions} onChoose={handleCardChoice} />}
 
                {gameOver && <GameOverOverlay score={score} wave={wave} level={level} onRestart={handleRestart} />}
            </div>
 
            <p className="text-slate-400 text-xs">
                Move with WASD or Arrow Keys. Hold Space to fire. Catch falling green orbs to gain experience.
            </p>
        </div>
    );
}