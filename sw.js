const CACHE_NAME = 'nhs-midwife-v3'; 
// (Changed v2 to v3)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 1. Install Service Worker & Cache Files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Serve Cached Content when Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached file if found, otherwise try network
      return cachedResponse || fetch(event.request);
    })
  );
});

// 3. Update Cache (Delete old versions if name changes)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});


