'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HostSectionProps {
  activeId: string;
}

export default function HostSection({ activeId }: HostSectionProps) {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form states
  const [hostName, setHostName] = useState('');
  const [hostType, setHostType] = useState('Guide');
  const [propertyName, setPropertyName] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyPrice, setPropertyPrice] = useState('');
  const [attractionName, setAttractionName] = useState('');
  const [attractionRegion, setAttractionRegion] = useState('');
  const [permitOfficerName, setPermitOfficerName] = useState('');
  const [permitOfficerCode, setPermitOfficerCode] = useState('');

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

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    setSuccessMsg(type);
    setTimeout(() => {
      setSuccessMsg(null);
      // Reset forms
      setHostName('');
      setPropertyName('');
      setPropertyLocation('');
      setPropertyPrice('');
      setAttractionName('');
      setAttractionRegion('');
      setPermitOfficerName('');
      setPermitOfficerCode('');
    }, 2000);
  };

  const sectionMeta: Record<string, { eyebrow: string; title: string; subtitle: string; badge: string; steps: string[] }> = {
    becomehost: {
      eyebrow: 'Host & Guide Network',
      title: 'Become a Certified Host or Guide',
      subtitle: 'Join Nepal’s official network of licensed mountaineering guides, eco-lodge owners, and private alpine transit providers.',
      badge: 'NTB Partner Portal',
      steps: [
        'Submit your full legal name and primary host category.',
        'Our Kathmandu verification desk reviews your license or property record.',
        'Receive direct traveler booking requests and live dispatch access.',
      ],
    },
    listproperty: {
      eyebrow: 'Hospitality Directory',
      title: 'List Your Himalayan Property',
      subtitle: 'Showcase your boutique hotel, mountain lodge, or village homestay to verified international travelers.',
      badge: 'Eco-Stay Registry',
      steps: [
        'Provide your property name, valley or altitude location, and nightly rate.',
        'Quality & safety audit confirms heating, dining, and hospitality standards.',
        'Go live in the Hotels & Eco-Stays marketplace.',
      ],
    },
    listattraction: {
      eyebrow: 'Sightseeing Matrix',
      title: 'Register a Landmark or Trail',
      subtitle: 'Contribute verified cultural sites, monasteries, and scenic viewpoints to the official Visit Nepal directory.',
      badge: 'Heritage & Trails',
      steps: [
        'Enter the landmark name and its primary geographic region.',
        'Regional stewards verify coordinates, elevation, and seasonal access.',
        'Published across Explore Destinations and Iconic Landmarks.',
      ],
    },
    listpermit: {
      eyebrow: 'Immigration & TIMS Desk',
      title: 'Permit Authority Portal',
      subtitle: 'Authorized checkpoint access for park rangers, TIMS officers, and restricted-area permit verification.',
      badge: 'Official Access',
      steps: [
        'Authenticate with your registered officer name and department key.',
        'Verify traveler TIMS cards and restricted-zone QR permits in real time.',
        'Sync checkpoint logs directly with central tourism telemetry.',
      ],
    },
  };

  const meta = sectionMeta[activeId] || sectionMeta.becomehost;

  return (
    <motion.div
      key={activeId}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full text-left"
    >
      <div className="flex flex-col gap-6 sm:gap-8 max-w-[1440px] w-full mx-auto py-4">
        {/* Himalayan Blue Banner Header */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0B2240] via-[#0552A2] to-[#1D6FD6] text-white p-6 sm:p-8 shadow-[0_14px_36px_-12px_rgba(5,82,162,0.4)] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
        >
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#92C4EA]/20 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-2">
            <span className="text-[11px] font-semibold tracking-[0.18em] text-[#92C4EA] uppercase">
              {meta.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
              {meta.title}
            </h2>
            <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
              {meta.subtitle}
            </p>
          </div>
          <span className="relative z-10 self-start lg:self-center px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-xs font-semibold text-white shrink-0">
            {meta.badge}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Left Column: Spacious Form Card */}
          <div className="lg:col-span-7 flex flex-col">
            {/* ── BECOME A HOST ────────────────────────────────────────────── */}
            {activeId === 'becomehost' && (
              <motion.div variants={itemVariants} className="bg-white border border-[#0552A2]/12 p-6 sm:p-8 rounded-[22px] flex flex-col justify-between gap-6 shadow-[0_8px_28px_-8px_rgba(15,42,74,0.08)] flex-1">
                <div className="flex items-center justify-between border-b border-[#0552A2]/10 pb-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0552A2]">
                    Become a Host / Guide
                  </h3>
                  <span className="text-[11px] font-medium text-[#64748B]">Credential Application</span>
                </div>
                <form onSubmit={e => handleSubmit(e, 'Host profile submitted')} className="flex flex-col gap-5 flex-1 justify-between">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Full Name</label>
                      <input
                        type="text"
                        value={hostName}
                        onChange={e => setHostName(e.target.value)}
                        placeholder="Nima Sherpa"
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Host Category</label>
                      <select
                        value={hostType}
                        onChange={e => setHostType(e.target.value)}
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                      >
                        <option value="Guide">Certified Mountaineer Guide</option>
                        <option value="Stay">Hotel / Tea House Owner</option>
                        <option value="Transit">Private Jeep / Heli Transit Provider</option>
                      </select>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0552A2] hover:bg-[#043e7b] text-white font-bold py-3.5 rounded-[14px] text-xs uppercase tracking-[0.16em] transition-colors cursor-pointer shadow-[0_8px_20px_-6px_rgba(5,82,162,0.4)]"
                  >
                    Register Host Credentials
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── LIST YOUR PROPERTY ────────────────────────────────────────── */}
            {activeId === 'listproperty' && (
              <motion.div variants={itemVariants} className="bg-white border border-[#0552A2]/12 p-6 sm:p-8 rounded-[22px] flex flex-col justify-between gap-6 shadow-[0_8px_28px_-8px_rgba(15,42,74,0.08)] flex-1">
                <div className="flex items-center justify-between border-b border-[#0552A2]/10 pb-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0552A2]">
                    List Your Property
                  </h3>
                  <span className="text-[11px] font-medium text-[#64748B]">Lodging Submission</span>
                </div>
                <form onSubmit={e => handleSubmit(e, 'Property listing requested')} className="flex flex-col gap-5 flex-1 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Property Name</label>
                      <input
                        type="text"
                        value={propertyName}
                        onChange={e => setPropertyName(e.target.value)}
                        placeholder="Annapurna Heritage Lodge"
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Location / Altitude</label>
                        <input
                          type="text"
                          value={propertyLocation}
                          onChange={e => setPropertyLocation(e.target.value)}
                          placeholder="Manang Valley (3,519m)"
                          className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Target Price per Night ($)</label>
                        <input
                          type="number"
                          value={propertyPrice}
                          onChange={e => setPropertyPrice(e.target.value)}
                          placeholder="120"
                          className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0552A2] hover:bg-[#043e7b] text-white font-bold py-3.5 rounded-[14px] text-xs uppercase tracking-[0.16em] transition-colors cursor-pointer shadow-[0_8px_20px_-6px_rgba(5,82,162,0.4)]"
                  >
                    Submit Property for Audit
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── LIST AN ATTRACTION ────────────────────────────────────────── */}
            {activeId === 'listattraction' && (
              <motion.div variants={itemVariants} className="bg-white border border-[#0552A2]/12 p-6 sm:p-8 rounded-[22px] flex flex-col justify-between gap-6 shadow-[0_8px_28px_-8px_rgba(15,42,74,0.08)] flex-1">
                <div className="flex items-center justify-between border-b border-[#0552A2]/10 pb-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0552A2]">
                    Register Landmark / Trail
                  </h3>
                  <span className="text-[11px] font-medium text-[#64748B]">Directory Entry</span>
                </div>
                <form onSubmit={e => handleSubmit(e, 'Landmark registered successfully')} className="flex flex-col gap-5 flex-1 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Landmark Name</label>
                      <input
                        type="text"
                        value={attractionName}
                        onChange={e => setAttractionName(e.target.value)}
                        placeholder="Tengboche Monastery"
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Region</label>
                      <input
                        type="text"
                        value={attractionRegion}
                        onChange={e => setAttractionRegion(e.target.value)}
                        placeholder="Khumbu Region"
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0552A2] hover:bg-[#043e7b] text-white font-bold py-3.5 rounded-[14px] text-xs uppercase tracking-[0.16em] transition-colors cursor-pointer shadow-[0_8px_20px_-6px_rgba(5,82,162,0.4)]"
                  >
                    Request Landmark Registration
                  </button>
                </form>
              </motion.div>
            )}

            {/* ── PERMIT AUTHORITY / REGISTER OFFICER ────────────────────────── */}
            {activeId === 'listpermit' && (
              <motion.div variants={itemVariants} className="bg-white border border-[#0552A2]/12 p-6 sm:p-8 rounded-[22px] flex flex-col justify-between gap-6 shadow-[0_8px_28px_-8px_rgba(15,42,74,0.08)] flex-1">
                <div className="flex items-center justify-between border-b border-[#0552A2]/10 pb-3.5">
                  <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#0552A2]">
                    Permit Officer Registration
                  </h3>
                  <span className="text-[11px] font-medium text-[#64748B]">Department Auth</span>
                </div>
                <form onSubmit={e => handleSubmit(e, 'Immigration authority logged')} className="flex flex-col gap-5 flex-1 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Officer Name</label>
                      <input
                        type="text"
                        value={permitOfficerName}
                        onChange={e => setPermitOfficerName(e.target.value)}
                        placeholder="Officer K. P. Sharma"
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">Department Verification Key</label>
                      <input
                        type="password"
                        value={permitOfficerCode}
                        onChange={e => setPermitOfficerCode(e.target.value)}
                        placeholder="••••••••"
                        className="bg-[#F8FBFF] border border-[#0552A2]/15 focus:border-[#0552A2] focus:outline-none px-4 py-3 rounded-[14px] text-sm font-medium text-[#17212B]"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0552A2] hover:bg-[#043e7b] text-white font-bold py-3.5 rounded-[14px] text-xs uppercase tracking-[0.16em] transition-colors cursor-pointer shadow-[0_8px_20px_-6px_rgba(5,82,162,0.4)]"
                  >
                    Login to Immigration Desk
                  </button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Right Column: Verification Workflow & Benefits Panel */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 bg-[#F2F8FD]/75 border border-[#0552A2]/12 p-6 sm:p-8 rounded-[22px] flex flex-col justify-between gap-6"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#0552A2] block pb-3.5 border-b border-[#0552A2]/10">
                Verification Process
              </span>

              <div className="flex flex-col gap-5 mt-5">
                {meta.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <span className="h-7 w-7 rounded-full bg-[#0552A2] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="text-sm text-[#334155] leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[16px] p-4 border border-[#0552A2]/10 flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#17212B] block">Nepal Tourism Board Desk</span>
                <span className="text-[11px] text-[#64748B]">Average review turnaround: 24–48 hrs</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#F2F8FD] text-[#0552A2] text-[11px] font-bold shrink-0">
                Active
              </span>
            </div>
          </motion.div>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            >
              <div className="bg-[#F8FAFD] border border-[#92C4EA]/40 p-5 rounded-3xl text-center shadow-xl">
                <span className="text-2xl mb-1 block">📝</span>
                <h4 className="text-sm font-bold text-[#17212B]">{successMsg}</h4>
                <p className="text-[10px] text-[#475569] mt-1">Audit verification queue updated.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

