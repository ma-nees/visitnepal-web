'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTravelStore, Stay } from '@/store/useTravelStore';

interface StaysSectionProps {
  activeId: string;
}

export default function StaysSection({ activeId }: StaysSectionProps) {
  const { stays, addBooking } = useTravelStore();
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

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

  // Filter stays based on active tab
  const filteredStays = stays;

  const handleBook = (stay: Stay, roomName: string, price: number) => {
    const invNo = `INV-STAY-${Math.floor(1000 + Math.random() * 9000)}`;
    addBooking({
      id: `b-stay-${Date.now()}`,
      type: 'Hotel',
      title: `${stay.name} - ${roomName}`,
      date: 'June 05 - June 10, 2026',
      details: `Guest check-in: 2 Adults. Preserved room preferences locked.`,
      cost: price * 5, // 5 nights
      status: 'Confirmed',
      invoiceNo: invNo
    });

    setBookingSuccess(roomName);
    setTimeout(() => {
      setBookingSuccess(null);
      setSelectedStay(null);
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
      {/* ── HOTELS & LODGING DIRECTORIES ────────────────────────────────── */}
      {activeId !== 'transportation' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase">
              Boutique Lodging List
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">
              Hotels & Eco-Stays
            </h2>
            <p className="text-xs text-[#475569]">Book certified rooms equipped with heated blankets, local food menus, and mountain views.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredStays.map(stay => (
              <div 
                key={stay.id}
                onClick={() => setSelectedStay(stay)}
                className="group bg-[var(--card-bg)] border border-[#92C4EA]/35 rounded-2xl overflow-hidden hover:border-[#0552A2]/50 transition-all duration-300 shadow-[0_4px_12px_rgba(61,45,39,0.01)] cursor-pointer"
              >
                <img src={stay.image} alt={stay.name} className="w-full h-40 object-cover border-b border-[#92C4EA]/20" />
                <div className="p-5 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-[#0552A2]">
                    <span>{stay.type}</span>
                    <span>★ {stay.rating}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#17212B] mt-0.5">{stay.name}</h3>
                  <p className="text-[10px] text-[#64748B] font-mono">{stay.location}</p>
                  <p className="text-xs text-[#475569] leading-relaxed line-clamp-2 mt-1">{stay.description}</p>
                  
                  <span className="text-xs font-mono font-bold text-[#0552A2] mt-2 block">
                    From ${stay.price}/night • Plan Booking
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* ── TRANSPORTATION VIEW ────────────────────────────────────────── */}
      {activeId === 'transportation' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase">
              Transit Systems
            </span>
            <h2 className="text-2xl font-black tracking-tight text-[#17212B]">Himalayan Transportation</h2>
            <p className="text-xs text-[#475569]">Airport shuttles, high-speed charter flights, and private rugged 4x4 vehicles for valley roads.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F2F8FD] p-5 rounded-2xl border border-[#92C4EA]/35 flex flex-col gap-3">
              <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase">Option 01 / Premium</span>
              <h3 className="text-sm font-bold">Helicopter Charter</h3>
              <p className="text-xs text-[#475569] leading-relaxed">Direct peak-to-peak transfer avoiding trekking trails. Popular for Everest and Langtang loops.</p>
              <p className="text-xs font-mono font-bold text-[#17212B] mt-auto">$1,200 / flight leg</p>
            </div>
            <div className="bg-[#F2F8FD] p-5 rounded-2xl border border-[#92C4EA]/35 flex flex-col gap-3">
              <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase">Option 02 / Standard</span>
              <h3 className="text-sm font-bold">Private 4x4 Jeep</h3>
              <p className="text-xs text-[#475569] leading-relaxed">Cross rugged valley passages to Lo Manthang or Pokhara in high-ground clearance jeeps.</p>
              <p className="text-xs font-mono font-bold text-[#17212B] mt-auto">$180 / day (with driver)</p>
            </div>
            <div className="bg-[#F2F8FD] p-5 rounded-2xl border border-[#92C4EA]/35 flex flex-col gap-3">
              <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase">Option 03 / Local</span>
              <h3 className="text-sm font-bold">Turboprop Mountain Flights</h3>
              <p className="text-xs text-[#475569] leading-relaxed">Scenic light flights connecting Kathmandu to Pokhara, Lukla, or Jomsom valley airstrips.</p>
              <p className="text-xs font-mono font-bold text-[#17212B] mt-auto">$150 / traveler</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* ── ROOM SELECTION MODAL OVERLAY ─────────────────────────────────── */}
      <AnimatePresence>
        {selectedStay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#F8FAFD] border border-[#92C4EA]/40 rounded-3xl p-6 shadow-xl relative text-left"
            >
              <button 
                onClick={() => setSelectedStay(null)}
                className="absolute top-4 right-4 text-xs font-mono text-[#64748B] hover:text-[#17212B]"
              >
                Close
              </button>

              <h3 className="text-lg font-bold text-[#17212B] mb-1">{selectedStay.name}</h3>
              <p className="text-xs text-[#475569] mb-4">{selectedStay.location}</p>

              <div className="flex flex-col gap-3">
                <span className="text-[9px] font-mono font-bold uppercase text-[#0552A2]">Select available rooms</span>
                {selectedStay.roomPreviews.map(room => (
                  <div key={room.name} className="bg-[#F2F8FD]/65 border border-[#92C4EA]/25 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold">{room.name}</h4>
                      <p className="text-[10px] text-[#475569] mt-0.5">{room.info}</p>
                    </div>
                    <div className="text-right flex flex-col gap-2 shrink-0 ml-4">
                      <span className="text-xs font-mono font-bold text-[#17212B]">${room.price}/night</span>
                      <button 
                        onClick={() => handleBook(selectedStay, room.name, room.price)}
                        className="bg-[#0552A2] text-white font-mono text-[9px] font-bold px-3 py-1.5 rounded-lg hover:bg-[#B08156] transition-colors cursor-pointer"
                      >
                        Book Suite
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {bookingSuccess && (
                <div className="absolute inset-0 bg-[#F8FAFD]/95 rounded-3xl flex flex-col items-center justify-center text-center p-6">
                  <span className="text-2xl mb-2">🎉</span>
                  <h4 className="text-sm font-bold text-[#17212B]">Room Booked Successfully!</h4>
                  <p className="text-xs text-[#475569] mt-1">Invoice pass and tickets generated in Bookings.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

