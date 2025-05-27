const CACHE_NAME = "feriados-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./js/productos.js",
  "./js/buscador.js",
  "./js/filtro.js",
  "./js/favoritos.js",
  "./js/registro.js",
  "./img/representativa.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
