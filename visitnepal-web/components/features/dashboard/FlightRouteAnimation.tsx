'use client';

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { RotateCcw } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  dist: number;
  angle: number;
}

interface FlightRouteAnimationProps {
  className?: string;
  variant?: 'banner' | 'light';
  destinationLabel?: string;
  onDestinationClick?: () => void;
}

export default function FlightRouteAnimation({
  className = '',
  variant = 'light',
  destinationLabel = 'Nepal',
  onDestinationClick,
}: FlightRouteAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [animKey, setAnimKey] = useState<number>(0);
  const [isPinHovered, setIsPinHovered] = useState<boolean>(false);
  const hoverRef = useRef<boolean>(false);

  // Exact cubic bezier segments with smooth, continuous curvature (no sharp kinks/edges)
  const segs = useMemo(() => [
    { p0: { x: 40, y: 290 }, p1: { x: 130, y: 360 }, p2: { x: 220, y: 400 }, p3: { x: 290, y: 400 } },
    { p0: { x: 290, y: 400 }, p1: { x: 335, y: 400 }, p2: { x: 355, y: 360 }, p3: { x: 355, y: 315 } },
    { p0: { x: 355, y: 315 }, p1: { x: 355, y: 265 }, p2: { x: 305, y: 265 }, p3: { x: 305, y: 315 } },
    { p0: { x: 305, y: 315 }, p1: { x: 305, y: 370 }, p2: { x: 350, y: 400 }, p3: { x: 410, y: 370 } },
    // Smooth continuous curve into heart left stem (zero sharp edge/kink)
    { p0: { x: 410, y: 370 }, p1: { x: 450, y: 340 }, p2: { x: 497, y: 279 }, p3: { x: 485, y: 225 } },
    { p0: { x: 485, y: 225 }, p1: { x: 473, y: 171 }, p2: { x: 395, y: 95 }, p3: { x: 415, y: 45 } },
    { p0: { x: 415, y: 45 }, p1: { x: 430, y: 15 }, p2: { x: 480, y: 20 }, p3: { x: 510, y: 80 } },
    { p0: { x: 510, y: 80 }, p1: { x: 540, y: 20 }, p2: { x: 590, y: 15 }, p3: { x: 605, y: 45 } },
    // Smooth continuous curve out of heart right stem (zero sharp edge/kink)
    { p0: { x: 605, y: 45 }, p1: { x: 625, y: 95 }, p2: { x: 523, y: 171 }, p3: { x: 535, y: 225 } },
    { p0: { x: 535, y: 225 }, p1: { x: 547, y: 279 }, p2: { x: 505, y: 340 }, p3: { x: 545, y: 370 } },
    { p0: { x: 545, y: 370 }, p1: { x: 605, y: 400 }, p2: { x: 705, y: 400 }, p3: { x: 775, y: 370 } },
    { p0: { x: 775, y: 370 }, p1: { x: 825, y: 345 }, p2: { x: 860, y: 315 }, p3: { x: 885, y: 290 } }
  ], []);

  // Pre-sample high-resolution points table with cumulative arc length
  const { points, totalLength } = useMemo(() => {
    function cubic(p0: number, p1: number, p2: number, p3: number, t: number) {
      const mt = 1 - t;
      return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
    }

    const pts: Point[] = [];
    let prev = { x: segs[0].p0.x, y: segs[0].p0.y };
    pts.push({ x: prev.x, y: prev.y, dist: 0, angle: 0 });
    let total = 0;

    for (const seg of segs) {
      const steps = 150;
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const x = cubic(seg.p0.x, seg.p1.x, seg.p2.x, seg.p3.x, t);
        const y = cubic(seg.p0.y, seg.p1.y, seg.p2.y, seg.p3.y, t);
        const dx = x - prev.x;
        const dy = y - prev.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        total += d;
        const angle = Math.atan2(dy, dx);
        pts.push({ x, y, dist: total, angle });
        prev = { x, y };
      }
    }

    return { points: pts, totalLength: total };
  }, [segs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI setup for razor-sharp clarity
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 2 : 2;
    const baseWidth = 960;
    const baseHeight = 540;
    canvas.width = baseWidth * dpr;
    canvas.height = baseHeight * dpr;

    let startTime: number | null = null;
    const flightDuration = 6000; // 6.0s active flight
    const restDuration = 2400;   // 2.4s rest at pin with live jumping before smooth cycle
    const totalCycle = flightDuration + restDuration;

    const smoothEase = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Realistic airliner path (length ~37px, wingspan ~24px, centered at origin)
    const airplanePath = new Path2D(
      'M 18 0 ' +
      'C 15 -1.5, 10 -2.5, 4 -1.5 ' +
      'L -3 -12 ' +
      'L -6 -11.5 ' +
      'L -2 -1 ' +
      'L -11 -0.5 ' +
      'L -16 -6 ' +
      'L -19 -5.5 ' +
      'L -17 0 ' +
      'L -19 5.5 ' +
      'L -16 6 ' +
      'L -11 0.5 ' +
      'L -2 1 ' +
      'L -6 11.5 ' +
      'L -3 12 ' +
      'L 4 1.5 ' +
      'C 10 2.5, 15 1.5, 18 0 Z'
    );

    // Color theme configuration
    const isBanner = variant === 'banner';
    const trailColor = isBanner ? 'rgba(255, 255, 255, 0.92)' : '#3B0643';
    const planeColor = isBanner ? '#FFFFFF' : '#3B0643';

    // Exact Red Location Pin Colors from User Reference Image
    const redPinMain = '#F60002';   // Bright Vibrant Red
    const redPinShadow = '#BA0000'; // Deep Crimson Shadow

    const render = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % totalCycle;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Clear frame: transparent for banner, pure white for light
      ctx.clearRect(0, 0, baseWidth, baseHeight);
      if (!isBanner) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, baseWidth, baseHeight);
      }

      let currentDist = totalLength;
      let isResting = false;
      let rawProgress = 1;

      if (elapsed < flightDuration) {
        rawProgress = elapsed / flightDuration;
        const progress = smoothEase(rawProgress);
        currentDist = progress * totalLength;
      } else {
        isResting = true;
        currentDist = totalLength;
      }

      // Find target index in precomputed arc length table
      const targetIndex = Math.min(
        points.length - 1,
        Math.max(0, Math.floor((currentDist / totalLength) * (points.length - 1)))
      );

      // 1. PROGRESSIVE DASHED ROUTE (Stops strictly at targetIndex!)
      if (targetIndex > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([7, 7]);
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = 2.4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i <= targetIndex; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // 2. AIRPLANE (Prominent, boldly visible, anchored strictly to tip of route)
      const activePt = points[targetIndex];
      ctx.save();
      ctx.translate(activePt.x, activePt.y);
      ctx.rotate(activePt.angle);
      ctx.scale(1.85, 1.85);

      // Airplane body
      ctx.fillStyle = planeColor;
      ctx.fill(airplanePath);

      // High-contrast subtle outline for crisp clarity
      ctx.strokeStyle = isBanner ? 'rgba(5, 82, 162, 0.45)' : 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 0.6;
      ctx.stroke(airplanePath);
      ctx.restore();

      // 3. LIVE JUMPING RED DESTINATION PIN & CONCENTRIC RADAR RIPPLES
      const endPt = points[points.length - 1];
      const pinTrigger = isResting || rawProgress > 0.94;

      if (pinTrigger) {
        const isHovered = hoverRef.current;

        // Arrival pop-in scaling (overshoot spring during flight entry)
        let popScale = 1;
        if (!isResting) {
          const popProgress = Math.min(1, (rawProgress - 0.94) / 0.06);
          const s = 1.70158;
          const p = popProgress - 1;
          popScale = p * p * ((s + 1) * p + s) + 1;
        }

        // Live Jumping Physics (continuous rhythmic bounce + hover interaction)
        const jumpCycle = 1100; // 1.1s per jump
        const jumpTime = (timestamp % jumpCycle) / jumpCycle;
        
        // Parabolic vertical jump trajectory with squash and stretch
        let yOffset = 0;
        let squashX = 1;
        let squashY = 1;
        const ripplePhase = (timestamp % 1400) / 1400; // concentric ring expansion phase

        if (jumpTime < 0.75) {
          // Aerial phase: smooth gravity arc
          const tArc = jumpTime / 0.75;
          const jumpHeight = isHovered ? 18 : 12; // Jumps higher on interactive hover
          yOffset = -Math.sin(tArc * Math.PI) * jumpHeight;
          squashX = 0.94;
          squashY = 1.06;
        } else {
          // Touchdown phase: subtle squash & elastic return
          const tLand = (jumpTime - 0.75) / 0.25;
          const squashAmount = Math.sin(tLand * Math.PI) * 0.14;
          squashX = 1 + squashAmount;
          squashY = 1 - squashAmount;
          yOffset = 0;
        }

        const pinOriginX = endPt.x;
        const pinOriginY = endPt.y;

        // A. CONCENTRIC GROUND RADAR RIPPLES (Expanding elliptical rings)
        ctx.save();
        ctx.translate(pinOriginX, pinOriginY + 2);

        // Outer Ripple Ring
        const r1 = 12 + ripplePhase * 10;
        const alpha1 = Math.max(0, (1 - ripplePhase) * 0.75);
        ctx.beginPath();
        ctx.ellipse(0, 0, r1, r1 * 0.32, 0, 0, Math.PI * 2);
        ctx.strokeStyle = redPinMain;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = alpha1;
        ctx.stroke();

        // Inner Ripple Ring
        const ripplePhase2 = (ripplePhase + 0.45) % 1;
        const r2 = 7 + ripplePhase2 * 8;
        const alpha2 = Math.max(0, (1 - ripplePhase2) * 0.85);
        ctx.beginPath();
        ctx.ellipse(0, 0, r2, r2 * 0.32, 0, 0, Math.PI * 2);
        ctx.strokeStyle = redPinMain;
        ctx.lineWidth = 1.6;
        ctx.globalAlpha = alpha2;
        ctx.stroke();

        // Ground touchdown solid center dot
        ctx.beginPath();
        ctx.ellipse(0, 0, 3.5, 1.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = redPinShadow;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.restore();

        // B. LIVE JUMPING RED PIN (Matching user reference image exactly)
        ctx.save();
        ctx.translate(pinOriginX, pinOriginY + yOffset);
        const finalScale = popScale * (isHovered ? 1.15 : 1.0);
        ctx.scale(finalScale * squashX, finalScale * squashY);

        // 1. Bright Red Base Pin Teardrop Shape
        ctx.beginPath();
        ctx.moveTo(0, 0); // Bottom Tip
        ctx.bezierCurveTo(-7, -4, -13, -13, -13, -20);
        ctx.arc(0, -20, 13, Math.PI, 0, false);
        ctx.bezierCurveTo(13, -13, 7, -4, 0, 0);
        ctx.closePath();
        ctx.fillStyle = redPinMain;
        ctx.fill();

        // 2. Deep Crimson Faceted Shadow (Lower Right Half matching reference image)
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -20);
        ctx.arc(0, -20, 13, -Math.PI / 2, Math.PI * 0.28, false);
        ctx.bezierCurveTo(11, -12, 6, -3, 0, 0);
        ctx.closePath();
        ctx.fillStyle = redPinShadow;
        ctx.fill();
        ctx.restore();

        // 3. Center White Circular Cutout Hole
        ctx.beginPath();
        ctx.arc(0, -20, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = isBanner ? '#0552A2' : '#FFFFFF';
        ctx.fill();
        ctx.restore();

        // C. INTERACTIVE DESTINATION TOOLTIP BADGE (Pops up above jumping pin)
        if (destinationLabel) {
          ctx.save();
          const badgeY = pinOriginY + yOffset - 36 * (isHovered ? 1.15 : 1.0);

          // Subtle bounce and glow on hover
          ctx.font = 'bold 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
          const text = destinationLabel.toUpperCase();
          const textMetrics = ctx.measureText(text);
          const badgeW = textMetrics.width + 18;
          const badgeH = 20;

          // Tooltip container pill
          ctx.fillStyle = isHovered ? redPinMain : (isBanner ? 'rgba(0, 0, 0, 0.45)' : redPinShadow);
          ctx.beginPath();
          ctx.roundRect(pinOriginX - badgeW / 2, badgeY - badgeH / 2, badgeW, badgeH, 10);
          ctx.fill();

          // Tooltip border on hover
          if (isHovered) {
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }

          // Tooltip text
          ctx.fillStyle = '#FFFFFF';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(text, pinOriginX, badgeY);
          ctx.restore();
        }
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [points, totalLength, animKey, variant, destinationLabel]);

  // Mouse interactivity handlers
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 960;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 540;

    // Check if mouse is hovering within destination pin target zone (885, 290)
    const distToPin = Math.hypot(mouseX - 885, mouseY - 275);
    const hovered = distToPin < 48;

    if (hovered !== hoverRef.current) {
      hoverRef.current = hovered;
      setIsPinHovered(hovered);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverRef.current) {
      hoverRef.current = false;
      setIsPinHovered(false);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (hoverRef.current && onDestinationClick) {
      onDestinationClick();
    }
  }, [onDestinationClick]);

  const handleReplay = () => {
    setAnimKey(prev => prev + 1);
  };

  return (
    <div
      className={`w-full aspect-[16/9] relative select-none flex items-center justify-center ${
        variant === 'banner' ? 'bg-transparent' : 'bg-white'
      } ${className}`}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%', cursor: isPinHovered ? 'pointer' : 'default' }}
      />

      {/* Replay control */}
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity">
        <button
          onClick={handleReplay}
          className={`p-1.5 rounded-full transition-colors cursor-pointer ${
            variant === 'banner'
              ? 'bg-white/15 hover:bg-white/25 text-white'
              : 'bg-zinc-100 hover:bg-zinc-200 text-[#3B0643]'
          }`}
          title="Replay animation"
          aria-label="Replay animation"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
