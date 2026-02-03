'use client';

import Link from 'next/link';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { FlipWords } from '@/components/ui/flip-words';
import Image from 'next/image';
import { HardHat, Palette, PaintBucket } from 'lucide-react';
import { Simple3DLogo } from '@/components/Simple3DLogo';
import LightRays from '@/components/ui/LightRays';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { AtmosphereParticles } from '@/components/ui/AtmosphereParticles';
import TiltedCard from '@/components/ui/TiltedCard';
import TextHoverEffect from '@/components/ui/shimmer-bg-text';

export default function Home() {
  const words = ["Excellence", "Innovation", "Quality", "Precision"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">

        {/* Layer 1: Blueprint Background (Grid & Lines) */}
        <BlueprintBackground />

        {/* Layer 2: Atmosphere Particles (Gold Dust) */}
        <AtmosphereParticles particleCount={60} color="#d4af37" />

        {/* Layer 3: Light Rays Effect */}
        <div className="absolute inset-0 z-[1] mix-blend-screen">
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

        {/* Simple 3D Logo */}
        <Simple3DLogo />

        {/* Stronger overlay gradient for text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/60 to-transparent opacity-95"></div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            Building Egypt's Future with<br />
            <span className="text-primary inline-flex items-center">
              <FlipWords words={words} duration={3000} className="text-primary" />
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-xl">
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
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <TextHoverEffect
                text="Our Services"
                className="text-4xl font-bold mb-4"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive solutions for all your construction and design needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Construction */}
            <TiltedCard
              containerHeight="100%"
              containerWidth="100%"
              rotateAmplitude={15}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 h-full">
                <div className="mb-4 text-[#d4af37]">
                  <HardHat className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Construction
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  From residential complexes to commercial hubs, we build robust structures that stand the test of time.
                </p>
                <Link
                  href="/services"
                  className="text-primary font-bold hover:underline inline-flex items-center"
                >
                  Learn more →
                </Link>
              </div>
            </TiltedCard>

            {/* Interior Design */}
            <TiltedCard
              containerHeight="100%"
              containerWidth="100%"
              rotateAmplitude={15}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 h-full">
                <div className="mb-4 text-[#d4af37]">
                  <Palette className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Interior Design
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Creating functional and aesthetically pleasing interior spaces that reflect your personal style.
                </p>
                <Link
                  href="/services"
                  className="text-primary font-bold hover:underline inline-flex items-center"
                >
                  Learn more →
                </Link>
              </div>
            </TiltedCard>

            {/* Finishing */}
            <TiltedCard
              containerHeight="100%"
              containerWidth="100%"
              rotateAmplitude={15}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={false}
            >
              <div className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 h-full">
                <div className="mb-4 text-[#d4af37]">
                  <PaintBucket className="w-16 h-16" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Finishing
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  High-end finishing works including flooring, painting, plastering, and custom joinery.
                </p>
                <Link
                  href="/services"
                  className="text-primary font-bold hover:underline inline-flex items-center"
                >
                  Learn more →
                </Link>
              </div>
            </TiltedCard>
          </div>
        </div>
      </section>

      {/* Featured Project Scroll Animation */}
      <section className="bg-white dark:bg-gray-900">
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
      <section className="relative py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-800">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">200+</div>
              <div className="text-gray-800">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-800">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-800">Team Members</div>
            </div>
          </div>
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
