/* LogBook service worker — çevrimdışı çalışma için uygulama kabuğunu önbelleğe alır.
   Strateji: önce ağ (her zaman güncel sürüm), ağ yoksa önbellek. */
const CACHE = "logbook-v1";
const SHELL = ["./", "./index.html", "./NoteBookMD.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return; // Google API/GSI istekleri SW'ye takılmasın
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() =>
      caches.match(e.request, { ignoreSearch: true })
        .then(r => r || caches.match("./index.html"))
    )
  );
});
