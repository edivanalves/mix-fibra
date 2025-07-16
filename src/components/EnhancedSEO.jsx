import React from 'react';
import { Helmet } from 'react-helmet-async';

const EnhancedSEO = ({ 
  title = "Mix Fibra • Internet de Ultra Velocidade",
  description = "Internet de fibra óptica com ultra velocidade. Planos a partir de R$39,99. Instalação gratuita, sem fidelidade. Atendimento 24/7 em Sumé, Congo, Camalaú e Caraúbas - PB.",
  keywords = "internet fibra óptica, internet rápida, provedor internet, Mix Fibra, Sumé PB, Congo PB, Camalaú PB, Caraúbas PB",
  image = "https://edivanalves.github.io/mix-fibra/imagens/logo-mix-fibra.png",
  url = "https://edivanalves.github.io/mix-fibra",
  type = "website",
  author = "Mix Fibra",
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TelecommunicationsProvider",
        "@id": `${url}#organization`,
        "name": "Mix Fibra",
        "description": "Provedor de internet fibra óptica de alta velocidade",
        "url": url,
        "telephone": "+55-83-99641-1187",
        "email": "mixfibrasume@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "PB",
          "addressCountry": "BR",
          "addressLocality": "Sumé"
        },
        "areaServed": [
          { "@type": "City", "name": "Sumé", "addressRegion": "PB" },
          { "@type": "City", "name": "Congo", "addressRegion": "PB" },
          { "@type": "City", "name": "Camalaú", "addressRegion": "PB" },
          { "@type": "City", "name": "Caraúbas", "addressRegion": "PB" }
        ],
        "serviceType": "Internet Provider",
        "priceRange": "R$39.99 - R$99.99",
        "logo": {
          "@type": "ImageObject",
          "url": image,
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://wa.me/5583996411187",
          "https://wa.me/5583999298366",
          "https://wa.me/5583988539424",
          "https://wa.me/5583996784194"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        "url": url,
        "name": "Mix Fibra",
        "description": description,
        "publisher": {
          "@id": `${url}#organization`
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${url}?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": title,
        "isPartOf": {
          "@id": `${url}#website`
        },
        "about": {
          "@id": `${url}#organization`
        },
        "description": description,
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Início",
              "item": url
            }
          ]
        }
      },
      {
        "@type": "Service",
        "name": "Internet Fibra Óptica",
        "description": "Serviço de internet de alta velocidade com fibra óptica",
        "provider": {
          "@id": `${url}#organization`
        },
        "areaServed": {
          "@type": "State",
          "name": "Paraíba",
          "containsPlace": [
            { "@type": "City", "name": "Sumé" },
            { "@type": "City", "name": "Congo" },
            { "@type": "City", "name": "Camalaú" },
            { "@type": "City", "name": "Caraúbas" }
          ]
        },
        "offers": [
          {
            "@type": "Offer",
            "name": "Plano Básico",
            "description": "Internet de 100MB",
            "price": "39.99",
            "priceCurrency": "BRL",
            "availability": "InStock"
          },
          {
            "@type": "Offer",
            "name": "Plano Premium",
            "description": "Internet de 500MB",
            "price": "99.99",
            "priceCurrency": "BRL",
            "availability": "InStock"
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
      <meta name="googlebot" content="index,follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Mix Fibra - Internet de Ultra Velocidade" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Mix Fibra" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Mix Fibra - Internet de Ultra Velocidade" />

      {/* Additional SEO */}
      <meta name="theme-color" content="#f97316" />
      <meta name="msapplication-TileColor" content="#f97316" />
      <meta name="application-name" content="Mix Fibra" />
      <meta name="apple-mobile-web-app-title" content="Mix Fibra" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="BR-PB" />
      <meta name="geo.placename" content="Sumé, Paraíba, Brasil" />
      <meta name="geo.position" content="-7.6675;-36.8800" />
      <meta name="ICBM" content="-7.6675, -36.8800" />

      {/* Business Info */}
      <meta name="contact" content="mixfibrasume@gmail.com" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="//wa.me" />
    </Helmet>
  );
};

export default EnhancedSEO;