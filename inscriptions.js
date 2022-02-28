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
    },
    created() {
        this.obtenerInscripciones();
        this.obtenerMaterias();
        this.obtenerEstudiantes();
    },
    template: `
    <div class="grid grid-cols-1 gap-4 p-4">
        <div class="border-b-2 border-gray-400 bg-white pb-2 flex flex-col items-center rounded-lg justify-self-center sticky top-1">
        <div class="flex items-center">
            <h1 class="text-2xl font-bold">Incribir Materias</h1>
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
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-transparent shadow-inner shadow-neutral-600 00 fill-gray-100 stroke-1 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <select v-model="inscribir.alumno" v-bind:disabled="inscribir.accion != 'nuevo'" required title="Seleccione al alumno" class="shadow border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option v-for="alumno in alumnos" :value="alumno.idStudent"> {{ alumno.lastname }}, {{ alumno.name }} - {{ alumno.code }} </option>
                    </select>
                </div>
                <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-transparent shadow-inner shadow-neutral-600 00 fill-gray-100 stroke-1 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <div class="text-gray-700 text-sm font-bold h-full w-full px-3 py-2 rounded-r-lg bg-white" :class="{'bg-gray-100': inscribir.accion == 'nuevo'}">
                        <span v-if="inscribir.accion == 'editar'">{{ inscribir.alumno.lastname }}, {{ inscribir.alumno.name }} - {{ inscribir.alumno.code }}</span>
                    </div>
                </div>
                <div class="w-full md:w-1/4 mb-1 px-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="h-full w-8 rounded-l-lg bg-transparent shadow-inner shadow-neutral-600 00 fill-gray-100 stroke-1 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0.5" d="M 12.438 1.668 V 7 H 11.39 V 2.684 h -0.051 l -1.211 0.859 v -0.969 l 1.262 -0.906 h 1.046 z M 11.36 14.098 c -1.137 0 -1.708 -0.657 -1.762 -1.278 h 1.004 c 0.058 0.223 0.343 0.45 0.773 0.45 c 0.824 0 1.164 -0.829 1.133 -1.856 h -0.059 c -0.148 0.39 -0.57 0.742 -1.261 0.742 c -0.91 0 -1.72 -0.613 -1.72 -1.758 c 0 -1.148 0.848 -1.835 1.973 -1.835 c 1.09 0 2.063 0.636 2.063 2.687 c 0 1.867 -0.723 2.848 -2.145 2.848 z m 0.062 -2.735 c 0.504 0 0.933 -0.336 0.933 -0.972 c 0 -0.633 -0.398 -1.008 -0.94 -1.008 c -0.52 0 -0.927 0.375 -0.927 1 c 0 0.64 0.418 0.98 0.934 0.98 z M 4.5 2.5 a 0.5 0.5 0 0 0 -1 0 v 9.793 l -1.146 -1.147 a 0.5 0.5 0 0 0 -0.708 0.708 l 2 1.999 l 0.007 0.007 a 0.497 0.497 0 0 0 0.7 -0.006 l 2 -2 a 0.5 0.5 0 0 0 -0.707 -0.708 L 4.5 12.293 V 2.5 z M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                    </svg>
                    <input v-model="inscribir.limit" type="number" min="1" max="5" step="1" class="shadow border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" @input="validate" required title="Ingrese la cantidad de materias a inscribir" />
                </div>
                <div class="w-full md:w-full mb-1 px-4 flex items-center"></div>
                <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-transparent shadow-inner shadow-neutral-600 00 fill-gray-100 stroke-1 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <div class="text-gray-700 text-sm font-bold h-full w-full px-3 py-2 rounded-r-lg bg-white" :class="{'bg-gray-100': inscribir.accion == 'nuevo'}">
                        Lista de Materias
                    </div>
                </div>
                <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-transparent shadow-inner shadow-neutral-600 00 fill-gray-100 stroke-1 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div class="text-gray-700 text-sm font-bold h-full w-full px-3 py-2 rounded-r-lg bg-white" :class="{'bg-gray-100': inscribir.accion == 'nuevo'}">
                        Materias Inscritas
                    </div>
                </div>
                <div class="w-full h-1/2 md:w-1/2 mb-1 px-4 flex items-center">
                    <div class="w-full p-2 flex flex-wrap border-2 border-gray-400 rounded-r-lg bg-white">
                        <div v-for="materia in materias" :class="{'bg-gray-100 border-2': inscribir.materias.length >= inscribir.limit}" class="w-full md:w-1/2 mb-1 px-4 flex items-center rounded-lg hover:bg-gray-100">
                            <label :class="{'cursor-not-allowed': inscribir.materias.length >= inscribir.limit}" class="h-14 bg-transparent border-none focus:outline-none focus:shadow-outline flex items-center justify-between">
                                <span class="text-gray-700 text-sm">{{ materia.name }}, {{ materia.from }}, {{ materia.to }} </span>
                                <input type="button" class="hidden" @click="toggleSubject(true, materia)" :disabled="inscribir.materias.length >= inscribir.limit"/>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="w-full h-1/2 md:w-1/2 mb-1 px-4 flex items-center">
                    <div class="w-full py-2 flex flex-wrap border-2 border-gray-400 rounded-r-lg bg-white">
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
        <div id="table" class="bg-neutral-300 flex flex-col justify-center items-center p-4 text-white shadow-inner">
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
`




});
   