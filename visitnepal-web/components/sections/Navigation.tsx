'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTravelStore } from '@/store/useTravelStore';
import { Menu, X, ArrowUpRight, Compass, User } from '@/components/ui/Icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const router = useRouter();
  const currentUser = useTravelStore((state) => state.currentUser);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let isScrolled = window.scrollY > 40;
    setScrolled(isScrolled);

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nextScrolled = window.scrollY > 40;
          if (nextScrolled !== isScrolled) {
            isScrolled = nextScrolled;
            setScrolled(nextScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow,border-color] duration-300 ease-in-out ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(5,82,162,0.08)] py-3 border-b border-[#0552A2]/10'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo with official Visit Nepal identity */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="relative h-10 w-28 sm:h-12 sm:w-36 transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src={scrolled ? "/logo.png" : "/logo-white.png"}
                alt="Visit Nepal Official Logo"
                fill
                unoptimized
                sizes="(max-width: 640px) 112px, 144px"
                className={`object-contain transition-all duration-300 ${
                  scrolled ? '' : 'drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]'
                }`}
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
                  scrolled
                    ? 'text-[#17212B] hover:text-[#0552A2]'
                    : 'text-white/90 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]'
                }`}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0552A2] transition-all duration-300 group-hover:w-full" />
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
                scrolled
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
                scrolled
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
              className={`text-[11px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full sm:hidden ${
                scrolled ? 'bg-[#0552A2] text-white' : 'bg-white text-[#0552A2]'
              }`}
            >
              Plan
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${
                scrolled ? 'text-[#17212B] hover:bg-zinc-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white/98 backdrop-blur-xl border-b border-[#0552A2]/10 shadow-2xl p-6 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm uppercase tracking-wider font-bold text-[#17212B] hover:text-[#0552A2] py-2 border-b border-gray-100 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-[#0552A2]" />
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (currentUser?.loggedIn && currentUser?.otpVerified) {
                      router.push('/dashboard');
                    } else {
                      router.push('/login');
                    }
                  }}
                  className="w-full py-3 rounded-full border border-[#0552A2]/30 text-[#0552A2] text-xs uppercase tracking-wider font-bold hover:bg-zinc-100"
                >
                  {currentUser?.loggedIn && currentUser?.otpVerified ? 'Go to Dashboard' : 'Sign In / Account'}
                </button>
                <a
                  href="#plan-your-trip"
                  onClick={(e) => handleNavClick(e, '#plan-your-trip')}
                  className="w-full py-3 rounded-full bg-[#0552A2] text-white text-xs uppercase tracking-wider font-bold text-center shadow-md hover:bg-[#043e7b]"
                >
                  Plan Your Trip
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
