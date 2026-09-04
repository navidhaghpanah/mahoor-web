const CACHE = "mahoor-pwa-v4";
self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() =>
      caches.open(CACHE).then((c) => c.addAll(["/manifest.json", "/icons/icon-192.png", "/icons/icon-512.png", "/apple-touch-icon.png"])),
    ),
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.pathname === "/" || url.pathname.endsWith(".html") || url.pathname.startsWith("/_next")) {
    e.respondWith(fetch(e.request));
    return;
  }
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
