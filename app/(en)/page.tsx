'use client';

import Link from 'next/link';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { FlipWords } from '@/components/ui/flip-words';
import Image from 'next/image';
import { Simple3DLogo } from '@/components/Simple3DLogo';
import LightRays from '@/components/ui/LightRays';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { AtmosphereParticles } from '@/components/ui/AtmosphereParticles';
import { AmbientColors } from '@/components/ui/AmbientColors';
import PremiumServicesSection from '@/components/ui/premium-services-section';
import TestimonialDetailed from '@/components/ui/testimonial-detailed';
import TestimonialCards from '@/components/ui/testimonial-cards';
import { PremiumStatsBanner } from '@/components/ui/premium-stats-banner';

export default function Home() {
  const words = ["Excellence", "Innovation", "Quality", "Precision"];

  return (
    <div className="min-h-screen relative">
      {/* Ambient color blobs for atmospheric effect */}
      <AmbientColors />
      
      {/* Blueprint Background for entire page */}
      <BlueprintBackground />
      
      {/* Atmosphere Particles (Gold Dust) for entire page */}
      <div className="fixed inset-0 z-[2] pointer-events-none">
        <AtmosphereParticles particleCount={60} color="#d4af37" />
      </div>
      
      {/* Hero Section - overflow-hidden restored to prevent horizontal scroll from canvas elements */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">

        {/* Layer 3: Light Rays Effect */}
        <div className="absolute inset-0 z-[1] mix-blend-screen opacity-70">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.8}
            lightSpread={0.6}
            rayLength={2.5}
            followMouse={false}
            mouseInfluence={0.15}
            fadeDistance={0.85}
            saturation={1.3}
            pulsating={false}
          />
        </div>

        {/* 3D Logo - Properly configured */}
        <Simple3DLogo />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-2xl">
            Building Egypt's Future with<br />
            <span className="text-primary inline-flex items-center">
              <FlipWords words={words} duration={3000} className="text-primary" />
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-xl">
            Excellence in Construction, Interior Design, and High-End Finishing.
            We transform spaces into masterpieces across Egypt.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/portfolio"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-gray-900 font-bold rounded-lg transition shadow-lg hover:shadow-2xl"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white font-bold rounded-lg transition backdrop-blur-sm border border-gray-400/30 dark:border-white/20 hover:border-gray-500/40 dark:hover:border-white/30 shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <PremiumServicesSection />

      {/* Featured Project Scroll Animation */}
      <section className="bg-transparent">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Transforming Visions Into
                <br />
                <span className="text-primary mt-1 leading-none">
                  Architectural Masterpieces
                </span>
              </h2>
            </>
          }
        >
          <Image
            src="/images/projects/featured-building.png"
            alt="BonyanMisr Featured Project"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </section>

      {/* Stats Section */}
      <PremiumStatsBanner />

      {/* Testimonials Section - Detailed */}
      <section className="relative py-20 px-4 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <TestimonialDetailed />
        </div>
      </section>

      {/* Testimonials Section - Cards */}
      <section className="relative py-20 px-4 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Client Success Stories
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with BonyanMisr
          </p>
          <TestimonialCards />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss your vision and bring it to life together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-gray-900 font-bold rounded-lg transition shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section >
    </div >
  );
}
