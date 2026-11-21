'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar, Landmark, MapPin, Clock, Compass, CheckCircle2 } from 'lucide-react';

interface HeritageSite {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  year: string;
  significance: string;
}

const heritageSites: HeritageSite[] = [
  {
    id: 'kathmandu-durbar',
    name: 'Kathmandu Durbar Square',
    description: 'Ancient royal square of the Malla kings, anchored by multi-tiered pagoda temples, carved cedar courtyards, and the sacred Kumari Ghar — residence of the living goddess.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    location: 'Kathmandu Valley',
    year: '1979',
    significance: 'Seat of Malla Dynasties & Living Goddess Kumari',
  },
  {
    id: 'boudhanath',
    name: 'Boudhanath Stupa',
    description: 'One of the largest spherical stupas in the world, radiating spiritual energy as thousands of Buddhist pilgrims circumambulate beneath Buddha’s all-seeing compassionate eyes.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    location: 'Kathmandu',
    year: '1979',
    significance: 'Spiritual Center of Himalayan Buddhism',
  },
  {
    id: 'bhaktapur-durbar',
    name: 'Bhaktapur Medieval Square',
    description: 'The best-preserved medieval city-state in the Himalayas, celebrated for the 55-Window Palace, the towering Nyatapola Temple, and open pottery squares where clay is shaped as it was 600 years ago.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    location: 'Bhaktapur',
    year: '1979',
    significance: 'UNESCO City of Culture & Master Woodcarvers',
  },
  {
    id: 'lumbini',
    name: 'Lumbini Sacred Garden',
    description: 'The holy birthplace of Siddhartha Gautama (Lord Buddha), centered on the ancient Maya Devi Temple, the 3rd-century BC Ashoka Pillar, and serene monastic zones from 30+ nations.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    location: 'Rupandehi',
    year: '1997',
    significance: 'Sacred Cradle of Buddhism & World Peace',
  },
];

interface Festival {
  id: string;
  name: string;
  nepaliName: string;
  season: string;
  month: string;
  duration: string;
  theme: string;
  description: string;
  rituals: string[];
  location: string;
  imageUrl: string;
  quote: string;
}

const festivals: Festival[] = [
  {
    id: 'dashain',
    name: 'Dashain',
    nepaliName: 'दशैं (बडादशैं)',
    season: 'Autumn Harvest',
    month: 'September – October',
    duration: '15 Days',
    theme: 'Victory of Good & The Great Himalayan Homecoming',
    description: 'Nepal’s grandest national celebration. Across every hillside village and city courtyard, skies fill with handcrafted bamboo kites, 40-foot giant bamboo swings (Ping) soar over lush ridges, and families reunite across mountain valleys for elder blessings with crimson vermilion tika and golden barley jamara.',
    rituals: [
      'Elder blessings with crimson tika & jamara',
      'Village-built 40ft bamboo swings (Ping)',
      'Handcrafted kite flying across blue autumn skies',
      'Feasts of spiced goat curry & beaten rice',
    ],
    location: 'Nationwide — across every mountain village & city',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    quote: 'The return of family, blessings of elders, and laughter on hilltop swings under crystal autumn skies.',
  },
  {
    id: 'tihar',
    name: 'Tihar (Deepawali)',
    nepaliName: 'तिहार (यमपञ्चक)',
    season: 'Autumn Lights',
    month: 'October – November',
    duration: '5 Days',
    theme: 'Festival of Lights, Harmony & Sacred Animal Reverence',
    description: 'Five magical nights illuminating every doorway with clay butter lamps, rangoli mandalas, and marigold garlands. Communities honor crows, dogs, and sacred cows before sisters bless their brothers with seven-colored tika (Bhai Tika) in an enduring devotion to mutual protection.',
    rituals: [
      'Clay diyo oil lamps & glowing doorway rangolis',
      'Kukur Tihar: honoring dogs with garlands & treats',
      'Laxmi Puja: inviting goddess of prosperity into homes',
      'Bhai Tika: seven-colored sibling blessings',
    ],
    location: 'Kathmandu Valley, Patan & Mountain Homestays',
    imageUrl: 'https://images.unsplash.com/photo-1508672019048-805b876b67e2?q=80&w=1200&auto=format&fit=crop',
    quote: 'Golden warmth spilling from every carved window, welcoming light into homes illuminated by faith.',
  },
  {
    id: 'holi',
    name: 'Holi (Fagu Purnima)',
    nepaliName: 'होली (फागु पूर्णिमा)',
    season: 'Spring Equinox',
    month: 'March (Spring Equinox)',
    duration: '2 Days',
    theme: 'Festival of Colors, Folk Rhythms & Vernal Awakening',
    description: 'Ancient streets and historic squares erupt into jubilant celebrations of vibrant powdered crimson, saffron, and turquoise pigments. Strangers embrace with genuine smiles, sweet lassi and gujiya are shared freely, and traditional Newari Dhimay drummers turn courtyards into open-air dance parties.',
    rituals: [
      'Explosions of organic herbal powdered pigments',
      'Newari Dhimay folk drumming in historic squares',
      'Spontaneous street dancing and community bonfires',
      'Sharing spiced lassi and traditional sweets',
    ],
    location: 'Basantapur Durbar, Pokhara Lakeside & Terai Plains',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    quote: 'A sea of crimson, gold, and sky-blue washing away divisions as spring breathes life into the Himalayas.',
  },
  {
    id: 'indra-jatra',
    name: 'Indra Jatra (Yenya)',
    nepaliName: 'इन्द्रजात्रा (येँयाः)',
    season: 'Monsoon Harvest',
    month: 'September',
    duration: '8 Days',
    theme: 'Masked Lakhey Dances & Living Goddess Processions',
    description: 'Eight days of hypnotic carnival energy in historic Kathmandu honoring Indra, King of Heaven. Enormous multi-story wooden chariots bearing the living goddess Kumari glide through candlelit brick alleys while masked Lakhey demons dance under torchlight to the pounding of thunderous drums.',
    rituals: [
      'Chariot procession of the Living Goddess Kumari',
      'Fierce masked Lakhey dances under torchlight',
      'Erection of the sacred Linga pole at Durbar Square',
      'Distribution of blessed liquor from Sweta Bhairab mask',
    ],
    location: 'Historic Old Kathmandu Durbar Square',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    quote: 'Hypnotic drums echo off centuries-old bricks as the Living Goddess blesses an ocean of reverent devotees.',
  },
];

export default function CultureSection() {
  const [selectedSite, setSelectedSite] = useState<HeritageSite>(heritageSites[0]);
  const [activeFestival, setActiveFestival] = useState<Festival>(festivals[0]);

  return (
    <section
      id="culture"
      className="pt-8 md:pt-12 pb-12 md:pb-16 bg-white text-[#17212B] scroll-mt-12"
      aria-labelledby="culture-heading"
    >
      <div className="container">
        {/* Section Heading */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#EC1F27]" />
            <span className="text-caption text-[#0552A2]">Living Antiquity</span>
          </div>
          <h2 id="culture-heading" className="text-heading-2 text-[#17212B]">
            Living Heritage, Breathing Tradition
          </h2>
          <p className="text-body-lg text-[#4B5563] mt-3">
            Traditions in Nepal are not locked behind museum glass — they are practiced every day in courtyard rituals, temple offerings, and sacred festivals.
          </p>
        </div>

        {/* =========================================================================
            PART 1: UNESCO WORLD HERITAGE — ASYMMETRICAL EDITORIAL GALLERY
            Replaces repetitive 4-card grid with a lead showcase + curated list
        ========================================================================= */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#0552A2]/10">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#0552A2] block mb-1">
                Sacred Monuments
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold font-serif text-[#17212B] tracking-tight">
                UNESCO World Heritage Sanctuaries
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-[#4B5563]">
              7 Clustered Sites in One Valley
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Lead Feature (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-3xl overflow-hidden bg-[#17212B] shadow-lg group">
                <Image
                  src={selectedSite.imageUrl}
                  alt={selectedSite.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Badges */}
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <span className="bg-white px-3.5 py-1.5 rounded-[14px] text-xs font-semibold tracking-wide text-[#0552A2] border border-[#0552A2]/10 shadow-[0_4px_14px_-2px_rgba(15,42,74,0.12)]">
                    UNESCO Inscribed {selectedSite.year}
                  </span>
                  <span className="bg-[#0552A2] px-3.5 py-1.5 rounded-[14px] text-xs font-semibold text-white shadow-[0_4px_14px_-2px_rgba(5,82,162,0.25)]">
                    {selectedSite.location}
                  </span>
                </div>

                {/* Bottom Narrative Overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold text-[#FDB716] tracking-wider uppercase block mb-1">
                    {selectedSite.significance}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-bold font-serif mb-2 text-white">
                    {selectedSite.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-200 line-clamp-3 leading-relaxed max-w-2xl">
                    {selectedSite.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Curated Site Selector (5 cols) — Editorial interactive stack */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#4B5563] mb-1">
                Explore Recognized Sites:
              </span>
              {heritageSites.map((site) => {
                const isSelected = selectedSite.id === site.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => setSelectedSite(site)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 cursor-pointer border ${isSelected
                      ? 'bg-white border-[#0552A2] shadow-md -translate-x-1'
                      : 'bg-white/60 border-zinc-200 hover:border-[#0552A2]/40 hover:bg-white'
                      }`}
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-zinc-200">
                      <Image
                        src={site.imageUrl}
                        alt={site.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase font-mono font-bold text-[#0552A2]">
                          {site.location}
                        </span>
                        <span className="text-[10px] font-mono text-gray-400">
                          {site.year}
                        </span>
                      </div>
                      <h5 className={`text-base font-bold font-serif truncate ${isSelected ? 'text-[#0552A2]' : 'text-[#17212B]'}`}>
                        {site.name}
                      </h5>
                      <p className="text-xs text-[#4B5563] truncate mt-0.5">
                        {site.significance}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            PART 2: FESTIVALS THAT DEFINE THE YEAR — INTERACTIVE SEASONAL STAGE
            Completely replaces the boxed 4-card grid with an art-directed showcase
        ========================================================================= */}
        <div className="pt-10 border-t border-[#0552A2]/10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-[#EC1F27]" />
                <span className="text-xs uppercase tracking-widest text-[#0552A2] font-bold">
                  Living Seasonal Calendar
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold font-serif text-[#17212B] tracking-tight">
                Festivals That Define the Year
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5563] max-w-md">
              Each season brings a distinct spiritual pulse where generations unite in song, sacred tika blessings, and exuberant street processions.
            </p>
          </div>

          {/* Interactive Seasonal Timeline Selector (No generic cards!) */}
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-zinc-100">
            {festivals.map((fest) => {
              const isActive = activeFestival.id === fest.id;
              return (
                <button
                  key={fest.id}
                  onClick={() => setActiveFestival(fest)}
                  className={`group px-5 py-3 rounded-2xl transition-all duration-300 text-left cursor-pointer flex items-center gap-3 border ${isActive
                    ? 'bg-[#0552A2] text-white border-[#0552A2] shadow-md'
                    : 'bg-white border-zinc-200 text-[#17212B] hover:border-[#0552A2]/40'
                    }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 transition-colors ${isActive ? 'bg-[#FDB716]' : 'bg-zinc-300 group-hover:bg-[#0552A2]'
                    }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold font-serif leading-none ${isActive ? 'text-white' : 'text-[#17212B]'}`}>
                        {fest.name}
                      </span>
                      <span className={`text-[10px] font-mono ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        {fest.month.split('–')[0].trim()}
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-0.5 ${isActive ? 'text-blue-100' : 'text-[#4B5563]'}`}>
                      {fest.season}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Featured Festival Showcase Stage (Editorial 2-Column Split) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFestival.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Festival Narrative & Cultural Immersion */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#EC1F27]/10 text-[#EC1F27] text-xs font-bold uppercase tracking-wider font-mono">
                      {activeFestival.season} • {activeFestival.month}
                    </span>
                    <span className="text-xs font-mono text-[#0552A2] font-semibold">
                      {activeFestival.duration} Celebration
                    </span>
                  </div>

                  <h4 className="text-3xl sm:text-4xl font-bold font-serif text-[#17212B]">
                    {activeFestival.name}
                    <span className="block text-sm font-normal font-sans text-gray-500 mt-1">
                      {activeFestival.nepaliName}
                    </span>
                  </h4>

                  <p className="text-sm font-bold text-[#EC1F27] uppercase tracking-wider mt-2">
                    {activeFestival.theme}
                  </p>
                </div>

                <p className="text-body text-[#4B5563] leading-relaxed">
                  {activeFestival.description}
                </p>

                {/* Cultural Quote Callout */}
                <div className="p-5 rounded-2xl bg-zinc-50/70 border-l-4 border-[#0552A2] text-sm italic font-serif text-[#17212B]">
                  “{activeFestival.quote}”
                </div>

                {/* Ritual Highlights */}
                <div>
                  <span className="text-xs uppercase font-mono tracking-wider font-bold text-[#17212B] block mb-3">
                    Sacred Rituals & Experiences:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeFestival.rituals.map((ritual, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-[#17212B] font-medium p-2.5 rounded-xl bg-white border border-zinc-200"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#0552A2] shrink-0" />
                        <span>{ritual}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Footer */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-[#4B5563]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-[#0552A2]" />
                    <span>Best witnessed in: <strong className="text-[#17212B]">{activeFestival.location}</strong></span>
                  </div>

                  <a
                    href="#plan-your-trip"
                    className="inline-flex items-center gap-1 font-bold text-[#0552A2] hover:underline"
                  >
                    <span>Plan Around This Festival</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Stage with Festival Atmosphere */}
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[1/1] rounded-3xl overflow-hidden bg-[#17212B] shadow-xl">
                  <Image
                    src={activeFestival.imageUrl}
                    alt={activeFestival.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[11px] font-mono tracking-wider uppercase text-[#FDB716] font-bold block mb-1">
                      Cultural Essence
                    </span>
                    <h5 className="text-xl font-bold font-serif text-white mb-1">
                      {activeFestival.name}
                    </h5>
                    <p className="text-xs text-white/80">
                      {activeFestival.theme}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
