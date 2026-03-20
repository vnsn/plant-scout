const CACHE_NAME = 'plant-scout-v3';
const APP_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './park_locations.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Install: cache all app assets + plant images
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_ASSETS);
    }).then(() => {
      return caches.open(CACHE_NAME).then(cache => {
        return fetch('./image-manifest.json')
          .then(r => r.json())
          .then(images => cache.addAll(images.map(f => './images/' + f)))
          .catch(() => {/* image manifest may not exist yet */});
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean ALL old caches immediately
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for app files, cache-first for images
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const isAppFile = url.pathname.endsWith('.html') ||
                    url.pathname.endsWith('.js') ||
                    url.pathname.endsWith('.css') ||
                    url.pathname.endsWith('/');

  if (isAppFile) {
    // Network-first: try to get fresh version, fall back to cache
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        return caches.match(event.request).then(cached => {
          return cached || (event.request.mode === 'navigate'
            ? caches.match('./index.html')
            : new Response('Offline', { status: 503 }));
        });
      })
    );
  } else {
    // Cache-first for images, icons, manifest
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          if (response.ok && event.request.method === 'GET') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
    );
  }
});
