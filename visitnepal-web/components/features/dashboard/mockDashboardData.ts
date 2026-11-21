// ─── VISIT NEPAL: DASHBOARD HOME MOCK DATA ────────────────────────────────────
// Isolated mock data for the personalized traveler dashboard.
// Customize upcoming trips, drafts, bookings, recommendations, and activity here.

export interface UpcomingTrip {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  dates: string;
  duration: string;
  type: string;
  status: 'Confirmed' | 'Upcoming' | 'In Progress';
  elevation: string;
  countdown: string;
  imageUrl: string;
  highlights: string[];
  bookingRef: string;
}

export const UPCOMING_TRIPS: UpcomingTrip[] = [
  {
    id: 'trip-abc-2026',
    title: 'Annapurna Base Camp Sanctuary',
    slug: 'annapurna',
    subtitle: 'Colossal alpine amphitheater crowned by Annapurna I and Machhapuchhre',
    dates: '12 Dec – 19 Dec 2026',
    duration: '8 Days',
    type: 'High Alpine Expedition',
    status: 'Upcoming',
    elevation: '4,130m',
    countdown: 'In 21 Days',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Poon Hill Sunrise', 'Machhapuchhre View', 'Jhinu Hot Springs', 'Teahouse Lodging'],
    bookingRef: 'EXP-ABC-9402',
  },
  {
    id: 'trip-pkr-2026',
    title: 'Pokhara Valley & Lakeside Escape',
    slug: 'pokhara',
    subtitle: 'Tranquil waters of Phewa Lake with paragliding and peace pagoda views',
    dates: '25 Dec – 28 Dec 2026',
    duration: '4 Days',
    type: 'Relaxation & Adventure',
    status: 'Confirmed',
    elevation: '822m',
    countdown: 'In 34 Days',
    imageUrl: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Phewa Sunrise Cruise', 'Sarangkot Paragliding', 'World Peace Pagoda'],
    bookingRef: 'BK-PKR-1184',
  },
];

export interface DraftTrip {
  id: string;
  title: string;
  slug: string;
  progress: number;
  lastEdited: string;
  statusSummary: string;
  imageUrl: string;
}

export const DRAFT_TRIPS: DraftTrip[] = [
  {
    id: 'draft-ktm',
    title: 'Kathmandu Valley Cultural Pilgrimage',
    slug: 'kathmandu',
    progress: 65,
    lastEdited: 'Yesterday at 4:20 PM',
    statusSummary: '3 of 5 Days Planned · 2 Stays Selected',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'draft-mustang',
    title: 'Upper Mustang 4x4 Kingdom Odyssey',
    slug: 'mustang',
    progress: 35,
    lastEdited: '3 days ago',
    statusSummary: 'Permit Application Drafted · Route Selected',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'draft-ebc',
    title: 'Everest View & Sherpa Heritage Trek',
    slug: 'everest',
    progress: 80,
    lastEdited: '5 days ago',
    statusSummary: 'Lukla Flights Confirmed · Guide Assigned',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop',
  },
];

export interface RecommendedDestination {
  id: string;
  name: string;
  slug: string;
  region: string;
  category: 'High Altitude' | 'Heritage' | 'Wildlife' | 'Scenic' | 'Hidden Gem';
  duration: string;
  description: string;
  elevation: string;
  imageUrl: string;
}

export const RECOMMENDED_DESTINATIONS: RecommendedDestination[] = [
  {
    id: 'rec-mustang',
    name: 'Upper Mustang (Kingdom of Lo)',
    slug: 'mustang',
    region: 'Dhaulagiri · Gandaki',
    category: 'Heritage',
    duration: '5–10 Days',
    description: 'A rain-shadow desert of ochre cliffs, cave dwellings carved thousands of years ago, and fortified medieval palaces.',
    elevation: '3,840m',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-rara',
    name: 'Rara Lake Alpine Sanctuary',
    slug: 'rara',
    region: 'Mugu · Karnali',
    category: 'Hidden Gem',
    duration: '4–7 Days',
    description: 'Nepal’s deepest high-altitude azure lake, surrounded by silent blue pine forests and snow-capped Himalayan ridges.',
    elevation: '2,990m',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-everest',
    name: 'Everest Khumbu Gateway',
    slug: 'everest',
    region: 'Solukhumbu · Koshi',
    category: 'High Altitude',
    duration: '12–16 Days',
    description: 'The roof of the world, home to towering Himalayan giants, ancient Sherpa monasteries, and trails walked by legends.',
    elevation: '5,364m Base Camp',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-chitwan',
    name: 'Chitwan Subtropical Wildlands',
    slug: 'chitwan',
    region: 'Chitwan · Bagmati',
    category: 'Wildlife',
    duration: '3–4 Days',
    description: 'Dense subtropical sal forests where endangered one-horned rhinos roam free and Bengal tigers stalk riverbanks.',
    elevation: '150m Terai',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=800&auto=format&fit=crop',
  },
];

export interface BookingItem {
  id: string;
  ref: string;
  type: 'Hotel' | 'Flight' | 'Guide' | 'Activity';
  title: string;
  provider: string;
  destination: string;
  date: string;
  status: 'Confirmed' | 'Upcoming' | 'Pending';
  cost: string;
}

export const RECENT_BOOKINGS: BookingItem[] = [
  {
    id: 'bk-01',
    ref: 'BK-EBC-8941',
    type: 'Hotel',
    title: 'Sagarmatha View Lodge & Spa',
    provider: 'Luxury Mountain Stays',
    destination: 'Namche Bazaar, Everest',
    date: '13 Dec – 16 Dec 2026',
    status: 'Confirmed',
    cost: '$180 / night',
  },
  {
    id: 'bk-02',
    ref: 'FL-TARA-220',
    type: 'Flight',
    title: 'Kathmandu (KTM) ➔ Lukla (LUA)',
    provider: 'Tara Air · Twin Otter',
    destination: 'Tribhuvan Int. Airport',
    date: '12 Dec 2026 · 06:45 AM',
    status: 'Confirmed',
    cost: '$210 / seat',
  },
  {
    id: 'bk-03',
    ref: 'GD-NMA-402',
    type: 'Guide',
    title: 'UIAGM Certified Mountain Guide',
    provider: 'Nima Dorjee Sherpa (IFMGA)',
    destination: 'Annapurna Sanctuary Loop',
    date: '12 Dec – 19 Dec 2026',
    status: 'Confirmed',
    cost: '$55 / day',
  },
  {
    id: 'bk-04',
    ref: 'ACT-PKR-118',
    type: 'Activity',
    title: 'Sarangkot Sunrise Paragliding',
    provider: 'Pokhara Sky Adventures',
    destination: 'Phewa Lake Landing',
    date: '26 Dec 2026 · 08:30 AM',
    status: 'Upcoming',
    cost: '$85 / person',
  },
];

export interface ActivityLogItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  timestamp: string;
  badge: string;
}

export const RECENT_ACTIVITY_LOG: ActivityLogItem[] = [
  {
    id: 'act-1',
    icon: '🏨',
    title: 'Lodging Confirmed',
    description: 'Sagarmatha View Lodge room confirmed for 13–16 December in Namche Bazaar.',
    timestamp: '2 hours ago',
    badge: 'Confirmed',
  },
  {
    id: 'act-2',
    icon: '🗺️',
    title: 'Draft Itinerary Updated',
    description: 'Added Poon Hill sunrise checkpoint to your Annapurna Sanctuary itinerary.',
    timestamp: 'Yesterday',
    badge: 'Planning',
  },
  {
    id: 'act-3',
    icon: '📄',
    title: 'Permit Verification Issued',
    description: 'ACAP Conservation Permit (PRM-2026-081) officially endorsed by Nepal Tourism Board.',
    timestamp: '2 days ago',
    badge: 'Permits',
  },
  {
    id: 'act-4',
    icon: '❤️',
    title: 'Destination Bookmarked',
    description: 'Saved Rara Lake Alpine Sanctuary to your personal Himalayan wishlist.',
    timestamp: '3 days ago',
    badge: 'Wishlist',
  },
];

export interface WishlistItem {
  id: string;
  name: string;
  slug: string;
  location: string;
  category: string;
  imageUrl: string;
}

export const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 'w-mustang',
    name: 'Upper Mustang',
    slug: 'mustang',
    location: 'Gandaki Province',
    category: 'Ancient Kingdom',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'w-rara',
    name: 'Rara Lake',
    slug: 'rara',
    location: 'Karnali Province',
    category: 'Alpine Lake',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'w-boudha',
    name: 'Boudhanath Stupa',
    slug: 'kathmandu',
    location: 'Kathmandu Valley',
    category: 'UNESCO Sacred Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'w-chitwan',
    name: 'Chitwan Jungle',
    slug: 'chitwan',
    location: 'Bagmati Province',
    category: 'Wildlife & Safari',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=400&auto=format&fit=crop',
  },
];
