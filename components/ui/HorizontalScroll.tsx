'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PremiumSectionHeader } from '@/components/ui/premium-section-header';

export interface HorizontalScrollItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
}

interface HorizontalScrollProps {
  items: HorizontalScrollItem[];
  title?: string;
  subtitle?: string;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  items,
  title = 'Featured Projects',
  subtitle,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Create many duplicates for smooth infinite loop
  const duplicatedItems = [...items, ...items, ...items, ...items, ...items];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let intervalId: NodeJS.Timeout;
    const startTimeoutId: NodeJS.Timeout = setTimeout(() => {
      if (!isPaused) {
        intervalId = setInterval(() => {
          if (container && !isPaused) {
            container.scrollLeft += 1; // Scroll 1 pixel every 16ms (smooth 60fps)

            // Reset position for infinite loop
            const cardWidth = container.offsetWidth * 0.45;
            const totalWidth = cardWidth * items.length;
            
            if (container.scrollLeft >= totalWidth * 2) {
              container.scrollLeft -= totalWidth;
            }
          }
        }, 16); // ~60fps
      }
    }, 100);

    return () => {
      if (startTimeoutId) {
        clearTimeout(startTimeoutId);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPaused, items.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.45;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative py-8 overflow-hidden">
      {/* Section Header */}
      <PremiumSectionHeader title={title} subtitle={subtitle} className="mb-8 px-4" />

      {/* Horizontal Scroll Container */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white dark:hover:bg-gray-700"
        >
          <ChevronRight className="w-6 h-6 text-gray-900 dark:text-white" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          dir="ltr"
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 md:px-8 cursor-grab active:cursor-grabbing"
          style={{ scrollBehavior: 'auto' }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[85vw] md:w-[70vw] lg:w-[45vw] group/card"
            >
              <div className="relative h-[350px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* Image */}
                <div className="relative h-full w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8" dir="auto">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="px-4 py-2 bg-[#d4af37]/20 backdrop-blur-sm border border-[#d4af37]/50 rounded-full text-[#d4af37] text-sm font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-xl text-gray-300 mb-3">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-base text-gray-400 mb-6 line-clamp-2">
                    {item.description}
                  </p>

                  {/* CTA Button */}
                  <a
                    href={`/project/${item.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="self-start px-6 py-3 bg-[#d4af37] hover:bg-[#b8860b] text-gray-900 font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] flex items-center gap-2"
                  >
                    View Project
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
