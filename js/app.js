if('serviceWorker' in navigator){
    navigator.serviceWorker.register('js/sw.js')
    .then(()=>{console.log('service worker registered')})
    .catch(()=>{console.log("SW not registered")})
}