'use client';

import Link from 'next/link';
import { FlipWords } from '@/components/ui/flip-words';
import LightRays from '@/components/ui/LightRays';
import { Simple3DLogo } from '@/components/Simple3DLogo';
import { cn } from '@/lib/utils';

type HomeHeroProps = {
  locale: 'en' | 'ar';
};

const heroContent = {
  en: {
    dir: 'ltr',
    words: ['Excellence', 'Innovation', 'Quality', 'Precision'],
    headline: "Building Egypt's Future with",
    paragraph:
      'Excellence in Construction, Interior Design, and High-End Finishing. We transform spaces into masterpieces across Egypt.',
    primaryCta: { label: 'View Projects', href: '/portfolio' },
    secondaryCta: { label: 'Contact Us', href: '/contact' },
  },
  ar: {
    dir: 'rtl',
    words: ['التميز', 'الابتكار', 'الجودة', 'الدقة'],
    headline: 'بناء مستقبل مصر مع',
    paragraph:
      'التميز في البناء والتصميم الداخلي والتشطيبات الفاخرة. نحول المساحات إلى تحف فنية في جميع أنحاء مصر.',
    primaryCta: { label: 'عرض المشاريع', href: '/ar/portfolio' },
    secondaryCta: { label: 'اتصل بنا', href: '/ar/contact' },
  },
} as const;

export function HomeHero({ locale }: HomeHeroProps) {
  const content = heroContent[locale];
  const isArabic = locale === 'ar';

  return (
    <section
      data-home-hero={locale}
      className="relative isolate min-h-[100svh] overflow-hidden bg-transparent px-4 pb-20 pt-16 sm:px-6 sm:pb-36 sm:pt-20 md:pb-20 lg:px-8 lg:pt-28"
      dir={content.dir}
    >
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

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_72%_35%,rgba(212,175,55,0.24),transparent_31%),radial-gradient(circle_at_18%_24%,rgba(10,25,47,0.18),transparent_28%)] dark:bg-[radial-gradient(circle_at_70%_34%,rgba(212,175,55,0.2),transparent_34%),radial-gradient(circle_at_22%_20%,rgba(45,91,140,0.24),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[4] opacity-45 [background-image:linear-gradient(rgba(10,25,47,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(10,25,47,0.08)_1px,transparent_1px)] [background-size:72px_72px] dark:opacity-35 dark:[background-image:linear-gradient(rgba(212,175,55,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.1)_1px,transparent_1px)]"
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-y-0 z-[5] hidden w-[58%] lg:block',
          isArabic
            ? 'right-0 bg-[linear-gradient(270deg,rgba(247,248,243,0.96)_0%,rgba(247,248,243,0.84)_54%,rgba(247,248,243,0)_100%)] dark:bg-[linear-gradient(270deg,rgba(8,15,28,0.96)_0%,rgba(8,15,28,0.86)_54%,rgba(8,15,28,0)_100%)]'
            : 'left-0 bg-[linear-gradient(90deg,rgba(247,248,243,0.96)_0%,rgba(247,248,243,0.84)_54%,rgba(247,248,243,0)_100%)] dark:bg-[linear-gradient(90deg,rgba(8,15,28,0.96)_0%,rgba(8,15,28,0.86)_54%,rgba(8,15,28,0)_100%)]'
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute bottom-16 top-24 z-[6] hidden w-px bg-gradient-to-b from-transparent via-[#d4af37]/45 to-transparent lg:block',
          isArabic ? 'right-[52%]' : 'left-[52%]'
        )}
      />

      <div
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-5 lg:min-h-[calc(100svh-9rem)] lg:grid-cols-[minmax(0,0.88fr)_minmax(470px,1.12fr)] lg:gap-16"
        dir="ltr"
      >
        <div
          data-home-hero-copy
          className={cn(
            'relative z-20 order-2 max-w-xl py-5 text-center sm:py-6 lg:max-w-[34rem] lg:py-0',
            isArabic ? 'lg:order-2 lg:ml-auto lg:text-right' : 'lg:order-1 lg:mr-auto lg:text-left'
          )}
          dir={content.dir}
        >
          <div
            aria-hidden="true"
            className={cn(
              'absolute -inset-x-4 -inset-y-5 -z-10 bg-[linear-gradient(180deg,rgba(247,248,243,0.94),rgba(247,248,243,0.78))] shadow-[0_28px_90px_rgba(10,25,47,0.18)] dark:bg-[linear-gradient(180deg,rgba(8,15,28,0.88),rgba(8,15,28,0.7))] dark:shadow-[0_28px_90px_rgba(0,0,0,0.32)] sm:-inset-x-6 sm:-inset-y-6 lg:-inset-y-10',
              isArabic
                ? 'lg:[clip-path:polygon(8%_0,100%_0,100%_100%,0_100%)]'
                : 'lg:[clip-path:polygon(0_0,92%_0,100%_100%,0_100%)]'
            )}
          />

          <h1 className="mx-auto max-w-[12ch] text-[clamp(2.15rem,10vw,3.35rem)] font-black leading-[0.94] text-[oklch(0.19_0.018_255)] drop-shadow-[0_10px_28px_rgba(247,248,243,0.5)] dark:text-[oklch(0.96_0.012_92)] dark:drop-shadow-[0_16px_34px_rgba(0,0,0,0.36)] sm:text-[clamp(2.5rem,8vw,4.8rem)] lg:mx-0 lg:max-w-[11ch] lg:text-[clamp(4rem,5.8vw,6.05rem)]">
            {content.headline}
            <span
              className={cn(
                'mt-3 flex min-h-[1.04em] items-center justify-center text-[#b8860b] drop-shadow-[0_0_26px_rgba(212,175,55,0.34)] dark:text-[#f1c85d] dark:drop-shadow-[0_0_34px_rgba(212,175,55,0.42)]',
                isArabic ? 'lg:justify-end' : 'lg:justify-start'
              )}
            >
              <FlipWords
                words={[...content.words]}
                duration={3000}
                className={cn(
                  'px-0 text-current',
                  isArabic ? 'text-right' : 'text-left'
                )}
              />
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-[64ch] text-sm font-semibold leading-7 text-[oklch(0.28_0.018_255)] dark:text-[oklch(0.9_0.014_92)] sm:text-base sm:leading-8 lg:mx-0 lg:mt-6 lg:text-xl">
            {content.paragraph}
          </p>

          <div
            data-home-hero-actions
            className={cn(
              'mt-6 flex flex-row flex-wrap items-center justify-center gap-3 lg:mt-8',
              isArabic ? 'lg:justify-end' : 'lg:justify-start'
            )}
          >
            <Link
              href={content.primaryCta.href}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg bg-[#d4af37] px-5 py-3 text-sm font-black text-[oklch(0.17_0.018_255)] shadow-[0_18px_45px_rgba(212,175,55,0.34)] transition hover:bg-[#c49b22] hover:shadow-[0_22px_55px_rgba(212,175,55,0.44)] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-[oklch(0.96_0.012_92)] sm:flex-none sm:px-7 sm:text-base dark:focus:ring-offset-[oklch(0.13_0.018_255)]"
            >
              {content.primaryCta.label}
            </Link>
            <Link
              href={content.secondaryCta.href}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg border border-[rgba(10,25,47,0.28)] bg-[oklch(0.2_0.024_255)] px-5 py-3 text-sm font-black text-[oklch(0.96_0.012_92)] shadow-[0_18px_45px_rgba(10,25,47,0.18)] transition hover:bg-[oklch(0.25_0.03_255)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.2_0.024_255)] focus:ring-offset-2 focus:ring-offset-[oklch(0.96_0.012_92)] sm:flex-none sm:px-7 sm:text-base dark:border-[#d4af37]/35 dark:bg-[oklch(0.94_0.018_92)] dark:text-[oklch(0.17_0.018_255)] dark:hover:bg-[oklch(0.88_0.022_92)] dark:focus:ring-[#d4af37] dark:focus:ring-offset-[oklch(0.13_0.018_255)]"
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div
          data-home-hero-logo
          className={cn(
            'relative order-1 h-[240px] w-full sm:h-[310px] lg:h-auto lg:min-h-[650px]',
            isArabic ? 'lg:order-1' : 'lg:order-2'
          )}
          aria-hidden="true"
        >
          <div className="absolute left-1/2 top-1/2 h-[min(86vw,560px)] w-[min(86vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.28)_0%,rgba(212,175,55,0.1)_38%,rgba(10,25,47,0)_70%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(212,175,55,0.26)_0%,rgba(45,91,140,0.12)_44%,rgba(10,25,47,0)_72%)]" />
          <div className="absolute left-1/2 top-1/2 h-[min(76vw,500px)] w-[min(76vw,500px)] -translate-x-1/2 -translate-y-1/2 border border-[#d4af37]/25 shadow-[0_0_80px_rgba(212,175,55,0.18)] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)] dark:border-[#d4af37]/30" />
          <div className="absolute left-1/2 top-1/2 h-[min(62vw,420px)] w-[min(62vw,420px)] -translate-x-1/2 -translate-y-1/2 border border-[rgba(10,25,47,0.16)] [clip-path:polygon(12%_8%,88%_8%,100%_50%,88%_92%,12%_92%,0_50%)] dark:border-[#d4af37]/20" />
          <Simple3DLogo
            className="absolute inset-0 z-10 h-full w-full drop-shadow-[0_28px_70px_rgba(10,25,47,0.38)] dark:drop-shadow-[0_28px_80px_rgba(212,175,55,0.28)]"
            canvasClassName="h-full w-full"
            cameraPosition={[0, 0, 7.2]}
            modelPosition={[0, -0.18, 0]}
            modelScale={3.05}
            baseRotation={[0, -0.24, 0]}
            rotationMode="sway"
            rotationSpeed={0.75}
            rotationAmplitude={0.18}
            floatIntensity={0.22}
          />
        </div>
      </div>
    </section>
  );
}
