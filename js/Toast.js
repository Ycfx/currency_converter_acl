export default class Toast {
    constructor(message) {
        this.message = message;
        this.toast = document.getElementById('toast');
        this.toast.addEventListener('click', (event) => {
            this.toast.classList.add('hide');
        });
    }
  
    show(message = this.message) {
        this.message = message
        this.toast.innerHTML = this.message
        this.toast.classList.remove('hide');
    }

    close(){
        this.toast.classList.add('hide'); 
    }
}