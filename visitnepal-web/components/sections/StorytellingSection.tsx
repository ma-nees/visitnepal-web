import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mountain, Landmark, Users } from "lucide-react";

const storyMoments = [
  {
    id: "himalayas",
    title: "The Great Himalayan Arc",
    text: "Eight of the earth’s fourteen peaks crowning above 8,000 meters rise here. Ancient glaciers carve silent valleys where prayer flags flutter in thin, crystal air and mountains humble the human spirit.",
    imageUrl:
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop",
    stat: "8,848 m",
    statLabel: "Highest Point on Earth",
    Icon: Mountain,
  },
  {
    id: "culture",
    title: "Sacred Architecture & Living Heritage",
    text: "Seven UNESCO World Heritage sites clustered within a single valley. Centuries-old Newari artisans still chisel intricate peacock windows and cast bronze deities just as their forefathers did in medieval dynasties.",
    imageUrl:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
    stat: "1,500+",
    statLabel: "Temples & Stupas",
    Icon: Landmark,
  },
  {
    id: "hospitality",
    title: '"Atithi Devo Bhava": The Guest is Divine',
    text: "In every high-mountain teahouse and terraced valley homestay, hospitality is not an industry, it is an ancestral devotion. Strangers are welcomed with steaming cups of ginger-lemon tea and heartfelt Namastes.",
    imageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    stat: "125+",
    statLabel: "Ethnic Communities",
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
          <h2
            id="storytelling-heading"
            className="text-heading-2 text-[#17212B] text-balance"
          >
            More Than a Destination.
            <br />
            <span className="text-[#0552A2] italic font-serif">
              A Feeling That Stays.
            </span>
          </h2>
          <p className="text-body-lg text-[#4B5563] mt-4 leading-relaxed">
            You do not simply visit Nepal; you enter a rhythm carved by glacial
            rivers, sacred dawn chants, towering monoliths, and the warm grace
            of its people.
          </p>
        </div>

        {/* Magazine-Spread Editorial Story Rows */}
        <div className="space-y-20 lg:space-y-28">
          {storyMoments.map((moment, index) => {
            const isReversed = index % 2 === 1;
            const StatIcon = moment.Icon;
            return (
              <div
                key={moment.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Visual Frame */}
                <div
                  className={`lg:col-span-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#17212B] shadow-[0_14px_40px_-12px_rgba(15,42,74,0.22)] group">
                    <Image
                      src={moment.imageUrl}
                      alt={moment.title}
                      fill
                      loading="lazy"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                    {/* Floating Statistic Card */}
                    <div className="absolute bottom-4 left-4 bg-white rounded-md px-3 py-2 border border-[#0552A2]/10 shadow-[0_6px_18px_-5px_rgba(15,42,74,0.16)] flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-sm bg-[#F2F8FD] border border-[#0552A2]/10 text-[#0552A2] flex items-center justify-center shrink-0">
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
                <div
                  className={`lg:col-span-6 flex flex-col gap-5 ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                >
                  <h3 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-serif text-[#17212B] leading-[1.12] tracking-tight">
                    {moment.title}
                  </h3>

                  <div className="w-14 h-1 rounded-full bg-[#FDB716]" />

                  <p className="text-base sm:text-[17px] text-[#475569] leading-relaxed">
                    {moment.text}
                  </p>

                  <div className="pt-1">
                    <a
                      href="#experiences"
                      className="relative inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.14em] font-bold text-[#0552A2] hover:text-[#043e7b] pb-1 transition-colors w-fit cursor-pointer group/cta"
                    >
                      <span>Discover the Journey</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/cta:translate-x-0.5" />
                      <span
                        className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#0552A2] group-hover/cta:w-full transition-all duration-500 ease-out"
                        aria-hidden="true"
                      />
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
