import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';
import Image from 'next/image';

// A simple utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 600, autoRotateSpeed = 0.02, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(1024);
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const updateViewport = () => {
        setViewportWidth(window.innerWidth);
        setShouldReduceMotion(
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          window.matchMedia('(pointer: coarse)').matches
        );
      };

      updateViewport();
      window.addEventListener('resize', updateViewport, { passive: true });
      return () => window.removeEventListener('resize', updateViewport);
    }, []);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // Effect for auto-rotation when not scrolling
    useEffect(() => {
      if (shouldReduceMotion) return;

      const autoRotate = () => {
        if (!isScrolling) {
          setRotation(prev => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, autoRotateSpeed, shouldReduceMotion]);

    useEffect(() => {
      const isMobile = viewportWidth < 640;
      if (!isMobile || shouldReduceMotion || items.length <= 1) return;

      const timer = window.setInterval(() => {
        setActiveIndex(prev => (prev + 1) % items.length);
      }, 3200);

      return () => window.clearInterval(timer);
    }, [items.length, shouldReduceMotion, viewportWidth]);

    if (items.length === 0) {
      return null;
    }

    const anglePerItem = 360 / items.length;
    const isMobile = viewportWidth < 640;

    if (isMobile) {
      return (
        <div
          ref={ref}
          role="region"
          aria-label="Project gallery"
          className={cn("relative flex h-full w-full items-center justify-center overflow-hidden px-4", className)}
          {...props}
        >
          <div className="relative mx-auto mt-16 h-[390px] w-full max-w-[360px]">
            <div className="pointer-events-none absolute inset-x-8 top-12 h-72 rounded-full bg-[#d4af37]/20 blur-3xl" />
            {items.map((item, itemIndex) => {
              const isActive = itemIndex === activeIndex;
              return (
                <button
                  key={item.photo.url}
                  type="button"
                  aria-label={item.common}
                  onClick={() => setActiveIndex(itemIndex)}
                  className="absolute inset-x-0 top-6 mx-auto h-[320px] w-[min(86vw,320px)] overflow-hidden rounded-[18px] border border-white/70 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.24)] transition-all duration-500 ease-out dark:border-white/15 dark:bg-slate-900"
                  style={{
                    transform: isActive ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.96)',
                    zIndex: isActive ? 3 : 1,
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <Image
                    src={item.photo.url}
                    alt={item.photo.text}
                    fill
                    sizes="(max-width: 639px) 86vw, 300px"
                    loading={isActive ? 'eager' : 'lazy'}
                    className="object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-4 pb-4 pt-16 text-start text-white">
                    <h2 className="text-xl font-bold leading-tight">{item.common}</h2>
                    <em className="mt-1 block text-sm italic opacity-85">{item.binomial}</em>
                  </div>
                </button>
              );
            })}

            <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {items.map((item, index) => (
                <button
                  key={item.photo.url}
                  type="button"
                  aria-label={`Show ${item.common}`}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex ? "w-8 bg-[#d4af37]" : "w-2 bg-slate-400/45 dark:bg-white/35"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }

    const effectiveRadius = isMobile
      ? Math.min(radius, Math.max(82, viewportWidth * 0.24))
      : viewportWidth < 1024
        ? Math.min(radius, 260)
        : radius;
    const cardWidth = isMobile ? Math.min(168, Math.max(136, viewportWidth * 0.42)) : 300;
    const cardHeight = isMobile ? Math.round(cardWidth * 1.22) : 400;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn("relative w-full h-full flex items-center justify-center", className)}
        style={{ perspective: isMobile ? '1200px' : '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                className="absolute"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `${-cardWidth / 2}px`,
                  marginTop: `${-cardHeight / 2}px`,
                  opacity: opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/30 backdrop-blur-lg">
                  <Image
                    src={item.photo.url}
                    alt={item.photo.text}
                    fill
                    sizes="300px"
                    loading="lazy"
                    className="object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3 text-white sm:p-4">
                    <h2 className="text-sm font-bold leading-tight sm:text-xl">{item.common}</h2>
                    <em className="text-xs italic opacity-80 sm:text-sm">{item.binomial}</em>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
