import React from 'react';
import Image from 'next/image';
import heroImage from '../../public/hero-himalayan-peaks.webp';
import heroMobileImage from '../../public/hero-image-mobile.webp';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full h-[100svh] sm:h-[60vw] sm:min-h-[420px] max-h-screen lg:h-screen overflow-hidden bg-[#0F2A4A]"
      aria-labelledby="hero-heading"
    >
      {/* Background Himalayan Peaks & Prayer Flags — LCP Prioritized */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Viewport Hero (< sm / portrait) */}
        <div className="block sm:hidden absolute inset-0">
          <Image
            src={heroMobileImage}
            alt="Visit Nepal — Snow-capped Himalayan peaks and Tibetan prayer flags under a clear alpine sky"
            fill
            priority
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            quality={85}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Desktop & Tablet Viewport Hero (>= sm / landscape) */}
        <div className="hidden sm:block absolute inset-0">
          <Image
            src={heroImage}
            alt="Visit Nepal — Snow-capped Himalayan peaks and Tibetan prayer flags under a clear alpine sky"
            fill
            priority
            loading="eager"
            decoding="sync"
            fetchPriority="high"
            quality={75}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Subtle natural edge vignettes for navbar legibility and seamless section transition */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>

      {/* Centered "It's Time To" in curved script font positioned above "Visit Nepal" */}
      <div className="relative z-10 container h-full">
        <div className="absolute inset-x-0 bottom-[36%] sm:bottom-[49%] lg:bottom-[49%] flex justify-center px-4">
          <p
            id="hero-heading"
            className="text-center font-[family-name:var(--font-script)] text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-[0.06em] text-white select-none"
          >
            It&apos;s Time To
          </p>
        </div>
      </div>
    </section>
  );
}
