/* LogBook service worker — çevrimdışı çalışma için uygulama kabuğunu önbelleğe alır.
   Strateji: önce ağ (her zaman güncel sürüm), ağ yoksa önbellek. */
const CACHE = "logbook-v13";
const SHELL = ["./", "./index.html", "./LogBook.html", "./manifest.webmanifest",
  "./assets/icon-192.png", "./assets/icon-512.png", "./assets/icon-maskable-512.png", "./assets/apple-touch-icon.png"];

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
  // pdf.js (çizim motoru): bir kez indir, sonra hep önbellekten — çevrimdışı çizim çalışsın
  const isPdfjs = u.hostname === "cdnjs.cloudflare.com" && u.pathname.includes("/pdf.js/");
  if (isPdfjs) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    })));
    return;
  }
  if (u.origin !== location.origin) return; // Google API/GSI istekleri SW'ye takılmasın
  // HTML'i tarayıcı HTTP önbelleğini ATLAYARAK çek: GitHub Pages'in max-age=600
  // başlığı yüzünden yeni sürüm 10 dakika gecikmesin.
  const isDoc = e.request.mode === "navigate" || u.pathname.endsWith(".html") || u.pathname.endsWith("/");
  e.respondWith(
    fetch(isDoc ? new Request(e.request, { cache: "reload" }) : e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() =>
      caches.match(e.request, { ignoreSearch: true })
        .then(r => r || caches.match("./index.html"))
    )
  );
});
