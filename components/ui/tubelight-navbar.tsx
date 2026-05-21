"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Building2, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonIcon } from "./moon";
import Image from "next/image";

interface NavItem {
  id: string;
  label: string;
  labelAr: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    labelAr: "الرئيسية",
    icon: <Home className="w-5 h-5" />,
    href: "/",
  },
  {
    id: "projects",
    label: "Projects",
    labelAr: "المشاريع",
    icon: <Image src="/curtains.png" alt="Projects" width={20} height={20} className="w-5 h-5 object-contain brightness-0 invert-[0.4] dark:invert-[0.6]" />,
    href: "/portfolio",
  },
  {
    id: "services",
    label: "Services",
    labelAr: "الخدمات",
    icon: <Image src="/team.png" alt="Services" width={20} height={20} className="w-5 h-5 object-contain brightness-0 invert-[0.4] dark:invert-[0.6]" />,
    href: "/services",
  },
  {
    id: "my-apartment",
    label: "My Unit",
    labelAr: "وحدتي",
    icon: <Building2 className="w-5 h-5" />,
    href: "/my-apartment",
  },
  {
    id: "contact",
    label: "Contact",
    labelAr: "تواصل معنا",
    icon: <Phone className="w-5 h-5" />,
    href: "/contact",
  },
];

export function TubelightNavbar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('darkMode') === 'true';
  });
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Check if we're on Arabic route
  const isArabic = pathname.startsWith('/ar');

  useEffect(() => {
    // Check for dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        // Always show navbar at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setIsVisible(false);
      } else {
        // Scrolling up - show navbar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  // Determine active index based on pathname
  const getActiveIndex = () => {
    // Remove /ar prefix if present
    const cleanPath = pathname.replace('/ar', '') || '/';

    if (cleanPath.startsWith('/project')) {
      return navItems.findIndex(item => item.id === 'projects');
    }

    const index = navItems.findIndex(item => {
      if (item.href === "/" && cleanPath === "/") return true;
      if (item.href !== "/" && cleanPath.startsWith(item.href)) return true;
      return false;
    });
    return index !== -1 ? index : 0;
  };

  const activeIndex = getActiveIndex();

  // Generate href with language prefix
  const getHref = (baseHref: string) => {
    if (isArabic) {
      return baseHref === '/' ? '/ar' : `/ar${baseHref}`;
    }
    return baseHref;
  };

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-4xl mx-auto z-10 relative">
          <div className="relative flex items-center justify-center gap-2 p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg">
            {/* Tubelight Glow Effect */}
            <motion.div
              className="absolute top-1 h-1 rounded-full mx-2"
              style={{
                background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
                boxShadow: "0 0 20px #d4af37, 0 0 40px #d4af37, 0 0 60px #d4af37",
              }}
              initial={false}
              animate={{
                left: `calc(${(activeIndex / navItems.length) * 100}% + 0.5rem)`,
                width: `calc(${100 / navItems.length}% - 1rem)`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            />

            {navItems.map((item, index) => {
              const isActive = index === activeIndex;
              const isHovered = index === hoveredIndex;

              return (
                <Link
                  key={item.id}
                  href={getHref(item.href)}
                  className="relative flex-1"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className={`
                      relative px-6 py-3 rounded-full text-center cursor-pointer
                      transition-all duration-300
                      ${isActive
                        ? "text-[#d4af37] font-semibold"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Background glow on hover */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#d4af37]/10"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}

                    {/* Icon */}
                    <div className="flex items-center justify-center gap-2">
                      <span className={`${isActive ? "text-[#d4af37]" : ""} ${isActive ? "[&_img]:brightness-0 [&_img]:invert-[0.7] [&_img]:sepia [&_img]:saturate-[5] [&_img]:hue-rotate-[10deg]" : ""}`}>
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium whitespace-nowrap">{isArabic ? item.labelAr : item.label}</span>
                    </div>

                    {/* Arabic label on hover */}
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                                   text-xs text-[#d4af37] whitespace-nowrap
                                   bg-black/80 px-2 py-1 rounded"
                      >
                        {item.labelAr}
                      </motion.div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side Controls - Theme & Language */}
        <div className={`absolute right-4 top-1/2 z-50 pointer-events-auto hidden md:block transition-transform duration-300 ${
          isVisible ? 'translate-y-[-50%]' : 'translate-y-[-300%]'
        }`}>
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg">

            {/* Language Toggle */}
            <Link
              href={isArabic ? pathname.replace(/^\/ar/, '') || '/' : `/ar${pathname === '/' ? '' : pathname}`}
              className="px-3 py-2 rounded-full text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#d4af37] transition-colors"
            >
              {isArabic ? 'EN' : 'AR'}
            </Link>

            <div className="w-px h-4 bg-white/20 dark:bg-white/10" />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-[#d4af37] dark:hover:text-[#d4af37] transition-colors"
              aria-label="Toggle dark mode"
            >
              <MoonIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Controls - Theme & Language */}
      <div
        className="fixed right-3 top-[calc(0.75rem+env(safe-area-inset-top))] z-[60] md:hidden"
      >
        <div className="flex items-center gap-1 rounded-full border border-slate-900/10 bg-slate-50/90 p-1 shadow-[0_14px_34px_rgba(10,25,47,0.22)] backdrop-blur-xl dark:border-white/15 dark:bg-[#071225]/90 dark:shadow-[0_14px_34px_rgba(0,0,0,0.42)]">
          <Link
            href={isArabic ? pathname.replace(/^\/ar/, '') || '/' : `/ar${pathname === '/' ? '' : pathname}`}
            className="flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-black text-slate-700 transition-colors hover:text-[#d4af37] dark:text-slate-100 dark:hover:text-[#d4af37]"
            aria-label={isArabic ? 'Switch to English' : 'Switch to Arabic'}
          >
            {isArabic ? 'EN' : 'AR'}
          </Link>

          <div className="h-5 w-px bg-slate-400/40 dark:bg-white/20" />

          <button
            type="button"
            onClick={toggleDarkMode}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-colors hover:text-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-slate-50 dark:text-slate-100 dark:hover:text-[#d4af37] dark:focus:ring-offset-[#071225]"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
          >
            <MoonIcon />
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Bottom */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] md:hidden">
        <div className="relative flex items-center justify-around rounded-full border border-white/20 bg-white/15 p-1.5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-black/15">
          {/* Tubelight Glow Effect - Bottom */}
          <motion.div
            className="absolute bottom-1 h-1 rounded-full mx-2"
            style={{
              background: "linear-gradient(90deg, transparent, #d4af37, transparent)",
              boxShadow: "0 0 20px #d4af37, 0 0 40px #d4af37, 0 0 60px #d4af37",
            }}
            initial={false}
            animate={{
              left: `calc(${(activeIndex / navItems.length) * 100}% + 0.5rem)`,
              width: `calc(${100 / navItems.length}% - 1rem)`,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />

          {navItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <Link
                key={item.id}
                href={getHref(item.href)}
                className="relative flex-1"
              >
                <motion.div
                  className={`
                    relative rounded-full px-1 py-2 text-center cursor-pointer
                    flex flex-col items-center gap-1
                    ${isActive
                      ? "text-[#d4af37]"
                      : "text-gray-600 dark:text-gray-400"
                    }
                  `}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Icon with glow effect when active */}
                  <div className="relative">
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-xl"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "[&_img]:brightness-0 [&_img]:invert-[0.7] [&_img]:sepia [&_img]:saturate-[5] [&_img]:hue-rotate-[10deg]" : ""}`}>{item.icon}</span>
                  </div>

                  {/* Label - Arabic for mobile */}
                  <span className="max-w-[4.25rem] truncate text-[9px] font-semibold leading-tight min-[390px]:text-[10px]">
                    {isArabic ? item.labelAr : item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
