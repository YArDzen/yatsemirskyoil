const resources = [
  "/",
  "/static/touch.js",
  "/static/manifest.webmanifest",
  "/static/apple_splash_2048.png",
  "/static/apple_splash_1668.png",
  "/static/apple_splash_1536.png",
  "/static/apple_splash_1125.png",
  "/static/apple_splash_1242.png",
  "/static/apple_splash_750.png",
  "/static/apple_splash_640.png",
  "/static/apple-icon-57x57.png",
  "/static/apple-icon-60x60.png",
  "/static/apple-icon-72x72.png",
  "/static/apple-icon-76x76.png",
  "/static/apple-icon-114x114.png",
  "/static/apple-icon-120x120.png",
  "/static/apple-icon-144x144.png",
  "/static/apple-icon-152x152.png",
  "/static/apple-icon-180x180.png",
  "/static/icon-192x192.png",
  "/static/favicon-32x32.png",
  "/static/favicon-96x96.png",
  "/static/favicon-16x16.png",
  "/static/Montserrat-Light.woff",
  "/static/style.css",
  "/static/check-circle-regular.svg",
  "/static/create_order.js",
  "/static/times-solid.svg",
  "/static/apple_share.png",
  "/static/apple_home.png",
  "/static/question-solid.svg",
  "/static/question_form.js",
  "/static/font.png",
  "/static/products.png",
  "/static/delivery_and_payment.png",
  "/static/contacts.png",
  "/static/chevron-down-solid.svg",
  "/static/self_delivery.png",
  "/static/free_delivery.png",
  "/static/car_delivery.ico",
  "/static/chevron-left-solid.svg",
  "/static/chevron-right-solid.svg"
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('pwabuilder-offline').then(function(cache) {
      try{
        cache.addAll(resources);
      }
      catch{}

    }));
});


self.addEventListener('fetch', function(event) {
  var updateCache = function(request){
    return caches.open('pwabuilder-offline').then(function (cache) {
      return fetch(request).then(function (response) {
        return cache.put(request, response);
      });
    });
  };
  event.waitUntil(updateCache(event.request));
  
  event.respondWith(
    fetch(event.request).catch(function(error) {
      return caches.open('pwabuilder-offline').then(function (cache) {
        return cache.match(event.request).then(function (matching) {
          var report =  !matching || matching.status == 404?Promise.reject('no-match'): matching;
          return report
        });
      });
    })
  );
})
