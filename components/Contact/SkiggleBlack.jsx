import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SkiggleBlack = () => {
  const pathRef = useRef(null);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
  });

  // For the contact section (near the bottom of the page), 
  // we want the animation to trigger when the user scrolls near the end.
  const pathLength = useTransform(
    scrollYProgress,
    [0.75, 0.98],
    [0, 1]
  );

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 mix-blend-multiply opacity-50"
      viewBox="0 0 1600 1300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <motion.path
        d="M-100 100 C 300 -100, 500 600, 800 500 C 1100 400, 1300 -100, 1500 300 C 1700 700, 1400 1200, 1800 1500"
        style={{
          pathLength: pathLength,
          strokeWidth: 60,
          strokeLinecap: "round",
        }}
        stroke="#020817" // Koyu siyah/lacivert
      />
    </svg>
  );
};

export default SkiggleBlack;
