'use client';

import React from 'react';

export interface WeatherData {
  region: string;
  temp: string;
  status: string;
  alert: string;
}

export interface WeatherTelemetryProps {
  rightCollapsed: boolean;
  weather: WeatherData;
}

export default function WeatherTelemetry({ rightCollapsed, weather }: WeatherTelemetryProps) {
  if (rightCollapsed) {
    return (
      <div className="flex justify-center text-lg py-2 text-[#0552A2]" title={weather.region}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.14em]">
          Himalayan Telemetry
        </span>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#64748B]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live 10m Sync
        </span>
      </div>

      <h4 className="text-[15px] font-bold text-[#17212B] leading-snug">{weather.region}</h4>

      <div className="grid grid-cols-2 gap-4 pt-1">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-medium text-[#64748B] block">
            Base Temp
          </span>
          <span className="text-2xl font-bold tracking-tight text-[#0552A2] mt-0.5 block leading-none">
            {weather.temp}
          </span>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider font-medium text-[#64748B] block">
            Conditions
          </span>
          <span className="text-sm font-semibold text-[#17212B] mt-1 block leading-snug">
            {weather.status}
          </span>
        </div>
      </div>

      <div className="pt-1">
        <span className="inline-flex items-center text-[10px] font-semibold text-[#0552A2] bg-[#F2F8FD] px-2.5 py-1 rounded-full">
          {weather.alert}
        </span>
      </div>
    </div>
  );
}
