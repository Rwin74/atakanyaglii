"use client"

import React from "react"
import { Warp } from "@paper-design/shaders-react"
import { Code, Globe, TrendingUp, ArrowRight } from "lucide-react"

const features = [
  {
    title: "Özel Yazılım Geliştirme",
    description: "İhtiyaçlarınıza tam oturan sistemler tasarlıyorum. Karmaşık süreçleri basitleştiren, tamamen markanıza özgü ölçeklenebilir web ve mobil altyapılar inşa ediyorum.",
    icon: <Code className="w-12 h-12 text-white" />,
  },
  {
    title: "Arayüz & Kullanıcı Deneyimi",
    description: "Kullanıcıyı yormayan, estetik ve işlevsel arayüzler tasarlıyorum. Amacım sadece güzel görünen değil, gerçekten kusursuz çalışan dijital deneyimler sunmak.",
    icon: <Globe className="w-12 h-12 text-white" />,
  },
  {
    title: "Arama Motoru Stratejileri",
    description: "Sitenizi sadece kodlamakla kalmıyor, organik olarak bulunabilir olması için teknik altyapısını baştan sağlam kuruyorum. Doğru kitleyle buluşmanızı sağlıyorum.",
    icon: <TrendingUp className="w-12 h-12 text-white" />,
  },
]

export default function FeaturesCards() {
  const getShaderConfig = (index) => {
    const configs = [
      {
        proportion: 0.3,
        softness: 0.8,
        distortion: 0.15,
        swirl: 0.6,
        swirlIterations: 8,
        shape: "checks",
        shapeScale: 0.08,
        colors: ["hsl(280, 100%, 30%)", "hsl(320, 100%, 60%)", "hsl(340, 90%, 40%)", "hsl(300, 100%, 70%)"],
      },
      {
        proportion: 0.4,
        softness: 1.2,
        distortion: 0.2,
        swirl: 0.9,
        swirlIterations: 12,
        shape: "dots",
        shapeScale: 0.12,
        colors: ["hsl(200, 100%, 25%)", "hsl(180, 100%, 65%)", "hsl(160, 90%, 35%)", "hsl(190, 100%, 75%)"],
      },
      {
        proportion: 0.35,
        softness: 0.9,
        distortion: 0.18,
        swirl: 0.7,
        swirlIterations: 10,
        shape: "checks",
        shapeScale: 0.1,
        colors: ["hsl(120, 100%, 25%)", "hsl(140, 100%, 60%)", "hsl(100, 90%, 30%)", "hsl(130, 100%, 70%)"],
      },
    ]
    return configs[index % configs.length]
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {features.map((feature, index) => {
          const shaderConfig = getShaderConfig(index)
          return (
            <div key={index} className="relative h-auto min-h-[300px] group flex">
              <div className="absolute inset-0 rounded-3xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                <Warp
                  style={{ height: "100%", width: "100%" }}
                  proportion={shaderConfig.proportion}
                  softness={shaderConfig.softness}
                  distortion={shaderConfig.distortion}
                  swirl={shaderConfig.swirl}
                  swirlIterations={shaderConfig.swirlIterations}
                  shape={shaderConfig.shape}
                  shapeScale={shaderConfig.shapeScale}
                  scale={1}
                  rotation={0}
                  speed={0.8}
                  colors={shaderConfig.colors}
                />
              </div>

              <div className="relative z-10 p-6 md:p-8 rounded-3xl h-full w-full flex flex-col bg-black/60 hover:bg-black/40 transition-colors duration-500 border border-white/20 dark:border-white/10">
                <div className="mb-6 filter drop-shadow-lg">{feature.icon}</div>

                <h3 className="text-2xl font-bold mb-4 text-white font-Aeonik">{feature.title}</h3>

                <p className="leading-relaxed flex-grow text-gray-100 font-medium text-sm md:text-base">{feature.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
