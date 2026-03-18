
import React from 'react';

interface CasinoCardProps {
  name: string;
  license: string;
  slug: string;
}

/**
 * CasinoCard - A minimalist, informational platform card.
 * Designed to provide direction without the aggressive "play now" urgency 
 * found on typical gambling affiliate sites.
 */
const CasinoCard: React.FC<CasinoCardProps> = ({ name, license, slug }) => {
  return (
    <div className="group flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 transition-all duration-300 shadow-sm">
      <div className="flex items-center gap-5">
        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors">
          <span className="text-slate-400 font-bold text-lg group-hover:text-indigo-600 transition-colors">
            {name.charAt(0)}
          </span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-base font-bold text-slate-900 leading-none mb-1.5">
            {name}
          </span>
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {license}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="px-4 py-2 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-indigo-600 transition-all duration-300"
      >
        View Platform
      </button>
    </div>
  );
};

export default CasinoCard;
