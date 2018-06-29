
import Select from '../libs/select/select.min.js'
import Toast from './Toast.js'
import '../libs/idb/idb.js';

class Converter {
    constructor() {
        this.toast = new Toast()
        this.api_version = 5;
        this.base_url = `https://free.currencyconverterapi.com/api/v${this.api_version}`;
        
        this.from_select = document.getElementById('from-select');
        this.to_select = document.getElementById('to-select');
        this.amount = document.getElementById('amount');
        this.loader_container = document.getElementById('loader_container');
        this.box_result = document.getElementById('box-result');
        this.go_convert = document.getElementById('go_convert');

        go_convert.addEventListener('click', (event) => {
            this.convert()
        });

        this._dbPromise = this.openDatabase();
    }

    init(){
        this._dbPromise.then(db => {
            return db.transaction('currencies')
              .objectStore('currencies').getAll();
        }).then(elements => {
            this.fillSelect(elements)
            this.fetchCurrencies()
        });
    }

    fetchCurrencies()
    {
        this.showLoader()
        fetch(`${this.base_url}/currencies`)
        .then((response) => response.json())
        .then((response) => {
            let this2 = this
            this._dbPromise.then((db) => {
                const tx = db.transaction('currencies', 'readwrite');
                const currenciesStore = tx.objectStore('currencies');

                for(const [key,value] of Object.entries(response.results))
                    currenciesStore.put(value)

                this2.fillSelect(Object.values(response.results))
                this2.buildSelectUI()
                this2.hideLoader()
            })
        })
        .catch(() => {
            this.buildSelectUI()
            this.hideLoader()
            this.toast.show('Failure to fetch data!')
        });
    }

    fillSelect(elements = [])
    {
        for(const element of elements)
        {
            let option = document.createElement("option");
            option.value = element.id;
            option.text = `${element.id} - ${element.currencyName}`;
            this.from_select.add(option);
            this.to_select.add(option.cloneNode(true));
        };
    }
    buildSelectUI()
    {
        new Select('#from-select',{
            filtered: 'auto',
            filter_threshold: 8,
            filter_placeholder: 'Filter'
        });
        new Select('#to-select',{
            filtered: 'auto',
            filter_threshold: 8,
            filter_placeholder: 'Filter'
        });
    }

    showLoader(){
        this.loader_container.classList.remove('hide')
    }
    
    hideLoader(){
        this.loader_container.classList.add('hide')
    }

    convert()
    {
        this.box_result.classList.add('hide')

        if(!this.from_select.value || !this.to_select.value)
        {
            this.toast.show('Please the currencies to convert.')
            return;
        }
        if(!this.amount.value || isNaN(this.amount.value))
        {
            this.amount.value = ""
            this.toast.show('Please enter a number in the Amount field.')
            return;
        }
        
        this.showLoader()
        const operation = `${this.from_select.value}_${this.to_select.value}`;
        fetch(`${this.base_url}/convert?q=${operation}&compact=ultra`)
        .then((response) => response.json())
        .then((response) => {
            const rate = response[operation] ? response[operation] : 0;
            const total = this.amount.value * rate;
            this.box_result.innerHTML =  `${total.toLocaleString()} ${this.to_select.value}`
            this.box_result.classList.remove('hide')
            this.hideLoader()
        })
        .catch(() => {
            this.hideLoader()
            this.toast.show('Failure to fetch data!')
        });


    }

    openDatabase() {
        if (!navigator.serviceWorker){
          return Promise.resolve();
        }
      
        return idb.open('cconverter', 1, (upgradeDb) => {
          const currencies = upgradeDb.createObjectStore('currencies', {keyPath: 'id'});
        });
      }
}

const converter = new Converter();
converter.init();