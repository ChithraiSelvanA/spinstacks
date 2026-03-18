
import React from 'react';

interface SlotCardProps {
  name: string;
  provider: string;
  thumbnail: string;
  slug: string;
}

/**
 * SlotCard - A minimalist, informational card for slot game listings.
 * It strictly avoids gambling triggers like neon, flashing lights, 
 * or aggressive "Play Now" buttons, focusing instead on the game 
 * as a mathematical simulation.
 */
const SlotCard: React.FC<SlotCardProps> = ({ name, provider, thumbnail, slug }) => {
  return (
    <div 
      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-indigo-600 transition-all duration-300 flex flex-col h-full cursor-pointer"
      role="link"
      aria-label={`View technical analysis for ${name} by ${provider}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-50 border-b border-slate-100">
        <img 
          src={thumbnail} 
          alt={`${name} mathematical model thumbnail`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="label-caps text-slate-400">
              {provider}
            </span>
            <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
            {name}
          </h3>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="p-1 bg-slate-50 rounded border border-slate-100">
            <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
            RNG Data Verified
          </span>
        </div>
      </div>
    </div>
  );
};

export default SlotCard;
