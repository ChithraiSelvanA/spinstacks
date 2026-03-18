
import React from 'react';

/**
 * ResponsibleNotice - A refined, low-profile notice for SpinStacks.
 * Unlike traditional flashy warnings, this uses neutral tones and 
 * small typography to integrate seamlessly into a data-focused UI.
 */
const ResponsibleNotice: React.FC = () => {
  return (
    <div className="w-full py-12 bg-slate-100 border-t border-slate-200">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl border-2 border-slate-300 text-slate-400 font-black text-sm select-none">
              18+
            </div>
            <div className="flex flex-col">
              <span className="label-caps leading-none mb-1">
                Age Restriction
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Verified identification required.
              </span>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium italic">
              SpinStacks is an independent informational platform providing mathematical simulations and data analysis. 
              The technical models displayed are for entertainment and research purposes. We advocate for a disciplined, 
              analytical approach to play. Understand the math, respect the house edge, and maintain strict time limits. 
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="text-[10px] font-bold text-slate-900 hover:text-indigo-600 uppercase tracking-widest transition-colors"
            >
              Support Directory
            </a>
            <a 
              href="#" 
              onClick={(e) => e.preventDefault()}
              className="text-[10px] font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest transition-colors"
            >
              Ethics Policy
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResponsibleNotice;
