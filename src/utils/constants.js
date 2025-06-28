// Constantes da aplicação
export const COMPANY_INFO = {
  name: 'Mix Fibra',
  fullName: 'Mix Fibra - Internet de Ultra Velocidade',
  description: 'Internet de fibra óptica ultra rápida para navegação, jogos e streaming sem limites.',
  email: 'mixfibrasume@gmail.com',
  phone: '+55 83 99641-1187',
  whatsapp: '5583996411187',
  website: 'https://edivanalves.github.io/mix-fibra',
  logo: '/imagens/logo-mix-fibra.png'
};

export const CITIES_SERVED = [
  { name: 'Sumé', state: 'PB', whatsapp: '5583996411187' },
  { name: 'Congo', state: 'PB', whatsapp: '5583996703520' },
  { name: 'Camalaú', state: 'PB', whatsapp: '5583996784194' },
  { name: 'Caraúbas', state: 'PB', whatsapp: '5583988539424' }
];

export const PLANS = [
  {
    id: 'plan-50mb',
    speed: 50,
    price: 39.99,
    name: '50MB',
    description: 'Ideal para uso básico, redes sociais e e-mails.',
    features: ['Wi-Fi Grátis', 'Suporte técnico'],
    popular: false
  },
  {
    id: 'plan-100mb',
    speed: 100,
    price: 49.99,
    name: '100MB',
    description: 'Perfeito para streaming de filmes e séries em HD.',
    features: ['Streaming sem travar', 'Wi-Fi 5G', 'Acima de 4 dispositivos'],
    popular: true
  },
  {
    id: 'plan-200mb',
    speed: 200,
    price: 59.99,
    name: '200MB',
    description: 'Para trabalho remoto, videochamadas e jogos online.',
    features: ['Ideal para home office', 'Baixa latência p/ jogos'],
    popular: false
  },
  {
    id: 'plan-300mb',
    speed: 300,
    price: 69.99,
    name: '300MB',
    description: 'Experiência completa para múltiplos streamings 4K.',
    features: ['Streaming em 4K', 'Família conectada', 'Wi-Fi alta performance'],
    popular: true
  },
  {
    id: 'plan-500mb',
    speed: 500,
    price: 99.99,
    name: '500MB',
    description: 'Ultra velocidade para empresas e gamers exigentes.',
    features: ['Ideal para empresas', 'Performance p/ gamers'],
    popular: false
  }
];

export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/5583996411187',
  instagram: 'https://instagram.com/mixfibra_sume',
  facebook: 'https://facebook.com/mixfibra',
  linkedin: 'https://linkedin.com/company/mixfibra'
};

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'plans', label: 'Planos', href: '#plans-section' },
  { id: 'about', label: 'Sobre', href: '#about' },
  { id: 'contact', label: 'Contato', href: '#contact' },
  { id: 'solicitation', label: 'Solicite Agora', href: '#solicitation-form' },
  { id: 'speedtest', label: 'Teste de Velocidade', href: '#speedtest-section' }
];

export const ANIMATION_DELAYS = {
  short: 100,
  medium: 300,
  long: 500
};

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};