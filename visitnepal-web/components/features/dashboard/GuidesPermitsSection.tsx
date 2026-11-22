'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore, Permit, Guide } from '@/store/useTravelStore';
import {
  CheckCircle2,
  Check,
  Star,
  ShieldCheck,
  ArrowRight,
  X,
  UserCheck,
  Calendar,
  Languages
} from 'lucide-react';

interface GuidesPermitsSectionProps {
  activeId: string;
  onNavigate?: (id: string) => void;
}

export default function GuidesPermitsSection({ activeId, onNavigate }: GuidesPermitsSectionProps) {
  const { guides, permits, addPermit, addBooking } = useTravelStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Form states
  const [applicantName, setApplicantName] = useState('Alex Mercer');
  const [passportNumber, setPassportNumber] = useState('NPL-9988221A');
  const [permitType, setPermitType] = useState<'Trekking' | 'Mountaineering' | 'National Park'>('Trekking');
  const [zone, setZone] = useState('Annapurna Conservation Area (ACAP)');
  const [startDate, setStartDate] = useState('2026-06-05');
  const [endDate, setEndDate] = useState('2026-06-15');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0); // 0: None, 1: Hashing, 2: Verification, 3: Completed
  const [hiredGuideData, setHiredGuideData] = useState<{ guide: Guide; invoiceNo: string } | null>(null);

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
      status: 'Confirmed',
      invoiceNo: invNo
    });

    setHiredGuideData({ guide, invoiceNo: invNo });
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
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">Sherpas & Mountain Guides</h2>
            <p className="text-xs text-[#475569]">Hire native Himalayan navigators certified for high altitude routes, wildlife tracking, and translation support.</p>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="grid gap-5 auto-card-grid"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))' }}
          >
            {guides.map(guide => (
              <div 
                key={guide.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 flex flex-col justify-between hover:border-[#0552A2]/50 transition-all duration-300 shadow-xs"
              >
                <div className="flex gap-4">
                  <img src={guide.avatar} alt={guide.name} className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-bold text-[#17212B]">{guide.name}</h3>
                      <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase">
                        ★ {guide.rating} ({guide.experience} yrs)
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">{guide.type} Master</span>
                    <p className="text-xs text-[#475569] leading-relaxed line-clamp-2 mt-1.5">{guide.bio}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-5 border-t border-slate-100 pt-3">
                  <div className="text-xs font-mono">
                    <span className="text-[#64748B] block text-[9px] uppercase">Service Rate</span>
                    <span className="font-bold text-[#17212B]">${guide.pricePerDay}/day</span>
                  </div>
                  <button 
                    onClick={() => handleHireGuide(guide)}
                    className="bg-[#0552A2] hover:bg-[#044080] text-white text-[10px] font-mono font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    Hire Guide
                  </button>
                </div>
              </div>
            ))}
          </motion.div>

          {mounted && createPortal(
            <AnimatePresence>
              {hiredGuideData && (
                <div 
                  onClick={() => setHiredGuideData(null)}
                  className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
                >
                  <motion.div 
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.95, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 12 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl max-w-md w-full relative my-auto overflow-hidden text-center"
                  >
                    {/* Close Button */}
                    <button
                      onClick={() => setHiredGuideData(null)}
                      className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Animated Success Badge */}
                    <div className="h-14 w-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3.5 shadow-xs">
                      <Check className="h-7 w-7" strokeWidth={3} />
                    </div>

                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-700 uppercase bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-full">
                      Guide Booking Confirmed
                    </span>

                    <h3 className="text-lg font-black text-[#17212B] mt-2.5 tracking-tight">
                      Guide Application Received
                    </h3>

                    <p className="text-xs text-[#475569] mt-1 max-w-xs mx-auto leading-relaxed">
                      You have successfully booked <span className="font-bold text-[#17212B]">{hiredGuideData.guide.name}</span>. Verification invoice logged in Account.
                    </p>

                    {/* Guide Card Mini Preview */}
                    <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 my-4 text-left flex flex-col gap-2.5">
                      <div className="flex items-center gap-3 pb-2.5 border-b border-slate-200/70">
                        <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                          <img 
                            src={hiredGuideData.guide.avatar} 
                            alt={hiredGuideData.guide.name} 
                            className="h-full w-full object-cover" 
                          />
                          <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-[#17212B] truncate">{hiredGuideData.guide.name}</h4>
                            <ShieldCheck className="h-3.5 w-3.5 text-[#0552A2] shrink-0" />
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-mono text-[#0552A2] font-semibold">{hiredGuideData.guide.type}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-[10px] text-amber-600 font-bold flex items-center gap-0.5">
                              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                              {hiredGuideData.guide.rating} ({hiredGuideData.guide.experience} yrs exp)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Summary Ledger */}
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-mono text-[10px] uppercase">Invoice No</span>
                        <span className="font-mono font-bold text-[#0552A2] text-[11px]">{hiredGuideData.invoiceNo}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-600">
                        <span className="text-slate-500">Service Window</span>
                        <span className="font-semibold text-[#17212B] text-[11px]">10 Days Dedicated Trek</span>
                      </div>
                      <div className="flex justify-between items-center text-xs text-slate-600">
                        <span className="text-slate-500">Languages</span>
                        <span className="font-semibold text-[#17212B] text-[11px]">{hiredGuideData.guide.languages.join(', ')}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-200/70 text-xs">
                        <span className="font-bold text-[#17212B]">Daily Rate</span>
                        <span className="text-sm font-bold text-[#0552A2]">
                          ${hiredGuideData.guide.pricePerDay}
                          <span className="text-[10px] font-normal text-slate-400"> / day</span>
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full pt-1">
                      <button
                        onClick={() => {
                          setHiredGuideData(null);
                          if (onNavigate) {
                            onNavigate('bookings');
                          }
                        }}
                        className="flex-1 py-2.5 px-4 rounded-full bg-[#0552A2] hover:bg-[#044080] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                      >
                        <span>View in My Bookings</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setHiredGuideData(null)}
                        className="py-2.5 px-5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>,
            document.body
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
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">Permits & Approvals</h2>
            <p className="text-xs text-[#475569]">Apply for standard conservation area permits and special mountaineering clearances online.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Form */}
            <motion.div 
              variants={itemVariants}
              className="bg-white border border-slate-200/90 p-5 rounded-2xl flex flex-col gap-4 shadow-xs"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] border-b border-slate-100 pb-2">
                New Permit Request
              </h3>

              <form onSubmit={handleApplyPermit} className="flex flex-col gap-3 font-mono text-[10px] text-left">
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B]">Applicant Name</label>
                  <input 
                    type="text" 
                    value={applicantName} 
                    onChange={e => setApplicantName(e.target.value)}
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:border-[#0552A2] text-[#17212B]"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="uppercase text-[#64748B]">Passport Identification</label>
                  <input 
                    type="text" 
                    value={passportNumber} 
                    onChange={e => setPassportNumber(e.target.value)}
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:border-[#0552A2] text-[#17212B]"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase text-[#64748B]">Permit Class</label>
                    <select 
                      value={permitType} 
                      onChange={e => setPermitType(e.target.value as any)}
                      className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none text-[#17212B]"
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
                      className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none focus:border-[#0552A2] text-[#17212B]"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase text-[#64748B]">Start Date</label>
                    <input 
                      type="date" 
                      value={startDate} 
                      onChange={e => setStartDate(e.target.value)}
                      className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none text-[#17212B] font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="uppercase text-[#64748B]">End Date</label>
                    <input 
                      type="date" 
                      value={endDate} 
                      onChange={e => setEndDate(e.target.value)}
                      className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs focus:outline-none text-[#17212B] font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#0552A2] hover:bg-[#044080] text-white py-2.5 rounded-xl font-bold uppercase tracking-widest mt-2 cursor-pointer transition-colors text-[10px] shadow-2xs"
                >
                  {isSubmitting ? 'Requesting...' : 'Request Permit Clearances'}
                </button>
              </form>
            </motion.div>

            {/* List */}
            <motion.div variants={itemVariants} className="flex flex-col gap-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] border-b border-slate-100 pb-2">
                Active Permits Ledger
              </h3>

              <div className="flex flex-col gap-3">
                {permits.map(permit => (
                  <div key={permit.id} className="bg-white border border-slate-200/90 p-4 rounded-xl flex justify-between items-center shadow-xs">
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
          {mounted && createPortal(
            <AnimatePresence>
              {isSubmitting && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border border-slate-200 p-6 rounded-3xl shadow-2xl max-w-sm text-center w-full my-auto"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <span className="h-7 w-7 rounded-full border-2 border-t-transparent border-[#0552A2] animate-spin" />
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
            </AnimatePresence>,
            document.body
          )}
        </div>
      )}
    </motion.div>
  );
}

