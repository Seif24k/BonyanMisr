'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { HardHat, Palette, PaintBucket } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index: number;
}

const ServiceCard = ({ icon, title, description, link, index }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize to 0-1 range
    const normalizedX = x / rect.width;
    const normalizedY = y / rect.height;

    setMousePosition({ x: normalizedX, y: normalizedY });

    // Calculate tilt (max 12deg)
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
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
        {/* Glowing border that pulses on hover */}
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
        <div
          className={`relative h-full bg-[#1e2a3a] rounded-2xl p-8 backdrop-blur-xl border transition-all duration-500 ${
            isHovered
              ? 'border-[#f5a623]/60 shadow-2xl shadow-[#f5a623]/20'
              : 'border-[#2d3e52]/50 shadow-lg shadow-black/20'
          }`}
          style={{
            background: 'linear-gradient(135deg, #1e2a3a 0%, #1a2332 100%)',
          }}
        >
          {/* Subtle inner light at top edge */}
          <div
            className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-30'
            }`}
            style={{
              background: 'linear-gradient(90deg, transparent, #f5a623, transparent)',
            }}
          />

          {/* Icon with circular glow */}
          <motion.div
            animate={{
              y: isHovered ? -4 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }}
            className="relative mb-6 inline-block"
          >
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                isHovered
                  ? 'bg-[#f5a623]/30 blur-2xl scale-150'
                  : 'bg-[#f5a623]/10 blur-xl scale-100'
              }`}
            />
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#f5a623]/20 to-[#d4af37]/10 border border-[#f5a623]/30">
              <div className="text-[#f5a623]">{icon}</div>
            </div>
          </motion.div>

          {/* Title with sliding underline */}
          <h3 className="text-2xl font-bold text-white mb-4 relative inline-block">
            {title}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '100%' : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#f5a623] to-[#d4af37]"
            />
          </h3>

          {/* Description */}
          <p className="text-[#94a3b8] mb-6 leading-7">{description}</p>

          {/* Learn more link */}
          <Link
            href={link}
            className="inline-flex items-center gap-2 text-[#f5a623] font-semibold group/link"
          >
            <span>Learn more</span>
            <motion.span
              animate={{
                x: isHovered ? 4 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PremiumServicesSection() {
  const services = [
    {
      icon: <HardHat className="w-8 h-8" strokeWidth={1.5} />,
      title: 'Construction',
      description:
        'From residential complexes to commercial hubs, we build robust structures that stand the test of time.',
      link: '/services',
    },
    {
      icon: <Palette className="w-8 h-8" strokeWidth={1.5} />,
      title: 'Interior Design',
      description:
        'Creating functional and aesthetically pleasing interior spaces that reflect your personal style.',
      link: '/services',
    },
    {
      icon: <PaintBucket className="w-8 h-8" strokeWidth={1.5} />,
      title: 'Finishing',
      description:
        'High-end finishing works including flooring, painting, plastering, and custom joinery.',
      link: '/services',
    },
  ];

  // Fixed positions for stars to avoid hydration mismatch
  const starPositions = [
    { left: 10, top: 15 }, { left: 25, top: 8 }, { left: 45, top: 20 },
    { left: 60, top: 12 }, { left: 75, top: 25 }, { left: 85, top: 18 },
    { left: 15, top: 40 }, { left: 35, top: 35 }, { left: 50, top: 45 },
    { left: 70, top: 38 }, { left: 90, top: 42 }, { left: 20, top: 60 },
    { left: 40, top: 55 }, { left: 55, top: 65 }, { left: 80, top: 58 },
    { left: 12, top: 75 }, { left: 30, top: 70 }, { left: 48, top: 80 },
    { left: 65, top: 72 }, { left: 88, top: 78 }, { left: 18, top: 90 },
    { left: 38, top: 85 }, { left: 58, top: 92 }, { left: 78, top: 88 },
    { left: 22, top: 28 }, { left: 42, top: 22 }, { left: 62, top: 32 },
    { left: 82, top: 48 }, { left: 28, top: 52 }, { left: 52, top: 15 },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-transparent">
      {/* Floating star dots */}
      <div className="absolute inset-0 pointer-events-none">
        {starPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: (i % 5) * 0.4,
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#f5a623]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f5a623 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(245, 166, 35, 0.3)',
            }}
          >
            Our Services
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#94a3b8] text-lg tracking-wide"
            style={{ letterSpacing: '0.1em' }}
          >
            Comprehensive solutions for all your construction and design needs
          </motion.p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
