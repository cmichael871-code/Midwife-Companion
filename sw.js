const CACHE_NAME = 'nhs-midwife-v5'; // Changing this name forces the phone to update
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 1. INSTALL EVENT
// This runs when the browser sees a new version of this file.
self.addEventListener('install', (event) => {
  // Force this new service worker to become active immediately
  self.skipWaiting(); 

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching new assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. ACTIVATE EVENT
// This runs after the new service worker takes control. 
// We use this to DELETE old caches (v1, v2, v3, etc.) so the app doesn't get stuck.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Tell the service worker to take control of the page immediately
  return self.clients.claim();
});

// 3. FETCH EVENT
// This intercepts
