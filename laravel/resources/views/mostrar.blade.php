<!DOCTYPE html>
<html>
<head>
    <title>Mostrar Pregunta</title>
</head>
<body>
    <h1>Pregunta:</h1>
    <p>{{ $pregunta->texto_pregunta }}</p>

    <h2>Opciones:</h2>
    <ul>
        @foreach ($pregunta->opciones as $opcion)
            <li>{{ $opcion->texto_opcion }}</li>
        @endforeach
    </ul>
</body>
</html>
