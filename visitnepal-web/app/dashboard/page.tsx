'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DiscoverSection from '@/components/features/dashboard/DiscoverSection';
import DashboardHome from '@/components/features/dashboard/DashboardHome';
import ActivitiesSection from '@/components/features/dashboard/ActivitiesSection';
import LeftSidebar from '@/components/features/dashboard/LeftSidebar';
import RightSidebar from '@/components/features/dashboard/RightSidebar';
import InfoDetailPanel from '@/components/features/info/InfoDetailPanel';
import StaysSection from '@/components/features/dashboard/StaysSection';
import GuidesPermitsSection from '@/components/features/dashboard/GuidesPermitsSection';
import AccountSection from '@/components/features/dashboard/AccountSection';
import HostSection from '@/components/features/dashboard/HostSection';
import { useTravelStore } from '@/store/useTravelStore';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  SlidersHorizontal,
  Compass,
  Flame,
  Landmark,
  Trophy,
  Activity,
  Mountain,
  MountainSnow,
  PawPrint,
  Scroll,
  Leaf,
  Zap,
  Hotel,
  Car,
  UserCheck,
  TicketCheck,
  UserPlus,
  Building2,
  MapPinPlus,
  ShieldCheck,
  MessageSquare,
  LucideIcon,
} from 'lucide-react';

// ─── Type Definitions ─────────────────────────────────────────────────────────
type NavItem = {
  label: string;
  icon: LucideIcon | React.ComponentType<{ size?: number; className?: string }> | string;
  id: string;
  badge?: string
};
type NavGroup = { title: string; items: NavItem[] };

// ─── Sidebar Data ─────────────────────────────────────────────────────────────
const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Discover',
    items: [
      { id: 'home', label: 'Home', icon: Home },
      { id: 'customize', label: 'Customize Trip', icon: SlidersHorizontal },
      { id: 'explore', label: 'Explore', icon: Compass },
      { id: 'popular', label: 'Popular', icon: Flame },
      { id: 'attractions', label: 'Attractions', icon: Landmark },
      { id: 'top5', label: 'Top 5 Destinations', icon: Trophy },
    ],
  },
  {
    title: 'Activities & Travel',
    items: [
      { id: 'activities', label: 'Activities', icon: Activity },
      { id: 'trekking', label: 'Trekking', icon: Mountain },
      { id: 'mountaineering', label: 'Mountaineering', icon: MountainSnow },
      { id: 'wildlife', label: 'Wildlife', icon: PawPrint },
      { id: 'cultural', label: 'Cultural & Religious', icon: Scroll },
      { id: 'ecotourism', label: 'Eco Tourism', icon: Leaf },
      { id: 'adventure', label: 'Adventure', icon: Zap },
    ],
  },
  {
    title: 'Stays & Transport',
    items: [
      { id: 'hotels', label: 'Hotels', icon: Hotel },
      { id: 'transportation', label: 'Transportation', icon: Car },
    ],
  },
  {
    title: 'Guides & Permits',
    items: [
      { id: 'guides', label: 'Guides', icon: UserCheck },
      { id: 'permits', label: 'Permits', icon: TicketCheck },
    ],
  },
  {
    title: 'Host & List',
    items: [
      { id: 'becomehost', label: 'Become a Host', icon: UserPlus },
      { id: 'listproperty', label: 'List Your Property', icon: Building2 },
      { id: 'listattraction', label: 'List an Attraction', icon: MapPinPlus },
      { id: 'listpermit', label: 'Permit Authority', icon: ShieldCheck },
    ],
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      return sp.get('section') || sp.get('from') || 'home';
    }
    return 'home';
  });
  const [previousActive, setPreviousActive] = useState('explore');

  useEffect(() => {
    const handlePopState = () => {
      const sp = new URLSearchParams(window.location.search);
      const section = sp.get('section') || 'home';
      setActive(section);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleActiveChange = (newActiveId: string) => {
    if (['everest', 'pokhara', 'kathmandu', 'chitwan', 'mustang'].includes(newActiveId)) {
      setPreviousActive(active);
      window.history.pushState(null, '', `/info/${newActiveId}?from=${active}`);
    } else {
      window.history.pushState(null, '', `/dashboard?section=${newActiveId}`);
    }
    setActive(newActiveId);
  };

  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Keyboard shortcut: Ctrl+B to toggle left sidebar, Ctrl+I to toggle right sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setCollapsed((c) => !c);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setRightCollapsed((c) => !c);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const [rightCollapsed, setRightCollapsed] = useState(true);
  const [isFullExpanded, setIsFullExpanded] = useState(false);
  const [expandedChannelId, setExpandedChannelId] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [rightSidebarTab, setRightSidebarTab] = useState<'telemetry' | 'chat'>('telemetry');
  const [chatViewState, setChatViewState] = useState<'inbox' | 'conversation'>('inbox');
  const [chatInput, setChatInput] = useState('');

  // Messenger states
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);
  const [calendarMarks, setCalendarMarks] = useState<Record<string, boolean>>({});
  const [userNote, setUserNote] = useState('');
  const [companyNote, setCompanyNote] = useState('');
  const [reactions, setReactions] = useState<Record<string, string>>({});
  const [actionAlert, setActionAlert] = useState<{ message: string; contactName: string; visible: boolean }>({ message: '', contactName: '', visible: false });

  const {
    currentUser,
    channels,
    activeChannelId,
    setActiveChannelId,
    sendMessage,
    sendVoiceMessage,
    toggleTranslation,
    setTyping
  } = useTravelStore();

  const chatEndRef = useRef<HTMLDivElement>(null);
  const floatingChatEndRef = useRef<HTMLDivElement>(null);

  const toggleReaction = (msgId: string, emoji: string) => {
    setReactions(prev => {
      if (prev[msgId] === emoji) {
        const updated = { ...prev };
        delete updated[msgId];
        return updated;
      }
      return { ...prev, [msgId]: emoji };
    });
  };

  const handleActionAlert = (message: string, contactName: string) => {
    setActionAlert({ message, contactName, visible: true });
    setTimeout(() => {
      setActionAlert(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Auto-scroll chat window to bottom
  useEffect(() => {
    if (rightSidebarTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [channels, rightSidebarTab, activeChannelId]);

  // Auto-scroll floating chat window to bottom
  useEffect(() => {
    if (floatingChatOpen) {
      floatingChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [channels, floatingChatOpen, activeChannelId]);

  // Auth verification check
  useEffect(() => {
    if (!currentUser || !currentUser.loggedIn) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser || !currentUser.loggedIn) {
    return (
      <div className="h-screen w-screen bg-white flex items-center justify-center font-mono text-xs text-[#0552A2] tracking-widest uppercase">
        <span className="h-2 w-2 bg-[#0552A2] rounded-full animate-ping mr-2" />
        Connecting to Visit Nepal Travel Portal...
      </div>
    );
  }

  const getActiveItemDetails = () => {
    for (const group of NAV_GROUPS) {
      const found = group.items.find(item => item.id === active);
      if (found) {
        return { groupTitle: group.title, itemLabel: found.label };
      }
    }
    return { groupTitle: 'Discover', itemLabel: 'Home' };
  };

  const activeDetails = getActiveItemDetails();

  // Dynamic weather mappings based on active section
  const getWeatherInfo = () => {
    if (['trekking', 'mountaineering', 'top5'].includes(active)) {
      return { region: 'Khumbu Peak Station (5,364m)', temp: '-6°C', status: 'Clear Sky, High UV', alert: 'Altitude Warning: 5,000m+' };
    }
    if (['adventure', 'explore'].includes(active)) {
      return { region: 'Pokhara Lakeside (822m)', temp: '24°C', status: 'Pleasant Breeze', alert: 'Paragliding Clear Window' };
    }
    if (['wildlife'].includes(active)) {
      return { region: 'Chitwan Jungles (150m)', temp: '31°C', status: 'Subtropical Sunshine', alert: 'Safari Active Today' };
    }
    return { region: 'Kathmandu Gateway (1,400m)', temp: '22°C', status: 'Sunny & Clear', alert: 'Safe Altitude Window' };
  };

  const weather = getWeatherInfo();

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    sendMessage(activeChannelId, userMsg, 'user');
    setChatInput('');

    // Responses from providers
    setTimeout(() => {
      setTyping(activeChannelId, true);
      setTimeout(() => {
        setTyping(activeChannelId, false);

        let replyText = "Namaste! Connecting to the central station in Kathmandu. We will assist your journey shortly.";
        if (activeChannelId === 'ch-ai') {
          replyText = `Sherpa AI Assistant: I've verified coordinates for "${userMsg}". The trail conditions are favorable with stable atmospheric readings across the central ranges.`;
        } else if (activeChannelId === 'ch-g1') {
          replyText = `Nima Sherpa (Lead Guide): Tashi Delek, ${currentUser.name}! High-altitude gear is checked and our climbing permits are confirmed. Ready when you are!`;
        } else if (activeChannelId === 'ch-s1') {
          replyText = `Shangri-La Concierge: Welcome! Your mountain view suite is prepared with panoramic valley vistas. Private tea service is ready at 4 PM.`;
        }
        sendMessage(activeChannelId, replyText, activeChannelId === 'ch-ai' ? 'ai' : 'provider');
      }, 1400);
    }, 700);
  };

  // Group resolver helper to know which Section view component to render
  const renderActiveSection = () => {
    if (active === 'home') {
      return <DashboardHome onNavigate={handleActiveChange} />;
    }
    if (['explore', 'popular', 'attractions', 'top5'].includes(active)) {
      return <DiscoverSection activeId={active} onNavigate={handleActiveChange} />;
    }
    if (['activities', 'trekking', 'mountaineering', 'wildlife', 'cultural', 'ecotourism', 'adventure'].includes(active)) {
      return <ActivitiesSection activeId={active} onNavigate={handleActiveChange} />;
    }
    if (['hotels', 'transportation'].includes(active)) {
      return <StaysSection activeId={active} />;
    }
    if (['guides', 'permits'].includes(active)) {
      return <GuidesPermitsSection activeId={active} />;
    }
    if (['login', 'bookings', 'pasttrips', 'messages', 'customize'].includes(active)) {
      return <AccountSection activeId={active} />;
    }
    if (['becomehost', 'listproperty', 'listattraction', 'listpermit'].includes(active)) {
      return <HostSection activeId={active} />;
    }
    return <DashboardHome onNavigate={handleActiveChange} />;
  };

  const renderSingleChatView = (activeChan: typeof channels[0], showBackButton: boolean) => {
    return (
      <div className="flex flex-col flex-1 min-h-0 px-1 py-1">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            {showBackButton && (
              <button
                onClick={() => setChatViewState('inbox')}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
                title="Back to Inbox"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
            )}

            <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-200 shrink-0">
              <img src={activeChan.avatar} alt={activeChan.name} className="h-full w-full object-cover" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#17212B] truncate leading-tight">{activeChan.name}</h4>
              <span className="text-[9px] font-mono text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                Active Link
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => handleActionAlert("Connecting satellite voice dispatch...", activeChan.name)}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer"
              title="Voice Call"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </button>
            <button
              onClick={() => handleActionAlert("Starting video link...", activeChan.name)}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer"
              title="Video Link"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 7l-7 5 7 5V7z" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </button>
            <button
              onClick={() => setRightSidebarTab('telemetry')}
              className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer"
              title="Telemetry Details"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2 min-h-0 my-1 py-1 scrollbar-thin">
          {activeChan.messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex items-start gap-2.5 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start flex-row'}`}>
                {!isMe && (
                  <img src={activeChan.avatar} alt={activeChan.name} className="h-7 w-7 rounded-full object-cover border border-slate-200 mt-0.5 shrink-0" />
                )}
                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="relative group">
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-xs relative flex flex-col ${isMe
                        ? 'bg-[#0552A2] text-white rounded-tr-xs'
                        : 'bg-white text-[#17212B] border border-slate-200/90 rounded-tl-xs'
                        }`}
                    >
                      {msg.isVoice ? (
                        <div className="flex items-center gap-2 py-0.5 select-none">
                          <button className={`h-6 w-6 rounded-full flex items-center justify-center cursor-pointer shrink-0 shadow-xs ${isMe ? 'bg-white text-[#0552A2]' : 'bg-[#0552A2] text-white'}`}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5,3 19,12 5,21" /></svg>
                          </button>
                          <div className="flex items-center gap-0.5 h-4">
                            <span className={`h-2 w-[2px] rounded animate-pulse ${isMe ? 'bg-white/50' : 'bg-[#0552A2]/40'}`} />
                            <span className={`h-3.5 w-[2px] rounded animate-pulse ${isMe ? 'bg-white/80' : 'bg-[#0552A2]/70'}`} style={{ animationDelay: '100ms' }} />
                            <span className={`h-2.5 w-[2px] rounded animate-pulse ${isMe ? 'bg-white' : 'bg-[#0552A2]'}`} style={{ animationDelay: '200ms' }} />
                            <span className={`h-4.5 w-[2px] rounded animate-pulse ${isMe ? 'bg-white' : 'bg-[#0552A2]'}`} style={{ animationDelay: '300ms' }} />
                            <span className={`h-2.5 w-[2px] rounded animate-pulse ${isMe ? 'bg-white/80' : 'bg-[#0552A2]/80'}`} style={{ animationDelay: '400ms' }} />
                            <span className={`h-1.5 w-[2px] rounded animate-pulse ${isMe ? 'bg-white/40' : 'bg-[#0552A2]/30'}`} />
                          </div>
                          <span className={`text-[8px] font-mono font-bold shrink-0 ${isMe ? 'text-white/80' : 'text-slate-400'}`}>{msg.duration || '0:06'}</span>
                        </div>
                      ) : msg.text === '👍' ? (
                        <span className="text-xl filter drop-shadow-sm animate-bounce inline-block select-none cursor-pointer">
                          👍
                        </span>
                      ) : msg.translatedText ? (
                        <div className="flex flex-col gap-1">
                          <span className="italic text-[11px] opacity-80 leading-normal">"{msg.text}"</span>
                          <span className="font-semibold border-t border-slate-200/40 pt-1 mt-0.5 text-xs">{msg.translatedText}</span>
                        </div>
                      ) : (
                        <span>{msg.text}</span>
                      )}

                      <div className="flex items-center justify-between gap-3 mt-1.5 shrink-0 select-none">
                        {!isMe && !msg.translatedText && !msg.isVoice && (
                          <button
                            onClick={() => toggleTranslation(activeChan.id, msg.id)}
                            className="text-[9px] font-mono font-bold text-[#0552A2] hover:underline uppercase cursor-pointer leading-none"
                          >
                            Translate
                          </button>
                        )}
                        <span className={`text-[8px] font-mono ml-auto leading-none ${isMe ? 'text-white/70' : 'text-slate-400'}`}>
                          {msg.timestamp}
                        </span>
                      </div>

                      {reactions[msg.id] && (
                        <span className="absolute -bottom-2 -right-1 bg-white border border-slate-200 rounded-full px-1.5 py-0.2 text-[9px] shadow-xs select-none">
                          {reactions[msg.id]}
                        </span>
                      )}
                    </div>

                    <div
                      className="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-10 flex items-center gap-0.5 bg-white shadow-md border border-slate-200 rounded-full px-2 py-0.5 scale-90"
                      style={isMe ? { right: 'calc(100% + 6px)' } : { left: 'calc(100% + 6px)' }}
                    >
                      {['❤️', '👍', '😂', '😮', '🏔️', '🙏'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => toggleReaction(msg.id, emoji)}
                          className="hover:scale-125 transition-transform duration-100 cursor-pointer text-xs p-0.5"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {activeChan.typing && (
            <div className="flex items-end gap-2 max-w-[85%] self-start flex-row animate-pulse">
              <img src={activeChan.avatar} alt={activeChan.name} className="h-6 w-6 rounded-full object-cover border border-slate-200 mt-0.5 shrink-0" />
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-3 py-2 flex items-center gap-1 shadow-xs">
                <span className="h-1.5 w-1.5 bg-[#0552A2] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="h-1.5 w-1.5 bg-[#0552A2] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="h-1.5 w-1.5 bg-[#0552A2] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 pt-2 select-none scrollbar-none border-t border-slate-100 shrink-0">
          {(activeChan.id === 'ch-ai'
            ? ['Everest Weather', 'Permit Status', 'Buddhist Monasteries', 'Altitude Plan']
            : activeChan.id === 'ch-g1'
              ? ['Oxygen Status', 'Meet at Pokhara', 'Gear Checklist', 'Safety Beacon']
              : ['Lodge Tea Service', 'Heater Parameters', 'Helicopter Transfer', 'Room Amenities']
          ).map((chip) => (
            <button
              key={chip}
              onClick={() => setChatInput(chip)}
              className="text-[10px] font-mono bg-slate-50 border border-slate-200 hover:border-[#0552A2] text-[#0552A2] hover:bg-[#0552A2] hover:text-white px-2.5 py-1 rounded-full transition-colors cursor-pointer whitespace-nowrap"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="shrink-0 flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => handleActionAlert("Opening documents attachment...", activeChan.name)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer shrink-0 border border-slate-200"
            title="Attach Document"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
          </button>

          <button
            onClick={() => sendVoiceMessage(activeChan.id, '0:06')}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#0552A2] hover:bg-slate-50 transition-colors cursor-pointer shrink-0 border border-slate-200"
            title="Send audio note"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>
          </button>

          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Type message..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs text-[#17212B] placeholder-slate-400 focus:outline-none focus:border-[#0552A2] focus:bg-white transition-colors"
          />

          {chatInput.trim() === '' ? (
            <button
              onClick={() => sendMessage(activeChan.id, '👍', 'user')}
              className="h-8 w-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer shrink-0"
              title="Thumbs Up"
            >
              👍
            </button>
          ) : (
            <button
              onClick={handleSendMessage}
              className="h-8 w-8 rounded-full flex items-center justify-center bg-[#0552A2] text-white hover:bg-[#044080] cursor-pointer transition-colors shrink-0 shadow-xs"
              title="Send Message"
            >
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </button>
          )}
        </div>
      </div>
    );
  };

  const activeChannelObj = channels.find(c => c.id === activeChannelId) || channels[0];

  return (
    <div className="dashboard-theme h-screen flex flex-col overflow-hidden relative bg-white text-[#17212B] font-sans">

      {/* ── TOP EDITORIAL HEADER BAR ─────────────────────────────────────── */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-3 sm:px-4 py-2 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Brand Logo & Back to Home */}
        <div className="flex items-center gap-3 sm:gap-6 select-none">
          {/* Mobile Navigation Drawer Trigger */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden p-1.5 -ml-1 text-slate-500 hover:text-[#0552A2] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Open Navigation Menu"
            aria-label="Open Navigation Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <Link href="/" prefetch={false} className="flex items-center gap-3 group">
            <div className="relative h-9 w-24">
              <Image
                src="/logo.png"
                alt="Visit Nepal Official Logo"
                fill
                className="object-contain"
                unoptimized
                priority
              />
            </div>
            <span className="hidden lg:inline text-xs font-mono font-bold tracking-wider text-[#0552A2] uppercase border-l border-slate-200 pl-3">
              Expedition Portal
            </span>
          </Link>

          <Link
            href="/"
            prefetch={false}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#0552A2] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Return to Site</span>
          </Link>
        </div>

        {/* Global Controls & Traveler Gateway */}
        <div className="flex items-center gap-3 relative">
          {/* Weather status pill */}
          <button
            onClick={() => {
              if (!rightCollapsed && rightSidebarTab === 'telemetry') {
                setRightCollapsed(true);
              } else {
                setRightSidebarTab('telemetry');
                setRightCollapsed(false);
              }
            }}
            className="hidden md:flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-[#0552A2]/40 hover:bg-[#EAF3FB] px-3 py-1.5 rounded-full cursor-pointer transition-colors"
            title="Toggle Himalayan Weather & Telemetry"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-[#0552A2] font-semibold">{weather.region.split('(')[0].trim()}</span>
            <span className="text-[11px] font-bold text-slate-700">{weather.temp}</span>
          </button>

          {/* Intelligence drawer button */}
          <button
            onClick={() => {
              if (!rightCollapsed && rightSidebarTab === 'telemetry') {
                setRightCollapsed(true);
              } else {
                setRightSidebarTab('telemetry');
                setRightCollapsed(false);
              }
            }}
            className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center justify-center relative ${rightSidebarTab === 'telemetry' && !rightCollapsed
              ? 'bg-[#0552A2]/10 text-[#0552A2]'
              : 'text-slate-500 hover:text-[#0552A2] hover:bg-slate-50'
              }`}
            title="Himalayan Weather & Telemetry"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
          </button>

          {/* Chat / Dispatches button */}
          <button
            onClick={() => {
              if (!rightCollapsed && rightSidebarTab === 'chat') {
                setRightCollapsed(true);
              } else {
                setRightSidebarTab('chat');
                setRightCollapsed(false);
              }
            }}
            className={`p-2 rounded-xl transition-colors cursor-pointer relative flex items-center justify-center ${rightSidebarTab === 'chat' && !rightCollapsed
              ? 'bg-[#0552A2]/10 text-[#0552A2]'
              : 'text-slate-500 hover:text-[#0552A2] hover:bg-slate-50'
              }`}
            title="Expedition Dispatches"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-[#EC1F27] rounded-full text-[9px] font-mono font-bold text-white flex items-center justify-center shadow-xs">
              3
            </span>
          </button>

          {/* Profile Gateway Button */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <span className="block text-xs font-bold text-[#17212B] leading-none">
                {currentUser ? currentUser.name : 'Alex Mercer'}
              </span>
              <span className="block text-[10px] font-mono uppercase tracking-wider text-[#0552A2] mt-0.5">
                {currentUser ? currentUser.role : 'Traveler'}
              </span>
            </div>

            <button
              onClick={() => setProfileDropdownOpen(open => !open)}
              className="h-9 w-9 rounded-full overflow-hidden border-2 border-[#0552A2]/40 hover:border-[#0552A2] transition-colors cursor-pointer shadow-xs flex items-center justify-center relative"
              title="Account Menu"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400'}
                alt={currentUser?.name || 'Traveler'}
                className="h-full w-full object-cover"
              />
            </button>
          </div>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute top-12 right-0 w-60 py-2 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100 mb-1 text-left">
                <span className="text-xs font-bold text-[#17212B] block">
                  {currentUser ? currentUser.name : 'Alex Mercer'}
                </span>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                  {currentUser ? currentUser.email : 'alex.mercer@visitnepal.com'}
                </span>
              </div>

              <button
                onClick={() => { setActive('customize'); setProfileDropdownOpen(false); }}
                className="px-4 py-2 text-left text-xs hover:bg-slate-50 text-slate-700 hover:text-[#0552A2] transition-colors flex items-center gap-2.5 font-medium cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>Customize Trip</span>
              </button>

              <button
                onClick={() => { setActive('bookings'); setProfileDropdownOpen(false); }}
                className="px-4 py-2 text-left text-xs hover:bg-slate-50 text-slate-700 hover:text-[#0552A2] transition-colors flex items-center justify-between font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>My Bookings</span>
                </div>
                <span className="bg-[#0552A2] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                  2
                </span>
              </button>

              <button
                onClick={() => { setActive('pasttrips'); setProfileDropdownOpen(false); }}
                className="px-4 py-2 text-left text-xs hover:bg-slate-50 text-slate-700 hover:text-[#0552A2] transition-colors flex items-center gap-2.5 font-medium cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
                <span>Past Expeditions</span>
              </button>

              <div className="border-t border-slate-100 my-1" />

              <button
                onClick={() => {
                  useTravelStore.getState().logoutUser();
                  router.push('/login');
                  setProfileDropdownOpen(false);
                }}
                className="px-4 py-2 text-left text-xs hover:bg-red-50 text-[#EC1F27] font-semibold transition-colors flex items-center gap-2.5 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ── BODY (Sidebar + Canvas + Intelligence) ───────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT EDITORIAL SIDEBAR ────────────────────────────────────── */}
        <LeftSidebar
          navGroups={NAV_GROUPS}
          activeId={['everest', 'pokhara', 'kathmandu', 'chitwan', 'mustang'].includes(active) ? previousActive : active}
          onActiveChange={handleActiveChange}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
          mobileOpen={mobileSidebarOpen}
          onMobileClose={() => setMobileSidebarOpen(false)}
        />

        {/* ── MAIN CONTENT CANVAS ───────────────────────────────────────── */}
        <AnimatePresence mode="wait" initial={false}>
          {['everest', 'pokhara', 'kathmandu', 'chitwan', 'mustang'].includes(active) ? (
            <motion.div
              key={`detail-${active}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex flex-col min-w-0 h-full overflow-hidden"
            >
              <InfoDetailPanel
                slug={active}
                onBack={() => handleActiveChange(previousActive)}
                rightCollapsed={rightCollapsed}
                setRightCollapsed={setRightCollapsed}
              />
            </motion.div>
          ) : (
            <motion.div
              key="main-canvas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1 flex flex-col min-w-0 relative bg-white transition-[margin,width] duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              {/* Context breadcrumb & Search toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-4 py-1.5 sm:py-2 bg-white border-b border-slate-200/70 select-none relative z-10 gap-2 sm:gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="uppercase tracking-wider font-semibold text-slate-500">{activeDetails.groupTitle}</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-[#0552A2] font-bold">{activeDetails.itemLabel}</span>
                </div>

                <div className="flex items-center w-full sm:max-w-xs relative">
                  <span className="absolute left-3 text-slate-400 flex items-center justify-center pointer-events-none">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search destinations, guides, stays..."
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-full pl-9 pr-4 py-1.5 text-[#17212B] focus:outline-none focus:border-[#0552A2] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Main scrollable body */}
              <main className="flex-1 overflow-y-auto p-2.5 sm:p-3.5 md:p-4 pb-16 md:pb-4 min-h-0 relative z-10 scrollbar-thin">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full min-h-full"
                  >
                    {renderActiveSection()}
                  </motion.div>
                </AnimatePresence>
              </main>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edge Toggle Tab to reopen Right Sidebar when collapsed on desktop & mobile */}
        {rightCollapsed && (
          <button
            onClick={() => {
              setRightCollapsed(false);
              setRightSidebarTab('telemetry');
            }}
            className="flex fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-white border border-slate-200 border-r-0 rounded-l-xl px-2 py-3 shadow-md hover:shadow-lg hover:bg-blue-50/50 text-[#0552A2] transition-all cursor-pointer flex-col items-center gap-1.5 group select-none animate-in fade-in slide-in-from-right-2 duration-200 active:scale-95"
            title="Open Himalayan Intel & Weather (Ctrl+I)"
            aria-label="Open Himalayan Intel & Weather"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform text-[#0552A2]">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#0552A2] [writing-mode:vertical-lr] rotate-180">
              Intel
            </span>
          </button>
        )}

        {/* ── RIGHT INTELLIGENCE SIDEBAR ─────────────────────────────────── */}
        <RightSidebar
          rightCollapsed={rightCollapsed}
          onRightCollapsedChange={setRightCollapsed}
          isFullExpanded={isFullExpanded}
          onIsFullExpandedChange={setIsFullExpanded}
          rightSidebarTab={rightSidebarTab}
          onRightSidebarTabChange={setRightSidebarTab}
          chatViewState={chatViewState}
          onChatViewStateChange={setChatViewState}
          collapsed={collapsed}
          channels={channels}
          activeChannelId={activeChannelId}
          onActiveChannelIdChange={setActiveChannelId}
          expandedChannelId={expandedChannelId}
          onExpandedChannelIdChange={setExpandedChannelId}
          weather={weather}
          calendarMarks={calendarMarks}
          onCalendarMarksChange={setCalendarMarks}
          userNote={userNote}
          onUserNoteChange={setUserNote}
          companyNote={companyNote}
          onCompanyNoteChange={setCompanyNote}
          renderSingleChatView={renderSingleChatView}
        />

      </div>

      {/* ── ACTION NOTIFICATION TOAST ───────────────────────────────────── */}
      {actionAlert.visible && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[200] max-w-sm w-full px-4 animate-in fade-in slide-in-from-top-6 duration-300">
          <div className="p-4 bg-white border-2 border-[#0552A2] rounded-2xl shadow-xl flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-blue-50 text-[#0552A2] flex items-center justify-center text-lg animate-pulse">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <h5 className="text-[10px] font-mono font-bold text-[#0552A2] uppercase tracking-wider">Expedition Dispatch</h5>
              <p className="text-xs font-bold text-[#17212B] mt-0.5 leading-tight">{actionAlert.contactName}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{actionAlert.message}</p>
            </div>
            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
          </div>
        </div>
      )}

      {/* ── FLOATING EXPEDITION MESSENGER ───────────────────────────────── */}
      <div className={`fixed inset-x-0 bottom-0 sm:bottom-6 sm:right-6 sm:left-auto z-[100] flex flex-col items-end ${!rightCollapsed ? 'xl:hidden' : ''}`}>
        {floatingChatOpen ? (
          <div className="w-full sm:w-[360px] h-[85vh] sm:h-[500px] rounded-t-3xl sm:rounded-2xl bg-white border border-slate-200 shadow-2xl flex flex-col overflow-hidden sm:mb-3 animate-in slide-in-from-bottom duration-300 text-left">
            {(() => {
              const activeChan = channels.find(c => c.id === activeChannelId) || channels[0];
              return (
                <>
                  <div className="p-3.5 bg-white border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <img src={activeChan.avatar} alt={activeChan.name} className="h-full w-full object-cover" />
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#17212B] truncate leading-none">{activeChan.name}</h4>
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mt-1">{activeChan.role}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setFloatingChatOpen(false)}
                      className="h-7 w-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center cursor-pointer transition-colors"
                      title="Close"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  <div className="px-3 py-1.5 border-b border-slate-100 flex gap-2 overflow-x-auto select-none bg-slate-50 scrollbar-none shrink-0">
                    {channels.map((ch) => {
                      const isActive = activeChannelId === ch.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => setActiveChannelId(ch.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all shrink-0 cursor-pointer ${isActive
                            ? 'bg-[#0552A2] text-white shadow-xs'
                            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                            }`}
                        >
                          {ch.id === 'ch-ai' ? 'Sherpa AI' : ch.id === 'ch-g1' ? 'Nima Sherpa' : 'Shangri-La'}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2 bg-slate-50/50 scrollbar-thin">
                    {activeChan.messages.map((msg) => {
                      const isMe = msg.sender === 'user';
                      return (
                        <div key={msg.id} className={`flex items-start gap-2 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start flex-row'}`}>
                          {!isMe && (
                            <img src={activeChan.avatar} alt={activeChan.name} className="h-6 w-6 rounded-full object-cover border border-slate-200 mt-0.5 shrink-0" />
                          )}
                          <div className={`rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-xs ${isMe
                            ? 'bg-[#0552A2] text-white rounded-tr-xs'
                            : 'bg-white text-[#17212B] border border-slate-200 rounded-tl-xs'
                            }`}>
                            <p>{msg.text}</p>
                            <span className={`text-[8px] font-mono mt-1 block text-right ${isMe ? 'text-white/70' : 'text-slate-400'}`}>
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={floatingChatEndRef} />
                  </div>

                  <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0">
                    <input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                      }}
                      placeholder="Write message..."
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5 text-xs text-[#17212B] placeholder-slate-400 focus:outline-none focus:border-[#0552A2]"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="h-8 w-8 rounded-full flex items-center justify-center bg-[#0552A2] text-white cursor-pointer active:scale-95 transition-all shrink-0 shadow-xs"
                    >
                      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        ) : null}

        <button
          onClick={() => {
            setFloatingChatOpen(!floatingChatOpen);
            setRightCollapsed(false);
          }}
          className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-[#0552A2] text-white shadow-xl hover:bg-[#044080] transition-all cursor-pointer relative"
          title="Expedition Messenger"
        >
          {floatingChatOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <div className="relative flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="absolute -top-2.5 -right-2.5 h-4.5 w-4.5 bg-[#EC1F27] rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-white shadow-xs font-mono">
                3
              </span>
            </div>
          )}
        </button>
      </div>

      {/* ── MOBILE BOTTOM NAVIGATION ───────────────────────────────────────── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => handleActiveChange('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${active === 'home' ? 'text-[#0552A2] font-bold' : 'text-slate-400'
            }`}
        >
          <Home size={19} />
          <span className="text-[10px] font-mono">Home</span>
        </button>
        <button
          onClick={() => handleActiveChange('explore')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${active === 'explore' ? 'text-[#0552A2] font-bold' : 'text-slate-400'
            }`}
        >
          <Compass size={19} />
          <span className="text-[10px] font-mono">Explore</span>
        </button>
        <button
          onClick={() => {
            setActiveChannelId('ch-ai');
            setFloatingChatOpen(o => !o);
          }}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors relative ${floatingChatOpen ? 'text-[#0552A2] font-bold' : 'text-slate-400'
            }`}
        >
          <MessageSquare size={19} />
          <span className="absolute top-1 right-3 h-2 w-2 rounded-full bg-[#EC1F27]" />
          <span className="text-[10px] font-mono">Dispatch</span>
        </button>
        <button
          onClick={() => handleActiveChange('hotels')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${active === 'hotels' ? 'text-[#0552A2] font-bold' : 'text-slate-400'
            }`}
        >
          <Hotel size={19} />
          <span className="text-[10px] font-mono">Stays</span>
        </button>
        <button
          onClick={() => handleActiveChange('customize')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${active === 'customize' ? 'text-[#0552A2] font-bold' : 'text-slate-400'
            }`}
        >
          <SlidersHorizontal size={19} />
          <span className="text-[10px] font-mono">Customizer</span>
        </button>
      </div>

    </div>
  );
}
