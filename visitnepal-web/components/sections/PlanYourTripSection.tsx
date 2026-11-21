'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTravelStore } from '@/store/useTravelStore';
import {
  Check, Calendar, Users, Mountain, Hotel, Plane, Car,
  ChevronRight, ChevronLeft, ShieldCheck, Compass, Info, ArrowRight
} from 'lucide-react';

const tripStyles = [
  { id: 'trekking', label: 'Trekking & High Alpine', description: 'Multi-day mountain trails with teahouse and sherpa support' },
  { id: 'cultural', label: 'Cultural & Heritage Tour', description: 'UNESCO ancient courtyards, monuments, and living monasteries' },
  { id: 'wildlife', label: 'Jungle Safari & Wildlife', description: 'National parks, rhino tracking, jungle walks, and birdwatching' },
  { id: 'spiritual', label: 'Spiritual Retreat & Meditation', description: 'Lumbini pilgrimage, mindfulness retreats, and monastery stays' },
  { id: 'adventure', label: 'Adventure & Air Sports', description: 'Pokhara paragliding, river rafting, bungee, and canyoning' },
  { id: 'roadtrip', label: 'Scenic Highway Road Trip', description: 'Chauffeured 4x4 overland through valleys and high plateaus' },
];

const durations = [
  { id: 'short', days: 5, label: '3–5 Days', description: 'Quick escape, single valley or city focus' },
  { id: 'week', days: 9, label: '6–10 Days', description: 'Classic circuit, 1–2 iconic regions' },
  { id: 'extended', days: 14, label: '11–16 Days', description: 'Deep high-altitude exploration (EBC, Annapurna)' },
  { id: 'epic', days: 21, label: '17+ Days', description: 'Grand Himalayan traverse & remote kingdoms' },
];

const seasons = [
  { id: 'autumn', label: 'Autumn (Oct – Dec)', tag: 'Peak Clarity', description: 'Crystal blue skies, crisp air, vibrant post-monsoon festivals' },
  { id: 'spring', label: 'Spring (Mar – May)', tag: 'Wild Blossoms', description: 'Rhododendrons in full bloom, warm days, climbing window' },
  { id: 'winter', label: 'Winter (Dec – Feb)', tag: 'Serene & Crisp', description: 'Pristine mountain views, fewer crowds, quiet valleys' },
  { id: 'monsoon', label: 'Summer / Rain Shadow (Jun – Sep)', tag: 'Lush & Rain Shadow', description: 'Upper Mustang rain shadow trails, lush valley greenery' },
];

const difficulties = [
  { id: 'easy', label: 'Leisure / Gentle', description: 'Scenic drives, gentle cultural walks under 2,000m' },
  { id: 'moderate', label: 'Moderate Hiking', description: '4–6 hours daily walking on established trails up to 3,800m' },
  { id: 'challenging', label: 'High Altitude Trekking', description: 'High passes, rocky terrain, 4,000m to 5,500m' },
  { id: 'extreme', label: 'Alpine Expedition', description: 'Technical glacier travel, 5,500m+, previous alpine experience required' },
];

const transportOptions = [
  { id: 'flight', label: 'Domestic Flights', description: 'Short regional scenic flights connecting major hub valleys' },
  { id: 'private', label: 'Private SUV / Chauffeured', description: 'Comfortable air-conditioned private 4WD across scenic highways' },
  { id: 'helicopter', label: 'Helicopter Charter', description: 'Direct alpine access to remote high-altitude zones & viewpoints' },
];

const accommodations = [
  { id: 'teahouse', label: 'Traditional Mountain Teahouses', description: 'Authentic local hospitality and warmth along trekking routes' },
  { id: 'boutique', label: 'Heritage Boutique Hotels', description: 'Character properties celebrating Newari and Himalayan craftsmanship' },
  { id: 'luxury', label: '5-Star Luxury Mountain Resorts', description: 'World-class wellness, fine cuisine, and panoramic mountain suites' },
  { id: 'homestay', label: 'Community Village Homestays', description: 'Living with indigenous families, sharing home-cooked meals' },
];

const travelTips = [
  'Procure official TIMS cards and National Park permits prior to mountain trailhead departures.',
  'Acclimatize conservatively: schedule mandatory rest days above 3,500m elevation.',
  'Always trek with licensed local guides — certified for safety, route knowledge, and high-altitude logistics.',
  'Carry cash (NPR) for high-mountain teahouses; cards are accepted primarily in Kathmandu and Pokhara.',
  'Respect local cultural customs: circumambulate stupas clockwise and ask before photographing ceremonies.',
  'Drink filtered or boiled water; avoid single-use plastics in fragile conservation zones.',
];

export default function PlanYourTripSection() {
  const router = useRouter();
  const currentUser = useTravelStore((state) => state.currentUser);
  const setCustomPreference = useTravelStore((state) => state.setCustomPreference);
  const [activeStep, setActiveStep] = useState(0);
  const [selections, setSelections] = useState({
    destinations: ['everest'] as string[],
    tripStyle: 'trekking',
    duration: 'week',
    season: 'autumn',
    difficulty: 'moderate',
    transport: 'flight',
    accommodation: 'teahouse',
  });
  const [showTips, setShowTips] = useState(false);

  const steps = [
    { id: 'destinations', label: 'Destinations' },
    { id: 'style', label: 'Travel Style' },
    { id: 'duration', label: 'Duration' },
    { id: 'season', label: 'Season' },
    { id: 'difficulty', label: 'Difficulty' },
    { id: 'transport', label: 'Transport' },
    { id: 'accommodation', label: 'Accommodation' },
  ];

  const handleDestinationToggle = (destId: string) => {
    setSelections(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destId)
        ? prev.destinations.length > 1
          ? prev.destinations.filter(d => d !== destId)
          : prev.destinations
        : [...prev.destinations, destId]
    }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Save to localStorage and store
    try {
      localStorage.setItem('nepal_custom_trip', JSON.stringify({
        ...selections,
        completedAt: new Date().toISOString(),
      }));
    } catch (e) {
      console.error(e);
    }

    if (currentUser?.loggedIn && currentUser?.otpVerified) {
      router.push('/dashboard');
    } else {
      router.push('/signup');
    }
  };

  return (
    <section
      id="plan-your-trip"
      className="pt-10 md:pt-16 pb-6 md:pb-8 bg-white text-[#17212B] scroll-mt-12"
      aria-labelledby="plan-heading"
    >
      <div className="container">
        {/* Section Heading */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#0552A2]" />
            <span className="text-caption text-[#0552A2]">Journey Planner</span>
          </div>
          <h2 id="plan-heading" className="text-heading-2 text-[#17212B]">
            Design Your Ideal Himalayan Journey
          </h2>
          <p className="text-body-lg text-[#4B5563] mt-3">
            Select your preferences below. Our system matches you with verified routes, local certified guides, and official permits.
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="max-w-6xl mx-auto mb-10">
          <div className="flex items-center justify-between pb-3 overflow-x-auto gap-2">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 whitespace-nowrap text-xs font-semibold py-1 px-2.5 rounded-full transition-colors cursor-pointer ${idx === activeStep
                  ? 'bg-[#0552A2] text-white'
                  : idx < activeStep
                    ? 'text-[#0552A2] hover:bg-blue-50/50'
                    : 'text-[#9CA3AF] hover:text-[#4B5563]'
                  }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${idx < activeStep ? 'bg-[#0552A2] text-white' : 'border border-current'
                  }`}>
                  {idx < activeStep ? '✓' : idx + 1}
                </span>
                <span>{step.label}</span>
              </button>
            ))}
          </div>
          <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full w-full bg-[#0552A2] origin-left transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${(activeStep + 1) / steps.length})` }}
            />
          </div>
        </div>

        {/* Main Step Canvas */}
        <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-md">
          {/* Step 1: Destinations */}
          {activeStep === 0 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] tracking-tight">Where do you want to explore?</h3>
                <p className="text-xs text-[#4B5563] mt-1">Select one or multiple regions to combine in your itinerary.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {[
                  { id: 'everest', name: 'Everest Region (Khumbu)', alt: '5,364m' },
                  { id: 'annapurna', name: 'Annapurna Conservation Area', alt: '4,130m' },
                  { id: 'mustang', name: 'Upper Mustang (Kingdom of Lo)', alt: '3,840m' },
                  { id: 'kathmandu', name: 'Kathmandu Cultural Valley', alt: '1,400m' },
                  { id: 'pokhara', name: 'Pokhara & Phewa Lake', alt: '822m' },
                  { id: 'chitwan', name: 'Chitwan Jungle & Safari', alt: '150m' },
                  { id: 'lumbini', name: 'Lumbini Sacred Garden', alt: '150m' },
                  { id: 'langtang', name: 'Langtang Valley & Gosainkunda', alt: '3,870m' },
                  { id: 'manaslu', name: 'Manaslu Circuit Wilderness', alt: '5,106m' },
                ].map((dest) => {
                  const isSelected = selections.destinations.includes(dest.id);
                  return (
                    <button
                      key={dest.id}
                      onClick={() => handleDestinationToggle(dest.id)}
                      className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${isSelected
                        ? 'bg-white border-[#0552A2] shadow-sm'
                        : 'bg-white/60 border-transparent hover:bg-white'
                        }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-bold text-[#17212B]">{dest.name}</span>
                        {isSelected && <Check className="h-4 w-4 text-[#0552A2] shrink-0" />}
                      </div>
                      <span className="text-[11px] font-mono text-[#0552A2] font-semibold mt-2">
                        {dest.alt}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Travel Style */}
          {activeStep === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] tracking-tight">What style of journey calls to you?</h3>
                <p className="text-xs text-[#4B5563] mt-1">Select the travel theme that best matches your expectations.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tripStyles.map((style) => {
                  const isSelected = selections.tripStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setSelections(prev => ({ ...prev, tripStyle: style.id }))}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-2 ${isSelected
                        ? 'bg-white border-[#0552A2] shadow-sm'
                        : 'bg-white/60 border-transparent hover:bg-white'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-[#17212B] font-serif">{style.label}</span>
                        {isSelected && <Check className="h-4 w-4 text-[#0552A2]" />}
                      </div>
                      <p className="text-xs text-[#4B5563] leading-relaxed">{style.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Duration */}
          {activeStep === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] tracking-tight">How much time do you have in Nepal?</h3>
                <p className="text-xs text-[#4B5563] mt-1">Sufficient duration ensures safe altitude acclimatization.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {durations.map((dur) => {
                  const isSelected = selections.duration === dur.id;
                  return (
                    <button
                      key={dur.id}
                      onClick={() => setSelections(prev => ({ ...prev, duration: dur.id }))}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${isSelected
                        ? 'bg-white border-[#0552A2] shadow-sm'
                        : 'bg-white/60 border-transparent hover:bg-white'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-[#0552A2] font-mono">{dur.label}</span>
                        {isSelected && <Check className="h-4 w-4 text-[#0552A2]" />}
                      </div>
                      <p className="text-xs text-[#4B5563]">{dur.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Season */}
          {activeStep === 3 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] tracking-tight">When are you planning to travel?</h3>
                <p className="text-xs text-[#4B5563] mt-1">Each season in the Himalayas provides its own weather and cultural charm.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {seasons.map((season) => {
                  const isSelected = selections.season === season.id;
                  return (
                    <button
                      key={season.id}
                      onClick={() => setSelections(prev => ({ ...prev, season: season.id }))}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${isSelected
                        ? 'bg-white border-[#0552A2] shadow-sm'
                        : 'bg-white/60 border-transparent hover:bg-white'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-[#17212B] font-serif">{season.label}</span>
                        <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-[#0552A2]/10 text-[#0552A2]">
                          {season.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#4B5563]">{season.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Difficulty */}
          {activeStep === 4 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] tracking-tight">What trail difficulty suits your fitness?</h3>
                <p className="text-xs text-[#4B5563] mt-1">We calibrate guide coverage and porter support based on trail grade.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {difficulties.map((diff) => {
                  const isSelected = selections.difficulty === diff.id;
                  return (
                    <button
                      key={diff.id}
                      onClick={() => setSelections(prev => ({ ...prev, difficulty: diff.id }))}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${isSelected
                        ? 'bg-white border-[#0552A2] shadow-sm'
                        : 'bg-white/60 border-transparent hover:bg-white'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-[#17212B]">{diff.label}</span>
                        {isSelected && <Check className="h-4 w-4 text-[#0552A2]" />}
                      </div>
                      <p className="text-xs text-[#4B5563]">{diff.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 6: Transportation */}
          {activeStep === 5 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] tracking-tight">Preferred mode of travel between regions?</h3>
                <p className="text-xs text-[#4B5563] mt-1">Combine domestic mountain flights, private vehicles, or helicopter transfers.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {transportOptions.map((trans) => {
                  const isSelected = selections.transport === trans.id;
                  return (
                    <button
                      key={trans.id}
                      onClick={() => setSelections(prev => ({ ...prev, transport: trans.id }))}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${isSelected
                        ? 'bg-white border-[#0552A2] shadow-sm'
                        : 'bg-white/60 border-transparent hover:bg-white'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-[#17212B]">{trans.label}</span>
                        {isSelected && <Check className="h-4 w-4 text-[#0552A2]" />}
                      </div>
                      <p className="text-xs text-[#4B5563]">{trans.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 7: Accommodation */}
          {activeStep === 6 && (
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#17212B] tracking-tight">Where would you prefer to stay?</h3>
                <p className="text-xs text-[#4B5563] mt-1">From mountain teahouses along the trails to luxury heritage resorts.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accommodations.map((acc) => {
                  const isSelected = selections.accommodation === acc.id;
                  return (
                    <button
                      key={acc.id}
                      onClick={() => setSelections(prev => ({ ...prev, accommodation: acc.id }))}
                      className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer flex flex-col gap-1.5 ${isSelected
                        ? 'bg-white border-[#0552A2] shadow-sm'
                        : 'bg-white/60 border-transparent hover:bg-white'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-base font-bold text-[#17212B] font-serif">{acc.label}</span>
                        {isSelected && <Check className="h-4 w-4 text-[#0552A2]" />}
                      </div>
                      <p className="text-xs text-[#4B5563]">{acc.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step Navigation Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-[#0552A2]/10">
            <button
              onClick={handleBack}
              disabled={activeStep === 0}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${activeStep === 0 ? 'opacity-30 pointer-events-none text-gray-400' : 'text-[#17212B] hover:bg-white'
                }`}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            {activeStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn-primary text-xs uppercase tracking-wider"
              >
                <span>Continue</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-8 py-3.5 rounded-full bg-[#EC1F27] text-white text-xs uppercase tracking-wider font-bold transition-all duration-200 hover:bg-[#c91219] hover:shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Complete Plan & Access Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Essential Travel Tips Drawer */}
        <div className="max-w-6xl mx-auto mt-8">
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full p-5 rounded-2xl bg-white border border-zinc-200 flex items-center justify-between text-left cursor-pointer hover:border-[#0552A2]/30 transition-colors shadow-xs"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-[#0552A2]" />
              <span className="text-sm font-bold text-[#17212B]">
                Essential Nepal Travel & High-Altitude Guidelines
              </span>
            </div>
            <span className="text-xs font-bold text-[#0552A2] font-mono">
              {showTips ? 'Hide Tips ▲' : 'View Tips ▼'}
            </span>
          </button>

        <AnimatePresence>
          {showTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 bg-white rounded-2xl border border-t-0 border-[#0552A2]/15 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#4B5563] leading-relaxed">
                {travelTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="h-4 w-4 rounded-full bg-[#0552A2]/10 text-[#0552A2] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
