"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_IMAGES = [
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
];

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.4]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.9, 0.2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[85vh] lg:h-screen overflow-hidden bg-white flex items-center justify-center pt-20 pb-12 px-5"
      aria-labelledby="hero-heading"
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 w-full flex items-center justify-center text-center select-none will-change-transform"
      >
        {/* Sizing & accessibility anchor */}
        <div className="relative flex flex-col items-center">
          <div className="invisible flex flex-col items-center" aria-hidden="true">
            <span className="font-[family-name:var(--font-script)] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-[0.04em] leading-tight mb-2 sm:mb-3">
              It&apos;s Time To
            </span>
            <span className="font-[family-name:var(--font-oswald)] uppercase text-[20vw] sm:text-[19vw] lg:text-[18vw] xl:text-[17.5vw] font-bold tracking-tight leading-[0.86] whitespace-nowrap">
              Visit Nepal
            </span>
          </div>

          {HERO_IMAGES.map((src, idx) => (
            <div
              key={src}
              style={{
                backgroundImage: `url('${src}')`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
              className={`absolute inset-0 bg-cover bg-center text-transparent flex flex-col items-center transition-opacity duration-700 ease-in-out ${
                idx === activeIdx ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <span className="font-[family-name:var(--font-script)] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-[0.04em] leading-tight mb-2 sm:mb-3">
                It&apos;s Time To
              </span>
              {idx === 0 ? (
                <h1
                  id="hero-heading"
                  className="font-[family-name:var(--font-oswald)] uppercase text-[20vw] sm:text-[19vw] lg:text-[18vw] xl:text-[17.5vw] font-bold tracking-tight leading-[0.86] whitespace-nowrap"
                >
                  Visit Nepal
                </h1>
              ) : (
                <span
                  aria-hidden="true"
                  className="font-[family-name:var(--font-oswald)] uppercase text-[20vw] sm:text-[19vw] lg:text-[18vw] xl:text-[17.5vw] font-bold tracking-tight leading-[0.86] whitespace-nowrap"
                >
                  Visit Nepal
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
