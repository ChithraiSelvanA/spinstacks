
import React, { useState, useMemo } from 'react';
import { SlotGame, Volatility } from '../types';

interface SlotComparisonProps {
  games: SlotGame[];
  onSelectGame: (game: SlotGame) => void;
}

const SlotComparison: React.FC<SlotComparisonProps> = ({ games, onSelectGame }) => {
  const [slotA, setSlotA] = useState<SlotGame | null>(games[0]);
  const [slotB, setSlotB] = useState<SlotGame | null>(games[1]);

  const ComparisonRow = ({ label, valA, valB, helpText }: { label: string, valA: any, valB: any, helpText?: string }) => {
    const isDifferent = valA !== valB;
    return (
      <div className="grid grid-cols-2 md:grid-cols-12 border-b border-slate-100 group hover:bg-slate-50/50 transition-colors">
        <div className="hidden md:flex col-span-2 p-6 items-center gap-2 border-r border-slate-100">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">
            {label}
          </span>
          {helpText && (
            <div className="relative group/help">
              <svg className="w-3.5 h-3.5 text-slate-300 cursor-help hover:text-indigo-500 transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-slate-900 text-[11px] text-slate-300 rounded-xl shadow-xl opacity-0 invisible group-hover/help:opacity-100 group-hover/help:visible transition-all z-20 font-medium leading-relaxed">
                {helpText}
              </div>
            </div>
          )}
        </div>
        
        <div className="col-span-1 md:col-span-5 p-6 sm:p-8 text-center md:text-left border-r border-slate-100">
          <div className="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</div>
          <span className={`text-base sm:text-lg tracking-tight ${isDifferent ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}`}>
            {valA}
          </span>
        </div>
        
        <div className="col-span-1 md:col-span-5 p-6 sm:p-8 text-center md:text-left">
          <div className="md:hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</div>
          <span className={`text-base sm:text-lg tracking-tight ${isDifferent ? 'font-bold text-slate-900' : 'text-slate-400 font-medium'}`}>
            {valB}
          </span>
        </div>
      </div>
    );
  };

  const GamePicker = ({ selected, onSelect, label }: { selected: SlotGame | null, onSelect: (g: SlotGame) => void, label: string }) => {
    return (
      <div className="space-y-4">
        <label className="label-caps text-slate-500">{label}</label>
        <div className="relative group">
          <select 
            value={selected?.id || ''}
            onChange={(e) => onSelect(games.find(g => g.id === e.target.value)!)}
            className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 appearance-none outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer shadow-sm"
          >
            {games.map(g => (
              <option key={g.id} value={g.id} className="bg-white text-slate-900">{g.title}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {selected && (
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group/card">
            <div className="relative overflow-hidden rounded-xl w-16 h-12 border border-slate-100">
              <img src={selected.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110" alt="" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{selected.provider}</span>
              <button 
                onClick={() => onSelectGame(selected)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors mt-0.5 flex items-center gap-1"
              >
                Technical Profile
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        <header className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-indigo-500"></span>
            <h2 className="label-caps text-indigo-600">Technical Analysis</h2>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
            Slot Comparison <span className="text-indigo-600 italic">Matrix</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Side-by-side technical evaluation of mathematical models. Use this matrix to identify subtle differences in RTP efficiency and variance scaling.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-y border-slate-200">
          <GamePicker label="Model Selection A" selected={slotA} onSelect={setSlotA} />
          <GamePicker label="Model Selection B" selected={slotB} onSelect={setSlotB} />
        </section>

        {slotA && slotB ? (
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="bg-slate-50/50 border-b border-slate-200 hidden md:grid grid-cols-12 items-center">
              <div className="col-span-2 p-8 border-r border-slate-200">
                <span className="label-caps text-slate-400">Metadata Point</span>
              </div>
              <div className="col-span-5 p-8 border-r border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{slotA.title}</h3>
              </div>
              <div className="col-span-5 p-8">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{slotB.title}</h3>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              <ComparisonRow 
                label="Provider" 
                valA={slotA.provider} 
                valB={slotB.provider} 
                helpText="The certified software development team behind the RNG model."
              />
              <ComparisonRow 
                label="Theoretical RTP" 
                valA={`${slotA.rtp.toFixed(2)}%`} 
                valB={`${slotB.rtp.toFixed(2)}%`} 
                helpText="Long-term efficiency. Industry standard is approx. 96%."
              />
              <ComparisonRow 
                label="Volatility" 
                valA={slotA.volatility} 
                valB={slotB.volatility} 
                helpText="Describes the frequency and amplitude of return events."
              />
              <ComparisonRow 
                label="Max Potential" 
                valA={slotA.maxWin} 
                valB={slotB.maxWin} 
                helpText="The theoretical maximum multiplier of the primary bet unit."
              />
              <ComparisonRow 
                label="Format" 
                valA={slotA.reels} 
                valB={slotB.reels} 
                helpText="The physical layout of the mathematical grid (Reels x Rows)."
              />
              <ComparisonRow 
                label="Paylines" 
                valA={slotA.paylines} 
                valB={slotB.paylines} 
                helpText="The number of active evaluation paths for symbols."
              />
              <ComparisonRow 
                label="Release Date" 
                valA={slotA.releaseDate} 
                valB={slotB.releaseDate} 
              />
            </div>

            <div className="p-8 md:p-12 bg-slate-50/50 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <h4 className="label-caps text-indigo-600">Model A Synthesis</h4>
                <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-indigo-200 pl-6">
                   {slotA.volatility === Volatility.LOW || slotA.volatility === Volatility.MEDIUM 
                    ? `This model aligns with a session profile favoring frequency. Its ${slotA.rtp}% efficiency provides a standard long-term benchmark for balanced play.`
                    : `This model aligns with a session profile favoring high variance. The ${slotA.rtp}% efficiency targets users with a high threshold for infrequent return cycles.`}
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="label-caps text-indigo-600">Model B Synthesis</h4>
                <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-indigo-200 pl-6">
                   {slotB.volatility === Volatility.LOW || slotB.volatility === Volatility.MEDIUM 
                    ? `This model aligns with a session profile favoring frequency. Its ${slotB.rtp}% efficiency provides a standard long-term benchmark for balanced play.`
                    : `This model aligns with a session profile favoring high variance. The ${slotB.rtp}% efficiency targets users with a high threshold for infrequent return cycles.`}
                </p>
              </div>
            </div>
          </section>
        ) : (
          <div className="py-32 text-center bg-white rounded-3xl border border-dashed border-slate-200">
             <p className="text-slate-400 font-bold uppercase tracking-wider text-xs">Please select two mathematical models to initiate matrix analysis.</p>
          </div>
        )}

        <footer className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="max-w-2xl space-y-4">
             <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="label-caps text-slate-900">Comparison Methodology</h4>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed italic">
               Matrix values are sourced from certified technical data sheets. Variations in RTP may exist across different hosting platforms and jurisdictional boundaries. This tool is designed for informational comparison only and does not constitute financial advice or gameplay recommendation.
             </p>
          </div>
          <div className="flex gap-4">
             <button 
               onClick={() => {setSlotA(games[Math.floor(Math.random()*games.length)]); setSlotB(games[Math.floor(Math.random()*games.length)]);}}
               className="px-6 py-3 bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
             >
               Randomize Matrix
             </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default SlotComparison;
