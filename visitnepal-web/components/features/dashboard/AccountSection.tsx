'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore, Booking, ChatChannel } from '@/store/useTravelStore';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
  SlidersHorizontal,
  ShieldCheck,
  Mountain,
  Camera,
  Layers,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Send,
  User,
  Users,
  FileCheck,
  Hotel
} from 'lucide-react';
import {
  EXPEDITION_BLUEPRINTS,
  REGION_OPTIONS,
  TREK_STYLES,
  LODGING_STYLES,
  INTEREST_TAGS,
  ExpeditionBlueprint,
  ItineraryDay
} from './mockCustomizerData';

interface AccountSectionProps {
  activeId: string;
}

export default function AccountSection({ activeId }: AccountSectionProps) {
  const { 
    currentUser, loginUser, logoutUser, 
    bookings, addBooking,
    channels, activeChannelId, setActiveChannelId, sendMessage,
    customPreferences, setCustomPreference, generatedItinerary, setGeneratedItinerary,
    feedPosts, addFeedPost, deleteFeedPost
  } = useTravelStore();

  // Auth Form states
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Traveler' | 'Guide' | 'Butler'>('Traveler');
  
  // Customizer wizard states
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [selectedBlueprintId, setSelectedBlueprintId] = useState<string>(EXPEDITION_BLUEPRINTS[0].id);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    '8,000m Himalayan Peaks',
    'Ancient Monasteries & Stupas',
    'Golden Hour Alpine Sunrises'
  ]);
  const [selectedTrekStyle, setSelectedTrekStyle] = useState<string>('balanced');
  const [selectedLodgingStyle, setSelectedLodgingStyle] = useState<string>('ecolodge');
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [bookSuccess, setBookSuccess] = useState<boolean>(false);

  // Chat message state
  const [chatInput, setChatInput] = useState('');

  // Story post states
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostLocation, setNewPostLocation] = useState('');
  const [newPostImage, setNewPostImage] = useState('');

  const containerVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.08 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName || !authEmail) return;
    loginUser(authName, selectedRole, authEmail);
  };

  const handleLoadBlueprint = (blueprint: ExpeditionBlueprint) => {
    setSelectedBlueprintId(blueprint.id);
    const regionName = blueprint.region.split(' ')[0];
    setCustomPreference('preferredRegion', regionName);
    setCustomPreference('duration', blueprint.duration);
    setCustomPreference('difficulty', blueprint.difficulty.toLowerCase());
    setCustomPreference('budget', blueprint.budgetTier);
    setGeneratedItinerary({
      id: blueprint.id,
      title: blueprint.title,
      region: blueprint.region,
      difficulty: blueprint.difficulty,
      duration: blueprint.duration,
      maxAlt: blueprint.maxAlt,
      distance: blueprint.distance,
      costEstimate: blueprint.costEstimate,
      highlights: blueprint.highlights,
      permits: blueprint.permits,
      guideRequirement: blueprint.guideRequirement,
      imageUrl: blueprint.imageUrl,
      days: blueprint.days
    });
  };

  useEffect(() => {
    if (!generatedItinerary) {
      handleLoadBlueprint(EXPEDITION_BLUEPRINTS[0]);
    }
  }, []);

  const toggleInterest = (tag: string) => {
    if (selectedInterests.includes(tag)) {
      setSelectedInterests(selectedInterests.filter(t => t !== tag));
    } else {
      setSelectedInterests([...selectedInterests, tag]);
    }
  };

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      const matched = EXPEDITION_BLUEPRINTS.find(b => 
        b.region.toLowerCase().includes(customPreferences.preferredRegion.toLowerCase())
      ) || EXPEDITION_BLUEPRINTS[0];

      let costMult = 1;
      if (selectedLodgingStyle === 'luxury' || customPreferences.budget === 'luxury') costMult = 2.1;
      else if (selectedLodgingStyle === 'teahouse' || customPreferences.budget === 'budget') costMult = 0.78;

      const duration = customPreferences.duration || matched.duration;
      const customDays: ItineraryDay[] = matched.days.slice(0, duration).map((d, idx) => ({
        ...d,
        day: idx + 1
      }));

      while (customDays.length < duration) {
        const nextDayNum = customDays.length + 1;
        customDays.push({
          day: nextDayNum,
          title: `Alpine Exploration & Cultural Immersion (Day ${nextDayNum})`,
          activity: `Guided valley trek exploring ancient sacred chortens, traditional settlement architecture, and high-altitude flora along the river banks.`,
          alt: matched.maxAlt,
          distance: '7.5 km',
          duration: '4.5 hrs',
          stay: selectedLodgingStyle === 'luxury' ? 'Himalayan Boutique Eco Resort' : (selectedLodgingStyle === 'ecolodge' ? 'Comfort Mountain Lodge' : 'Traditional Sherpa Tea House'),
          meals: 'B, L, D'
        });
      }

      setGeneratedItinerary({
        id: `custom-${Date.now()}`,
        title: `${duration}-Day Custom ${matched.region} Expedition`,
        region: matched.region,
        difficulty: customPreferences.difficulty.charAt(0).toUpperCase() + customPreferences.difficulty.slice(1),
        duration: duration,
        maxAlt: matched.maxAlt,
        distance: `${Math.round(duration * 9.2)} km`,
        costEstimate: Math.round(matched.costEstimate * costMult * (duration / matched.duration)),
        highlights: [
          ...matched.highlights.slice(0, 3),
          ...selectedInterests.slice(0, 2)
        ],
        permits: matched.permits,
        guideRequirement: matched.guideRequirement,
        imageUrl: matched.imageUrl,
        days: customDays
      });
    }, 1200);
  };

  const handleBookExpedition = () => {
    if (!generatedItinerary) return;
    addBooking({
      id: `BK-${Date.now()}`,
      type: 'Custom Trip',
      title: generatedItinerary.title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      details: `${generatedItinerary.duration} Days • ${generatedItinerary.region} • ${generatedItinerary.difficulty}`,
      cost: generatedItinerary.costEstimate,
      status: 'Confirmed',
      invoiceNo: `INV-${Math.floor(100000 + Math.random() * 900000)}`
    });
    setBookSuccess(true);
    setTimeout(() => setBookSuccess(false), 3500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendMessage(activeChannelId, chatInput, 'user');
    setChatInput('');
  };

  const activeChannel = channels.find(c => c.id === activeChannelId) || channels[0];

  return (
    <motion.div 
      key={activeId}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full text-left"
    >
      {/* ── LOGIN SECTION ────────────────────────────────────────────── */}
      {activeId === 'login' && (
        <div className={currentUser ? "max-w-[1440px] w-full mx-auto py-6" : "max-w-sm mx-auto py-8"}>
          {currentUser ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              
              {/* Profile Card column (left, 1-span) */}
              <motion.div variants={itemVariants} className="bg-white border border-slate-200/90 p-6 rounded-2xl text-center flex flex-col gap-4 shadow-xs relative">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-full mx-auto border-2 border-[#0552A2] object-cover shadow-sm" />
                <div>
                  <h3 className="font-bold text-sm text-[#17212B]">{currentUser.name}</h3>
                  <p className="text-[10px] text-[#64748B] font-mono mt-0.5">{currentUser.email}</p>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 text-[9px] font-mono font-bold text-[#0552A2]">
                    {currentUser.role} Account Active
                  </span>
                </div>
                <button 
                  onClick={logoutUser}
                  className="w-full mt-2 bg-slate-100 hover:bg-slate-200 text-[#17212B] py-2.5 rounded-xl text-[10px] font-mono font-bold cursor-pointer transition-colors shadow-2xs"
                >
                  Disconnect Gateway
                </button>
              </motion.div>

              {/* Feed Management column (right, 2-span) */}
              <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col gap-6">
                
                {/* Create Story Form */}
                <div className="bg-white border border-slate-200/90 p-5 rounded-2xl flex flex-col gap-3 shadow-xs text-left">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0552A2] border-b border-slate-100 pb-2 flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    Share your Himalayan Story
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    <textarea
                      placeholder="What is on your mind? Share your trekking updates, peak climbs, or cultural findings..."
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                      rows={3}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 text-[#17212B] focus:outline-none focus:border-[#0552A2]/50 focus:bg-white resize-none font-sans leading-relaxed"
                    />
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1 text-[9px] font-mono text-[#64748B]">
                        <label className="uppercase">Location Coordinates</label>
                        <input
                          type="text"
                          placeholder="e.g. Annapurna Base Camp (4,130m)"
                          value={newPostLocation}
                          onChange={e => setNewPostLocation(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-[11px] rounded-lg px-2.5 py-1.5 text-[#17212B] focus:outline-none focus:border-[#0552A2] focus:bg-white"
                        />
                      </div>
                      <div className="flex flex-col gap-1 text-[9px] font-mono text-[#64748B]">
                        <label className="uppercase">Image Link (Optional)</label>
                        <input
                          type="text"
                          placeholder="Paste photo URL"
                          value={newPostImage}
                          onChange={e => setNewPostImage(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-[11px] rounded-lg px-2.5 py-1.5 text-[#17212B] focus:outline-none focus:border-[#0552A2] focus:bg-white"
                        />
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        if (!newPostContent.trim()) return;
                        addFeedPost(newPostContent, newPostImage || undefined, newPostLocation || undefined);
                        setNewPostContent('');
                        setNewPostLocation('');
                        setNewPostImage('');
                      }}
                      className="bg-[#0552A2] hover:bg-[#044080] text-white font-mono text-[10px] font-bold py-2.5 rounded-xl uppercase tracking-widest transition-colors cursor-pointer w-full"
                    >
                      Publish Story
                    </button>
                  </div>
                </div>

                {/* List of User's Posts */}
                <div className="flex flex-col gap-3 text-left">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] px-1">
                    Your Published Stories ({feedPosts.filter(p => p.userName === currentUser.name).length})
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    {(() => {
                      const userPosts = feedPosts.filter(p => p.userName === currentUser.name);
                      if (userPosts.length === 0) {
                        return (
                          <div className="bg-slate-50 border border-dashed border-slate-200 p-8 rounded-2xl text-center text-xs font-mono text-[#64748B]">
                            You haven't shared any Himalayan stories yet. Publish your first post above!
                          </div>
                        );
                      }
                      return userPosts.map(post => (
                        <div key={post.id} className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col gap-3 shadow-2xs hover:border-[#0552A2]/30 transition-all relative overflow-hidden">
                          
                          {/* Post Header */}
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex items-center gap-2">
                              <img src={post.userAvatar} alt={post.userName} className="w-8 h-8 rounded-full object-cover border border-[#92C4EA]/25" />
                              <div>
                                <h4 className="text-xs font-bold text-[#17212B]">{post.userName}</h4>
                                <div className="flex items-center gap-1.5 text-[8.5px] font-mono text-[#64748B] mt-0.5">
                                  <span>{post.timestamp}</span>
                                  <span>•</span>
                                  <span className="text-[#0552A2] font-semibold">{post.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Delete Button */}
                            <button
                              onClick={() => deleteFeedPost(post.id)}
                              className="text-[9px] font-mono font-bold text-red-500 hover:text-red-600 transition-colors uppercase border border-red-500/10 hover:border-red-500/20 px-2 py-0.5 rounded bg-red-500/5 cursor-pointer"
                              title="Delete Story"
                            >
                              Delete
                            </button>
                          </div>
                          
                          {/* Post Content */}
                          <p className="text-xs text-[#475569] leading-relaxed pr-2">{post.content}</p>
                          
                          {/* Post Image preview if any */}
                          {post.image && (
                            <img src={post.image} alt="Story upload" className="w-full h-32 object-cover rounded-xl border border-[#92C4EA]/20" />
                          )}
                          
                        </div>
                      ));
                    })()}
                  </div>
                </div>

              </motion.div>

            </div>
          ) : (
            <motion.div variants={itemVariants} className="bg-white border border-slate-200/90 p-6 rounded-2xl flex flex-col gap-4 shadow-xs">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] text-center border-b border-slate-100 pb-2">
                Ecosystem Verification
              </h3>
              <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3 font-mono text-[10px]">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B]">Passenger Name</label>
                  <input 
                    type="text" 
                    value={authName} 
                    onChange={e => setAuthName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs text-[#17212B] focus:outline-none focus:border-[#0552A2]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B]">Verification Email</label>
                  <input 
                    type="email" 
                    value={authEmail} 
                    onChange={e => setAuthEmail(e.target.value)}
                    placeholder="alex@travelers.org"
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs text-[#17212B] focus:outline-none focus:border-[#0552A2]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B]">Identity Role</label>
                  <select 
                    value={selectedRole} 
                    onChange={e => setSelectedRole(e.target.value as any)}
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs text-[#17212B] focus:outline-none"
                  >
                    <option value="Traveler">Traveler Profile</option>
                    <option value="Guide">Guide Profile</option>
                    <option value="Butler">Travel Butler Profile</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="bg-[#0552A2] hover:bg-[#044080] text-white font-bold py-2.5 rounded-xl uppercase tracking-widest mt-2 transition-colors cursor-pointer shadow-xs"
                >
                  Verify Access
                </button>
              </form>
            </motion.div>
          )}
        </div>
      )}

      {/* ── BOOKINGS SECTION ─────────────────────────────────────────── */}
      {activeId === 'bookings' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-2">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase bg-[#0552A2]/10 px-2.5 py-0.5 rounded-full w-fit">
              Confirmed Vouchers
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">Ecosystem Bookings</h2>
            <p className="text-xs text-[#475569]">Holographic check-in codes, guide listings, and invoice schedules generated under your credentials.</p>
          </motion.div>

          <div 
            className="grid gap-5 auto-card-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
          >
            {bookings.map(b => (
              <div 
                key={b.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-[#0552A2]/40 transition-all relative overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded font-bold">{b.invoiceNo}</span>
                    <span className="font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded uppercase">{b.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#17212B] mt-1">{b.title}</h3>
                  <p className="text-xs text-[#475569] leading-relaxed">{b.details}</p>
                </div>

                <div className="flex justify-between items-center mt-5 border-t border-slate-100 pt-3 font-mono">
                  <div>
                    <span className="text-[#64748B] block text-[9px] uppercase">Amount Paid</span>
                    <span className="text-xs font-bold text-[#0552A2]">${b.cost} USD</span>
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="bg-white border border-slate-200 hover:bg-slate-50 text-[#17212B] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    Print Voucher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── PAST TRIPS SECTION ────────────────────────────────────────── */}
      {activeId === 'pasttrips' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-2">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase bg-[#0552A2]/10 px-2.5 py-0.5 rounded-full w-fit">
              Historical Ledger
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">Past Journeys</h2>
            <p className="text-xs text-[#475569]">Archived trips, high peak climbs successfully navigated, and past guide reviews.</p>
          </motion.div>

          <div 
            className="grid gap-5 auto-card-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
          >
            <div className="bg-white border border-slate-200/90 p-5 rounded-2xl flex flex-col justify-between gap-3 shadow-xs">
              <div>
                <span className="text-[9px] font-mono text-[#0552A2] font-bold bg-[#0552A2]/10 px-2 py-0.5 rounded uppercase">
                  OCTOBER 2025 • COMPLETED
                </span>
                <h3 className="text-sm font-bold text-[#17212B] mt-2">Annapurna Circuit Hike</h3>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">Completed 16-day loop crossing Thorong La Pass (5,416m). Guide support: Nima Sherpa.</p>
              </div>
              <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Elevation: 5,416m</span>
                <span className="text-emerald-600 font-bold">16 Days Done</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200/90 p-5 rounded-2xl flex flex-col justify-between gap-3 shadow-xs">
              <div>
                <span className="text-[9px] font-mono text-[#0552A2] font-bold bg-[#0552A2]/10 px-2 py-0.5 rounded uppercase">
                  MARCH 2024 • COMPLETED
                </span>
                <h3 className="text-sm font-bold text-[#17212B] mt-2">Kathmandu Cultural Pilgrimage</h3>
                <p className="text-xs text-[#475569] leading-relaxed mt-1">Visited Pashupatinath, Boudha, Swayambhu, and Bhaktapur squares. Lodging: Shangri-La valley.</p>
              </div>
              <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Elevation: 1,400m</span>
                <span className="text-emerald-600 font-bold">5 Days Done</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MESSAGES SECTION ──────────────────────────────────────────── */}
      {activeId === 'messages' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-2">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase bg-[#0552A2]/10 px-2.5 py-0.5 rounded-full w-fit">
              Communication Terminal
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">Ecosystem Channels</h2>
            <p className="text-xs text-[#475569]">Chat in real-time with certified guides, host owners, or your cognitive AI butler.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[560px] lg:h-[500px] items-stretch">
            {/* Channels List */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-3 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-hidden overflow-y-auto shadow-xs shrink-0">
              {channels.map(ch => (
                <div 
                  key={ch.id} 
                  onClick={() => setActiveChannelId(ch.id)}
                  className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors shrink-0 lg:shrink ${
                    activeChannelId === ch.id 
                      ? 'bg-[#0552A2]/10 border border-[#0552A2]/30 text-[#0552A2]' 
                      : 'hover:bg-slate-50 border border-slate-100'
                  }`}
                >
                  <img src={ch.avatar} alt={ch.name} className="w-10 h-10 object-cover rounded-full border border-slate-200 shrink-0" />
                  <div className="text-left min-w-0">
                    <h4 className="text-xs font-bold text-[#17212B] truncate">{ch.name.split(' (')[0]}</h4>
                    <p className="text-[9px] text-[#64748B] font-mono">{ch.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Box */}
            <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl flex flex-col justify-between overflow-hidden shadow-xs flex-1 min-h-[360px]">
              {/* Header */}
              <div className="bg-white p-3 px-4 border-b border-slate-100 flex items-center gap-3">
                <img src={activeChannel?.avatar} alt={activeChannel?.name} className="w-8 h-8 object-cover rounded-full border border-slate-200" />
                <div className="text-left">
                  <h4 className="text-xs font-bold text-[#17212B]">{activeChannel?.name}</h4>
                  <p className="text-[8px] font-mono text-emerald-600 font-bold uppercase">{activeChannel?.status}</p>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto font-mono text-[10px] bg-slate-50/40">
                {activeChannel?.messages.map((m, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col gap-0.5 max-w-[85%] sm:max-w-[80%] ${m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <span className="text-[8px] text-[#64748B]">{m.senderName} • {m.timestamp}</span>
                    <div 
                      className={`p-2.5 rounded-2xl text-[11px] leading-relaxed font-sans shadow-2xs ${
                        m.sender === 'user' 
                          ? 'bg-[#0552A2] text-white rounded-tr-none' 
                          : 'bg-white text-[#17212B] rounded-tl-none border border-slate-200'
                      }`}
                    >
                      {m.text}
                    </div>
                    {m.translatedText && (
                      <span className="text-[9px] text-[#0552A2] italic font-sans max-w-xs mt-0.5">
                        Trans: {m.translatedText}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3 border-t border-slate-100 flex gap-2 bg-white">
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask weather, pathfinders, or send namaste..."
                  className="flex-1 bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#0552A2] text-[#17212B] font-mono"
                />
                <button 
                  type="submit"
                  className="bg-[#0552A2] hover:bg-[#044080] text-white text-xs font-bold font-mono px-4 rounded-xl transition-colors cursor-pointer shadow-2xs"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── CUSTOMIZE SECTION ─────────────────────────────────────────── */}
      {activeId === 'customize' && (
        <div className="flex flex-col gap-8 max-w-[1440px] w-full mx-auto py-2">
          {/* Header */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase bg-[#0552A2]/10 px-2.5 py-0.5 rounded-full">
                AI Travel Synthesizer • Expedition Engine
              </span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">Himalayan Expedition Customizer</h2>
            <p className="text-xs text-[#475569]">
              Choose from 6 curated high-altitude blueprints or calibrate custom elevations, certified guides, and official permits.
            </p>
          </motion.div>

          {/* Section 1: Curated Expedition Blueprints */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#0552A2]" />
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#17212B]">
                  Curated Expedition Blueprints (6 Presets)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#64748B]">Click any blueprint to calibrate full dossier</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EXPEDITION_BLUEPRINTS.map((bp) => {
                const isSelected = selectedBlueprintId === bp.id;
                const difficultyColor = 
                  bp.difficulty === 'Challenging' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  bp.difficulty === 'Moderate' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  'bg-emerald-50 text-emerald-700 border-emerald-200';

                return (
                  <div
                    key={bp.id}
                    onClick={() => handleLoadBlueprint(bp)}
                    className={`group cursor-pointer rounded-2xl bg-white border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0552A2] ring-2 ring-[#0552A2]/20 shadow-md'
                        : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      {/* Image Banner with Badges */}
                      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                        <img
                          src={bp.imageUrl}
                          alt={bp.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="bg-white/95 backdrop-blur-xs text-[#0552A2] font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                            {bp.maxAlt}
                          </span>
                          <span className="bg-[#0552A2] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                            {bp.duration} Days
                          </span>
                        </div>

                        {/* Bottom Region Tag */}
                        <div className="absolute bottom-2 left-2.5 flex items-center gap-1 text-[11px] font-medium text-white/90 drop-shadow-xs">
                          <MapPin className="w-3 h-3 text-[#92C4EA]" />
                          <span>{bp.region}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col gap-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-sm font-bold text-[#17212B] line-clamp-1 group-hover:text-[#0552A2] transition-colors">
                            {bp.title}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${difficultyColor}`}>
                            {bp.difficulty}
                          </span>
                          <span className="text-[11px] font-mono text-[#64748B]">
                            {bp.distance} total
                          </span>
                        </div>

                        {/* Highlights preview */}
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bp.highlights.slice(0, 2).map((h, idx) => (
                            <span key={idx} className="text-[10px] font-mono text-[#475569] bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md line-clamp-1">
                              • {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <div>
                        <span className="text-[10px] font-mono text-[#64748B] uppercase block">Est. Cost</span>
                        <span className="text-xs font-mono font-bold text-[#17212B]">${bp.costEstimate} <span className="text-[10px] font-normal text-[#64748B]">/ pax</span></span>
                      </div>
                      <button
                        type="button"
                        className={`text-[11px] font-mono font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-[#0552A2] text-white shadow-xs'
                            : 'bg-white border border-slate-200 text-[#0552A2] hover:bg-slate-50'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3 h-3" /> Selected
                          </>
                        ) : (
                          <>Load Plan</>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Section 2: Parameters & Generated Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Calibration Parameters (5 cols) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 bg-white border border-slate-200/90 p-5 rounded-2xl flex flex-col gap-5 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#0552A2]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#17212B]">
                    Custom Trail Parameters
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#64748B]">Real-Time Sync</span>
              </div>

              <div className="flex flex-col gap-4 font-mono text-[10px] text-left">
                {/* 1. Target Region */}
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B] font-bold text-[10px] flex items-center justify-between">
                    <span>Target Himalayan Region</span>
                    <span className="text-[#0552A2] font-normal">{customPreferences.preferredRegion}</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2 font-sans">
                    {REGION_OPTIONS.map((reg) => {
                      const isRegActive = customPreferences.preferredRegion === reg.id;
                      return (
                        <button
                          key={reg.id}
                          type="button"
                          onClick={() => {
                            setCustomPreference('preferredRegion', reg.id);
                            const matched = EXPEDITION_BLUEPRINTS.find(b => b.region.toLowerCase().includes(reg.id.toLowerCase()));
                            if (matched) handleLoadBlueprint(matched);
                          }}
                          className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-0.5 ${
                            isRegActive
                              ? 'bg-[#0552A2]/5 border-[#0552A2] ring-1 ring-[#0552A2]'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#17212B]">{reg.id}</span>
                            <span className="text-[9px] font-mono text-[#0552A2] font-semibold">{reg.badge}</span>
                          </div>
                          <span className="text-[10px] text-[#64748B] line-clamp-1">{reg.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Trek Duration */}
                <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <label className="uppercase text-[#64748B] font-bold text-[10px]">Trek Duration</label>
                    <span className="text-xs font-mono font-bold text-[#0552A2]">{customPreferences.duration} Days</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="21"
                    value={customPreferences.duration}
                    onChange={(e) => setCustomPreference('duration', parseInt(e.target.value))}
                    className="w-full accent-[#0552A2] cursor-pointer"
                  />
                  <div className="flex justify-between gap-1 text-[10px] font-mono">
                    {[5, 8, 10, 12, 14, 18].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setCustomPreference('duration', d)}
                        className={`px-2 py-0.5 rounded-md border text-[10px] ${
                          customPreferences.duration === d
                            ? 'bg-[#0552A2] text-white border-[#0552A2]'
                            : 'bg-white border-slate-200 text-[#64748B] hover:border-slate-300'
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Trek Style */}
                <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
                  <label className="uppercase text-[#64748B] font-bold text-[10px]">Trek Style & Pace</label>
                  <div className="grid grid-cols-3 gap-1.5 font-sans">
                    {TREK_STYLES.map((ts) => {
                      const isActive = selectedTrekStyle === ts.id;
                      return (
                        <button
                          key={ts.id}
                          type="button"
                          onClick={() => setSelectedTrekStyle(ts.id)}
                          className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                            isActive
                              ? 'bg-[#0552A2]/5 border-[#0552A2] text-[#0552A2]'
                              : 'bg-white border-slate-200 text-[#475569] hover:bg-slate-50'
                          }`}
                        >
                          <span className="h-6 w-6 rounded-lg bg-blue-50 border border-[#0552A2]/15 flex items-center justify-center text-[#0552A2] shrink-0">
                            {ts.icon === 'compass' && <Compass className="h-3.5 w-3.5" />}
                            {ts.icon === 'camera' && <Camera className="h-3.5 w-3.5" />}
                            {ts.icon === 'mountain' && <Mountain className="h-3.5 w-3.5" />}
                          </span>
                          <span className="text-[10px] font-bold line-clamp-1">{ts.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Lodging Tier */}
                <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
                  <label className="uppercase text-[#64748B] font-bold text-[10px]">Lodging & Hearth Tier</label>
                  <div className="grid grid-cols-3 gap-1.5 font-sans">
                    {LODGING_STYLES.map((ls) => {
                      const isActive = selectedLodgingStyle === ls.id;
                      return (
                        <button
                          key={ls.id}
                          type="button"
                          onClick={() => {
                            setSelectedLodgingStyle(ls.id);
                            setCustomPreference('budget', ls.id === 'luxury' ? 'luxury' : (ls.id === 'teahouse' ? 'budget' : 'premium'));
                          }}
                          className={`p-2 rounded-xl border text-left transition-all flex flex-col gap-0.5 cursor-pointer ${
                            isActive
                              ? 'bg-[#0552A2]/5 border-[#0552A2]'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-[#17212B]">{ls.price}</span>
                            <span className="text-[9px] font-mono text-[#0552A2]">Tier</span>
                          </div>
                          <span className="text-[10px] font-semibold text-[#17212B] line-clamp-1">{ls.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Experience Interests */}
                <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-100">
                  <label className="uppercase text-[#64748B] font-bold text-[10px]">Experience Highlights</label>
                  <div className="flex flex-wrap gap-1.5 font-sans">
                    {INTEREST_TAGS.map((tag) => {
                      const active = selectedInterests.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleInterest(tag)}
                          className={`text-[10px] px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                            active
                              ? 'bg-[#0552A2] text-white border-[#0552A2]'
                              : 'bg-white text-[#475569] border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Trigger */}
                <button
                  type="button"
                  onClick={handleSynthesize}
                  disabled={isSynthesizing}
                  className="bg-[#0552A2] hover:bg-[#044080] text-white py-3 px-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider mt-2 cursor-pointer transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {isSynthesizing ? (
                    <>
                      <span className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      <span>Synthesizing Logistics...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Synthesize Custom Trail Dossier</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Right Column: Generated Itinerary Dossier (7 cols) */}
            <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#0552A2]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#17212B]">
                    Expedition Dossier & Day-by-Day Logistics
                  </h3>
                </div>
                {generatedItinerary && (
                  <span className="text-[10px] font-mono text-[#0552A2] font-semibold bg-[#0552A2]/10 px-2.5 py-0.5 rounded-full">
                    {generatedItinerary.days.length} Stages Calculated
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isSynthesizing ? (
                  <motion.div
                    key="synthesizing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white border border-slate-200 min-h-[380px] rounded-2xl flex flex-col items-center justify-center text-center font-mono text-xs text-[#64748B] p-8 shadow-xs"
                  >
                    <span className="h-8 w-8 border-3 border-t-transparent border-[#0552A2] rounded-full animate-spin mb-3" />
                    <span className="text-sm font-bold text-[#17212B] mb-1">Mapping Himalayan Coordinates</span>
                    <span className="text-[11px] text-[#64748B]">Calculating altitude profile, tea house availability & certified guides...</span>
                  </motion.div>
                ) : generatedItinerary ? (
                  <motion.div
                    key="itinerary-output"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-4"
                  >
                    {/* Dossier Header Summary Card */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-[#0552A2]/10 text-[#0552A2]">
                              {generatedItinerary.region}
                            </span>
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                              {generatedItinerary.difficulty} Tier
                            </span>
                          </div>
                          <h4 className="text-base font-black text-[#17212B] tracking-tight">{generatedItinerary.title}</h4>
                        </div>
                        <div className="sm:text-right shrink-0">
                          <span className="text-[10px] font-mono text-[#64748B] uppercase block">Total Cost Estimate</span>
                          <span className="text-lg font-mono font-black text-[#0552A2]">${generatedItinerary.costEstimate}</span>
                          <span className="text-[10px] font-mono text-[#64748B] block">USD / Traveler</span>
                        </div>
                      </div>

                      {/* Key Telemetry Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
                        <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl flex flex-col items-center">
                          <Clock className="w-3.5 h-3.5 text-[#0552A2] mb-1" />
                          <span className="text-[9px] text-[#64748B] uppercase">Duration</span>
                          <span className="font-bold text-[#17212B]">{generatedItinerary.duration} Days</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl flex flex-col items-center">
                          <Mountain className="w-3.5 h-3.5 text-[#0552A2] mb-1" />
                          <span className="text-[9px] text-[#64748B] uppercase">Peak Altitude</span>
                          <span className="font-bold text-[#17212B]">{generatedItinerary.maxAlt || '4,130m'}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl flex flex-col items-center">
                          <Compass className="w-3.5 h-3.5 text-[#0552A2] mb-1" />
                          <span className="text-[9px] text-[#64748B] uppercase">Trail Distance</span>
                          <span className="font-bold text-[#17212B]">{generatedItinerary.distance || '115 km'}</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl flex flex-col items-center">
                          <Hotel className="w-3.5 h-3.5 text-[#0552A2] mb-1" />
                          <span className="text-[9px] text-[#64748B] uppercase">Lodging Tier</span>
                          <span className="font-bold text-[#17212B] capitalize">{selectedLodgingStyle}</span>
                        </div>
                      </div>

                      {/* Certified Guide Notice */}
                      {generatedItinerary.guideRequirement && (
                        <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/80 p-3 rounded-xl text-[11px] text-[#475569]">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-bold text-[#17212B] font-mono uppercase text-[10px] block">Mandatory Safety Protocol</span>
                            <span>{generatedItinerary.guideRequirement}</span>
                          </div>
                        </div>
                      )}

                      {/* Required Permits Checkmarks */}
                      {generatedItinerary.permits && generatedItinerary.permits.length > 0 && (
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[10px] font-mono text-[#64748B] uppercase font-bold">Endorsed Regional Permits</span>
                          <div className="flex flex-wrap gap-1.5">
                            {generatedItinerary.permits.map((p: string, idx: number) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Day-by-Day Stages Timeline */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col gap-3 shadow-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#17212B]">
                          Daily Elevation & Trail Stages
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <button
                            type="button"
                            onClick={() => setExpandedDay(expandedDay === null ? 1 : null)}
                            className="text-[#0552A2] hover:underline"
                          >
                            {expandedDay === null ? 'Expand Details' : 'Compact View'}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2.5 mt-1">
                        {generatedItinerary.days.map((day: any) => {
                          const isExpanded = expandedDay === day.day || expandedDay === 999;
                          return (
                            <div
                              key={day.day}
                              className={`border rounded-xl p-3.5 transition-all text-left ${
                                isExpanded
                                  ? 'bg-slate-50/70 border-slate-300'
                                  : 'bg-white border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              {/* Stage Row Header */}
                              <div
                                onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                                className="flex items-center justify-between gap-2 cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <span className="font-mono text-[10px] font-bold bg-[#0552A2] text-white px-2 py-0.5 rounded-md shrink-0">
                                    Day {String(day.day).padStart(2, '0')}
                                  </span>
                                  <span className="text-xs font-bold text-[#17212B] line-clamp-1">
                                    {day.title || day.activity.slice(0, 48)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                  <span className="font-mono text-[11px] font-bold text-[#0552A2] bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
                                    {day.alt}
                                  </span>
                                  {isExpanded ? (
                                    <ChevronUp className="w-3.5 h-3.5 text-[#64748B]" />
                                  ) : (
                                    <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
                                  )}
                                </div>
                              </div>

                              {/* Stage Body */}
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="pt-3 mt-2.5 border-t border-slate-200/80 flex flex-col gap-2 text-xs"
                                >
                                  <p className="text-[11px] text-[#475569] leading-relaxed font-sans">
                                    {day.activity}
                                  </p>

                                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-[10px]">
                                    {day.distance && (
                                      <div className="bg-white border border-slate-200 p-1.5 rounded-lg">
                                        <span className="text-[#64748B] block">Distance:</span>
                                        <span className="font-bold text-[#17212B]">{day.distance}</span>
                                      </div>
                                    )}
                                    {day.duration && (
                                      <div className="bg-white border border-slate-200 p-1.5 rounded-lg">
                                        <span className="text-[#64748B] block">Duration:</span>
                                        <span className="font-bold text-[#17212B]">{day.duration}</span>
                                      </div>
                                    )}
                                    {day.stay && (
                                      <div className="bg-white border border-slate-200 p-1.5 rounded-lg">
                                        <span className="text-[#64748B] block">Overnight:</span>
                                        <span className="font-bold text-[#17212B] line-clamp-1">{day.stay}</span>
                                      </div>
                                    )}
                                    {day.meals && (
                                      <div className="bg-white border border-slate-200 p-1.5 rounded-lg">
                                        <span className="text-[#64748B] block">Meals Included:</span>
                                        <span className="font-bold text-[#0552A2]">{day.meals}</span>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                      <div>
                        {bookSuccess ? (
                          <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Expedition package booked! Visible in your Bookings tab.</span>
                          </div>
                        ) : (
                          <span className="text-[11px] font-mono text-[#64748B]">
                            Instant confirmation • Includes certified IFMGA Sherpa guide & porter permits
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={handleBookExpedition}
                          className="flex-1 sm:flex-initial bg-[#0552A2] hover:bg-[#044080] text-white px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Book This Expedition</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-white border border-dashed border-slate-300 min-h-[300px] rounded-2xl flex items-center justify-center text-center p-6 font-mono text-xs text-[#64748B]">
                    Select a curated blueprint above or configure parameters to generate an expedition plan.
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

