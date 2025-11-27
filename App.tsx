import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeedFilter } from './components/FeedFilter';
import { PostCard } from './components/PostCard';
import { LeftSidebar } from './components/LeftSidebar';
import { POSTS } from './constants';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
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
      
      <main className="pb-10 transition-all duration-300">
        <HeroSection />
        
        <div className="w-full max-w-[1200px] mx-auto px-0 sm:px-4">
          {/* Flex layout with strict 40px gap */}
          <div className="flex flex-col md:flex-row justify-center items-start gap-6 md:gap-[40px]">
            {/* Feed Column */}
            <div className="w-full max-w-[700px]">
              <FeedFilter />
              
              {POSTS.map((post, index) => (
                <React.Fragment key={post.id}>
                  <PostCard post={post} />
                  {/* Divider between posts on desktop */}
                  {index < POSTS.length - 1 && (
                    <div className="hidden md:block h-[1px] bg-[#26282A] my-1" />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="hidden md:block w-[310px] shrink-0">
              <div className="sticky top-20 bg-[#141718] rounded-2xl border border-white/5 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wide">Популярные сообщества</h3>
                </div>
                <div className="space-y-4">
                   {[1, 2, 3, 4, 5].map(i => (
                     <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-700" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">r/popular_{i}</span>
                            <span className="text-xs text-gray-500">{i * 1234} участников</span>
                          </div>
                        </div>
                        {/* Secondary button - rounded-lg (8px) */}
                        <button className="px-3 py-1 bg-[#2C3236] hover:bg-[#353C40] active:bg-[#24292C] rounded-lg text-xs font-bold text-white transition-colors">Join</button>
                     </div>
                   ))}
                </div>
              </div>
              
              <div className="sticky top-[380px] mt-4 bg-[#141718] rounded-2xl border border-white/5 p-4">
                 <div className="text-xs text-gray-500 leading-relaxed">
                    <p>Postrr Inc © 2024. All rights reserved.</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">User Agreement</a>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;