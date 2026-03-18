
import React, { useState } from 'react';

interface SlotTabsProps {
  overviewContent: React.ReactNode;
  rtpContent: React.ReactNode;
  howToPlayContent: React.ReactNode;
}

type TabType = 'overview' | 'rtp' | 'how-to';

/**
 * SlotTabs - A minimalist, accessible tab component for secondary game data.
 * Adheres to the SpinStacks philosophy of data-focused, calm UI.
 */
const SlotTabs: React.FC<SlotTabsProps> = ({
  overviewContent,
  rtpContent,
  howToPlayContent,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'rtp', label: 'RTP & Volatility' },
    { id: 'how-to', label: 'How to Play' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return overviewContent;
      case 'rtp':
        return rtpContent;
      case 'how-to':
        return howToPlayContent;
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="border-b border-slate-100">
        <nav 
          className="-mb-px flex space-x-10 overflow-x-auto no-scrollbar" 
          aria-label="Game information sections"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-5 px-1 border-b-2 font-bold text-xs transition-all duration-300 tracking-widest uppercase
                ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-slate-900'
                    : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'
                }
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div 
        className="animate-in fade-in slide-in-from-top-1 duration-500"
        role="tabpanel"
        tabIndex={0}
      >
        <div className="text-slate-600 leading-relaxed">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SlotTabs;
