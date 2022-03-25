<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Laravel Academic Sistem</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <!-- Tailwind CSS -->
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    </head>
    <body class="antialiased">
        <div id="app" class="dark">
            <nav class="bg-gray-800">
                <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <a href="#" class="text-white text-lg font-semibold hover:text-gray-300 mr-4">
                        <i class="fas fa-home"></i>
                    </a>
                    <a href="#" class="text-white text-lg font-semibold hover:text-gray-300 mr-4">
                        Alumnos
                    </a>
                    <a href="#" class="text-white text-lg font-semibold hover:text-gray-300 mr-4">
                        Docentes
                    </a>
                    <a href="#" class="text-white text-lg font-semibold hover:text-gray-300 mr-4">
                        Materias
                    </a>
                    <a href="#" class="text-white text-lg font-semibold hover:text-gray-300 mr-4">
                        Inscripciones
                    </a>
                    <a href="#" class="text-white text-lg font-semibold hover:text-gray-300 mr-4">
                        Notas
                    </a>
                    <!-- Toggle dark mode -->
                    <div class="md:hidden">
                        <button @click="toggleDarkMode" class="flex items-center px-3 py-2 rounded text-gray-500 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <div class="bg-pink-500 text-pink-900">
                De día soy pink
            </div>
            <div class="bg-pink-500 dark:bg-black text-pink-900 dark:text-white">
                De noche soy nigga
            </div>
        </div>
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-600 sm:items-center py-4 sm:pt-0">
            @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a href="{{ url('/home') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Home</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Log in</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <div class="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div class="mt-8">
                    <h1 class="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                        Hola mundo
                    </h1>
                </div>
            </div>
        </div>
    </body>
</html>
