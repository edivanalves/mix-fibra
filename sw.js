// Service Worker for Mix Fibra PWA

const CACHE_NAME = 'mixfibra-v1.0.0';
const urlsToCache = [
  '/mix-fibra/',
  '/mix-fibra/static/js/bundle.js',
  '/mix-fibra/static/css/main.css',
  '/mix-fibra/imagens/logo-mix-fibra.png',
  '/mix-fibra/imagens/mix.png',
  '/mix-fibra/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nova oferta Mix Fibra disponível!',
    icon: '/mix-fibra/imagens/logo-mix-fibra.png',
    badge: '/mix-fibra/imagens/logo-mix-fibra.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Oferta',
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

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/mix-fibra/')
    );
  }
});