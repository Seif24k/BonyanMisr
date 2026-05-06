'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { HardHat, Palette, PaintBucket, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PremiumSectionHeader } from '@/components/ui/premium-section-header';

interface Project {
  id: number;
  image: string;
  category: 'Build' | 'Design' | 'Finish Line' | 'Three in One' | 'Interior Design' | 'Construction' | 'Quality';
  title: string;
}

const categoryIcons = {
  'Build': HardHat,
  'Design': Palette,
  'Finish Line': PaintBucket,
  'Three in One': HardHat,
  'Interior Design': Palette,
  'Construction': HardHat,
  'Quality': PaintBucket,
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = categoryIcons[project.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <Link href={`/project/${project.id}`}>
        <motion.div
          animate={{
            scale: isHovered ? 1.03 : 1,
            y: isHovered ? -6 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className={`relative rounded-2xl overflow-hidden border transition-all duration-400 ${
            isHovered
              ? 'border-[rgba(245,166,35,0.6)] shadow-[0_20px_40px_rgba(245,166,35,0.25)]'
              : 'border-[rgba(245,166,35,0.15)] shadow-lg'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          {/* Image Container */}
          <div className="relative h-80 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />

            {/* Shimmer Sweep Effect */}
            {isHovered && (
              <motion.div
                initial={{ x: '-100%', y: '-100%' }}
                animate={{ x: '200%', y: '200%' }}
                transition={{
                  duration: 1.2,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent"
                style={{
                  transform: 'rotate(45deg)',
                  width: '50%',
                  height: '200%',
                }}
              />
            )}

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,30,0.92)] via-transparent to-transparent" />

            {/* View Project Button Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: isHovered ? 1 : 0.8,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="px-6 py-3 bg-[#f5a623] hover:bg-[#d4af37] text-gray-900 font-bold rounded-lg transition-colors duration-300"
              >
                View Project
              </motion.button>
            </motion.div>

            {/* Category Label */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-[#f5a623]" />
                <span
                  className="text-[#f5a623] font-bold uppercase relative"
                  style={{ letterSpacing: '0.15em' }}
                >
                  {project.category}
                  
                  {/* Sliding Underline */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-0.5 bg-[#f5a623] shadow-[0_0_8px_rgba(245,166,35,0.8)]"
                  />
                </span>

                {/* Arrow */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4 text-[#f5a623]" />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default function PremiumProjectsGrid() {
  const projects: Project[] = [
    {
      id: 1,
      image: '/images/projects/01.jpg.jpeg',
      category: 'Build',
      title: 'Modern Residential Complex',
    },
    {
      id: 2,
      image: '/images/projects/02.jpg.jpeg',
      category: 'Design',
      title: 'Luxury Living Room',
    },
    {
      id: 3,
      image: '/images/projects/03.jpg.jpeg',
      category: 'Finish Line',
      title: 'Premium Bedroom Suite',
    },
    {
      id: 4,
      image: '/images/projects/04.jpg.jpeg',
      category: 'Interior Design',
      title: 'Commercial Building',
    },
    {
      id: 5,
      image: '/images/projects/05.jpg.jpeg',
      category: 'Construction',
      title: 'Contemporary Office Space',
    },
    {
      id: 6,
      image: '/images/projects/06.jpg.jpeg',
      category: 'Quality',
      title: 'High-End Finishes',
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <PremiumSectionHeader title="All Projects" className="mb-16" />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
