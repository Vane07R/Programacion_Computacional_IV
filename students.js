Vue.component('students', {
    data: () => {
        return {
            word: '',
            students: [],
            student: {
                showMsg: false,
                msg: '',
                accion: 'nuevo',
                idStudent: '',
                code: '',
                name: '',
                lastname: '',
                birth: '',
                phone: '',
                email: '',
                address: '',
                dui: '',
            }
        }
    },
    methods: {
        getStudents() {
            this.students = [];
            if (localStorage.getItem('students') !== null) {
                for (let i = 0; i < JSON.parse(localStorage.getItem('students')).length; i++) {
                    let data = JSON.parse(localStorage.getItem('students'))[i];
                    if (this.word.length > 0) {
                        if (data.name.toLowerCase().includes(this.word.toLowerCase()) || data.lastname.toLowerCase().includes(this.word.toLowerCase()) || data.code.toLowerCase().includes(this.word.toLowerCase())) {
                            this.students.push(data);
                        }
                    } else {
                        this.students.push(data);
                    }
                }
            }
        },
        saveChanges() {
            this.getStudents();
            let student = this.students || [];
            if (this.student.accion === 'nuevo') {
                this.student.idStudent = getUniqueId('_std_');
                student.push(this.student);
            } else if (this.student.accion === 'editar') {
                let i = student.findIndex(x => x.idStudent === this.student.idStudent);
                student[i] = this.student;
            } else if (this.student.accion === 'eliminar') {
                let i = student.findIndex(x => x.idStudent === this.student.idStudent);
                student.splice(i, 1);
            }
            localStorage.setItem('students', JSON.stringify(student));
            this.student.showMsg = true;
            this.student.msg = 'Se guardaron los cambios correctamente';
            this.clearForm();
            this.getStudents();
        },
        showEstudent(Est) {
            this.student = JSON.parse(JSON.stringify(Est));
            this.student.accion = 'editar';
        },
        delStudent(Est) {
            if (confirm(`¿Está seguro de eliminar el estudiante ${Est.code}?`)) {
                this.student.accion = 'eliminar';
                this.student.idStudent = Est.idStudent;
                this.saveChanges();
            }
        },
        clearForm() {
            this.student.accion = 'nuevo';
            this.student.idStudent = '';
            this.student.code = '';
            this.student.name = '';
            this.student.lastname = '';
            this.student.birth = '';
            this.student.phone = '';
            this.student.email = '';
            this.student.address = '';
            this.student.dui = '';
        },
        searchStudent() {
            this.getStudents();
        },
        close(target) {
            close(target);
        }
    },
    created() {
        this.getStudents();
    },
    template: `
    <div class="p-4" id="students">
        <div class="grid grid-cols-1 gap-4 py-2 shadow-lg rounded-lg bg-gray-200/40">
            <div class="border-b-2 border-gray-400 bg-white pb-2 flex flex-col items-center rounded-lg justify-self-center sticky top-1">
                <div class="flex items-center">
                    <h1 class="text-lg md:text-2xl font-bold">Estudiantes</h1>
                </div>
                <div class="flex items-center">    
                    <button class="bg-red-500 text-white w-fit p-2 rounded-lg" @click="close('students')">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="container mx-auto border-2 border-stone-600 rounded-t-lg bg-neutral-800 w-11/12 h-fit">
                <div class="flex justify-between items-center p-4 bg-neutral-800 rounded-t-lg text-white overflow-hidden">
                    <h1 class="text-2xl font-bold">Registro de Alumnos</h1>
                    <div class="flex items-center">
                        <button data-target="form" onclick="showHide(this)" class="w-14 h-14 bg-neutral-800 hover:bg-neutral-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <form method="post" @submit.prevent="saveChanges" @reset.prevent="clearForm" id="form" class="bg-neutral-300 overflow-hidden h-fit">
                    <div class="flex flex-wrap p-4">
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M 10 9 L 8 15 L 10 9 L 12 15 M 9 15 L 12 15 m 3 -5 L 16 9 L 16 15 M 5 20 h 14 a 2 2 0 0 0 2 -2 V 6 a 2 2 0 0 0 -2 -2 H 5 a 2 2 0 0 0 -2 2 v 12 a 2 2 0 0 0 2 2 z" />
                            </svg>
                            <input v-model="student.code" type="text" required pattern="(^[US|SM]{2})([IS|LI|LA]{2})[0-9]{6}" title="Ingrese el código de estudiante" placeholder="Código" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-width="0.5" d="M 5 2 a 0.5 0.5 0 0 1 0.5 -0.5 c 0.862 0 1.573 0.287 2.06 0.566 c 0.174 0.099 0.321 0.198 0.44 0.286 c 0.119 -0.088 0.266 -0.187 0.44 -0.286 A 4.165 4.165 0 0 1 10.5 1.5 a 0.5 0.5 0 0 1 0 1 c -0.638 0 -1.177 0.213 -1.564 0.434 a 3.49 3.49 0 0 0 -0.436 0.294 V 7.5 H 9 a 0.5 0.5 0 0 1 0 1 h -0.5 v 4.272 c 0.1 0.08 0.248 0.187 0.436 0.294 c 0.387 0.221 0.926 0.434 1.564 0.434 a 0.5 0.5 0 0 1 0 1 a 4.165 4.165 0 0 1 -2.06 -0.566 A 4.561 4.561 0 0 1 8 13.65 a 4.561 4.561 0 0 1 -0.44 0.285 a 4.165 4.165 0 0 1 -2.06 0.566 a 0.5 0.5 0 0 1 0 -1 c 0.638 0 1.177 -0.213 1.564 -0.434 c 0.188 -0.107 0.335 -0.214 0.436 -0.294 V 8.5 H 7 a 0.5 0.5 0 0 1 0 -1 h 0.5 V 3.228 a 3.49 3.49 0 0 0 -0.436 -0.294 A 3.166 3.166 0 0 0 5.5 2.5 A 0.5 0.5 0 0 1 5 2 z M 10 5 v 7 h 4 a 2 2 0 0 0 2 -2 V 6 a 2 2 0 0 0 -2 -2 h -4 z M 6 5 V 4 H 2 a 2 2 0 0 0 -2 2 v 4 a 2 2 0 0 0 2 2 h 4 v -1 z"/>
                            </svg>
                            <input v-model="student.name" type="text" required pattern="(^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{1,20})+(([\\s][A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{1,20})+)*$" title="Ingrese el nombre del alumno" placeholder="Nombre del alumno" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-width="0.5" d="M 5 2 a 0.5 0.5 0 0 1 0.5 -0.5 c 0.862 0 1.573 0.287 2.06 0.566 c 0.174 0.099 0.321 0.198 0.44 0.286 c 0.119 -0.088 0.266 -0.187 0.44 -0.286 A 4.165 4.165 0 0 1 10.5 1.5 a 0.5 0.5 0 0 1 0 1 c -0.638 0 -1.177 0.213 -1.564 0.434 a 3.49 3.49 0 0 0 -0.436 0.294 V 7.5 H 9 a 0.5 0.5 0 0 1 0 1 h -0.5 v 4.272 c 0.1 0.08 0.248 0.187 0.436 0.294 c 0.387 0.221 0.926 0.434 1.564 0.434 a 0.5 0.5 0 0 1 0 1 a 4.165 4.165 0 0 1 -2.06 -0.566 A 4.561 4.561 0 0 1 8 13.65 a 4.561 4.561 0 0 1 -0.44 0.285 a 4.165 4.165 0 0 1 -2.06 0.566 a 0.5 0.5 0 0 1 0 -1 c 0.638 0 1.177 -0.213 1.564 -0.434 c 0.188 -0.107 0.335 -0.214 0.436 -0.294 V 8.5 H 7 a 0.5 0.5 0 0 1 0 -1 h 0.5 V 3.228 a 3.49 3.49 0 0 0 -0.436 -0.294 A 3.166 3.166 0 0 0 5.5 2.5 A 0.5 0.5 0 0 1 5 2 z M 10 5 v 7 h 4 a 2 2 0 0 0 2 -2 V 6 a 2 2 0 0 0 -2 -2 h -4 z M 6 5 V 4 H 2 a 2 2 0 0 0 -2 2 v 4 a 2 2 0 0 0 2 2 h 4 v -1 z"/>
                            </svg>
                            <input v-model="student.lastname" type="text" required pattern="(^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{1,20})+(([\\s][A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ]{1,20})+)*$" title="Ingrese el apellido del alumno" placeholder="Apellido del alumno" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <input v-model="student.birth" type="date" required title="Ingrese la fecha de nacimiento del alumno" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <input v-model="student.phone" type="text" required pattern="^[67]\\d{3}[-| ]\\d{4}$" title="Ingrese el telefono del alumno" placeholder="Telefono del alumno" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input v-model="student.email" type="email" required pattern="^[A-z0-9áéíóúäëïöü._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" title="Ingrese el correo del alumno" placeholder="Correo del alumno" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <input v-model="student.address" type="text" required pattern="^[#.0-9a-zA-Z\\s,-]+$" title="Ingrese la direccion del alumno" placeholder="Direccion del alumno" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div class="w-full md:w-1/2 mb-1 px-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-500 fill-gray-200 stroke-1 stroke-black">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            <input v-model="student.dui" type="text" required pattern="^\\d{8}-\\d{1}$" title="Ingrese el DUI del alumno" placeholder="DUI del alumno" class="shadow appearance-none border rounded-r-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                    </div>
                    <div class="flex items-center justify-end p-4 space-x-4">
                        <input type="reset" id="reset" class="hidden">
                        <label for="reset">
                            <div class="bg-red-400 hover:bg-red-500 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </label>
                        <input type="submit" class="hidden" id="save">
                        <label for="save">
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
                <div class="flex justify-between items-center p-4 bg-neutral-800 rounded-lg text-white overflow-hidden">
                    <h1 class="text-2xl font-bold">Lista de Alumnos</h1>
                    <div class="flex items-center">
                        <button data-target="table" onclick="showHide(this)" class="w-14 h-14 bg-neutral-800 hover:bg-neutral-700 ease-out duration-300 text-white font-bold py-2 px-4 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6 stroke-white stroke-2 fill-transparent">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
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
                                        <svg @click="searchStudent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-full w-8 rounded-l-lg bg-gray-200/50 hover:bg-gray-200/75 duration-500 shadow-inner shadow-neutral-600 00 fill-gray-100/25 stroke-2 stroke-black">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input @keyup="searchStudent" v-model="word" type="text" placeholder="Buscar" class="w-full h-full px-4 py-2 bg-gray-100 border-2 border-transparent rounded-lg text-gray-700">
                                    </div>
                                </th>
                            </tr>
                            <tr class="text-white">
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Codigo</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Nombre</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Apellido</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Fecha de nacimiento</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Telefono</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Correo</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">Direccion</th>
                                <th class="bg-gray-500 hover:bg-gray-400 duration-500 px-4 py-2">DUI</th>
                                <th class="bg-gray-200/25 hover:bg-gray-200/50 duration-500 px-4 py-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="student in students" @click="showEstudent(student)" :key="student.idStudent" class="text-black hover:bg-gray-400 duration-500">
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 px-4 py-2">{{ student.code}}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ student.name }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ student.lastname }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ student.birth }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ student.phone }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ student.email }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ student.address }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2">{{ student.dui }}</td>
                                <td class="bg-gray-100 hover:bg-gray-200 duration-500 border-l px-4 py-2 items-center">
                                    <button @click="delStudent(student)">
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