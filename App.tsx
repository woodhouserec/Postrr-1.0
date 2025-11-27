import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { Feed } from './components/Feed';
import { PlaceholderPage } from './components/PlaceholderPage';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Helper to generate placeholder routes
  const placeholders = [
    { path: 'popular', title: 'Популярное' },
    { path: 'communities', title: 'Сообщества' },
    { path: 'about', title: 'О Postrr' },
    { path: 'ads', title: 'Реклама' },
    { path: 'help', title: 'Справка' },
    { path: 'investors', title: 'Инвесторам' },
    { path: 'rules', title: 'Правила Postrr' },
    { path: 'privacy', title: 'Политика конфиденциальности' },
    { path: 'terms', title: 'Пользовательское соглашение' },
  ];

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#0F1113] text-gray-100">
        <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <LeftSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
        />
        
        {/* Mobile/Tablet Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <main className="pb-10 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Feed />} />
            {placeholders.map((page) => (
              <Route 
                key={page.path} 
                path={`/${page.path}`} 
                element={<PlaceholderPage title={page.title} />} 
              />
            ))}
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;