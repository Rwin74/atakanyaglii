"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedButton } from "../ui/animated-button";
import { SectionSkiggle } from "../ui/section-skiggle";

// Real contact info — kept in sync with what's already in `SiteFooter`.
// If any of these change, update them in both places.
const EMAIL = "atakan7495@gmail.com";
const WHATSAPP_URL = "https://wa.me/905447218974";

const ArrowUpRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Contact = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const emailRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const eyebrowChars = eyebrowRef.current?.querySelectorAll(".ct-char") ?? [];
      const headlineChars = headlineRef.current?.querySelectorAll(".ct-char") ?? [];

      // Mirror the slogan/Subscribe character-reveal so the contact section
      // feels like part of the same family of scroll moments.
      gsap.from(eyebrowChars, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(headlineChars, {
        opacity: 0,
        y: 40,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.02,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from([emailRef.current, ctaRef.current], {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitChars = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="ct-char" style={{ display: "inline-block" }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full h-[100vh] min-h-[600px] flex flex-col justify-center bg-[#0016ec] text-white px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <SectionSkiggle type="contact" color="#050B14" />
      <div className="relative z-10 flex flex-col items-start w-full max-w-7xl mx-auto">
        <div id="ct-eyebrow" ref={eyebrowRef}>
          {splitChars("yeni projenize hazır mısınız?")}
        </div>

        <h2 id="ct-headline" ref={headlineRef}>
          {splitChars("konuşalım.")}
        </h2>

        <a
          id="ct-email"
          href={`mailto:${EMAIL}`}
          ref={emailRef}
          aria-label={`Email ${EMAIL}`}
        >
          {EMAIL}
        </a>

        <div id="ct-actions" ref={ctaRef} className="flex flex-wrap justify-start gap-4 w-full">
          <AnimatedButton
            onClick={() => window.location.href = `mailto:${EMAIL}`}
            className="h-14"
          >
            <div className="flex items-center gap-2 text-sm tracking-widest font-semibold">
              <span>MERHABA DE</span>
              <ArrowUpRight />
            </div>
          </AnimatedButton>
          <AnimatedButton
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
            className="h-14"
          >
            <div className="flex items-center gap-2 text-sm tracking-widest font-semibold">
              <span>WHATSAPP</span>
              <ArrowUpRight />
            </div>
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};

export default Contact;
