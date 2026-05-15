'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const projectImagesRow1 = [
  {
    title: 'تصميم مطبخ عصري',
    image: '/images/projects/carousel-1.jpg',
  },
  {
    title: 'غرفة معيشة فاخرة',
    image: '/images/projects/interior-living.jpg',
  },
  {
    title: 'غرفة طعام معاصرة',
    image: '/images/projects/carousel-2.jpg',
  },
  {
    title: 'جناح غرفة النوم الرئيسية',
    image: '/images/projects/interior-bedroom-1.jpg',
  },
  {
    title: 'تصميم داخلي حديث',
    image: '/images/projects/carousel-3.jpg',
  },
  {
    title: 'غرفة نوم أنيقة',
    image: '/images/projects/interior-bedroom-2.jpg',
  },
];

const projectImagesRow2 = [
  {
    title: 'تشطيبات راقية',
    image: '/images/projects/carousel-4.jpg',
  },
  {
    title: 'التميز المعماري',
    image: '/images/projects/carousel-5.jpg',
  },
  {
    title: 'تصميمات داخلية فاخرة',
    image: '/images/projects/carousel-6.jpg',
  },
  {
    title: 'مشروع 1',
    image: '/images/projects/01.jpg.jpeg',
  },
  {
    title: 'مشروع 2',
    image: '/images/projects/02.jpg.jpeg',
  },
  {
    title: 'مشروع 3',
    image: '/images/projects/03.jpg.jpeg',
  },
];

export function PortfolioInfiniteSliderAr() {
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
    <section className="relative overflow-hidden bg-transparent py-8 sm:py-16">
      {/* Section Header */}
      <div className="mx-auto mb-8 max-w-7xl px-4 text-center sm:mb-12">
        <h2 className="relative mb-3 inline-block overflow-hidden text-2xl font-bold text-slate-950 dark:text-white sm:text-4xl md:text-5xl">
          <span className="relative z-10">المشاريع المميزة</span>
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
          className="mb-4 flex select-none gap-4 sm:mb-6 sm:gap-6"
          dir="ltr"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            animationPlayState: isPaused ? 'paused' : 'running',
            transform: isDragging ? `translateX(${dragOffset}px)` : undefined,
          }}
        >
          <div 
            className="animate-scroll-left flex gap-4 sm:gap-6"
            style={{
              animationPlayState: isPaused || isDragging ? 'paused' : 'running',
            }}
          >
            {duplicatedRow1.map((image, index) => (
              <div
                key={`row1-${index}`}
                className="w-[190px] flex-shrink-0 overflow-hidden rounded-[12px] border border-[rgba(212,175,55,0.15)] aspect-video shadow-lg transition-all duration-300 hover:scale-[1.04] hover:border-[rgba(212,175,55,0.6)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)] sm:w-[320px] sm:rounded-[14px]"
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
          className="flex select-none gap-4 sm:gap-6"
          dir="ltr"
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            animationPlayState: isPaused ? 'paused' : 'running',
            transform: isDragging ? `translateX(${-dragOffset}px)` : undefined,
          }}
        >
          <div 
            className="animate-scroll-right flex gap-4 sm:gap-6"
            style={{
              animationPlayState: isPaused || isDragging ? 'paused' : 'running',
            }}
          >
            {duplicatedRow2.map((image, index) => (
              <div
                key={`row2-${index}`}
                className="w-[190px] flex-shrink-0 overflow-hidden rounded-[12px] border border-[rgba(212,175,55,0.15)] aspect-video shadow-lg transition-all duration-300 hover:scale-[1.04] hover:border-[rgba(212,175,55,0.6)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)] sm:w-[320px] sm:rounded-[14px]"
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

        @media (pointer: coarse), (prefers-reduced-motion: reduce) {
          .animate-scroll-left,
          .animate-scroll-right,
          .animate-shimmer-sweep {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
