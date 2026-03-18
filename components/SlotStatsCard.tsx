
import React from 'react';

interface SlotStatsCardProps {
  rtp: string; // e.g., "96.5%" or "94.2% - 97.1%"
  volatility: 'low' | 'medium' | 'high' | string;
  maxWin: string;
  paylines: number | string;
  provider: string;
}

/**
 * SlotStatsCard - Improved legibility and color coding for SpinStacks.
 */
const SlotStatsCard: React.FC<SlotStatsCardProps> = ({
  rtp,
  volatility,
  maxWin,
  paylines,
  provider,
}) => {
  const metrics = [
    {
      label: 'Partner Developer',
      value: provider,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      label: 'Efficiency RTP',
      value: rtp,
      color: 'text-indigo-600',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: 'Variance Spectrum',
      value: volatility,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      label: 'Peak Potential',
      value: maxWin,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      label: 'Evaluation Paths',
      value: paylines,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-slate-100">
        {metrics.map((metric, index) => (
          <div 
            key={index} 
            className="p-6 flex flex-col justify-between hover:bg-slate-50 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4 text-slate-400">
              <span className="p-1.5 bg-slate-50 rounded-lg text-slate-400 border border-slate-100">{metric.icon}</span>
              <span className="label-caps leading-none">
                {metric.label}
              </span>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-bold tracking-tight leading-none capitalize ${metric.color || 'text-slate-900'}`}>
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotStatsCard;
