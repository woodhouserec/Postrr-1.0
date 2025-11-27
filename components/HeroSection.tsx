import React, { useRef, useState, useEffect } from 'react';
import { HERO_CARDS } from '../constants';

export const HeroSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftBtn, setShowLeftBtn] = useState(false);
  const [showRightBtn, setShowRightBtn] = useState(true);
  const [cards, setCards] = useState(HERO_CARDS);

  // Function to check scroll position and update button visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      
      // Show left button if we are not at the very start
      setShowLeftBtn(scrollLeft > 0);
      
      // Show right button if we have not reached the very end (with small tolerance for rounding)
      setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Initial check
      checkScrollPosition();
      // Add event listener
      container.addEventListener('scroll', checkScrollPosition);
      // Clean up
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Fetch trending news from WikiNews API
  useEffect(() => {
    const fetchWikiNews = async () => {
      try {
        // Construct URL for Russian WikiNews API
        // generator=categorymembers: gets pages from "Category:Published" (news feed)
        // prop=pageimages|extracts: gets thumbnail and summary
        const params = new URLSearchParams({
          action: "query",
          format: "json",
          origin: "*", // Required for CORS
          generator: "categorymembers",
          gcmtitle: "Категория:Опубликовано", // Main news category in RU Wikinews
          gcmtype: "page",
          gcmsort: "timestamp",
          gcmdir: "desc", // Newest first
          gcmlimit: "10",
          prop: "pageimages|extracts|info",
          pithumbsize: "800", // High res images
          exintro: "true",
          explaintext: "true", // Plain text only
          exchars: "200" // Limit summary length
        });

        const response = await fetch(`https://ru.wikinews.org/w/api.php?${params.toString()}`);
        const data = await response.json();

        if (data.query && data.query.pages) {
          // Convert object to array and map to our card structure
          const newsItems = Object.values(data.query.pages).map((page: any, index: number) => {
            // Check for image, otherwise it will fall back to error handler (color fill)
            const imageUrl = page.thumbnail ? page.thumbnail.source : null;

            return {
              id: `wikinews-${page.pageid}`,
              title: page.title,
              subtitle: page.extract || 'Читать подробнее...',
              subreddit: 'p/wikinews',
              image: imageUrl, 
              // We pass null if no image, the img onError will handle hiding it/showing color
            };
          });

          if (newsItems.length > 0) {
            setCards(newsItems);
          }
        }
      } catch (error) {
        console.error("Failed to fetch WikiNews:", error);
        // Fallback to static cards is automatic since 'cards' is initialized with HERO_CARDS
      }
    };

    fetchWikiNews();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 270; 
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full flex justify-center pt-4 pb-2 px-0 sm:px-4">
      {/* 
        Max width constrained to 1050px.
        Relative container for positioning nav buttons.
      */}
      <div className="w-full max-w-[1050px] relative group/carousel">
        
        {/* Left Navigation Button */}
        {showLeftBtn && (
          <button 
            onClick={() => scroll('left')}
            className="
              absolute left-[16px] top-1/2 -translate-y-1/2 z-20 
              w-[32px] h-[32px] 
              flex items-center justify-center 
              bg-[#2C3236]/40 hover:bg-[#2C3236]/80
              rounded-[12px] 
              text-white 
              opacity-0 group-hover/carousel:opacity-100 transition-all 
              cursor-pointer
            "
            aria-label="Scroll left"
          >
             {/* Chevron Left */}
             <span className="material-symbols-rounded text-[16px]">{'\ue5cb'}</span>
          </button>
        )}

        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 no-scrollbar pb-4 scroll-smooth"
        >
          {cards.map((card) => (
            <div 
              key={card.id}
              // Width adjusted to ~250px so roughly 4 fit in 1050px
              className="relative flex-shrink-0 w-[250px] h-48 rounded-2xl overflow-hidden cursor-pointer group bg-[#2C3236]"
            >
              {/* Background Image or Color Fallback */}
              {card.image ? (
                <img 
                  src={card.image} 
                  alt={card.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.currentTarget;
                    // Hide broken image, revealing the bg-[#2C3236]
                    target.style.display = 'none';
                  }}
                />
              ) : (
                // Explicit gradient fallback if no image provided from API
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#2C3236] to-[#1A1A1B]" />
              )}
              
              {/* Gradient Overlay (always visible to ensure text readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-gray-100 font-bold text-lg leading-snug mb-1 truncate">
                  {card.title}
                </h3>
                {/* Updated subtitle styles: truncate to 1 line */}
                <p className="text-[#FFFFFF] text-sm sm:text-base font-normal leading-relaxed mb-2 truncate">
                  {card.subtitle}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                     {/* Icon fallback logic could go here */}
                     <span className="text-[12px]">W</span>
                  </div>
                  <span className="text-xs text-gray-200 font-bold truncate">{card.subreddit}</span>
                </div>
              </div>
            </div>
          ))}
          {/* Right spacer to allow scrolling to the very end comfortably */}
          <div className="w-1 flex-shrink-0" /> 
        </div>

        {/* Right Navigation Button */}
        {showRightBtn && (
          <button 
            onClick={() => scroll('right')}
            className="
              absolute right-[16px] top-1/2 -translate-y-1/2 z-20 
              w-[32px] h-[32px] 
              flex items-center justify-center 
              bg-[#2C3236]/40 hover:bg-[#2C3236]/80
              rounded-[12px] 
              text-white 
              opacity-0 group-hover/carousel:opacity-100 transition-all 
              cursor-pointer
            "
            aria-label="Scroll right"
          >
            {/* Chevron Right */}
            <span className="material-symbols-rounded text-[16px]">{'\ue5cc'}</span>
          </button>
        )}

      </div>
    </div>
  );
};