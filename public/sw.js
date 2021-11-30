let static_cache = 'static_v1'; //Archivos estaticos (App Shell)
let dynamic_cache = 'dynamic_v1'; //
let inmutable_cache = 'inmutable_v1'; //

let files_appShell = [
    "/",
    "index.html",
    "main.js",
    "not-found.html",
    "style.css",
    "manifest.json"
    
];

let inmutableFiles = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
];




self.addEventListener('install', result => {
    //Abrir el cache con base al nombre y sino existe lo crea

    
    /*result.waitUntil(
        caches.open(inmutable_cache).then(cache => {
            cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css');
        })
        
    );*/

    const openStatic = caches.open(static_cache).then(cache => {
        cache.addAll(files_appShell);
    });

    const openInmutable = caches.open(inmutable_cache).then(cache => {
        cache.addAll(inmutableFiles);
    });

    //Este metodo hace todas las promesas que esten dentro en una sola
    result.waitUntil(
        Promise.all([
            openStatic, 
            openInmutable
        ])
    );

})

self.addEventListener('activate', event => {
    // delete any caches that aren't in expectedCaches
    // which will get rid of static-v1
    event.waitUntil(
      caches.keys().then(keys => Promise.all(
        keys.map(key => {
          if (!static_cache.includes(key) && key.includes('static')) {
            return caches.delete(key);
          }
        })
      )).then(() => {
        console.log('V2 now ready to handle fetches!');
      })
    );
  });

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(
        cacheResponse => {
            //Si estuvo en cache, lo va a regresar
            if(cacheResponse) return cacheResponse;
            //Sino estuvo en cache, lo va a buscar a la red
            return fetch(event.request).then(
                networkResponse => {
                    caches.open(dynamic_cache).then(cache => {
                        cache.put(event.request, networkResponse)
                        // Tarea: Funcion de limpiar el cache
                    })
                }
            )
        }
    ))
    
})

//Hola
function limpiarCache() {

    // Identificar al cache - keys
    // Borrarlo - delete
    //Actualizarlo
    
}
/*self.addEventListener('message', msj => {
    console.log('Mensaje desde el sw', + msj.data.action);
})*/


self.addEventListener('message', msj => {
    //Revisar si el msj tiene el mensaje skipWaiting
    if(msj.data.action == 'skipWaiting'){
        self.skipWaiting();
      
    }
})
