'use client';

import React from 'react';
import FlightRouteAnimation from '@/components/features/dashboard/FlightRouteAnimation';

export default function FlightAnimationPreviewPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl">
        <FlightRouteAnimation />
      </div>
    </main>
  );
}
