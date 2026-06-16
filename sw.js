const CACHE = 'arvideo-v1.1';
const PRECACHE = [
  './',
  './index.html',
  './ar.html',
  './vr.html',
  './scan.html',
  './create.html',
  './arface.html',
  './arloc.html',
  './arplace.html',
  './projects.html',
  './templates.html',
  './models.html',
  './profile.html',
  './admin.html',
  './analytics.html',
  './pricing.html',
  './tutorials.html',
  './landing.html',
  './components.html',
  './css/style.css',
  './js/shell.js',
  './js/ui.js',
  './favicon.svg',
  './manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);

  // CDN resurslar: avval tarmoq, keyin kesh (offline fallback)
  if (url.origin !== location.origin) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }

  // Lokal fayllar: kesh-first
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return res;
      });
    })
  );
});
