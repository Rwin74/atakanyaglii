import React from 'react'
import FeaturesCards from '../ui/feature-shader-cards'

const SERVICES = [
  {
    title: 'Özel Yazılım Çözümleri',
    body:
      'Firmalara ve işletmelere özel, ihtiyaçlarına yönelik ölçeklenebilir yazılım çözümleri.',
  },
  {
    title: 'Dijital Çözümler',
    body:
      'Süreçleri dijitalleştirerek verimliliği artıran ve iş akışlarını optimize eden sistemler.',
  },
  {
    title: 'SEO',
    body:
      'Markanızın ve ürünlerinizin dijital dünyada görünürlüğünü artırmak için arama motoru optimizasyonu.',
  },
]

const SubHeader = () => {
  return (
    <div className='relative md:absolute md:top-[40%] left-0 md:left-auto md:right-10 w-full md:w-[45vw] z-10 flex flex-col md:items-start items-center px-5 md:px-0'>
      <div className='w-full text-base md:text-2xl flex flex-col gap-3 md:gap-4 leading-relaxed md:leading-snug text-center md:text-left'>
        <p>
          Bilgisayar Programcılığı öğrencisi olarak başladığım yolculukta, yazılım geliştirme, yapay zeka sistemleri, endüstriyel otomasyon ve teknoloji odaklı ürünler üzerine çalışıyorum.
        </p>
        <p>
          Amacım yalnızca uygulamalar geliştirmek değil; gerçek dünya problemlerine ölçeklenebilir teknolojik çözümler üretmek.
        </p>
      </div>

      <div className='w-full mt-8 md:mt-12'>
        <div className='mb-6 font-semibold tracking-widest text-sm'>
          <span>HİZMETLER</span>
        </div>
        <FeaturesCards />
      </div>
    </div>
  )
}

export default SubHeader
