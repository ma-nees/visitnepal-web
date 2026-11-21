export interface ItineraryDay {
  day: number;
  title: string;
  activity: string;
  alt: string;
  distance: string;
  duration: string;
  stay: string;
  meals: string;
}

export interface ExpeditionBlueprint {
  id: string;
  title: string;
  region: string;
  duration: number;
  maxAlt: string;
  distance: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  budgetTier: 'budget' | 'premium' | 'luxury';
  costEstimate: number;
  imageUrl: string;
  bestSeason: string;
  highlights: string[];
  permits: string[];
  guideRequirement: string;
  days: ItineraryDay[];
}

export const EXPEDITION_BLUEPRINTS: ExpeditionBlueprint[] = [
  {
    id: 'bp-everest',
    title: 'Everest Base Camp & Kala Patthar High Route',
    region: 'Everest (Khumbu)',
    duration: 14,
    maxAlt: '5,545m (Kala Patthar)',
    distance: '130 km',
    difficulty: 'Challenging',
    budgetTier: 'premium',
    costEstimate: 1450,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800',
    bestSeason: 'Oct–Dec & Mar–May',
    highlights: [
      'Scenic Lukla Mountain Flight',
      'Namche Bazaar Sherpa Capital',
      'Tengboche Monastery Blessing',
      'Khumbu Glacier Moraine Crossing',
      'Kala Patthar Sunrise over Everest Summit'
    ],
    permits: [
      'Sagarmatha National Park Permit (Endorsed)',
      'Khumbu Pasang Lhamu Rural Municipality Card',
      'TIMS Central Register Card'
    ],
    guideRequirement: 'Mandatory IFMGA / NMA Certified High Altitude Guide + 1 Porter / 2 Pax',
    days: [
      {
        day: 1,
        title: 'Kathmandu to Lukla (2,840m) & Trek to Phakding',
        activity: 'Early morning mountain flight into Tenzing-Hillary Airport at Lukla. Descend through pine and cedar forests along the Dudh Koshi River.',
        alt: '2,610m',
        distance: '7.8 km',
        duration: '3.5 hrs',
        stay: 'Yeti Mountain Home / River Teahouse',
        meals: 'L, D'
      },
      {
        day: 2,
        title: 'Phakding to Namche Bazaar (Sherpa Capital)',
        activity: 'Cross iconic Hillary Suspension Bridge draped in Buddhist prayer flags and tackle the famous Namche uphill step ascent.',
        alt: '3,440m',
        distance: '10.5 km',
        duration: '5.5 hrs',
        stay: 'Panorama Lodge Namche',
        meals: 'B, L, D'
      },
      {
        day: 3,
        title: 'Namche Bazaar Acclimatization & Everest View Hotel Hike',
        activity: 'Hike to Syangboche (3,880m) for your first panoramic glimpse of Everest, Lhotse, and Ama Dablam. Afternoon in Namche Sherpa Museum.',
        alt: '3,880m',
        distance: '4.2 km',
        duration: '3 hrs',
        stay: 'Panorama Lodge Namche',
        meals: 'B, L, D'
      },
      {
        day: 4,
        title: 'Namche Bazaar to Tengboche Monastery',
        activity: 'Trail contours high above Imja Khola before descending to Phunki Tenga, followed by a climb through rhododendron groves to ancient Tengboche.',
        alt: '3,867m',
        distance: '9.4 km',
        duration: '5 hrs',
        stay: 'Tengboche Gompa Guest House',
        meals: 'B, L, D'
      },
      {
        day: 5,
        title: 'Tengboche to Dingboche (High Alpine Valley)',
        activity: 'Pass chortens and mani stone walls through Pangboche village, crossing beneath the soaring needle peak of Mt. Ama Dablam.',
        alt: '4,410m',
        distance: '11.0 km',
        duration: '5.5 hrs',
        stay: 'Good Luck Eco Lodge',
        meals: 'B, L, D'
      },
      {
        day: 6,
        title: 'Dingboche Second Acclimatization Hike',
        activity: 'Ascend Nangkartshang Peak (5,083m) for breathtaking vistas of Makalu (8,485m), Island Peak, and the towering Lhotse South Face.',
        alt: '5,083m',
        distance: '5.1 km',
        duration: '4 hrs',
        stay: 'Good Luck Eco Lodge',
        meals: 'B, L, D'
      },
      {
        day: 7,
        title: 'Dingboche to Lobuche via Thokla Pass',
        activity: 'Climb the steep glacial terminal moraine to the Everest Climbers Memorial at Thokla Pass, honoring lost Sherpa heroes.',
        alt: '4,940m',
        distance: '8.2 km',
        duration: '4.5 hrs',
        stay: 'Oxygen Teahouse Lobuche',
        meals: 'B, L, D'
      },
      {
        day: 8,
        title: 'Lobuche to Gorak Shep & Everest Base Camp (5,364m)',
        activity: 'Walk the rugged crest of Khumbu Glacier into Gorak Shep. Continue to EBC directly beneath the tumbling seracs of the Khumbu Icefall.',
        alt: '5,364m',
        distance: '13.2 km',
        duration: '7.5 hrs',
        stay: 'Buddha Lodge Gorak Shep',
        meals: 'B, L, D'
      },
      {
        day: 9,
        title: 'Kala Patthar Sunrise (5,545m) & Descend to Pheriche',
        activity: 'Pre-dawn climb to Kala Patthar summit for the ultimate 360° golden sunrise over Everest’s summit pyramid. Afternoon descent into valley air.',
        alt: '5,545m',
        distance: '14.0 km',
        duration: '6.5 hrs',
        stay: 'Himalayan Hotel Pheriche',
        meals: 'B, L, D'
      },
      {
        day: 10,
        title: 'Pheriche to Namche Bazaar',
        activity: 'Long gentle descent past Orsho, Pangboche, and Tengboche, celebrating with freshly baked apple strudel and warm coffee back in Namche.',
        alt: '3,440m',
        distance: '14.8 km',
        duration: '6 hrs',
        stay: 'Panorama Lodge Namche',
        meals: 'B, L, D'
      },
      {
        day: 11,
        title: 'Namche Bazaar to Lukla Trailhead',
        activity: 'Final day on trail descending along the turquoise river gorge, crossing the Dudh Koshi suspension bridges one last time to Lukla village.',
        alt: '2,840m',
        distance: '18.2 km',
        duration: '7 hrs',
        stay: 'Lukla Eco Resort',
        meals: 'B, L, D'
      },
      {
        day: 12,
        title: 'Lukla Flight to Kathmandu & Heritage Hotel Check-in',
        activity: 'Catch morning twin-otter aircraft back into Kathmandu Valley. Private luxury transfer to Dwarika’s Heritage Courtyard.',
        alt: '1,400m',
        distance: 'Flight (35 mins)',
        duration: 'Flight',
        stay: 'The Dwarika’s Hotel Kathmandu',
        meals: 'B, D'
      },
      {
        day: 13,
        title: 'Kathmandu Valley UNESCO Heritage Tour',
        activity: 'Private guided visit to Boudhanath Stupa, Pashupatinath cremation ghats, and medieval Patan Durbar Square.',
        alt: '1,400m',
        distance: 'City Circuit',
        duration: 'Full Day',
        stay: 'The Dwarika’s Hotel Kathmandu',
        meals: 'B, L, D'
      },
      {
        day: 14,
        title: 'Final Expedition Debrief & Airport Departure',
        activity: 'Expedition certificate presentation by Nepal Mountaineering Association, souvenir shopping in Thamel, and international flight gateway.',
        alt: '1,400m',
        distance: 'Airport Transit',
        duration: 'Depart',
        stay: 'Return Home',
        meals: 'B'
      }
    ]
  },
  {
    id: 'bp-annapurna',
    title: 'Annapurna Sanctuary & Poon Hill Sunrise Circuit',
    region: 'Annapurna (Gandaki)',
    duration: 10,
    maxAlt: '4,130m (Annapurna Base Camp)',
    distance: '115 km',
    difficulty: 'Moderate',
    budgetTier: 'budget',
    costEstimate: 890,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800',
    bestSeason: 'Oct–Nov & Mar–Apr',
    highlights: [
      'Poon Hill 360° Sunrise over Dhaulagiri & Annapurna',
      'Machhapuchhre Fishtail Peak Glacier Bowl',
      'Jhinu Danda Natural Hot Springs',
      'Terraced Rice Fields & Gurung Traditional Hamlets'
    ],
    permits: [
      'Annapurna Conservation Area Permit (ACAP)',
      'TIMS Card Registry'
    ],
    guideRequirement: 'Licensed Trekking Guide + Optional Porter',
    days: [
      {
        day: 1,
        title: 'Pokhara Lakeside Drive to Nayapul & Trek to Tikhedhunga',
        activity: 'Scenic lakeside departure from Pokhara. Cross Modi Khola river suspension bridge into pastoral Gurung farming valleys.',
        alt: '1,540m',
        distance: '9.2 km',
        duration: '4 hrs',
        stay: 'Green View Teahouse Tikhedhunga',
        meals: 'L, D'
      },
      {
        day: 2,
        title: 'Tikhedhunga Ulleri Stairs to Ghorepani',
        activity: 'Ascend the legendary 3,200 stone steps of Ulleri into enchanted rhododendron and oak forests echoing with mountain streams.',
        alt: '2,860m',
        distance: '11.8 km',
        duration: '6 hrs',
        stay: 'Sunny Lodge Ghorepani',
        meals: 'B, L, D'
      },
      {
        day: 3,
        title: 'Poon Hill Sunrise (3,210m) & Trek to Tadapani',
        activity: 'Early 5 AM dawn hike to Poon Hill observation tower. Watch golden alpenglow paint Dhaulagiri I (8,167m) and Annapurna South.',
        alt: '3,210m',
        distance: '12.0 km',
        duration: '6.5 hrs',
        stay: 'Grand View Tadapani',
        meals: 'B, L, D'
      },
      {
        day: 4,
        title: 'Tadapani to Chhomrong (Heart of Gurung Highlands)',
        activity: 'Descend through dense moss forests into the Kimrong Khola gorge, then ascend to the cliffside terraces of Chhomrong.',
        alt: '2,170m',
        distance: '10.3 km',
        duration: '5 hrs',
        stay: 'Excellent View Chhomrong',
        meals: 'B, L, D'
      },
      {
        day: 5,
        title: 'Chhomrong to Dovan & Himalaya Hotel',
        activity: 'Cross Chhomrong Khola stone stairs into the bamboo forest corridor, traversing quiet streams up to Himalaya cliff.',
        alt: '2,920m',
        distance: '10.8 km',
        duration: '5.5 hrs',
        stay: 'Himalaya Teahouse',
        meals: 'B, L, D'
      },
      {
        day: 6,
        title: 'Himalaya to Machhapuchhre Base Camp (MBC)',
        activity: 'Trek beneath Hinku Cave, emerging past the tree line into the dramatic narrow gateway of the sacred Annapurna Sanctuary.',
        alt: '3,700m',
        distance: '8.5 km',
        duration: '4.5 hrs',
        stay: 'Fishtail Lodge MBC',
        meals: 'B, L, D'
      },
      {
        day: 7,
        title: 'MBC to Annapurna Base Camp (4,130m) Amphitheater',
        activity: 'Morning trek into the 360° glacier amphitheater where Annapurna I (8,091m), Hiunchuli, and Annapurna South encircle you.',
        alt: '4,130m',
        distance: '4.0 km',
        duration: '2.5 hrs',
        stay: 'Sanctuary Lodge ABC',
        meals: 'B, L, D'
      },
      {
        day: 8,
        title: 'ABC Sunrise over Annapurna Glacier & Descend to Bamboo',
        activity: 'Watch morning pink light wash over Annapurna I South Face. Steady, easy descent retracing valley steps down to Bamboo.',
        alt: '2,310m',
        distance: '14.5 km',
        duration: '6 hrs',
        stay: 'Trekkers Rest Bamboo',
        meals: 'B, L, D'
      },
      {
        day: 9,
        title: 'Bamboo to Jhinu Danda Natural Thermal Hot Springs',
        activity: 'Trek back up to Chhomrong, continuing down to Jhinu Danda. Soak tired muscles in natural riverside geothermal mineral pools.',
        alt: '1,780m',
        distance: '11.2 km',
        duration: '5 hrs',
        stay: 'Hot Spring Resort Jhinu',
        meals: 'B, L, D'
      },
      {
        day: 10,
        title: 'Jhinu Danda to Siwai & Scenic Return to Pokhara Lakeside',
        activity: 'Cross Nepal’s longest hanging footbridge (287m), meet private 4x4 jeep at Siwai, and return to Pokhara for lakeside celebratory dinner.',
        alt: '822m',
        distance: '6.4 km + Jeep',
        duration: '3.5 hrs',
        stay: 'Temple Tree Resort Pokhara',
        meals: 'B, L'
      }
    ]
  },
  {
    id: 'bp-mustang',
    title: 'Upper Mustang Walled Kingdom of Lo Manthang',
    region: 'Mustang (Rain Shadow)',
    duration: 12,
    maxAlt: '3,840m (Lo Manthang)',
    distance: '140 km',
    difficulty: 'Moderate',
    budgetTier: 'luxury',
    costEstimate: 1850,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
    bestSeason: 'May–Oct (Monsoon-Free Rain Shadow)',
    highlights: [
      'Walled Medieval City of Lo Manthang Palace',
      'Prehistoric Sky Caves of Chhoser & Jhong',
      'Ochre & Vermilion Wind-Carved Cliffs of Drakmar',
      'Centuries-old Tibetan Buddhist Monasteries of Charang'
    ],
    permits: [
      'Upper Mustang Restricted Area Permit (RAP - $500 USD)',
      'ACAP Conservation Permit'
    ],
    guideRequirement: 'Mandatory Government Licensed Liaison Guide',
    days: [
      {
        day: 1,
        title: 'Pokhara Flight to Jomsom & Trek to Kagbeni Gateway',
        activity: 'Fly past Dhaulagiri and Annapurna into the windy Kali Gandaki valley. Walk along the riverbed to ancient Kagbeni fortress.',
        alt: '2,810m',
        distance: '10.8 km',
        duration: '3.5 hrs',
        stay: 'Red House Heritage Kagbeni',
        meals: 'B, L, D'
      },
      {
        day: 2,
        title: 'Kagbeni Checkpoint Entry to Chele Village',
        activity: 'Present restricted area permit, follow the east bank of the Kali Gandaki through Tangbe’s whitewashed stone alleys to Chele.',
        alt: '3,050m',
        distance: '15.3 km',
        duration: '6 hrs',
        stay: 'Mila Lodge Chele',
        meals: 'B, L, D'
      },
      {
        day: 3,
        title: 'Chele to Syangboche via Taklam La Pass',
        activity: 'Cross Taklam La (3,624m) through surreal canyons and ancient wind caves carved into steep canyon walls.',
        alt: '3,800m',
        distance: '11.5 km',
        duration: '6 hrs',
        stay: 'Syangboche Guest House',
        meals: 'B, L, D'
      },
      {
        day: 4,
        title: 'Syangboche to Ghami (Valley of Red Cliffs)',
        activity: 'Hike over Yamada La pass (3,850m) through barley fields, descending into Ghami, surrounded by the longest mani wall in Mustang.',
        alt: '3,520m',
        distance: '12.0 km',
        duration: '5.5 hrs',
        stay: 'Royal Mustang Inn Ghami',
        meals: 'B, L, D'
      },
      {
        day: 5,
        title: 'Ghami to Tsarang (Ancient Palace & Fortress)',
        activity: 'Traverse the 305-meter sacred prayer stone wall, crossing Tsarang La (3,870m) into the 14th-century monastery and fortress of Tsarang.',
        alt: '3,560m',
        distance: '11.2 km',
        duration: '5 hrs',
        stay: 'Maya’s Heritage Inn Tsarang',
        meals: 'B, L, D'
      },
      {
        day: 6,
        title: 'Tsarang to Walled Capital of Lo Manthang',
        activity: 'Climb gently to the Lo La Pass (3,950m) where the walled whitewashed capital of Lo Manthang emerges like a mirage in the desert.',
        alt: '3,840m',
        distance: '11.8 km',
        duration: '4.5 hrs',
        stay: 'Lotus Palace Lo Manthang',
        meals: 'B, L, D'
      },
      {
        day: 7,
        title: 'Lo Manthang Exploration: King’s Palace & Gompas',
        activity: 'Explore the 4-story palace of the Raja of Mustang, Jampa Gompa (1387 AD), and Thubchen Gompa with priceless gold wall murals.',
        alt: '3,840m',
        distance: 'City Circuit',
        duration: 'Full Day',
        stay: 'Lotus Palace Lo Manthang',
        meals: 'B, L, D'
      },
      {
        day: 8,
        title: 'Chhoser Sky Caves & Garphu Monastic Retreat',
        activity: 'Ride horseback or e-bike to Chhoser to explore Jhong Cave, a 5-story human-carved dwelling dating back over 2,500 years.',
        alt: '3,900m',
        distance: '14.0 km',
        duration: '5.5 hrs',
        stay: 'Lotus Palace Lo Manthang',
        meals: 'B, L, D'
      },
      {
        day: 9,
        title: 'Lo Manthang to Drakmar via Ghar Gompa',
        activity: 'Return via an alternate path visiting 8th-century Ghar Gompa, where Guru Rinpoche subdued demons before founding Buddhism in Tibet.',
        alt: '3,820m',
        distance: '16.5 km',
        duration: '7 hrs',
        stay: 'Drakmar Lodge',
        meals: 'B, L, D'
      },
      {
        day: 10,
        title: 'Drakmar to Shyangmochen',
        activity: 'Morning trek through the crimson-streaked red canyon cliffs, passing grazing yak herds and desert chortens to Shyangmochen.',
        alt: '3,800m',
        distance: '13.0 km',
        duration: '5.5 hrs',
        stay: 'Yak Horn Guest House',
        meals: 'B, L, D'
      },
      {
        day: 11,
        title: 'Shyangmochen to Chhusang & Muktinath',
        activity: 'Descend to Chhusang riverbed and cross to Muktinath, sacred sanctuary of 108 stone water spouts and perpetual natural flame.',
        alt: '3,710m',
        distance: '15.2 km',
        duration: '6 hrs',
        stay: 'Hotel Bob Marley Muktinath',
        meals: 'B, L, D'
      },
      {
        day: 12,
        title: 'Muktinath to Jomsom & Flight to Pokhara',
        activity: 'Early morning mountain flight back to Pokhara, ending your journey through the timeless forbidden kingdom.',
        alt: '822m',
        distance: 'Flight Transit',
        duration: 'Depart',
        stay: 'Pokhara Return',
        meals: 'B'
      }
    ]
  },
  {
    id: 'bp-langtang',
    title: 'Langtang Sacred Valley & Kyanjin Ri Glacier Vista',
    region: 'Langtang (Rasuwa)',
    duration: 8,
    maxAlt: '4,773m (Kyanjin Ri)',
    distance: '75 km',
    difficulty: 'Moderate',
    budgetTier: 'budget',
    costEstimate: 680,
    imageUrl: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=800',
    bestSeason: 'Mar–May & Oct–Nov',
    highlights: [
      'Authentic Kyanjin Gompa Artisanal Yak Cheese Dairy',
      '360° Glacier Panoramas from Kyanjin Ri Summit',
      'Resilient Tamang Heritage Rebuilding Culture',
      'Dense Bamboo & Subtropical Rhododendron Forest'
    ],
    permits: [
      'Langtang National Park Permit',
      'TIMS Card Registration'
    ],
    guideRequirement: 'Certified Langtang Mountain Guide Recommended',
    days: [
      {
        day: 1,
        title: 'Kathmandu 4x4 Drive to Syabrubesi Trailhead',
        activity: 'Scenic overland mountain jeep drive along Trishuli River gorge to the Tamang gateway town of Syabrubesi.',
        alt: '1,550m',
        distance: '132 km Drive',
        duration: '6.5 hrs drive',
        stay: 'Tibet Guest House Syabrubesi',
        meals: 'L, D'
      },
      {
        day: 2,
        title: 'Syabrubesi to Lama Hotel via Langtang Khola',
        activity: 'Hike across suspension bridges into dense oak and bamboo groves, looking for red pandas and langur monkeys.',
        alt: '2,480m',
        distance: '11.3 km',
        duration: '6 hrs',
        stay: 'Friendly Guesthouse Lama Hotel',
        meals: 'B, L, D'
      },
      {
        day: 3,
        title: 'Lama Hotel to Langtang Village Memorial',
        activity: 'Climb past Ghodatabela where the valley broadens dramatically into high alpine pastures beneath Langtang Lirung (7,227m).',
        alt: '3,430m',
        distance: '10.5 km',
        duration: '5 hrs',
        stay: 'Peaceful Guest House Langtang',
        meals: 'B, L, D'
      },
      {
        day: 4,
        title: 'Langtang Village to Kyanjin Gompa (3,870m)',
        activity: 'Gentle morning trek past prayer wheels and carved mani stones into Kyanjin Gompa. Sample freshly produced organic yak cheese.',
        alt: '3,870m',
        distance: '6.8 km',
        duration: '3.5 hrs',
        stay: 'Yala Peak Lodge Kyanjin',
        meals: 'B, L, D'
      },
      {
        day: 5,
        title: 'Kyanjin Ri Summit (4,773m) & Langshisha Glacier',
        activity: 'Pre-dawn climb to Kyanjin Ri peak for jaw-dropping views of Langtang Lirung, Kinshung, and the Tibetan border icefalls.',
        alt: '4,773m',
        distance: '5.4 km',
        duration: '5 hrs',
        stay: 'Yala Peak Lodge Kyanjin',
        meals: 'B, L, D'
      },
      {
        day: 6,
        title: 'Kyanjin Gompa to Lama Hotel Descent',
        activity: 'Trace the downhill route following the roaring glacial river, passing through Langtang and Ghodatabela back to Lama Hotel.',
        alt: '2,480m',
        distance: '17.3 km',
        duration: '6 hrs',
        stay: 'Friendly Guesthouse Lama Hotel',
        meals: 'B, L, D'
      },
      {
        day: 7,
        title: 'Lama Hotel to Syabrubesi via Bamboo',
        activity: 'Final leisurely downhill trek through warm subtropical forests, concluding the alpine circuit in Syabrubesi.',
        alt: '1,550m',
        distance: '11.3 km',
        duration: '4.5 hrs',
        stay: 'Tibet Guest House Syabrubesi',
        meals: 'B, L, D'
      },
      {
        day: 8,
        title: 'Syabrubesi Drive to Kathmandu & Farewell Dinner',
        activity: 'Return drive through terraced hill country to Kathmandu Valley. Evening celebratory Newari feast in Patan.',
        alt: '1,400m',
        distance: '132 km Drive',
        duration: '6.5 hrs drive',
        stay: 'Kathmandu Heritage Hotel',
        meals: 'B, D'
      }
    ]
  },
  {
    id: 'bp-manaslu',
    title: 'Manaslu Circuit & Larkya La High Pass Loop',
    region: 'Manaslu (Gorkha)',
    duration: 14,
    maxAlt: '5,160m (Larkya La)',
    distance: '177 km',
    difficulty: 'Challenging',
    budgetTier: 'premium',
    costEstimate: 1380,
    imageUrl: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=800',
    bestSeason: 'Sep–Nov & Mar–May',
    highlights: [
      'Crossing Larkya La Pass (5,160m) under Mount Manaslu (8,163m)',
      'Turquoise Birendra Glacial Lake & Pungyen Monastery',
      'Ancient Tibetan Culture in Samagaon & Samdo',
      'Suspension Bridges over the wild Budhi Gandaki River'
    ],
    permits: [
      'Manaslu Restricted Area Permit (MRAP)',
      'MCAP Manaslu Conservation Area Permit',
      'ACAP Annapurna Conservation Area Permit'
    ],
    guideRequirement: 'Mandatory Government Certified Mountain Guide + Minimum 2 Trekkers',
    days: [
      {
        day: 1,
        title: 'Kathmandu Drive to Machha Khola Trailhead',
        activity: 'Overland jeep drive through Arughat and Soti Khola along the cascading Budhi Gandaki River to Machha Khola.',
        alt: '900m',
        distance: '145 km Drive',
        duration: '8 hrs drive',
        stay: 'Larke Lodge Machha Khola',
        meals: 'L, D'
      },
      {
        day: 2,
        title: 'Machha Khola to Jagat (Checkpost Gate)',
        activity: 'Pass Tatopani hot springs, crossing high hanging suspension bridges over roaring rapids up to the stone-paved alleys of Jagat.',
        alt: '1,410m',
        distance: '15.5 km',
        duration: '6 hrs',
        stay: 'Rubi Nala Jagat',
        meals: 'B, L, D'
      },
      {
        day: 3,
        title: 'Jagat to Deng via Philim Bamboo Forests',
        activity: 'Officially enter the restricted Manaslu conservation zone, trekking past dramatic bamboo gorges to Deng settlement.',
        alt: '1,804m',
        distance: '19.0 km',
        duration: '6.5 hrs',
        stay: 'Windy Valley Deng',
        meals: 'B, L, D'
      },
      {
        day: 4,
        title: 'Deng to Namrung (Tibetan Cultural Threshold)',
        activity: 'Ascend past carved mani stones and ancient Buddhist chortens into alpine forests, arriving at the picturesque village of Namrung.',
        alt: '2,660m',
        distance: '19.5 km',
        duration: '6.5 hrs',
        stay: 'Namrung Thakali Lodge',
        meals: 'B, L, D'
      },
      {
        day: 5,
        title: 'Namrung to Samagaon (Base of Mt. Manaslu)',
        activity: 'Pass through Lho village under the imposing view of Manaslu’s double summit peaks, reaching the vast plain of Samagaon.',
        alt: '3,530m',
        distance: '17.0 km',
        duration: '6 hrs',
        stay: 'Mount Manaslu Hotel Samagaon',
        meals: 'B, L, D'
      },
      {
        day: 6,
        title: 'Samagaon Acclimatization & Birendra Lake Hike',
        activity: 'Hike to the turquoise glacial meltwaters of Birendra Tal and ancient Pungyen Gompa nestled beneath Manaslu glacier.',
        alt: '4,050m',
        distance: '6.5 km',
        duration: '4.5 hrs',
        stay: 'Mount Manaslu Hotel Samagaon',
        meals: 'B, L, D'
      },
      {
        day: 7,
        title: 'Samagaon to Samdo (Tibetan Border Trading Hub)',
        activity: 'Gentle alpine climb along the upper Budhi Gandaki, crossing birch forests to Samdo, the last permanent settlement before Tibet.',
        alt: '3,860m',
        distance: '8.2 km',
        duration: '3.5 hrs',
        stay: 'Yak Hotel Samdo',
        meals: 'B, L, D'
      },
      {
        day: 8,
        title: 'Samdo to Dharmasala (Larkya Phedi High Camp)',
        activity: 'Cross the Athahra Saya Khola and climb slowly up the barren moraine landscape to the basic stone shelter at Dharmasala.',
        alt: '4,460m',
        distance: '6.5 km',
        duration: '4 hrs',
        stay: 'Larkya Camp Dharmasala',
        meals: 'B, L, D'
      },
      {
        day: 9,
        title: 'Cross Larkya La Pass (5,160m) & Descend to Bimthang',
        activity: 'Pre-dawn 4 AM ascent over Larkya glacier moraine. Reach the prayer flags at 5,160m with panoramas of Himlung and Annapurna II.',
        alt: '5,160m',
        distance: '16.0 km',
        duration: '8.5 hrs',
        stay: 'Ganga Purna Lodge Bimthang',
        meals: 'B, L, D'
      },
      {
        day: 10,
        title: 'Bimthang to Tilije (Lush Rhododendron Forests)',
        activity: 'Descend through pine and rhododendron canopies, crossing Dudh Khola to the charming Gurung village of Tilije.',
        alt: '2,300m',
        distance: '13.5 km',
        duration: '5 hrs',
        stay: 'Tilije Village Lodge',
        meals: 'B, L, D'
      },
      {
        day: 11,
        title: 'Tilije to Dharapani (Meeting the Annapurna Circuit)',
        activity: 'Short hike to Dharapani checkpoint where the Manaslu route merges with the Marsyangdi River valley.',
        alt: '1,860m',
        distance: '6.0 km',
        duration: '2.5 hrs',
        stay: 'Hotel Manaslu Dharapani',
        meals: 'B, L, D'
      },
      {
        day: 12,
        title: 'Dharapani Jeep Drive to Besisahar',
        activity: 'Scenic off-road 4x4 mountain drive through Marsyangdi river gorges and waterfall cascades down to Besisahar hub.',
        alt: '760m',
        distance: '45 km Drive',
        duration: '4.5 hrs',
        stay: 'Besisahar Gateway Hotel',
        meals: 'B, L, D'
      },
      {
        day: 13,
        title: 'Besisahar Drive to Kathmandu',
        activity: 'Paved highway return to Kathmandu Valley following the Trishuli River highway. Evening farewell rooftop dinner.',
        alt: '1,400m',
        distance: '175 km Drive',
        duration: '6 hrs drive',
        stay: 'Kathmandu Eco Hotel',
        meals: 'B, D'
      },
      {
        day: 14,
        title: 'International Departure & Expedition Certificate',
        activity: 'Official certificate presentation, souvenir spice picking in Ason Bazaar, and airport escort.',
        alt: '1,400m',
        distance: 'Airport Transit',
        duration: 'Depart',
        stay: 'Flight Home',
        meals: 'B'
      }
    ]
  },
  {
    id: 'bp-rara',
    title: 'Wild West Safari & Rara Lake High Alpine Plateau',
    region: 'Western Wilderness (Karnali & Bardia)',
    duration: 9,
    maxAlt: '2,990m (Rara Lake)',
    distance: '65 km',
    difficulty: 'Easy',
    budgetTier: 'premium',
    costEstimate: 1150,
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=800',
    bestSeason: 'Apr–Jun & Sep–Nov',
    highlights: [
      'Glistening Blue Waters of Rara Lake (Nepal’s Largest Lake)',
      'Wild Royal Bengal Tiger Safari in Untamed Bardia National Park',
      'Panoramic Murma Top (3,690m) 360° Lookout',
      'Horseback Trails & Campfire Stargazing under Dark Skies'
    ],
    permits: [
      'Rara National Park Conservation Permit',
      'Bardia Wildlife Sanctuary Safari Permit'
    ],
    guideRequirement: 'Wildlife Naturalist & Alpine Guide Included',
    days: [
      {
        day: 1,
        title: 'Fly Kathmandu to Nepalgunj & Transfer to Bardia',
        activity: 'Flight into southern Terai gateway of Nepalgunj, followed by private jeep transfer to pristine Bardia jungle eco-lodge.',
        alt: '150m',
        distance: 'Flight + 90 km Drive',
        duration: '4 hrs',
        stay: 'Tiger Tops Karnali Lodge',
        meals: 'L, D'
      },
      {
        day: 2,
        title: 'Bardia Full-Day Tiger Tracking Walking Safari',
        activity: 'On-foot wilderness tracking with veteran naturalists. Watch for Royal Bengal Tigers, wild elephant herds, and one-horned rhinos.',
        alt: '152m',
        distance: '12.0 km Safari',
        duration: 'Full Day',
        stay: 'Tiger Tops Karnali Lodge',
        meals: 'B, L, D'
      },
      {
        day: 3,
        title: 'Karnali River Raft Drift for Gangetic Dolphins',
        activity: 'Gentle river drift in inflatable rafts looking for endangered freshwater dolphins, marsh mugger crocodiles, and 400+ bird species.',
        alt: '150m',
        distance: '18 km Drift',
        duration: '5 hrs',
        stay: 'Tiger Tops Karnali Lodge',
        meals: 'B, L, D'
      },
      {
        day: 4,
        title: 'Nepalgunj Flight to Talcha Airport (Jumla) & Trek to Rara',
        activity: 'Spectacular mountain flight into remote Talcha airstrip. Hike through serene blue pine and spruce forests to the shore of Rara Lake.',
        alt: '2,990m',
        distance: '9.5 km',
        duration: '3.5 hrs',
        stay: 'Rara Lake View Eco Camp',
        meals: 'B, L, D'
      },
      {
        day: 5,
        title: 'Rara Lake Shore Exploration & Wooden Boating',
        activity: 'Wooden rowboat cruise across the deep mirror-like sapphire waters. Afternoon horseback ride through tranquil meadows.',
        alt: '2,990m',
        distance: 'Lake Circuit',
        duration: '4.5 hrs',
        stay: 'Rara Lake View Eco Camp',
        meals: 'B, L, D'
      },
      {
        day: 6,
        title: 'Hike to Murma Top (3,690m) Observation Peak',
        activity: 'Climb through wildflower slopes to Murma View Tower for an unforgettable 360° aerial perspective over Rara Lake and Saipal peaks.',
        alt: '3,690m',
        distance: '8.4 km',
        duration: '5 hrs',
        stay: 'Murma Village Homestay',
        meals: 'B, L, D'
      },
      {
        day: 7,
        title: 'Murma to Talcha via Traditional Khas Villages',
        activity: 'Trek through preserved western Khas culture settlements with carved wooden doorways and slate-roofed dwellings.',
        alt: '2,730m',
        distance: '10.2 km',
        duration: '4 hrs',
        stay: 'Talcha Mountain Lodge',
        meals: 'B, L, D'
      },
      {
        day: 8,
        title: 'Flight Talcha to Nepalgunj & Flight to Kathmandu',
        activity: 'Twin-engine mountain flights returning via Nepalgunj to Kathmandu. Evening celebration dinner in Thamel.',
        alt: '1,400m',
        distance: 'Dual Flights',
        duration: 'Transit',
        stay: 'Kathmandu Eco Boutique Hotel',
        meals: 'B, D'
      },
      {
        day: 9,
        title: 'Kathmandu Souvenir Walk & International Flight',
        activity: 'Pick up wild honey and handwoven pashmina in Kathmandu before airport departure.',
        alt: '1,400m',
        distance: 'Airport Transit',
        duration: 'Depart',
        stay: 'Flight Home',
        meals: 'B'
      }
    ]
  }
];

export const REGION_OPTIONS = [
  { id: 'Everest', label: 'Everest (Khumbu)', badge: '5,545m max', desc: 'World giants & Sherpa culture' },
  { id: 'Annapurna', label: 'Annapurna (Gandaki)', badge: '4,130m max', desc: 'Sanctuary amphitheater & hot springs' },
  { id: 'Mustang', label: 'Mustang (Rain Shadow)', badge: '3,840m max', desc: 'Forbidden kingdom & sky caves' },
  { id: 'Langtang', label: 'Langtang (Rasuwa)', badge: '4,773m max', desc: 'Glacier valley & yak cheese dairies' },
  { id: 'Manaslu', label: 'Manaslu (Gorkha)', badge: '5,160m max', desc: 'Rugged high-pass tea house circuit' },
  { id: 'Western', label: 'Western Wilderness', badge: '2,990m max', desc: 'Rara sapphire lake & Bardia safari' },
];

export const TREK_STYLES = [
  { id: 'balanced', label: 'Balanced Classic', icon: 'compass', desc: '5-6 hrs/day, good acclimatization rhythm' },
  { id: 'leisure', label: 'Leisure & Photography', icon: 'camera', desc: '3-4 hrs/day, scenic stops & cultural stays' },
  { id: 'alpine', label: 'High Col Challenge', icon: 'mountain', desc: '7-9 hrs/day, technical passes & high cols' },
];

export const LODGING_STYLES = [
  { id: 'teahouse', label: 'Authentic Tea House', price: '$', desc: 'Woodstove hearths & homecooked Dal Bhat' },
  { id: 'ecolodge', label: 'Comfort Eco-Lodge', price: '$$', desc: 'Heated beds, attached solar hot showers' },
  { id: 'luxury', label: 'Himalayan Luxury', price: '$$$', desc: 'Courtyard suites, private oxygen & concierge' },
];

export const INTEREST_TAGS = [
  '8,000m Himalayan Peaks',
  'Ancient Monasteries & Stupas',
  'Wildlife & Tiger Safaris',
  'Golden Hour Alpine Sunrises',
  'Artisanal Yak Cheese Dairies',
  'Suspension Bridges',
  'Geothermal Mineral Hot Springs',
  'Glacial Lakes & Moraines',
  'Dark Sky Astrophotography',
  'High-Altitude Alpine Passes'
];
