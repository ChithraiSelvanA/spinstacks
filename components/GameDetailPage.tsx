
import React, { useState, useEffect } from 'react';
import { SlotGame, GameInsight } from '../types';
import { getGameInsights } from '../services/geminiService';
import SlotHeader from './SlotHeader';
import SlotDemo from './SlotDemo';
import SlotStatsCard from './SlotStatsCard';
import SlotTabs from './SlotTabs';
import WhereToPlay from './WhereToPlay';
import SimilarSlots from './SimilarSlots';
import ResponsibleNotice from './ResponsibleNotice';

interface GameDetailPageProps {
  game: SlotGame;
  onBack: () => void;
  similarGames: SlotGame[];
}

const GameDetailPage: React.FC<GameDetailPageProps> = ({ game, onBack, similarGames }) => {
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

  const casinos = game.availableAt.map((name) => ({
    name,
    license: 'MGA/B2C/123/2024',
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  }));

  const formattedSimilarSlots = similarGames.map((g) => ({
    name: g.title,
    provider: g.provider,
    slug: g.id,
    thumbnail: g.thumbnail,
  }));

  const overviewContent = (
    <div className="space-y-8">
      <p className="text-slate-600 leading-relaxed text-lg">{game.description}</p>
      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h5 className="label-caps mb-3 text-indigo-600">Technical Architecture</h5>
        <p className="text-sm text-slate-500 leading-relaxed">
          This model utilizes a {game.reels} reel set with {game.paylines} active evaluation paths. 
          RNG outcomes are generated server-side and transmitted via secure socket layers.
        </p>
      </div>
    </div>
  );

  const rtpContent = (
    <div className="space-y-8">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-100 rounded w-3/4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/2"></div>
        </div>
      ) : (
        <>
          <p className="text-slate-700 italic text-lg leading-relaxed">"{insights?.summary}"</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <span className="label-caps mb-4 block text-slate-900">Strengths</span>
              <ul className="space-y-3">
                {insights?.pros.map((p, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-3 items-start">
                    <span className="text-indigo-600 mt-1">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white border border-slate-200 rounded-xl">
              <span className="label-caps mb-4 block text-slate-900">Risk Factors</span>
              <ul className="space-y-3">
                {insights?.cons.map((c, i) => (
                  <li key={i} className="text-sm text-slate-600 flex gap-3 items-start">
                    <span className="text-slate-400 mt-1">!</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="label-caps text-slate-400">Strategy/Skill Influence</span>
              <span className="text-sm font-bold text-slate-900">{insights?.strategyScore}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-slate-900 transition-all duration-1000" 
                style={{ width: `${insights?.strategyScore}%` }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

  const howToPlayContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Core Mechanics</h4>
        {game.howToPlay && game.howToPlay.length > 0 ? (
          <ul className="space-y-4 mt-2">
            {game.howToPlay.map((step, idx) => (
              <li key={idx} className="text-sm text-slate-600 flex gap-4 items-start">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 flex-shrink-0" />
                {step}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500 leading-relaxed">
            Symbols are evaluated based on the {game.paylines} path logic. Adjusting bet sizes does not affect the 
            underlying RNG probabilities.
          </p>
        )}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 mb-4">Evaluation Logic</h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          The bonus simulation is triggered via specific mathematical variance spikes. Review the game's internal 
          paytable for detailed weighting of high-value symbols and the impact of the {game.reels} format on winning frequency.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="section-container pt-12 pb-24 space-y-12">
        <nav className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Technical Directory
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-xs font-bold text-slate-900">{game.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <SlotHeader 
              slotName={game.title}
              providerName={game.provider}
              providerSlug={game.provider.toLowerCase().replace(/\s+/g, '-')}
              releaseYear={game.releaseYear}
              category="High-Variance Simulation"
            />
            
            <SlotDemo 
              demoUrl="https://example.com/demo-placeholder"
              slotName={game.title}
            />

            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <SlotTabs 
                overviewContent={overviewContent}
                rtpContent={rtpContent}
                howToPlayContent={howToPlayContent}
              />
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <SlotStatsCard 
              rtp={`${game.rtp}%`}
              volatility={game.volatility.toLowerCase()}
              maxWin={game.maxWin}
              paylines={game.paylines}
              provider={game.provider}
            />
            
            <WhereToPlay casinos={casinos} />
          </aside>
        </div>

        <SimilarSlots slots={formattedSimilarSlots} />
      </div>
    </div>
  );
};

export default GameDetailPage;
