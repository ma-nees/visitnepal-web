'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTravelStore } from '@/store/useTravelStore';

interface AdminSectionProps {
  activeId: string;
}

export default function AdminSection({ activeId }: AdminSectionProps) {
  const { revenueData, visitorHeatmap, aiInsights } = useTravelStore();

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

  return (
    <motion.div 
      key={activeId}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full text-left"
    >
      {activeId === 'database' && (
        <div className="flex flex-col gap-6 max-w-[1440px] w-full mx-auto py-4">
          <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#0552A2] uppercase">
              Operations Control
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif tracking-tight text-[#17212B]">Database & Analytics</h2>
            <p className="text-xs text-[#475569]">Track high-altitude tourism metrics, guide densities, and monthly ecosystem revenue yields.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Chart */}
            <motion.div 
              variants={itemVariants} 
              className="bg-[var(--card-bg)] border border-[#92C4EA]/35 p-5 rounded-2xl flex flex-col gap-4 shadow-sm"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] border-b border-[#92C4EA]/20 pb-2">
                Monthly Booking Yield (USD)
              </h3>

              {/* Simple Custom Vector Bar Graph */}
              <div className="h-44 flex items-end gap-5 pt-6 font-mono text-[9px]">
                {revenueData.map(d => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[#475569] text-[8px]">${d.revenue / 1000}k</span>
                    <div 
                      style={{ height: `${(d.revenue / 180000) * 100}%` }}
                      className="w-full rounded-t-lg bg-[#0552A2]/80 hover:bg-[#0552A2] transition-all"
                    />
                    <span className="text-zinc-550 font-bold">{d.month}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Density Concentration Table */}
            <motion.div 
              variants={itemVariants}
              className="bg-[var(--card-bg)] border border-[#92C4EA]/35 p-5 rounded-2xl flex flex-col gap-4 shadow-sm"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748B] border-b border-[#92C4EA]/20 pb-2">
                Traveler Density Index
              </h3>

              <div className="flex flex-col gap-3 font-mono text-[10px] text-left">
                {visitorHeatmap.map(spot => (
                  <div key={spot.name} className="flex justify-between items-center py-1 border-b border-[#92C4EA]/15">
                    <span className="text-[#475569]">{spot.name}</span>
                    <div className="flex items-center gap-2">
                      {/* Density meter */}
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                        <div 
                          style={{ width: `${spot.intensity * 100}%` }}
                          className="h-full bg-[#0552A2]"
                        />
                      </div>
                      <span className="font-bold text-[#17212B]">{(spot.intensity * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* AI insights list */}
          <motion.div 
            variants={itemVariants}
            className="bg-white border border-slate-200/90 p-5 rounded-2xl flex flex-col gap-3 shadow-xs"
          >
            <span className="text-[9px] font-mono font-bold text-[#0552A2] uppercase">Cognitive AI Highlights</span>
            <ul className="flex flex-col gap-2 list-disc list-inside text-xs text-[#475569] leading-relaxed">
              {aiInsights.map((insight, idx) => (
                <li key={idx} className="marker:text-[#0552A2]">{insight}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

