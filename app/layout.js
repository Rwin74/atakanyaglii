import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-main',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://atakanyagli.com'),
  title: {
    default: 'Atakan Yağlı | Software Developer',
    template: '%s | Atakan Yağlı'
  },
  description: 'Merhaba, ben Atakan. Yazılım dünyasında kalıplara sığmayan işler üretmeyi seviyorum. İşletmelere özel web uygulamaları ve dijital altyapılar geliştiriyorum.',
  keywords: [
    'Özel yazılım firması', 'Kurumsal web tasarım', 'Freelance yazılım uzmanı', 
    'E-ticaret altyapısı', 'Mobil uygulama geliştirme', 'SEO danışmanlığı', 
    'Yapay zeka sistemleri', 'Web yazılım ajansı', 'Atakan Yağlı'
  ],
  authors: [{ name: 'Atakan Yağlı' }],
  creator: 'Atakan Yağlı',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://atakanyagli.com',
    title: 'Atakan Yağlı | Software Developer',
    description: 'Gerçek dünya zorlukları için teknoloji inşa ediyorum. Özel yazılım çözümleri ve yapay zeka sistemleri.',
    siteName: 'Atakan Yağlı Portfolio',
    images: [
      {
        url: '/hero-image-nobg.png',
        width: 1200,
        height: 630,
        alt: 'Atakan Yağlı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atakan Yağlı | Software Developer',
    description: 'Gerçek dünya zorlukları için teknoloji inşa ediyorum.',
    images: ['/hero-image-nobg.png'],
  },
  icons: {
    icon: [
      { url: '/icon.jpg', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/icon.jpg', type: 'image/jpeg' },
    ],
    shortcut: '/icon.jpg',
  },
}

// JSON-LD structured data for Google Knowledge Graph & Services
const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Atakan Yağlı',
    url: 'https://atakanyagli.com',
    jobTitle: 'Software Developer',
    description: 'Bilgisayar Programcılığı öğrencisi ve Freelance Yazılım Geliştirici.',
    image: 'https://atakanyagli.com/hero-image-nobg.png',
    sameAs: [
      'https://instagram.com/atakannyagli',
      'https://www.linkedin.com/in/atakanyagli'
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Atakan Yağlı Yazılım & Dijital Çözümler',
    image: 'https://atakanyagli.com/hero-image-nobg.png',
    description: 'Kurumsal web tasarımı, e-ticaret altyapıları, özel yazılım geliştirme, mobil uyumlu web siteleri ve Teknik SEO optimizasyon hizmetleri.',
    url: 'https://atakanyagli.com',
    telephone: '+905447218974',
    email: 'atakan7495@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'TR'
    },
    priceRange: '₺₺',
    offers: {
      '@type': 'OfferCatalog',
      name: 'Yazılım ve Dijital Hizmetler',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Özel Yazılım Geliştirme'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kurumsal Web Tasarımı'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SEO Optimizasyonu'
          }
        }
      ]
    }
  }
];

const themeBootstrap = `
(function () {
  try {
    var saved = localStorage.getItem('theme');
    var theme = saved === 'dark' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={outfit.variable} data-theme="light" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={outfit.className}>{children}</body>
    </html>
  )
}
