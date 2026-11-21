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
    <div className="bg-[#F2F8FD] border border-[#92C4EA]/30 rounded-2xl p-3.5 flex flex-col gap-3 shadow-xs relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#92C4EA]/25 pb-2">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-[#0552A2]/10 text-[#0552A2]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#0552A2] uppercase tracking-wider">Co-Planner Hub</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-full border border-slate-200">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0552A2]" />
          <span className="text-[8px] font-mono text-slate-500 font-medium">You</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[8px] font-mono text-slate-500 font-medium">Guide</span>
        </div>
      </div>

      {/* Main Layout: Split Columns */}
      <div className="grid grid-cols-[1.15fr_1fr] gap-3">
        {/* Left Column: Minimal Calendar */}
        <div className="flex flex-col gap-1.5 border-r border-[#92C4EA]/20 pr-2">
          <div className="flex justify-between items-center px-0.5">
            <span className="text-[9px] font-mono font-bold text-[#17212B] uppercase tracking-wide">
              {new Date().toLocaleString('default', { month: 'short' })} {new Date().getFullYear()}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-0.5 bg-white p-1 rounded-xl border border-slate-200">
            {['S','M','T','W','T','F','S'].map((d, i) => (
              <div key={i} className="text-center text-[7.5px] font-mono font-bold text-slate-400 py-0.5">{d}</div>
            ))}
            {Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() }, (_, i) => <div key={'e' + i} />).concat(
              Array.from({ length: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() }, (_, i) => i + 1).map(day => {
                const y = new Date().getFullYear(), m = new Date().getMonth(), isToday = day === new Date().getDate();
                const mu = calendarMarks[`u-${y}-${m}-${day}`], mc = calendarMarks[`c-${y}-${m}-${day}`];
                return (
                  <button
                    key={day}
                    onClick={() => {
                      const k = `u-${y}-${m}-${day}`;
                      onCalendarMarksChange(prev => ({ ...prev, [k]: !prev[k] }));
                    }}
                    className={`h-5 w-full rounded flex items-center justify-center text-[8px] font-mono transition-colors relative ${
                      isToday ? 'bg-[#0552A2] text-white font-bold' : mu ? 'bg-[#92C4EA]/40 text-[#0552A2] font-bold' : mc ? 'bg-emerald-100 text-emerald-800' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Shared Notes */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Expedition Notes</span>
            <textarea
              value={userNote}
              onChange={(e) => onUserNoteChange(e.target.value)}
              placeholder="Private packing or permit notes..."
              rows={2}
              className="w-full bg-white border border-slate-200 rounded-lg p-1.5 text-[9px] text-[#17212B] placeholder-slate-400 focus:outline-none focus:border-[#0552A2] resize-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-mono font-bold text-[#0552A2] uppercase">Guide Dispatch</span>
            <div className="bg-white border border-[#92C4EA]/40 rounded-lg p-1.5 text-[9px] text-slate-600 leading-tight">
              {companyNote || "Acclimatization day scheduled for Namche Bazaar (3,440m). Safety beacon active."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
