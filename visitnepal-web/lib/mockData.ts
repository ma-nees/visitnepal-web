// ─── VISIT NEPAL: CENTRALIZED MOCK DATA STORE ───────────────────────────────
// This file serves as the single source of truth for all mock content across the
// website, including destinations, curated experiences, editorial story moments,
// and travel guidance.

export interface Destination {
  id: string;
  name: string;
  slug: string;
  region: string;
  altitude: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  highlights: string[];
  bestSeason: string;
  category: 'mountains' | 'culture' | 'wildlife';
  featured?: boolean;
}

export interface Experience {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  category: string;
  highlights: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging' | 'Extreme';
  duration: string;
}

export interface StoryMoment {
  id: string;
  tag: string;
  title: string;
  text: string;
  imageUrl: string;
  stat: string;
  statLabel: string;
}

// ─── 1. COMPREHENSIVE DESTINATIONS MOCK DATA (16 Iconic Regions) ─────────────
export const destinations: Destination[] = [
  {
    id: 'everest',
    name: 'Everest Region (Khumbu)',
    slug: 'everest-region',
    region: 'Solukhumbu',
    altitude: '5,364m Base Camp · 8,848m Summit',
    category: 'mountains',
    shortDescription: 'The roof of the world, home to towering Himalayan giants, ancient Sherpa monasteries, and trails walked by legends.',
    description: 'An iconic alpine sanctuary dominated by Mount Everest (Sagarmatha), Lhotse, and Ama Dablam. Trek through Namche Bazaar, cross suspension bridges adorned with prayer flags, and witness sunrise over the highest peaks on Earth.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1600&auto=format&fit=crop',
    highlights: ['Everest Base Camp', 'Kala Patthar Sunrise', 'Tengboche Monastery', 'Namche Bazaar'],
    bestSeason: 'Oct–Dec & Mar–May',
    featured: true,
  },
  {
    id: 'annapurna',
    name: 'Annapurna Sanctuary',
    slug: 'annapurna',
    region: 'Gandaki',
    altitude: '4,130m Base Camp',
    category: 'mountains',
    shortDescription: 'A colossal natural amphitheater encircled by twelve snow-clad giants rising above 7,000 meters.',
    description: 'A trekking paradise winding from lush subtropical rhododendron forests into high glacial basins enclosed by Annapurna I and Machhapuchhre (Fishtail Peak).',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Poon Hill Panorama', 'Machhapuchhre Views', 'Jhinu Danda Hot Springs'],
    bestSeason: 'Oct–Nov & Mar–Apr',
    featured: true,
  },
  {
    id: 'mustang',
    name: 'Upper Mustang',
    slug: 'mustang',
    region: 'Dhaulagiri',
    altitude: '3,840m (Lo Manthang)',
    category: 'culture',
    shortDescription: 'The mythical forbidden Kingdom of Lo — dramatic wind-carved canyons, sacred caves, and preserved Tibetan heritage.',
    description: 'A rain-shadow desert of ochre cliffs, cave dwellings carved thousands of years ago, and fortified medieval palaces in the walled city of Lo Manthang.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Walled City of Lo Manthang', 'Sky Caves of Chhoser', 'Tiji Festival', 'Kali Gandaki Gorge'],
    bestSeason: 'May–Oct (Rain Shadow)',
    featured: true,
  },
  {
    id: 'kathmandu',
    name: 'Kathmandu Valley',
    slug: 'kathmandu',
    region: 'Bagmati',
    altitude: '1,400m',
    category: 'culture',
    shortDescription: 'An open-air museum of seven UNESCO World Heritage sites, pagoda temples, and living Newari traditions.',
    description: 'The cultural heartbeat of Nepal where sacred chants echo through courtyards of Patan, Bhaktapur, and Kathmandu Durbar Squares under the watchful eyes of Boudhanath and Swayambhunath.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Boudhanath Stupa', 'Bhaktapur Durbar Square', 'Pashupatinath', 'Patan Museum'],
    bestSeason: 'Sep–May',
    featured: false,
  },
  {
    id: 'pokhara',
    name: 'Pokhara & Phewa Lake',
    slug: 'pokhara',
    region: 'Kaski',
    altitude: '822m',
    category: 'wildlife',
    shortDescription: 'Serene lakeside tranquility beneath the dramatic shadow of the Annapurna and Machhapuchhre ranges.',
    description: 'Nepal’s premier leisure and adventure capital — watch the reflection of snow peaks in Phewa Lake, paraglide over Sarangkot, and explore serene caves and cascades.',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Phewa Lake Boating', 'Sarangkot Sunrise', 'World Peace Pagoda', 'Paragliding'],
    bestSeason: 'Sep–Jun',
    featured: false,
  },
  {
    id: 'chitwan',
    name: 'Chitwan National Park',
    slug: 'chitwan',
    region: 'Terai Lowlands',
    altitude: '150m',
    category: 'wildlife',
    shortDescription: 'Dense subtropical jungle alive with the Greater One-horned Rhinoceros and elusive Royal Bengal Tigers.',
    description: 'A pristine UNESCO biosphere along the Rapti River. Drift in wooden dugout canoes, track wildlife on foot with veteran naturalists, and experience indigenous Tharu culture.',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',
    highlights: ['One-Horned Rhino Safaris', 'Birdwatching (540+ species)', 'Canoe River Drifts', 'Tharu Villages'],
    bestSeason: 'Oct–Mar',
    featured: false,
  },
  {
    id: 'lumbini',
    name: 'Lumbini Sacred Garden',
    slug: 'lumbini',
    region: 'Rupandehi',
    altitude: '150m',
    category: 'culture',
    shortDescription: 'The birthplace of Lord Buddha and universal sanctuary of global peace and spiritual meditation.',
    description: 'A deeply peaceful spiritual retreat centered around the Maya Devi Temple, the 3rd-century BC Ashoka Pillar, and serene monasteries built by Buddhist nations from across the world.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Maya Devi Temple', 'Ashokan Pillar', 'World Peace Pagoda', 'International Monasteries'],
    bestSeason: 'Oct–Apr',
    featured: false,
  },
  {
    id: 'rara',
    name: 'Rara Lake (Blue Queen of the Hills)',
    slug: 'rara-lake',
    region: 'Mugu · Karnali',
    altitude: '2,990m',
    category: 'wildlife',
    shortDescription: 'Nepal’s largest alpine lake, a glistening sapphire jewel framed by pristine pine forests and snow ridges.',
    description: 'A remote wilderness sanctuary where silence is absolute. Ride horses along tranquil flower-filled shorelines, camp beneath Milky Way skies, and observe migratory aquatic birds.',
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Murma Top Panorama', 'Horseback Lake Trails', 'Otter & Trout Spotting', 'Stargazing Camp'],
    bestSeason: 'Apr–Jun & Sep–Nov',
    featured: false,
  },
  {
    id: 'langtang',
    name: 'Langtang Sacred Valley',
    slug: 'langtang-valley',
    region: 'Rasuwa',
    altitude: '3,870m (Kyanjin Gompa)',
    category: 'mountains',
    shortDescription: 'The Valley of Glaciers: yak pastures, cheese dairies, and soaring peaks on the ancient trade route to Tibet.',
    description: 'One of Nepal’s closest alpine trekking routes to Kathmandu, rebuilt with courage and heart. Savor artisanal yak cheese at Kyanjin Gompa and hike Kyanjin Ri for 360° glacier vistas.',
    imageUrl: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Kyanjin Gompa Yak Dairy', 'Kyanjin Ri (4,773m)', 'Langtang Lirung Glacier', 'Tamang Heritage'],
    bestSeason: 'Mar–May & Oct–Nov',
    featured: false,
  },
  {
    id: 'bardia',
    name: 'Bardia National Park',
    slug: 'bardia-national-park',
    region: 'Bardia · Terai',
    altitude: '152m',
    category: 'wildlife',
    shortDescription: 'Nepal’s untamed western frontier, celebrated for the highest density of wild Royal Bengal Tigers in Asia.',
    description: 'Far less crowded than Chitwan, Bardia offers true wilderness tracking. Walk silently through sal forests, wait at riverbanks for wild elephant herds, and look for freshwater Gangetic dolphins.',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Wild Bengal Tiger Tracking', 'Wild Asian Elephants', 'Karnali River Rafting', 'Gangetic Dolphins'],
    bestSeason: 'Oct–Apr',
    featured: false,
  },
  {
    id: 'phoksundo',
    name: 'Shey Phoksundo & Dolpo',
    slug: 'shey-phoksundo',
    region: 'Dolpa · Karnali',
    altitude: '3,611m',
    category: 'wildlife',
    shortDescription: 'The deep turquoise gem of western Nepal, bordered by ancient Bon monasteries and snow leopard territory.',
    description: 'Renowned for its surreal color that shifts from emerald to aquamarine, Shey Phoksundo is free of any aquatic life, preserving mirrored reflections of high snow spires in absolute stillness.',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Ringmo Village & Gompa', 'Suligad Waterfall (167m)', 'Snow Leopard Territory', 'Bon Heritage'],
    bestSeason: 'May–Oct',
    featured: false,
  },
  {
    id: 'manaslu',
    name: 'Manaslu Circuit (Mountain of the Spirit)',
    slug: 'manaslu-circuit',
    region: 'Gorkha',
    altitude: '5,160m (Larkya La)',
    category: 'mountains',
    shortDescription: 'A classic off-the-beaten-path tea house circuit tracing ancient salt trade passes around the world’s 8th highest peak.',
    description: 'Circumnavigate Mt. Manaslu (8,163m) across hanging suspension bridges, cascading waterfalls, and through remote Tibetan Buddhist settlements leading up to the Larkya La pass.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Larkya La Pass (5,160m)', 'Birendra Lake', 'Pungyen Gompa', 'Tsum Valley Extension'],
    bestSeason: 'Mar–May & Sep–Nov',
    featured: false,
  },
  {
    id: 'gosaikunda',
    name: 'Gosaikunda Sacred Lakes',
    slug: 'gosaikunda',
    region: 'Rasuwa',
    altitude: '4,380m',
    category: 'mountains',
    shortDescription: 'High-altitude holy alpine glacial lakes revered in Hindu mythology as the meditation abode of Lord Shiva.',
    description: 'Perched high in Langtang National Park, these crystal glacial lakes freeze into pristine silver mirrors in winter and draw thousands of pilgrims during the Janai Purnima festival in August.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Bhairab Kunda & Saraswati Kunda', 'Laurebina Pass (4,610m)', 'Ganesh Himal Views', 'Sacred Bathing'],
    bestSeason: 'Apr–Jun & Sep–Nov',
    featured: false,
  },
  {
    id: 'janakpur',
    name: 'Janakpurdham (Mithila Heritage)',
    slug: 'janakpurdham',
    region: 'Dhanusha · Madhesh',
    altitude: '74m',
    category: 'culture',
    shortDescription: 'The city of ponds, home to the breathtaking Janaki Mandir palace temple and vibrant Mithila folk art.',
    description: 'An ancient kingdom steeped in the Ramayana epic. Marvel at the marble Mughal-Rajput architecture of Janaki Temple, explore colorful village mud-wall paintings, and ride the historic Nepal Railway.',
    imageUrl: 'https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Janaki Mandir Palace', 'Mithila Folk Painting Art', 'Sacred Ganga Sagar Pond', 'Vivah Panchami'],
    bestSeason: 'Oct–Mar',
    featured: false,
  },
  {
    id: 'ilam',
    name: 'Ilam Misty Tea Gardens',
    slug: 'ilam-tea-gardens',
    region: 'Ilam · Koshi',
    altitude: '1,677m',
    category: 'wildlife',
    shortDescription: 'Endless rolling emerald slopes draped in mountain fog, producing the world’s most aromatic orthodox Himalayan tea.',
    description: 'Eastern Nepal’s green sanctuary where gentle hills roll into the clouds. Visit historic tea processing factories dating back to 1863, watch the Kanchenjunga sunrise from Antu Danda, and stay in cozy farmsteads.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Kanyam Tea Estate', 'Antu Danda Sunrise', 'Mai Pokhari Wetland', 'Orthodox Tea Tasting'],
    bestSeason: 'Mar–Jun & Oct–Dec',
    featured: false,
  },
  {
    id: 'bandipur',
    name: 'Bandipur Living Ridge Settlement',
    slug: 'bandipur',
    region: 'Tanahun · Gandaki',
    altitude: '1,030m',
    category: 'culture',
    shortDescription: 'A pedestrianized hill citadel preserving 18th-century Newari architecture and sweeping Himalayan vistas.',
    description: 'A beautifully preserved trading post on a saddle ridge between Kathmandu and Pokhara. Vehicle-free cobblestone streets, slate-roofed merchant mansions, and viewpoints facing the Manaslu and Dhaulagiri ranges.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Vehicle-Free Historic Bazaar', 'Thani Mai Hilltop Sunset', 'Siddha Cave (Largest in Nepal)', 'Silkworm Farm'],
    bestSeason: 'Oct–May',
    featured: false,
  },
];

export const featuredDestinations = destinations.filter(d => d.featured);
export const otherDestinations = destinations.filter(d => !d.featured);

// ─── 2. CURATED EXPERIENCES MOCK DATA ─────────────────────────────────────────
export const experiences: Experience[] = [
  {
    id: 'trekking',
    name: 'Trekking & Alpine Trails',
    subtitle: 'Footpaths Through the Heavens',
    description: 'Traverse timeless routes through blossoming rhododendron sanctuaries, colossal high-altitude passes, and hospitable Sherpa teahouse communities where kindness is sacred.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    category: 'Alpine Discovery',
    highlights: ['Everest Base Camp', 'Annapurna Circuit', 'Manaslu Wilderness', 'Langtang Sacred Valley'],
    difficulty: 'Moderate',
    duration: '5–18 days',
  },
  {
    id: 'mountaineering',
    name: 'Himalayan Mountaineering',
    subtitle: 'Summits Above the Clouds',
    description: 'Challenge the pinnacles of our planet alongside certified UIAGM/IFMGA Sherpa masters, equipped with state-of-the-art oxygen logistics and disciplined acclimatization.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    category: 'High Altitude',
    highlights: ['Ama Dablam (6,812m)', 'Island Peak (6,189m)', 'Mera Peak (6,476m)', 'Mt. Everest Summit'],
    difficulty: 'Extreme',
    duration: '14–60 days',
  },
  {
    id: 'cultural',
    name: 'Cultural Journeys',
    subtitle: 'Centuries of Living Heritage',
    description: 'Immerse your spirit in breathing ancient traditions — from Newari stone architecture and wood carving courtyards to sacred Vedic rituals along holy riverbanks.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    category: 'Heritage & Arts',
    highlights: ['Kathmandu Durbar Square', 'Bhaktapur Medieval Square', 'Patan Golden Temple', 'Panauti Heritage Walk'],
    difficulty: 'Easy',
    duration: '3–10 days',
  },
  {
    id: 'spiritual',
    name: 'Spiritual Retreats',
    subtitle: 'Sacred Silence & Meditation',
    description: 'Discover transcendent tranquility at the birthplace of Lord Buddha in Lumbini, meditate inside thousand-year-old cliff caves, and practice mindfulness with resident lamas.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    category: 'Spiritual Wellness',
    highlights: ['Lumbini Sacred Garden', 'Kopan Monastery', 'Namo Buddha Stupa', 'Pharping Guru Rinpoche Caves'],
    difficulty: 'Easy',
    duration: '3–14 days',
  },
  {
    id: 'wildlife',
    name: 'Subtropical Wildlife & Safari',
    subtitle: 'Realm of the Bengal Tiger',
    description: 'Track Greater One-horned Rhinoceros on guided foot safaris, navigate tranquil jungle rivers among marsh crocodiles, and spot Bengal tigers within pristine Terai national reserves.',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',
    category: 'Jungle & Safari',
    highlights: ['Chitwan National Park', 'Bardia Untamed Reserve', 'Koshi Tappu Wetlands', 'Dugout River Canoeing'],
    difficulty: 'Easy',
    duration: '3–7 days',
  },
  {
    id: 'adventure',
    name: 'High-Adrenaline Adventure',
    subtitle: 'Sky, Water & Gravity',
    description: 'Soar like a raptor on tandem paragliders above Phewa Lake, raft the tempestuous glacial rapids of the Bhote Koshi, or plunge from the world’s highest suspension bungee platforms.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&auto=format&fit=crop',
    category: 'Extreme Adventure',
    highlights: ['Pokhara Paragliding', 'Trishuli & Sun Koshi Rafting', 'The Last Resort Bungee', 'Zip-Flyer Sarangkot'],
    difficulty: 'Moderate',
    duration: '1–5 days',
  },
  {
    id: 'food',
    name: 'Food & Culinary Traditions',
    subtitle: 'A Feast of Himalayan Spices',
    description: 'Master hand-pinched steamed momo alongside Newari home chefs, relish steaming plates of traditional organic dal bhat, and savor highland yak cheeses and salt-butter tea.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1200&auto=format&fit=crop',
    category: 'Gastronomy',
    highlights: ['Kathmandu Street Food Walks', 'Newari Culinary Masterclasses', 'Tea Plantation Tastings', 'Organic Homestay Dining'],
    difficulty: 'Easy',
    duration: '1–7 days',
  },
  {
    id: 'roadtrips',
    name: 'Scenic Himalayan Road Trips',
    subtitle: 'Crossroads of the Ancient Silk Roads',
    description: 'Traverse winding mountain highways carving deep gorges between dramatic peaks, from Kathmandu’s lush hill crests to the high arid plateaus of the Tibetan border.',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop',
    category: 'Overland Exploration',
    highlights: ['Prithvi Highway Odyssey', 'Upper Mustang 4x4 Trail', 'B.P. Koirala Highway', 'Rara Lake Off-Road Drive'],
    difficulty: 'Easy',
    duration: '3–10 days',
  },
];

// ─── 3. STORY MOMENTS (Editorial Narrative Cards) ─────────────────────────────
export const storyMoments: StoryMoment[] = [
  {
    id: 'peaks',
    tag: 'Crown of the Earth',
    title: 'Eight Summits Above Eight Thousand Meters',
    text: 'Nepal cradles eight of the fourteen highest peaks on Earth. Stand at Kala Patthar as the first amber ray pierces Everest, or gaze across Pokhara at Machhapuchhre reflected in the still waters of Phewa Lake.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1200&auto=format&fit=crop',
    stat: '8 of 14',
    statLabel: 'World’s 8,000m Giants',
  },
  {
    id: 'monasteries',
    tag: 'Living Antiquity',
    title: 'Monasteries Whispering Through Morning Mist',
    text: 'Listen to copper horns echoing across high alpine valleys as butter lamps flicker at Tengboche. In ancient courtyards of Patan and Bhaktapur, living traditions remain woven into daily prayer and artisan craft.',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop',
    stat: '7 UNESCO',
    statLabel: 'Valley Heritage Sites',
  },
  {
    id: 'wildlands',
    tag: 'Subtropical Wilderness',
    title: 'From Glacial Summits to Rhino Sanctuaries',
    text: 'Within barely two hundred kilometers, Nepal cascades from the highest frozen ridges to the dense jungles of Chitwan and Bardia, where one-horned rhinos graze and elusive Bengal tigers tread softly.',
    imageUrl: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?q=80&w=1200&auto=format&fit=crop',
    stat: '12 National Parks',
    statLabel: 'Protected Sanctuaries',
  },
  {
    id: 'people',
    tag: 'Sacred Warmth',
    title: 'Atithi Devo Bhava — The Guest is God',
    text: 'It is the smile of a Sherpa host offering steaming ginger tea after a snow pass, the rhythmic chanting of Newari woodworkers, and the quiet dignity of village elders that transforms a journey into a homecoming.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    stat: '125+',
    statLabel: 'Ethnic Communities',
  },
];
