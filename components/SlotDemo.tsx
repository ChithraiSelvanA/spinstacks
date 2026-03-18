
import React from 'react';

interface SlotDemoProps {
  demoUrl: string;
  slotName: string;
}

/**
 * SlotDemo - A clean, focused container for slot game simulations.
 * Adheres to SpinStacks' data-first, no-hype design philosophy.
 */
const SlotDemo: React.FC<SlotDemoProps> = ({ demoUrl, slotName }) => {
  return (
    <section className="w-full">
      <div className="relative w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-slate-900">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="w-12 h-12 border-2 border-white/10 rounded-full" />
              <div className="absolute inset-0 w-12 h-12 border-t-2 border-indigo-500 rounded-full animate-spin" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="label-caps text-white animate-pulse">
                Initializing Engine
              </span>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                Mathematical Integrity Verified
              </span>
            </div>
          </div>
        </div>

        <iframe
          src={demoUrl}
          title={`${slotName} technical demo simulation`}
          className="absolute inset-0 w-full h-full border-0 z-10 opacity-95 transition-opacity duration-1000"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="eager"
        />
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">
            Secure Sandboxed Simulation
          </p>
        </div>
        <div className="h-px w-8 bg-slate-200" />
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          RNG Certified
        </p>
      </div>
    </section>
  );
};

export default SlotDemo;
