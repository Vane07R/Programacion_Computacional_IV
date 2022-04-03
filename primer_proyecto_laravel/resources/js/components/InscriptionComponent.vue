<template>
    
</template>

<script>
    export default {
        props: ['forms'],
        data() {
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
    }
</script>