// Service Worker
const staticCacheName = 'static-cache'
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open(staticCacheName).then(function(cache) {
        return cache.addAll(
          [
            '/css/bootstrap.css',
            '/css/main.css',
            '/js/materialize.min.js',
            '/js/materialize.min.js',
            '/index.html'
          ]
        );
      })
    );
  });

self.addEventListener('activate',evt=>{
    console.log('service worker has been activated')
})

self.addEventListener('fetch',evt=>{
  console.log('service worker has been activated')
})
