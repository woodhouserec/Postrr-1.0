import React from 'react';

export const FeedFilter: React.FC = () => {
  return (
    <div className="w-full mb-2">
      <div className="flex items-center gap-4 mb-2 px-3 sm:px-4">
        {/* Main filter controls - rounded-xl (12px) */}
        <button className="flex items-center gap-2 text-sm font-bold text-gray-100 hover:bg-white/10 px-3 py-1.5 rounded-xl transition-colors">
          Лучшие
          <span className="material-symbols-rounded text-[16px]">expand_more</span>
        </button>
        
        <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:bg-white/10 px-3 py-1.5 rounded-xl transition-colors">
          Везде
          <span className="material-symbols-rounded text-[16px]">expand_more</span>
        </button>
      </div>
      {/* Divider */}
      <div className="h-[1px] bg-[#26282A] w-full" />
    </div>
  );
};