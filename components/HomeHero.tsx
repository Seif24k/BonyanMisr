'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FlipWords } from '@/components/ui/flip-words';

type Simple3DLogoProps = {
  className?: string;
  modelScale?: number;
};

const Simple3DLogo = dynamic<Simple3DLogoProps>(
  () => import('@/components/Simple3DLogo').then(mod => mod.Simple3DLogo),
  {
    ssr: false,
    loading: () => null,
  }
);

type HomeHeroProps = {
  locale: 'en' | 'ar';
};

const heroContent = {
  en: {
    eyebrow: 'BONYAN MISR',
    title: "Building Egypt's Future with",
    words: ['Excellence', 'Innovation', 'Quality', 'Precision'],
    description:
      'Excellence in Construction, Interior Design, and High-End Finishing. We transform spaces into masterpieces across Egypt.',
    primary: 'View Projects',
    primaryHref: '/portfolio',
    secondary: 'Contact Us',
    secondaryHref: '/contact',
  },
  ar: {
    eyebrow: 'بنيان مصر',
    title: 'بناء مستقبل مصر مع',
    words: ['التميز', 'الابتكار', 'الجودة', 'الدقة'],
    description:
      'التميز في البناء والتصميم الداخلي والتشطيبات الفاخرة. نحول المساحات إلى تحف فنية في جميع أنحاء مصر.',
    primary: 'عرض المشاريع',
    primaryHref: '/ar/portfolio',
    secondary: 'اتصل بنا',
    secondaryHref: '/ar/contact',
  },
};

const canUseEnhancedHeroEffects = () => {
  if (typeof window === 'undefined') return false;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktopWidth = window.matchMedia('(min-width: 768px)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

  return isDesktopWidth && isFinePointer && !prefersReducedMotion && !saveData;
};

function useEnhancedHeroEffects() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const queries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(min-width: 768px)'),
      window.matchMedia('(hover: hover) and (pointer: fine)'),
    ];
    const update = () => setEnabled(canUseEnhancedHeroEffects());
    const frameId = window.requestAnimationFrame(update);

    queries.forEach(query => query.addEventListener('change', update));

    return () => {
      window.cancelAnimationFrame(frameId);
      queries.forEach(query => query.removeEventListener('change', update));
    };
  }, []);

  return enabled;
}

export function HomeHero({ locale }: HomeHeroProps) {
  const content = heroContent[locale];
  const isRTL = locale === 'ar';
  const enhancedHeroEffects = useEnhancedHeroEffects();

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative isolate min-h-[100svh] overflow-hidden bg-transparent px-4 pb-36 pt-24 sm:px-6 sm:pt-28 md:pb-28 lg:px-10 lg:pb-20 lg:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_62%_0%,rgba(246,231,162,0.32),transparent_30%),radial-gradient(circle_at_80%_42%,rgba(90,159,212,0.13),transparent_38%),radial-gradient(circle_at_42%_58%,rgba(212,175,55,0.12),transparent_32%)] dark:bg-[radial-gradient(circle_at_62%_0%,rgba(246,231,162,0.18),transparent_30%),radial-gradient(circle_at_80%_42%,rgba(90,159,212,0.16),transparent_38%),radial-gradient(circle_at_42%_58%,rgba(212,175,55,0.11),transparent_32%)]" />

      <div
        className={`pointer-events-none absolute inset-y-0 z-[3] hidden w-[62vw] lg:block ${
          isRTL
            ? 'left-0 bg-[linear-gradient(90deg,rgba(10,25,47,0.16),rgba(10,25,47,0.04),transparent)] dark:bg-[linear-gradient(90deg,rgba(212,175,55,0.10),rgba(10,25,47,0.10),transparent)]'
            : 'right-0 bg-[linear-gradient(270deg,rgba(10,25,47,0.16),rgba(10,25,47,0.04),transparent)] dark:bg-[linear-gradient(270deg,rgba(212,175,55,0.10),rgba(10,25,47,0.10),transparent)]'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 z-[4] w-[92vw] sm:w-[72vw] lg:w-[54vw] ${
          isRTL
            ? 'right-0 bg-[linear-gradient(270deg,rgba(246,248,248,0.95),rgba(246,248,248,0.80),rgba(246,248,248,0.24),transparent)] dark:bg-[linear-gradient(270deg,rgba(11,14,20,0.96),rgba(11,14,20,0.80),rgba(11,14,20,0.24),transparent)]'
            : 'left-0 bg-[linear-gradient(90deg,rgba(246,248,248,0.95),rgba(246,248,248,0.80),rgba(246,248,248,0.24),transparent)] dark:bg-[linear-gradient(90deg,rgba(11,14,20,0.96),rgba(11,14,20,0.80),rgba(11,14,20,0.24),transparent)]'
        }`}
      />

      <div className="relative z-20 mx-auto flex max-w-7xl flex-col items-stretch justify-start gap-4 sm:gap-8 lg:grid lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(440px,1.12fr)] lg:items-center lg:justify-center lg:gap-4 xl:gap-8">
        <div
          className={`relative z-30 order-2 max-w-[46rem] ${
            isRTL
              ? 'text-right lg:order-1 lg:justify-self-end lg:pr-2'
              : 'text-left lg:order-1 lg:justify-self-start lg:pl-2'
          }`}
        >
          <div
            className={`pointer-events-none absolute -inset-x-5 -inset-y-6 -z-10 sm:-inset-x-8 sm:-inset-y-8 ${
              isRTL
                ? 'bg-[linear-gradient(270deg,rgba(246,248,248,0.86),rgba(246,248,248,0.56),transparent)] dark:bg-[linear-gradient(270deg,rgba(11,14,20,0.92),rgba(11,14,20,0.60),transparent)]'
                : 'bg-[linear-gradient(90deg,rgba(246,248,248,0.86),rgba(246,248,248,0.56),transparent)] dark:bg-[linear-gradient(90deg,rgba(11,14,20,0.92),rgba(11,14,20,0.60),transparent)]'
            }`}
          />

          <p
            className={`mb-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.34em] text-[oklch(0.48_0.12_83)] dark:text-[oklch(0.82_0.12_86)] sm:mb-5 ${
              isRTL ? 'justify-end' : 'justify-start'
            }`}
          >
            <span className="h-px w-12 bg-primary shadow-[0_0_24px_rgba(212,175,55,0.82)]" />
            <span>{content.eyebrow}</span>
          </p>

          <h1 className="max-w-[12ch] text-4xl font-black leading-[0.96] text-[oklch(0.23_0.03_255)] drop-shadow-[0_8px_28px_rgba(10,25,47,0.18)] dark:text-[oklch(0.94_0.018_86)] dark:drop-shadow-[0_10px_30px_rgba(0,0,0,0.62)] sm:text-5xl md:max-w-[13ch] md:text-6xl xl:text-7xl">
            {content.title}
            <span className="mt-2 block text-primary drop-shadow-[0_10px_34px_rgba(212,175,55,0.46)]">
              <FlipWords words={content.words} duration={3000} className="text-primary" />
            </span>
          </h1>

          <p className="mt-5 max-w-[38rem] text-base font-semibold leading-7 text-[oklch(0.36_0.025_255)] drop-shadow-[0_4px_18px_rgba(246,248,248,0.88)] dark:text-[oklch(0.82_0.018_255)] dark:drop-shadow-[0_6px_20px_rgba(0,0,0,0.65)] sm:mt-6 sm:text-lg sm:leading-8 lg:text-xl">
            {content.description}
          </p>

          <div
            className={`mt-7 flex flex-wrap gap-3 sm:gap-4 ${
              isRTL ? 'justify-end' : 'justify-start'
            }`}
          >
            <Link
              href={content.primaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-black text-[oklch(0.19_0.03_255)] shadow-[0_18px_45px_rgba(212,175,55,0.36)] transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_22px_52px_rgba(212,175,55,0.46)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[oklch(0.97_0.006_90)] dark:focus:ring-offset-[oklch(0.13_0.025_255)] sm:min-h-12 sm:px-7 sm:text-base"
            >
              {content.primary}
            </Link>
            <Link
              href={content.secondaryHref}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[oklch(0.50_0.03_255/0.30)] bg-[oklch(0.98_0.006_90/0.72)] px-5 py-3 text-sm font-black text-[oklch(0.24_0.03_255)] shadow-[0_18px_42px_rgba(10,25,47,0.12)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary hover:text-[oklch(0.44_0.12_83)] dark:border-[oklch(0.88_0.02_86/0.20)] dark:bg-[oklch(0.20_0.025_255/0.70)] dark:text-[oklch(0.90_0.015_86)] dark:shadow-[0_18px_42px_rgba(0,0,0,0.35)] dark:hover:text-primary sm:min-h-12 sm:px-7 sm:text-base"
            >
              {content.secondary}
            </Link>
          </div>
        </div>

        <div className="relative z-20 order-1 flex h-[25svh] min-h-[170px] max-h-[245px] w-full items-center justify-center overflow-hidden sm:h-[38svh] sm:min-h-[220px] sm:max-h-[390px] lg:order-2 lg:h-[min(78vh,780px)] lg:max-h-none">
          <div className="absolute inset-x-[4%] bottom-[5%] top-[4%] -skew-x-6 border-y border-primary/35 bg-[linear-gradient(120deg,rgba(212,175,55,0.18),rgba(10,25,47,0.04),rgba(90,159,212,0.12))] shadow-[0_0_76px_rgba(212,175,55,0.20)] dark:border-primary/25 dark:bg-[linear-gradient(120deg,rgba(212,175,55,0.10),rgba(90,159,212,0.10),rgba(11,14,20,0.04))] dark:shadow-[0_0_96px_rgba(90,159,212,0.18)]" />
          <div className="absolute bottom-[12%] h-px w-[82%] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_34px_rgba(212,175,55,0.84)]" />
          <div className="absolute left-[10%] top-[12%] h-16 w-px bg-gradient-to-b from-primary/70 to-transparent shadow-[0_0_28px_rgba(212,175,55,0.62)] sm:h-24 lg:h-36" />
          <div className="absolute right-[10%] top-[20%] h-14 w-px bg-gradient-to-b from-[oklch(0.72_0.09_236)] to-transparent shadow-[0_0_26px_rgba(90,159,212,0.48)] sm:h-20 lg:h-32" />
          <div
            className={`relative z-10 flex h-full w-full items-center justify-center pointer-events-none drop-shadow-[0_24px_46px_rgba(10,25,47,0.24)] dark:drop-shadow-[0_30px_60px_rgba(0,0,0,0.62)] ${
              isRTL ? 'lg:translate-x-[8%]' : 'lg:-translate-x-[8%]'
            }`}
          >
            <div className="relative h-[82%] w-[min(74vw,360px)] sm:w-[min(42vw,420px)] lg:h-[78%]">
              {!enhancedHeroEffects ? (
                <Image
                  src="/bonyanmisr-logo-transparent.webp"
                  alt="Bonyan Misr logo"
                  fill
                  priority
                  sizes="(max-width: 767px) 74vw, 420px"
                  className="object-contain"
                />
              ) : null}
            </div>
          </div>
          {enhancedHeroEffects ? (
            <Simple3DLogo
              className={`absolute inset-0 z-20 h-full w-full scale-[0.96] pointer-events-none drop-shadow-[0_30px_62px_rgba(10,25,47,0.36)] dark:drop-shadow-[0_38px_86px_rgba(0,0,0,0.70)] sm:scale-[1.02] lg:-translate-y-[14%] lg:scale-[1.14] ${
                isRTL ? 'lg:translate-x-[10%]' : 'lg:-translate-x-[10%]'
              }`}
              modelScale={2.58}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
