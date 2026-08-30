"use client";

import React from "react";
import { MetalButton } from "../ui/liquid-glass-button";
import { AnimatedFooterLogo } from "./AnimatedFooterLogo";

const Icon = ({ children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const InstagramIcon = () => (
  <Icon>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </Icon>
);

const TikTokIcon = () => (
  <Icon>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </Icon>
);

const YoutubeIcon = () => (
  <Icon>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </Icon>
);

const LinkedinIcon = () => (
  <Icon>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </Icon>
);

const GithubIcon = () => (
  <Icon>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </Icon>
);

const SiteFooter = () => {
  return (
    <footer id="main-footer" className="flex flex-col items-center text-center">
      <div className="w-full flex flex-col items-center pt-16 pb-12 border-b-2 border-[var(--color-border)]">
        <AnimatedFooterLogo text="Atakan" />
        <p className="text-[var(--color-text-muted)] text-base md:text-lg max-w-lg mx-auto mt-6 mb-12">
          Pratik sorunları çözmek için tasarlanmış yazılım, <br />
          yapay zeka sistemleri ve teknoloji odaklı ürünler.
        </p>

        <div className="flex flex-wrap justify-center gap-16 md:gap-24 mb-12">
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-xs tracking-[0.15em] font-medium text-[var(--color-text)] mb-2">KEŞFET</h3>
            <a href="#projects-section" className="text-sm hover:opacity-70 transition-opacity">Projeler</a>
            <a href="#contact" className="text-sm hover:opacity-70 transition-opacity">İletişim</a>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h3 className="text-xs tracking-[0.15em] font-medium text-[var(--color-text)] mb-2">İLETİŞİM</h3>
            <a href="mailto:atakan7495@gmail.com" className="text-sm hover:opacity-70 transition-opacity">
              atakan7495@gmail.com
            </a>
            <a href="https://wa.me/905447218974" target="_blank" rel="noreferrer" className="text-sm hover:opacity-70 transition-opacity">
              WhatsApp: +90 544 721 8974
            </a>
            <a href="tel:+905447218974" className="text-sm hover:opacity-70 transition-opacity">
              Telefon: +90 544 721 8974
            </a>
          </div>
        </div>

        <div className="flex gap-6 justify-center">
          <MetalButton
            variant="instagram"
            onClick={() => window.open("https://instagram.com/atakannyagli", "_blank")}
            aria-label="Instagram"
            className="w-12 h-12 p-0 group"
            buttonClassName="w-[46px] h-[46px] px-0"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
              <InstagramIcon />
            </div>
          </MetalButton>
          <MetalButton
            variant="linkedin"
            onClick={() => window.open("https://www.linkedin.com/in/atakanyagli", "_blank")}
            aria-label="LinkedIn"
            className="w-12 h-12 p-0 group"
            buttonClassName="w-[46px] h-[46px] px-0"
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
              <LinkedinIcon />
            </div>
          </MetalButton>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Atakan Yağlı. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
