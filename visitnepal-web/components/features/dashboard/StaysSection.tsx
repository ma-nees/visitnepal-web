'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore, Stay } from '@/store/useTravelStore';
import {
  MapPin,
  Star,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Hotel,
  Car,
  Plane,
  CheckCircle2,
  X,
  Compass,
  ShieldCheck,
  Check
} from 'lucide-react';

interface StaysSectionProps {
  activeId: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Stays' },
  { id: 'Luxury', label: 'Luxury' },
  { id: 'Eco Resort', label: 'Eco Resort' },
  { id: 'Boutique Hotel', label: 'Boutique Hotel' },
  { id: 'Mountain Lodge', label: 'Mountain Lodge' },
  { id: 'Homestay', label: 'Heritage Homestay' },
];

const REGIONS = [
  { id: 'all', label: 'All Regions' },
  { id: 'Kathmandu', label: 'Kathmandu' },
  { id: 'Everest', label: 'Everest' },
  { id: 'Pokhara', label: 'Pokhara' },
  { id: 'Mustang', label: 'Mustang' },
  { id: 'Chitwan', label: 'Chitwan' },
  { id: 'Langtang', label: 'Langtang' },
];

export default function StaysSection({ activeId }: StaysSectionProps) {
  const { stays, addBooking } = useTravelStore();
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const containerVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.05 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  // Filter stays based on category, region, and search query
  const filteredStays = useMemo(() => {
    return stays.filter((stay) => {
      const matchesCategory = selectedCategory === 'all' || stay.type === selectedCategory;
      const matchesRegion = 
        selectedRegion === 'all' || 
        stay.location.toLowerCase().includes(selectedRegion.toLowerCase());
      const matchesSearch = 
        !searchQuery.trim() ||
        stay.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
        stay.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesRegion && matchesSearch;
    });
  }, [stays, selectedCategory, selectedRegion, searchQuery]);

  const handleBook = (stay: Stay, roomName: string, price: number) => {
    const invNo = `INV-STAY-${Math.floor(1000 + Math.random() * 9000)}`;
    addBooking({
      id: `b-stay-${Date.now()}`,
      type: 'Hotel',
      title: `${stay.name} - ${roomName}`,
      date: 'June 05 - June 10, 2026',
      details: `Guest check-in: 2 Adults. Preserved room preferences locked.`,
      cost: price * 5, // 5 nights
      status: 'Confirmed',
      invoiceNo: invNo
    });

    setBookingSuccess(roomName);
    setTimeout(() => {
      setBookingSuccess(null);
      setSelectedStay(null);
    }, 2000);
  };

  return (
    <motion.div 
      key={activeId}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full text-left"
    >
      {/* ── HOTELS & LODGING DIRECTORIES ────────────────────────────────── */}
      {activeId !== 'transportation' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-2">
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase bg-[#0552A2]/10 px-2.5 py-0.5 rounded-full">
                Boutique Lodging & Mountain Havens
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">
              Hotels & Eco-Stays
            </h2>
            <p className="text-xs text-[#475569]">
              Book certified Himalayan stays equipped with heated hearths, local organic dining, oxygen facilities, and panoramic mountain views.
            </p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by hotel name, location, or amenities..."
                  className="w-full bg-white border border-slate-200/90 rounded-full pl-10 pr-9 py-2 text-xs text-[#17212B] placeholder:text-slate-400 focus:outline-none focus:border-[#0552A2] shadow-2xs transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Counter / Info */}
              <span className="text-[11px] font-mono text-[#64748B] shrink-0 self-center sm:self-auto">
                Showing <strong className="text-[#0552A2]">{filteredStays.length}</strong> verified properties
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-[11px] font-mono px-3 py-1 rounded-full border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0552A2] text-white border-[#0552A2] shadow-2xs font-bold'
                        : 'bg-white text-[#475569] border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Region Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold mr-1">Region:</span>
              {REGIONS.map((reg) => {
                const isActive = selectedRegion === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => setSelectedRegion(reg.id)}
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0552A2]/10 text-[#0552A2] border-[#0552A2] font-bold'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {reg.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Responsive Auto-Fill Grid (3+ Columns on larger viewports, automatically adjusting) */}
          <motion.div
            layout="position"
            className="grid gap-5 auto-card-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
          >
            {filteredStays.map((stay, index) => (
              <motion.div
                key={stay.id}
                layout="position"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.28, delay: index * 0.03 },
                  y: { duration: 0.28, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }
                }}
                onClick={() => setSelectedStay(stay)}
                className="group bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:border-[#0552A2]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xs cursor-pointer active:scale-[0.985] flex flex-col justify-between transform-gpu will-change-transform"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-36 sm:h-40 overflow-hidden bg-slate-900">
                    <img
                      src={stay.image}
                      alt={stay.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu will-change-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] font-mono font-bold text-[#0552A2] px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{stay.rating.toFixed(1)}</span>
                    </div>

                    <div className="absolute top-3 right-3 bg-[#0552A2] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                      {stay.type}
                    </div>

                    {/* Bottom Location */}
                    <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white/90 font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#92C4EA]" />
                      <span className="line-clamp-1">{stay.location}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex flex-col gap-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-[#17212B] group-hover:text-[#0552A2] transition-colors leading-snug line-clamp-1">
                      {stay.name}
                    </h3>
                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
                      {stay.description}
                    </p>

                    {/* Feature Chips */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {stay.features.slice(0, 2).map((f, idx) => (
                        <span key={idx} className="text-[9px] font-mono text-[#475569] bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md line-clamp-1">
                          • {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Divider */}
                <div className="px-4 pb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] font-mono text-[#64748B] block uppercase">Starting From</span>
                    <span className="font-mono font-bold text-[#0552A2] text-xs">
                      ${stay.price} <span className="text-[10px] font-normal text-[#64748B]">/ night</span>
                    </span>
                  </div>
                  <button
                    type="button"
                    className="font-bold text-[#0552A2] group-hover:underline flex items-center gap-1.5 cursor-pointer text-xs font-mono"
                  >
                    <span>View Suites</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200 ease-out" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredStays.length === 0 && (
            <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-2">
              <Hotel className="w-8 h-8 text-slate-400" />
              <h4 className="text-sm font-bold text-[#17212B]">No properties matched your criteria</h4>
              <p className="text-xs text-[#64748B]">Try clearing your search query or selecting a different category or region filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedRegion('all'); }}
                className="mt-2 text-xs font-mono font-bold text-[#0552A2] hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── TRANSPORTATION VIEW ────────────────────────────────────────── */}
      {activeId === 'transportation' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-2">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase bg-[#0552A2]/10 px-2.5 py-0.5 rounded-full w-fit">
              Himalayan Transit Systems
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">Himalayan Transportation</h2>
            <p className="text-xs text-[#475569]">Airport shuttles, high-speed charter flights, cable ropeways, and private rugged 4x4 overland vehicles.</p>
          </motion.div>

          <motion.div
            layout="position"
            className="grid gap-5 auto-card-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
          >
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between gap-3 shadow-xs hover:border-[#0552A2]/50 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase bg-[#0552A2]/10 px-2 py-0.5 rounded-md">
                    Premium Aerial
                  </span>
                  <Plane className="w-4 h-4 text-[#0552A2]" />
                </div>
                <h3 className="text-sm font-bold text-[#17212B]">Helicopter Summit Charter</h3>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">Direct peak-to-peak transfer bypassing multi-day trails. Popular for Everest Base Camp and Langtang loops.</p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0552A2]">$1,200 <span className="text-[10px] font-normal text-slate-500">/ flight leg</span></span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Available Daily</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between gap-3 shadow-xs hover:border-[#0552A2]/50 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase bg-[#0552A2]/10 px-2 py-0.5 rounded-md">
                    Overland Rugged
                  </span>
                  <Car className="w-4 h-4 text-[#0552A2]" />
                </div>
                <h3 className="text-sm font-bold text-[#17212B]">Private 4x4 Mountain Jeep</h3>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">Cross rugged canyon roads to Lo Manthang, Muktinath, or Pokhara in high-ground clearance expedition jeeps.</p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0552A2]">$180 <span className="text-[10px] font-normal text-slate-500">/ day (with driver)</span></span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Includes Fuel</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between gap-3 shadow-xs hover:border-[#0552A2]/50 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase bg-[#0552A2]/10 px-2 py-0.5 rounded-md">
                    Domestic Aviation
                  </span>
                  <Plane className="w-4 h-4 text-[#0552A2]" />
                </div>
                <h3 className="text-sm font-bold text-[#17212B]">Turboprop Mountain Flights</h3>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">Scenic twin-engine flights connecting Kathmandu to Pokhara, Lukla, or Jomsom high-altitude airstrips.</p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0552A2]">$150 <span className="text-[10px] font-normal text-slate-500">/ traveler</span></span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">15kg Baggage</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between gap-3 shadow-xs hover:border-[#0552A2]/50 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase bg-[#0552A2]/10 px-2 py-0.5 rounded-md">
                    Scenic Ropeway
                  </span>
                  <Compass className="w-4 h-4 text-[#0552A2]" />
                </div>
                <h3 className="text-sm font-bold text-[#17212B]">Chandragiri & Sarangkot Cable Car</h3>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">Gliding gondolas ascending over subtropical pine forests for panoramic Himalayan views over Kathmandu & Pokhara.</p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0552A2]">$24 <span className="text-[10px] font-normal text-slate-500">/ round-trip</span></span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Express Entry</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between gap-3 shadow-xs hover:border-[#0552A2]/50 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase bg-[#0552A2]/10 px-2 py-0.5 rounded-md">
                    Trail Porter Support
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#0552A2]" />
                </div>
                <h3 className="text-sm font-bold text-[#17212B]">Certified Sherpa Porter Services</h3>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">Licensed and insured high-altitude porters adhering to strict ethical 20kg weight standards and welfare protocols.</p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0552A2]">$25 <span className="text-[10px] font-normal text-slate-500">/ day</span></span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">IPPG Compliant</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 flex flex-col justify-between gap-3 shadow-xs hover:border-[#0552A2]/50 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase bg-[#0552A2]/10 px-2 py-0.5 rounded-md">
                    VIP Arrival
                  </span>
                  <Car className="w-4 h-4 text-[#0552A2]" />
                </div>
                <h3 className="text-sm font-bold text-[#17212B]">Kathmandu Airport Express Transfer</h3>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">Air-conditioned hybrid sedan transfer directly from Tribhuvan International Airport to your hotel with cold towels.</p>
              </div>
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#0552A2]">$35 <span className="text-[10px] font-normal text-slate-500">/ transfer</span></span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Meet & Greet</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── ROOM SELECTION MODAL OVERLAY ─────────────────────────────────── */}
      <AnimatePresence>
        {selectedStay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-xs">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl relative text-left"
            >
              <button 
                onClick={() => setSelectedStay(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold text-[#0552A2] uppercase bg-[#0552A2]/10 px-2 py-0.5 rounded-md">
                  {selectedStay.type}
                </span>
                <span className="text-[10px] font-mono text-amber-600 font-bold flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {selectedStay.rating.toFixed(1)} Rating
                </span>
              </div>

              <h3 className="text-xl font-black text-[#17212B] tracking-tight">{selectedStay.name}</h3>
              <p className="text-xs font-mono text-[#64748B] flex items-center gap-1 mt-1 mb-4">
                <MapPin className="w-3.5 h-3.5 text-[#0552A2]" />
                {selectedStay.location}
              </p>

              {/* Stay Highlights */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selectedStay.features.map((feat, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-0.5 rounded-md">
                    ✓ {feat}
                  </span>
                ))}
              </div>

              {/* Room Previews */}
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0552A2]">
                  Select Available Suite Options
                </span>
                {selectedStay.roomPreviews.map((room) => (
                  <div key={room.name} className="bg-slate-50/70 border border-slate-200/90 p-4 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-[#17212B]">{room.name}</h4>
                      <p className="text-[11px] text-[#475569] mt-0.5 leading-relaxed">{room.info}</p>
                    </div>
                    <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0">
                      <span className="text-xs font-mono font-bold text-[#0552A2]">${room.price} <span className="text-[10px] font-normal text-slate-500">/ night</span></span>
                      <button 
                        onClick={() => handleBook(selectedStay, room.name, room.price)}
                        className="bg-[#0552A2] hover:bg-[#044080] text-white font-mono text-[10px] font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      >
                        <span>Book Suite</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {bookingSuccess && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-white/95 rounded-3xl flex flex-col items-center justify-center text-center p-6 backdrop-blur-2xs"
                >
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-base font-black text-[#17212B]">Suite Reserved Successfully!</h4>
                  <p className="text-xs text-[#475569] mt-1 max-w-xs leading-relaxed">
                    Reserved <span className="font-bold text-[#0552A2]">{bookingSuccess}</span>. Your invoice and guest confirmation pass have been added to your Bookings tab.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
