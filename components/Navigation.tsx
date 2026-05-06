'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MoonIcon } from './ui/moon';
import Image from 'next/image';

export default function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Check for dark mode preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(darkMode);
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
    console.log('Toggle dark mode:', newDarkMode);
    console.log('HTML element before:', document.documentElement.classList.toString());

    setIsDark(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    console.log('HTML element after:', document.documentElement.classList.toString());
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'My Unit', href: '/my-apartment' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12">
              <Image
                src="/bonyanmisr-logo.png"
                alt="BonyanMisr Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden md:block">
              <span className="block text-2xl font-display font-bold text-gray-900 dark:text-white">
                BONYAN MISR
              </span>
              <span className="block text-[0.6rem] font-bold text-primary tracking-[0.2em] uppercase">
                Construction & Design
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition relative group px-3 py-2 ${pathname === item.href
                  ? 'text-primary font-bold border-b-2 border-primary'
                  : 'text-gray-700 dark:text-gray-200 hover:text-primary'
                  }`}
              >
                {item.label}
                {pathname !== item.href && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href={pathname === '/' ? '/ar' : `/ar${pathname}`}
              className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition uppercase"
            >
              AR
            </Link>
            <span className="text-gray-400">|</span>
            <button
              onClick={toggleDarkMode}
              className="rounded-full transition"
              aria-label="Toggle dark mode"
            >
              <MoonIcon />
            </button>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-primary to-yellow-600 hover:from-yellow-600 hover:to-primary transition-all"
            >
              Get a Quote
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-200"
              aria-label="Toggle mobile menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
