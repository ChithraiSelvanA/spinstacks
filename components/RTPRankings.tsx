
import React, { useState, useMemo } from 'react';
import { SlotGame, Volatility } from '../types';

interface RTPRankingsProps {
  games: SlotGame[];
  onSelectGame: (game: SlotGame) => void;
}

const RTPRankings: React.FC<RTPRankingsProps> = ({ games, onSelectGame }) => {
  const [filterRtp, setFilterRtp] = useState('All');
  const [filterVolatility, setFilterVolatility] = useState('All');
  const [sortBy, setSortBy] = useState<'highest' | 'lowest' | 'alpha'>('highest');

  const filteredAndSortedGames = useMemo(() => {
    let result = [...games];

    if (filterRtp !== 'All') {
      result = result.filter(g => {
        if (filterRtp === 'below-94') return g.rtp < 94;
        if (filterRtp === '94-96') return g.rtp >= 94 && g.rtp < 96;
        if (filterRtp === 'above-96') return g.rtp >= 96;
        return true;
      });
    }

    if (filterVolatility !== 'All') {
      result = result.filter(g => g.volatility === filterVolatility);
    }

    result.sort((a, b) => {
      if (sortBy === 'highest') return b.rtp - a.rtp;
      if (sortBy === 'lowest') return a.rtp - b.rtp;
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [games, filterRtp, filterVolatility, sortBy]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="section-container py-12 space-y-12">
        {/* Page Header */}
        <header className="space-y-4">
          <h3 className="label-caps text-indigo-600">Efficiency Index</h3>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            RTP Performance Rankings
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed font-medium">
            Objective analysis of theoretical returns. Models are indexed by their mathematical efficiency benchmarks, calculated over millions of session iterations.
          </p>
        </header>

        {/* Global Efficiency Scale Visualizer */}
        <section className="bg-white border border-slate-200 p-8 rounded-2xl space-y-8 shadow-sm">
          <div className="space-y-6">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
              <span>90.0% Baseline</span>
              <span>94.0%</span>
              <span>96.0% Mean</span>
              <span>98.0% Peak</span>
              <span>100%</span>
            </div>
            
            <div className="relative h-8 w-full bg-slate-100 rounded-lg border border-slate-200 flex overflow-hidden">
              <div className="h-full w-[40%] bg-slate-200 border-r border-slate-300" title="90-94%: Sub-Standard" />
              <div className="h-full w-[20%] bg-indigo-100 border-r border-slate-300" title="94-96%: Market Average" />
              <div className="h-full w-[40%] bg-indigo-600" title="96%+: High Performance" />
              
              <div className="absolute inset-y-0 left-[40%] w-px bg-slate-300" />
              <div className="absolute inset-y-0 left-[60%] w-px bg-slate-300" />
              <div className="absolute inset-y-0 left-[80%] w-px bg-slate-300" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-slate-400" />
                   <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Sub-Standard</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Models returning below 94%. Typically feature aggressive house edges.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-indigo-300" />
                   <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Market Median</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  The current industry standard range (94% - 96%). Balanced equilibrium.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-indigo-600" />
                   <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Peak Performance</h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Elite mathematical models exceeding 96%. Top percentile efficiency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-4">
              <label className="label-caps text-slate-400">Efficiency Threshold</label>
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                {[
                  { id: 'All', label: 'All' },
                  { id: 'below-94', label: '< 94%' },
                  { id: '94-96', label: '94-96%' },
                  { id: 'above-96', label: '96%+' },
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setFilterRtp(range.id)}
                    className={`flex-1 py-2 px-2 text-[10px] font-bold rounded-lg transition-all ${
                      filterRtp === range.id 
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <label className="label-caps text-slate-400">Variance Profile</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterVolatility('All')}
                  className={`px-4 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                    filterVolatility === 'All' 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  All
                </button>
                {Object.values(Volatility).map((v) => (
                  <button
                    key={v}
                    onClick={() => setFilterVolatility(v)}
                    className={`px-4 py-2 text-[10px] font-bold rounded-lg border transition-all ${
                      filterVolatility === v
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <label className="label-caps text-slate-400">Rank By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[10px] font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer"
              >
                <option value="highest">RTP (High → Low)</option>
                <option value="lowest">RTP (Low → High)</option>
                <option value="alpha">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </section>

        {/* List Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-4">
            <span className="label-caps text-slate-400">Showing {filteredAndSortedGames.length} Models</span>
            { (filterRtp !== 'All' || filterVolatility !== 'All') && (
              <button 
                onClick={() => { setFilterRtp('All'); setFilterVolatility('All'); }}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-widest"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="hidden md:grid grid-cols-12 px-8 py-4 bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <div className="col-span-5">Model Identity</div>
              <div className="col-span-2">Developer</div>
              <div className="col-span-2 text-center">Variance</div>
              <div className="col-span-2 text-right">RTP</div>
              <div className="col-span-1"></div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredAndSortedGames.map((game) => (
                <div 
                  key={game.id}
                  onClick={() => onSelectGame(game)}
                  className="grid grid-cols-1 md:grid-cols-12 items-center px-8 py-6 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                    <div className="w-16 h-10 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                      <img src={game.thumbnail} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{game.title}</span>
                  </div>
                  
                  <div className="hidden md:block col-span-2 text-xs text-slate-500">
                    {game.provider}
                  </div>

                  <div className="col-span-1 md:col-span-2 text-center">
                    <span className={`inline-flex px-2 py-1 rounded text-[9px] font-bold uppercase tracking-tight ${
                      game.volatility === Volatility.EXTREME || game.volatility === Volatility.HIGH 
                      ? 'text-rose-600 bg-rose-50' : 
                      game.volatility === Volatility.MEDIUM 
                      ? 'text-blue-600 bg-blue-50' : 
                      'text-emerald-600 bg-emerald-50'
                    }`}>
                      {game.volatility}
                    </span>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-right">
                    <span className={`text-lg font-mono font-bold ${game.rtp >= 96 ? 'text-indigo-600' : 'text-slate-900'}`}>
                      {game.rtp.toFixed(2)}%
                    </span>
                  </div>

                  <div className="col-span-1 md:col-span-1 text-right">
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Footer Panel */}
        <section className="bg-slate-900 rounded-2xl p-10 sm:p-16 text-white relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <h3 className="label-caps text-indigo-400">Technical Verification Notice</h3>
            <h4 className="text-3xl font-bold leading-tight max-w-xl">RTP is a validated statistical average.</h4>
            <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
              Theoretical Return to Player (RTP) is calculated over a cycle of millions of spins. 
              In short-term sessions, the Variance Spectrum (Volatility) dictates the outcome frequency. 
              SpinStacks categorizes models based on their verified theoretical efficiency.
            </p>
            <div className="pt-10 flex flex-wrap gap-12 sm:gap-20 border-t border-white/10">
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-200">94.0%</span>
                  <span className="label-caps text-slate-500 mt-2">Entry Threshold</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-indigo-400">96.0%</span>
                  <span className="label-caps text-slate-500 mt-2">Market Mean</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-3xl font-bold text-emerald-400">97.5%+</span>
                  <span className="label-caps text-slate-500 mt-2">High Performance</span>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RTPRankings;
