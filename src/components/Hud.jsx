import { PLAYER_MAX_HEARTS, BOSS_WAVE, CANVAS_WIDTH } from "../game/constants";


export default function HUD({ score, wave, level, hearts, xp, xpToNext }) {

    return (

        <>
            <div className="flex justify-between w-full text-slate-200 text-sm px-1" style={{ maxWidth: CANVAS_WIDTH }}>

                <span>Score: {score}</span>
                <span>Wave: {wave === BOSS_WAVE ? "5 (Boss)" : wave}</span>
                <span>Level: {level}</span>

                <span>
                    {Array.from({ length: PLAYER_MAX_HEARTS }).map((_, i) => (
                        <span key={i}>{i < hearts ? "\u2764\ufe0f" : "\u2661"}</span>
                    ))}
                </span>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden" style={{ maxWidth: CANVAS_WIDTH }}>
                <div
                    className="h-full bg-lime-400"
                    style={{ width: `${Math.min(100, (xp / xpToNext) * 100)}%` }}
                />
            </div>
        </>
    );
}
