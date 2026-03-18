
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameDetailPage from './components/GameDetailPage';
import RTPRankings from './components/RTPRankings';
import VolatilityRankings from './components/VolatilityRankings';
import SlotComparison from './components/SlotComparison';
import AdminDashboard from './components/AdminDashboard';
import ProviderSection from './components/ProviderSection';
import EducationSection from './components/EducationSection';
import ResponsibleNotice from './components/ResponsibleNotice';
import ProviderDirectory from './components/ProviderDirectory';
import ProviderPage from './components/ProviderPage';
import { MOCK_GAMES, MOCK_PROVIDERS } from './constants';
import { SlotGame, Provider } from './types';

type View = 'home' | 'rtp' | 'volatility' | 'compare' | 'providers' | 'guide' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<SlotGame | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [filterProvider, setFilterProvider] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedGame, currentView, selectedProvider]);

  const providers = useMemo(() => {
    const p = new Set(MOCK_GAMES.map(g => g.provider));
    return ['All', ...Array.from(p)];
  }, []);

  const filteredGames = useMemo(() => {
    return MOCK_GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesProvider = filterProvider === 'All' || game.provider === filterProvider;
      return matchesSearch && matchesProvider;
    });
  }, [searchQuery, filterProvider]);

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    setSelectedGame(null);
    setSelectedProvider(null);
  };

  const renderContent = () => {
    if (selectedGame) {
      return (
        <GameDetailPage 
          game={selectedGame} 
          onBack={() => setSelectedGame(null)} 
          similarGames={MOCK_GAMES.filter(g => g.id !== selectedGame.id).slice(0, 4)}
        />
      );
    }

    if (selectedProvider) {
      return (
        <ProviderPage 
          provider={selectedProvider}
          games={MOCK_GAMES.filter(g => g.provider === selectedProvider.name)}
          onBack={() => setSelectedProvider(null)}
          onSelectGame={setSelectedGame}
        />
      );
    }

    switch (currentView) {
      case 'rtp':
        return <RTPRankings games={MOCK_GAMES} onSelectGame={setSelectedGame} />;
      case 'volatility':
        return <VolatilityRankings games={MOCK_GAMES} onSelectGame={setSelectedGame} />;
      case 'compare':
        return <SlotComparison games={MOCK_GAMES} onSelectGame={setSelectedGame} />;
      case 'admin':
        return <AdminDashboard games={MOCK_GAMES} />;
      case 'providers':
        return <ProviderDirectory providers={MOCK_PROVIDERS} onSelect={setSelectedProvider} />;
      case 'home':
      default:
        return (
          <>
            <header className="bg-white border-b border-slate-200 py-20 sm:py-32">
              <div className="section-container">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-6">
                    Data-Driven Slot Analytics
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                    The Professional Catalog for <span className="text-indigo-600">Slot Mechanics.</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
                    Explore verified RTP tracking, volatility metrics, and technical data for thousands of slot models. 
                    Built for research, transparency, and informed play.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch gap-4">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        placeholder="Search by game title, provider, or mechanic..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm"
                      />
                    </div>
                    
                    <div className="sm:w-64 relative">
                      <select 
                        value={filterProvider}
                        onChange={(e) => setFilterProvider(e.target.value)}
                        className="block w-full px-4 py-4 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 appearance-none cursor-pointer focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                      >
                        {providers.map(p => (
                          <option key={p} value={p}>{p === 'All' ? 'All Providers' : p}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <ProviderSection />

            <main className="section-container py-20">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-12">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Technical Catalog</h2>
                  <p className="text-slate-500 text-sm">Displaying {filteredGames.length} verified mathematical models</p>
                </div>
                
                <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {providers.map(p => (
                    <button
                      key={p}
                      onClick={() => setFilterProvider(p)}
                      className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                        filterProvider === p 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onClick={setSelectedGame} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                   </div>
                   <h4 className="text-xl font-bold text-slate-900 mb-2">No results found</h4>
                   <p className="text-slate-500 mb-8">Try adjusting your search terms or provider selection.</p>
                   <button 
                     onClick={() => { setSearchQuery(''); setFilterProvider('All'); }}
                     className="btn-primary"
                   >
                     Reset Catalog
                   </button>
                </div>
              )}
            </main>
            <EducationSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar currentView={currentView} onNavigate={handleNavigate} />
      
      {renderContent()}

      <ResponsibleNotice />

      <footer className="bg-white border-t border-slate-200 py-16 mt-20">
        <div className="section-container">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">SpinStacks</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                The independent data platform for iGaming research. We provide objective metrics, 
                RTP tracking, and technical analysis for the informed player.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div>
                <h4 className="label-caps mb-4">Platform</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => handleNavigate('home')} className="text-sm text-slate-600 hover:text-indigo-600">Slots</button></li>
                  <li><button onClick={() => handleNavigate('providers')} className="text-sm text-slate-600 hover:text-indigo-600">Providers</button></li>
                  <li><button onClick={() => handleNavigate('compare')} className="text-sm text-slate-600 hover:text-indigo-600">Compare</button></li>
                </ul>
              </div>
              <div>
                <h4 className="label-caps mb-4">Analytics</h4>
                <ul className="space-y-2">
                  <li><button onClick={() => handleNavigate('rtp')} className="text-sm text-slate-600 hover:text-indigo-600">RTP Ratings</button></li>
                  <li><button onClick={() => handleNavigate('volatility')} className="text-sm text-slate-600 hover:text-indigo-600">Volatility Guide</button></li>
                </ul>
              </div>
              <div>
                <h4 className="label-caps mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 hover:text-indigo-600">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-slate-600 hover:text-indigo-600">Terms of Service</a></li>
                  <li><a href="#" className="text-sm text-slate-600 hover:text-indigo-600">Data Sources</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-100 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">© 2024 SpinStacks Analytics. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">18+ Only</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Play Responsibly</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
