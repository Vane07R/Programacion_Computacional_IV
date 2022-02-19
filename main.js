function getUniqueId(prefix) {
    return prefix + Math.random().toString(36).substr(2, 9);
}

function showHide(el) {
    let target = el.getAttribute('data-target');
    let element = $('#' + target);
    $(element).slideToggle();
    el.classList.toggle('rotate-180');
}

console.log(getUniqueId('id'));

let app = new Vue({
    el: '#appAcademic',
    data: {
        forms: {
            'students': { show: false },
            'teachers': { show: false },
            'subjects': { show: false },
            'registers': { show: false },
        }
    },
    methods: {
    },
    created() {
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let $el = document.querySelectorAll('.show').forEach((el, i) => {
        el.addEventListener('click', e => {
            app.forms[e.target.dataset.form].show = true;
        });
    });
});