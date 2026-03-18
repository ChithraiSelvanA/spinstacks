
import React from 'react';

const EDUCATION_CARDS = [
  {
    title: 'Theoretical RTP',
    description: 'Return to Player (RTP) is the statistical percentage a game pays back to players over millions of spins. Knowing this helps you gauge long-term mathematical behavior.',
    icon: '📊'
  },
  {
    title: 'Volatility Metrics',
    description: 'Volatility measures risk. High volatility means fewer but larger wins, while low volatility provides frequent, smaller payouts to extend session time.',
    icon: '⚖️'
  },
  {
    title: 'RNG Integrity',
    description: 'Every spin is determined by a Random Number Generator. Our platform verifies that listed providers use third-party certified RNG systems for total fairness.',
    icon: '🔐'
  }
];

const EducationSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="section-container">
        <div className="max-w-3xl mb-16">
          <h2 className="label-caps mb-4">Educational Resources</h2>
          <h3 className="text-3xl font-bold text-slate-900 mb-6">The Science of the Spin</h3>
          <p className="text-slate-600 leading-relaxed text-lg">
            We believe that informed players make better decisions. Understanding the underlying mathematical models of slot games is the first step toward a more controlled and analytical experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EDUCATION_CARDS.map((card, idx) => (
            <div key={idx} className="data-card p-8 group">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{card.icon}</div>
              <h4 className="text-lg font-bold text-slate-900 mb-3">{card.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                {card.description}
              </p>
              <button className="text-indigo-600 text-xs font-bold uppercase tracking-widest hover:text-indigo-800 transition-colors flex items-center gap-2">
                Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
