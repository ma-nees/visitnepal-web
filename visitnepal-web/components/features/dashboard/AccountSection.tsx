'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore, Booking, ChatChannel } from '@/store/useTravelStore';

interface AccountSectionProps {
  activeId: string;
}

export default function AccountSection({ activeId }: AccountSectionProps) {
  const { 
    currentUser, loginUser, logoutUser, 
    bookings, 
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

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setGeneratedItinerary({
        title: `${customPreferences.duration} Days Organic ${customPreferences.preferredRegion} Custom Trek`,
        region: customPreferences.preferredRegion,
        difficulty: customPreferences.difficulty,
        days: [
          { day: 1, activity: 'Airport pick-up & check-in to Zen eco-lodge. Orientation.', alt: '1,400m' },
          { day: 2, activity: 'Private valley 4x4 transport to trek trailhead. Accomm. briefing.', alt: '2,600m' },
          { day: 3, activity: 'Scenic hiking loop passing organic cardamom plantations.', alt: '3,100m' },
          { day: 4, activity: 'Rest & acclimatization day in local valley homestay.', alt: '3,100m' }
        ],
        costEstimate: customPreferences.budget === 'luxury' ? 3200 : (customPreferences.budget === 'premium' ? 1200 : 450)
      });
    }, 2000);
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
              <motion.div variants={itemVariants} className="bg-[var(--card-bg)] border border-[#92C4EA]/35 p-6 rounded-2xl text-center flex flex-col gap-4 shadow-sm relative">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-full mx-auto border-2 border-[#0552A2] object-cover shadow-sm" />
                <div>
                  <h3 className="font-bold text-sm text-[#17212B]">{currentUser.name}</h3>
                  <p className="text-[10px] text-[#64748B] font-mono mt-0.5">{currentUser.email}</p>
                  <span className="inline-block mt-2 px-2 py-0.5 rounded bg-[#F2F8FD] border border-[#92C4EA]/40 text-[9px] font-mono font-bold text-[#0552A2]">
                    {currentUser.role} Account Active
                  </span>
                </div>
                <button 
                  onClick={logoutUser}
                  className="w-full mt-2 bg-[#EBD6BC] text-[#17212B] py-2.5 rounded-xl text-[10px] font-mono font-bold hover:bg-[#dfc4a5] cursor-pointer transition-colors shadow-2xs"
                >
                  Disconnect Gateway
                </button>
              </motion.div>

              {/* Feed Management column (right, 2-span) */}
              <motion.div variants={itemVariants} className="md:col-span-2 flex flex-col gap-6">
                
                {/* Create Story Form */}
                <div className="bg-[var(--card-bg)] border border-[#92C4EA]/35 p-5 rounded-2xl flex flex-col gap-3 shadow-sm text-left">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0552A2] border-b border-[#92C4EA]/20 pb-2 flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    Share your Himalayan Story
                  </h3>
                  
                  <div className="flex flex-col gap-3">
                    <textarea
                      placeholder="What is on your mind? Share your trekking updates, peak climbs, or cultural findings..."
                      value={newPostContent}
                      onChange={e => setNewPostContent(e.target.value)}
                      rows={3}
                      className="w-full bg-[#F2F8FD]/65 border border-[#92C4EA]/35 text-xs rounded-xl p-3 text-[#17212B] focus:outline-none focus:border-[#0552A2]/50 resize-none font-sans leading-relaxed"
                    />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1 text-[9px] font-mono text-[#64748B]">
                        <label className="uppercase">Location Coordinates</label>
                        <input
                          type="text"
                          placeholder="e.g. Annapurna Base Camp (4,130m)"
                          value={newPostLocation}
                          onChange={e => setNewPostLocation(e.target.value)}
                          className="w-full bg-[#F2F8FD]/65 border border-[#92C4EA]/35 text-[11px] rounded-lg px-2.5 py-1.5 text-[#17212B] focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1 text-[9px] font-mono text-[#64748B]">
                        <label className="uppercase">Image Link (Optional)</label>
                        <input
                          type="text"
                          placeholder="Paste photo URL"
                          value={newPostImage}
                          onChange={e => setNewPostImage(e.target.value)}
                          className="w-full bg-[#F2F8FD]/65 border border-[#92C4EA]/35 text-[11px] rounded-lg px-2.5 py-1.5 text-[#17212B] focus:outline-none"
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
                      className="bg-[#0552A2] hover:bg-[#B08156] text-white font-mono text-[10px] font-bold py-2.5 rounded-xl uppercase tracking-widest transition-colors cursor-pointer w-full"
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
                          <div className="bg-[#F2F8FD]/15 border border-dashed border-[#92C4EA]/30 p-8 rounded-2xl text-center text-xs font-mono text-[#64748B]">
                            You haven't shared any Himalayan stories yet. Publish your first post above!
                          </div>
                        );
                      }
                      return userPosts.map(post => (
                        <div key={post.id} className="bg-[var(--card-bg)] border border-[#92C4EA]/35 rounded-2xl p-4 flex flex-col gap-3 shadow-2xs hover:border-[#0552A2]/30 transition-all relative overflow-hidden">
                          
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
            <motion.div variants={itemVariants} className="bg-[var(--card-bg)] border border-[#92C4EA]/35 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] text-center border-b border-[#92C4EA]/20 pb-2">
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
                    className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs text-[#17212B]"
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
                    className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs text-[#17212B]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B]">Identity Role</label>
                  <select 
                    value={selectedRole} 
                    onChange={e => setSelectedRole(e.target.value as any)}
                    className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs text-[#17212B]"
                  >
                    <option value="Traveler">Traveler Profile</option>
                    <option value="Guide">Guide Profile</option>
                    <option value="Butler">Travel Butler Profile</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="bg-[#0552A2] text-white font-bold py-2.5 rounded-xl uppercase tracking-widest mt-2 hover:bg-[#B08156] transition-colors cursor-pointer"
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
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase">
              Confirmed Vouchers
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#17212B]">Ecosystem Bookings</h2>
            <p className="text-xs text-[#475569]">Holographic check-in codes, guide listings, and invoice schedules generated under your credentials.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map(b => (
              <div 
                key={b.id}
                className="bg-[var(--card-bg)] border border-[#92C4EA]/35 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500">
                    <span>{b.invoiceNo}</span>
                    <span className="font-bold text-emerald-600 uppercase">{b.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#17212B]">{b.title}</h3>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">{b.details}</p>
                </div>

                <div className="flex justify-between items-center mt-5 border-t border-[#92C4EA]/15 pt-3 font-mono">
                  <div>
                    <span className="text-[#64748B] block text-[9px] uppercase">Amount Paid</span>
                    <span className="text-xs font-bold text-[#17212B]">${b.cost} USD</span>
                  </div>
                  <button 
                    onClick={() => window.print()}
                    className="bg-[#F2F8FD] border border-[#92C4EA]/40 hover:bg-[#EBD6BC] text-[#17212B] text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
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
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase">
              Historical Ledger
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#17212B]">Past Journeys</h2>
            <p className="text-xs text-[#475569]">Archived trips, high peak climbs successfully navigated, and past guide reviews.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F2F8FD]/20 border border-[#92C4EA]/25 p-5 rounded-2xl flex flex-col gap-2">
              <span className="text-[9px] font-mono text-[#64748B]">OCTOBER 2025 • COMPLETED</span>
              <h3 className="text-sm font-bold">Annapurna Circuit Hike</h3>
              <p className="text-xs text-[#475569] leading-relaxed">Completed 16-day loop crossing Thorong La Pass (5,416m). Guide support: Nima Sherpa.</p>
            </div>
            <div className="bg-[#F2F8FD]/20 border border-[#92C4EA]/25 p-5 rounded-2xl flex flex-col gap-2">
              <span className="text-[9px] font-mono text-[#64748B]">MARCH 2024 • COMPLETED</span>
              <h3 className="text-sm font-bold">Kathmandu Cultural Pilgrimage</h3>
              <p className="text-xs text-[#475569] leading-relaxed">Visited Pashupatinath, Boudha, Swayambhu, and Bhaktapur squares. Lodging: Shangri-La valley.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── MESSAGES SECTION ──────────────────────────────────────────── */}
      {activeId === 'messages' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase">
              Communication Terminal
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#17212B]">Ecosystem Channels</h2>
            <p className="text-xs text-[#475569]">Chat in real-time with certified guides, host owners, or your cognitive AI butler.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px] items-stretch">
            {/* Channels List */}
            <div className="bg-[#F2F8FD]/35 border border-[#92C4EA]/35 rounded-2xl p-3 flex flex-col gap-2 overflow-y-auto">
              {channels.map(ch => (
                <div 
                  key={ch.id} 
                  onClick={() => setActiveChannelId(ch.id)}
                  className={`p-3 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                    activeChannelId === ch.id ? 'bg-[#0552A2]/12 border border-[#0552A2]/20' : 'hover:bg-[#F2F8FD]/75 border border-transparent'
                  }`}
                >
                  <img src={ch.avatar} alt={ch.name} className="w-10 h-10 object-cover rounded-full border border-[#92C4EA]/30" />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-[#17212B]">{ch.name.split(' (')[0]}</h4>
                    <p className="text-[9px] text-[#64748B]">{ch.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Box */}
            <div className="lg:col-span-2 bg-[var(--card-bg)] border border-[#92C4EA]/35 rounded-2xl flex flex-col justify-between overflow-hidden">
              {/* Header */}
              <div className="bg-[#F2F8FD]/45 p-3 px-4 border-b border-[#92C4EA]/25 flex items-center gap-3">
                <img src={activeChannel?.avatar} alt={activeChannel?.name} className="w-8 h-8 object-cover rounded-full" />
                <div className="text-left">
                  <h4 className="text-xs font-bold">{activeChannel?.name}</h4>
                  <p className="text-[8px] font-mono text-[#64748B] uppercase">{activeChannel?.status}</p>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto font-mono text-[10px]">
                {activeChannel?.messages.map((m, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col gap-0.5 max-w-[80%] ${m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                  >
                    <span className="text-[8px] text-[#64748B]">{m.senderName} • {m.timestamp}</span>
                    <div 
                      className={`p-2.5 rounded-2xl text-[11px] leading-relaxed font-sans ${
                        m.sender === 'user' 
                          ? 'bg-[#0552A2] text-white rounded-tr-none' 
                          : 'bg-[#F2F8FD] text-[#17212B] rounded-tl-none border border-[#92C4EA]/25'
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
              <form onSubmit={handleSend} className="p-3 border-t border-[#92C4EA]/25 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Ask weather, pathfinders, or send namaste..."
                  className="flex-1 bg-[#F2F8FD] border border-[#92C4EA]/40 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none text-[#17212B] font-mono"
                />
                <button 
                  type="submit"
                  className="bg-[#0552A2] text-white text-xs font-bold font-mono px-4 rounded-xl hover:bg-[#B08156] transition-colors cursor-pointer"
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
        <div className="flex flex-col gap-6 sm:gap-8 max-w-[1440px] w-full mx-auto py-4">
          {/* Himalayan Blue Banner Header */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0B2240] via-[#0552A2] to-[#1D6FD6] text-white p-6 sm:p-8 shadow-[0_14px_36px_-12px_rgba(5,82,162,0.4)] flex flex-col lg:flex-row lg:items-center justify-between gap-5"
          >
            <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#92C4EA]/20 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-2">
              <span className="text-[11px] font-semibold tracking-[0.18em] text-[#92C4EA] uppercase">
                AI Travel Synthesizer
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
                Calibrate Custom Itinerary
              </h2>
              <p className="text-sm text-white/80 max-w-xl leading-relaxed">
                Input your preferred regional coordinates, trek duration, and altitude difficulty parameters to synthesize a tailored Himalayan route.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold text-white">
                {customPreferences.preferredRegion}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/15 border border-white/20 text-xs font-semibold text-white">
                {customPreferences.duration} Days
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FDB716]/20 border border-[#FDB716]/35 text-xs font-semibold text-[#FDB716] capitalize">
                {customPreferences.difficulty}
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Parameters */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 bg-white border border-[#0552A2]/12 p-6 sm:p-8 rounded-[22px] flex flex-col justify-between gap-6 shadow-[0_8px_28px_-8px_rgba(15,42,74,0.08)]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#0552A2]/10 pb-3.5 mb-5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0552A2]">
                    Itinerary Parameters
                  </h3>
                  <span className="text-[11px] font-medium text-[#64748B]">Step 1 of 2</span>
                </div>

                <div className="flex flex-col gap-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                        Target Region
                      </label>
                      <select
                        value={customPreferences.preferredRegion}
                        onChange={e => setCustomPreference('preferredRegion', e.target.value)}
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                      >
                        <option value="Everest">Everest (Khumbu)</option>
                        <option value="Annapurna">Annapurna Valley</option>
                        <option value="Mustang">Mustang Desert</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                        Trek Duration (Days)
                      </label>
                      <input
                        type="number"
                        min="3"
                        max="30"
                        value={customPreferences.duration}
                        onChange={e => setCustomPreference('duration', parseInt(e.target.value))}
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                        Difficulty Tier
                      </label>
                      <select
                        value={customPreferences.difficulty}
                        onChange={e => setCustomPreference('difficulty', e.target.value)}
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                      >
                        <option value="easy">Easy (Valley Walk)</option>
                        <option value="moderate">Moderate (Teahouse Loop)</option>
                        <option value="challenging">Challenging (High Pass)</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                        Pricing Bracket
                      </label>
                      <select
                        value={customPreferences.budget}
                        onChange={e => setCustomPreference('budget', e.target.value)}
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                      >
                        <option value="budget">Classic ($450)</option>
                        <option value="premium">Premium ($1200)</option>
                        <option value="luxury">Luxury ($3500)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSynthesize}
                className="w-full bg-[#0552A2] hover:bg-[#043e7b] text-white py-3.5 rounded-[14px] text-xs font-bold uppercase tracking-[0.16em] cursor-pointer transition-colors shadow-[0_8px_20px_-6px_rgba(5,82,162,0.4)]"
              >
                {isSynthesizing ? 'Synthesizing Path...' : 'Launch AI Pathfinder'}
              </button>
            </motion.div>

            {/* Results Output */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-6 bg-[#F2F8FD]/75 border border-[#0552A2]/12 p-6 sm:p-8 rounded-[22px] flex flex-col gap-5 min-h-[360px]"
            >
              <div className="flex items-center justify-between border-b border-[#0552A2]/10 pb-3.5">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0552A2]">
                  Generated Itinerary Output
                </h3>
                <span className="text-[11px] font-medium text-[#64748B]">
                  {generatedItinerary ? 'Route Ready' : 'Awaiting Calibration'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                {isSynthesizing ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-10"
                  >
                    <span className="h-8 w-8 border-2 border-t-transparent border-[#0552A2] rounded-full animate-spin mb-3" />
                    <span className="text-sm font-semibold text-[#17212B]">Mapping altitudes &amp; trail nodes...</span>
                    <span className="text-xs text-[#64748B] mt-1">Calculating acclimatization checkpoints</span>
                  </motion.div>
                ) : generatedItinerary ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white p-5 sm:p-6 rounded-[18px] border border-[#0552A2]/12 shadow-xs flex flex-col gap-4 flex-1"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-[#0552A2]/10">
                      <div>
                        <h4 className="font-bold text-base sm:text-lg font-serif text-[#17212B]">{generatedItinerary.title}</h4>
                        <span className="text-xs font-medium text-[#64748B]">
                          Difficulty: <strong className="text-[#0552A2] capitalize">{generatedItinerary.difficulty}</strong>
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#F2F8FD] text-[#0552A2] text-xs font-bold">
                        Est. ${generatedItinerary.costEstimate} USD
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {generatedItinerary.days.map((day: any) => (
                        <div key={day.day} className="flex items-start gap-3 text-xs">
                          <span className="px-2.5 py-1 rounded-full bg-[#0552A2] text-white font-bold shrink-0 text-[10px]">
                            Day 0{day.day}
                          </span>
                          <span className="flex-1 text-[#334155] text-xs sm:text-sm leading-relaxed">{day.activity}</span>
                          <span className="text-[#64748B] font-mono shrink-0 text-[11px]">{day.alt}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white border border-[#0552A2]/12 text-[#0552A2] flex items-center justify-center shadow-xs">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                      </svg>
                    </div>
                    <div className="max-w-sm">
                      <p className="text-sm font-semibold text-[#17212B]">
                        Ready to Synthesize Your Himalayan Loop
                      </p>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                        Configure your region, duration, difficulty, and budget on the left, then launch the pathfinder to generate a day-by-day route.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <span className="px-3 py-1 rounded-full bg-white border border-[#0552A2]/10 text-[11px] font-medium text-[#0552A2]">
                        Route Mapping
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white border border-[#0552A2]/10 text-[11px] font-medium text-[#0552A2]">
                        Altitude Profile
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white border border-[#0552A2]/10 text-[11px] font-medium text-[#0552A2]">
                        Cost Estimate
                      </span>
                    </div>
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

