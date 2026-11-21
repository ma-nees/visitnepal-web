'use client';

import React from 'react';
import Image from 'next/image';
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
  const activeChannelObj = channels.find(c => c.id === activeChannelId) || channels[0];

  return (
    <aside
      className="hidden xl:flex flex-col shrink-0 h-full select-none relative z-30 bg-[#F6FAFD] border-l border-slate-200 transition-all duration-300"
      style={{
        width: rightCollapsed 
          ? '56px' 
          : (isFullExpanded 
            ? `calc(100vw - ${collapsed ? '64px' : '240px'})` 
            : '360px'),
      }}
    >
      {/* Collapse Toggle + Collapsed People Avatar Rail (Only when collapsed) */}
      {rightCollapsed && (
        <div className="flex flex-col items-center flex-1 min-h-0">
          <div className="flex flex-col items-center gap-2 py-4 border-b border-slate-100 w-full">
            <button
              onClick={() => { onRightCollapsedChange(false); onIsFullExpandedChange(false); }}
              className="p-2 rounded-xl text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer"
              title="Expand Drawer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center gap-3.5 py-4 overflow-y-auto w-full scrollbar-thin">
            {channels.map((chan) => {
              const isAi = chan.id === 'ch-ai';
              const isActive = activeChannelId === chan.id;
              return (
                <button
                  key={chan.id}
                  onClick={() => {
                    onRightSidebarTabChange('chat');
                    onActiveChannelIdChange(chan.id);
                    onChatViewStateChange('conversation');
                    onRightCollapsedChange(false);
                    onIsFullExpandedChange(false);
                  }}
                  title={chan.name}
                  className="relative group cursor-pointer focus:outline-none"
                >
                  <div
                    className={`h-10 w-10 rounded-full overflow-hidden border transition-all ${
                      isActive
                        ? 'border-[#0552A2] ring-2 ring-[#0552A2]/25'
                        : 'border-slate-200 group-hover:border-[#0552A2] group-hover:scale-105'
                    }`}
                  >
                    <img
                      src={chan.avatar}
                      alt={chan.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                      isAi ? 'bg-[#0552A2]' : 'bg-emerald-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sidebar Content */}
      <div className="flex flex-col flex-1 min-h-0 text-left">
        {rightSidebarTab === 'chat' ? (
          /* ── CHAT SECTION ───────────────────────────────────────────── */
          !rightCollapsed ? (
            <div className="flex flex-col flex-1 min-h-0 p-4 relative">
              {/* Header */}
              <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md pb-3 mb-2 flex items-center justify-between border-b border-slate-100">
                <span className="text-[11px] font-mono font-bold text-[#0552A2] uppercase tracking-wider">
                  {chatViewState === 'inbox' ? 'Expedition Dispatches' : 'Active Conversation'}
                </span>
                
                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => {
                      const next = !isFullExpanded;
                      onRightCollapsedChange(false);
                      onIsFullExpandedChange(next);
                      if (next) onExpandedChannelIdChange(null);
                    }}
                    className={`p-1 rounded-md transition-colors cursor-pointer flex items-center justify-center ${
                      (!rightCollapsed && isFullExpanded)
                        ? 'bg-[#0552A2] text-white shadow-xs' 
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                    style={{ width: '22px', height: '22px' }}
                    title={isFullExpanded ? 'Standard Width' : 'Full Width Split'}
                  >
                    {isFullExpanded ? (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>
                        <line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>
                      </svg>
                    ) : (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                        <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      if (isFullExpanded) {
                        onIsFullExpandedChange(false);
                      } else {
                        onRightCollapsedChange(true);
                      }
                    }}
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 transition-colors cursor-pointer flex items-center justify-center"
                    style={{ width: '22px', height: '22px' }}
                    title="Collapse Drawer"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              {isFullExpanded ? (
                /* ── EXPANDED SPLIT VIEW ──────────────────── */
                <div className="flex flex-1 min-h-0 gap-0 overflow-hidden divide-x divide-slate-100">
                  {/* Channels column */}
                  <div className="w-72 flex-shrink-0 flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-slate-100">
                      <input 
                        type="text" 
                        placeholder="Search dispatches..." 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#17212B] placeholder-slate-400 focus:outline-none focus:border-[#0552A2]" 
                      />
                    </div>
                    <div className="flex-1 overflow-y-auto flex flex-col gap-1 p-2 scrollbar-thin">
                      {channels.map((chan) => {
                        const lastMsg = chan.messages[chan.messages.length - 1];
                        const isAi = chan.id === 'ch-ai';
                        const isMeLast = lastMsg?.sender === 'user';
                        return (
                          <button
                            key={chan.id}
                            onClick={() => onExpandedChannelIdChange(chan.id)}
                            className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-colors text-left cursor-pointer ${
                              expandedChannelId === chan.id
                                ? 'bg-[#0552A2]/10 border border-[#0552A2]/20'
                                : 'hover:bg-slate-50 border border-transparent'
                            }`}
                          >
                            <div className="relative shrink-0">
                              <img src={chan.avatar} alt={chan.name} className="h-9 w-9 rounded-full object-cover border border-slate-200" />
                              <span className={`absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white ${isAi ? 'bg-[#0552A2] animate-pulse' : 'bg-emerald-500'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h4 className={`text-xs font-bold truncate leading-none ${expandedChannelId === chan.id ? 'text-[#0552A2]' : 'text-[#17212B]'}`}>{chan.name}</h4>
                                <span className="text-[9px] font-mono text-slate-400 shrink-0">{lastMsg ? lastMsg.timestamp : '—'}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 truncate mt-1 leading-tight">
                                {lastMsg ? (isMeLast ? `You: ${lastMsg.isVoice ? '🎙 Voice' : lastMsg.text}` : lastMsg.text) : 'No messages'}
                              </p>
                            </div>
                            {chan.unread && <span className="h-2 w-2 rounded-full bg-[#EC1F27] shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Conversation column */}
                  <div className="flex-1 flex flex-col min-h-0 overflow-hidden pl-4">
                    {expandedChannelId ? (
                      renderSingleChatView(channels.find(c => c.id === expandedChannelId) || channels[0], false)
                    ) : (
                      <div className="flex flex-col items-center justify-center flex-1 gap-4 px-8 text-center">
                        <div className="relative h-16 w-32">
                          <Image src="/logo.png" alt="Visit Nepal Logo" fill className="object-contain" unoptimized />
                        </div>
                        <h3 className="text-sm font-bold text-[#17212B]">Select an Expedition Dispatch</h3>
                        <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                          Connect with your Sherpa guides, Himalayan rescue coordinators, or luxury lodge hosts in real time.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* ── COMPACT SINGLE VIEW ──────────────────── */
                chatViewState === 'inbox' ? (
                  <ChatsList
                    channels={channels}
                    onActiveChannelIdChange={onActiveChannelIdChange}
                    onChatViewStateChange={onChatViewStateChange}
                  />
                ) : (
                  renderSingleChatView(activeChannelObj, true)
                )
              )}
            </div>
          ) : null
        ) : (
          /* ── TELEMETRY & INTEL SECTION ───────────────────────────── */
          !rightCollapsed ? (
            <div className="flex flex-col flex-1 min-h-0 overflow-y-auto scrollbar-thin">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#0552A2]/10">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-semibold text-[#0552A2] uppercase tracking-[0.14em]">
                    Himalayan Intel &amp; Weather
                  </span>
                </div>
                <button
                  onClick={() => onRightCollapsedChange(true)}
                  className="p-1 rounded-lg text-slate-400 hover:text-[#0552A2] hover:bg-[#F2F8FD] transition-colors cursor-pointer"
                  title="Collapse"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              <div className="divide-y divide-[#0552A2]/10">
                {/* Weather Telemetry */}
                <div className="px-5 py-4">
                  <WeatherTelemetry rightCollapsed={false} weather={weather} />
                </div>

                {/* Geographic Locator Map */}
                <div className="px-5 py-4 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-[#64748B] uppercase tracking-[0.14em]">
                      Topographic Map
                    </span>
                    <span className="text-[10px] font-mono text-[#0552A2] font-semibold">
                      27.7172° N, 85.3240° E
                    </span>
                  </div>
                  <div className="h-36 w-full rounded-[14px] overflow-hidden relative bg-[#F8FBFF]">
                    <NepalBackgroundMap isSidebar={true} />
                  </div>
                </div>

                {/* Co-Planner Hub */}
                <div className="px-5 py-4">
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
          ) : null
        )}
      </div>
    </aside>
  );
}
