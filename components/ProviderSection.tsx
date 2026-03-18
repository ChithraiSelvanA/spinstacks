
import React from 'react';

const PROVIDERS = [
  'NeonLogic', 'DeepSea Gaming', 'BrassEngine', 'GalacticDev', 'Sandstorm Soft', 'PixelPlay', 'LogicSpins'
];

const ProviderSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-y border-slate-200">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xs text-center md:text-left">
            <h3 className="label-caps mb-2">Technical Partners</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              We aggregate data from certified RNG providers to ensure accuracy and transparency.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {PROVIDERS.map((name) => (
              <div key={name} className="group cursor-default">
                <span className="text-xl font-extrabold text-slate-400 group-hover:text-slate-900 transition-colors tracking-tighter">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProviderSection;
