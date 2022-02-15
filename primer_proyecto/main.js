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
})

document.addEventListener('DOMContentLoaded', () => {
    let $elements = document.querySelectorAll('.mostrar').forEach((element, index) => {
        element.addEventListener('click', (e) => {
            app.forms[e.target.dataset.form].mostrar = true;
        });
    });
});