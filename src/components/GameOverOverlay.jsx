 
export default function GameOverOverlay({ score, wave, level, onRestart }) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 rounded-md">
            <p className="text-slate-100 text-xl">Game Over</p>

            <p className="text-slate-300 text-sm">
                Score: {score} — reached wave {wave}, level {level}
            </p>
            <button
                className="px-4 py-2 bg-cyan-500 text-slate-950 rounded-md text-sm font-medium" onClick={onRestart}>
                Restart
            </button>
        </div>
    );
}
 