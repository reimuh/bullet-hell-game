 
export default function LevelUpOverlay({ options, onChoose }) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/80 rounded-md p-4">
            
            <p className="text-slate-100 text-lg">Level Up! Choose an upgrade</p>

            <div className="grid grid-cols-2 gap-3 w-full max-w-[520px]">
                {options.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => onChoose(card.id)}
                        className="flex flex-col items-start gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-md p-3 text-left">

                        <span className="text-slate-100 font-medium text-sm">{card.title}</span>
                        <span className="text-slate-400 text-xs">{card.desc}</span>

                    </button>
                ))}
            </div>
        </div>
    );
}
 