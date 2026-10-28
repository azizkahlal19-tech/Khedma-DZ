// Khedma DZ Progressive Web App Service Worker
const CACHE_NAME = 'khedma-dz-v2.6.4';

self.addEventListener('install', (event) => {
  // Activate immediately without waiting for old worker to terminate
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Purge any older caches so updates reflect immediately
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Always bypass cache for HTML, scripts, and hot reload to ensure instant refreshes on code updates
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);

  // APK downloads and static media pass through directly
  if (url.pathname.endsWith('.apk')) {
    return;
  }

  // Always use Network-First strategy
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        return networkResponse;
      })
      .catch(() => {
        // Fallback to cache only when offline
        return caches.match(event.request);
      })
  );
});
