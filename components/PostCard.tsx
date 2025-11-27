import React, { useState } from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [voteStatus, setVoteStatus] = useState<'none' | 'up' | 'down'>('none');
  const [animateType, setAnimateType] = useState<'none' | 'up' | 'down'>('none');
  const [currentUpvotes, setCurrentUpvotes] = useState(post.upvotes);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + ' тыс.';
    }
    return num;
  };

  const handleVote = (type: 'up' | 'down') => {
    // Trigger animation
    setAnimateType(type);
    setTimeout(() => setAnimateType('none'), 300); // Reset animation state after 300ms

    // Logic for updating vote status and count
    if (voteStatus === type) {
      // Toggle off
      setVoteStatus('none');
      setCurrentUpvotes(post.upvotes);
    } else {
      // Toggle on (remove other vote if exists)
      setVoteStatus(type);
      if (type === 'up') {
        // If switching from down to up, strictly speaking +2, but for simple UI logic we just set +1 from base
        setCurrentUpvotes(post.upvotes + 1);
      } else {
        setCurrentUpvotes(post.upvotes - 1);
      }
    }
  };

  return (
    <div className="
      group flex flex-col
      overflow-hidden transition-colors duration-200
      
      /* Mobile: Card appearance */
      bg-[#141718] 
      border border-white/5 hover:border-white/10
      rounded-xl
      mb-4
      
      /* Desktop: List appearance */
      md:bg-transparent 
      md:hover:bg-[#141718]
      md:border-0 
      md:rounded-none
      md:hover:rounded-xl
      md:mb-0
    ">
      <div className="flex">
        {/* Vote Column (Desktop style) - sometimes this is separate, here simplified vertically or inside */}
      </div>
      
      <div className="p-3 sm:p-4 w-full">
        {/* Meta Header */}
        <div className="flex items-center justify-between mb-3 text-xs sm:text-sm text-gray-400">
          <div className="flex items-center gap-2">
            {post.subreddit.icon && (
              <span className="text-lg">{post.subreddit.icon}</span>
            )}
            <span className="font-bold text-gray-200 hover:underline cursor-pointer">
              {post.subreddit.name}
            </span>
            <span className="text-gray-600">•</span>
            <span>{post.timestamp}</span>
            {post.author && (
                <>
                  <span className="text-gray-600">•</span>
                  <span className="hover:underline cursor-pointer">Post by {post.author}</span>
                </>
            )}
            <span className="hidden sm:inline text-gray-600">•</span>
            <span className="hidden sm:inline">Популярно на Postrr прямо сейчас</span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Secondary button: rounded-lg (8px) - Updated colors */}
            <button className="bg-[#2C3236] hover:bg-[#353C40] active:bg-[#24292C] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors">
              Стать участником
            </button>
            <button className="p-1 hover:bg-[#353C40] rounded-full text-gray-400 transition-colors flex items-center justify-center">
              <span className="material-symbols-rounded text-[16px]">more_horiz</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mb-3">
          {/* Title: Changed font-medium to font-bold */}
          <h2 className="text-lg sm:text-xl font-bold text-gray-100 mb-2 leading-snug">
            {post.title}
          </h2>
          
          {post.type === 'text' && post.content && (
             <div className="relative">
                {/* Content: Changed text-gray-300 to text-[#B7CAD4] and ensured font-normal */}
                <p className="text-sm sm:text-base text-[#B7CAD4] font-normal leading-relaxed break-words">
                  {post.content}
                </p>
                {/* Fade out effect for long text if truncated (optional aesthetic) */}
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#141718] to-transparent md:group-hover:from-[#141718] md:from-[#0F1113]" />
             </div>
          )}

          {post.type === 'image' && post.image && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-white/5 bg-black flex justify-center">
              <img 
                src={post.image} 
                alt={post.title}
                className="max-h-[500px] object-contain w-full" 
              />
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 text-sm font-bold">
          {/* Vote Pills - rounded-[12px] - Updated bg to #2C3236 */}
          <div className="flex items-center bg-[#2C3236] rounded-[12px] overflow-hidden">
             <button 
               onClick={() => handleVote('up')}
               className={`
                 p-2 pl-3 flex items-center transition-all duration-200 ease-out
                 hover:bg-[#353C40] active:bg-[#24292C]
                 ${voteStatus === 'up' ? 'text-orange-500' : 'text-[#B7CAD4] hover:text-orange-500'}
                 ${animateType === 'up' ? 'scale-125' : 'scale-100'}
               `}
               aria-label="Upvote"
             >
               <span className="material-symbols-rounded text-[22px]">arrow_upward</span>
             </button>
             
             <span className={`
               px-1 min-w-[1.5rem] text-center text-xs sm:text-sm transition-colors duration-200
               ${voteStatus === 'up' ? 'text-orange-500' : voteStatus === 'down' ? 'text-blue-500' : 'text-[#FFFFFF]'}
             `}>
                {formatNumber(currentUpvotes)}
             </span>
             
             <button 
               onClick={() => handleVote('down')}
               className={`
                 p-2 pr-3 flex items-center transition-all duration-200 ease-out
                 hover:bg-[#353C40] active:bg-[#24292C]
                 ${voteStatus === 'down' ? 'text-blue-500' : 'text-[#B7CAD4] hover:text-blue-500'}
                 ${animateType === 'down' ? 'scale-125' : 'scale-100'}
               `}
               aria-label="Downvote"
             >
               <span className="material-symbols-rounded text-[22px]">arrow_downward</span>
             </button>
          </div>

          {/* Comments - rounded-[12px] - Updated bg to #2C3236 */}
          <button className="flex items-center gap-2 px-3 py-2 bg-[#2C3236] hover:bg-[#353C40] active:bg-[#24292C] rounded-[12px] transition-colors">
            <span className="material-symbols-rounded text-[18px] text-[#B7CAD4]">chat_bubble_outline</span>
            <span className="text-[#FFFFFF]">{post.comments}</span>
          </button>

          {/* Share - rounded-[12px] - Updated bg to #2C3236 */}
          <button className="flex items-center gap-2 px-3 py-2 bg-[#2C3236] hover:bg-[#353C40] active:bg-[#24292C] rounded-[12px] transition-colors">
            <span className="material-symbols-rounded text-[18px] text-[#B7CAD4]">share</span>
            <span className="hidden sm:inline text-[#FFFFFF]">Поделиться</span>
          </button>
        </div>
      </div>
    </div>
  );
};