
import React from 'react';
import { Provider } from '../types';

interface ProviderDirectoryProps {
  providers: Provider[];
  onSelect: (provider: Provider) => void;
}

const ProviderDirectory: React.FC<ProviderDirectoryProps> = ({ providers, onSelect }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-white border-b border-slate-200 pt-24 pb-16 sm:pt-32 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-2 mb-4">
            <h2 className="label-caps text-indigo-600">Studio Registry</h2>
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 tracking-tight">Developer Directory</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
            Comprehensive registry of RNG-certified game studios and mathematical engineering firms.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map(p => (
            <div 
              key={p.id}
              onClick={() => onSelect(p)}
              className="data-card p-8 group cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden mb-6 flex items-center justify-center shadow-sm group-hover:border-indigo-200 transition-all duration-300">
                {p.logoUrl ? (
                  <img 
                    src={p.logoUrl} 
                    alt="" 
                    className="w-full h-full object-contain p-4 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-3xl font-bold text-slate-200 group-hover:text-indigo-400">{p.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{p.name}</h3>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-6">{p.description}</p>
              <div className="mt-auto flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-wider group-hover:gap-3 transition-all">
                Explore Studio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProviderDirectory;
