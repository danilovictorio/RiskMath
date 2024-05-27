## CODI FONT DE BACK

```php
class PreguntaController extends Controller
{
    public function mostrarPreguntas()
    {
        $preguntas = Pregunta::all();
        return response()->json(['preguntas' => $preguntas]);
    }

    public function modificarPregunta(Request $request)
    {
        // Encuentra la pregunta en la base de datos
        $pregunta = Pregunta::find($request->id);

        // Si la pregunta no existe, devuelve un error
        if (!$pregunta) {
            return response()->json(['error' => 'Pregunta no encontrada'], 404);
        }

        // Actualiza los campos de la pregunta con los datos de la solicitud
        $pregunta->pregunta = $request->pregunta;
        $pregunta->a = $request->a;
        $pregunta->b = $request->b;
        $pregunta->c = $request->c;
        $pregunta->d = $request->d;
        $pregunta->respuesta_correcta = $request->respuesta_correcta;

        // Guarda los cambios en la base de datos
        $pregunta->save();

        // Devuelve la pregunta modificada
        return response()->json($pregunta);
    }

    public function eliminarPregunta(Request $request)
    {
        // Encuentra la pregunta en la base de datos
        $pregunta = Pregunta::find($request->id);

        // Si la pregunta no existe, devuelve un error
        if (!$pregunta) {
            return response()->json(['error' => 'Pregunta no encontrada'], 404);
        }

        // Elimina la pregunta
        $pregunta->delete();

        // Devuelve una respuesta exitosa
        return response()->json(['success' => 'Pregunta eliminada correctamente']);
    }

    public function crearPregunta(Request $request)
    {
        // Valida los datos de la solicitud
        $this->validate($request, [
            'pregunta' => 'required',
            'a' => 'required',
            'b' => 'required',
            'c' => 'required',
            'd' => 'required',
            'respuesta_correcta' => 'required'
        ]);

        // Crea una nueva pregunta con los datos de la solicitud
        $pregunta = Pregunta::create([
            'pregunta' => $request->pregunta,
            'a' => $request->a,
            'b' => $request->b,
            'c' => $request->c,
            'd' => $request->d,
            'respuesta_correcta' => $request->respuesta_correcta
        ]);

        // Devuelve la pregunta creada
        return response()->json($pregunta, 201);
    }

    public function verificarRespuesta(Request $request)
    {
        $respostaJugador = $request->respuestaUsuario;
        $pregunta = $request->preguntaId;
        $pregunta = Pregunta::find($request->preguntaId);
        if (!$pregunta) {
            return response()->json(['mensaje' => 'La pregunta no fue encontrada'], 404);
        }

        $respuesta_correcta = $pregunta->respuesta_correcta;

        if ($respostaJugador == $respuesta_correcta) {
            return response()->json(['resultado' => true]);
        } else {
            return response()->json(['resultado' => false]);
        }
    }
}
```