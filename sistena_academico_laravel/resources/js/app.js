/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.db = '';
window.idUnicoFecha = ()=>{
    let fecha = new Date();
    return Math.floor(fecha.getTime()/1000).toString(16);
},
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('alumno-component', require('./components/AlumnoComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data: {
        forms: {
            alumno: {mostrar: false},
            materia: {mostrar: false},
            docente: {mostrar: false},
        }
    },
    methods: {
        abrirForms(form) {
            this.forms[form].mostrar = !this.forms[form].mostrar;
        },
        abrirBD() {
            let indexDb = indexedDB.open('db_sistema',1);
            indexDb.onupgradeneeded = (e)=>{
                let db = e.target.result,
                tblalumnos = db.createObjectStore('alumnos',{ keyPath: 'idAlumno' }),
                tblmaterias = db.createObjectStore('materias',{ keyPath: 'idMateria' }),
                tbldocentes = db.createObjectStore('docentes',{ keyPath: 'idDocente' });

                tblalumnos.createIndex('idAlumno','idAlumno', { unique: true });
                tblalumnos.createIndex('codigo', 'codigo',{unique:false});
                tblalumnos.createIndex('id','id',{ unique: false });

                tbldocentes.createIndex('idDocente','idDocente',{ unique: true });
                tbldocentes.createIndex('codigo','codigo',{ unique: false });

                tblmaterias.createIndex('idCategroia','idMateria', { unique: true });
                tblmaterias.createIndex('codigo','codigo', { unique: false });
            };
            indexDb.onsuccess = (e)=>{
                db = e.target.result;
            };
            indexDb.onerror = (e)=>{
                console.log(e.target.error);
            };
        },
    },
    created() {
        this.abrirBD();
    }
});
