const CACHE='mts-v1';
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['/mts-mobile.html','/manifest.json','/icon-192.png','/icon-512.png'])));
  self.skipWaiting();
});
self.addEventListener('fetch',e=>{
  e.respondWith(
    fetch(e.request).catch(()=>caches.match(e.request))
  );
});
