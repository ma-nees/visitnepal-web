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
    <div className="bg-[#F2F8FD] p-4 rounded-2xl border border-[#92C4EA]/30 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold text-[#0552A2] uppercase tracking-wider">Himalayan Telemetry</span>
        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <h4 className="text-sm font-bold text-[#17212B]">{weather.region}</h4>
      
      <div className="grid grid-cols-2 gap-2 mt-1 font-mono text-[10px]">
        <div className="bg-white p-2 rounded-xl border border-slate-200/60">
          <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Base Temp</span>
          <span className="font-bold text-base text-[#0552A2]">{weather.temp}</span>
        </div>
        <div className="bg-white p-2 rounded-xl border border-slate-200/60">
          <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Conditions</span>
          <span className="font-bold text-xs text-slate-700 mt-1 block">{weather.status}</span>
        </div>
      </div>
      <div className="border-t border-[#92C4EA]/25 pt-2 mt-0.5 flex items-center justify-between">
        <span className="inline-block text-[9px] font-bold font-mono text-[#0552A2] uppercase bg-white px-2.5 py-1 rounded-md border border-[#92C4EA]/40">
          {weather.alert}
        </span>
        <span className="text-[9px] font-mono text-slate-400">Live 10m Sync</span>
      </div>
    </div>
  );
}
