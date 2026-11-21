'use client';

import React from 'react';
import { ChatChannel } from '@/store/useTravelStore';

export type Channel = ChatChannel;

export interface ChatsListProps {
  channels: ChatChannel[];
  activeChannelId?: string;
  onActiveChannelIdChange?: (id: string) => void;
  onChatViewStateChange?: (state: 'inbox' | 'conversation') => void;
  onSelectChannel?: (id: string) => void;
  onExpandToggle?: (id: string) => void;
}

export default function ChatsList({
  channels,
  activeChannelId,
  onActiveChannelIdChange,
  onChatViewStateChange,
  onSelectChannel,
  onExpandToggle,
}: ChatsListProps) {
  return (
    <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-1 min-h-0 my-1 py-1 scrollbar-thin">
      <div className="flex flex-col gap-1.5">
        {channels.map((chan) => {
          const lastMsg = chan.messages[chan.messages.length - 1];
          const isAi = chan.id === 'ch-ai';
          const isMeLast = lastMsg?.sender === 'user';
          const isSelected = activeChannelId === chan.id;
          
          return (
            <button
              key={chan.id}
              onClick={() => {
                if (onSelectChannel) {
                  onSelectChannel(chan.id);
                } else if (onActiveChannelIdChange) {
                  onActiveChannelIdChange(chan.id);
                }
                if (onChatViewStateChange) {
                  onChatViewStateChange('conversation');
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left cursor-pointer group border ${
                isSelected
                  ? 'bg-[#F2F8FD] border-[#0552A2]/30'
                  : 'hover:bg-[#F2F8FD] border-transparent hover:border-[#92C4EA]/30'
              }`}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img src={chan.avatar} alt={chan.name} className="h-10 w-10 rounded-full object-cover border border-slate-200" />
                <span 
                  className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${
                    isAi ? 'bg-[#0552A2] animate-pulse' : 'bg-emerald-500'
                  }`} 
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <h4 className="text-xs font-bold text-[#17212B] truncate leading-none group-hover:text-[#0552A2] transition-colors">
                    {chan.name}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-400 shrink-0">
                    {lastMsg ? lastMsg.timestamp : '12:45 PM'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-1 mt-1.5">
                  <p className="text-[11px] text-slate-500 truncate leading-tight flex-1 font-sans">
                    {lastMsg ? (
                      isMeLast ? `You: ${lastMsg.isVoice ? '🎙 Voice Note' : lastMsg.text}` : lastMsg.text
                    ) : (
                      <span className="italic opacity-50">No messages yet</span>
                    )}
                  </p>
                  {chan.unread && (
                    <span className="h-2 w-2 rounded-full bg-[#EC1F27] shrink-0" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
