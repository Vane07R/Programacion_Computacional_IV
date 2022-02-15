Vue.component('componente-categoria', {
    data: () => {
        return {
            search: '',
            categories: [],
            cat: {
                show_msg: false,
                action: 0,
                msg: '',
                idCat: '',
                code: '',
                name: '',
                address: '',
                phone: '',
                dui: ''
            }
        }
    },
    methods: {
        getCat() {
            this.categories = [];
            if (localStorage.getItem('categories') != null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('categories')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('categories'))[i];
                    if (this.search.length > 0) {
                        if (data.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                            this.categories.push(data);
                        }
                    } else {
                        this.categories.push(data);
                    }
                }
            }
        },
        saveCli(){
            this.getCat();
            let cat = this.categories || [];
            let action = ['registrado', 'actualizado', 'eliminado'];
            if (this.cat.action == 0) {
                this.cat.idCat = genDateId();
                cat.push(this.cat);
            } else if (this.cat.action == 1) {
                let index = cat.findIndex(cat => cat.idCat == this.cat.idCat);
                cat[index] = this.cat;
            } else if (this.cat.action == 2) {
                let index = cat.findIndex(cat => cat.idCat == this.cat.idCat);
                cat.splice(index, 1);
            }
            localStorage.setItem('categories', JSON.stringify(cat));
            this.cat.show_msg = true;
            console.log(this.cat.action, `Se a ${action[this.cat.action]} correctamente el cliente`);
            this.cat.msg = `Se a ${action[this.cat.action]} correctamente la categoría`;
            this.newCat();
            this.getCat();
            console.log(this.cat.show_msg);
        },
        showCat(cat) {
            this.cat = JSON.parse(JSON.stringify(cat));
            this.cat.action = 1;
        },
        newCat() {
            this.cat.action = 0;
            this.cat.msg = '';
            this.cat.idCat = '';
            this.cat.code = '';
            this.cat.name = '';
            this.cat.address = '';
            this.cat.phone = '';
            this.cat.dui = '';
        },
        delCat(cat) {
            if (confirm(`¿Está seguro de eliminar el cliente ${cat.name}?`)) {
                this.cat.action = 2;
                localStorage.removeItem(cat.idCat);
                this.saveCli();
            }
            this.newCat();
        },
        searchCat(){
            this.getCat( this.search );
            this.categories.filter(cat => {
                if (cat.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                    return cat;
                }
            });
            console.log(this.categories, this.cat.search);
        }
    },
    created(){
        this.getCat();
    },
    template: `
    <div id="appCat">
    Categoria
        <form method="post" @submit.prevent="saveCli" @reset.prevent="newCat">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col col-md-2">Código:</div>
                    <div class="col col-md-2">
                        <input title="Ingrese el código" v-model="cat.code" type="text" class="form-control" required pattern="[0-9]{3,10}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-2">Nombre:</div>
                    <div class="col col-md-3">
                        <input title="Ingrese el nombre" v-model="cat.name" type="text" class="form-control" required pattern="[A-Za-zÑÁÉÍÓÚÜñáéíóúü ]{3,75}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-2">Dirección:</div>
                    <div class="col col-md-3">
                        <input title="Ingrese la dirección" v-model="cat.address" type="text" class="form-control" required pattern="[A-Za-zÑÁÉÍÓÚÜñáéíóúü0-9 ]{3,100}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-2">Teléfono:</div>
                    <div class="col col-md-2">
                        <input title="Ingrese el teléfono" v-model="cat.phone" type="text" class="form-control" required pattern="[0-9]{4}[-| ]{1}[0-9]{4}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-2">DUI</div>
                    <div class="col col-md-2">
                        <input title="Ingrese el DUI" v-model="cat.dui" type="text" class="form-control" required pattern="[0-9]{8}-[0-9]{1}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-5 text-center">
                        <div v-if="cat.show_msg==true" class="alert alert-primary alert-dismissible fade show" role="alert">
                            {{ cat.msg }}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                    </div>
                </div>
                <div class="row p-2">
                    <div class="col col-md-5 text-center">
                        <input type="submit" value="Guardar" class="btn btn-primary">
                        <input type="reset" value="Nuevo" class="btn btn-warning">
                    </div>
                </div>
            </div>
        </form>
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th colspan="6">
                        Buscar: <input type="text" v-model="search" @keyup="searchCat" class="form-control" placeholder="Ingrese el nombre">
                    </th>
                </tr>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>DUI</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="cat in categories" @click="showCat(cat)" :key="cat.idCat">
                    <td>{{ cat.code }}</td>
                    <td>{{ cat.name }}</td>
                    <td>{{ cat.address }}</td>
                    <td>{{ cat.phone }}</td>
                    <td>{{ cat.dui }}</td>
                    <td>
                        <button type="button" class="btn btn-danger" @click="delCat(cat)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `
});