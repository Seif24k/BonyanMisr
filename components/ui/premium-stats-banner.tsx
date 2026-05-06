'use client';

import { useEffect, useRef, useState } from 'react';
import { Clock, FileText, Smile, Users } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  number: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: <Clock className="w-8 h-8" />,
    number: 15,
    suffix: '+',
    label: 'Years Experience',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    number: 200,
    suffix: '+',
    label: 'Projects Completed',
  },
  {
    icon: <Smile className="w-8 h-8" />,
    number: 500,
    suffix: '+',
    label: 'Happy Clients',
  },
  {
    icon: <Users className="w-8 h-8" />,
    number: 150,
    suffix: '+',
    label: 'Team Members',
  },
];

function CountUpNumber({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-[3.5rem] font-bold text-[#0a1628] leading-none">
      {count}
    </div>
  );
}

export function PremiumStatsBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full py-[60px] overflow-hidden transition-all duration-600 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{
        background: 'linear-gradient(120deg, #b8860b 0%, #f5a623 40%, #e8c547 60%, #c9890a 100%)',
        borderTop: '1px solid #b8860b',
        borderBottom: '1px solid #b8860b',
        boxShadow: 'inset 0 4px 20px rgba(0,0,0,0.15)',
      }}
    >
      {/* Diagonal Line Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.03) 0px,
            rgba(0, 0, 0, 0.03) 2px,
            transparent 2px,
            transparent 4px
          )`,
        }}
      />

      {/* Dark Vignette on Edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(10, 22, 40, 0.3) 0%, transparent 15%, transparent 85%, rgba(10, 22, 40, 0.3) 100%)',
        }}
      />

      {/* Stats Container */}
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative flex flex-col items-center justify-center py-8 transition-all duration-300 hover:scale-105 hover:brightness-110 ${
                index < stats.length - 1 ? 'md:border-r border-[rgba(0,0,0,0.15)]' : ''
              }`}
            >
              {/* Icon */}
              <div className="mb-4 text-[#0a1628] opacity-70">{stat.icon}</div>

              {/* Number with Count-up */}
              <div className="flex items-start gap-1">
                <CountUpNumber end={stat.number} />
                <span className="text-[2.5rem] font-bold text-[#b8860b] animate-pulse mt-1">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <div className="mt-3 text-[#3d2b00] font-medium text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
