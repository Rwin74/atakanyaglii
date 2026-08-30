"use client";

import { Code, Smartphone, Cpu, TrendingUp, MonitorPlay } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { SectionSkiggle } from "@/components/ui/section-skiggle";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const workAreasData = [
  {
    id: 1,
    title: "Özel Web Yazılım",
    content: "İşletmelere özel, ölçeklenebilir ve güvenli kurumsal web uygulamaları ve e-ticaret altyapıları.",
    category: "Web",
    icon: Code,
    relatedIds: [2, 4],
    status: "core",
    capacity: 90,
  },
  {
    id: 2,
    title: "Mobil Uygulama",
    content: "iOS ve Android platformları için performanslı ve kullanıcı dostu hibrit mobil uygulamalar.",
    category: "Mobile",
    icon: Smartphone,
    relatedIds: [1, 5],
    status: "active",
    capacity: 75,
  },
  {
    id: 3,
    title: "Yapay Zeka (AI)",
    content: "Süreçleri otomatize eden akıllı asistanlar, chatbotlar ve veri analizi sistemleri entegrasyonu.",
    category: "AI",
    icon: Cpu,
    relatedIds: [1],
    status: "exploring",
    capacity: 100,
  },
  {
    id: 4,
    title: "Teknik SEO",
    content: "Google algoritmalarına tam uyumlu kod yapısı ve dönüşüm (conversion) odaklı organik trafik stratejileri.",
    category: "SEO",
    icon: TrendingUp,
    relatedIds: [1, 5],
    status: "core",
    capacity: 85,
  },
  {
    id: 5,
    title: "UI/UX Tasarım",
    content: "Marka kimliğine uygun, kullanıcı deneyimini (UX) merkeze alan modern, estetik arayüz (UI) tasarımları.",
    category: "Design",
    icon: MonitorPlay,
    relatedIds: [1, 2],
    status: "active",
    capacity: 70,
  },
];

export default function WorkAreas() {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Basit bir fade in animasyonu eklenebilir.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work-areas-section" ref={sectionRef} className="w-full relative z-10 pt-32 md:pt-[35vh]">
      <SectionSkiggle type="workareas" />
      <RadialOrbitalTimeline timelineData={workAreasData} />
    </section>
  );
}
