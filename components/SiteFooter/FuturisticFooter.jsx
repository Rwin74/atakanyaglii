"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { MetalButton } from "../ui/liquid-glass-button";

// A highly modern "Rolling 3D Flip" text effect component
const RollingText = ({ text }) => {
  return (
    <motion.span
      className="relative flex overflow-hidden cursor-pointer group"
      initial="initial"
      whileHover="hover"
    >
      <span className="flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={`top-${i}`}
            className="inline-block"
            variants={{
              initial: { y: 0 },
              hover: { y: "-100%" }
            }}
            transition={{
              duration: 0.5,
              ease: [0.19, 1, 0.22, 1], // Custom sleek easing
              delay: i * 0.03 // Staggered delay for each letter
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <span className="absolute left-0 flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={`bottom-${i}`}
            className="inline-block text-[var(--color-accent)]"
            variants={{
              initial: { y: "100%" },
              hover: { y: 0 }
            }}
            transition={{
              duration: 0.5,
              ease: [0.19, 1, 0.22, 1],
              delay: i * 0.03
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
};

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function FuturisticFooter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  const text = "ATAKAN";

  return (
    <footer 
      id="main-footer" 
      ref={containerRef}
      className="relative w-full h-[100svh] md:h-[80vh] md:min-h-[600px] flex flex-col items-center justify-center bg-[var(--color-bg)] overflow-hidden border-t-2 border-[var(--color-border)]"
      style={{ perspective: "2000px" }}
    >
      {/* Background Cyber Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-text) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-text) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      {/* The Vault Split Text Container */}
      <div className="relative w-full flex items-center justify-center z-10">
        
        {/* TOP HALF OF THE TEXT */}
        <motion.div
          className="absolute flex justify-center w-full"
          style={{ 
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
            color: "var(--color-text)",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 18vw, 20rem)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            zIndex: 20
          }}
          initial={{ y: 0 }}
          animate={{ y: isInView ? "-200px" : 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
        >
          {text}
        </motion.div>

        {/* BOTTOM HALF OF THE TEXT */}
        <motion.div
          className="absolute flex justify-center w-full"
          style={{ 
            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
            color: "var(--color-text)",
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 900,
            fontSize: "clamp(3.5rem, 18vw, 20rem)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            zIndex: 20
          }}
          initial={{ y: 0 }}
          animate={{ y: isInView ? "200px" : 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
        >
          {text}
        </motion.div>

        {/* GLOWING CENTER LINE (appears when split) */}
        <motion.div
          className="absolute left-0 right-0 h-[1px] bg-[var(--color-accent)] z-15"
          style={{ top: "50%", boxShadow: "0 0 20px 2px var(--color-accent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: isInView ? 1 : 0, opacity: isInView ? 0.5 : 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
        />

        {/* THE HIDDEN CONTENT IN THE VAULT */}
        <motion.div 
          className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-24 px-6 w-full max-w-5xl justify-center"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            scale: isInView ? 1 : 0.8,
            filter: isInView ? "blur(0px)" : "blur(10px)" 
          }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          {/* Keşfet */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="text-xs tracking-[0.3em] text-[var(--color-accent)] uppercase mb-2">/ Dizin</h3>
            <a href="#projects-section" className="text-xl md:text-2xl font-bold font-mono">
              <RollingText text="PROJELER" />
            </a>
            <a href="#contact" className="text-xl md:text-2xl font-bold font-mono">
              <RollingText text="İLETİŞİM" />
            </a>
          </div>

          {/* İletişim */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="text-xs tracking-[0.3em] text-[var(--color-accent)] uppercase mb-2">/ İletişim</h3>
            <a href="mailto:atakan7495@gmail.com" className="text-xl md:text-2xl font-bold font-mono">
              <RollingText text="atakan7495@gmail.com" />
            </a>
            <a href="https://wa.me/905447218974" target="_blank" rel="noreferrer" className="text-xl md:text-2xl font-bold font-mono">
              <RollingText text="WHATSAPP BAĞLANTISI" />
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="text-xs tracking-[0.3em] text-[var(--color-accent)] uppercase mb-2">/ Sosyal Medyalar</h3>
            <div className="flex gap-4">
              <MetalButton
                variant="instagram"
                onClick={() => window.open("https://instagram.com/atakannyagli", "_blank")}
                className="w-14 h-14 p-0 group"
                buttonClassName="w-[54px] h-[54px] px-0"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <InstagramIcon />
                </div>
              </MetalButton>
              <MetalButton
                variant="linkedin"
                onClick={() => window.open("https://www.linkedin.com/in/atakanyagli", "_blank")}
                className="w-14 h-14 p-0 group"
                buttonClassName="w-[54px] h-[54px] px-0"
              >
                <div className="absolute inset-0 flex items-center justify-center opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <LinkedinIcon />
                </div>
              </MetalButton>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Bottom Note */}
      <motion.div 
        className="absolute bottom-6 text-xs text-[var(--color-text-muted)] font-mono tracking-widest"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        SYS.REQ // {new Date().getFullYear()} © ATAKAN YAĞLI
      </motion.div>
    </footer>
  );
}
