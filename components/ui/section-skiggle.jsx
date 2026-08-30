"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function SectionSkiggle({ 
  color = "#4A83FF", 
  type = "workareas", 
  className = ""
}) {
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
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  const { width, height } = dimensions;

  if (width === 0 || height === 0) {
    return <div ref={containerRef} className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`} />;
  }

  let pathData = "";
  
  // Use exact pixels to prevent stroke-dasharray dashing bugs and stroke-width distortion!
  if (type === "workareas") {
    // Starts top-leftish to catch the hero Skiggle. Hero ends roughly left-center.
    // Ends bottom-right (85% of width).
    pathData = `M ${width * 0.2} 0 C ${width * 0.2} ${height * 0.4}, ${width * 0.85} ${height * 0.6}, ${width * 0.85} ${height}`;
  } else if (type === "reviews") {
    // Starts exactly where WorkAreas ended (85% of width)
    // Ends bottom-left (15% of width)
    pathData = `M ${width * 0.85} 0 C ${width * 0.85} ${height * 0.4}, ${width * 0.15} ${height * 0.6}, ${width * 0.15} ${height}`;
  } else if (type === "horizontal") {
    // Starts exactly where Reviews ended (15% of width)
    // Sweeps horizontally to follow the scrolling text, exits at bottom right (85%)
    pathData = `M ${width * 0.15} 0 C ${width * 0.15} ${height * 0.5}, ${width * 0.85} ${height * 0.5}, ${width * 0.85} ${height}`;
  } else if (type === "contact") {
    // Starts exactly where Horizontal ended (85% of width)
    // Drops down to the bottom center
    pathData = `M ${width * 0.85} 0 C ${width * 0.85} ${height * 0.4}, ${width * 0.5} ${height * 0.6}, ${width * 0.5} ${height}`;
  } else {
    pathData = `M ${width * 0.5} 0 L ${width * 0.5} ${height}`;
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible ${className}`}>
      <svg
        className="w-full h-full opacity-100 overflow-visible"
        style={{ width: '100%', height: '100%' }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          key={pathData}
          d={pathData}
          style={{
            pathLength: pathLength,
            strokeWidth: 40,
            strokeLinecap: "round",
          }}
          stroke={color}
        />
      </svg>
    </div>
  );
}
