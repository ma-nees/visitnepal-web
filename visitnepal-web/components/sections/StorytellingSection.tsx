import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mountain, Landmark, Users } from 'lucide-react';

const storyMoments = [
  {
    id: 'himalayas',
    tag: 'Elevation & Solitude',
    title: 'The Great Himalayan Arc',
    text: 'Eight of the earth’s fourteen peaks crowning above 8,000 meters rise here. Ancient glaciers carve silent valleys where prayer flags flutter in thin, crystal air and mountains humble the human spirit.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    stat: '8,848 m',
    statLabel: 'Highest Point on Earth',
    Icon: Mountain,
  },
  {
    id: 'culture',
    tag: 'Living Antiquity',
    title: 'Sacred Architecture & Living Heritage',
    text: 'Seven UNESCO World Heritage sites clustered within a single valley. Centuries-old Newari artisans still chisel intricate peacock windows and cast bronze deities just as their forefathers did in medieval dynasties.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    stat: '1,500+',
    statLabel: 'Temples & Stupas',
    Icon: Landmark,
  },
  {
    id: 'hospitality',
    tag: 'Philosophy of Welcome',
    title: '"Atithi Devo Bhava" — The Guest is Divine',
    text: 'In every high-mountain teahouse and terraced valley homestay, hospitality is not an industry — it is an ancestral devotion. Strangers are welcomed with steaming cups of ginger-lemon tea and heartfelt Namastes.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    stat: '125+',
    statLabel: 'Ethnic Communities',
    Icon: Users,
  },
];

export default function StorytellingSection() {
  return (
    <section
      id="storytelling"
      className="pt-16 md:pt-20 pb-12 md:pb-16 bg-white text-[#17212B] scroll-mt-12"
      aria-labelledby="storytelling-heading"
    >
      <div className="container">
        {/* Editorial Magazine Opener */}
        <div className="max-w-3xl mb-20 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#EC1F27]" />
            <span className="text-caption text-[#0552A2]">The Nepal Spirit</span>
          </div>
          <h2 id="storytelling-heading" className="text-heading-2 text-[#17212B] text-balance">
            More Than a Destination.
            <br />
            <span className="text-[#0552A2] italic font-serif">A Feeling That Stays.</span>
          </h2>
          <p className="text-body-lg text-[#4B5563] mt-4 leading-relaxed">
            You do not simply visit Nepal; you enter a rhythm carved by glacial rivers, sacred dawn chants, towering monoliths, and the warm grace of its people.
          </p>
        </div>

        {/* Magazine-Spread Editorial Story Rows */}
        <div className="space-y-24">
          {storyMoments.map((moment, index) => {
            const isReversed = index % 2 === 1;
            const StatIcon = moment.Icon;
            return (
              <div
                key={moment.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''
                  }`}
              >
                {/* Visual Frame */}
                <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-[#17212B] shadow-lg group">
                    <Image
                      src={moment.imageUrl}
                      alt={moment.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Floating Statistic Card */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-[14px] px-3 py-2 border border-[#0552A2]/10 shadow-[0_6px_18px_-5px_rgba(15,42,74,0.16)] flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-[8px] bg-[#F2F8FD] border border-[#0552A2]/10 text-[#0552A2] flex items-center justify-center shrink-0">
                        <StatIcon className="h-3.5 w-3.5" strokeWidth={2} />
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm sm:text-base font-bold tracking-tight text-[#17212B] block leading-none">
                          {moment.stat}
                        </span>
                        <span className="text-[10px] font-medium text-[#64748B] block mt-0.5 leading-none">
                          {moment.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Editorial Copy Block */}
                <div className={`lg:col-span-5 flex flex-col gap-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#0552A2]">
                    {moment.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] leading-tight">
                    {moment.title}
                  </h3>
                  <div className="w-12 h-0.5 bg-[#FDB716]" />
                  <p className="text-body text-[#4B5563] leading-relaxed">
                    {moment.text}
                  </p>
                  <div className="pt-2">
                    <a
                      href="#experiences"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#0552A2] hover:text-[#EC1F27] transition-colors"
                    >
                      <span>Discover the Journey</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
