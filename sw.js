/* Service worker : l'app fonctionne hors ligne et se met à jour toute seule.
   Pour publier une nouvelle version, change VERSION ci-dessous. */
const VERSION = "budget-v9";
const SHELL = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/apple-touch-icon.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/favicon-32.png"];

self.addEventListener("install", e => {
  // cache: "reload" = on télécharge vraiment les fichiers, sans passer par le cache du navigateur
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Page : réseau d'abord (pour avoir la dernière version), cache si hors ligne
  if (req.mode === "navigate") {
    // Toujours demander la dernière version au serveur (sans le cache du navigateur) ;
    // on ne garde en cache qu'une vraie page (jamais une erreur 404), et hors ligne on sert la dernière version connue
    e.respondWith(fetch(new Request(req.url, { cache: "no-store", credentials: "same-origin" }))
      .then(r => { if (r.ok) { const c = r.clone(); caches.open(VERSION).then(x => x.put("./index.html", c)); return r; }
        return caches.match("./index.html").then(hit => hit || r); })
      .catch(() => caches.match("./index.html")));
    return;
  }
  // Polices Google et fichiers de l'app : cache d'abord, puis mise à jour en arrière-plan
  if (url.origin === location.origin || url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com")) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
