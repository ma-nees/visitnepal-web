'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [mobileImgSrc, setMobileImgSrc] = useState('/hero-image-mobile.jpg');
  const [desktopImgSrc, setDesktopImgSrc] = useState('/hero-himalayan-peaks.webp');
  const [mobileImgFailed, setMobileImgFailed] = useState(false);
  const [desktopImgFailed, setDesktopImgFailed] = useState(false);

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] sm:h-[100svh] md:h-[60vw] md:min-h-[480px] lg:h-screen overflow-hidden bg-[#0F2A4A]"
      aria-labelledby="hero-heading"
    >
      {/* Background Himalayan Peaks & Prayer Flags — LCP Prioritized */}
      <div className="absolute inset-0 z-0">
        {/* Mobile & Small Screen Hero (< md or portrait viewports) */}
        <div className="block md:hidden portrait:block absolute inset-0">
          {!mobileImgFailed && (
            <Image
              src={mobileImgSrc}
              alt="Visit Nepal — Snow-capped Himalayan peaks and Tibetan prayer flags under a clear alpine sky"
              fill
              unoptimized
              priority
              loading="eager"
              decoding="sync"
              sizes="(max-width: 768px) 100vw, (orientation: portrait) 100vw, 100vw"
              className="object-cover object-center select-none"
              onError={() => {
                if (mobileImgSrc === '/Himalayan Peaks with Prayer Flags.png') {
                  setMobileImgSrc('/Himalayan Peaks with Prayer Flags.png');
                } else if (mobileImgSrc !== '/Himalayan Peaks with Prayer Flags.png') {
                  setMobileImgSrc('/Himalayan Peaks with Prayer Flags.png');
                } else {
                  setMobileImgFailed(true);
                }
              }}
            />
          )}
        </div>

        {/* Desktop & Large Screen Hero (>= md landscape viewports) */}
        <div className="hidden md:block portrait:hidden absolute inset-0">
          {!desktopImgFailed && (
            <Image
              src={desktopImgSrc}
              alt="Visit Nepal — Snow-capped Himalayan peaks and Tibetan prayer flags under a clear alpine sky"
              fill
              unoptimized
              priority
              loading="eager"
              decoding="sync"
              sizes="100vw"
              className="object-cover object-center select-none"
              onError={() => {
                if (desktopImgSrc !== '/hero-himalayan-peaks.png') {
                  setDesktopImgSrc('/hero-himalayan-peaks.png');
                } else {
                  setDesktopImgFailed(true);
                }
              }}
            />
          )}
        </div>

        {/* Subtle natural edge vignettes for navbar legibility and seamless section transition */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-28 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      {/* Centered "It's Time To" in curved script font positioned above "Visit Nepal" (higher on large screens, centered over mountain peak on mobile) */}
      <div className="relative z-10 container h-full">
        <div className="absolute inset-x-0 bottom-[35%] sm:bottom-[36%] md:bottom-[44%] lg:bottom-[48%] xl:bottom-[48.5%] portrait:bottom-[35%] sm:portrait:bottom-[36%] flex justify-center px-4">
          <p
            id="hero-heading"
            className="text-center font-[family-name:var(--font-script)] text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-[0.06em] text-white select-none py-1 leading-normal drop-shadow-[0_4px_14px_rgba(0,0,0,0.75)]"
          >
            It&apos;s Time To
          </p>
        </div>
      </div>
    </section>
  );
}
