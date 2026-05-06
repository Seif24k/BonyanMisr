'use client';

import Link from 'next/link';
import { FlipWords } from '@/components/ui/flip-words';
import { Simple3DLogo } from '@/components/Simple3DLogo';
import LightRays from '@/components/ui/LightRays';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { AtmosphereParticles } from '@/components/ui/AtmosphereParticles';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import Image from 'next/image';
import { AmbientColors } from '@/components/ui/AmbientColors';
import PremiumServicesSectionAr from '@/components/ui/premium-services-section-ar';
import TestimonialDetailedAr from '@/components/ui/testimonial-detailed-ar';
import TestimonialCardsAr from '@/components/ui/testimonial-cards-ar';
import { PremiumStatsBannerAr } from '@/components/ui/premium-stats-banner-ar';

export default function HomeAr() {
  const words = ["التميز", "الابتكار", "الجودة", "الدقة"];

  return (
    <div className="min-h-screen relative" dir="rtl">
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
            بناء مستقبل مصر مع<br />
            <span className="text-primary inline-flex items-center justify-center">
              <FlipWords words={words} duration={3000} className="text-primary" />
            </span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto drop-shadow-xl">
            التميز في البناء والتصميم الداخلي والتشطيبات الفاخرة.
            نحول المساحات إلى تحف فنية في جميع أنحاء مصر.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/ar/portfolio"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-gray-900 font-bold rounded-lg transition shadow-lg hover:shadow-2xl"
            >
              عرض المشاريع
            </Link>
            <Link
              href="/ar/contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white font-bold rounded-lg transition backdrop-blur-sm border border-gray-400/30 dark:border-white/20 hover:border-gray-500/40 dark:hover:border-white/30 shadow-lg"
            >
              اتصل بنا
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <PremiumServicesSectionAr />

      {/* Featured Project Scroll Animation */}
      <section className="bg-transparent">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                تحويل الرؤى إلى
                <br />
                <span className="text-primary mt-1 leading-none">
                  تحف معمارية
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
                استكشف أحدث مشاريعنا السكنية الفاخرة التي تتميز بالتصميم الحديث والتشطيبات الراقية
              </p>
            </>
          }
        >
          <Image
            src="/images/projects/featured-building.png"
            alt="مشروع بنيان مصر المميز"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </section>

      {/* Stats Section */}
      <PremiumStatsBannerAr />

      {/* Testimonials Section - Detailed */}
      <section className="relative py-20 px-4 bg-transparent" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <TestimonialDetailedAr />
        </div>
      </section>

      {/* Testimonials Section - Cards */}
      <section className="relative py-20 px-4 bg-transparent" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            قصص نجاح عملائنا
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            استمع إلى عملائنا الراضين حول تجربتهم في العمل مع بنيان مصر
          </p>
          <TestimonialCardsAr />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">هل أنت مستعد لبدء مشروعك؟</h2>
          <p className="text-xl text-gray-300 mb-8">
            دعنا نناقش رؤيتك ونحولها إلى واقع معًا.
          </p>
          <Link
            href="/ar/contact"
            className="inline-block px-8 py-4 bg-primary hover:bg-primary-dark text-gray-900 font-bold rounded-lg transition shadow-lg"
          >
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  );
}
