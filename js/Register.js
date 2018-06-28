import Toast from './Toast.js'

let toast = new Toast()

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./Sw.js').then((reg) =>
    {
        
        if(!navigator.serviceWorker.controller)  
            return;

        if (reg.waiting) {
            toast.show('New version available.',['refresh', 'dismiss'],reg.waiting)
            return;
        }

        if (reg.installing) {
            _trackInstalling(reg.installing);
            return;
        }

        reg.addEventListener('updatefound', function() {
            _trackInstalling(reg.installing);
        });
    },
    () => {
        toast.show('CLIENT: service worker registration failure.')
    })
}
else toast.show('CLIENT: service worker is not supported.');

 
function _trackInstalling(worker) {
    var indexController = this;
    worker.addEventListener('statechange', function() {
      if (worker.state == 'installed') {
        toast.show('New version available.',['refresh', 'dismiss'],worker)
      }
    });
  };
  

let button_convert = document.getElementById('go_convert');
button_convert.addEventListener('click', (event) => {
    toast.show("youcfefef")
    toast.show("youcfefsdfdfdfdef")
});
 