import { useEffect, useRef } from "react";
import { createInitialState, update } from "../game/gameLoop";
import { draw } from "../render/draw";


export function useGameLoop({ canvasRef, runId, setters }) {
    const stateRef = useRef(null);

    useEffect(() => {
        stateRef.current = createInitialState();
        setters.resetUI();

        const ctx = canvasRef.current.getContext("2d");
        let animationFrameId;

        function applyEvents(events) {
            if (events.scoreGained > 0) {
                setters.setScore((prev) => prev + events.scoreGained);
            }

            if (events.xpGained > 0) {
                setters.setXp(stateRef.current.player.xp);
            }

            if (events.leveledUp) {
                setters.setLevel(stateRef.current.player.level);
                setters.setXp(stateRef.current.player.xp);
                setters.setXpToNext(stateRef.current.player.xpToNext);
                setters.setHearts(stateRef.current.player.hearts);
                setters.setLevelUpOptions(events.newCards);
                setters.setShowLevelUp(true);
            }

            if (events.tookDamage) {
                setters.setHearts(stateRef.current.player.hearts);
            }

            if (events.died) {
                setters.setGameOver(true);
            }

            if (events.waveAdvanced) {
                setters.setWave(events.newWave);
            }
        }

        function loop(timestamp) {
            const events = update(stateRef.current, timestamp);
            applyEvents(events);
            draw(ctx, stateRef.current);
            animationFrameId = requestAnimationFrame(loop);
        }

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [runId]);

    return stateRef;
}