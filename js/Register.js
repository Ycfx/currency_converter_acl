import Toast from './Toast.js'
let toast = new Toast()
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./Sw.js').then(
        (reg) =>
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

            reg.addEventListener('updatefound', () => {
                _trackInstalling(reg.installing);
            });
        },
        () =>  toast.show('CLIENT: service worker registration failure.'))
}
else toast.show('CLIENT: service worker is not supported.');
 
function _trackInstalling(worker) {
    worker.addEventListener('statechange',() => {
      if (worker.state == 'installed') {
        toast.show('New version available.',['refresh', 'dismiss'],worker)
      }
    });
};
  
