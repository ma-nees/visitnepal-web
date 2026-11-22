'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Search, TrendingUp, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SearchItem {
  id: string;
  title: string;
  category: string;
  region: string;
  price: string;
  image: string;
  targetId?: string; // Dashboard section or slug to navigate to
  tags: string[];
}

const CATEGORIES = [
  'Trekking & Peaks',
  'Expedition Packages',
  'Luxury Stays',
  'Wildlife & Safari',
  'Cultural Heritage',
  'Adventure Sports',
];

const SEARCH_ITEMS: SearchItem[] = [
  {
    id: 'annapurna-sanctuary',
    title: 'Annapurna Sanctuary & High Pass Loop',
    category: 'Trekking & Peaks',
    region: 'Annapurna & Gandaki · 10-14 Days',
    price: '$850 / pax',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=160&auto=format&fit=crop',
    targetId: 'trekking',
    tags: ['annapurna', 'abc', 'trekking', 'high pass', 'poon hill', 'machhapuchhre', 'sanctuary'],
  },
  {
    id: 'everest-three-passes',
    title: 'Everest Three Passes & Gokyo Ri Circuit',
    category: 'Expedition Packages',
    region: 'Khumbu (Everest) · 17 Days',
    price: '$1,450 / pax',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=160&auto=format&fit=crop',
    targetId: 'mountaineering',
    tags: ['everest', 'ebc', 'gokyo', 'three passes', 'himalayas', 'alpine', 'kala patthar'],
  },
  {
    id: 'sagarmatha-lodge',
    title: 'Sagarmatha View Lodge & Spa',
    category: 'Luxury Stays',
    region: 'Namche Bazaar, Everest',
    price: '$180 / night',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=160&auto=format&fit=crop',
    targetId: 'hotels',
    tags: ['sagarmatha', 'hotel', 'namche', 'lodge', 'spa', 'stays', 'luxury'],
  },
  {
    id: 'bardia-safari',
    title: 'Bardia & Chitwan Untamed Wildlife Safari',
    category: 'Wildlife & Safari',
    region: 'Terai Lowlands · 7 Days',
    price: '$620 / pax',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=160&auto=format&fit=crop',
    targetId: 'wildlife',
    tags: ['chitwan', 'bardia', 'tiger', 'safari', 'wildlife', 'jungle', 'rhino'],
  },
  {
    id: 'pokhara-paragliding',
    title: 'Sarangkot Sunrise Paragliding & Lakeside',
    category: 'Adventure Sports',
    region: 'Phewa Lake & Sarangkot, Pokhara',
    price: '$120 / flight',
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=160&auto=format&fit=crop',
    targetId: 'adventure',
    tags: ['pokhara', 'paragliding', 'sarangkot', 'adventure', 'phewa', 'lake'],
  },
  {
    id: 'dwarikas-hotel',
    title: "The Dwarika's Heritage Hotel & Spa",
    category: 'Luxury Stays',
    region: 'Battisputali, Kathmandu Valley',
    price: '$290 / night',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=160&auto=format&fit=crop',
    targetId: 'hotels',
    tags: ['dwarikas', 'kathmandu', 'heritage', 'luxury', 'stays', 'hotel'],
  },
  {
    id: 'kathmandu-cultural',
    title: 'Kathmandu Valley UNESCO Cultural Pilgrimage',
    category: 'Cultural Heritage',
    region: 'Pashupatinath, Boudha & Patan',
    price: '$150 / day',
    image: 'https://images.unsplash.com/photo-1582650625119-3a31f841839d?q=80&w=160&auto=format&fit=crop',
    targetId: 'cultural',
    tags: ['kathmandu', 'unesco', 'pashupatinath', 'boudha', 'temple', 'cultural'],
  },
  {
    id: 'langtang-gosainkunda',
    title: 'Langtang Valley & Sacred Gosainkunda Lakes',
    category: 'Trekking & Peaks',
    region: 'Langtang National Park · 11 Days',
    price: '$720 / pax',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=160&auto=format&fit=crop',
    targetId: 'trekking',
    tags: ['langtang', 'gosainkunda', 'lakes', 'kyanjin', 'trekking', 'tamang'],
  },
];

interface DashboardSearchBarProps {
  onSelect?: (item: SearchItem) => void;
  className?: string;
}

export default function DashboardSearchBar({ onSelect, className = '' }: DashboardSearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Filter items based on active category and text query
  const filteredItems = useMemo(() => {
    return SEARCH_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      if (!query.trim()) return matchesCategory;

      const q = query.toLowerCase().trim();
      const matchesText =
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesText;
    });
  }, [query, selectedCategory]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory((prev) => (prev === cat ? null : cat));
  };

  const handleClear = () => {
    setQuery('');
    setSelectedCategory(null);
    inputRef.current?.focus();
  };

  const handleItemClick = (item: SearchItem) => {
    setIsOpen(false);
    onSelect?.(item);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center w-full">
        <span className="absolute left-3 text-slate-400 flex items-center justify-center pointer-events-none">
          <Search className="h-4 w-4" />
        </span>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder="Search packages, trips, stays, summits..."
          className="w-full bg-white border border-slate-300 hover:border-slate-400 focus:border-[#0552A2] rounded-full pl-9 pr-8 h-8.5 sm:h-9 text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none transition-all shadow-xs"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Popover Dropdown Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-[340px] sm:w-[420px] md:w-[460px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200/90 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.14)] p-4 sm:p-5 z-50 text-left select-none"
          >
            {/* 1. BROWSE CATEGORIES */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
                  Browse Categories
                </span>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-[10px] font-mono text-[#0552A2] hover:underline cursor-pointer"
                  >
                    Clear filter
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryClick(cat)}
                      className={`rounded-full px-3 py-1 text-xs transition-all font-medium cursor-pointer select-none border active:scale-95 ${
                        isSelected
                          ? 'bg-[#0552A2] text-white border-[#0552A2] shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. POPULAR RIGHT NOW / SEARCH RESULTS */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-500 font-semibold">
                  {query || selectedCategory ? `Results (${filteredItems.length})` : 'Popular Right Now'}
                </span>
              </div>

              {filteredItems.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  <p>No trips or packages found for &ldquo;{query}&rdquo;</p>
                  <button
                    onClick={handleClear}
                    className="mt-2 text-xs font-mono text-[#0552A2] font-semibold hover:underline cursor-pointer"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-slate-100/80 max-h-[290px] overflow-y-auto overscroll-contain scrollbar-thin">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleItemClick(item)}
                      className="group flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div className="relative h-11 w-11 shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-xs">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="44px"
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-[13px] font-semibold text-slate-900 group-hover:text-[#0552A2] transition-colors truncate">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-slate-500">
                            <span className="truncate">{item.region}</span>
                            <span>·</span>
                            <span className="font-mono font-bold text-emerald-700 whitespace-nowrap">
                              {item.price}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Arrow */}
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
