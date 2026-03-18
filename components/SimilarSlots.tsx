
import React from 'react';

interface SimilarSlot {
  name: string;
  provider: string;
  slug: string;
  thumbnail: string;
}

interface SimilarSlotsProps {
  slots: SimilarSlot[];
}

/**
 * SlotCard - Internal sub-component for the SimilarSlots grid.
 * Follows the SpinStacks technical, no-hype design language.
 */
const SlotCard: React.FC<{ slot: SimilarSlot }> = ({ slot }) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md hover:border-indigo-600 transition-all duration-300 cursor-pointer">
      <div className="aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={slot.thumbnail} 
          alt={slot.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-1">
          <span className="label-caps text-slate-400">
            {slot.provider}
          </span>
          <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
            {slot.name}
          </h4>
        </div>
      </div>
    </div>
  );
};

const SimilarSlots: React.FC<SimilarSlotsProps> = ({ slots }) => {
  if (!slots || slots.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between px-1">
        <div className="space-y-1">
          <h3 className="label-caps text-slate-400">
            Similar Models
          </h3>
          <p className="text-sm text-slate-500 font-medium">
            Models with comparable mechanical profiles
          </p>
        </div>
        <button 
          onClick={(e) => e.preventDefault()}
          className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors"
        >
          Explore All →
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {slots.map((slot) => (
          <SlotCard key={slot.slug} slot={slot} />
        ))}
      </div>
    </section>
  );
};

export default SimilarSlots;
