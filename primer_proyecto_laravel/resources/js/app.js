/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue').default;

window.getUniqueId = (prefix) => {
    return prefix + Math.random().toString(36).substr(2, 9);
}

window.showHide = (el) => {
    let target = el.getAttribute('data-target');
    let element = $('#' + target);
    $(element).slideToggle();
    el.classList.toggle('rotate-180');
}

window.close = (target) => {
    app.forms[target].show = !app.forms[target].show;
}

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('students-component', require('./components/StudentComponent.vue').default);
Vue.component('subjects', require('./components/SubjectComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data:{
        forms:{
            students:{show:false},
            subjects:{show:false},
            inscriptions:{show:false},
        },
        darkMode: false,
    },
    methods:{
        openForm(form){
            this.forms[form].show = !this.forms[form].show;
            this.$refs[form].getData();
        }
    },
    created(){}
});
