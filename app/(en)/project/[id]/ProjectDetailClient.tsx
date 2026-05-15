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
import Image from 'next/image';

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
  const featureImage = project.images[0];
  const mobileThumbs = project.images.slice(1, 4);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 relative">
      {/* Blueprint Background */}
      <BlueprintBackground />

      {/* Desktop Back Button */}
      <div className="fixed top-20 left-8 z-50 hidden sm:block">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Mobile Hero Section */}
      <section className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden px-5 pb-[calc(9rem+env(safe-area-inset-bottom))] pt-[4.5rem] sm:hidden">
        <div className="pointer-events-none absolute inset-x-4 top-28 h-64 rounded-full bg-[#d4af37]/12 blur-3xl dark:bg-[#d4af37]/18" />

        <motion.button
          type="button"
          onClick={handleBack}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative z-20 mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-slate-200/80 bg-white/90 px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-md transition-colors hover:bg-white dark:border-white/10 dark:bg-slate-900/85 dark:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </motion.button>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="inline-flex rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#b8860b] dark:text-[#f0c95a]">
              {project.category}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="max-w-[21rem]"
          >
            <h1 className="max-w-[19rem] text-balance text-[clamp(2.25rem,10.5vw,3rem)] font-black leading-[0.97] tracking-tight text-slate-950 dark:text-white">
              {project.title}
            </h1>
            <p className="mt-3 text-lg font-medium leading-snug text-slate-700 dark:text-slate-300">
              {project.subtitle}
            </p>
            <p className="mt-4 max-w-[32ch] text-[0.92rem] leading-6 text-slate-600 dark:text-slate-400">
              {project.description}
            </p>
          </motion.div>

          {featureImage ? (
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="relative mt-5 h-[204px]"
            >
              <div className="absolute inset-0 overflow-hidden rounded-[26px] border border-white/75 bg-slate-100 shadow-[0_24px_58px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-slate-900">
                <Image
                  src={featureImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-white/10" />
              </div>

              {mobileThumbs.length > 0 ? (
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-center gap-2.5">
                  {mobileThumbs.map((src, index) => (
                    <div
                      key={`${src}-${index}`}
                      className="relative h-14 flex-1 overflow-hidden rounded-xl border border-white/80 bg-white shadow-[0_12px_25px_rgba(15,23,42,0.2)] dark:border-white/10 dark:bg-slate-900"
                      style={{ transform: `translateY(${index % 2 === 0 ? 0 : 8}px)` }}
                    >
                      <Image
                        src={src}
                        alt={`${project.title} view ${index + 2}`}
                        fill
                        sizes="33vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/18 to-transparent" />
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ) : null}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="mt-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500"
          >
            Scroll for gallery
          </motion.p>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <div className="hidden sm:block">
        <ArcGalleryHero
          images={heroImages}
          startAngle={18}
          endAngle={162}
          radiusLg={660}
          radiusMd={470}
          radiusSm={275}
          verticalRadiusLg={260}
          verticalRadiusMd={220}
          verticalRadiusSm={130}
          cardSizeLg={128}
          cardSizeMd={104}
          cardSizeSm={72}
          centerY="42%"
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
      </div>

      {/* Zoom Parallax Gallery */}
      <ZoomParallax images={parallaxImages} />

      <ParallaxFloatingPreview images={parallaxImages} title={project.title} />
    </div>
  );
}
