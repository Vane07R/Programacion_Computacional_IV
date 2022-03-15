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
            indexDB.onsuccess = (e) => {
                let db = e.target.result;
                tblClients = db.transaction('clients', 'readwrite').objectStore('clients');
                tblProducts = db.transaction('products', 'readwrite').objectStore('products');
                tblProviders = db.transaction('providers', 'readwrite').objectStore('providers');
                tblCategories = db.transaction('categories', 'readwrite').objectStore('categories');

                tblClients.createIndex('idCli', 'idCli', { unique: true });
                tblProducts.createIndex('cliCode', 'cliCode', { unique: false });

                tblProviders.createIndex('idProv', 'idProv', { unique: true });
                tblProviders.createIndex('provCode', 'provCode', { unique: false });

                tblCategories.createIndex('idCat', 'idCat', { unique: true });
                tblCategories.createIndex('catCode', 'catCode', { unique: false });

                tblProducts.createIndex('idProd', 'idProd', { unique: true });
                tblProducts.createIndex('prodCode', 'prodCode', { unique: false });
                tblProducts.createIndex('id', 'id', { unique: false });
            };
            indexDB.onsuccess = (e) => {
                db = e.target.result;
            };
            indexDB.onerror = (e) => {
                console.log(e.target.errorCode);
            };
        },
    },
    created(){
        this.openBd();
    }
});

document.addEventListener('DOMContentLoaded', e => {
    let $elements = document.querySelectorAll('.mostrar').forEach(element => {
        element.addEventListener('click', e => {
            let form = e.target.dataset.form;
            app.forms[form].mostrar = true;
            app.$refs[form].getData();
        });
    });
});

function openStore(store, mode) {
    return db.transaction(store, mode).objectStore(store);
}