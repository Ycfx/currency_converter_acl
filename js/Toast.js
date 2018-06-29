export default class Toast {
    constructor() {
        this.toast = document.getElementById('toast');
        this.toast_content = document.getElementById('toast-content');
        this.toast_dismiss = document.getElementById('toast-dismiss');
        this.toast_dismiss.classList.add('hide')
        this.toast_refresh = document.getElementById('toast-refresh');
        this.toast_refresh.classList.add('hide')
    }
  
    show(message, buttons = ['dismiss'],worker) {
        this.worker = worker
        this.message = message
        this.toast_content.innerHTML = this.message
        this.toast.classList.remove('hide');

        if(buttons.includes('dismiss')){
            this.toast_dismiss.classList.remove('hide')
            this.toast_dismiss.addEventListener('click', (event) => {
                this.close();
            });
        }

        if(buttons.includes('refresh')){
            this.toast_refresh.classList.remove('hide')
            this.toast_refresh.addEventListener('click', (event) => {
                this.refresh();
            });
        }
    
    }

    close(){
        this.toast.classList.add('hide'); 
    }

    refresh(){
        this.worker.postMessage({action: 'skipWaiting'});
        this.close();
    }
}