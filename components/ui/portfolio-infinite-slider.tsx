'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PremiumSectionHeader } from '@/components/ui/premium-section-header';

const projectImagesRow1 = [
  {
    title: 'Modern Kitchen Design',
    image: '/images/projects/carousel-1.jpg',
  },
  {
    title: 'Luxury Living Room',
    image: '/images/projects/interior-living.jpg',
  },
  {
    title: 'Contemporary Dining',
    image: '/images/projects/carousel-2.jpg',
  },
  {
    title: 'Master Bedroom Suite',
    image: '/images/projects/interior-bedroom-1.jpg',
  },
  {
    title: 'Modern Interior',
    image: '/images/projects/carousel-3.jpg',
  },
  {
    title: 'Elegant Bedroom',
    image: '/images/projects/interior-bedroom-2.jpg',
  },
];

const projectImagesRow2 = [
  {
    title: 'Premium Finishing',
    image: '/images/projects/carousel-4.jpg',
  },
  {
    title: 'Architectural Excellence',
    image: '/images/projects/carousel-5.jpg',
  },
  {
    title: 'Luxury Interiors',
    image: '/images/projects/carousel-6.jpg',
  },
  {
    title: 'Project 1',
    image: '/images/projects/01.jpg.jpeg',
  },
  {
    title: 'Project 2',
    image: '/images/projects/02.jpg.jpeg',
  },
  {
    title: 'Project 3',
    image: '/images/projects/03.jpg.jpeg',
  },
];

export function PortfolioInfiniteSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Duplicate images for seamless loop
  const duplicatedRow1 = [...projectImagesRow1, ...projectImagesRow1];
  const duplicatedRow2 = [...projectImagesRow2, ...projectImagesRow2];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX - dragOffset);
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.clientX - startX;
    setDragOffset(x);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
    setIsPaused(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setIsPaused(false);
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  return (
    <section className="relative py-16 overflow-hidden bg-transparent">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white relative inline-block overflow-hidden">
          <span className="relative z-10">Featured Projects</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent animate-shimmer-sweep" />
        </h2>
      </div>

      {/* Slider Container with Edge Fade */}
      <div 
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* First Row - Scrolls Left */}
        <div 
          ref={row1Ref}
          className="flex gap-6 mb-6 select-none"
          dir="ltr"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            animationPlayState: isPaused ? 'paused' : 'running',
            transform: isDragging ? `translateX(${dragOffset}px)` : undefined,
          }}
        >
          <div 
            className="flex gap-6 animate-scroll-left"
            style={{
              animationPlayState: isPaused || isDragging ? 'paused' : 'running',
            }}
          >
            {duplicatedRow1.map((image, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-[320px] aspect-video rounded-[14px] overflow-hidden border border-[rgba(212,175,55,0.15)] shadow-lg transition-all duration-300 hover:scale-[1.04] hover:border-[rgba(212,175,55,0.6)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <Image
                  src={image.image}
                  alt={image.title}
                  width={640}
                  height={360}
                  loading="lazy"
                  quality={75}
                  className="object-cover h-full w-full"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Scrolls Right */}
        <div 
          ref={row2Ref}
          className="flex gap-6 select-none"
          dir="ltr"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            animationPlayState: isPaused ? 'paused' : 'running',
            transform: isDragging ? `translateX(${-dragOffset}px)` : undefined,
          }}
        >
          <div 
            className="flex gap-6 animate-scroll-right"
            style={{
              animationPlayState: isPaused || isDragging ? 'paused' : 'running',
            }}
          >
            {duplicatedRow2.map((image, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-[320px] aspect-video rounded-[14px] overflow-hidden border border-[rgba(212,175,55,0.15)] shadow-lg transition-all duration-300 hover:scale-[1.04] hover:border-[rgba(212,175,55,0.6)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <Image
                  src={image.image}
                  alt={image.title}
                  width={640}
                  height={360}
                  loading="lazy"
                  quality={75}
                  className="object-cover h-full w-full"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes shimmer-sweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 35s linear infinite;
        }

        .animate-shimmer-sweep {
          animation: shimmer-sweep 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
