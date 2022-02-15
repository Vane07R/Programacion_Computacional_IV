Vue.component('componente-cliente', {
    data: () => {
        return {
            search: '',
            clients: [],
            cli: {
                show_msg: false,
                action: 0,
                msg: '',
                idCli: '',
                code: '',
                name: '',
                address: '',
                phone: '',
                dui: ''
            }
        }
    },
    methods: {
        getCli() {
            this.clients = [];
            if (localStorage.getItem('clients') != null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('clients')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('clients'))[i];
                    if (this.search.length > 0) {
                        if (data.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                            this.clients.push(data);
                        }
                    } else {
                        this.clients.push(data);
                    }
                }
            }
        },
        saveCli(){
            this.getCli();
            let cli = this.clients || [];
            let action = ['registrado', 'actualizado', 'eliminado'];
            if (this.cli.action == 0) {
                this.cli.idCli = genDateId();
                cli.push(this.cli);
            } else if (this.cli.action == 1) {
                let index = cli.findIndex(cli => cli.idCli == this.cli.idCli);
                cli[index] = this.cli;
            } else if (this.cli.action == 2) {
                let index = cli.findIndex(cli => cli.idCli == this.cli.idCli);
                cli.splice(index, 1);
            }
            localStorage.setItem('clients', JSON.stringify(cli));
            this.cli.show_msg = true;
            console.log(this.cli.action, `Se a ${action[this.cli.action]} correctamente el cliente`);
            this.cli.msg = `Se a ${action[this.cli.action]} correctamente el cliente`;
            this.newCli();
            this.getCli();
            console.log(this.cli.show_msg);
        },
        showCli(cli) {
            this.cli = JSON.parse(JSON.stringify(cli));
            this.cli.action = 1;
        },
        newCli() {
            this.cli.action = 0;
            this.cli.msg = '';
            this.cli.idCli = '';
            this.cli.code = '';
            this.cli.name = '';
            this.cli.address = '';
            this.cli.phone = '';
            this.cli.dui = '';
        },
        delCli(cli) {
            if (confirm(`¿Está seguro de eliminar el cliente ${cli.name}?`)) {
                this.cli.action = 2;
                localStorage.removeItem(cli.idCli);
                this.saveCli();
            }
            this.newCli();
        },
        searchCli(){
            this.getCli( this.search );
            this.clients.filter(cli => {
                if (cli.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                    return cli;
                }
            });
            console.log(this.clients, this.cli.search);
        }
    },
    created(){
        this.getCli();
    },
    template: `
    <div id="appCli">
        <form method="post" @submit.prevent="saveCli" @reset.prevent="newCli">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col col-md-2">Código:</div>
                    <div class="col col-md-2">
                        <input title="Ingrese el código" v-model="cli.code" type="text" class="form-control" required pattern="[0-9]{3,10}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-2">Nombre:</div>
                    <div class="col col-md-3">
                        <input title="Ingrese el nombre" v-model="cli.name" type="text" class="form-control" required pattern="[A-Za-zÑÁÉÍÓÚÜñáéíóúü ]{3,75}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-2">Dirección:</div>
                    <div class="col col-md-3">
                        <input title="Ingrese la dirección" v-model="cli.address" type="text" class="form-control" required pattern="[A-Za-zÑÁÉÍÓÚÜñáéíóúü0-9 ]{3,100}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-2">Teléfono:</div>
                    <div class="col col-md-2">
                        <input title="Ingrese el teléfono" v-model="cli.phone" type="text" class="form-control" required pattern="[0-9]{4}[-| ]{1}[0-9]{4}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-2">DUI</div>
                    <div class="col col-md-2">
                        <input title="Ingrese el DUI" v-model="cli.dui" type="text" class="form-control" required pattern="[0-9]{8}-[0-9]{1}">
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col col-md-5 text-center">
                        <div v-if="cli.show_msg" class="alert alert-primary alert-dismissible fade show" role="alert">
                            {{ cli.msg }}
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
                        Buscar: <input type="text" v-model="search" @keyup="searchCli" class="form-control" placeholder="Ingrese el nombre">
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
                <tr v-for="cli in clients" @click="showCli(cli)" :key="cli.idCli">
                    <td>{{ cli.code }}</td>
                    <td>{{ cli.name }}</td>
                    <td>{{ cli.address }}</td>
                    <td>{{ cli.phone }}</td>
                    <td>{{ cli.dui }}</td>
                    <td>
                        <button type="button" class="btn btn-danger" @click="delCli(cli)">
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