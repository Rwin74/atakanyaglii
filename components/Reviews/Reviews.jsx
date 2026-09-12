"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Star, ShoppingBag, Globe, Smartphone, Code } from "lucide-react";
import { SectionSkiggle } from "@/components/ui/section-skiggle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reviews = [
  {
    icon: <Globe className="size-4 text-[var(--color-accent)]" />,
    title: "Ahmet Yılmaz - Dijital Ajans",
    description: "Atakan'la çalışmak projemize büyük hız kattı. İstediğimiz karmaşık kurumsal yapıyı çok kısa sürede, kusursuz bir mimariyle teslim etti. Kesinlikle tavsiye ederim.",
    date: "KURUMSAL WEB TASARIMI",
    iconClassName: "text-[var(--color-accent)]",
    titleClassName: "text-white",
  },
  {
    icon: <ShoppingBag className="size-4 text-[var(--color-accent)]" />,
    title: "Elif Demir - E-Ticaret Girişimcisi",
    description: "Sitemizin altyapısı sürekli çöküyordu. Atakan özel bir e-ticaret altyapısı yazarak bizi büyük bir dertten kurtardı. Satışlarımızda performans kaynaklı %40 artış gördük.",
    date: "ÖZEL E-TİCARET ALTYAPISI",
    iconClassName: "text-[var(--color-accent)]",
    titleClassName: "text-white",
  },
  {
    icon: <Smartphone className="size-4 text-[var(--color-accent)]" />,
    title: "Caner Tekin - StartUp Kurucusu",
    description: "Mobil uygulamamızın arayüzü ve hızı harika oldu. Fikrimizi hayata geçirirken sadece kod yazmakla kalmadı, UX tarafında da mükemmel yönlendirmeler yaptı.",
    date: "MOBİL UYGULAMA",
    iconClassName: "text-[var(--color-accent)]",
    titleClassName: "text-white",
  },
  {
    icon: <Code className="size-4 text-[var(--color-accent)]" />,
    title: "Selin Kaya - Teknoloji Direktörü",
    description: "Otomasyon sistemimizi sıfırdan tasarladı. Operasyonel yükümüz inanılmaz azaldı. Hem iletişimi çok güçlü hem de teknik bilgisi gerçekten üst düzey.",
    date: "ÖZEL YAZILIM GELİŞTİRME",
    iconClassName: "text-[var(--color-accent)]",
    titleClassName: "text-white",
  },
  {
    icon: <Star className="size-4 text-[var(--color-accent)]" />,
    title: "Murat Çelik - Pazarlama Uzmanı",
    description: "Sitemizin kod yapısını SEO uyumlu hale getirdikten sonra organik trafiklerimiz resmen uçuşa geçti. Google'daki sıralama artışımız inanılmaz.",
    date: "TEKNİK SEO",
    iconClassName: "text-[var(--color-accent)]",
    titleClassName: "text-white",
  },
];

export default function Reviews() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reviews-section" ref={sectionRef} className="w-full relative z-10 pt-20 pb-40 flex flex-col items-center justify-center overflow-hidden">
      <SectionSkiggle type="reviews" />
      <div className="w-full text-center z-20 mb-10 px-4">
        <span className="text-xs font-semibold tracking-[0.2em] text-[var(--color-accent)] opacity-80 uppercase">REFERANSLAR</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2" style={{ letterSpacing: "-0.04em" }}>Müşteri Yorumları</h2>
      </div>

      <div className="w-full max-w-5xl flex items-center justify-center md:-translate-x-12">
        <DisplayCards cards={reviews} />
      </div>
    </section>
  );
}
