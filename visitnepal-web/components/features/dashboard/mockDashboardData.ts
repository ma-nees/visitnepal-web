// ─── VISIT NEPAL: EXPANDED DASHBOARD HOME MOCK DATA ───────────────────────────
// Fully populated, authentic Nepal travel mock data for the traveler dashboard.
// Covers trips, itineraries, bookings, recommendations, wishlists, and activity logs.

export interface UpcomingTrip {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  dates: string;
  duration: string;
  type: string;
  category: 'Alpine' | 'Scenic' | 'Safari';
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
    category: 'Alpine',
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
    category: 'Scenic',
    status: 'Confirmed',
    elevation: '822m',
    countdown: 'In 34 Days',
    imageUrl: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Phewa Sunrise Cruise', 'Sarangkot Paragliding', 'World Peace Pagoda'],
    bookingRef: 'BK-PKR-1184',
  },
  {
    id: 'trip-gokyo-2027',
    title: 'Everest Three Passes & Gokyo Ri',
    slug: 'everest',
    subtitle: 'Epic high-altitude circuit over Renjo La, Cho La, and Kongma La passes',
    dates: '10 Jan – 26 Jan 2027',
    duration: '17 Days',
    type: 'Extreme High Altitude',
    category: 'Alpine',
    status: 'Confirmed',
    elevation: '5,357m',
    countdown: 'In 50 Days',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Gokyo Turquoise Lakes', 'Kala Patthar Vista', 'Ngozumpa Glacier', 'Tengboche Monastery'],
    bookingRef: 'EXP-EBC-7721',
  },
  {
    id: 'trip-langtang-2027',
    title: 'Langtang Valley & Gosainkunda Lakes',
    slug: 'kathmandu',
    subtitle: 'Sacred high alpine glacial lakes and preserved Tamang heritage villages',
    dates: '04 Feb – 14 Feb 2027',
    duration: '11 Days',
    type: 'Cultural & Alpine Trek',
    category: 'Alpine',
    status: 'Upcoming',
    elevation: '4,380m',
    countdown: 'In 75 Days',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Kyanjin Gompa', 'Holy Gosainkunda Lake', 'Tamang Heritage Trail', 'Yak Cheese Factory'],
    bookingRef: 'EXP-LTG-3319',
  },
  {
    id: 'trip-bardia-2027',
    title: 'Bardia & Chitwan Untamed Safari',
    slug: 'chitwan',
    subtitle: 'Deep subtropical wilderness foot-tracking wild Royal Bengal Tigers',
    dates: '02 Mar – 08 Mar 2027',
    duration: '7 Days',
    type: 'Jungle & Wildlife Safari',
    category: 'Safari',
    status: 'Upcoming',
    elevation: '150m',
    countdown: 'In 101 Days',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Karnali River Raft Safari', 'Foot Tiger Tracking', 'Tharu Cultural Night', 'Crocodile Breeding Center'],
    bookingRef: 'SAF-BD-5041',
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
  {
    id: 'draft-manaslu',
    title: 'Manaslu Circuit Remote Wilderness',
    slug: 'annapurna',
    progress: 50,
    lastEdited: '1 week ago',
    statusSummary: 'Larkya La Pass Selected · 2 Checkpoints Remaining',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'draft-rara-road',
    title: 'Rara Lake & Sinja Valley Road Trip',
    slug: 'rara',
    progress: 25,
    lastEdited: '2 weeks ago',
    statusSummary: 'Karnali Highway Route Mapped · 4x4 Vehicle Reserved',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'draft-helambu',
    title: 'Helambu Organic Homestay Trail',
    slug: 'kathmandu',
    progress: 90,
    lastEdited: '3 weeks ago',
    statusSummary: 'Homestays Confirmed · Awaiting Weather Window',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
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
  {
    id: 'rec-bandipur',
    name: 'Bandipur Preserved Hilltown',
    slug: 'bandipur',
    region: 'Tanahun · Gandaki',
    category: 'Heritage',
    duration: '2–3 Days',
    description: 'A living museum of 18th-century Newari architecture, slate courtyards, and sweeping Himalayan panoramas without vehicle noise.',
    elevation: '1,030m',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-ilam',
    name: 'Ilam Rolling Tea Highlands',
    slug: 'ilam',
    region: 'Ilam · Koshi',
    category: 'Scenic',
    duration: '3–5 Days',
    description: 'Verdant terraced tea gardens shrouded in morning mists, organic orthodox tea estates, and views of Mount Kanchenjunga.',
    elevation: '1,673m',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-phoksundo',
    name: 'Shey Phoksundo Deep Turquoise Lake',
    slug: 'phoksundo',
    region: 'Dolpo · Karnali',
    category: 'Hidden Gem',
    duration: '8–14 Days',
    description: 'An ethereal turquoise jewel nestled inside jagged cliffs in the mystical trans-Himalayan Bon-Buddhist kingdom of Upper Dolpo.',
    elevation: '3,611m',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-ghandruk',
    name: 'Ghandruk Gurung Stone Village',
    slug: 'ghandruk',
    region: 'Kaski · Gandaki',
    category: 'Heritage',
    duration: '2–4 Days',
    description: 'A traditional Gurung settlement built of cut stone, famous for traditional slate-roofed homestays beneath Annapurna South.',
    elevation: '1,940m',
    imageUrl: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-tsho-rolpa',
    name: 'Tsho Rolpa Glacial Lake & Rolwaling',
    slug: 'tsho-rolpa',
    region: 'Dolakha · Bagmati',
    category: 'High Altitude',
    duration: '7–10 Days',
    description: 'One of the largest glacial moraine lakes in the Himalayas, framed by the intimidating sheer granite faces of Gauri Shankar.',
    elevation: '4,580m',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-khaptad',
    name: 'Khaptad National Park & Meditation Meadows',
    slug: 'khaptad',
    region: 'Doti / Achham · Sudurpashchim',
    category: 'Hidden Gem',
    duration: '5–8 Days',
    description: 'Rolling green alpine meadows, moorlands, and ancient sacred hermitage trails in remote western Nepal.',
    elevation: '3,100m',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-bardia',
    name: 'Bardia National Park (Tiger Haven)',
    slug: 'bardia',
    region: 'Bardiya · Lumbini',
    category: 'Wildlife',
    duration: '4–6 Days',
    description: 'The largest undisturbed wilderness in the Terai, renowned for premier walking safaris and exceptional Royal Bengal Tiger sightings.',
    elevation: '152m',
    imageUrl: 'https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'rec-janakpur',
    name: 'Janakpur Mithila Palace of Sita',
    slug: 'janakpur',
    region: 'Dhanusha · Madhesh',
    category: 'Heritage',
    duration: '2–3 Days',
    description: 'The majestic marble Janaki Mandir palace, vibrant Mithila folk art courtyards, and hundreds of sacred pilgrimage ponds.',
    elevation: '74m Terai',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop',
  },
];

export interface BookingItem {
  id: string;
  ref: string;
  type: 'Hotel' | 'Flight' | 'Guide' | 'Activity' | 'Permit';
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
  {
    id: 'bk-05',
    ref: 'BK-DWR-5510',
    type: 'Hotel',
    title: "The Dwarika's Heritage Hotel & Spa",
    provider: 'Heritage Hospitality Nepal',
    destination: 'Battisputali, Kathmandu',
    date: '10 Dec – 12 Dec 2026',
    status: 'Confirmed',
    cost: '$320 / night',
  },
  {
    id: 'bk-06',
    ref: 'FL-SMT-812',
    type: 'Flight',
    title: 'Pokhara (PKR) ➔ Jomsom (JMO)',
    provider: 'Summit Air · LET L-410',
    destination: 'Kali Gandaki River Valley',
    date: '29 Dec 2026 · 07:15 AM',
    status: 'Upcoming',
    cost: '$145 / seat',
  },
  {
    id: 'bk-07',
    ref: 'BK-BRH-901',
    type: 'Hotel',
    title: 'Barahi Jungle Safari Lodge',
    provider: 'Eco Heritage Resorts',
    destination: 'Meghauli, Chitwan Buffer',
    date: '02 Mar – 05 Mar 2027',
    status: 'Upcoming',
    cost: '$240 / night',
  },
  {
    id: 'bk-08',
    ref: 'ACT-BHT-640',
    type: 'Activity',
    title: 'Bhote Koshi Grade IV White Water Rafting',
    provider: 'The Last Resort Nepal',
    destination: 'Araniko Highway Gorge',
    date: '18 Dec 2026 · 09:00 AM',
    status: 'Confirmed',
    cost: '$95 / person',
  },
  {
    id: 'bk-09',
    ref: 'GD-NAT-119',
    type: 'Guide',
    title: 'Master Naturalist & Tiger Tracker',
    provider: 'Ram Tharu (Bardia Wildlife Guide)',
    destination: 'Bardia National Park Core',
    date: '03 Mar – 07 Mar 2027',
    status: 'Pending',
    cost: '$40 / day',
  },
  {
    id: 'bk-10',
    ref: 'PRM-NTB-081',
    type: 'Permit',
    title: 'ACAP Conservation & TIMS National Permit',
    provider: 'Nepal Tourism Board (NTB)',
    destination: 'Annapurna Protected Zone',
    date: 'Valid Dec 2026 – Jan 2027',
    status: 'Confirmed',
    cost: '$50 total',
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
    icon: 'hotel',
    title: 'Lodging Confirmed',
    description: 'Sagarmatha View Lodge room confirmed for 13–16 December in Namche Bazaar.',
    timestamp: '2 hours ago',
    badge: 'Confirmed',
  },
  {
    id: 'act-2',
    icon: 'map',
    title: 'Draft Itinerary Updated',
    description: 'Added Poon Hill sunrise checkpoint to your Annapurna Sanctuary itinerary.',
    timestamp: 'Yesterday',
    badge: 'Planning',
  },
  {
    id: 'act-3',
    icon: 'file-check',
    title: 'Permit Verification Issued',
    description: 'ACAP Conservation Permit (PRM-2026-081) officially endorsed by Nepal Tourism Board.',
    timestamp: '2 days ago',
    badge: 'Permits',
  },
  {
    id: 'act-4',
    icon: 'heart',
    title: 'Destination Bookmarked',
    description: 'Saved Rara Lake Alpine Sanctuary to your personal Himalayan wishlist.',
    timestamp: '3 days ago',
    badge: 'Wishlist',
  },
  {
    id: 'act-5',
    icon: 'plane',
    title: 'Flight Tickets Confirmed',
    description: 'Tara Air KTM ➔ LUA morning flight e-ticket confirmed (Ref: FL-TARA-220).',
    timestamp: '4 days ago',
    badge: 'Transport',
  },
  {
    id: 'act-6',
    icon: 'user-check',
    title: 'Guide Assignment Approved',
    description: 'Nima Dorjee Sherpa (IFMGA / UIAGM certified) assigned to your Annapurna expedition.',
    timestamp: '5 days ago',
    badge: 'Guide',
  },
  {
    id: 'act-7',
    icon: 'mountain',
    title: 'Adventure Activity Booked',
    description: 'Sarangkot Sunrise Tandem Paragliding voucher generated for 26 December in Pokhara.',
    timestamp: '1 week ago',
    badge: 'Activity',
  },
  {
    id: 'act-8',
    icon: 'shield-check',
    title: 'Gear Checklist Validated',
    description: 'Sherpa AI reviewed your high-altitude winter gear list with zero warnings.',
    timestamp: '1 week ago',
    badge: 'Gear',
  },
  {
    id: 'act-9',
    icon: 'hotel',
    title: 'Luxury Heritage Stay Reserved',
    description: "The Dwarika's Hotel heritage courtyard suite reserved for Kathmandu arrival.",
    timestamp: '2 weeks ago',
    badge: 'Confirmed',
  },
  {
    id: 'act-10',
    icon: 'map',
    title: 'New Journey Draft Initiated',
    description: 'Created Langtang Valley & Sacred Gosainkunda Lakes expedition draft.',
    timestamp: '2 weeks ago',
    badge: 'Planning',
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
  {
    id: 'w-phoksundo',
    name: 'Shey Phoksundo Lake',
    slug: 'phoksundo',
    location: 'Dolpo · Karnali',
    category: 'Turquoise Gem',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'w-bandipur',
    name: 'Bandipur Hilltown',
    slug: 'bandipur',
    location: 'Tanahun · Gandaki',
    category: 'Newari Architecture',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'w-tsho-rolpa',
    name: 'Tsho Rolpa Glacier',
    slug: 'tsho-rolpa',
    location: 'Dolakha · Bagmati',
    category: 'High Altitude Glacial',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=400&auto=format&fit=crop',
  },
  {
    id: 'w-ilam',
    name: 'Ilam Tea Highlands',
    slug: 'ilam',
    location: 'Ilam · Koshi',
    category: 'Emerald Tea Gardens',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=400&auto=format&fit=crop',
  },
];
