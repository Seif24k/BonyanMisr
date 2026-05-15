'use client';

import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import Image from 'next/image';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { AtmosphereParticles } from '@/components/ui/AtmosphereParticles';
import { AmbientColors } from '@/components/ui/AmbientColors';
import { HomeHero } from '@/components/HomeHero';
import PremiumServicesSection from '@/components/ui/premium-services-section';
import TestimonialDetailed from '@/components/ui/testimonial-detailed';
import TestimonialCards from '@/components/ui/testimonial-cards';
import { PremiumStatsBanner } from '@/components/ui/premium-stats-banner';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Ambient color blobs for atmospheric effect */}
      <AmbientColors />
      
      {/* Blueprint Background for entire page */}
      <BlueprintBackground />
      
      {/* Atmosphere Particles (Gold Dust) for entire page */}
      <div className="fixed inset-0 z-[2] pointer-events-none">
        <AtmosphereParticles particleCount={60} color="#d4af37" />
      </div>
      
      <HomeHero locale="en" />

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
            Let&apos;s discuss your vision and bring it to life together.
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
