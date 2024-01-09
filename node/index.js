/*
PUERTO DE LOCALHOST: 3123
PUERTO DE PREPROD: 3184
PUERTO DE PROD: 3123

Substituir en el server.listen
*/

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    // origin: '*',
    methods: ['GET', 'POST'],
  },
});

const usuariosJuego = [];

io.on('connection', (socket) => {
  console.log("Se ha conectado alguien!! con id " + socket.id);

  socket.esMiTurno = false;

  socket.on('peticion_jugar', (datos) => {
    usuariosJuego.push({ id: socket.id, nombreUsuario: datos.nombreUsuario, estado: "", color: "" });
    console.log('quiere jugar', datos.nombreUsuario);

    socket.emit("peticion_jugar_aceptada", datos);
    io.emit('actualizacionUsuario', usuariosJuego);

    if (usuariosJuego.length === 2) {
      usuariosJuego[0].color = "green";
      usuariosJuego[1].color = "blue";
      socket.emit('actualizarColor', usuariosJuego[0].color, usuariosJuego[1].color);
      const primerTurno = Math.floor(Math.random() * usuariosJuego.length);
      const jugadorInicial = usuariosJuego[primerTurno];
      if (jugadorInicial.nombreUsuario==usuariosJuego[0].nombreUsuario) {
        socket.emit("rellenarColor", usuariosJuego[0].color);
      }else{
        socket.emit("rellenarColor", usuariosJuego[1].color);
      }
      io.emit('cambiarTurno', { turno_de: jugadorInicial.nombreUsuario });
    }
  });


  socket.on('disconnect', () => {
    console.log("Se ha desconectado alguien!! con id " + socket.id);
    const index = usuariosJuego.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      usuariosJuego.splice(index, 1);

      if (socket.esMiTurno) {
        const siguienteTurno = usuariosJuego.length > 0 ? usuariosJuego[0].id : null;
        io.emit('cambiarTurno', { esMiTurno: socket.id === siguienteTurno });
      }

    }
  });

  socket.on('respuestaJugador', ({ userName, paisId, acertado }) => {

    let color = "white";
    let nextName = "";
    
    if (userName == usuariosJuego[0].nombreUsuario) {
      
      nextName = usuariosJuego[1].nombreUsuario;
      
      if (acertado) {
         color = usuariosJuego[1].color;
       }

    } else {
      nextName = usuariosJuego[0].nombreUsuario;
       if (acertado) {
        color = usuariosJuego[0].color;
       }

    }
    io.emit('comprobarColorActualMapa', {  idPais: paisId, color: color, acertado:acertado });
    console.log("On respuesta jugador :: cambiar turno a :: ", nextName);
    io.emit('cambiarTurno', { turno_de: nextName, idPais: paisId, color: color, acertado:acertado });

  //   const conquistasJugador1 = usuariosJuego[0].paisesConquistados.length;
  //   const conquistasJugador2 = usuariosJuego[1].paisesConquistados.length;
  //   const totalPaises = 15;

  // if (conquistasJugador1 === totalPaises) {
  // io.emit('finDelJuego', { ganador: usuariosJuego[0].nombreUsuario });
  // } else if (conquistasJugador2 === totalPaises) {
  //   io.emit('finDelJuego', { ganador: usuariosJuego[1].nombreUsuario });
  // } else if (conquistasJugador1 + conquistasJugador2 === totalPaises) {
  //   io.emit('finDelJuego', { empate: true });
  // }

   });
 });

server.listen(3123, () => {
  console.log('Server running on port: 3123');
});