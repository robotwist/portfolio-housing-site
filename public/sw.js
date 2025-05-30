const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/globals.css',
  '/images/TruthRayLogo.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/fonts/inter-var.woff2',
];

// Add debug logging
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets...');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached successfully');
      })
      .catch((error) => {
        console.error('Error caching static assets:', error);
      })
  );
});

// Clean up old caches on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Network-first strategy for HTML pages
const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || caches.match('/offline.html');
  }
};

// Cache-first strategy for static assets
const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    return new Response('Network error', { status: 408, headers: { 'Content-Type': 'text/plain' } });
  }
};

// Handle fetch events
self.addEventListener('fetch', (event) => {
  const request = event.request;
  console.log('Fetching:', request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Handle HTML pages with network-first strategy
  if (request.headers.get('accept').includes('text/html')) {
    console.log('Handling HTML request:', request.url);
    event.respondWith(networkFirst(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (request.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2)$/)) {
    console.log('Handling static asset:', request.url);
    event.respondWith(cacheFirst(request));
    return;
  }

  // Default to network-first for other requests
  console.log('Handling default request:', request.url);
  event.respondWith(networkFirst(request));
}); 