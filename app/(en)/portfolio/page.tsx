'use client';

import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';
import { motion } from 'framer-motion';
import TiltedCard from '@/components/ui/TiltedCard';
import Image from 'next/image';
import TextHoverEffect from '@/components/ui/shimmer-bg-text';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { MouseFollowLight } from '@/components/ui/MouseFollowLight';

export default function Portfolio() {
  const galleryData: GalleryItem[] = [
    {
      common: 'Modern Kitchen Design',
      binomial: 'Interior Excellence',
      photo: {
        url: '/images/projects/carousel-1.jpg',
        text: 'Minimalist kitchen with modern finishes',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Luxury Living Room',
      binomial: 'Premium Interiors',
      photo: {
        url: '/images/projects/interior-living.jpg',
        text: 'Elegant living space with contemporary design',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Contemporary Dining',
      binomial: 'Modern Living',
      photo: {
        url: '/images/projects/carousel-2.jpg',
        text: 'Stylish dining area with natural light',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Master Bedroom Suite',
      binomial: 'Comfort & Style',
      photo: {
        url: '/images/projects/interior-bedroom-1.jpg',
        text: 'Luxurious bedroom with premium finishes',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Modern Interior',
      binomial: 'Design Innovation',
      photo: {
        url: '/images/projects/carousel-3.jpg',
        text: 'Contemporary interior design',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Elegant Bedroom',
      binomial: 'Refined Living',
      photo: {
        url: '/images/projects/interior-bedroom-2.jpg',
        text: 'Sophisticated bedroom design',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Premium Finishing',
      binomial: 'Quality Craftsmanship',
      photo: {
        url: '/images/projects/carousel-4.jpg',
        text: 'High-end finishing details',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Architectural Excellence',
      binomial: 'Modern Design',
      photo: {
        url: '/images/projects/carousel-5.jpg',
        text: 'Contemporary architectural design',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    },
    {
      common: 'Luxury Interiors',
      binomial: 'Premium Spaces',
      photo: {
        url: '/images/projects/carousel-6.jpg',
        text: 'Elegant interior spaces',
        pos: '50% 50%',
        by: 'BonyanMisr'
      }
    }
  ];

  const projects = [
    { id: 1, title: 'Al-Rehab Heights', category: 'Construction', image: '/images/projects/construction-site.jpg' },
    { id: 2, title: 'New Cairo Villa', category: 'Interior Design', image: '/images/projects/interior-living.jpg' },
    { id: 3, title: 'Tech Hub Office', category: 'Finishing', image: '/images/projects/interior-bedroom-1.jpg' },
    { id: 4, title: 'Skyline Tower', category: 'Construction', image: '/images/projects/exterior-render.jpg' },
    { id: 5, title: 'Zamalek Unit', category: 'Interior Design', image: '/images/projects/interior-bedroom-2.jpg' },
    { id: 6, title: 'Palm Hills Exterior', category: 'Finishing', image: '/images/projects/exterior-render.jpg' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Blueprint Background */}
      <BlueprintBackground />

      {/* Animated Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute top-1/3 right-32 w-80 h-80 bg-purple-400/15 dark:bg-purple-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-400/15 dark:bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1500ms' }}></div>
      </div>

      {/* Mouse Follow Light */}
      <MouseFollowLight />

      {/* Circular Gallery Section */}
      <div className="w-full relative z-10 pt-20" style={{ height: '300vh' }}>
        <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
          <div className="text-center mb-8 absolute top-16 z-10">
            <motion.h1
              initial={{ opacity: 0.5, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent"
            >
              Our Masterpieces
            </motion.h1>
          </div>
          <div className="w-full h-full mt-20">
            <CircularGallery items={galleryData} radius={650} autoRotateSpeed={0.015} />
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <TextHoverEffect
              text="All Projects"
              className="text-3xl font-bold"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <TiltedCard
                key={project.id}
                containerHeight="100%"
                containerWidth="100%"
                rotateAmplitude={18}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div className="group rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 hover:shadow-2xl transition-all h-full">
                  <div className="relative h-64 bg-gray-300 dark:bg-gray-700">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-[#d4af37] font-bold uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
                      {project.title}
                    </h3>
                    <button className="text-[#d4af37] font-bold hover:underline">
                      View Details →
                    </button>
                  </div>
                </div>
              </TiltedCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
