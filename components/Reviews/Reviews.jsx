"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Star, Building, ShoppingBag, Globe, Smartphone, Code } from "lucide-react";
import { SectionSkiggle } from "@/components/ui/section-skiggle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reviews = [
  {
    icon: <Globe className="size-4 text-white" />,
    title: "Ahmet YÄ±lmaz - Dijital Ajans",
    description: "Atakan'la Ã§alÄ±ÅŸmak projemize bÃ¼yÃ¼k hÄ±z kattÄ±. Ä°stediÄŸimiz karmaÅŸÄ±k kurumsal yapÄ±yÄ± Ã§ok kÄ±sa sÃ¼rede, kusursuz bir mimariyle teslim etti. Kesinlikle tavsiye ederim.",
    date: "KURUMSAL WEB TASARIMI",
    iconClassName: "text-white",
    titleClassName: "text-white",
  },
  {
    icon: <ShoppingBag className="size-4 text-white" />,
    title: "Elif Demir - E-Ticaret GiriÅŸimcisi",
    description: "Sitemizin altyapÄ±sÄ± sÃ¼rekli Ã§Ã¶kÃ¼yordu. Atakan Ã¶zel bir e-ticaret altyapÄ±sÄ± yazarak bizi bÃ¼yÃ¼k bir dertten kurtardÄ±. SatÄ±ÅŸlarÄ±mÄ±zda performans kaynaklÄ± %40 artÄ±ÅŸ gÃ¶rdÃ¼k.",
    date: "Ã–ZEL E-TÄ°CARET ALTYAPISI",
    iconClassName: "text-white",
    titleClassName: "text-white",
  },
  {
    icon: <Smartphone className="size-4 text-white" />,
    title: "Caner Tekin - StartUp Kurucusu",
    description: "Mobil uygulamamÄ±zÄ±n arayÃ¼zÃ¼ ve hÄ±zÄ± harika oldu. Fikrimizi hayata geÃ§irirken sadece kod yazmakla kalmadÄ±, UX tarafÄ±nda da mÃ¼kemmel yÃ¶nlendirmeler yaptÄ±.",
    date: "MOBÄ°L UYGULAMA",
    iconClassName: "text-white",
    titleClassName: "text-white",
  },
  {
    icon: <Code className="size-4 text-white" />,
    title: "Selin Kaya - Teknoloji DirektÃ¶rÃ¼",
    description: "Otomasyon sistemimizi sÄ±fÄ±rdan tasarladÄ±. Operasyonel yÃ¼kÃ¼mÃ¼z inanÄ±lmaz azaldÄ±. Hem iletiÅŸimi Ã§ok gÃ¼Ã§lÃ¼ hem de teknik bilgisi gerÃ§ekten Ã¼st dÃ¼zey.",
    date: "Ã–ZEL YAZILIM GELÄ°ÅTÄ°RME",
    iconClassName: "text-white",
    titleClassName: "text-white",
  },
  {
    icon: <Star className="size-4 text-white" />,
    title: "Murat Ã‡elik - Pazarlama UzmanÄ±",
    description: "Sitemizin kod yapÄ±sÄ±nÄ± SEO uyumlu hale getirdikten sonra organik trafiklerimiz resmen uÃ§uÅŸa geÃ§ti. Google'daki sÄ±ralama artÄ±ÅŸÄ±mÄ±z inanÄ±lmaz.",
    date: "TEKNÄ°K SEO",
    iconClassName: "text-white",
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
        { opacity: 0, y: 100 },
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
    <section id="reviews-section" ref={sectionRef} className="w-full relative z-10 pt-20 pb-40 flex flex-col items-center justify-center">
      <SectionSkiggle type="reviews" />
      <div className="w-full text-center z-20 mb-10 px-4">
        <span className="text-xs font-semibold tracking-[0.2em] opacity-60">REFERANSLAR</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2" style={{ letterSpacing: "-0.04em" }}>Müşteri Yorumları</h2>
      </div>

      <div className="w-full max-w-5xl flex items-center justify-center md:-translate-x-20">
        <DisplayCards cards={reviews} />
      </div>
    </section>
  );
}


