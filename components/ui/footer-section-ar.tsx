'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Custom TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'الخدمات',
    links: [
      { title: 'البناء والمقاولات', href: '/ar/services' },
      { title: 'التصميم الداخلي', href: '/ar/services' },
      { title: 'التشطيبات', href: '/ar/services' },
      { title: 'إدارة المشاريع', href: '/ar/services' },
    ],
  },
  {
    label: 'الشركة',
    links: [
      { title: 'من نحن', href: '/ar/about' },
      { title: 'المشاريع', href: '/ar/portfolio' },
      { title: 'وحدتي', href: '/ar/my-apartment' },
      { title: 'اتصل بنا', href: '/ar/contact' },
    ],
  },
  {
    label: 'الموارد',
    links: [
      { title: 'المدونة', href: '/ar/blog' },
      { title: 'الأسئلة الشائعة', href: '/ar/faqs' },
      { title: 'سياسة الخصوصية', href: '/ar/privacy' },
      { title: 'شروط الخدمة', href: '/ar/terms' },
    ],
  },
  {
    label: 'تواصل معنا',
    links: [
      { title: 'فيسبوك', href: 'https://www.facebook.com/profile.php?id=61586708520062', icon: FacebookIcon },
      { title: 'إنستغرام', href: 'https://www.instagram.com/bonyanmisr.official/', icon: InstagramIcon },
      { title: 'تيك توك', href: 'https://www.tiktok.com/@bonyan.misr.official', icon: TikTokIcon },
      { title: 'لينكد إن', href: 'https://www.linkedin.com/in/bonyan-misr-بنيان-مصر-b450883a7', icon: LinkedinIcon },
    ],
  },
];

export function FooterAr() {
  return (
    <footer className="relative w-full border-t border-gray-200 dark:border-gray-800 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]" dir="rtl">
      {/* Full-width glowing line */}
      <div className="absolute top-0 left-0 right-0 h-px w-full">
        <div className="bg-primary/20 absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 rounded-full blur-sm" />
      </div>

      {/* Centered content container */}
      <div className="w-full max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          <AnimatedContainer className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center relative">
                <Image
                  src="/bonyanmisr-logo.png"
                  alt="شعار بنيان مصر"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">بنيان مصر</h3>
                <p className="text-xs text-primary">للإنشاءات والتصميم</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              التميز في البناء والتصميم الداخلي والتشطيبات الفاخرة في جميع أنحاء مصر.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">
              © {new Date().getFullYear()} بنيان مصر. جميع الحقوق محفوظة.
            </p>
          </AnimatedContainer>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    {section.label}
                  </h3>
                  <ul className="space-y-3 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <Link
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary inline-flex items-center transition-all duration-300"
                        >
                          {link.icon && <link.icon className="ms-2 size-4" />}
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
