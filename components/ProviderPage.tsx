
import React from 'react';
import { Provider, SlotGame } from '../types';
import GameCard from './GameCard';

interface ProviderPageProps {
  provider: Provider;
  games: SlotGame[];
  onBack: () => void;
  onSelectGame: (game: SlotGame) => void;
}

const ProviderPage: React.FC<ProviderPageProps> = ({ provider, games, onBack, onSelectGame }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Provider Header */}
      <header className="bg-white border-b border-slate-200 pt-24 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="mb-10">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-wider transition-all"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Developers
            </button>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex-shrink-0 flex items-center justify-center p-6">
              {provider.logoUrl ? (
                <img 
                  src={provider.logoUrl} 
                  alt={provider.name} 
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-5xl font-bold text-slate-200 uppercase">{provider.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-grow space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Verified RNG Developer
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">
                {provider.name}
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                {provider.description}
              </p>
              {provider.website && (
                <a 
                  href={provider.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors group"
                >
                  <span className="border-b border-indigo-600/30 group-hover:border-indigo-600 pb-0.5">Official Developer Studio</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Catalog */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-1">
            <h2 className="label-caps text-indigo-600">Technical Catalog</h2>
            <p className="text-2xl font-bold text-slate-900">Certified Game Models</p>
          </div>
          <div className="flex items-baseline gap-3 bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm">
             <span className="text-4xl font-bold text-slate-900 tracking-tight">{games.length}</span>
             <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Titles</span>
          </div>
        </div>

        {games.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={onSelectGame} 
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-white border border-dashed border-slate-200 rounded-3xl">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
               <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2 2V13m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
               </svg>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">No certified models found in this registry.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProviderPage;
