const CACHE_NAME = "kaladan-jhs-lms-v4";

// App shell + the external libraries the app depends on, so the whole
// thing works offline after the very first successful load.
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "https://cdn.tailwindcss.com",
  "https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js",
  "https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-app-compat.js",
  "https://cdn.jsdelivr.net/npm/firebase@10.12.2/firebase-firestore-compat.js",
  "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600&family=Inter:wght@400;500;600;700&display=swap",
];

// Firestore's own network traffic (real-time sync, long-polling) must never
// be intercepted or cached by this service worker.
function isCloudTraffic(url) {
  return /googleapis\.com|google\.com|gstatic\.com|firebaseio\.com/.test(url);
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(new Request(url, { mode: "no-cors" })).catch(() => {})
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first for the app's own pages so updates reach every device
// immediately; cache-first for everything else (libraries, icons).
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (isCloudTraffic(event.request.url)) return;

  const url = new URL(event.request.url);
  const isPage = url.origin === self.location.origin &&
    (event.request.mode === "navigate" || /\/(index\.html)?$/.test(url.pathname) || /index\.html$/.test(url.pathname));

  if (isPage) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => caches.match(event.request).then((c) => c || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const network = fetch(event.request)
        .then((response) => {
          if (response && (response.ok || response.type === "opaque")) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
