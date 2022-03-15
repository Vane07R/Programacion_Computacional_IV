let genDateId = () => {
    let date = new Date();
    return Math.floor(date.getTime() / 1000).toString(16);
};

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
        
    },
    created(){
    }
});

document.addEventListener('DOMContentLoaded', e => {
    let $elements = document.querySelectorAll('.mostrar').forEach(element => {
        element.addEventListener('click', e => {
            let form = e.target.dataset.form;
            app.forms[form].mostrar = true;
            // app.$refs[form].getData();
        });
    });
});