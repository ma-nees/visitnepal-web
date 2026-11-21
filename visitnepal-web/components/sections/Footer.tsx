import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-[#17212B] pt-6 md:pt-8 pb-12 border-t border-zinc-200 select-none overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl w-full">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-10 pb-12 border-b border-zinc-100">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 w-full">
            {/* Mobile: Horizontal side-by-side row (Logo on Left, Text on Right); Desktop: Stacked */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-3.5 sm:gap-4 md:gap-4 w-full">
              {/* Visit Nepal Logo (Fixed width, flex-shrink: 0 to prevent squeezing) */}
              <Link
                href="/"
                className="relative shrink-0 w-24 sm:w-28 md:w-44 h-14 sm:h-16 md:h-12 transition-transform duration-200 hover:scale-[1.02] flex items-center justify-start"
              >
                <Image
                  src="/logo.png"
                  alt="Visit Nepal Official Logo"
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 176px"
                  className="object-contain object-left"
                />
              </Link>

              {/* Description & Badge (Takes remaining width with flex: 1, min-width: 0 and wraps naturally) */}
              <div className="flex-1 min-w-0">
                <p className="text-[#5A6578] text-xs sm:text-sm leading-relaxed">
                  Naturally Nepal — Once is Not Enough. Dedicated to promoting sustainable Himalayan travel, authentic cultural heritage, and safe alpine expeditions across Nepal.
                </p>
                {/* <div className="flex items-center gap-2 mt-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#EC1F27] animate-pulse shrink-0" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#0552A2] font-bold truncate">
                    Official Nepal Tourism Board
                  </span>
                </div> */}
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#0552A2] font-black">Explore</span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A6578]">
              <li><a href="#destinations" className="hover:text-[#0552A2] transition-colors">Destinations</a></li>
              <li><a href="#experiences" className="hover:text-[#0552A2] transition-colors">Experiences</a></li>
              <li><a href="#culture" className="hover:text-[#0552A2] transition-colors">Culture & Heritage</a></li>
              <li><a href="#storytelling" className="hover:text-[#0552A2] transition-colors">Nepal Stories</a></li>
              <li><a href="#plan-your-trip" className="hover:text-[#0552A2] transition-colors">Trip Customizer</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#0552A2] font-black">Featured Regions</span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A6578]">
              <li><a href="#destinations" className="hover:text-[#0552A2] transition-colors">Everest Region (Khumbu)</a></li>
              <li><a href="#destinations" className="hover:text-[#0552A2] transition-colors">Annapurna Conservation Area</a></li>
              <li><a href="#destinations" className="hover:text-[#0552A2] transition-colors">Upper Mustang (Kingdom of Lo)</a></li>
              <li><a href="#destinations" className="hover:text-[#0552A2] transition-colors">Kathmandu Historic Valley</a></li>
              <li><a href="#destinations" className="hover:text-[#0552A2] transition-colors">Chitwan & Bardia Wildlands</a></li>
            </ul>
          </div>

          {/* Travel Resources & Contact */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#0552A2] font-black">Traveler Assistance</span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A6578]">
              <li><span className="font-semibold text-[#17212B]">Tourism Hotline:</span> +977-1-4256909</li>
              <li><span className="font-semibold text-[#17212B]">Tourist Police:</span> 1144 (Toll-Free)</li>
              <li><span className="font-semibold text-[#17212B]">Email:</span> info@visitnepal.gov.np</li>
              <li><span className="font-semibold text-[#17212B]">Headquarters:</span> Bhrikutimandap, Kathmandu</li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5A6578] gap-4">
          <p>© {new Date().getFullYear()} Nepal Tourism Board. Government of Nepal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#0552A2] transition-colors">Privacy Policy</a>
            <span className="text-zinc-300">•</span>
            <a href="#terms" className="hover:text-[#0552A2] transition-colors">Terms of Service</a>
            <span className="text-zinc-300">•</span>
            <a href="#permits" className="hover:text-[#0552A2] transition-colors">Permit Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
