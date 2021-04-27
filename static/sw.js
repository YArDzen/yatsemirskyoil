self.addEventListener('install', function(event) {
  var indexPage = new Request('/');

  event.waitUntil(
    fetch(indexPage).then(function(response) {
      return caches.open('pwabuilder-offline').then(async function(cache) {
        await cache.addAll([
          "/static/style.css",
          "/static/create_order.js",
          "/static/question_form.js"
        ])
        return cache.put(indexPage, response);
      });
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
