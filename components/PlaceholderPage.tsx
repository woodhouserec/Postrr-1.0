import React from 'react';
import { NavLink } from 'react-router-dom';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center p-4" style={{ minHeight: 'calc(100vh - 60px)' }}>
      <div className="w-[150px] mb-6 opacity-50">
         <img 
            src="https://raw.githubusercontent.com/woodhouserec/postrr/main/logo.svg" 
            alt="Postrr Logo" 
            className="w-full h-full object-contain grayscale"
         />
      </div>
      <h1 className="text-2xl font-bold text-gray-200 mb-2">Наберитесь терпения</h1>
      <p className="text-[#8FA1AC] max-w-md mb-8">
        Страница <span className="text-primary font-semibold">{title}</span> в данный момент находится в разработке. Мы работаем над тем, чтобы сделать её потрясающей.
      </p>
      
      <NavLink 
        to="/"
        className="px-6 py-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors"
      >
        Вернуться на главную
      </NavLink>
    </div>
  );
};