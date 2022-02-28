Vue.component('inscriptions', {
        data: () => {
            return{
            word: '',
            alumnos: [],
            inscripciones: [],
            materias: [],
            inscribir: {
                limit: 1,
                accion : 'nuevo',
                showMsg : false,
                msg : '',
                idInscribir: '',
                alumno: '',
                materias: []
            },
                
         }

    },
    methods: {
        buscandoInscrito() {
            this.obtenerInscripciones(this.word);
        },
        clearForm() {
            this.inscribir.accion = 'nuevo';
            this.inscribir.showMsg = false;
            this.inscribir.msg = '';
            this.inscribir.limit = 1;
            this.inscribir.idInscribir = '';
            this.inscribir.alumno = '';
            this.inscribir.materias = [];
            this.materias = [];
            this.obtenerMaterias();
            this.obtenerEstudiantes();
        },
        saveChanges() {
            this.obtenerInscripciones();
            let inscribir = this.inscripciones || [];
            if (this.inscribir.accion === 'nuevo') {
                this.inscribir.idInscribir = getUniqueId('_ins_');
                this.inscribir.alumno = this.alumnos.find(alumno => alumno.idStudent === this.inscribir.alumno);
                console.log(inscribir);
                inscribir.push(this.inscribir);
            } else if (this.inscribir.accion === 'editar') {
                let index = inscribir.findIndex(inscripcion => inscripcion.idInscribir === this.inscribir.idInscribir);
                console.log(this.inscribir.materias);
                inscribir[index] = this.inscribir;
            } else if (this.inscribir.accion === 'eliminar') {
                let index = inscribir.findIndex(inscripcion => inscripcion.idInscribir === this.inscribir.idInscribir);
                inscribir.splice(index, 1);
            }
            localStorage.setItem('inscripciones', JSON.stringify(inscribir));
            this.inscribir.showMsg = true;
            this.inscribir.msg = 'Se guardaron los cambios correctamente';
            this.obtenerInscripciones();
            this.clearForm();
        },
        eliminarInscrito(inscripcion) {
            if (confirm(`Esta seguro de eliminar la inscripcion/es de ${inscripcion.alumno.name} a ${this.inscribir.materias}?`)) {
                this.inscribir.idInscribir = inscripcion.idInscribir;
                this.inscribir.accion = 'eliminar';
                this.saveChanges();
                this.clearForm();
            }
        },
        modificarInscripcion(inscripcion) {
            this.inscribir.accion = 'editar';
            this.inscribir.showMsg = false;
            this.inscribir.msg = '';
            this.inscribir.limit = inscripcion.limit;
            this.inscribir.idInscribir = inscripcion.idInscribir;
            this.inscribir.alumno = inscripcion.alumno;
            this.inscribir.materias = inscripcion.materias;
            this.obtenerMaterias();
            this.materias = this.materias.filter(materia => !this.inscribir.materias.find(inscripcionMateria => inscripcionMateria.idMateria === materia.idMateria));
        },
        toggleSubject(toggle, materia) {
            if (toggle) {
                this.inscribir.materias.push(materia);
                this.materias.splice(this.materias.indexOf(materia), 1);
            } else {
                let i = this.inscribir.materias.indexOf(materia);
                this.materias.push(materia);
                this.inscribir.materias.splice(i, 1);
            }
        },
        validate() {
            if (this.inscribir.limit < 0) {
                if (this.inscribir.materias.length > this.inscribir.limit) {
                    this.inscribir.limit = this.inscribir.materias.length;
                } else {
                    this.inscribir.limit = 0;
                }
            } else if (this.inscribir.limit > 5) {
                this.inscribir.limit = 5;
            }
        },
        obtenerEstudiantes() {
            this.alumnos = [];
            if (localStorage.getItem('students') !== null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('students')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('students'))[i];
                    let inscripciones = this.inscripciones || [];
                    let inscrito = inscripciones.findIndex(x => x.alumno.idStudent === data.idStudent);
                    if (inscrito === -1) {
                        this.alumnos.push(data);
                    }
                }
            }
        },
        obtenerMaterias() {
            this.materias = [];
            if (localStorage.getItem('materias') !== null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('materias')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('materias'))[i];
                    this.materias.push(data);
                }
            }
        },
        obtenerInscripciones() {
            this.inscripciones = [];
            if (localStorage.getItem('inscripciones') !== null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('inscripciones')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('inscripciones'))[i];
                    if (this.word.length > 0) {
                        if (data.alumno.name.toLowerCase().includes(this.word.toLowerCase()) || data.alumno.lastname.toLowerCase().includes(this.word.toLowerCase()) || data.alumno.code.toLowerCase().includes(this.word.toLowerCase()) || data.materias.find(materia => materia.name.toLowerCase().includes(this.word.toLowerCase()))) {
                            this.inscripciones.push(data);
                        }
                    } else {
                        this.inscripciones.push(data);
                    }
                }
            }
        },
        close(target) {
            close(target);
        }
    },
    created() {
        this.obtenerInscripciones();
        this.obtenerMaterias();
        this.obtenerEstudiantes();
    },
    template: `
    <div class="p-4" id="inscriptions">
        <div class="grid grid-cols-1 gap-4 py-2 shadow-lg rounded-lg bg-gray-200/40">
            <div class="border-b-2 border-gray-400 bg-white pb-2 flex flex-col items-center rounded-lg justify-self-center sticky top-1">
            <div class="flex items-center">
                <h1 class="text-lg md:text-2xl font-bold">Incribir Materias</h1>
            </div>
            <div class="flex items-center">    
                <button class="bg-red-500 text-white w-fit p-2 rounded-lg" @click="close('inscriptions')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="container mx-auto border-2 border-stone-600 rounded-t-lg bg-neutral-800 w-11/12 h-fit">
            <div class="flex justify-between items-center p-4 bg-neutral-800 rounded-t-lg text-white">
                <h1 class="text-2xl font-bold">Inscribir Materias</h1>
                <div class="flex items-center">
                    <button data-target="form" onclick="showHide(this)" class="w-14 h-14 bg-neutral-800 hover:bg-neutral-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
            <form method="post" @submit.prevent="saveChanges" @reset.prevent="clearForm" id="form" class="bg-neutral-300 overflow-hidden h-fit">
                <div class="flex flex-wrap p-4">
                    <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <select v-model="inscribir.alumno" v-bind:disabled="inscribir.accion != 'nuevo'" required title="Seleccione al alumno" class="shadow border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option v-for="alumno in alumnos" :value="alumno.idStudent"> {{ alumno.lastname }}, {{ alumno.name }} - {{ alumno.code }} </option>
                        </select>
                    </div>
                    <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <div class="text-gray-700 text-sm font-bold h-full w-full px-3 py-2 rounded-r-lg bg-white" :class="{'bg-gray-100': inscribir.accion == 'nuevo'}">
                            <span v-if="inscribir.accion == 'editar'">{{ inscribir.alumno.lastname }}, {{ inscribir.alumno.name }} - {{ inscribir.alumno.code }}</span>
                        </div>
                    </div>
                    <div class="w-full md:w-1/4 mb-1 px-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        <input v-model="inscribir.limit" type="number" min="1" max="5" step="1" class="shadow border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" @input="validate" required title="Ingrese la cantidad de materias a inscribir" />
                    </div>
                    <div class="w-full"></div>
                    <div class="w-full h-1/2 md:w-1/2 mb-1 px-4">
                        <div class="w-1/1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-9 w-8 rounded-tl-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            <div class="text-gray-700 text-sm font-bold h-full w-full px-3 py-2 rounded-tr-lg bg-white" :class="{'bg-gray-100': inscribir.accion == 'nuevo'}">
                                Lista de Materias
                            </div>
                        </div>
                        <div class="w-1/1 p-2 flex flex-wrap border-2 border-gray-400 rounded-b-lg bg-white overflow-auto" style="max-height: 14rem;">
                            <div v-for="materia in materias" :class="{'bg-gray-100 border-2': inscribir.materias.length >= inscribir.limit}" class="w-full md:w-1/2 mb-1 px-4 flex items-center rounded-lg hover:bg-gray-100">
                                <label :class="{'cursor-not-allowed': inscribir.materias.length >= inscribir.limit}" class="w-full h-14 bg-transparent border-none focus:outline-none focus:shadow-outline flex items-center justify-between">
                                    <span class="text-gray-700 text-sm">{{ materia.name }}, {{ materia.from }}, {{ materia.to }} </span>
                                    <input type="button" class="hidden" @click="toggleSubject(true, materia)" :disabled="inscribir.materias.length >= inscribir.limit"/>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-1/2 md:w-1/2 mb-1 px-4">
                        <div class="w-1/1 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-9 w-8 rounded-tl-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                            </svg>
                            <div class="text-gray-700 text-sm font-bold h-full w-full px-3 py-2 rounded-tr-lg bg-white" :class="{'bg-gray-100': inscribir.accion == 'nuevo'}">
                                Materias Inscritas
                            </div>
                        </div>
                        <div class="w-1/1 py-2 flex flex-wrap border-2 border-gray-400 rounded-b-lg bg-white overflow-auto" style="max-height: 14rem;">
                            <div v-for="materia in inscribir.materias" class="w-full md:w-1/2 mb-1 px-4 flex items-center rounded-lg hover:bg-gray-100">
                                <label class="w-full h-14 bg-transparent border-none focus:outline-none focus:shadow-outline flex items-center justify-between">
                                    <span class="text-gray-700 text-sm">{{ materia.name }}, {{ materia.from }}, {{ materia.to }}</span>
                                    <input type="button" class="hidden" @click="toggleSubject(false, materia)" />
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                    </svg>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-end p-4 space-x-4">
                    <label>
                        <input type="reset" class="hidden">
                        <div class="bg-red-400 hover:bg-red-500 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                    </label>
                    <label :class="{'cursor-not-allowed': inscribir.limit != inscribir.materias.length}">
                        <input type="submit" class="hidden" :disabled="inscribir.limit != inscribir.materias.length">
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
                <h1 class="text-2xl font-bold">Lista de Inscripciones</h1>
                <div class="flex items-center">
                    <button data-target="table" onclick="showHide(this)" class="w-14 h-14 bg-neutral-800 hover:bg-neutral-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="table" class="bg-neutral-300 flex md:justify-start items-center p-4 text-white shadow-inner overflow-auto justify-start flex-row">
                <table class="table-auto w-full">
                    <thead class="bg-black bg-stripe bg-stripe-white">
                        <tr>
                            <th colspan="9" class="px-4 py-2 rounded-tl-lg bg-gray-200/25 duration-500">
                                <div class="flex justify-between items-center">
                                    <svg @click="buscandoInscrito" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-200/50 hover:bg-gray-200/75 duration-500 shadow-inner shadow-neutral-600 00 fill-gray-100/25 stroke-2 stroke-black">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input @keyup="buscandoInscrito" v-model="word" type="text" placeholder="Buscar" class="w-full h-full px-4 py-2 bg-gray-100 border-2 border-transparent rounded-lg text-gray-700">
                                </div>
                            </th>
                        </tr>
                        <tr class="text-white">
                            <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Alumno</th>
                            <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Materia</th>
                            <th class="bg-gray-200/25 hover:bg-gray-200/50 duration-500 px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="inscripcion in inscripciones" @click="modificarInscripcion(inscripcion)" :key="inscripcion.idinscrpcion" class="text-black hover:bg-gray-400 duration-500">
                            <td class="bg-gray-100 hover:bg-gray-200 duration-500 px-4 py-2">{{ inscripcion.alumno.lastname }}, {{ inscripcion.alumno.name }} - {{ inscripcion.alumno.code }}</td>
                            <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">
                                <li v-for="materia in inscripcion.materias" :key="materia.idMateria" class="text-gray-700 hover:text-gray-600 duration-500">{{ materia.name }}, {{ materia.day }}, {{ materia.from }} - {{ materia.to }}</li>
                            </td>
                            <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2 items-center">
                                <button @click="eliminarInscrito(inscripcion)">
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
   