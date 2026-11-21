import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0552A2] text-white pt-16 pb-10 border-t border-white/10 select-none">
      <div className="container">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="relative h-12 w-40">
              <Image
                src="/logo.png"
                alt="Visit Nepal Official Logo"
                fill
                loading="lazy"
                decoding="async"
                sizes="160px"
                className="object-contain brightness-125"
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm mt-2">
              Naturally Nepal — Once is Not Enough. Dedicated to promoting sustainable Himalayan travel, authentic cultural heritage, and safe alpine expeditions across Nepal.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="h-2 w-2 rounded-full bg-[#FDB716] animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-[#92C4EA] font-semibold">
                Official Nepal Tourism Board
              </span>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#FDB716] font-bold">Explore</span>
            <ul className="flex flex-col gap-2 text-sm text-white/75">
              <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
              <li><a href="#experiences" className="hover:text-white transition-colors">Experiences</a></li>
              <li><a href="#culture" className="hover:text-white transition-colors">Culture & Heritage</a></li>
              <li><a href="#storytelling" className="hover:text-white transition-colors">Nepal Stories</a></li>
              <li><a href="#plan-your-trip" className="hover:text-white transition-colors">Trip Customizer</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#FDB716] font-bold">Featured Regions</span>
            <ul className="flex flex-col gap-2 text-sm text-white/75">
              <li><a href="#destinations" className="hover:text-white transition-colors">Everest Region (Khumbu)</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Annapurna Conservation Area</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Upper Mustang (Kingdom of Lo)</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Kathmandu Historic Valley</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Chitwan & Bardia Wildlands</a></li>
            </ul>
          </div>

          {/* Travel Resources & Contact */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#FDB716] font-bold">Traveler Resources</span>
            <ul className="flex flex-col gap-2 text-sm text-white/75 mb-3">
              <li><Link href="/login" className="hover:text-white transition-colors">TIMS & Park Permits</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Registered Mountain Guides</Link></li>
              <li><a href="#plan-your-trip" className="hover:text-white transition-colors">High Altitude Protocols</a></li>
            </ul>
            <div className="pt-2 border-t border-white/10 text-xs text-white/70 flex flex-col gap-1">
              <span>Tourism Board Helpdesk: +977-1-4256909</span>
              <span>Email: info@ntb.gov.np</span>
              <span>Kathmandu, Nepal</span>
            </div>
          </div>
        </div>

        {/* Sub-Footer: Copyright & Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Nepal Tourism Board. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Permit Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
