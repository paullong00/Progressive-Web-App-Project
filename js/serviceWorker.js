const CACHE_NAME = 'site-static-v1';
const assets = [
    '/',
    '/index.html',
    '/movies.html',
    '/css/styles.css',
    '/js/app.js',
    '/js/imageLoader.js',
    '/js/webWorker.js',
    '/data/movieObj.js'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    return fetchRes;
                })
            });
        })
    );
});

document.getElementById('clearCacheButton').addEventListener('click', function() {
    if ('caches' in window) {
        
        caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
                caches.delete(cacheName).then(() => {
                    console.log('Cache cleared: ', cacheName);
                });
            });
        }).then(() => {
            console.log('All caches cleared.');
            alert('All caches have been cleared.');
        });
    } else {
        console.log('Caching not supported!');
        alert('Caching is not supported by your browser.');
    }
});