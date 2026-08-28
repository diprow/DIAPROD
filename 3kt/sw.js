/* Service worker 3KT — serve a due cose:
   1. rendere l'app installabile (requisito su Android/Chrome)
   2. farla aprire anche senza rete: la pagina è tutta in un file,
      quindi basta tenerne una copia in cache.                        */
const CACHE = '3kt-v1';
const ESSENZIALI = [
  './',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ESSENZIALI))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())   // una risorsa mancante non deve bloccare l'installazione
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(k => Promise.all(k.filter(n => n !== CACHE).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Le giacenze devono essere fresche: mai dalla cache per prima.
  // Se la rete manca, ci pensa già il fallback locale dentro la pagina.
  if (url.hostname.endsWith('supabase.co')) return;

  // La pagina: prima la rete (così un deploy si vede subito), poi la cache.
  if (req.mode === 'navigate'){
    e.respondWith(
      fetch(req)
        .then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put('./', c)); return r; })
        .catch(() => caches.match('./').then(r => r || caches.match(req)))
    );
    return;
  }

  // Il resto (icone, font): prima la cache, aggiornando in sottofondo.
  e.respondWith(
    caches.match(req).then(hit => {
      const rete = fetch(req).then(r => {
        if (r && r.status === 200 && r.type === 'basic'){
          const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c));
        }
        return r;
      }).catch(() => hit);
      return hit || rete;
    })
  );
});
