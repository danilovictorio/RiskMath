//const url = 'http://localhost:8000';
const url = 'http://trfinal.a17danvicfer.daw.inspedralbes.cat/laravel/public'; //producción

export async function enviarAtac(name, idUser) {
    try {
        const response = await fetch(`${url}/api/enviar-atac`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                idUser: idUser,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        //console.log("Respuesta del servidor:", data);
        return data; // Retornar los datos de respuesta
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error; // Propagar el error hacia arriba
    }
}
export async function obtenerPaises() {
    try {
        const response = await fetch(`${url}/api/paises`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        return data.paises;
    } catch (error) {
        throw new Error(`Error al obtener datos de países: ${error.message}`);
    }
}
export async function validarResposta(questionId, selectedOption) {
    try {
        const response = await fetch(`${url}/api/verificar-respuesta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                preguntaId: questionId,
                respuestaUsuario: selectedOption,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        //console.log("Respuesta del servidor:", data);
        return data; // Retornar los datos de respuesta
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error; // Propagar el error hacia arriba
    }
}
export async function confirmarAtaque(idUser, paisId) {
    const apiUrl = `${url}/api/confirmar-ataque`;
    const requestData = {
        idUser: idUser,
        paisSeleccionado: paisId,
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(`Error al confirmar el ataque: ${error.message}`);
    }
}
export async function mostrarPreguntas() {
    try {
        const response = await fetch(`${url}/api/mostrar-preguntas`);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        //console.log("Preguntas:", data.preguntas);
        return data.preguntas;
    } catch (error) {
        throw new Error(`Error al obtener datos de preguntas: ${error.message}`);
    }
}
export async function eliminarPregunta(id) {
    try {
        const response = await fetch(`${url}/api/eliminar-pregunta`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        //console.log("Respuesta del servidor:", data);
        return data; // Retornar los datos de respuesta
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error; // Propagar el error hacia arriba
    }
}
export async function actualizarPreguntaEditada(pregunta) {
    try {
        const response = await fetch(`${url}/api/modificar-pregunta`, {
            method: "PUT", // Método HTTP para actualizar la pregunta
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pregunta),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        //console.log("Respuesta del servidor:", data);
        return data; // Retornar los datos de respuesta si es necesario
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error; // Propagar el error hacia arriba
    }
}
export async function crearPregunta(preguntaData) {
    try {
        const response = await fetch(`${url}/api/crear-pregunta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(preguntaData),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        //console.log("Pregunta creada:", data);
        return data; // Retornar los datos de la pregunta creada
    } catch (error) {
        console.error("Error al crear la pregunta:", error);
        throw error; // Propagar el error hacia arriba
    }
}
