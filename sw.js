const CACHE = 'gestor-dri-offline-v2';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.css',
  '/vite.svg',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    if (/\.(?:js|css|png|jpg|jpeg|svg|ico|webp|woff2?)$/.test(url.pathname)) {
      event.respondWith(
        caches.match(req).then((cached) => {
          if (cached) return cached;
          return fetch(req).then((res) => {
            const resClone = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, resClone));
            return res;
          });
        })
      );
      return;
    }
    event.respondWith(
      fetch(req).then((res) => {
        const resClone = res.clone();
        caches.open(CACHE).then((cache) => cache.put(req, resClone));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('/')))
    );
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE ? null : caches.delete(k))))
    )
  );
});
