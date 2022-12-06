
self.addEventListener('install', e=>{
    
    caches.open('cache-v1')
    .then(cache =>{
        
        cache.addAll([
            './',
            'index.html',
            'css/style.css',
            'app.js',
            'images/1.png',
            'images/2.png',
            'images/3.png',
            'images/facebook.png',
            'images/instagram.png',
            'images/twiter.png',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css',
            'Curso.mp4',
            'Tampa.mp4',
            'Crujiente.mp4',
            
        ])
    });
    e.waitUntil(cacheProm);
});

self.addEventListener('fetch', e =>{
    //cache-only
    const respuesta = caches.match( e.request )
    .then ( res => {
        if ( res ) return res;
        //no existe el archivo
        //tengo que ir a la web
        console.log('No existe', e.request.url);
        return fetch( e.request ).then ( newResp => {
            caches.open('cache-v1')
                .then( cache => {
                    cache.put( e.request, newResp);
                }

                )
            return newResp.clone;
        });
    });
    e.respondWith(respuesta);
})