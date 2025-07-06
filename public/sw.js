const CACHE_NAME = 'mix-fibra-v1';
const urlsToCache = [
  '/mix-fibra/',
  '/mix-fibra/imagens/logo-mix-fibra.png',
  '/mix-fibra/imagens/mix.png'
];

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
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // Return offline page or default response
          return new Response('Offline');
        });
      })
  );
});