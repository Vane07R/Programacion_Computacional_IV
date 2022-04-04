<template>
    
</template>

<script>
    export default {
        props: ['forms'],
        data() {
            return {
                return: {
                word: '',
                alumnos: [],
                inscripciones: [],
                materias: [],
                ciclos: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
                inscribir: {
                    limit: 1,
                    accion : 'nuevo',
                    showMsg : false,
                    msg : '',
                    ciclo: '',
                    idInscribir: '',
                    alumno: '',
                    materias: []
                },
            }
        },
        methods; {
            buscandoInscrito();{
                this.obtenerInscripciones(this.word);
            }
            clearForm() ;{
                this.inscribir.accion = 'nuevo';
                this.inscribir.showMsg = false;
                this.inscribir.msg = '';
                this.inscribir.limit = 1;
                this.inscribir.ciclo = '';
                this.inscribir.idInscribir = '';
                this.inscribir.alumno = '';
                this.inscribir.materias = [];
                this.materias = [];
                this.obtenerMaterias();
                this.obtenerEstudiantes();
            }
            saveChanges() ;{
                this.obtenerInscripciones();
                let inscribir = this.inscripciones || [];
                if (this.inscribir.accion === 'nuevo') {
                    this.inscribir.idInscribir = getUniqueId('ins');
                    this.inscribir.alumno = this.alumnos.find(alumno => alumno.idStudent === this.inscribir.alumno);
                    inscribir.push(this.inscribir);
                } else if (this.inscribir.accion === 'editar') {
                    let index = inscribir.findIndex(inscripcion => inscripcion.idInscribir === this.inscribir.idInscribir);
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
            }
            eliminarInscrito(inscripcion) ; {
                if (confirm(`Esta seguro de eliminar la inscripcion/es de ${inscripcion.alumno.name} a ${this.inscribir.materias}?`)) {
                    this.inscribir.idInscribir = inscripcion.idInscribir;
                    this.inscribir.accion = 'eliminar';
                    this.saveChanges();
                    this.clearForm();
                }
            }
            modificarInscripcion(inscripcion); {
                this.inscribir.accion = 'editar';
                this.inscribir.showMsg = false;
                this.inscribir.msg = '';
                this.inscribir.limit = inscripcion.limit;
                this.inscribir.ciclo = inscripcion.ciclo;
                this.inscribir.idInscribir = inscripcion.idInscribir;
                this.inscribir.alumno = inscripcion.alumno;
                this.inscribir.materias = inscripcion.materias;
                this.obtenerMaterias();
                this.materias = this.materias.filter(materia => !this.inscribir.materias.find(inscripcionMateria => inscripcionMateria.idMateria === materia.idMateria));
            }
            toggleSubject(toggle, materia) ;{
                if (toggle) {
                    this.inscribir.materias.push(materia);
                    this.materias.splice(this.materias.indexOf(materia), 1);
                } else {
                    let i = this.inscribir.materias.indexOf(materia);
                    this.materias.push(materia);
                    this.inscribir.materias.splice(i, 1);
                }
            }
            validate(); {
                if (this.inscribir.limit < 0) {
                    if (this.inscribir.materias.length > this.inscribir.limit) {
                        this.inscribir.limit = this.inscribir.materias.length;
                    } else {
                        this.inscribir.limit = 0;
                    }
                } else if (this.inscribir.limit > 5) {
                    this.inscribir.limit = 5;
                }
            }
            obtenerEstudiantes() ;{
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
            }
            obtenerMaterias() ;{
                this.materias = [];
                if (localStorage.getItem('materias') !== null) {
                    for (let i = 0; i < JSON.parse(localStorage.getItem('materias')).length; i++) {
                        let data = JSON.parse(localStorage.getItem('materias'))[i];
                        this.materias.push(data);
                    }
                }
            }
            obtenerInscripciones(); {
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
            }
            close(target); {
                close(target);
            }
        }
        created(); {
            this.obtenerInscripciones();
            this.obtenerMaterias();
            this.obtenerEstudiantes();
        }
</script>}