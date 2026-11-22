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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          Telemetry
        </span>
        <span className="text-[9px] font-medium text-slate-500">
          Live 10m Sync
        </span>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h4 className="text-xs font-bold text-[#17212B] truncate">{weather.region}</h4>
          <span className="text-[10px] text-slate-500 block truncate mt-0.5">{weather.status}</span>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xl font-bold tracking-tight text-[#0552A2] leading-none block">
            {weather.temp}
          </span>
          <span
            className={`inline-block text-[8px] font-bold text-white px-2 py-0.5 rounded-full mt-1 ${
              weather.alert?.toLowerCase().includes('warning')
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
          >
            {weather.alert}
          </span>
        </div>
      </div>
    </div>
  );
}
