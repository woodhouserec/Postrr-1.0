import React, { useState } from 'react';
import { Button } from './Button';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-[#3F4142] flex items-center justify-between px-[16px] py-[8px]">
      {/* Left: Menu & Logo */}
      <div className="flex items-center gap-3">
        {/* Burger Button - triggers sidebar */}
        <Button 
          variant="icon" 
          className="!rounded-xl !p-2 text-gray-300 hover:bg-white/10"
          onClick={onMenuToggle}
        >
          <span className="material-symbols-rounded">menu</span>
        </Button>
        
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-[98px] h-[32px] relative flex items-center justify-center">
            <img 
              src="https://raw.githubusercontent.com/woodhouserec/postrr/main/logo.svg" 
              alt="Postrr Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </a>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-[600px] px-4 hidden sm:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-[16px] flex items-center pointer-events-none">
            {/* Search Icon: Color EFF1F3 */}
            <span className="material-symbols-rounded text-[#EFF1F3] text-[20px] group-focus-within:text-white transition-colors">search</span>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="
              block w-full 
              pl-[48px] pr-[48px] py-[10px] 
              border-none 
              rounded-[12px] 
              text-[16px] leading-[20px] 
              bg-[#2C3236] hover:bg-[#353C40] 
              text-gray-100 
              placeholder-[#8FA1AC] 
              focus:outline-none focus:bg-[#2C3236] focus:ring-1 focus:ring-[#8FA1AC] 
              transition-colors
            "
            placeholder="Поиск в Postrr"
          />
          {searchValue && (
            <button 
              onClick={() => setSearchValue('')}
              className="
                absolute right-[10px] top-1/2 -translate-y-1/2
                p-1
                flex items-center justify-center
                rounded-full
                hover:bg-white/10
                text-gray-400 hover:text-white
                transition-colors cursor-pointer
              "
              aria-label="Очистить поиск"
            >
              <span className="material-symbols-rounded text-[20px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
         {/* Mobile Search Icon */}
        <Button variant="icon" className="sm:hidden !rounded-xl">
            <span className="material-symbols-rounded">search</span>
        </Button>

        {/* Login Button: Bold, 14pt (~19px), 24px leading, 8px py, 16px px */}
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold text-[19px] leading-[24px] py-[8px] px-[16px]">
          Войти
        </Button>
        
        {/* More Options: Rounded 12px */}
        <Button variant="icon" className="!rounded-xl !p-2">
          <span className="material-symbols-rounded">more_horiz</span>
        </Button>
      </div>
    </header>
  );
};