'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore } from '@/store/useTravelStore';
import {
  Compass,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  SlidersHorizontal,
  Hotel,
  Mountain,
  Plane,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  Heart,
  FileText,
  UserCheck,
  Sun,
  CloudSun,
  Wind,
  Check,
  X
} from 'lucide-react';
import {
  UpcomingTrip,
  UPCOMING_TRIPS,
  DraftTrip,
  DRAFT_TRIPS,
  RecommendedDestination,
  RECOMMENDED_DESTINATIONS,
  BookingItem,
  RECENT_BOOKINGS,
  ActivityLogItem,
  RECENT_ACTIVITY_LOG,
  WishlistItem,
  INITIAL_WISHLIST,
} from './mockDashboardData';

interface DashboardHomeProps {
  onNavigate?: (id: string) => void;
}

export default function DashboardHome({ onNavigate }: DashboardHomeProps) {
  const currentUser = useTravelStore((state) => state.currentUser);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(INITIAL_WISHLIST);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeRecCategory, setActiveRecCategory] = useState<string>('All');
  const [activeTripFilter, setActiveTripFilter] = useState<'All' | 'Alpine' | 'Scenic' | 'Safari'>('All');
  const [bookingFilter, setBookingFilter] = useState<'All' | 'Confirmed' | 'Upcoming' | 'Pending'>('All');
  const [showAllBookings, setShowAllBookings] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showAllDrafts, setShowAllDrafts] = useState(false);

  // Personalized Greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const userName = currentUser?.name?.split(' ')[0] || 'Traveler';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((w) => w.id === item.id);
      if (exists) {
        showToast(`Removed ${item.name} from your Wishlist`);
        return prev.filter((w) => w.id !== item.id);
      } else {
        showToast(`Saved ${item.name} to your Wishlist ✨`);
        return [...prev, item];
      }
    });
  };

  const handleDestinationClick = (slug: string) => {
    if (onNavigate) {
      onNavigate(slug);
    }
  };

  const filteredUpcomingTrips = useMemo(() => {
    if (activeTripFilter === 'All') return UPCOMING_TRIPS;
    return UPCOMING_TRIPS.filter((t) => t.category === activeTripFilter);
  }, [activeTripFilter]);

  const filteredRecommendations = useMemo(() => {
    if (activeRecCategory === 'All') return RECOMMENDED_DESTINATIONS;
    return RECOMMENDED_DESTINATIONS.filter((r) => r.category === activeRecCategory);
  }, [activeRecCategory]);

  const filteredBookings = useMemo(() => {
    if (bookingFilter === 'All') return RECENT_BOOKINGS;
    return RECENT_BOOKINGS.filter((b) => b.status === bookingFilter);
  }, [bookingFilter]);

  const displayedBookings = showAllBookings ? filteredBookings : filteredBookings.slice(0, 4);
  const displayedDrafts = showAllDrafts ? DRAFT_TRIPS : DRAFT_TRIPS.slice(0, 3);
  const displayedActivity = showAllActivity ? RECENT_ACTIVITY_LOG : RECENT_ACTIVITY_LOG.slice(0, 5);

  return (
    <div className="w-full space-y-8 pb-16 text-left">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-[#0552A2] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20"
          >
            <CheckCircle2 className="h-4 w-4 text-[#FDB716]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SECTION 1: DASHBOARD WELCOME & CONTEXTUAL TELEMETRY BANNER
      ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-zinc-200/80 shadow-xs p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Personalized Greeting & Primary CTAs */}
          <div className="flex items-start gap-5">
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden shrink-0 border-2 border-[#0552A2]/20 shadow-sm">
              <Image
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'}
                alt={userName}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                <span className="text-xs font-bold text-[#0552A2] uppercase tracking-wider font-mono">
                  Visit Nepal Personal Portal
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200/60">
                  Passport US98127398 Verified
                </span>
                <span className="text-[11px] font-mono text-[#0552A2] bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold border border-blue-200/60">
                  Tier: Explorer Gold
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] tracking-tight">
                {greeting}, {userName}.
              </h1>
              <p className="text-sm text-[#4B5563] mt-1 max-w-lg leading-relaxed">
                Your next Himalayan journey begins here. You have <strong className="text-[#0552A2]">{UPCOMING_TRIPS.length} confirmed expeditions</strong> lined up across Nepal.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mt-4 flex-wrap">
                <button
                  onClick={() => onNavigate?.('customize')}
                  className="px-5 py-2.5 rounded-full bg-[#0552A2] text-white text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:bg-[#043e7b] hover:shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Plan a New Trip</span>
                </button>

                <button
                  onClick={() => onNavigate?.('explore')}
                  className="px-5 py-2.5 rounded-full bg-white border border-zinc-200 text-[#17212B] text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:border-[#0552A2] hover:text-[#0552A2] flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Explore Destinations</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Contextual Travel Telemetry Card */}
          <div className="lg:w-80 shrink-0 bg-zinc-50/80 rounded-2xl p-4 border border-zinc-200/80 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#0552A2] flex items-center gap-1.5">
                <CloudSun className="h-3.5 w-3.5 text-amber-500" />
                <span>Station Telemetry</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                Pokhara, Nepal (822m)
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold font-serif text-[#17212B]">18°C</span>
                <span className="text-xs text-[#4B5563] ml-2">Partly Cloudy</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/60">
                Window: Clear
              </span>
            </div>

            <div className="pt-2 border-t border-zinc-200/60 grid grid-cols-3 gap-2 text-[10px] text-[#4B5563] font-mono text-center">
              <div>
                <span className="text-zinc-400 block">Wind</span>
                <span className="font-bold text-[#17212B]">8 km/h NW</span>
              </div>
              <div>
                <span className="text-zinc-400 block">Humidity</span>
                <span className="font-bold text-[#17212B]">62%</span>
              </div>
              <div>
                <span className="text-zinc-400 block">UV Index</span>
                <span className="font-bold text-[#17212B]">Moderate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: TRAVEL OVERVIEW STATISTIC CARDS
      ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2]">
              Upcoming Trips
            </span>
            <div className="h-8 w-8 rounded-xl bg-blue-50 text-[#0552A2] flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-[#17212B]">{UPCOMING_TRIPS.length}</div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
            Next: Annapurna ABC in 21d
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2]">
              Places Explored
            </span>
            <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-[#17212B]">8</div>
          <span className="text-[11px] text-[#4B5563] block mt-1">
            Across 4 Provinces
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2]">
              Wishlist Saved
            </span>
            <div className="h-8 w-8 rounded-xl bg-rose-50 text-[#EC1F27] flex items-center justify-center">
              <Heart className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-[#17212B]">{wishlist.length}</div>
          <span className="text-[11px] text-[#4B5563] block mt-1">
            Himalayan Sanctuaries
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs hover:shadow-xs transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2]">
              Completed
            </span>
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-bold font-serif text-[#17212B]">4</div>
          <span className="text-[11px] text-[#4B5563] block mt-1">
            124 km Total Trekked
          </span>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: MAIN DUAL-COLUMN LAYOUT (PRIMARY FEED + CONTEXTUAL ASIDE)
      ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ─── LEFT COLUMN (8 COLS): TRIPS, PLANNING & RECOMMENDATIONS ───────── */}
        <div className="lg:col-span-8 space-y-10">
          {/* 3.1 YOUR UPCOMING JOURNEYS */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] block mb-0.5">
                  Confirmed Itineraries ({filteredUpcomingTrips.length})
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17212B]">
                  Your Upcoming Journeys
                </h2>
              </div>

              {/* Trip Category Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {(['All', 'Alpine', 'Scenic', 'Safari'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTripFilter(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0 cursor-pointer ${
                      activeTripFilter === cat
                        ? 'bg-[#0552A2] text-white shadow-xs'
                        : 'bg-zinc-100 text-[#4B5563] hover:bg-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredUpcomingTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="group rounded-3xl bg-white border border-zinc-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col md:flex-row"
                >
                  {/* Trip Visual */}
                  <div className="relative md:w-5/12 h-52 md:h-auto min-h-[220px] shrink-0 bg-[#17212B]">
                    <Image
                      src={trip.imageUrl}
                      alt={trip.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 35vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold font-mono uppercase tracking-wider text-[#0552A2] shadow-xs">
                        {trip.status}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-white">
                        {trip.countdown}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="text-[11px] font-mono tracking-wider text-amber-300 block">
                        Peak Alt: {trip.elevation}
                      </span>
                    </div>
                  </div>

                  {/* Trip Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#4B5563] mb-1.5">
                        <Calendar className="h-3.5 w-3.5 text-[#0552A2]" />
                        <span>{trip.dates}</span>
                        <span>•</span>
                        <Clock className="h-3.5 w-3.5 text-[#0552A2]" />
                        <span>{trip.duration}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17212B] group-hover:text-[#0552A2] transition-colors">
                        {trip.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] mt-1.5 line-clamp-2 leading-relaxed">
                        {trip.subtitle}
                      </p>

                      {/* Highlights Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {trip.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-[#4B5563]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                      <span className="font-mono text-zinc-400 text-[11px]">
                        Ref: {trip.bookingRef}
                      </span>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDestinationClick(trip.slug)}
                          className="font-bold text-[#0552A2] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Itinerary</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3.2 CONTINUE PLANNING (DRAFT ITINERARIES) */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] block mb-0.5">
                  In-Progress Trips ({DRAFT_TRIPS.length})
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17212B]">
                  Continue Planning
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAllDrafts(!showAllDrafts)}
                  className="text-xs font-bold text-[#0552A2] hover:underline cursor-pointer"
                >
                  {showAllDrafts ? 'Show Less' : `View All (${DRAFT_TRIPS.length})`}
                </button>
                <button
                  onClick={() => onNavigate?.('customize')}
                  className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-[#0552A2] border border-blue-200/60 hover:bg-[#0552A2] hover:text-white transition-colors cursor-pointer"
                >
                  + New Draft
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {displayedDrafts.map((draft) => (
                <div
                  key={draft.id}
                  className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative h-12 w-12 rounded-xl overflow-hidden shrink-0 bg-zinc-100">
                      <Image
                        src={draft.imageUrl}
                        alt={draft.title}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold font-serif text-[#17212B] truncate">
                        {draft.title}
                      </h4>
                      <p className="text-[11px] text-[#4B5563] truncate mt-0.5">
                        {draft.statusSummary}
                      </p>
                    </div>
                  </div>

                  {/* Meaningful Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="text-[#4B5563] text-[10px]">Completion</span>
                      <span className="font-bold text-[#0552A2]">{draft.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0552A2] rounded-full transition-all duration-500"
                        style={{ width: `${draft.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[10px] text-zinc-400 font-mono">
                    <span>{draft.lastEdited}</span>
                    <button
                      onClick={() => onNavigate?.('customize')}
                      className="font-bold text-[#0552A2] hover:underline cursor-pointer uppercase tracking-wider"
                    >
                      Resume
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3.3 RECOMMENDED FOR YOU (EDITORIAL DISCOVERY) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] block mb-0.5">
                  Curated For Your Profile ({filteredRecommendations.length})
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17212B]">
                  Recommended For You
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['All', 'Heritage', 'High Altitude', 'Wildlife', 'Scenic', 'Hidden Gem'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveRecCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0 cursor-pointer ${
                      activeRecCategory === cat
                        ? 'bg-[#0552A2] text-white shadow-xs'
                        : 'bg-zinc-100 text-[#4B5563] hover:bg-zinc-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredRecommendations.map((dest) => {
                const isWishlisted = wishlist.some((w) => w.slug === dest.slug);
                return (
                  <div
                    key={dest.id}
                    className="group rounded-3xl bg-white border border-zinc-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-[#17212B]">
                      <Image
                        src={dest.imageUrl}
                        alt={dest.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0552A2]">
                        {dest.category}
                      </div>

                      {/* Wishlist Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist({
                            id: `w-${dest.slug}`,
                            name: dest.name,
                            slug: dest.slug,
                            location: dest.region,
                            category: dest.category,
                            imageUrl: dest.imageUrl,
                          });
                        }}
                        className={`absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          isWishlisted
                            ? 'bg-[#EC1F27] text-white shadow-md'
                            : 'bg-white/80 backdrop-blur-md text-[#17212B] hover:bg-white hover:text-[#EC1F27]'
                        }`}
                        title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                      >
                        <Heart className="h-4 w-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                      </button>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] font-mono text-amber-300 block">
                          {dest.region} • {dest.elevation}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="text-base font-bold font-serif text-[#17212B] group-hover:text-[#0552A2] transition-colors">
                          {dest.name}
                        </h4>
                        <p className="text-xs text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
                          {dest.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                        <span className="font-mono text-zinc-500 text-[11px]">
                          Est: {dest.duration}
                        </span>

                        <button
                          onClick={() => handleDestinationClick(dest.slug)}
                          className="font-bold text-[#0552A2] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Explore</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3.4 TRAVEL INSPIRATION (EDITORIAL ESSAYS) */}
          <div className="pt-6 border-t border-zinc-200">
            <div className="mb-5">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] block mb-0.5">
                Editorial Dispatch
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17212B]">
                Still Deciding Where to Go?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div
                onClick={() => handleDestinationClick('annapurna')}
                className="group relative h-60 rounded-3xl overflow-hidden bg-[#17212B] p-6 flex flex-col justify-end text-white cursor-pointer shadow-xs hover:shadow-md transition-shadow"
              >
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
                  alt="Annapurna"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-104 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 font-bold block mb-1">
                    Alpine Solitude
                  </span>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Escape into the High Annapurnas
                  </h3>
                  <p className="text-xs text-zinc-200 mt-1 line-clamp-2">
                    Where glacial valleys unfold beneath twelve peaks crowning above 7,000 meters.
                  </p>
                </div>
              </div>

              <div
                onClick={() => handleDestinationClick('kathmandu')}
                className="group relative h-60 rounded-3xl overflow-hidden bg-[#17212B] p-6 flex flex-col justify-end text-white cursor-pointer shadow-xs hover:shadow-md transition-shadow"
              >
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
                  alt="Kathmandu"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-104 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 font-bold block mb-1">
                    Living Antiquity
                  </span>
                  <h3 className="text-lg font-bold font-serif text-white">
                    Courtyards of the Kathmandu Valley
                  </h3>
                  <p className="text-xs text-zinc-200 mt-1 line-clamp-2">
                    Centuries of sacred rituals, master Newari woodcarvers, and golden stupa eyes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN (4 COLS): QUICK ACTIONS, BOOKINGS & TIMELINE ─────── */}
        <div className="lg:col-span-4 space-y-8">
          {/* 4.1 QUICK ACTIONS */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] mb-4">
              Quick Travel Actions
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigate?.('customize')}
                className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/60 hover:border-[#0552A2]/40 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <SlidersHorizontal className="h-4 w-4 text-[#0552A2] mb-2" />
                <span className="text-xs font-bold text-[#17212B]">Plan a Trip</span>
                <span className="text-[10px] text-[#4B5563]">Customizer</span>
              </button>

              <button
                onClick={() => onNavigate?.('hotels')}
                className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/60 hover:border-[#0552A2]/40 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <Hotel className="h-4 w-4 text-[#0552A2] mb-2" />
                <span className="text-xs font-bold text-[#17212B]">Find Stays</span>
                <span className="text-[10px] text-[#4B5563]">Lodge & Spa</span>
              </button>

              <button
                onClick={() => onNavigate?.('explore')}
                className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/60 hover:border-[#0552A2]/40 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <Compass className="h-4 w-4 text-[#0552A2] mb-2" />
                <span className="text-xs font-bold text-[#17212B]">Destinations</span>
                <span className="text-[10px] text-[#4B5563]">7 Provinces</span>
              </button>

              <button
                onClick={() => onNavigate?.('permits')}
                className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/60 hover:border-[#0552A2]/40 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex flex-col justify-between"
              >
                <ShieldCheck className="h-4 w-4 text-[#0552A2] mb-2" />
                <span className="text-xs font-bold text-[#17212B]">Permits</span>
                <span className="text-[10px] text-[#4B5563]">TIMS & ACAP</span>
              </button>
            </div>
          </div>

          {/* 4.2 MY BOOKINGS OVERVIEW */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2]">
                  My Bookings ({filteredBookings.length})
                </h3>
              </div>
              <button
                onClick={() => setShowAllBookings(!showAllBookings)}
                className="text-[11px] font-bold text-[#0552A2] hover:underline cursor-pointer"
              >
                {showAllBookings ? 'Show Less' : `View all (${RECENT_BOOKINGS.length})`}
              </button>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-1 mb-3.5 border-b border-zinc-100 pb-2 overflow-x-auto scrollbar-none">
              {(['All', 'Confirmed', 'Upcoming', 'Pending'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setBookingFilter(s)}
                  className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer shrink-0 ${
                    bookingFilter === s
                      ? 'bg-[#0552A2] text-white'
                      : 'text-zinc-500 hover:bg-zinc-100'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {displayedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-2xl bg-zinc-50/70 border border-zinc-200/60 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#0552A2]">
                      {b.type}
                    </span>
                    <span
                      className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        b.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'Upcoming'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#17212B] line-clamp-1">
                    {b.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-[#4B5563]">
                    <span className="text-[10px] truncate max-w-[140px]">{b.destination}</span>
                    <span className="font-mono font-semibold text-[#17212B] shrink-0">{b.cost}</span>
                  </div>

                  <div className="pt-1.5 border-t border-zinc-200/60 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                    <span>{b.date}</span>
                    <span className="text-zinc-500">{b.ref}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4.3 SAVED WISHLIST OVERVIEW */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2]">
                Saved Wishlist ({wishlist.length})
              </h3>
              <button
                onClick={() => onNavigate?.('explore')}
                className="text-[11px] font-bold text-[#0552A2] hover:underline cursor-pointer"
              >
                Explore more
              </button>
            </div>

            {wishlist.length === 0 ? (
              <p className="text-xs text-[#4B5563] py-4 text-center">
                Your wishlist is empty. Explore destinations to save your dreams!
              </p>
            ) : (
              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200/60 flex items-center justify-between gap-3 group"
                  >
                    <div
                      onClick={() => handleDestinationClick(item.slug)}
                      className="flex items-center gap-3 min-w-0 cursor-pointer flex-1"
                    >
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0 bg-zinc-200">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#17212B] group-hover:text-[#0552A2] truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-zinc-500 block truncate">
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleWishlist(item)}
                      className="h-7 w-7 rounded-lg text-zinc-400 hover:text-[#EC1F27] hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors"
                      title="Remove from wishlist"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4.4 RECENT TRAVEL ACTIVITY TIMELINE (NOT A SOCIAL FEED!) */}
          <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2]">
                Recent Travel Log
              </h3>
              <button
                onClick={() => setShowAllActivity(!showAllActivity)}
                className="text-[11px] font-bold text-[#0552A2] hover:underline cursor-pointer"
              >
                {showAllActivity ? 'Show Less' : `View all (${RECENT_ACTIVITY_LOG.length})`}
              </button>
            </div>

            <div className="relative pl-5 border-l-2 border-zinc-200 space-y-4">
              {displayedActivity.map((log) => (
                <div key={log.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[27px] top-0.5 h-3.5 w-3.5 rounded-full bg-white border-2 border-[#0552A2]" />

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#17212B]">
                        {log.icon} {log.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#4B5563] mt-0.5 leading-relaxed">
                      {log.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
