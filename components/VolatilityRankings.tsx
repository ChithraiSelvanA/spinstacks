
import React, { useState, useMemo } from 'react';
import { SlotGame, Volatility } from '../types';

interface VolatilityRankingsProps {
  games: SlotGame[];
  onSelectGame: (game: SlotGame) => void;
}

const VolatilityRankings: React.FC<VolatilityRankingsProps> = ({ games, onSelectGame }) => {
  const [filterVolatility, setFilterVolatility] = useState('All');
  const [sortBy, setSortBy] = useState<'alpha' | 'v-asc' | 'v-desc'>('v-desc');
  const [isExplanationOpen, setIsExplanationOpen] = useState(true);

  const filteredAndSortedGames = useMemo(() => {
    let result = [...games];

    if (filterVolatility !== 'All') {
      result = result.filter(g => g.volatility === filterVolatility);
    }

    const volatilityRank = {
      [Volatility.LOW]: 1,
      [Volatility.MEDIUM]: 2,
      [Volatility.HIGH]: 3,
      [Volatility.EXTREME]: 4,
    };

    result.sort((a, b) => {
      if (sortBy === 'v-asc') return volatilityRank[a.volatility] - volatilityRank[b.volatility];
      if (sortBy === 'v-desc') return volatilityRank[b.volatility] - volatilityRank[a.volatility];
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [games, filterVolatility, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="section-container py-12 space-y-12">
        {/* Page Header */}
        <header className="space-y-4">
          <h3 className="label-caps text-rose-600">Risk Parameters</h3>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Slot Volatility Ratings
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">
            Understand the mathematical variance of each model. Volatility describes the theoretical frequency and scale of return patterns over extended simulations.
          </p>
        </header>

        {/* Volatility Explanation Panel */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <button 
            onClick={() => setIsExplanationOpen(!isExplanationOpen)}
            className="w-full flex items-center justify-between p-8 text-left hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">The Variance Spectrum</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Choosing a mathematical model that matches your session profile.</p>
              </div>
            </div>
            <svg 
              className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isExplanationOpen ? 'rotate-180' : ''}`} 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {isExplanationOpen && (
            <div className="px-8 pb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full" />
                  <h4 className="label-caps text-slate-900">Low Volatility</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Higher theoretical frequency of return events. Designed for extended session longevity with more frequent, smaller returns.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                  <h4 className="label-caps text-slate-900">Medium Volatility</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  A balanced mathematical approach. Moderate frequency and moderate return scales, providing a middle-ground experience.
                </p>
              </div>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-rose-500 rounded-full" />
                  <h4 className="label-caps text-slate-900">High Volatility</h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Lower theoretical frequency of return events. Features significant variance, often leading to longer periods without returns.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Visual Guide Segment */}
        <section className="space-y-8 bg-white p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-center space-y-2">
            <h3 className="label-caps text-slate-400">Mathematical Amplitude Visualizer</h3>
            <p className="text-sm text-slate-500 font-medium">Frequency vs. Peak Scaling Representation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 flex flex-col items-center">
                <svg className="w-full h-16 text-emerald-500 mb-4" viewBox="0 0 100 20">
                  <path d="M0 10 Q5 5 10 10 T20 10 T30 10 T40 10 T50 10 T60 10 T70 10 T80 10 T90 10 T100 10" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="label-caps text-emerald-600">Frequent / Shallow</span>
             </div>
             <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 flex flex-col items-center">
                <svg className="w-full h-16 text-blue-500 mb-4" viewBox="0 0 100 20">
                  <path d="M0 10 Q10 2 20 10 T40 10 T60 10 T80 10 T100 10" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="label-caps text-blue-600">Balanced / Moderate</span>
             </div>
             <div className="bg-slate-50 border border-slate-100 rounded-xl p-8 flex flex-col items-center">
                <svg className="w-full h-16 text-rose-500 mb-4" viewBox="0 0 100 20">
                  <path d="M0 10 Q15 -5 30 10 T60 10 T90 10" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span className="label-caps text-rose-600">Infrequent / Steep</span>
             </div>
          </div>
        </section>

        {/* Filters and List */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 border-b border-slate-200">
            <div className="flex flex-col gap-3">
              <span className="label-caps text-slate-400">Volatility Level</span>
              <div className="flex flex-wrap gap-2">
                {['All', ...Object.values(Volatility)].map(v => (
                  <button
                    key={v}
                    onClick={() => setFilterVolatility(v)}
                    className={`px-4 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                      filterVolatility === v 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="label-caps text-slate-400">Sort Inventory</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 text-[10px] font-bold text-slate-900 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer min-w-[200px]"
              >
                <option value="v-desc">Variance (High → Low)</option>
                <option value="v-asc">Variance (Low → High)</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedGames.map((game) => (
              <div 
                key={game.id}
                onClick={() => onSelectGame(game)}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-indigo-600 transition-all cursor-pointer group flex flex-col shadow-sm"
              >
                 <div className="flex items-start justify-between mb-6">
                    <div className="flex flex-col gap-1">
                       <span className="label-caps text-slate-400">{game.provider}</span>
                       <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">{game.title}</h3>
                    </div>
                    <div className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-tight ${
                      game.volatility === Volatility.EXTREME || game.volatility === Volatility.HIGH 
                      ? 'bg-rose-50 text-rose-600'
                      : game.volatility === Volatility.MEDIUM 
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {game.volatility}
                    </div>
                 </div>

                 <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                       <span className="label-caps text-slate-400">Theoretical RTP</span>
                       <span className="text-sm font-bold text-slate-900 mt-1">{game.rtp.toFixed(2)}%</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Educational Disclaimer */}
        <footer className="pt-12">
           <div className="p-10 bg-slate-900 rounded-2xl text-white space-y-6 shadow-md">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                   <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                   </svg>
                 </div>
                 <h4 className="label-caps text-indigo-400">Statistical Variance Advisory</h4>
              </div>
              <p className="text-lg text-slate-400 leading-relaxed italic">
                Volatility is a purely mathematical construct representing the distribution of returns over large samples. It does not predict the outcome of any individual spin or session. SpinStacks recommends matching your volatility preference to your available session time.
              </p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default VolatilityRankings;
