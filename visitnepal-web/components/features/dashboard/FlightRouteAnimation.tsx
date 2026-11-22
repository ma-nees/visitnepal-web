'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FlightRouteAnimation({ className = '' }: { className?: string }) {
  // Flight path matching the user's reference image:
  // Starts at airplane on left, swoops down, loops around,
  // shoots up to form a heart loop, then swoops down to the right to destination pin in Nepal
  const pathD =
    'M 38,78 C 52,86 70,92 86,92 C 106,92 118,80 118,65 C 118,48 98,48 98,65 C 98,82 118,90 142,82 C 158,76 162,45 168,28 C 174,12 192,8 202,24 C 208,34 212,42 215,48 C 218,42 222,34 228,24 C 238,8 256,12 262,28 C 268,45 258,72 238,84 C 218,94 250,96 280,92 C 305,88 328,84 344,80';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 420 115"
        className="w-full max-w-[340px] sm:max-w-[400px] h-auto overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="flightTrailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#92C4EA" stopOpacity="0.8" />
            <stop offset="65%" stopColor="#FDB716" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Ambient background glow path */}
        <path
          d={pathD}
          fill="none"
          stroke="rgba(253, 183, 22, 0.15)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Animated Dashed Trail with moving dashoffset */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#flightTrailGrad)"
          strokeWidth="2.2"
          strokeDasharray="5 5"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -30] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
        />

        {/* Airplane on the Left */}
        <motion.g
          transform="translate(18, 64)"
          animate={{
            y: [0, -3, 0],
            x: [0, 1.5, 0],
            rotate: [0, 2, 0],
          }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        >
          {/* Airplane Silhouette matching the reference image */}
          <g transform="rotate(38 12 12)">
            <path
              d="M12 2C11.5 2 11 2.5 11 3.5V8.5L3.5 13V14.5L11 12.5V17.5L8.5 19.5V21L12 20L15.5 21V19.5L13 17.5V12.5L20.5 14.5V13L13 8.5V3.5C13 2.5 12.5 2 12 2Z"
              fill="#FFFFFF"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
            />
            {/* Jet propulsion spark */}
            <circle cx="12" cy="20.5" r="1.5" fill="#FDB716" opacity="0.9" />
          </g>
        </motion.g>

        {/* Destination Pin Marker at the End on the Right */}
        <g transform="translate(344, 80)">
          {/* Pulsing ground radar rings */}
          <motion.circle
            cx="0"
            cy="0"
            r="3"
            fill="none"
            stroke="#EC1F27"
            strokeWidth="1.5"
            animate={{ r: [3, 10], opacity: [0.9, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeOut' }}
          />
          <motion.circle
            cx="0"
            cy="0"
            r="3"
            fill="none"
            stroke="#FDB716"
            strokeWidth="1"
            animate={{ r: [3, 15], opacity: [0.6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, delay: 0.5, ease: 'easeOut' }}
          />

          {/* Ground Contact Dot */}
          <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />

          {/* Pin Icon Hovering Above */}
          <motion.g
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            {/* Pin body */}
            <path
              d="M 0,-3 C -4.5,-3 -8,-6.5 -8,-11 C -8,-16.5 0,-24 0,-24 C 0,-24 8,-16.5 8,-11 C 8,-6.5 4.5,-3 0,-3 Z"
              fill="#EC1F27"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
            />
            {/* Inner Pin Dot */}
            <circle cx="0" cy="-11" r="2.8" fill="#FFFFFF" />

            {/* Destination Nepal Badge */}
            <g transform="translate(13, -13)">
              <rect
                x="-2"
                y="-10"
                width="66"
                height="20"
                rx="10"
                fill="#0B2240"
                stroke="#FDB716"
                strokeWidth="1.2"
                opacity="0.95"
              />
              <text
                x="31"
                y="3.5"
                textAnchor="middle"
                fill="#FDB716"
                fontSize="9"
                fontWeight="bold"
                fontFamily="monospace"
                letterSpacing="0.05em"
              >
                NEPAL 🇳🇵
              </text>
            </g>
          </motion.g>
        </g>
      </svg>

      {/* Flight Subtitle Telemetry */}
      <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-white/85 mt-0.5 tracking-wider">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>EXPEDITION ROUTE TO NEPAL</span>
      </div>
    </div>
  );
}
