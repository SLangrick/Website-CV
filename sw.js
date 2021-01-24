const staticCache = 'PWA-Slangrick-Static';
const dynamicCache = 'PWA-Slangrick-Dyn';
const assets = [
    "/",
    "/index.html",
    "/index.js",
    "/manifest.json",
    "/CSS/style.css",
];

self.addEventListener("install", e => {
    //console.log("Install");
    e.waitUntil(
        caches.open(staticCache).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener('activate', evt => {
    //console.log('service worker activated');
    evt.waitUntil(
      caches.keys().then(keys => {
        //console.log(keys);
        return Promise.all(keys
          .filter(key => key !== staticCache)
          .map(key => caches.delete(key))
        );
      })
    );
  });

self.addEventListener("fetch", e => {
    //console.log(`Fetch request: ${e.request.url}`, e);
    e.respondWith(
        caches.match(e.request).then(cacheRes => {
          return cacheRes || fetch(e.request).then(fetchRes => {
            return caches.open(dynamicCache).then(cache => {
              cache.put(e.request.url, fetchRes.clone());
              return fetchRes;
            })
          });
        })
      );
});