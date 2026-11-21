'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore, Permit, Guide } from '@/store/useTravelStore';

interface GuidesPermitsSectionProps {
  activeId: string;
}

export default function GuidesPermitsSection({ activeId }: GuidesPermitsSectionProps) {
  const { guides, permits, addPermit, addBooking } = useTravelStore();
  
  // Form states
  const [applicantName, setApplicantName] = useState('Alex Mercer');
  const [passportNumber, setPassportNumber] = useState('NPL-9988221A');
  const [permitType, setPermitType] = useState<'Trekking' | 'Mountaineering' | 'National Park'>('Trekking');
  const [zone, setZone] = useState('Annapurna Conservation Area (ACAP)');
  const [startDate, setStartDate] = useState('2026-06-05');
  const [endDate, setEndDate] = useState('2026-06-15');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); // 0: None, 1: Hashing, 2: Verification, 3: Completed
  const [hiredGuide, setHiredGuide] = useState<Guide | null>(null);

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

  const handleApplyPermit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStep(1);

    // Simulated progress steps
    setTimeout(() => {
      setSubmitStep(2);
      setTimeout(() => {
        setSubmitStep(3);
        const costMap = { Trekking: 30, Mountaineering: 11000, 'National Park': 20 };
        addPermit({
          type: permitType,
          zone,
          applicantName,
          passportNumber,
          startDate,
          endDate,
          cost: costMap[permitType] || 30
        });
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitStep(0);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const handleHireGuide = (guide: Guide) => {
    const invNo = `INV-GUIDE-${Math.floor(1000 + Math.random() * 9000)}`;
    addBooking({
      id: `b-guide-${Date.now()}`,
      type: 'Guide',
      title: `${guide.name} - Himalayan Guide Services`,
      date: `${startDate} - ${endDate}`,
      details: `Languages: ${guide.languages.join(', ')}. Full navigation support activated.`,
      cost: guide.pricePerDay * 10, // 10 days
      status: 'Pending',
      invoiceNo: invNo
    });

    setHiredGuide(guide);
    setTimeout(() => {
      setHiredGuide(null);
    }, 2000);
  };

  return (
    <motion.div 
      key={activeId}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full text-left"
    >
      {/* ── GUIDES VIEW ────────────────────────────────────────────────── */}
      {activeId === 'guides' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase">
              Cert. Sherpas & Naturalists
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#17212B]">Sherpas & Mountain Guides</h2>
            <p className="text-xs text-[#475569]">Hire native Himalayan navigators certified for high altitude routes, wildlife tracking, and translation support.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {guides.map(guide => (
              <div
                key={guide.id}
                className="group bg-white border border-[#0552A2]/12 rounded-[22px] overflow-hidden flex flex-col justify-between shadow-[0_8px_24px_-8px_rgba(15,42,74,0.08)] hover:border-[#0552A2]/35 hover:shadow-[0_14px_32px_-8px_rgba(5,82,162,0.14)] transition-all duration-300"
              >
                {/* Edge-to-Edge Portrait Header */}
                <div className="relative h-56 w-full overflow-hidden bg-[#17212B]">
                  <img
                    src={guide.avatar}
                    alt={guide.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                  <span className="absolute top-3.5 right-3.5 bg-white rounded-full px-3 py-1 text-xs font-bold text-[#17212B] shadow-sm">
                    ★ {guide.rating} · {guide.experience} yrs
                  </span>

                  <span className="absolute bottom-3.5 left-4 bg-[#0552A2] text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-xs">
                    {guide.type} Master
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 gap-5">
                  <div>
                    <h3 className="text-xl font-bold font-serif text-[#17212B] group-hover:text-[#0552A2] transition-colors">
                      {guide.name}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed mt-2">
                      {guide.bio}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-[#0552A2]/10">
                    <div>
                      <span className="text-[11px] font-medium text-[#64748B] block">Service Rate</span>
                      <div className="flex items-baseline gap-0.5 mt-0.5">
                        <span className="text-xl font-bold tracking-tight text-[#17212B]">${guide.pricePerDay}</span>
                        <span className="text-xs text-[#64748B] font-medium">/day</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleHireGuide(guide)}
                      className="bg-[#0552A2] text-white text-xs font-bold tracking-wide px-5 py-2.5 rounded-full hover:bg-[#043e7b] transition-colors cursor-pointer shadow-xs"
                    >
                      Hire Guide
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {hiredGuide && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
              <div className="bg-[#F8FAFD] border border-[#92C4EA]/40 p-6 rounded-3xl shadow-xl max-w-sm text-center">
                <span className="text-2xl mb-1 block">🧗</span>
                <h4 className="text-sm font-bold text-[#17212B]">Guide Application Recieved</h4>
                <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">
                  You have successfully booked {hiredGuide.name}. Verification invoice logged in Account.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── PERMITS VIEW ───────────────────────────────────────────────── */}
      {activeId === 'permits' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase">
              Gov Registry Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#17212B]">Permits & Approvals</h2>
            <p className="text-xs text-[#475569]">Apply for standard conservation area permits and special mountaineering clearances online.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <motion.div 
              variants={itemVariants}
              className="bg-[var(--card-bg)] border border-[#92C4EA]/35 p-5 rounded-2xl flex flex-col gap-4 shadow-sm"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] border-b border-[#92C4EA]/20 pb-2">
                New Permit Request
              </h3>

              <form onSubmit={handleApplyPermit} className="flex flex-col gap-3 font-mono text-[10px] text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B]">Applicant Name</label>
                  <input 
                    type="text" 
                    value={applicantName} 
                    onChange={e => setApplicantName(e.target.value)}
                    className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs focus:outline-none focus:border-[#0552A2] text-[#17212B]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B]">Passport Identification</label>
                  <input 
                    type="text" 
                    value={passportNumber} 
                    onChange={e => setPassportNumber(e.target.value)}
                    className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs focus:outline-none focus:border-[#0552A2] text-[#17212B]"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase text-[#64748B]">Permit Class</label>
                    <select 
                      value={permitType} 
                      onChange={e => setPermitType(e.target.value as any)}
                      className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs focus:outline-none text-[#17212B]"
                    >
                      <option value="Trekking">Trekking Loop</option>
                      <option value="Mountaineering">Mountaineering Peak</option>
                      <option value="National Park">National Park</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase text-[#64748B]">Target Zone</label>
                    <input 
                      type="text" 
                      value={zone} 
                      onChange={e => setZone(e.target.value)}
                      className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs focus:outline-none focus:border-[#0552A2] text-[#17212B]"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase text-[#64748B]">Start Date</label>
                    <input 
                      type="date" 
                      value={startDate} 
                      onChange={e => setStartDate(e.target.value)}
                      className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs focus:outline-none text-[#17212B] font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase text-[#64748B]">End Date</label>
                    <input 
                      type="date" 
                      value={endDate} 
                      onChange={e => setEndDate(e.target.value)}
                      className="bg-[#F2F8FD] border border-[#92C4EA]/40 p-2.5 rounded-lg text-xs focus:outline-none text-[#17212B] font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#0552A2] hover:bg-[#B08156] text-white py-2.5 rounded-xl font-bold uppercase tracking-widest mt-2 cursor-pointer transition-colors text-[10px]"
                >
                  {isSubmitting ? 'Requesting...' : 'Request Permit Clearances'}
                </button>
              </form>
            </motion.div>

            {/* List */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] border-b border-[#92C4EA]/20 pb-2">
                Active Permits Ledger
              </h3>

              <div className="flex flex-col gap-3">
                {permits.map(permit => (
                  <div key={permit.id} className="bg-[#F2F8FD]/40 border border-[#92C4EA]/35 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[8px] font-mono font-bold text-white bg-[#0552A2] px-1.5 py-0.5 rounded uppercase">
                        {permit.type}
                      </span>
                      <h4 className="text-xs font-bold mt-1 text-[#17212B]">{permit.zone}</h4>
                      <p className="text-[10px] text-[#475569] mt-0.5 font-mono">Passport: {permit.passportNumber}</p>
                    </div>
                    <div className="text-right flex flex-col gap-1 font-mono text-xs">
                      <span className={`font-bold ${permit.status === 'Approved' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {permit.status}
                      </span>
                      <span className="text-[9px] text-[#64748B]">${permit.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Hashing steps portal overlay */}
          <AnimatePresence>
            {isSubmitting && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#F8FAFD] border border-[#92C4EA]/40 p-6 rounded-3xl shadow-xl max-w-sm text-center w-full"
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="h-6 w-6 rounded-full border-2 border-t-transparent border-[#0552A2] animate-spin" />
                    <h4 className="text-xs font-mono font-bold text-[#17212B] uppercase mt-2">
                      {submitStep === 1 && '1/3 Generating Crypto Hash...'}
                      {submitStep === 2 && '2/3 Querying Immigration Gateway...'}
                      {submitStep === 3 && '3/3 Permit Registered Success!'}
                    </h4>
                    <p className="text-[10px] text-[#475569]">Connecting with Government Registry server nodes...</p>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

