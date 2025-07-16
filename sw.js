const CACHE_NAME = 'mix-fibra-v2';
const STATIC_CACHE = 'mix-fibra-static-v2';
const DYNAMIC_CACHE = 'mix-fibra-dynamic-v2';

const urlsToCache = [
  '/mix-fibra/',
  '/mix-fibra/imagens/logo-mix-fibra.png',
  '/mix-fibra/imagens/mix.png',
  '/mix-fibra/imagens/mix2.png'
];

const CACHE_STRATEGIES = {
  images: 'cache-first',
  api: 'network-first',
  static: 'cache-first'
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})));
      })
      .catch(() => {
        // Ignore cache errors
      })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different cache strategies
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request));
  } else if (url.pathname.includes('/api/')) {
    event.respondWith(networkFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Cache strategies
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  return cached || fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return cache.match(request) || new Response('Offline');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    cache.put(request, response.clone());
    return response;
  });
  return cached || fetchPromise;
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação da Mix Fibra!',
    icon: '/mix-fibra/imagens/logo-mix-fibra.png',
    badge: '/mix-fibra/imagens/logo-mix-fibra.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Detalhes',
        icon: '/mix-fibra/imagens/logo-mix-fibra.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/mix-fibra/imagens/logo-mix-fibra.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Mix Fibra', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/mix-fibra/')
    );
  }
});