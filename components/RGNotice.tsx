
import React from 'react';

const RGNotice: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="section-container">
        <div className="bg-white rounded-2xl p-10 md:p-16 border border-slate-200 flex flex-col md:flex-row items-center gap-12 shadow-sm">
          <div className="flex-shrink-0 w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="flex-grow text-center md:text-left space-y-4">
            <h3 className="label-caps text-indigo-600">Player Safety</h3>
            <h4 className="text-3xl font-bold text-slate-900 tracking-tight">Committed to Responsible Play</h4>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium italic">
              SpinStacks is an informational resource intended to promote analytical and safe gameplay. Slot games are for entertainment, not a source of income. If you feel your play is becoming problematic, please reach out to professional support organizations immediately.
            </p>
          </div>
          <div className="flex-shrink-0">
            <button className="px-8 py-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-indigo-600 transition-all shadow-md active:scale-95">
              Get Help & Resources
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RGNotice;
