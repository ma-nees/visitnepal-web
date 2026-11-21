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
  featured?: boolean;
}

export const destinations: Destination[] = [
  {
    id: 'everest',
    name: 'Everest Region (Khumbu)',
    slug: 'everest-region',
    region: 'Solukhumbu',
    altitude: '5,364m Base Camp · 8,848m Summit',
    shortDescription: 'The roof of the world, home to towering Himalayan giants, ancient Sherpa monasteries, and trails walked by legends.',
    description: 'An iconic alpine sanctuary dominated by Mount Everest (Sagarmatha), Lhotse, and Ama Dablam. Trek through Namche Bazaar, cross suspension bridges adorned with prayer flags, and witness the sunrise over the highest peaks on Earth.',
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
    shortDescription: 'The birthplace of Lord Buddha and universal sanctuary of global peace and spiritual meditation.',
    description: 'A deeply peaceful spiritual retreat centered around the Maya Devi Temple, the 3rd-century BC Ashoka Pillar, and serene monasteries built by Buddhist nations from across the world.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    highlights: ['Maya Devi Temple', 'Ashokan Pillar', 'World Peace Pagoda', 'International Monasteries'],
    bestSeason: 'Oct–Apr',
    featured: false,
  },
];

export const featuredDestinations = destinations.filter(d => d.featured);
export const otherDestinations = destinations.filter(d => !d.featured);
