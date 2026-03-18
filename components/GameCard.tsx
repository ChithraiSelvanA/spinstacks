
import React from 'react';
import { SlotGame, Volatility } from '../types';

interface GameCardProps {
  game: SlotGame;
  onClick: (game: SlotGame) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const getVolatilityColor = (v: Volatility) => {
    switch (v) {
      case Volatility.LOW: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case Volatility.MEDIUM: return 'bg-blue-50 text-blue-700 border-blue-100';
      case Volatility.HIGH: return 'bg-amber-50 text-amber-700 border-amber-100';
      case Volatility.EXTREME: return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div 
      className="data-card group flex flex-col h-full cursor-pointer overflow-hidden"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
           <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[9px] font-bold uppercase tracking-wider rounded border border-slate-200 text-slate-700 shadow-sm">
            {game.provider}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
            {game.title}
          </h3>
          <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">{game.rtp}% RTP</span>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getVolatilityColor(game.volatility)}`}>
            {game.volatility}
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
          <div>
            <p className="label-caps mb-1">Max Win</p>
            <p className="text-slate-900 font-bold text-sm">{game.maxWin}</p>
          </div>
          <div className="text-right">
            <p className="label-caps mb-1">Layout</p>
            <p className="text-slate-900 font-bold text-sm">{game.reels}</p>
          </div>
        </div>
        
        <button className="mt-6 w-full py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default GameCard;
