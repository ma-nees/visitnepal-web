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
  Map,
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
  FileCheck,
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

const getActivityStyle = (log: ActivityLogItem) => {
  const iconKey = (log.icon || '').toLowerCase();
  const title = (log.title || '').toLowerCase();

  if (iconKey === 'hotel' || iconKey === '🏨' || title.includes('lodging') || title.includes('stay') || title.includes('hotel')) {
    return {
      icon: Hotel,
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      badgeBg: 'bg-amber-100/80',
      badgeText: 'text-amber-800',
      dotBorder: 'border-amber-500',
    };
  }

  if (iconKey === 'map' || iconKey === '🗺️' || title.includes('itinerary') || title.includes('journey')) {
    return {
      icon: Map,
      bg: 'bg-blue-50',
      text: 'text-[#0552A2]',
      badgeBg: 'bg-blue-100/80',
      badgeText: 'text-blue-800',
      dotBorder: 'border-[#0552A2]',
    };
  }

  if (iconKey === 'file-check' || iconKey === 'file-text' || iconKey === '📄' || title.includes('permit')) {
    return {
      icon: FileCheck,
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      badgeBg: 'bg-emerald-100/80',
      badgeText: 'text-emerald-800',
      dotBorder: 'border-emerald-500',
    };
  }

  if (iconKey === 'heart' || iconKey === '❤️' || title.includes('bookmark') || title.includes('wishlist')) {
    return {
      icon: Heart,
      bg: 'bg-rose-50',
      text: 'text-[#EC1F27]',
      badgeBg: 'bg-rose-100/80',
      badgeText: 'text-rose-800',
      dotBorder: 'border-[#EC1F27]',
    };
  }

  if (iconKey === 'plane' || iconKey === '✈️' || title.includes('flight') || title.includes('ticket')) {
    return {
      icon: Plane,
      bg: 'bg-sky-50',
      text: 'text-sky-600',
      badgeBg: 'bg-sky-100/80',
      badgeText: 'text-sky-800',
      dotBorder: 'border-sky-500',
    };
  }

  if (iconKey === 'user-check' || iconKey === '🧗' || title.includes('guide')) {
    return {
      icon: UserCheck,
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      badgeBg: 'bg-purple-100/80',
      badgeText: 'text-purple-800',
      dotBorder: 'border-purple-500',
    };
  }

  if (iconKey === 'mountain' || iconKey === '🪂' || title.includes('adventure') || title.includes('activity')) {
    return {
      icon: Mountain,
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      badgeBg: 'bg-orange-100/80',
      badgeText: 'text-orange-800',
      dotBorder: 'border-orange-500',
    };
  }

  if (iconKey === 'shield-check' || iconKey === '🎒' || title.includes('gear')) {
    return {
      icon: ShieldCheck,
      bg: 'bg-teal-50',
      text: 'text-teal-600',
      badgeBg: 'bg-teal-100/80',
      badgeText: 'text-teal-800',
      dotBorder: 'border-teal-500',
    };
  }

  return {
    icon: Sparkles,
    bg: 'bg-zinc-100',
    text: 'text-[#0552A2]',
    badgeBg: 'bg-zinc-100',
    badgeText: 'text-zinc-700',
    dotBorder: 'border-[#0552A2]',
  };
};

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
    <div className="w-full space-y-4 sm:space-y-6 pb-6 sm:pb-8 text-left">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 bg-[#0552A2] text-white text-xs font-semibold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20"
          >
            <CheckCircle2 className="h-4 w-4 text-[#FDB716]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          SECTION 1: DASHBOARD WELCOME & CONTEXTUAL TELEMETRY BANNER
      ========================================================================= */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B2240] via-[#0552A2] to-[#1D6FD6] text-white shadow-md p-3.5 sm:p-4 md:p-5">
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#92C4EA]/15 blur-3xl" />
        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-5">
          {/* Left: Personalized Greeting & Primary CTAs */}
          <div className="flex items-start gap-3.5 sm:gap-4 flex-1 min-w-0">
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-full overflow-hidden shrink-0 border-2 border-white/50 shadow-sm mt-0.5">
              <Image
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200'}
                alt={userName}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-bold text-[#92C4EA] uppercase tracking-wider font-mono">
                  Visit Nepal Personal Portal
                </span>
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                <span className="text-[9px] font-mono text-emerald-100 bg-emerald-500/20 px-2 py-0.5 rounded-full font-semibold border border-emerald-400/30">
                  Passport US98127398
                </span>
                <span className="text-[9px] font-mono text-[#FDB716] bg-[#FDB716]/15 px-2 py-0.5 rounded-full font-semibold border border-[#FDB716]/35">
                  Explorer Gold
                </span>
              </div>

              <h1 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-white tracking-tight leading-snug">
                {greeting}, {userName}.
              </h1>
              <p className="text-xs text-white/85 mt-0.5 max-w-xl leading-relaxed">
                Your next Himalayan journey begins here. You have <strong className="text-[#FDB716]">{UPCOMING_TRIPS.length} confirmed expeditions</strong> lined up across Nepal.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 mt-3 flex-wrap">
                <button
                  onClick={() => onNavigate?.('customize')}
                  className="px-4 py-2 rounded-full bg-white text-[#0552A2] text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:bg-[#F2F8FD] hover:shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Plan a New Trip</span>
                </button>

                <button
                  onClick={() => onNavigate?.('explore')}
                  className="px-4 py-2 rounded-full bg-white/10 border border-white/25 text-white text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:bg-white/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Compass className="h-3.5 w-3.5" />
                  <span>Explore Destinations</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Contextual Travel Telemetry Card */}
          <div className="w-full xl:w-64 shrink-0 bg-white rounded-xl p-3 border border-[#0552A2]/10 shadow-xs flex flex-col justify-between gap-1.5 text-slate-800">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#0552A2] flex items-center gap-1.5">
                <span className="h-4.5 w-4.5 rounded-[5px] bg-[#F2F8FD] border border-[#0552A2]/10 flex items-center justify-center">
                  <CloudSun className="h-3 w-3 text-[#0552A2]" />
                </span>
                <span>Station Telemetry</span>
              </span>
              <span className="text-[10px] text-[#64748B] font-medium">
                Pokhara (822m)
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold tracking-tight text-[#17212B]">18°C</span>
                <span className="text-[10px] text-[#64748B]">Partly Cloudy</span>
              </div>
              <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/70">
                Window: Clear
              </span>
            </div>

            <div className="pt-1.5 border-t border-[#0552A2]/8 grid grid-cols-3 gap-1.5 text-[9px] text-[#64748B] text-center">
              <div>
                <span className="text-[#94A3B8] block text-[8px]">Wind</span>
                <span className="font-semibold text-[#17212B] block truncate">8 km/h NW</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[8px]">Humidity</span>
                <span className="font-semibold text-[#17212B] block">62%</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[8px]">UV Index</span>
                <span className="font-semibold text-[#17212B] block">Moderate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: TRAVEL OVERVIEW STATISTIC CARDS
      ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-[14px] bg-white border border-[#0552A2]/10 shadow-[0_2px_8px_-3px_rgba(15,42,74,0.06)] hover:shadow-[0_6px_16px_-5px_rgba(5,82,162,0.12)] transition-shadow flex flex-col justify-between min-h-[90px] sm:min-h-[100px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-[#64748B] truncate">
              Upcoming Trips
            </span>
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-[8px] bg-[#F2F8FD] border border-[#0552A2]/10 text-[#0552A2] flex items-center justify-center shrink-0">
              <Calendar className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-1.5">
            <div className="text-lg sm:text-xl font-bold tracking-tight text-[#17212B] leading-none">{UPCOMING_TRIPS.length}</div>
            <span className="text-[9px] sm:text-[10px] text-[#0552A2] font-medium block mt-1 truncate">
              Next: Annapurna ABC in 21d
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-[14px] bg-white border border-[#0552A2]/10 shadow-[0_2px_8px_-3px_rgba(15,42,74,0.06)] hover:shadow-[0_6px_16px_-5px_rgba(5,82,162,0.12)] transition-shadow flex flex-col justify-between min-h-[90px] sm:min-h-[100px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-[#64748B] truncate">
              Places Explored
            </span>
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-[8px] bg-[#F2F8FD] border border-[#0552A2]/10 text-[#0552A2] flex items-center justify-center shrink-0">
              <MapPin className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-1.5">
            <div className="text-lg sm:text-xl font-bold tracking-tight text-[#17212B] leading-none">8</div>
            <span className="text-[9px] sm:text-[10px] text-[#64748B] font-medium block mt-1 truncate">
              Across 4 Provinces
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-[14px] bg-white border border-[#0552A2]/10 shadow-[0_2px_8px_-3px_rgba(15,42,74,0.06)] hover:shadow-[0_6px_16px_-5px_rgba(5,82,162,0.12)] transition-shadow flex flex-col justify-between min-h-[90px] sm:min-h-[100px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-[#64748B] truncate">
              Wishlist Saved
            </span>
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-[8px] bg-[#F2F8FD] border border-[#0552A2]/10 text-[#0552A2] flex items-center justify-center shrink-0">
              <Heart className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-1.5">
            <div className="text-lg sm:text-xl font-bold tracking-tight text-[#17212B] leading-none">{wishlist.length}</div>
            <span className="text-[9px] sm:text-[10px] text-[#64748B] font-medium block mt-1 truncate">
              Himalayan Sanctuaries
            </span>
          </div>
        </div>

        <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-[14px] bg-white border border-[#0552A2]/10 shadow-[0_2px_8px_-3px_rgba(15,42,74,0.06)] hover:shadow-[0_6px_16px_-5px_rgba(5,82,162,0.12)] transition-shadow flex flex-col justify-between min-h-[90px] sm:min-h-[100px]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-wide text-[#64748B] truncate">
              Completed
            </span>
            <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-[8px] bg-[#F2F8FD] border border-[#0552A2]/10 text-[#0552A2] flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="mt-1.5">
            <div className="text-lg sm:text-xl font-bold tracking-tight text-[#17212B] leading-none">4</div>
            <span className="text-[9px] sm:text-[10px] text-[#64748B] font-medium block mt-1 truncate">
              124 km Total Trekked
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: MAIN DUAL-COLUMN LAYOUT (PRIMARY FEED + CONTEXTUAL ASIDE)
      ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* ─── LEFT COLUMN (7 COLS on XL, 8 COLS on 2XL): TRIPS, PLANNING & RECOMMENDATIONS ───────── */}
        <div className="xl:col-span-7 2xl:col-span-8 space-y-6 sm:space-y-8 min-w-0">
          {/* 3.1 YOUR UPCOMING JOURNEYS */}
          <div>
            <div className="flex flex-wrap items-end justify-between mb-4 sm:mb-5 gap-3">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] block mb-0.5">
                  Confirmed Itineraries ({filteredUpcomingTrips.length})
                </span>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-[#17212B] tracking-tight">
                  Your Upcoming Journeys
                </h2>
              </div>

              {/* Trip Category Filters */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {(['All', 'Alpine', 'Scenic', 'Safari'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTripFilter(cat)}
                    className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors shrink-0 cursor-pointer ${activeTripFilter === cat
                      ? 'bg-[#0552A2] text-white shadow-xs'
                      : 'bg-zinc-100 text-[#4B5563] hover:bg-zinc-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 journey-card-wrapper">
              {filteredUpcomingTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="journey-responsive-card group rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                >
                  {/* Trip Visual */}
                  <div className="journey-responsive-visual relative shrink-0 bg-[#17212B]">
                    <Image
                      src={trip.imageUrl}
                      alt={trip.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 35vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />

                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex items-center gap-2">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold font-mono uppercase tracking-wider text-[#0552A2] shadow-xs">
                        {trip.status}
                      </span>
                      <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] sm:text-xs font-mono text-white">
                        {trip.countdown}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 text-white">
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-amber-300 block">
                        Peak Alt: {trip.elevation}
                      </span>
                    </div>
                  </div>

                  {/* Trip Content */}
                  <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col justify-between gap-3 sm:gap-4 min-w-0">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#4B5563] mb-1.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-[#0552A2]" />
                          <span>{trip.dates}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-[#0552A2]" />
                          <span>{trip.duration}</span>
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg md:text-xl font-bold font-serif text-[#17212B] group-hover:text-[#0552A2] transition-colors leading-snug">
                        {trip.title}
                      </h3>
                      <p className="text-xs text-[#4B5563] mt-1.5 line-clamp-2 leading-relaxed">
                        {trip.subtitle}
                      </p>

                      {/* Highlights Badges */}
                      <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-2.5 sm:mt-3">
                        {trip.highlights.map((h, i) => (
                          <span
                            key={i}
                            className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-zinc-100 text-[#4B5563]"
                          >
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-mono text-zinc-400 text-[10px] sm:text-[11px]">
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
            <div className="flex items-center justify-between mb-4 sm:mb-5 gap-2">
              <div>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] block mb-0.5">
                  In-Progress Trips ({DRAFT_TRIPS.length})
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17212B]">
                  Continue Planning
                </h2>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={() => setShowAllDrafts(!showAllDrafts)}
                  className="text-xs font-bold text-[#0552A2] hover:underline cursor-pointer"
                >
                  {showAllDrafts ? 'Show Less' : `View All (${DRAFT_TRIPS.length})`}
                </button>
                <button
                  onClick={() => onNavigate?.('customize')}
                  className="text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full bg-blue-50 text-[#0552A2] border border-blue-200/60 hover:bg-[#0552A2] hover:text-white transition-colors cursor-pointer"
                >
                  + New Draft
                </button>
              </div>
            </div>

            <div className="journey-card-wrapper">
              <div className="responsive-grid-3">
                {displayedDrafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between gap-3.5 sm:gap-4 min-w-0"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl overflow-hidden shrink-0 bg-zinc-100">
                        <Image
                          src={draft.imageUrl}
                          alt={draft.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold font-serif text-[#17212B] truncate">
                          {draft.title}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-[#4B5563] truncate mt-0.5">
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
          </div>

          {/* 3.3 RECOMMENDED FOR YOU (EDITORIAL DISCOVERY) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 gap-3">
              <div>
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] block mb-0.5">
                  Curated For Your Profile ({filteredRecommendations.length})
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17212B]">
                  Recommended For You
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none max-w-full">
                {['All', 'Heritage', 'High Altitude', 'Wildlife', 'Scenic', 'Hidden Gem'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveRecCategory(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-colors shrink-0 cursor-pointer ${activeRecCategory === cat
                      ? 'bg-[#0552A2] text-white shadow-xs'
                      : 'bg-zinc-100 text-[#4B5563] hover:bg-zinc-200'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
            >
              {filteredRecommendations.map((dest) => {
                const isWishlisted = wishlist.some((w) => w.slug === dest.slug);
                return (
                  <motion.div
                    key={dest.id}
                    layout
                    transition={{
                      layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.25 }
                    }}
                    className="group rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/80 overflow-hidden shadow-xs hover:shadow-md transition-[border-color,box-shadow,transform] duration-300 ease-out flex flex-col justify-between transform-gpu will-change-transform"
                  >
                    <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-[#17212B]">
                      <Image
                        src={dest.imageUrl}
                        alt={dest.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 30vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0552A2]">
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
                        className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${isWishlisted
                          ? 'bg-[#EC1F27] text-white shadow-md'
                          : 'bg-white/80 backdrop-blur-md text-[#17212B] hover:bg-white hover:text-[#EC1F27]'
                          }`}
                        title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                      >
                        <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill={isWishlisted ? 'currentColor' : 'none'} />
                      </button>

                      <div className="absolute bottom-3 left-3.5 sm:left-4 right-3.5 sm:right-4 text-white">
                        <span className="text-[10px] font-mono text-amber-300 block truncate">
                          {dest.region} • {dest.elevation}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold font-serif text-[#17212B] group-hover:text-[#0552A2] transition-colors leading-snug">
                          {dest.name}
                        </h4>
                        <p className="text-xs text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
                          {dest.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                        <span className="font-mono text-zinc-500 text-[10px] sm:text-[11px]">
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
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* 3.4 TRAVEL INSPIRATION (EDITORIAL ESSAYS) */}
          <div className="pt-6 border-t border-zinc-200">
            <div className="mb-4 sm:mb-5">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] block mb-0.5">
                Editorial Dispatch
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#17212B]">
                Still Deciding Where to Go?
              </h2>
            </div>

            <div className="journey-card-wrapper">
              <div className="responsive-grid-2">
                <div
                  onClick={() => handleDestinationClick('annapurna')}
                  className="group relative h-52 sm:h-60 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#17212B] p-4 sm:p-6 flex flex-col justify-end text-white cursor-pointer shadow-xs hover:shadow-md transition-shadow"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop"
                    alt="Annapurna"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-104 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-amber-300 font-bold block mb-1">
                      Alpine Solitude
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-white leading-tight">
                      Escape into the High Annapurnas
                    </h3>
                    <p className="text-xs text-zinc-200 mt-1 line-clamp-2">
                      Where glacial valleys unfold beneath twelve peaks crowning above 7,000 meters.
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => handleDestinationClick('kathmandu')}
                  className="group relative h-52 sm:h-60 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#17212B] p-4 sm:p-6 flex flex-col justify-end text-white cursor-pointer shadow-xs hover:shadow-md transition-shadow"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
                    alt="Kathmandu"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-104 brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="relative z-10">
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-amber-300 font-bold block mb-1">
                      Living Antiquity
                    </span>
                    <h3 className="text-base sm:text-lg font-bold font-serif text-white leading-tight">
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
        </div>

        {/* ─── RIGHT COLUMN (5 COLS on XL, 4 COLS on 2XL): QUICK ACTIONS, BOOKINGS & TIMELINE ─────── */}
        <div className="xl:col-span-5 2xl:col-span-4 space-y-4 sm:space-y-5 w-full min-w-0">
          {/* 4.1 QUICK ACTIONS */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
            <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-[#0552A2] mb-3">
              Quick Travel Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
              <button
                onClick={() => onNavigate?.('customize')}
                className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 hover:border-[#0552A2]/40 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex flex-col justify-between min-w-0 overflow-hidden group"
              >
                <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#0552A2] group-hover:bg-[#0552A2] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mb-2">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-[#17212B] truncate block w-full">Plan a Trip</span>
                <span className="text-[10px] text-[#4B5563] truncate block w-full">Customizer</span>
              </button>

              <button
                onClick={() => onNavigate?.('hotels')}
                className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 hover:border-[#0552A2]/40 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex flex-col justify-between min-w-0 overflow-hidden group"
              >
                <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#0552A2] group-hover:bg-[#0552A2] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mb-2">
                  <Hotel className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-[#17212B] truncate block w-full">Find Stays</span>
                <span className="text-[10px] text-[#4B5563] truncate block w-full">Lodge & Spa</span>
              </button>

              <button
                onClick={() => onNavigate?.('explore')}
                className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 hover:border-[#0552A2]/40 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex flex-col justify-between min-w-0 overflow-hidden group"
              >
                <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#0552A2] group-hover:bg-[#0552A2] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mb-2">
                  <Compass className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-[#17212B] truncate block w-full">Destinations</span>
                <span className="text-[10px] text-[#4B5563] truncate block w-full">7 Provinces</span>
              </button>

              <button
                onClick={() => onNavigate?.('permits')}
                className="p-2.5 sm:p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 hover:border-[#0552A2]/40 hover:bg-blue-50/40 text-left transition-all cursor-pointer flex flex-col justify-between min-w-0 overflow-hidden group"
              >
                <div className="h-7 w-7 rounded-lg bg-blue-50 text-[#0552A2] group-hover:bg-[#0552A2] group-hover:text-white transition-colors flex items-center justify-center shrink-0 mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-[#17212B] truncate block w-full">Permits</span>
                <span className="text-[10px] text-[#4B5563] truncate block w-full">TIMS & ACAP</span>
              </button>
            </div>
          </div>

          {/* 4.2 MY BOOKINGS OVERVIEW */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
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
            <div className="flex items-center gap-1 mb-3.5 border-b border-zinc-100 pb-2 flex-wrap">
              {(['All', 'Confirmed', 'Upcoming', 'Pending'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setBookingFilter(s)}
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full transition-colors cursor-pointer shrink-0 ${bookingFilter === s
                    ? 'bg-[#0552A2] text-white'
                    : 'text-zinc-500 hover:bg-zinc-100'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              {displayedBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-3 rounded-xl bg-zinc-50/70 border border-zinc-200/60 hover:bg-white hover:shadow-xs transition-all flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#0552A2] tracking-wider">
                      {b.type}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-[#17212B]">{b.cost}</span>
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${b.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : b.status === 'Upcoming'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                          }`}
                      >
                        {b.status}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-[#17212B] leading-snug line-clamp-2">
                    {b.title}
                  </h4>

                  <div className="text-[10px] text-[#4B5563] flex items-center gap-1 truncate">
                    <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                    <span className="truncate">{b.destination}</span>
                  </div>

                  <div className="pt-1.5 border-t border-zinc-200/50 flex flex-wrap items-center justify-between text-[10px] text-zinc-400 font-mono gap-1">
                    <span>{b.date}</span>
                    <span className="text-zinc-500 font-semibold">{b.ref}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4.3 SAVED WISHLIST OVERVIEW */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
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
                    className="p-2 sm:p-2.5 rounded-xl bg-zinc-50/70 border border-zinc-200/60 flex items-center justify-between gap-3 group"
                  >
                    <div
                      onClick={() => handleDestinationClick(item.slug)}
                      className="flex items-center gap-2.5 sm:gap-3 min-w-0 cursor-pointer flex-1"
                    >
                      <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-lg overflow-hidden shrink-0 bg-zinc-200">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
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
                      className="h-7 w-7 rounded-lg text-zinc-400 hover:text-[#EC1F27] hover:bg-rose-50 flex items-center justify-center cursor-pointer transition-colors shrink-0"
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
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-zinc-200/80 shadow-xs">
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
              {displayedActivity.map((log) => {
                const style = getActivityStyle(log);
                const IconComponent = style.icon;

                return (
                  <div key={log.id} className="relative group">
                    {/* Timeline dot */}
                    <div
                      className={`absolute -left-[27px] top-1 h-3.5 w-3.5 rounded-full bg-white border-2 ${style.dotBorder} transition-colors`}
                    />

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}
                          >
                            <IconComponent className="h-3.5 w-3.5" />
                          </span>
                          <span className="text-xs font-bold text-[#17212B] truncate">
                            {log.title}
                          </span>
                          {log.badge && (
                            <span
                              className={`text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded ${style.badgeBg} ${style.badgeText} shrink-0`}
                            >
                              {log.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                          {log.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#4B5563] mt-1 pl-8 leading-relaxed">
                        {log.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
