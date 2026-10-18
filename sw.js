// Offline support: serve from the network when online (so updates show up), fall back to the cache when not.
const CACHE = 'selfcare-v7';
const FILES = ['./', 'index.html', 'teeth.html', 'style.css?v=8', 'app.js?v=4', 'manifest.webmanifest',
  'icon-192.png?v=5', 'icon-512.png', 'apple-touch-icon.png?v=5'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: false })
        .then(hit => hit || caches.match(e.request, { ignoreSearch: true })))
  );
});
