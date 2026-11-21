'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore } from '@/store/useTravelStore';
import { Menu, X, ArrowUpRight, User } from '@/components/ui/Icons';

export default function Navigation() {
  const router = useRouter();
  const currentUser = useTravelStore((state) => state.currentUser);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getScrollTop = () => {
      return (
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    };

    const updateScrollState = () => {
      const top = getScrollTop();
      const isPastThreshold = top > 25;
      setScrolled((prev) => (prev !== isPastThreshold ? isPastThreshold : prev));
    };

    // Run immediate check on mount
    updateScrollState();

    // Listen to scroll on both window and document
    window.addEventListener('scroll', updateScrollState, { passive: true });
    document.addEventListener('scroll', updateScrollState, { passive: true });

    // Robust IntersectionObserver on #hero section
    // Guarantees navbar is ALWAYS solid white whenever the user scrolls into white content sections
    let observer: IntersectionObserver | null = null;
    const heroEl = document.getElementById('hero');
    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            setScrolled(true);
          } else {
            updateScrollState();
          }
        },
        { threshold: [0, 0.1, 0.5, 1.0], rootMargin: '-60px 0px 0px 0px' }
      );
      observer.observe(heroEl);
    }

    return () => {
      window.removeEventListener('scroll', updateScrollState);
      document.removeEventListener('scroll', updateScrollState);
      if (observer) observer.disconnect();
    };
  }, []);

  // Prevent background scroll when mobile drawer is open for smooth mobile UX
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Discover', href: '#storytelling' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Culture', href: '#culture' },
    { label: 'Plan Your Trip', href: '#plan-your-trip' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href !== '#' && href !== '#hero') {
      setScrolled(true);
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow,border-color] duration-300 ease-in-out ${
          scrolled || mobileMenuOpen
            ? `bg-white/98 backdrop-blur-md shadow-[0_4px_24px_rgba(5,82,162,0.08)] py-3 ${
                !mobileMenuOpen ? 'border-b border-[#0552A2]/10' : ''
              }`
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="w-full px-3.5 sm:px-6 md:px-8 max-w-[1440px] mx-auto flex items-center justify-between">
          {/* Logo with official Visit Nepal identity */}
          <Link
            href="/"
            prefetch={false}
            className="flex items-center gap-2 group focus:outline-none"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setScrolled(false);
              }
            }}
          >
            <div className="relative h-10 w-[50px] sm:h-12 sm:w-[58px] transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={scrolled || mobileMenuOpen ? "/logo.png" : "/logo-white.png"}
                alt="Visit Nepal Official Logo"
                fill
                unoptimized
                sizes="(max-width: 640px) 50px, 58px"
                className={`object-contain object-left transition-all duration-300 ${
                  scrolled || mobileMenuOpen ? '' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]'
                }`}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs uppercase tracking-[0.14em] font-semibold transition-colors duration-200 relative group py-1 ${
                  scrolled || mobileMenuOpen
                    ? 'text-[#17212B] hover:text-[#0552A2]'
                    : 'text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                }`}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0552A2] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* Right Actions: Plan Trip CTA & Account Access */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={() => {
                if (currentUser?.loggedIn && currentUser?.otpVerified) {
                  router.push('/dashboard');
                } else {
                  router.push('/login');
                }
              }}
              className={`flex items-center gap-1.5 text-xs font-semibold tracking-wider transition-colors duration-200 ${
                scrolled || mobileMenuOpen
                  ? 'text-[#17212B] hover:text-[#0552A2]'
                  : 'text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>{currentUser?.loggedIn && currentUser?.otpVerified ? 'Dashboard' : 'Sign In'}</span>
            </button>

            <a
              href="#plan-your-trip"
              onClick={(e) => handleNavClick(e, '#plan-your-trip')}
              className={`text-xs uppercase tracking-wider font-bold px-5 py-2.5 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm ${
                scrolled || mobileMenuOpen
                  ? 'bg-[#0552A2] text-white hover:bg-[#043e7b] hover:shadow-[0_4px_16px_rgba(5,82,162,0.3)]'
                  : 'bg-white text-[#0552A2] hover:bg-white/90 hover:shadow-[0_4px_16px_rgba(0,0,0,0.25)]'
              }`}
            >
              <span>Plan Your Trip</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href="#plan-your-trip"
              onClick={(e) => handleNavClick(e, '#plan-your-trip')}
              className={`text-[11px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full sm:hidden transition-colors ${
                scrolled || mobileMenuOpen ? 'bg-[#0552A2] text-white' : 'bg-white text-[#0552A2]'
              }`}
            >
              Plan
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl transition-colors ${
                scrolled || mobileMenuOpen ? 'text-[#17212B] hover:bg-zinc-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer seamlessly attached under header: touches sides, only bottom rounded */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-nav-drawer"
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{
                duration: 0.24,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: 'top center' }}
              className="absolute left-0 right-0 top-full bg-white/98 backdrop-blur-2xl rounded-b-[32px] sm:rounded-b-[36px] shadow-[0_28px_60px_-15px_rgba(0,0,0,0.35),0_12px_24px_-8px_rgba(5,82,162,0.15)] px-6 pt-2 pb-8 sm:px-8 border-b border-[#0552A2]/10 max-h-[calc(100dvh-80px)] overflow-y-auto lg:hidden"
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * (idx + 1), duration: 0.18, ease: 'easeOut' }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-base uppercase tracking-wider font-bold text-[#17212B] hover:text-[#0552A2] py-3 px-3 min-h-[48px] rounded-2xl hover:bg-slate-50 border-b border-gray-100/70 flex items-center justify-between transition-all group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-[#0552A2] group-hover:scale-110 transition-transform" />
                  </motion.a>
                ))}
              </nav>

              <div className="pt-6 pb-1 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (currentUser?.loggedIn && currentUser?.otpVerified) {
                      router.push('/dashboard');
                    } else {
                      router.push('/login');
                    }
                  }}
                  className="w-full py-3.5 min-h-[48px] rounded-full border border-[#0552A2]/30 text-[#0552A2] text-xs uppercase tracking-wider font-bold hover:bg-blue-50/50 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <User className="h-4 w-4" />
                  <span>{currentUser?.loggedIn && currentUser?.otpVerified ? 'Go to Dashboard' : 'Sign In / Account'}</span>
                </button>
                <a
                  href="#plan-your-trip"
                  onClick={(e) => handleNavClick(e, '#plan-your-trip')}
                  className="w-full py-3.5 min-h-[48px] rounded-full bg-[#0552A2] text-white text-xs uppercase tracking-wider font-bold text-center shadow-md hover:bg-[#043e7b] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Plan Your Trip</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Dimmed Backdrop Overlay outside header */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
