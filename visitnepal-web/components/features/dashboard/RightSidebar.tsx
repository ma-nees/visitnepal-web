'use client';

import React, { useState } from 'react';
import NepalBackgroundMap from '@/components/features/chat/NepalBackgroundMap';
import WeatherTelemetry from '@/components/features/chat/WeatherTelemetry';
import CoPlannerHub from '@/components/features/chat/CoPlannerHub';
import ChatsList, { Channel } from '@/components/features/chat/ChatsList';

export type { Channel };

export interface RightSidebarProps {
  rightCollapsed: boolean;
  onRightCollapsedChange: (val: boolean) => void;
  isFullExpanded: boolean;
  onIsFullExpandedChange: (val: boolean) => void;
  rightSidebarTab: 'telemetry' | 'chat';
  onRightSidebarTabChange: (val: 'telemetry' | 'chat') => void;
  chatViewState: 'inbox' | 'conversation';
  onChatViewStateChange: (val: 'inbox' | 'conversation') => void;
  collapsed: boolean; // Left sidebar collapsed state
  channels: Channel[];
  activeChannelId: string;
  onActiveChannelIdChange: (id: string) => void;
  expandedChannelId: string | null;
  onExpandedChannelIdChange: (id: string | null) => void;
  weather: {
    region: string;
    temp: string;
    status: string;
    alert: string;
  };
  calendarMarks: Record<string, boolean>;
  onCalendarMarksChange: (updater: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  userNote: string;
  onUserNoteChange: (note: string) => void;
  companyNote: string;
  onCompanyNoteChange: (note: string) => void;
  renderSingleChatView: (chan: Channel, showBackButton: boolean) => React.ReactNode;
}

export default function RightSidebar({
  rightCollapsed,
  onRightCollapsedChange,
  isFullExpanded,
  onIsFullExpandedChange,
  rightSidebarTab,
  onRightSidebarTabChange,
  chatViewState,
  onChatViewStateChange,
  collapsed,
  channels,
  activeChannelId,
  onActiveChannelIdChange,
  expandedChannelId,
  onExpandedChannelIdChange,
  weather,
  calendarMarks,
  onCalendarMarksChange,
  userNote,
  onUserNoteChange,
  companyNote,
  onCompanyNoteChange,
  renderSingleChatView,
}: RightSidebarProps) {
  const [showMap, setShowMap] = useState(true);
  const activeChannelObj = channels.find(c => c.id === activeChannelId) || channels[0];

  const renderContent = (isMobile: boolean = false) => {
    if (rightSidebarTab === 'chat') {
      return (
        <div className="flex flex-col flex-1 min-h-0 relative text-left w-full overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-3 sm:px-3.5 h-11 shrink-0 flex items-center justify-between border-b border-slate-200 gap-2">
            <span className="text-[11px] font-mono font-bold text-[#0552A2] uppercase tracking-wider truncate">
              {chatViewState === 'inbox' ? 'Expedition Dispatches' : 'Active Conversation'}
            </span>

            <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 shrink-0">
              {!isMobile && (
                <button
                  onClick={() => {
                    const next = !isFullExpanded;
                    onRightCollapsedChange(false);
                    onIsFullExpandedChange(next);
                    if (next) onExpandedChannelIdChange(null);
                  }}
                  className={`p-1 rounded-md transition-colors cursor-pointer flex items-center justify-center ${(!rightCollapsed && isFullExpanded)
                    ? 'bg-[#0552A2] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                    }`}
                  style={{ width: '22px', height: '22px' }}
                  title={isFullExpanded ? 'Standard Width' : 'Full Width Split'}
                >
                  {isFullExpanded ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" />
                      <line x1="10" y1="14" x2="3" y2="21" /><line x1="21" y1="3" x2="14" y2="10" />
                    </svg>
                  ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  )}
                </button>
              )}

              <button
                onClick={() => {
                  if (isFullExpanded) {
                    onIsFullExpandedChange(false);
                  } else {
                    onRightCollapsedChange(true);
                  }
                }}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                style={{ width: '26px', height: '26px' }}
                title="Close / Collapse"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat Inbox vs Conversation vs Multi-Column */}
          <div className="flex-1 flex flex-col min-h-0 p-2.5 sm:p-3">
            {isFullExpanded && !isMobile ? (
              <div className="flex-1 flex overflow-hidden gap-4">
                <div className="w-80 shrink-0 border-r border-slate-100 pr-4 overflow-y-auto">
                  <ChatsList
                    channels={channels}
                    activeChannelId={activeChannelId}
                    onSelectChannel={(id) => {
                      onActiveChannelIdChange(id);
                      onExpandedChannelIdChange(id);
                    }}
                    onExpandToggle={(id) => {
                      onExpandedChannelIdChange(expandedChannelId === id ? null : id);
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  {renderSingleChatView(activeChannelObj, false)}
                </div>
              </div>
            ) : (
              chatViewState === 'inbox' ? (
                <div className="flex-1 overflow-y-auto">
                  <ChatsList
                    channels={channels}
                    activeChannelId={activeChannelId}
                    onSelectChannel={(id) => {
                      onActiveChannelIdChange(id);
                      onChatViewStateChange('conversation');
                    }}
                    onExpandToggle={(id) => {
                      onExpandedChannelIdChange(expandedChannelId === id ? null : id);
                    }}
                  />
                </div>
              ) : (
                <div className="flex-1 flex flex-col min-h-0">
                  {renderSingleChatView(activeChannelObj, true)}
                </div>
              )
            )}
          </div>
        </div>
      );
    }

    // Telemetry view
    return (
      <div className="flex flex-col flex-1 min-h-0 text-left overflow-y-auto">
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-3.5 h-11 shrink-0 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center">
            <span className="text-[10px] font-semibold text-[#0552A2] uppercase tracking-[0.14em]">
              Himalayan Intel &amp; Weather
            </span>
          </div>
          <button
            onClick={() => onRightCollapsedChange(true)}
            className="p-1 rounded-lg text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer"
            title="Collapse"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {/* Weather Telemetry */}
          <div className="px-3.5 py-2.5">
            <WeatherTelemetry rightCollapsed={false} weather={weather} />
          </div>

          {/* Geographic Locator Map (Compact & Collapsible) */}
          <div className="px-3.5 py-3 flex flex-col gap-2">
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.14em] whitespace-nowrap">
                Topographic Map
              </span>

              <button
                onClick={() => setShowMap(!showMap)}
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold transition-all duration-200 cursor-pointer bg-slate-100 hover:bg-[#0552A2]/10 text-slate-600 hover:text-[#0552A2] border border-slate-200/80 shadow-2xs"
                title={showMap ? "Hide Topographic Map" : "Show Topographic Map"}
              >
                <span>{showMap ? 'Hide' : 'Show'}</span>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${showMap ? 'rotate-180' : 'rotate-0'}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            {showMap && (
              <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-0.5">
                  <span className="text-slate-400">Coordinates</span>
                  <span className="text-[#0552A2] font-semibold">27.7172° N, 85.3240° E</span>
                </div>
                <div className="h-36 w-full rounded-xl overflow-hidden relative bg-white border border-[#0552A2]/10 shadow-[inset_0_1px_4px_rgba(5,82,162,0.05)]">
                  <NepalBackgroundMap isSidebar={true} theme="light" />
                </div>
              </div>
            )}
          </div>

          {/* Co-Planner Hub */}
          <div className="px-3.5 py-2.5">
            <CoPlannerHub
              calendarMarks={calendarMarks}
              onCalendarMarksChange={onCalendarMarksChange}
              userNote={userNote}
              onUserNoteChange={onUserNoteChange}
              companyNote={companyNote}
              onCompanyNoteChange={onCompanyNoteChange}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* ── 1. DESKTOP PERSISTENT DRAWER (>= xl screens) ────────────────── */}
      <aside
        className={`hidden xl:flex flex-col shrink-0 h-full select-none relative z-30 bg-white transition-all duration-300 overflow-hidden ${rightCollapsed ? 'w-0 border-l-0' : 'border-l border-slate-200'
          }`}
        style={{
          width: rightCollapsed
            ? '0px'
            : (isFullExpanded
              ? `calc(100vw - ${collapsed ? '54px' : '204px'})`
              : (rightSidebarTab === 'chat' ? '380px' : '310px')),
        }}
      >
        {/* Sidebar Content */}
        {!rightCollapsed && (
          <div className="flex flex-col flex-1 min-h-0 text-left w-full">
            {renderContent(false)}
          </div>
        )}
      </aside>

      {/* ── 2. MOBILE & TABLET SLIDE-OVER DRAWER (< xl screens) ─────────── */}
      {!rightCollapsed && (
        <div className="xl:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Overlay */}
          <div
            onClick={() => onRightCollapsedChange(true)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <div className="relative w-full sm:w-[420px] max-w-full sm:max-w-[92vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <div className="flex-1 overflow-hidden flex flex-col min-h-0">
              {renderContent(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
