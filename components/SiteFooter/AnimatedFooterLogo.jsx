"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sacramento } from "next/font/google";

const cursiveFont = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export function AnimatedFooterLogo({ text = "Atakan" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // Variants for the container to stagger the children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Variants for each letter
  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -45, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 80,
      },
    },
  };

  return (
    <motion.h1
      ref={ref}
      className={`f-logo ${cursiveFont.className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        display: "flex",
        perspective: "1000px",
        fontWeight: 400,
        letterSpacing: "0.01em",
        color: "var(--color-text)",
        lineHeight: 1.2,
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block", transformOrigin: "bottom center" }}
          whileHover={{
            y: -5,
            color: "var(--color-accent)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
}
