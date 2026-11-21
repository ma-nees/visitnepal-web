'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Compass, ShieldCheck, Clock, Mountain, Sparkles } from 'lucide-react';

interface Experience {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  category: string;
  highlights: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  duration: string;
}

const experiences: Experience[] = [
  {
    id: 'trekking',
    name: 'Trekking & Alpine Trails',
    subtitle: 'Footpaths Through the Heavens',
    description: 'Traverse timeless routes through blossoming rhododendron sanctuaries, colossal high-altitude passes, and hospitable Sherpa teahouse communities where kindness is sacred.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    category: 'Alpine Discovery',
    highlights: ['Everest Base Camp', 'Annapurna Circuit', 'Manaslu Wilderness', 'Langtang Sacred Valley'],
    difficulty: 'Moderate',
    duration: '5–18 days',
  },
  {
    id: 'mountaineering',
    name: 'Himalayan Mountaineering',
    subtitle: 'Summits Above the Clouds',
    description: 'Challenge the pinnacles of our planet alongside certified UIAGM/IFMGA Sherpa masters, equipped with state-of-the-art oxygen logistics and disciplined acclimatization.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    category: 'High Altitude',
    highlights: ['Ama Dablam (6,812m)', 'Island Peak (6,189m)', 'Mera Peak (6,476m)', 'Mt. Everest Summit'],
    difficulty: 'Extreme',
    duration: '14–60 days',
  },
  {
    id: 'cultural',
    name: 'Cultural Journeys',
    subtitle: 'Centuries of Living Heritage',
    description: 'Immerse your spirit in breathing ancient traditions — from Newari stone architecture and wood carving courtyards to sacred Vedic rituals along holy riverbanks.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    category: 'Heritage & Arts',
    highlights: ['Kathmandu Durbar Square', 'Bhaktapur Medieval Square', 'Patan Golden Temple', 'Panauti Heritage Walk'],
    difficulty: 'Easy',
    duration: '3–10 days',
  },
  {
    id: 'spiritual',
    name: 'Spiritual Retreats',
    subtitle: 'Sacred Silence & Meditation',
    description: 'Discover transcendent tranquility at the birthplace of Lord Buddha in Lumbini, meditate inside thousand-year-old cliff caves, and practice mindfulness with resident lamas.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    category: 'Spiritual Wellness',
    highlights: ['Lumbini Sacred Garden', 'Kopan Monastery', 'Namo Buddha Stupa', 'Pharping Guru Rinpoche Caves'],
    difficulty: 'Easy',
    duration: '3–14 days',
  },
  {
    id: 'wildlife',
    name: 'Subtropical Wildlife & Safari',
    subtitle: 'Realm of the Bengal Tiger',
    description: 'Track Greater One-horned Rhinoceros on guided foot safaris, navigate tranquil jungle rivers among marsh crocodiles, and spot Bengal tigers within pristine Terai national reserves.',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',
    category: 'Jungle & Safari',
    highlights: ['Chitwan National Park', 'Bardia Untamed Reserve', 'Koshi Tappu Wetlands', 'Dugout River Canoeing'],
    difficulty: 'Easy',
    duration: '3–7 days',
  },
  {
    id: 'adventure',
    name: 'High-Adrenaline Adventure',
    subtitle: 'Sky, Water & Gravity',
    description: 'Soar like a raptor on tandem paragliders above Phewa Lake, raft the tempestuous glacial rapids of the Bhote Koshi, or plunge from the world’s highest suspension bungee platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop',
    category: 'Extreme Adventure',
    highlights: ['Pokhara Paragliding', 'Trishuli & Sun Koshi Rafting', 'The Last Resort Bungee', 'Zip-Flyer Sarangkot'],
    difficulty: 'Moderate',
    duration: '1–5 days',
  },
  {
    id: 'food',
    name: 'Food & Culinary Traditions',
    subtitle: 'A Feast of Himalayan Spices',
    description: 'Master hand-pinched steamed momo alongside Newari home chefs, relish steaming plates of traditional organic dal bhat, and savor highland yak cheeses and salt-butter tea.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop',
    category: 'Gastronomy',
    highlights: ['Kathmandu Street Food Walks', 'Newari Culinary Masterclasses', 'Tea Plantation Tastings', 'Organic Homestay Dining'],
    difficulty: 'Easy',
    duration: '1–7 days',
  },
  {
    id: 'roadtrips',
    name: 'Scenic Himalayan Road Trips',
    subtitle: 'Crossroads of the Ancient Silk Roads',
    description: 'Traverse winding mountain highways carving deep gorges between dramatic peaks, from Kathmandu’s lush hill crests to the high arid plateaus of the Tibetan border.',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop',
    category: 'Overland Exploration',
    highlights: ['Prithvi Highway Odyssey', 'Upper Mustang 4x4 Trail', 'B.P. Koirala Highway', 'Rara Lake Off-Road Drive'],
    difficulty: 'Easy',
    duration: '3–10 days',
  },
];

export default function ExperiencesSection() {
  const [selectedExperience, setSelectedExperience] = useState<Experience>(experiences[0]);

  return (
    <section
      id="experiences"
      className="pt-4 sm:pt-6 pb-10 md:pb-14 bg-white scroll-mt-12 text-[#17212B]"
      aria-labelledby="experiences-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#FDB716]" />
            <span className="text-caption text-[#0552A2]">Curated Journeys</span>
          </div>
          <h2 id="experiences-heading" className="text-heading-2 text-[#17212B]">
            Ways to Experience Nepal
          </h2>
          <p className="text-body-lg text-[#4B5563] mt-3">
            Choose your personal calling — whether it leads to an 8,000m high-altitude pass, a silent monastery courtyard, or a tranquil jungle riverbank.
          </p>
        </div>

        {/* Master Showcase: Split Editorial Discovery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Experience Directory */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            {experiences.map((exp, index) => {
              const isSelected = selectedExperience.id === exp.id;
              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 flex items-center justify-between cursor-pointer border ${isSelected
                    ? 'bg-white border-[#0552A2] shadow-md -translate-x-1'
                    : 'bg-white/60 border-transparent hover:bg-white hover:border-[#0552A2]/20'
                    }`}
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-[#0552A2]">
                      0{index + 1} • {exp.category}
                    </span>
                    <span className={`text-base font-bold font-serif mt-0.5 ${isSelected ? 'text-[#0552A2]' : 'text-[#17212B]'}`}>
                      {exp.name}
                    </span>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${isSelected ? 'bg-[#0552A2] text-white' : 'bg-white border border-zinc-200 text-[#4B5563]'
                    }`}>
                    {exp.duration}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Hero Stage with Live Visual & Details */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExperience.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-[#0552A2]/15 shadow-xl flex flex-col gap-6"
              >
                {/* Visual Canvas */}
                <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#17212B]">
                  <Image
                    src={selectedExperience.imageUrl}
                    alt={selectedExperience.name}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#FDB716] font-bold block mb-1">
                        {selectedExperience.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                        {selectedExperience.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                      {selectedExperience.difficulty}
                    </span>
                  </div>
                </div>

                {/* Editorial Narrative */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm uppercase tracking-wider font-bold text-[#0552A2]">
                    {selectedExperience.subtitle}
                  </h4>
                  <p className="text-body text-[#4B5563] leading-relaxed">
                    {selectedExperience.description}
                  </p>

                  {/* Highlights Pills */}
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#17212B] block mb-2">
                      Key Itinerary Highlights:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-white border border-zinc-200 text-xs text-[#0552A2] font-semibold shadow-xs"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Plan this Experience */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs font-mono text-[#4B5563]">
                      Recommended season: <span className="font-bold text-[#17212B]">Autumn & Spring</span>
                    </div>

                    <a
                      href="#plan-your-trip"
                      className="btn-primary text-xs uppercase tracking-wider font-bold"
                    >
                      <span>Customize This Experience</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
