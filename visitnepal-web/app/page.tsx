import React from 'react';
import dynamic from 'next/dynamic';
import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import StorytellingSection from '@/components/sections/StorytellingSection';
import DestinationsSection from '@/components/sections/DestinationsSection';
import Footer from '@/components/sections/Footer';

// Code-split below-the-fold interactive components for fast First Contentful Paint and lean initial bundle
const ExperiencesSection = dynamic(
  () => import('@/components/sections/ExperiencesSection'),
  {
    loading: () => <section id="experiences" className="py-24 md:py-32 bg-[#F2F8FD] min-h-[640px]" aria-hidden="true" />,
  }
);

const CultureSection = dynamic(
  () => import('@/components/sections/CultureSection'),
  {
    loading: () => <section id="culture" className="py-24 md:py-32 bg-white min-h-[640px]" aria-hidden="true" />,
  }
);

const PlanYourTripSection = dynamic(
  () => import('@/components/sections/PlanYourTripSection'),
  {
    loading: () => <section id="plan-your-trip" className="py-24 md:py-32 bg-white min-h-[680px]" aria-hidden="true" />,
  }
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
