import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const heroImage = 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1920&auto=format&fit=crop';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] lg:min-h-screen flex items-center overflow-hidden bg-[#17212B]"
      aria-labelledby="hero-heading"
    >
      {/* Background Cinematic Himalaya Photography */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Breathtaking Himalayan mountain peaks bathed in golden alpine dawn"
          fill
          priority
          loading="eager"
          fetchPriority="high"
          quality={75}
          sizes="100vw"
          className="object-cover brightness-[0.78]"
        />
        {/* Editorial Vignette and Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17212B]/90 via-[#17212B]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17212B]/85 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 container py-28 md:py-36 lg:py-44">
        <div className="max-w-3xl text-left">
          <h1
            id="hero-heading"
            className="text-heading-1 text-white mb-6 text-balance tracking-tight"
          >
            Somewhere Between
            <br />
            <span className="text-[#FDB716] italic font-normal font-serif">Earth and Heaven.</span>
          </h1>

          {/* Lead Paragraph */}
          <p className="text-body-lg text-white/85 mb-10 max-w-xl leading-relaxed font-normal">
            Discover the extraordinary landscapes, ancient cultures, and unforgettable journeys of Nepal.
          </p>

          {/* Editorial CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="#destinations"
              className="px-8 py-4 rounded-full bg-[#0552A2] text-white text-sm uppercase tracking-wider font-bold transition-[background-color,box-shadow] duration-300 hover:bg-[#043e7b] hover:shadow-[0_6px_24px_rgba(5,82,162,0.4)] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Explore Nepal</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="#plan-your-trip"
              className="px-8 py-4 rounded-full bg-white/15 sm:bg-white/10 sm:backdrop-blur-md border border-white/30 text-white text-sm uppercase tracking-wider font-bold transition-[background-color,color] duration-300 hover:bg-white hover:text-[#0552A2] flex items-center justify-center cursor-pointer"
            >
              <span>Plan Your Journey</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
