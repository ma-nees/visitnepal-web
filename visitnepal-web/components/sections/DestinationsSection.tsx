'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { destinations, Destination } from '@/lib/destinations';
import { ArrowUpRight, MapPin, Compass, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function DestinationsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'mountains' | 'culture' | 'wildlife'>('all');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Rotating pool of non-featured destinations from mockData
  const rotatingPool = useMemo(() => {
    const pool = destinations.slice(3);
    if (activeTab === 'all') return pool;
    const filtered = pool.filter((d) => d.category === activeTab);
    return filtered.length > 0 ? filtered : pool;
  }, [activeTab]);

  // Reset carousel index when category tab changes
  useEffect(() => {
    setCarouselIndex(0);
  }, [activeTab]);

  // Auto-rotation every 4 seconds when not paused by hover
  useEffect(() => {
    if (isPaused || rotatingPool.length <= 1) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % rotatingPool.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, rotatingPool.length]);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + rotatingPool.length) % rotatingPool.length);
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % rotatingPool.length);
  };

  // Window of 4 visible destinations that dynamically slide
  const visibleDestinations = useMemo(() => {
    if (rotatingPool.length === 0) return [];
    const count = Math.min(4, rotatingPool.length);
    const result: Destination[] = [];
    for (let i = 0; i < count; i++) {
      result.push(rotatingPool[(carouselIndex + i) % rotatingPool.length]);
    }
    return result;
  }, [rotatingPool, carouselIndex]);

  return (
    <section
      id="destinations"
      className="pt-14 md:pt-18 pb-10 md:pb-14 bg-white scroll-mt-12 text-[#17212B]"
      aria-labelledby="destinations-heading"
    >
      <div className="container">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#EC1F27]" />
              <span className="text-caption text-[#0552A2]">Iconic Territories</span>
            </div>
            <h2 id="destinations-heading" className="text-heading-2 text-[#17212B] text-balance">
              Places That Stay With You
            </h2>
            <p className="text-body-lg text-[#4B5563] mt-3 max-w-xl">
              From the 8,000-meter amphitheaters of Khumbu to ancient stone alleys in Mustang and subtropical jungle sanctuaries.
            </p>
          </div>

          {/* Editorial Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Regions' },
              { id: 'mountains', label: 'Himalayas & Alpine' },
              { id: 'culture', label: 'Sacred Heritage' },
              { id: 'wildlife', label: 'Lakes & Wildlife' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-full transition-all duration-200 cursor-pointer ${activeTab === tab.id
                  ? 'bg-[#0552A2] text-white shadow-sm'
                  : 'bg-white border border-zinc-200 text-[#17212B] hover:border-[#0552A2]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Composition */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-12"
        >
          {/* Top Hero Duo: Large Edge Feature + Complementary Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Lead Destination Feature (Everest) */}
            <motion.div variants={itemVariants} className="lg:col-span-8 group relative overflow-hidden rounded-3xl bg-[#17212B] min-h-[460px] lg:min-h-[540px] flex flex-col justify-end p-8 sm:p-12">
              <Image
                src={destinations[0].imageUrl}
                alt={destinations[0].name}
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17212B]/95 via-[#17212B]/35 to-transparent" />

              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#0552A2] text-white font-bold">
                    {destinations[0].region}
                  </span>
                  <span className="text-xs text-white/80 font-mono">
                    {destinations[0].altitude}
                  </span>
                </div>
                <h3 className="text-heading-3 text-white">
                  {destinations[0].name}
                </h3>
                <p className="text-sm text-white/85 max-w-xl line-clamp-2 leading-relaxed">
                  {destinations[0].description}
                </p>
                <div className="pt-2">
                  <a
                    href="#plan-your-trip"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#FDB716] group/link hover:text-white transition-colors"
                  >
                    <span>Explore Itinerary & Permits</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Side Editorial Stack (Annapurna & Upper Mustang) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {[destinations[1], destinations[2]].map((dest) => (
                <motion.div
                  key={dest.id}
                  variants={itemVariants}
                  className="flex-1 group relative overflow-hidden rounded-3xl bg-[#17212B] min-h-[250px] p-6 sm:p-8 flex flex-col justify-end"
                >
                  <Image
                    src={dest.imageUrl}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#17212B]/90 via-[#17212B]/30 to-transparent" />

                  <div className="relative z-10 flex flex-col gap-1.5">
                    <span className="text-[11px] uppercase tracking-widest text-[#92C4EA] font-semibold">
                      {dest.region} • {dest.altitude}
                    </span>
                    <h4 className="text-xl font-bold text-white font-serif">
                      {dest.name}
                    </h4>
                    <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                      {dest.shortDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Rotating Non-Featured Destinations Carousel */}
          <div
            className="pt-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Navigation Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-200/80">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#0552A2]/10 text-[#0552A2]">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isPaused ? 'bg-amber-500' : 'bg-[#0552A2] animate-pulse'
                    }`}
                  />
                  {isPaused ? 'Paused on Hover' : 'Auto-Rotating'}
                </span>
                <span className="text-xs text-[#4B5563] hidden sm:inline">
                  {rotatingPool.length} Destinations Available
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <div className="text-xs font-mono text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-full border border-zinc-200">
                  <span className="font-bold text-[#0552A2]">{carouselIndex + 1}</span>
                  <span className="text-zinc-400 mx-1">/</span>
                  <span>{rotatingPool.length}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPaused((p) => !p)}
                  title={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
                  aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
                  className="p-2 rounded-full border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors shadow-sm cursor-pointer"
                >
                  {isPaused ? (
                    <Play className="h-3.5 w-3.5 fill-current" />
                  ) : (
                    <Pause className="h-3.5 w-3.5 fill-current" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous destination"
                  className="p-2 rounded-full border border-zinc-300 bg-white hover:bg-[#0552A2] hover:text-white hover:border-[#0552A2] transition-colors shadow-sm cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next destination"
                  className="p-2 rounded-full border border-zinc-300 bg-white hover:bg-[#0552A2] hover:text-white hover:border-[#0552A2] transition-colors shadow-sm cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Rotating 4-Card Quad Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[420px]">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleDestinations.map((dest) => (
                  <motion.div
                    key={dest.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col rounded-3xl overflow-hidden bg-white border border-zinc-200 transition-all duration-300 hover:shadow-xl hover:border-[#0552A2]/40"
                  >
                    <div className="relative h-60 w-full overflow-hidden bg-[#17212B]">
                      <Image
                        src={dest.imageUrl}
                        alt={dest.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0552A2] shadow-sm">
                        {dest.region}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                      <div>
                        <span className="text-[11px] font-mono text-[#0552A2] font-semibold block mb-1">
                          {dest.altitude}
                        </span>
                        <h4 className="text-lg font-bold text-[#17212B] font-serif group-hover:text-[#0552A2] transition-colors line-clamp-1">
                          {dest.name}
                        </h4>
                        <p className="text-xs text-[#4B5563] mt-2 leading-relaxed line-clamp-3">
                          {dest.shortDescription}
                        </p>
                      </div>

                      <a
                        href="#plan-your-trip"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0552A2] group-hover:underline pt-2 border-t border-[#0552A2]/10"
                      >
                        <span>View Journey Details</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Interactive Progress Indicator Dots */}
            <div className="flex justify-center items-center gap-1.5 mt-8">
              {rotatingPool.map((dest, idx) => (
                <button
                  key={dest.id}
                  onClick={() => setCarouselIndex(idx)}
                  aria-label={`Jump to ${dest.name}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === carouselIndex
                      ? 'w-7 bg-[#0552A2]'
                      : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
