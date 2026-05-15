'use client';

import { cn } from "@/lib/utils";
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface TestimonialCardProps {
  image: string;
  quote: string;
  author: string;
  role: string;
}

const TestimonialCard = ({ image, quote, author, role }: TestimonialCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = x / rect.width;
    const normalizedY = y / rect.height;

    setMousePosition({ x: normalizedX, y: normalizedY });

    const maxTilt = 12;
    const rotateY = (normalizedX - 0.5) * maxTilt * 2;
    const rotateX = -(normalizedY - 0.5) * maxTilt * 2;

    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
      className="group relative"
    >
      <motion.div
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          y: isHovered ? -8 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        className="relative h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glowing border */}
        <div
          className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
            isHovered
              ? 'bg-gradient-to-br from-[#f5a623]/40 via-[#d4af37]/30 to-[#f5a623]/40 blur-xl opacity-100'
              : 'bg-gradient-to-br from-[#f5a623]/0 via-[#d4af37]/0 to-[#f5a623]/0 blur-xl opacity-0'
          }`}
          style={{
            animation: isHovered ? 'pulse 2s ease-in-out infinite' : 'none',
          }}
        />

        {/* Mouse-following shimmer */}
        {isHovered && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${
                mousePosition.y * 100
              }%, rgba(245, 166, 35, 0.15), transparent 40%)`,
            }}
          />
        )}

        {/* Main card */}
        <div className="w-full bg-black text-white rounded-2xl relative">
          <div className="relative -mt-px overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={author}
              className="h-[270px] w-full rounded-2xl hover:scale-105 transition-all duration-300 object-cover object-top"
            />
            <div className="absolute bottom-0 z-10 h-60 w-full bg-gradient-to-t pointer-events-none from-black to-transparent"></div>
          </div>
          <div className="px-4 pb-4">
            <p className="font-medium border-b border-gray-600 pb-5">"{quote}"</p>
            <p className="mt-4">— {author}</p>
            <p className="text-sm font-medium bg-gradient-to-r from-[#8B5CF6] via-[#E0724A] to-[#9938CA] text-transparent bg-clip-text">
              {role}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function TestimonialCards() {
  const testimonials = [
    {
      image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600",
      quote: "BonyanMisr transformed our office space into a modern masterpiece. Their attention to detail is unmatched.",
      author: "Khaled Ahmed",
      role: "CEO, Tech Solutions",
    },
    {
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600",
      quote: "The construction quality and finishing work exceeded our expectations. Highly professional team.",
      author: "Kareem Mohamed",
      role: "Property Developer",
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&h=600&auto=format&fit=crop",
      quote: "From design to execution, BonyanMisr delivered excellence at every step. Our dream home is now a reality.",
      author: "Layla Ibrahim",
      role: "Homeowner",
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600",
      quote: "Outstanding project management and timely delivery. BonyanMisr made our commercial project a success.",
      author: "Omar Khalil",
      role: "Business Owner",
    },
    {
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600",
      quote: "The interior design team created a stunning space that perfectly matches our vision. Highly recommended!",
      author: "Mona Samir",
      role: "Restaurant Owner",
    },
  ];

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide px-1">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="flex-shrink-0 w-[280px] sm:w-[300px] snap-center">
          <TestimonialCard {...testimonial} />
        </div>
      ))}
    </div>
  );
}
