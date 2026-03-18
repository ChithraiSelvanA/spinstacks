
import React, { useState, useMemo, useEffect } from 'react';
import { SlotGame, Volatility, Provider } from '../types';
import GameDetailModal from './GameDetailModal';
import { MOCK_PROVIDERS } from '../constants';

interface AdminDashboardProps {
  games: SlotGame[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ games: initialGames }) => {
  const [games, setGames] = useState<SlotGame[]>(initialGames);
  const [activeTab, setActiveTab] = useState<'slots' | 'providers'>('slots');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Partial<SlotGame> | null>(null);
  const [previewGame, setPreviewGame] = useState<SlotGame | null>(null);
  const [formErrors, setFormErrors] = useState<{ rtp?: string; volatility?: string; title?: string; slug?: string; logoUrl?: string; releaseYear?: string }>({});
  const [isSlugDirty, setIsSlugDirty] = useState(false);

  const [providers, setProviders] = useState<Provider[]>(MOCK_PROVIDERS);
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [editingProvider, setEditingProvider] = useState<Partial<Provider> | null>(null);
  const [isProviderSlugDirty, setIsProviderSlugDirty] = useState(false);

  const [filterProvider, setFilterProvider] = useState('All');
  const [filterDemo, setFilterDemo] = useState('All');
  const [filterRtp, setFilterRtp] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const uniqueProvidersNames = useMemo(() => {
    const p = new Set(games.map(g => g.provider));
    return ['All', ...Array.from(p)];
  }, [games]);

  const slotsMissingDemo = games.filter(g => !g.demoUrl);
  const slotsMissingRtp = games.filter(g => !g.rtp || g.rtp === 0);
  const totalSlots = games.length;
  const avgRtp = totalSlots > 0 ? games.reduce((acc, g) => acc + (g.rtp || 0), 0) / totalSlots : 0;
  const providersCount = providers.length;

  const filteredInventory = useMemo(() => {
    return games.filter(game => {
      const matchesProvider = filterProvider === 'All' || game.provider === filterProvider;
      const matchesDemo = filterDemo === 'All' || (filterDemo === 'Missing' && !game.demoUrl) || (filterDemo === 'Available' && !!game.demoUrl);
      const matchesRtpStatus = filterRtp === 'All' || (filterRtp === 'Missing' && (!game.rtp || game.rtp === 0)) || (filterRtp === 'Available' && !!game.rtp);
      const matchesStatus = filterStatus === 'All' || (filterStatus === 'Published' && game.isPublished) || (filterStatus === 'Draft' && !game.isPublished);
      return matchesProvider && matchesDemo && matchesRtpStatus && matchesStatus;
    });
  }, [games, filterProvider, filterDemo, filterRtp, filterStatus]);

  const slugify = (text: string) => text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');

  const handleEditGame = (game: SlotGame) => {
    const howToPlay = Array.isArray(game.howToPlay) ? [...game.howToPlay] : [];
    while (howToPlay.length < 4) howToPlay.push('');
    
    setEditingGame({ ...game, howToPlay });
    setFormErrors({});
    setIsSlugDirty(true);
    setIsModalOpen(true);
  };

  const handleAddNewGame = () => {
    setEditingGame({ 
      title: '', 
      slug: '', 
      provider: '', 
      rtp: 96.00, 
      volatility: Volatility.MEDIUM, 
      isPublished: false, 
      releaseYear: new Date().getFullYear(),
      howToPlay: ['', '', '', ''],
      lastUpdated: new Date().toISOString().split('T')[0] 
    });
    setFormErrors({});
    setIsSlugDirty(false);
    setIsModalOpen(true);
  };

  const handleAddNewProvider = () => {
    setEditingProvider({
      name: '',
      slug: '',
      logoUrl: '',
      description: '',
      website: ''
    });
    setIsProviderSlugDirty(false);
    setIsProviderModalOpen(true);
  };

  const validateField = (name: string, value: any) => {
    let error = '';
    if (name === 'rtp') {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) error = 'RTP must be a valid number.';
      else if (numValue < 70 || numValue > 100) error = 'RTP typically ranges between 70% and 100%.';
    }
    if (name === 'releaseYear') {
      const year = parseInt(value);
      const currentYear = new Date().getFullYear();
      if (isNaN(year)) error = 'Release year must be a number.';
      else if (year < 1970 || year > currentYear + 2) error = 'Please enter a valid release year.';
    }
    if (name === 'title' && (!value || value.trim().length === 0)) error = 'Slot name is required.';
    if (name === 'slug' && (!value || value.trim().length === 0 || !/^[a-z0-9-]+$/.test(value))) error = 'URL slug is required and must be URL-friendly.';
    
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleGameInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue: any = value;
    
    if (name === 'rtp') finalValue = parseFloat(value) || 0;
    if (name === 'releaseYear') finalValue = parseInt(value) || 0;
    if (name === 'isPublished') finalValue = (e.target as HTMLInputElement).checked;

    setEditingGame(prev => {
      if (!prev) return prev;
      const newState = { ...prev, [name]: finalValue };
      if (name === 'title' && !isSlugDirty) {
        newState.slug = slugify(value);
      }
      return newState;
    });

    validateField(name, finalValue);
    if (name === 'title' && !isSlugDirty) {
      validateField('slug', slugify(value));
    }
  };

  const handleHowToPlayChange = (index: number, val: string) => {
    setEditingGame(prev => {
      if (!prev) return prev;
      const currentHTP = Array.isArray(prev.howToPlay) ? [...prev.howToPlay] : ['', '', '', ''];
      while (currentHTP.length < 4) currentHTP.push('');
      currentHTP[index] = val;
      return { ...prev, howToPlay: currentHTP };
    });
  };

  const handleSaveGame = () => {
    if (!editingGame || !isFormValid()) return;
    const cleanedHTP = (editingGame.howToPlay || []).filter(line => line.trim().length > 0);
    const gameToSave = { ...editingGame, howToPlay: cleanedHTP } as SlotGame;

    if (gameToSave.id) {
      setGames(prev => prev.map(g => g.id === gameToSave.id ? gameToSave : g));
    } else {
      setGames(prev => [...prev, { ...gameToSave, id: `g-${Date.now()}` }]);
    }
    setIsModalOpen(false);
  };

  const handleEditProvider = (provider: Provider) => {
    setEditingProvider({ ...provider });
    setIsProviderSlugDirty(true);
    setIsProviderModalOpen(true);
  };

  const handleProviderInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingProvider(prev => {
      if (!prev) return prev;
      const newState = { ...prev, [name]: value };
      if (name === 'name' && !isProviderSlugDirty) {
        newState.slug = slugify(value);
      }
      return newState;
    });
  };

  const handleSaveProvider = () => {
    if (!editingProvider?.name) return;
    const providerToSave = editingProvider as Provider;
    if (providerToSave.id) {
      setProviders(prev => prev.map(p => p.id === providerToSave.id ? providerToSave : p));
    } else {
      setProviders(prev => [...prev, { ...providerToSave, id: `p-${Date.now()}` }]);
    }
    setIsProviderModalOpen(false);
  };

  const isFormValid = () => {
    if (!editingGame?.title || editingGame.title.trim().length === 0) return false;
    if (!editingGame?.slug || editingGame.slug.trim().length === 0) return false;
    if (Object.values(formErrors).some(err => !!err)) return false;
    return true;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <header className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-100">Registry Admin</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">System Management</h1>
          </div>
          
          <div className="flex gap-8 border-b border-slate-200">
            <button 
              onClick={() => setActiveTab('slots')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all relative ${activeTab === 'slots' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Slot Inventory
              {activeTab === 'slots' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
            </button>
            <button 
              onClick={() => setActiveTab('providers')}
              className={`pb-4 text-xs font-bold uppercase tracking-wider transition-all relative ${activeTab === 'providers' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Certified Providers
              {activeTab === 'providers' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
            </button>
          </div>
        </header>

        {activeTab === 'slots' ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="label-caps text-slate-500 mb-2">Total Inventory</p>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">{totalSlots}</span>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="label-caps text-slate-500 mb-2">Catalog RTP Mean</p>
                <span className="text-3xl font-bold text-indigo-600 tracking-tight">{avgRtp.toFixed(2)}%</span>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="label-caps text-slate-500 mb-2">Missing Assets</p>
                <span className="text-3xl font-bold text-amber-600 tracking-tight">{slotsMissingDemo.length}</span>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="label-caps text-slate-500 mb-2">Incomplete Data</p>
                <span className="text-3xl font-bold text-rose-600 tracking-tight">{slotsMissingRtp.length}</span>
              </div>
              <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <p className="label-caps text-slate-500 mb-2">Active Partners</p>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">{providersCount}</span>
              </div>
            </div>

            <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-slate-900">Inventory Management</h3>
                    <p className="text-sm text-slate-500">Coordinate technical specifications and simulation availability.</p>
                  </div>
                  <button 
                    onClick={handleAddNewGame}
                    className="btn-primary"
                  >
                    + Register New Slot
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="label-caps text-slate-500 ml-1">Provider Source</label>
                    <div className="relative">
                      <select 
                        value={filterProvider}
                        onChange={(e) => setFilterProvider(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                      >
                        {uniqueProvidersNames.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-caps text-slate-500 ml-1">Simulation Status</label>
                    <div className="relative">
                      <select 
                        value={filterDemo}
                        onChange={(e) => setFilterDemo(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="All">All Assets</option>
                        <option value="Available">Available (✔)</option>
                        <option value="Missing">Missing (✖)</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-caps text-slate-500 ml-1">Mathematical Data</label>
                    <div className="relative">
                      <select 
                        value={filterRtp}
                        onChange={(e) => setFilterRtp(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="All">All Data</option>
                        <option value="Available">Valid (✔)</option>
                        <option value="Missing">Missing (✖)</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="label-caps text-slate-500 ml-1">Visibility</label>
                    <div className="relative">
                      <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Published">Published (✔)</option>
                        <option value="Draft">Draft (✖)</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Slot Identity</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Provider</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-center">Demo</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">RTP</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-center">Status</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInventory.map(game => (
                      <tr key={game.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{game.title}</td>
                        <td className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{game.provider}</td>
                        <td className="px-8 py-5 text-center">
                          {game.demoUrl ? (
                            <div className="w-5 h-5 bg-emerald-50 text-emerald-600 rounded-md flex items-center justify-center mx-auto border border-emerald-100">
                               <span className="text-[10px]">✔</span>
                            </div>
                          ) : (
                            <div className="w-5 h-5 bg-rose-50 text-rose-600 rounded-md flex items-center justify-center mx-auto border border-rose-100">
                               <span className="text-[10px]">✖</span>
                            </div>
                          )}
                        </td>
                        <td className="px-8 py-5 text-sm font-mono font-bold text-slate-700">{game.rtp.toFixed(2)}%</td>
                        <td className="px-8 py-5 text-center">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${game.isPublished ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                            {game.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end gap-4">
                            <button onClick={() => setPreviewGame(game)} className="text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-wider transition-colors">Preview</button>
                            <button onClick={() => handleEditGame(game)} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider transition-colors">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          <section className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Partner Directory</h3>
                <p className="text-sm text-slate-500">Manage software developer credentials and asset libraries.</p>
              </div>
              <button 
                onClick={handleAddNewProvider}
                className="btn-primary"
              >
                + Register Provider
              </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Provider Name</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Identifier</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">Website</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {providers.map(provider => (
                      <tr key={provider.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5 text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{provider.name}</td>
                        <td className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">{provider.slug}</td>
                        <td className="px-8 py-5 text-xs font-medium text-slate-500">
                          {provider.website ? (
                            <a href={provider.website} target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors underline decoration-slate-200 underline-offset-4">{provider.website}</a>
                          ) : 'N/A'}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button 
                            onClick={() => handleEditProvider(provider)}
                            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider transition-colors"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </section>
        )}
      </div>

      {/* Game Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
            <header className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{editingGame?.id ? 'Update Model Specs' : 'Register New Model'}</h2>
                <p className="text-sm text-slate-500">Ensure mathematical accuracy for catalog integrity.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-900 flex items-center justify-center border border-slate-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </header>
            
            <form className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label-caps text-slate-500 ml-1">
                    Slot Identity <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    required
                    value={editingGame?.title || ''}
                    onChange={handleGameInputChange}
                    placeholder="e.g. Prism Horizon"
                    className={`w-full bg-slate-50 border px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 transition-all placeholder-slate-400 ${
                      formErrors.title ? 'border-rose-500/50 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-indigo-500/10'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="label-caps text-slate-500 ml-1">
                    URL Resource Slug <span className="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="slug"
                    required
                    value={editingGame?.slug || ''}
                    onChange={handleGameInputChange}
                    placeholder="e.g. prism-horizon"
                    className={`w-full bg-slate-50 border px-4 py-3 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-4 transition-all placeholder-slate-400 ${
                      formErrors.slug ? 'border-rose-500/50 focus:ring-rose-500/10' : 'border-slate-200 focus:ring-indigo-500/10'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="label-caps text-slate-500 ml-1">Partner Provider</label>
                  <div className="relative">
                    <select 
                      name="provider"
                      value={editingGame?.provider || ''}
                      onChange={handleGameInputChange}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Provider</option>
                      {providers.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-caps text-slate-500 ml-1">Registry Year</label>
                  <input 
                    type="number" 
                    name="releaseYear"
                    value={editingGame?.releaseYear || ''}
                    onChange={handleGameInputChange}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
                  />
                </div>
              </div>

              {/* Gameplay Logistics */}
              <div className="space-y-6 pt-8 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="label-caps text-slate-900 ml-1">Gameplay Logistics</h4>
                    <p className="text-[10px] text-slate-500 font-bold ml-1 uppercase">Technical Instructions Only</p>
                  </div>
                  <span className="px-3 py-1 bg-slate-50 text-slate-400 text-[9px] font-bold uppercase tracking-widest rounded-lg border border-slate-100">Bullet Format Required</span>
                </div>
                
                <div className="grid grid-cols-1 gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-200">
                  {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className="flex items-center gap-4 group">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full flex-shrink-0 group-focus-within:scale-125 transition-transform" />
                      <input 
                        type="text"
                        value={Array.isArray(editingGame?.howToPlay) ? (editingGame.howToPlay[idx] || '') : ''}
                        onChange={(e) => handleHowToPlayChange(idx, e.target.value)}
                        placeholder={`Instructional point ${idx + 1}...`}
                        className="flex-grow bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder-slate-400"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="label-caps text-slate-500 ml-1">Mathematical Simulation Link (Demo)</label>
                <input 
                  type="url" 
                  name="demoUrl"
                  value={editingGame?.demoUrl || ''}
                  onChange={handleGameInputChange}
                  placeholder="https://simulation.example.com/id"
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder-slate-400" 
                />
              </div>

              <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-200 group hover:bg-slate-100 transition-colors">
                <input 
                  type="checkbox" 
                  name="isPublished"
                  checked={editingGame?.isPublished || false}
                  onChange={handleGameInputChange}
                  id="publish_check"
                  className="w-6 h-6 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer" 
                />
                <label htmlFor="publish_check" className="text-sm font-bold text-slate-700 cursor-pointer group-hover:text-indigo-600 transition-colors">
                  Public Catalog Visibility Active
                </label>
              </div>
            </form>

            <footer className="p-8 border-t border-slate-100 flex justify-end gap-4 bg-slate-50/50">
              <button onClick={() => setIsModalOpen(false)} className="btn-secondary">Discard</button>
              <button 
                onClick={handleSaveGame}
                disabled={!isFormValid()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Model Integrity
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Provider Modal */}
      {isProviderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsProviderModalOpen(false)} />
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-300">
            <header className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{editingProvider?.id ? 'Edit Provider Profile' : 'Register New Provider'}</h2>
                <p className="text-sm text-slate-500">Maintain accurate developer credentials and brand assets.</p>
              </div>
              <button onClick={() => setIsProviderModalOpen(false)} className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-900 flex items-center justify-center border border-slate-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </header>
            
            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="label-caps text-slate-500 ml-1">Provider Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={editingProvider?.name || ''}
                    onChange={handleProviderInputChange}
                    placeholder="e.g. NetEnt"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="label-caps text-slate-500 ml-1">Identifier (Slug)</label>
                  <input 
                    type="text" 
                    name="slug"
                    value={editingProvider?.slug || ''}
                    onChange={handleProviderInputChange}
                    placeholder="e.g. netent"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-mono font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="label-caps text-slate-500 ml-1">Official Website</label>
                  <input 
                    type="text" 
                    name="website"
                    value={editingProvider?.website || ''}
                    onChange={handleProviderInputChange}
                    placeholder="https://www.provider.com"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="label-caps text-slate-500 ml-1">Logo URL</label>
                  <input 
                    type="text" 
                    name="logoUrl"
                    value={editingProvider?.logoUrl || ''}
                    onChange={handleProviderInputChange}
                    placeholder="https://images.com/logo.png"
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="label-caps text-slate-500 ml-1">Description</label>
                  <textarea 
                    name="description"
                    value={editingProvider?.description || ''}
                    onChange={handleProviderInputChange}
                    rows={4}
                    placeholder="Brief overview of the provider's history and focus..."
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm font-medium text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <footer className="p-8 border-t border-slate-100 flex justify-end gap-4 bg-slate-50/50">
              <button onClick={() => setIsProviderModalOpen(false)} className="btn-secondary">Discard</button>
              <button 
                onClick={handleSaveProvider}
                className="btn-primary"
              >
                {editingProvider?.id ? 'Update Profile' : 'Create Profile'}
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewGame && <GameDetailModal game={previewGame} onClose={() => setPreviewGame(null)} />}
    </div>
  );
};

export default AdminDashboard;
