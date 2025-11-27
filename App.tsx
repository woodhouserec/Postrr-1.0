import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LeftSidebar } from './components/LeftSidebar';
import { Feed } from './components/Feed';
import { PlaceholderPage } from './components/PlaceholderPage';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-[#0F1113] text-gray-100">
        <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <LeftSidebar isOpen={isSidebarOpen} />
        
        {/* Mobile/Tablet Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <main className="pb-10 pt-4">
          <Routes>
            <Route path="/" element={<Feed />} />
            
            {/* Placeholders for sidebar items */}
            <Route path="/popular" element={<PlaceholderPage title="Популярное" />} />
            <Route path="/communities" element={<PlaceholderPage title="Сообщества" />} />
            
            <Route path="/about" element={<PlaceholderPage title="О Postrr" />} />
            <Route path="/ads" element={<PlaceholderPage title="Реклама" />} />
            <Route path="/help" element={<PlaceholderPage title="Справка" />} />
            <Route path="/investors" element={<PlaceholderPage title="Инвесторам" />} />
            
            <Route path="/rules" element={<PlaceholderPage title="Правила Postrr" />} />
            <Route path="/privacy" element={<PlaceholderPage title="Политика конфиденциальности" />} />
            <Route path="/terms" element={<PlaceholderPage title="Пользовательское соглашение" />} />
            
            {/* Fallback */}
            <Route path="*" element={<PlaceholderPage title="404" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;