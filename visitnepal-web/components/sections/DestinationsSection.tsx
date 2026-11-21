'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { destinations, featuredDestinations, otherDestinations, Destination } from '@/lib/destinations';
import { ArrowUpRight, MapPin, Compass } from 'lucide-react';

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

  const filteredDestinations = destinations.filter(d => {
    if (activeTab === 'mountains') return ['everest', 'annapurna', 'mustang'].includes(d.id);
    if (activeTab === 'culture') return ['kathmandu', 'lumbini', 'mustang'].includes(d.id);
    if (activeTab === 'wildlife') return ['chitwan', 'pokhara'].includes(d.id);
    return true;
  });

  return (
    <section
      id="destinations"
      className="py-24 md:py-32 bg-white scroll-mt-12 text-[#17212B]"
      aria-labelledby="destinations-heading"
    >
      <div className="container">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#0552A2]/10 gap-6">
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
                  : 'bg-[#F2F8FD] text-[#17212B] hover:bg-[#0552A2]/10'
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
                priority
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

          {/* Bottom Quad Editorial Grid: Kathmandu, Pokhara, Chitwan, Lumbini */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.slice(3).map((dest) => (
              <motion.div
                key={dest.id}
                variants={itemVariants}
                className="group flex flex-col rounded-3xl overflow-hidden bg-[#F2F8FD] border border-[#0552A2]/10 transition-all duration-300 hover:shadow-lg hover:border-[#0552A2]/30"
              >
                <div className="relative h-60 w-full overflow-hidden bg-[#17212B]">
                  <Image
                    src={dest.imageUrl}
                    alt={dest.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0552A2]">
                    {dest.region}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <span className="text-[11px] font-mono text-[#0552A2] font-semibold block mb-1">
                      {dest.altitude}
                    </span>
                    <h4 className="text-lg font-bold text-[#17212B] font-serif group-hover:text-[#0552A2] transition-colors">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
