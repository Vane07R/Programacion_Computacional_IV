Vue.component('subjects', {
    data: () => {
        return {
            word: '',
            materias: [],
            days: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
            materia: {
                    accion: "nuevo",
                    idMateria: '',
                    name: '',
                    teacher: '',
                    day: '',
                    from: '',
                    to: '',
                    room: '',
            }
        }
    },
    methods: {
        getMaterias() {
            this.materias = [];
            if (localStorage.getItem('materias') !== null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('materias')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('materias'))[i];
                    if (this.word.length > 0) {
                        if (data.name.toLowerCase().includes(this.word.toLowerCase()) || data.teacher.toLowerCase().includes(this.word.toLowerCase())) {
                            this.materias.push(data);
                        }
                    } else {
                        this.materias.push(data);
                    }
                }
            }
        },
        saveChanges() {
            this.getMaterias();
            let materia = this.materias || [];
            if (this.materia.accion === 'nuevo') {
                this.materia.idMateria = getUniqueId('_mat_');
                materia.push(this.materia);
            } else if (this.materia.accion === 'editar') {
                let i = materia.findIndex(x => x.idMateria === this.materia.idMateria);
                materia[i] = this.materia;
            } else if (this.materia.accion === 'eliminar') {
                let i = materia.findIndex(x => x.idMateria === this.materia.idMateria);
                materia.splice(i, 1);
            }
            localStorage.setItem('materias', JSON.stringify(materia));
            this.materia.showMsg = true;
            this.materia.msg = 'Se guardaron los cambios correctamente';
            this.clearForm();
            this.getMaterias();
        },
        showMateria(Mat) {
            this.materia = JSON.parse(JSON.stringify(Mat));
            this.materia.accion = 'editar';
        },
        delMateria(Mat) {
            if (confirm(`¿Está seguro de eliminar el estudiante ${Mat.name}?`)) {
                this.materia.accion = 'eliminar';
                this.materia.idMateria = Mat.idMateria;
                this.saveChanges();
            }
        },
        clearForm() {
            this.materia.name = '';
            this.materia.teacher = '';
            this.materia.day = '';
            this.materia.from = '';
            this.materia.to= '';
            this.materia.room = '';
            this.materia.accion = 'nuevo';
        },
        searchMateria() {
            this.getMaterias();
        },
        close(target) {
            close(target);
        }
    },
    created() {
        this.getMaterias();
    },
    template: `
    <div class="p-4" id="subjects">
        <div class="grid grid-cols-1 gap-4 py-2 shadow-lg rounded-lg bg-gray-200/40">
            <div class="border-b-2 border-gray-400 bg-white pb-2 flex flex-col items-center rounded-lg justify-self-center sticky top-1">
                <div class="flex items-center">
                    <h1 class="text-lg md:text-2xl font-bold">Materias</h1>
                </div>
                <div class="flex items-center">    
                    <button class="bg-red-500 text-white w-fit p-2 rounded-lg" @click="close('subjects')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="container mx-auto border-2 border-stone-600 rounded-t-lg bg-neutral-800 w-11/12 h-fit">
                <div class="flex justify-between items-center p-4 bg-neutral-800 rounded-t-lg text-white">
                    <h1 class="text-2xl font-bold">Registro de Materias</h1>
                    <div class="flex items-center">
                        <button data-target="formMat" onclick="showHide(this)" class="w-14 h-14 bg-neutral-800 hover:bg-neutral-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form method="post" @submit.prevent="saveChanges" @reset.prevent="clearForm" id="formMat" class="bg-neutral-300 overflow-hidden h-fit">
                    <div class="flex flex-wrap p-4">
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-width="0.5" d="M 5 2 a 0.5 0.5 0 0 1 0.5 -0.5 c 0.862 0 1.573 0.287 2.06 0.566 c 0.174 0.099 0.321 0.198 0.44 0.286 c 0.119 -0.088 0.266 -0.187 0.44 -0.286 A 4.165 4.165 0 0 1 10.5 1.5 a 0.5 0.5 0 0 1 0 1 c -0.638 0 -1.177 0.213 -1.564 0.434 a 3.49 3.49 0 0 0 -0.436 0.294 V 7.5 H 9 a 0.5 0.5 0 0 1 0 1 h -0.5 v 4.272 c 0.1 0.08 0.248 0.187 0.436 0.294 c 0.387 0.221 0.926 0.434 1.564 0.434 a 0.5 0.5 0 0 1 0 1 a 4.165 4.165 0 0 1 -2.06 -0.566 A 4.561 4.561 0 0 1 8 13.65 a 4.561 4.561 0 0 1 -0.44 0.285 a 4.165 4.165 0 0 1 -2.06 0.566 a 0.5 0.5 0 0 1 0 -1 c 0.638 0 1.177 -0.213 1.564 -0.434 c 0.188 -0.107 0.335 -0.214 0.436 -0.294 V 8.5 H 7 a 0.5 0.5 0 0 1 0 -1 h 0.5 V 3.228 a 3.49 3.49 0 0 0 -0.436 -0.294 A 3.166 3.166 0 0 0 5.5 2.5 A 0.5 0.5 0 0 1 5 2 z M 10 5 v 7 h 4 a 2 2 0 0 0 2 -2 V 6 a 2 2 0 0 0 -2 -2 h -4 z M 6 5 V 4 H 2 a 2 2 0 0 0 -2 2 v 4 a 2 2 0 0 0 2 2 h 4 v -1 z"/>
                            </svg>
                            <input v-model="materia.name" type="text" required pattern="(^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{1,20})+(([\s][A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{1,20})+)*$" title="Ingrese el nombre de la materia" placeholder="Nombre" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-width="0.5" d="M 5 2 a 0.5 0.5 0 0 1 0.5 -0.5 c 0.862 0 1.573 0.287 2.06 0.566 c 0.174 0.099 0.321 0.198 0.44 0.286 c 0.119 -0.088 0.266 -0.187 0.44 -0.286 A 4.165 4.165 0 0 1 10.5 1.5 a 0.5 0.5 0 0 1 0 1 c -0.638 0 -1.177 0.213 -1.564 0.434 a 3.49 3.49 0 0 0 -0.436 0.294 V 7.5 H 9 a 0.5 0.5 0 0 1 0 1 h -0.5 v 4.272 c 0.1 0.08 0.248 0.187 0.436 0.294 c 0.387 0.221 0.926 0.434 1.564 0.434 a 0.5 0.5 0 0 1 0 1 a 4.165 4.165 0 0 1 -2.06 -0.566 A 4.561 4.561 0 0 1 8 13.65 a 4.561 4.561 0 0 1 -0.44 0.285 a 4.165 4.165 0 0 1 -2.06 0.566 a 0.5 0.5 0 0 1 0 -1 c 0.638 0 1.177 -0.213 1.564 -0.434 c 0.188 -0.107 0.335 -0.214 0.436 -0.294 V 8.5 H 7 a 0.5 0.5 0 0 1 0 -1 h 0.5 V 3.228 a 3.49 3.49 0 0 0 -0.436 -0.294 A 3.166 3.166 0 0 0 5.5 2.5 A 0.5 0.5 0 0 1 5 2 z M 10 5 v 7 h 4 a 2 2 0 0 0 2 -2 V 6 a 2 2 0 0 0 -2 -2 h -4 z M 6 5 V 4 H 2 a 2 2 0 0 0 -2 2 v 4 a 2 2 0 0 0 2 2 h 4 v -1 z"/>
                            </svg>
                            <input v-model="materia.teacher" type="text" required pattern="(^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{1,20})+(([\s][A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{1,20})+)*$" title="Ingrese el nombre del docente" placeholder="Docente" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/4 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24" class="h-full w-12 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <text x="24" y="15" font-family="Verdana" font-size="10">De</text>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <input v-model="materia.from" type="time" required title="Ingrese la hora de inicio de la materia" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/4 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 24" class="h-full w-12 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <text x="24" y="15" font-family="Verdana" font-size="10">A</text>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <input v-model="materia.to" type="time" required title="Ingrese la hora de fin de la materia" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <input v-model="materia.room" type="text" required pattern="^[#._0-9a-zA-Z\\s,-]+$" title="Ingrese el salón de la materia" placeholder="Salón de la matería" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/4 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <select v-model="materia.day" required title="Ingrese en que día la semana hay clases" class="shadow border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option value="">Dias de la semana</option>
                                <option v-for="day in days" :value="day">{{ day }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex items-center justify-end p-4 space-x-4">
                        <input type="reset" id="resetMat" class="hidden">
                        <label for="resetMat">
                            <div class="bg-red-400 hover:bg-red-500 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </label>
                        <input type="submit" class="hidden" id="saveMat">
                        <label for="saveMat">
                            <div class="bg-green-500 hover:bg-green-600 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </label>
                    </div>
                </form>
            </div>
            <div class="container mx-auto border-2 border-stone-600 rounded-t-lg w-11/12 h-fit bg-neutral-800">
                <div class="flex justify-between items-center p-4 bg-neutral-800 rounded-lg text-white">
                    <h1 class="text-2xl font-bold">Lista de Materias</h1>
                    <div class="flex items-center">
                        <button data-target="tableMat" onclick="showHide(this)" class="w-14 h-14 bg-neutral-800 hover:bg-neutral-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="tableMat" class="bg-neutral-300 flex md:justify-start items-center p-4 text-white shadow-inner overflow-auto justify-start flex-row">
                    <table class="table-auto w-full">
                        <thead class="bg-black bg-stripe bg-stripe-white">
                            <tr>
                                <th colspan="9" class="px-4 py-2 rounded-tl-lg bg-gray-200/25 duration-500">
                                    <div class="flex justify-between items-center">
                                        <svg @click="searchMateria" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-10 w-8 rounded-l-lg bg-white hover:bg-gray-300 duration-500 fill-gray-100/25 stroke-2 stroke-black">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input @keyup="searchMateria" v-model="word" type="text" placeholder="Buscar" class="w-full h-10 px-4 py-2 bg-gray-100 border-2 border-transparent rounded-r-lg text-gray-700">
                                    </div>
                                </th>
                            </tr>
                            <tr class="text-white">
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Nombre</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Docente</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Día</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Entrada</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Salida</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Salón</th>
                                <th class="bg-gray-200/25 hover:bg-gray-200/50 duration-500 px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="materia in materias" @click="showMateria(materia)" :key="materia.idMateria" class="text-black hover:bg-gray-400 duration-500">
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 px-4 py-2">{{ materia.name}}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ materia.teacher }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ materia.day }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ materia.from }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ materia.to }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ materia.room }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2 items-center">
                                    <button @click="delMateria(materia)">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="h-8 w-8 duration-500 fill-red-500 stroke-0">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    `
});