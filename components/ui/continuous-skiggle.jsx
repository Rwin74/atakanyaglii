"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ContinuousSkiggle() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    
    // Also use a ResizeObserver for content changes
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      observer.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const { width, height } = dimensions;

  // We only draw if we have measured the height
  if (height === 0) {
    return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
  }

  // Calculate dynamic path points based on real pixel height
  // Starts top-leftish (connecting from Hero)
  const startX = width * 0.2;
  const startY = 0;
  
  // Snakes through Work Areas
  const cp1X = width * 0.8;
  const cp1Y = height * 0.2;
  const p1X = width * 0.5;
  const p1Y = height * 0.4;
  
  // Snakes through Reviews
  const cp2X = width * 0.1;
  const cp2Y = height * 0.6;
  const p2X = width * 0.7;
  const p2Y = height * 0.75;
  
  // Horizontal sweep in Contact section (bottom 15% of height roughly)
  const cp3X = -width * 0.2;
  const cp3Y = height * 0.9;
  const endX = width * 1.2;
  const endY = height * 0.9;

  const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${p1X} ${p1Y} C ${cp2X} ${p1Y + 200}, ${cp3X} ${cp3Y - 200}, ${p2X} ${p2Y} C ${width * 1.1} ${height * 0.8}, ${cp3X} ${endY}, ${endX} ${endY}`;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
      <svg
        className="w-full h-full opacity-100 overflow-visible"
        style={{ width: '100%', height: '100%' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="continuousSkiggleGrad" x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A83FF" />
            <stop offset="75%" stopColor="#4A83FF" />
            {/* Transition to black in the contact section */}
            <stop offset="85%" stopColor="#050B14" />
            <stop offset="100%" stopColor="#050B14" />
          </linearGradient>
        </defs>

        <motion.path
          d={d}
          style={{
            pathLength: pathLength,
            strokeWidth: 50,
            strokeLinecap: "round",
          }}
          stroke="url(#continuousSkiggleGrad)"
        />
      </svg>
    </div>
  );
}
