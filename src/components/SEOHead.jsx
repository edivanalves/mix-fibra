import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = memo(({ 
  title = 'Mix Fibra • Internet de Ultra Velocidade',
  description = 'Internet de fibra óptica ultra rápida para navegação, jogos e streaming sem limites. Planos Mix Fibra com velocidade garantida.',
  keywords = 'internet fibra óptica, internet rápida, planos internet, mix fibra, velocidade garantida, provedor internet',
  image = 'https://edivanalves.github.io/mix-fibra/imagens/logo-mix-fibra.png',
  url = 'https://edivanalves.github.io/mix-fibra',
  type = 'website'
}) => (
  <Helmet>
    {/* Primary Meta Tags */}
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <meta name="author" content="Mix Fibra" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="canonical" href={url} />

    {/* Open Graph */}
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Mix Fibra" />
    <meta property="og:locale" content="pt_BR" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={image} />

    {/* Additional SEO */}
    <meta name="theme-color" content="#1f2937" />
    <meta name="msapplication-TileColor" content="#1f2937" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="format-detection" content="telephone=no" />

    {/* Structured Data */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Mix Fibra",
        "description": description,
        "url": url,
        "logo": image,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+55-83-99641-1187",
          "contactType": "customer service",
          "availableLanguage": "Portuguese"
        },
        "areaServed": [
          "Sumé, PB",
          "Congo, PB", 
          "Camalaú, PB",
          "Caraúbas, PB"
        ],
        "serviceType": "Internet Service Provider"
      })}
    </script>
  </Helmet>
));

export default SEOHead;