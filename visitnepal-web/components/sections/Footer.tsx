'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-[#17212B] pt-6 md:pt-8 pb-12 border-t border-zinc-200 select-none">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-100">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="inline-block relative h-12 w-44 transition-transform duration-200 hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt="Visit Nepal Official Logo"
                fill
                unoptimized
                className="object-contain object-left"
              />
            </Link>
            <p className="text-[#5A6578] text-sm leading-relaxed max-w-sm mt-1">
              Naturally Nepal — Once is Not Enough. Dedicated to promoting sustainable Himalayan travel, authentic cultural heritage, and safe alpine expeditions across Nepal.
            </p>
            <div className="flex items-center gap-2.5 mt-2">
              <span className="h-2 w-2 rounded-full bg-[#EC1F27] animate-pulse" />
              <span className="text-[11px] uppercase tracking-widest text-[#0552A2] font-bold">
                Official Nepal Tourism Board
              </span>
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
            <span className="text-[11px] uppercase tracking-wider text-[#0552A2] font-black">Traveler Resources</span>
            <ul className="flex flex-col gap-2.5 text-sm text-[#5A6578] mb-2">
              <li><Link href="/login" className="hover:text-[#0552A2] transition-colors">TIMS & Park Permits</Link></li>
              <li><Link href="/login" className="hover:text-[#0552A2] transition-colors">Registered Mountain Guides</Link></li>
              <li><a href="#plan-your-trip" className="hover:text-[#0552A2] transition-colors">High Altitude Protocols</a></li>
            </ul>
            <div className="pt-3 border-t border-zinc-100 text-xs text-[#7A8699] flex flex-col gap-1">
              <span>Helpdesk: +977-1-4256909</span>
              <span>Email: info@ntb.gov.np</span>
              <span>Pradarshani Marg, Kathmandu</span>
            </div>
          </div>
        </div>

        {/* Sub-Footer: Copyright & Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A8699]">
          <div>
            © {new Date().getFullYear()} Nepal Tourism Board. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#0552A2] transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-[#0552A2] transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-[#0552A2] transition-colors cursor-pointer">Permit Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
