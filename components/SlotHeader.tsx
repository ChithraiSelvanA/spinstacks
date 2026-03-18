
import React from 'react';

interface SlotHeaderProps {
  slotName: string;
  providerName: string;
  providerSlug: string;
  releaseYear?: string | number;
  category?: string;
}

/**
 * SlotHeader - A typography-first header component for SpinStacks.
 * Focuses on clarity and metadata without aggressive marketing elements.
 */
const SlotHeader: React.FC<SlotHeaderProps> = ({
  slotName,
  providerName,
  providerSlug,
  releaseYear,
  category,
}) => {
  return (
    <header className="space-y-6">
      {(releaseYear || category) && (
        <div className="flex items-center gap-4">
          {releaseYear && (
            <span className="label-caps text-slate-400">
              Released: {releaseYear}
            </span>
          )}
          {releaseYear && category && (
            <span className="w-1 h-1 bg-slate-300 rounded-full" aria-hidden="true" />
          )}
          {category && (
            <span className="label-caps text-slate-400">
              Category: {category}
            </span>
          )}
        </div>
      )}

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
          {slotName}
        </h1>
        <p className="text-lg sm:text-xl font-medium text-slate-500 leading-relaxed">
          Independent mathematical analysis of the simulation by{' '}
          <a
            href={`/providers/${providerSlug}`}
            onClick={(e) => e.preventDefault()}
            className="text-indigo-600 hover:text-indigo-800 underline decoration-indigo-600/20 hover:decoration-indigo-600 underline-offset-8 transition-all duration-300"
          >
            {providerName}
          </a>
        </p>
      </div>
    </header>
  );
};

export default SlotHeader;
