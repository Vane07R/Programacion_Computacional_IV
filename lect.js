Vue.component('lect', {
    data: () => {
        return {
            search: '',
            lecturas: [],
            clients: [],
            lect: {
                show_msg: false,
                action: 0,
                msg: '',
                idLect: '',
                idCli: '',
                date: '',
                last_lect: '',
                new_lect: '',
                total: 0.00,
            }
        }
    },
    methods: {
        getLect() {
            this.lecturas = [];
            if (localStorage.getItem('lecturas') != null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('lecturas')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('lecturas'))[i];
                    if (this.search.length > 0) {
                        if (data.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || data.code.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                            this.lecturas.push(data);
                        }
                    } else {
                        this.lecturas.push(data);
                    }
                }
            }
        },
        getCli() {
            this.clients = [];
            if (localStorage.getItem('clients') != null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('clients')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('clients'))[i];
                    if (this.search.length > 0) {
                        if (data.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 || data.code.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                            this.clients.push(data);
                        }
                    } else {
                        this.clients.push(data);
                    }
                }
            }
        },
        saveChanges() {
            this.getLect();
            let lect = this.lecturas || [];
            let action = ['registrado', 'actualizado', 'eliminado'];
            if (this.lect.action == 0) {
                this.lect.idLect = getUniqueId('lect_id_');
                lect.push(this.lect);
            }
            else if (this.lect.action == 1) {
                let index = lect.findIndex(lect => lect.idLect == this.lect.idLect);
                lect[index] = this.lect;
            }
            else if (this.lect.action == 2) {
                let index = lect.findIndex(lect => lect.idLect == this.lect.idLect);
                lect.splice(index, 1);
            }
            localStorage.setItem('lecturas', JSON.stringify(lect));
            this.lect.show_msg = true;
            this.lect.msg = `Se a ${action[this.lect.action]} correctamente la lectura`;
            this.newLect();
            this.getLect();
        },
        showLect(lect) {
            this.lect = JSON.parse(JSON.stringify(lect));
            this.lect.action = 1;
        },
        delLect(lect) {
            if(confirm(`¿Estas seguro de eliminar la lectura ${lect.name}?`)) {
                this.lect.action = 2;
                localStorage.removeItem(lect.idLect);
                this.saveChanges();
            }
        },
        newLect() {
            this.lect = {
                show_msg: false,
                action: 0,
                msg: '',
                idLect: '',
                idCli: '',
                date: '',
                last_lect: '',
                new_lect: '',
                total: 0.00,
            }
        },
        searchLect() {
            this.getLect(this.search);
            this.lecturas.filter(lect => {
                if (lect.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1) {
                    return lect;
                }
            });
        }
    },
    created(){
        this.getLect();
        this.getCli();
    },
    template: `
        <div>
            <form class="max-w-fit mx-auto mb-4" method="post" @submit.prevent="saveChanges" @reset.prevent="newLect">
                <div class="font-semibold bg-gray-200 text-gray-700 py-3 px-6 mb-0 rounded-lg shadow-md flex justify-between">
                    <h1 class="text-xl text-center">Insertar Lectura de Agua</h1>
                    <!--button type="button" class="text-gray-500 hover:text-gray-400 px-4 py-2 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                        </svg>
                    </button -->
                </div>
                <div class="p-6 bg-white rounded-lg shadow-md flex flex-col">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="code">
                            Cliente
                        </label>
                        <select name="code" v-model="lect.code" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option v-for="client in clients" :value="client.code">{{ client.name }}</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
                            Fecha
                        </label>
                        <input type="date" name="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="lect.date" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="last_lect">
                            Lectura Anterior
                        </label>
                        <input type="number" name="last_lect" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="lect.last_lect" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="new_lect">
                            Lectura Nueva
                        </label>
                        <input type="number" name="new_lect" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="lect.new_lect" required>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="total">
                            Total
                        </label>
                        <input type="number" name="total" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="lect.total" required>
                    </div>
                    <div class="flex justify-end space-x-4">
                        <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Guardar">
                        <input type="reset" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" value="Cancelar">
                        <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                        </button>
                        <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="reset">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button> -->
                    </div>
                </div>
            </form>
            <table class="table-auto mx-auto overflow-auto max-w-fit">
                <tr>
                    <th colspan="6" class="px-4 py-2 bg-gray-200 text-gray-700 font-bold">
                        Buscar: <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="search" @keyup="searchLect">
                    </th>
                </tr>
                <thead>
                    <tr class="text-center bg-gray-200 text-gray-700">
                        <th class="px-4 py-2 hover:bg-gray-300">Código</th>
                        <th class="px-4 py-2 hover:bg-gray-300">Nombre</th>
                        <th class="px-4 py-2 hover:bg-gray-300">Dirección</th>
                        <th class="px-4 py-2 hover:bg-gray-300">Zona</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="lect in lecturas" @lectck="showLect(lect)" :key="lect.idLect" class="hover:bg-gray-100">
                        <td class="border px-4 py-2">{{ lect.code }}</td>
                        <td class="border px-4 py-2">{{ lect.name }}</td>
                        <td class="border px-4 py-2">{{ lect.direction }}</td>
                        <td class="border px-4 py-2">{{ lect.zone }}</td>
                        <td class="border px-4 py-2">
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @lectck="delLect(lect)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
});