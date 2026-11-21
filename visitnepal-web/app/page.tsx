import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import StorytellingSection from '@/components/sections/StorytellingSection';
import DestinationsSection from '@/components/sections/DestinationsSection';
import ExperiencesSection from '@/components/sections/ExperiencesSection';
import CultureSection from '@/components/sections/CultureSection';
import Footer from '@/components/sections/Footer';

// Code-split below-the-fold interactive console so it does not block initial hydration
const PlanYourTripSection = dynamic(
  () => import('@/components/sections/PlanYourTripSection'),
  { ssr: true }
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-[#17212B] flex flex-col relative selection:bg-[#0552A2] selection:text-white">
      {/* Premium Floating Navigation */}
      <Navigation />

      {/* Hero Section — Somewhere Between Earth and Heaven */}
      <HeroSection />

      {/* Nepal Storytelling — More Than a Destination. A Feeling That Stays. */}
      <StorytellingSection />

      {/* Editorial Destinations Layout */}
      <DestinationsSection />

      {/* Experiences Discovery Showcase */}
      <ExperiencesSection />

      {/* Culture & Living Heritage */}
      <CultureSection />

      {/* Interactive Plan Your Trip Console (Code-split) */}
      <PlanYourTripSection />

      {/* Official Tourism Board Footer */}
      <Footer />
    </main>
  );
}
