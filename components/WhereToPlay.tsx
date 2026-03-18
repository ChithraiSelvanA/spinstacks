
import React from 'react';

interface Casino {
  name: string;
  license: string;
  slug: string;
}

interface WhereToPlayProps {
  casinos: Casino[];
}

/**
 * WhereToPlay - A non-aggressive platform directory for SpinStacks.
 * Replaces the typical "high-energy" casino list with a calm, technical directory.
 */
const WhereToPlay: React.FC<WhereToPlayProps> = ({ casinos }) => {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2">
        <h3 className="label-caps text-indigo-600">
          Platform Directory
        </h3>
        <p className="text-sm text-slate-500 font-medium leading-relaxed">
          The following certified platforms host verified simulations and real-play versions of this mathematical model.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {casinos.map((casino) => (
          <div
            key={casino.slug}
            className="group flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center gap-5">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                <span className="text-slate-400 font-bold text-lg group-hover:text-indigo-600 transition-colors">
                  {casino.name.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-slate-900 leading-none mb-1.5">
                  {casino.name}
                </span>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    License: {casino.license}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => e.preventDefault()}
              className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-indigo-600 transition-all duration-300"
            >
              View Platform
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-100 rounded-xl border border-slate-200">
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200 shrink-0">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed italic font-medium">
            SpinStacks acts as an independent data aggregator. Redirection is for informational purposes. 
            Availability is subject to jurisdictional compliance. Always verify site credentials before engagement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhereToPlay;
