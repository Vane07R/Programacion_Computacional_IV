let genDateId = () => {
    let date = new Date();
    return Math.floor(date.getTime() / 1000).toString(16);
}, db;

let app = new Vue ({
    el: '#appSistem',
    data: {
        forms: {
            'cliente': { mostrar: false },
            'producto': { mostrar: false },
            'proveedor': { mostrar: false },
            'categoria': { mostrar: false },
        }
    },
    methods: {
        openBd() {
            let indexDB = indexedDB.open('db_sistema_a2', 1);
            indexDB.onupgradeneeded = (e) => {
                let db = e.target.result;
                tblClients = db.createObjectStore('clients', { keyPath: 'idCli' });
                tblProducts = db.createObjectStore('products', { keyPath: 'idProd' });
                tblProviders = db.createObjectStore('providers', { keyPath: 'idProv' });
                tblCategories = db.createObjectStore('categories', { keyPath: 'idCat' });

                tblClients.createIndex('idCli', 'idCli', { unique: true });
                tblProducts.createIndex('cliCode', 'cliCode', { unique: false });

                tblProviders.createIndex('idProv', 'idProv', { unique: true });
                tblProviders.createIndex('provCode', 'provCode', { unique: false });

                tblCategories.createIndex('idCat', 'idCat', { unique: true });
                tblCategories.createIndex('catCode', 'catCode', { unique: false });

                tblProducts.createIndex('idProd', 'idProd', { unique: true });
                tblProducts.createIndex('prodCode', 'prodCode', { unique: false });
            };
            indexDB.onsuccess = (e) => {
                db = e.target.result;
            };
            indexDB.onerror = (e) => {
                console.log(e.target.error);
            };
        },
    },
    created(){
        this.openBd();
    }
});

document.addEventListener('DOMContentLoaded', (e) => {
    let $elements = document.querySelectorAll('.mostrar').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            app.forms[e.target.dataset.form].mostrar = true;
            app.$refs[e.target.dataset.form].getData();
        });
    });
});

function openStore(store, mode) {
    return db.transaction(store, mode).objectStore(store);
}