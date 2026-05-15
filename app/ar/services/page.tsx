'use client';

import React from 'react';
import { EgyptMapInteractive } from '@/components/ui/egypt-map-interactive';
import { FlipWords } from '@/components/ui/flip-words';
import Image from 'next/image';
import TextHoverEffect from '@/components/ui/shimmer-bg-text';
import { BlueprintBackground } from '@/components/ui/BlueprintBackground';
import { MouseFollowLight } from '@/components/ui/MouseFollowLight';

// Error boundary for map component - shows placeholder in local dev, real map in production
class MapErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-96 rounded-2xl border border-[#d4af37]/20 bg-[#0a1628] flex items-center justify-center">
          <p className="text-[#d4af37]/60 text-sm">Map loads in production</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ServicesAr() {
  const words = ["البناء", "التصميم", "التشطيب", "التجديد"];

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-slate-950" dir="rtl">
      {/* Blueprint Background */}
      <BlueprintBackground />

      {/* Animated Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute top-40 left-32 w-64 h-64 bg-cyan-400/15 dark:bg-cyan-500/25 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1000ms' }}></div>

        {/* Middle orbs */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-indigo-400/15 dark:bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '1500ms' }}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-400/20 dark:bg-purple-500/25 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '2000ms' }}></div>

        {/* Bottom orbs */}
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/15 dark:bg-purple-600/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '700ms' }}></div>
        <div className="absolute bottom-32 right-40 w-80 h-80 bg-blue-400/15 dark:bg-blue-500/20 rounded-full blur-[135px] animate-pulse" style={{ animationDelay: '2500ms' }}></div>
      </div>

      {/* Mouse Follow Light */}
      <MouseFollowLight />

      <div className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Service Coverage Map */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-900 drop-shadow-2xl dark:text-white sm:text-5xl">
                خدمات <FlipWords words={words} duration={3000} className="text-primary" /> احترافية
              </h1>
              <p className="mx-auto max-w-3xl text-base leading-7 text-gray-700 drop-shadow-xl dark:text-gray-300 sm:text-xl">
                تفخر بنيان مصر بخدمة المدن الرئيسية في جميع أنحاء مصر، وتقديم التميز في
                البناء والتصميم الداخلي وخدمات التشطيبات.
              </p>
            </div>
            <MapErrorBoundary>
              <EgyptMapInteractive
                dots={[
                  {
                    start: { lat: 30.0444, lng: 31.2357, label: "القاهرة" }, // القاهرة (المقر الرئيسي)
                    end: { lat: 30.0131, lng: 31.2089, label: "الجيزة" },   // الجيزة (غرب القاهرة)
                  },
                  {
                    start: { lat: 30.0444, lng: 31.2357 }, // القاهرة
                    end: { lat: 31.2001, lng: 29.9187, label: "الإسكندرية" },   // الإسكندرية (شمال)
                  },
                  {
                    start: { lat: 30.0444, lng: 31.2357 }, // القاهرة
                    end: { lat: 29.3084, lng: 30.8428, label: "الفيوم" },      // الفيوم (جنوب غرب)
                  },
                  {
                    start: { lat: 30.0444, lng: 31.2357 }, // القاهرة
                    end: { lat: 27.1809, lng: 31.1837, label: "أسيوط" },   // أسيوط (جنوب)
                  },
                  {
                    start: { lat: 30.0444, lng: 31.2357 }, // القاهرة
                    end: { lat: 29.0661, lng: 31.0994, label: "بني سويف" },   // بني سويف (جنوب)
                  },
                  {
                    start: { lat: 30.0444, lng: 31.2357 }, // القاهرة
                    end: { lat: 30.1219, lng: 31.6416, label: "الشروق" },   // مدينة الشروق (شرق)
                  },
                  {
                    start: { lat: 30.0444, lng: 31.2357 }, // القاهرة
                    end: { lat: 30.2801, lng: 31.8291, label: "مدينة بدر" },   // مدينة بدر (شمال شرق)
                  },
                  {
                    start: { lat: 30.0444, lng: 31.2357 }, // القاهرة
                    end: { lat: 29.9500, lng: 31.8333, label: "العاصمة الإدارية" },   // العاصمة الإدارية (شرق جنوب شرق)
                  },
                ]}
                lineColor="#d4af37"
              />
            </MapErrorBoundary>
          </div>

          <div className="space-y-20">
            {/* Construction Service */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <TextHoverEffect
                    text="البناء والمقاولات"
                    className="text-3xl font-bold"
                  />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 drop-shadow-lg">
                  من الهياكل الأساسية إلى اللمسات النهائية الرائعة، تقدم بنيان مصر
                  حلولاً شاملة في البناء والتصميم الداخلي والتشطيبات. نبني الثقة من خلال الجودة.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">المباني السكنية والتجارية</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">الهندسة الإنشائية</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">إدارة المشاريع</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-72 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 sm:h-96">
                <Image
                  src="/construction-site.jpg"
                  alt="موقع بناء مع معدات ثقيلة"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Interior Design Service */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 h-72 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 sm:h-96 md:order-1">
                <Image
                  src="/interior-design.jpg"
                  alt="تصميم داخلي حديث"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 md:order-2">
                <div className="mb-4">
                  <TextHoverEffect
                    text="التصميم الداخلي"
                    className="text-3xl font-bold"
                  />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 drop-shadow-lg">
                  إنشاء مساحات داخلية وظيفية وجمالية تعكس أسلوبك الشخصي
                  وتعزز تجربة حياتك اليومية.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">تخطيط المساحات والتصميم</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">التصور ثلاثي الأبعاد</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">تصميم الأثاث المخصص</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Finishing Service */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <TextHoverEffect
                    text="التشطيبات الفاخرة"
                    className="text-3xl font-bold"
                  />
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 drop-shadow-lg">
                  الاهتمام بالتفاصيل في كل زاوية. تضمن خدمات التشطيب لدينا الكمال في
                  الأرضيات والدهانات والجبس وجميع اللمسات النهائية.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">الأرضيات والبلاط الفاخر</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">الدهانات الاحترافية</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary ml-2">✓</span>
                    <span className="text-gray-800 dark:text-gray-200">النجارة والأعمال الخشبية المخصصة</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-72 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 sm:h-96">
                <Image
                  src="/finishing.jpg"
                  alt="تشطيبات فاخرة"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
