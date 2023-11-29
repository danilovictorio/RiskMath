<!DOCTYPE html>
<html>
<head>
    <title>Listado de Preguntas</title>
</head>
<body>
    <h1>Listado de Preguntas</h1>

    <ul>
        @foreach($preguntas as $pregunta)
            <li>
                <p>{{ $pregunta->pregunta }}</p>

                <h2>Opciones</h2>
                <ul>
                    @foreach(json_decode($pregunta->opciones, true) as $opcion)
                        <li>{{ $opcion }}</li>
                    @endforeach
                </ul>

                <p>Respuesta Correcta: {{ $pregunta->respuesta_correcta }}</p>
            </li>
        @endforeach
    </ul>
</body>
</html>
