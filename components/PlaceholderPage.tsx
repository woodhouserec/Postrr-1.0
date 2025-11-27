import React from 'react';
import { NavLink } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 text-center">
      <div className="w-[150px] mb-8">
        <img 
          src="https://raw.githubusercontent.com/woodhouserec/postrr/main/logo.svg" 
          alt="Postrr Logo" 
          className="w-full opacity-50 grayscale"
        />
      </div>
      
      <h1 className="text-2xl font-bold text-gray-200 mb-2">Наберитесь терпения</h1>
      <p className="text-[#8FA1AC] max-w-md">
        Страница <span className="text-primary font-bold">{title}</span> в данный момент находится в разработке.
      </p>
      
      <NavLink 
        to="/" 
        className="mt-8 px-6 py-2 bg-[#2C3236] hover:bg-[#353C40] text-white rounded-xl font-bold transition-colors"
      >
        Вернуться на главную
      </NavLink>
    </div>
  );
};