'use client';

import Link from 'next/link';
import { FlipWords } from '@/components/ui/flip-words';
import { HardHat, Palette, PaintBucket } from 'lucide-react';
import { Simple3DLogo } from '@/components/Simple3DLogo';
import LightRays from '@/components/ui/LightRays';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { AtmosphereParticles } from '@/components/ui/AtmosphereParticles';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import Image from 'next/image';
import TiltedCard from '@/components/ui/TiltedCard';
import TextHoverEffect from '@/components/ui/shimmer-bg-text';
import { AmbientColors } from '@/components/ui/AmbientColors';
import SpotlightCard from '@/components/ui/SpotlightCard';

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

      {/* Services Section */}
      <section className="relative py-20 px-4 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <TextHoverEffect
                text="خدماتنا"
                className="text-4xl font-bold mb-4"
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              حلول شاملة لجميع احتياجات البناء والتصميم الخاصة بك
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
              <SpotlightCard 
                className="h-full"
                spotlightColor="rgba(212, 175, 55, 0.3)"
              >
                <div className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 h-full">
                  <div className="mb-4 text-[#d4af37]">
                    <HardHat className="w-16 h-16" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    البناء والمقاولات
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    من المجمعات السكنية إلى المراكز التجارية، نبني هياكل قوية تصمد أمام اختبار الزمن.
                  </p>
                  <Link
                    href="/ar/services"
                    className="text-primary font-bold hover:underline inline-flex items-center"
                  >
                    ← اعرف المزيد
                  </Link>
                </div>
              </SpotlightCard>
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
              <SpotlightCard 
                className="h-full"
                spotlightColor="rgba(212, 175, 55, 0.3)"
              >
                <div className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 h-full">
                  <div className="mb-4 text-[#d4af37]">
                    <Palette className="w-16 h-16" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    التصميم الداخلي
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    إنشاء مساحات داخلية وظيفية وجمالية تعكس أسلوبك الشخصي.
                  </p>
                  <Link
                    href="/ar/services"
                    className="text-primary font-bold hover:underline inline-flex items-center"
                  >
                    ← اعرف المزيد
                  </Link>
                </div>
              </SpotlightCard>
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
              <SpotlightCard 
                className="h-full"
                spotlightColor="rgba(212, 175, 55, 0.3)"
              >
                <div className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 h-full">
                  <div className="mb-4 text-[#d4af37]">
                    <PaintBucket className="w-16 h-16" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    التشطيبات
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    أعمال تشطيب فاخرة تشمل الأرضيات والدهانات والجبس والنجارة المخصصة.
                  </p>
                  <Link
                    href="/ar/services"
                    className="text-primary font-bold hover:underline inline-flex items-center"
                  >
                    ← اعرف المزيد
                  </Link>
                </div>
              </SpotlightCard>
            </TiltedCard>
          </div>
        </div>
      </section>

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
      <section className="relative py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">+15</div>
              <div className="text-gray-800">سنة خبرة</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">+200</div>
              <div className="text-gray-800">مشروع مكتمل</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">+500</div>
              <div className="text-gray-800">عميل سعيد</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">+150</div>
              <div className="text-gray-800">عضو فريق</div>
            </div>
          </div>
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
