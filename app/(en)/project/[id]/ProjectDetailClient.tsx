'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Lenis from '@studio-freight/lenis';
import { ArcGalleryHero } from '@/components/ui/arc-gallery-hero-component';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { ParallaxFloatingPreview } from '@/components/ui/parallax-floating-preview';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  images: string[];
}

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const router = useRouter();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // If opened in new tab, navigate to portfolio
      router.push('/portfolio');
    }
  };

  const parallaxImages = project.images.map(src => ({ src, alt: project.title }));
  const heroImageCount = project.images.length > 0 ? Math.min(Math.max(project.images.length, 8), 8) : 0;
  const heroImages = Array.from(
    { length: heroImageCount },
    (_, index) => project.images[index % project.images.length]
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative">
      {/* Blueprint Background */}
      <BlueprintBackground />

      {/* Back Button */}
      <div className="fixed top-20 left-8 z-50">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Hero Section */}
      <ArcGalleryHero
        images={heroImages}
        startAngle={18}
        endAngle={162}
        radiusLg={660}
        radiusMd={470}
        radiusSm={275}
        verticalRadiusLg={230}
        verticalRadiusMd={195}
        verticalRadiusSm={130}
        cardSizeLg={128}
        cardSizeMd={104}
        cardSizeSm={72}
        centerY="52%"
        className="bg-transparent dark:bg-transparent"
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full text-[#d4af37] text-sm font-bold uppercase tracking-wider">
              {project.category}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400 mb-6"
          >
            {project.subtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-gray-600 dark:text-gray-500 max-w-2xl mx-auto mb-8"
          >
            {project.description}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-gray-500 dark:text-gray-600"
          >
            Scroll Down for Zoom Parallax Gallery
          </motion.p>
        </div>
      </ArcGalleryHero>

      {/* Zoom Parallax Gallery */}
      <ZoomParallax images={parallaxImages} />

      <ParallaxFloatingPreview images={parallaxImages} title={project.title} />
    </div>
  );
}
