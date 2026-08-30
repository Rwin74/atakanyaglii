"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    
    document.body.style.overflow = "hidden";

    // Get exact path length for perfect stroke animation
    const length = pathRef.current.getTotalLength();
    pathRef.current.style.strokeDasharray = length;
    pathRef.current.style.strokeDashoffset = length;

    // Animate the stroke drawing in and out
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
    }).to(pathRef.current, {
      strokeDashoffset: -length,
      duration: 1.5,
      ease: "power2.inOut",
    });

    // Remove preloader after some time or window load
    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          setLoading(false);
          document.body.style.overflow = "";
        }
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[999999] bg-[#000] flex items-center justify-center"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-16 h-16 stroke-white fill-none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          ref={pathRef}
          d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"
        />
      </svg>
    </div>
  );
};

export default Preloader;
