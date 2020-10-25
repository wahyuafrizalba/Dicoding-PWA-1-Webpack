const CACHE_NAME = 'ngeterin-v1';
var urlsToCache = [
  "/",
  "/src/nav.html",
  "/src/index.html",
  "/src/pages/beranda.html",
  "/src/pages/lacak.html",
  "/src/pages/kurir.html",
  "/src/pages/karir.html",
//  "/css/materialize.min.css",
  "/src/styles/style.css",
  "/src/styles/stylehp.css",
//   "/js/materialize.min.js",
  "/src/script/main.js",
//   "/src/script/nav.js",
  "/src/images/Cepat.png",
  "/src/images/Lacak_Barang.png",
  "/src/images/Protokol_Kesehatan.png",
  "/src/images/putihapple.png",
  "/src/images/putihgoogleplay.png",
  "/src/images/Utama.png",
  "/src/images/Foto.jpg",
  "/src/images/Ngeterin192.png",
  "/src/images/Ngeterin144.png",
  "/src/images/Ngeterin96.png",
  "/src/images/Ngeterin72.png",
  "/src/images/Ngeterin48.png",
  "/src/manifest.json"
];
 
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }
    
            console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
            );
            return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});