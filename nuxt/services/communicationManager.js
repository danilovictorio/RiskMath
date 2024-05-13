const url = 'http://localhost:8000';
//const url = 'http://trfinal.a17danvicfer.daw.inspedralbes.cat/laravel/public/api'; //producción

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
        console.log("Respuesta del servidor:", data);
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
        console.log("Respuesta del servidor:", data);
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