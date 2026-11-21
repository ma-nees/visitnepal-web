'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar, Landmark } from '@/components/ui/Icons';

interface HeritageSite {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  year: string;
  category: 'cultural' | 'natural';
}

const heritageSites: HeritageSite[] = [
  {
    id: 'kathmandu-durbar',
    name: 'Kathmandu Durbar Square',
    description: 'Ancient royal square with exquisite multi-tiered pagoda temples, courtyards, and the residence of the living goddess Kumari.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    location: 'Kathmandu Valley',
    year: '1979',
    category: 'cultural',
  },
  {
    id: 'boudhanath',
    name: 'Boudhanath Stupa',
    description: 'One of the largest spherical stupas in the world, radiating spiritual energy as pilgrims circumambulate under Buddha’s compassionate eyes.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    location: 'Kathmandu',
    year: '1979',
    category: 'cultural',
  },
  {
    id: 'bhaktapur-durbar',
    name: 'Bhaktapur Medieval Square',
    description: 'A preserved medieval capital famed for the 55-Window Palace, Golden Gate, and master potters spinning clay in open squares.',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop',
    location: 'Bhaktapur',
    year: '1979',
    category: 'cultural',
  },
  {
    id: 'lumbini',
    name: 'Lumbini Sacred Garden',
    description: 'The sacred birthplace of Lord Buddha, anchored by the ancient Maya Devi Temple, nativity marker stone, and the 3rd-century BC Ashoka Pillar.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    location: 'Rupandehi',
    year: '1997',
    category: 'cultural',
  },
];

const festivals = [
  {
    name: 'Dashain',
    month: 'September – October',
    theme: 'Victory of Good & Family Reunions',
    description: 'Nepal’s grandest national festival lasting 15 days — elder blessings with crimson tika, bamboo swings, and skies dotted with kites.',
  },
  {
    name: 'Tihar (Deepawali)',
    month: 'October – November',
    theme: 'Festival of Lights & Harmony',
    description: 'Five nights illuminating every doorway with clay butter lamps and marigold garlands, honoring animals, crows, cows, and brothers.',
  },
  {
    name: 'Holi',
    month: 'March (Spring Equinox)',
    theme: 'Festival of Colors & Renewal',
    description: 'Streets rejoice in explosions of vibrant powdered pigments, joyous folk music, and infectious warmth welcoming spring.',
  },
  {
    name: 'Indra Jatra',
    month: 'September',
    theme: 'Kathmandu Valley Processions',
    description: 'Masked Lakhey dancers, colossal wooden chariot processions, and public appearances of the living goddess Kumari in old Kathmandu.',
  },
];

export default function CultureSection() {
  return (
    <section
      id="culture"
      className="py-24 md:py-32 bg-[#F2F8FD] text-[#17212B] scroll-mt-12"
      aria-labelledby="culture-heading"
    >
      <div className="container">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
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

        {/* UNESCO Heritage Sites Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {heritageSites.map((site) => (
            <div
              key={site.id}
              className="group bg-white rounded-3xl overflow-hidden border border-[#0552A2]/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#17212B]">
                <Image
                  src={site.imageUrl}
                  alt={site.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#EC1F27] flex items-center gap-1">
                  <span>UNESCO {site.year}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-2.5 flex-1 justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#0552A2] font-semibold block mb-1">
                    {site.location}
                  </span>
                  <h3 className="text-lg font-bold font-serif text-[#17212B] group-hover:text-[#0552A2] transition-colors">
                    {site.name}
                  </h3>
                  <p className="text-xs text-[#4B5563] mt-2 leading-relaxed line-clamp-3">
                    {site.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Festivals Spotlight */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0552A2]/10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#0552A2] font-bold block mb-1">
                Calendar of Celebrations
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B]">
                Festivals That Define the Year
              </h3>
            </div>
            <p className="text-xs text-[#4B5563] max-w-sm">
              Each month brings vibrant cultural rhythms where communities unite across faiths and generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {festivals.map((f, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F2F8FD] border border-[#0552A2]/10 flex flex-col justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-[#0552A2] block mb-1">
                    {f.month}
                  </span>
                  <h4 className="text-lg font-bold font-serif text-[#17212B]">{f.name}</h4>
                  <span className="text-xs font-semibold text-[#EC1F27] block mb-2">{f.theme}</span>
                  <p className="text-xs text-[#4B5563] leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
