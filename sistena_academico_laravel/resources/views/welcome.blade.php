<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Sistema Academico Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;600&display=swap" rel="stylesheet">

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">

    </head>
    <body>
        <div id="app">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">::.. SISTENA ACADEMICO ..::</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a @click="abrirForms('alumno')" class="nav-link" href="#">Alumnos</a>
                            </li>
                            <li class="nav-item">
                                <a @click="abrirForms('docente')" class="nav-link" href="#">Docentes</a>
                            </li>
                            <li class="nav-item">
                                <a @click="abrirForms('materia')" class="nav-link" href="#">Materias</a>
                            </li>
                            <li class="nav-item">
                                <a @click="abrirForms('matricula')" class="nav-link" href="#">Matricula</a>
                            </li>
                            <li class="nav-item">
                                <a @click="abrirForms('inscripcion')" class="nav-link" href="#">Inscripciones</a>
                            </li>
                            <li class="nav-item">
                                <a @click="abrirForms('notas')" class="nav-link" href="#">Notas</a>
                            </li>
                        </ul>
                        <ul class="navbar-nav ml-auto">
                            @guest
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                                </li>
                                @if (Route::has('register'))
                                    <li class="nav-item">
                                        <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                    </li>
                                @endif
                            @else
                                <li class="nav-item dropdown">
                                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                        {{ Auth::user()->name }} <span class="caret"></span>
                                    </a>
                                </li>
                            @endauth
                        </ul>
                    </div>
                </div>
            </nav>
            <alumno-component v-bind:form="forms" ref="alumno" v-show="forms['alumno'].mostrar"></alumno-component>
        </div>

        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
