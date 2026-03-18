import React, { useState, useEffect } from 'react';
import { SlotGame, GameInsight } from '../types';
import { getGameInsights } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GameDetailModalProps {
  game: SlotGame;
  onClose: () => void;
}

const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, onClose }) => {
  const [insights, setInsights] = useState<GameInsight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const data = await getGameInsights(game);
      setInsights(data);
      setLoading(false);
    };
    fetchInsights();
  }, [game]);

  // Comparison data
  const chartData = [
    { name: 'This Game', rtp: game.rtp, fill: '#4F46E5' },
    { name: 'Avg Slot', rtp: 96.0, fill: '#E2E8F0' },
    { name: 'Top Tier', rtp: 98.0, fill: '#10B981' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl border border-slate-200 custom-scrollbar">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 rounded-full hover:bg-white border border-slate-200 shadow-sm transition-all text-slate-400 hover:text-slate-900"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Header/Banner Section */}
          <div className="lg:col-span-4 bg-slate-50 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="relative group mb-8">
              <img 
                src={game.thumbnail} 
                alt={game.title} 
                className="w-full aspect-[4/3] object-cover rounded-2xl shadow-md border border-slate-200"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm">
                <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Verified Data</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">{game.title}</h2>
            <p className="text-indigo-600 font-bold text-sm mb-8">by {game.provider}</p>
            
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="label-caps text-slate-400 mb-1">Theoretical RTP</p>
                <p className="text-3xl font-bold text-slate-900">{game.rtp}%</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">
                    Above industry average
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <p className="label-caps text-slate-400 mb-1">Max Win Potential</p>
                <p className="text-3xl font-bold text-slate-900">{game.maxWin}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-8 p-8 sm:p-10">
            <div className="mb-10">
              <h3 className="label-caps text-slate-900 mb-6">Game Anatomy</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Reels', value: game.reels },
                  { label: 'Lines', value: game.paylines },
                  { label: 'Volatility', value: game.volatility },
                  { label: 'Released', value: game.releaseDate },
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="label-caps text-slate-400 mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="label-caps text-slate-900 mb-6">RTP Benchmark</h3>
              <div className="h-48 w-full bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} tick={{fill: '#94A3B8', fontWeight: 700}} />
                    <YAxis domain={[90, 100]} hide />
                    <Tooltip 
                      cursor={{fill: 'transparent'}} 
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontWeight: 700, fontSize: '12px'}}
                    />
                    <Bar dataKey="rtp" radius={[6, 6, 0, 0]} barSize={40}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                 <h3 className="label-caps text-slate-900">AI Analyst Insights</h3>
                 <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[8px] font-bold rounded-full uppercase border border-indigo-100">Verified</span>
              </div>
              
              {loading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-slate-100 rounded-full w-3/4"></div>
                  <div className="h-24 bg-slate-100 rounded-2xl"></div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100 italic text-slate-700 text-sm leading-relaxed">
                    "{insights?.summary}"
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="label-caps text-emerald-600">Mechanical Pros</p>
                      <ul className="space-y-3">
                        {insights?.pros.map((p, i) => (
                          <li key={i} className="text-xs text-slate-600 font-medium flex items-start gap-3">
                            <div className="mt-1 w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <p className="label-caps text-rose-600">Mechanical Cons</p>
                      <ul className="space-y-3">
                        {insights?.cons.map((c, i) => (
                          <li key={i} className="text-xs text-slate-600 font-medium flex items-start gap-3">
                            <div className="mt-1 w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="label-caps text-slate-400">Strategy Sensitivity</span>
                      <span className="text-xs font-bold text-indigo-600">{insights?.strategyScore}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${insights?.strategyScore}%` }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3 font-medium">
                      Higher score indicates more complex decision making (e.g. bonus buy choices, progressive tiers).
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <button className="flex-1 min-w-[160px] btn-primary py-4">
                Play Demo
              </button>
              <button className="flex-1 min-w-[160px] btn-secondary py-4">
                Where to Play
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailModal;
