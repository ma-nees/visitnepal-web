'use client';

import React from 'react';

export interface CoPlannerHubProps {
  calendarMarks: Record<string, boolean>;
  onCalendarMarksChange: (updater: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  userNote: string;
  onUserNoteChange: (note: string) => void;
  companyNote: string;
  onCompanyNoteChange: (note: string) => void;
}

export default function CoPlannerHub({
  calendarMarks,
  onCalendarMarksChange,
  userNote,
  onUserNoteChange,
  companyNote,
  onCompanyNoteChange,
}: CoPlannerHubProps) {
  return (
    <div className="flex flex-col gap-2.5 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <svg className="text-[#0552A2]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Co-Planner Hub</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0552A2]" />
            You
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Guide
          </span>
        </div>
      </div>

      {/* Minimal Calendar */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-bold text-[#17212B] tracking-tight">
          {new Date().toLocaleString('default', { month: 'long' })} {new Date().getFullYear()}
        </span>

        <div className="grid grid-cols-7 gap-0.5">
          {['S','M','T','W','T','F','S'].map((d, i) => (
            <div key={i} className="text-center text-[9px] font-semibold text-slate-400 py-0.5">{d}</div>
          ))}
          {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() }, (_, i) => <div key={'e' + i} />).concat(
            Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
              const y = new Date().getFullYear(), m = new Date().getMonth(), isToday = day === new Date().getDate();
              const mu = calendarMarks[`u-${y}-${m}-${day}`], mc = calendarMarks[`c-${y}-${m}-${day}`];
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => {
                    const k = `u-${y}-${m}-${day}`;
                    onCalendarMarksChange(prev => ({ ...prev, [k]: !prev[k] }));
                  }}
                  className={`h-5 w-5 mx-auto rounded-full flex items-center justify-center text-[10px] font-medium transition-colors cursor-pointer ${
                    isToday ? 'bg-[#0552A2] text-white font-bold' : mu ? 'bg-[#E3EFFB] text-[#0552A2] font-bold' : mc ? 'bg-emerald-100 text-emerald-800 font-semibold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {day}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Shared Notes */}
      <div className="flex flex-col gap-2 pt-0.5">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider">Expedition Notes</span>
          <textarea
            value={userNote}
            onChange={(e) => onUserNoteChange(e.target.value)}
            placeholder="Private notes..."
            rows={1}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-[#17212B] placeholder-slate-400 focus:outline-none focus:border-[#0552A2] focus:bg-white resize-none"
          />
        </div>

        <div className="border-l-2 border-[#0552A2] pl-2 py-0.5 flex flex-col gap-0.5">
          <span className="text-[9px] font-semibold text-[#0552A2] uppercase tracking-wider">Guide Dispatch</span>
          <p className="text-[10px] text-slate-600 leading-snug">
            {companyNote || "Acclimatization day at Namche Bazaar (3,440m). Beacon active."}
          </p>
        </div>
      </div>
    </div>
  );
}
