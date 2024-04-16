/*
PUERTO DE LOCALHOST: 3123
PUERTO DE PREPROD: 3184
PUERTO DE PROD: 3123

Substituir en la constante: port
*/

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';

const app = express();
app.use(cors());
const port = 3123;

const server = createServer(app);
const io = new Server(server, {
  cors: {
    // origin: '*',
    methods: ['GET', 'POST'],
  },
});

const rooms = {};
const usuariosJuego = [];

io.on('connection', (socket) => {
  console.log("Se ha conectado alguien!! con id " + socket.id);

  socket.esMiTurno = false;

  socket.on('createRoom', (data) => {
    const roomId = nanoid(6); // Genera un ID de 6 caracteres
    rooms[roomId] = {
      name: data.nombreSala,
      capacity: data.capacidadSala,
      players: [],
      creator: socket.id,
    };
    console.log('Sala creada con ID:', roomId);
    console.log('Datos de la sala:', rooms[roomId]);
    socket.emit('roomCreated', { roomId: roomId });
  });
  socket.on('joinRoom', (roomId) => {
    const room = rooms[roomId];
    if (room && room.players.length < room.capacity) {
      room.players.push(socket.id);
      socket.join(roomId);

      // Envía al usuario la información de si es el creador de la sala
      socket.emit('joinedRoom', { esCreador: socket.id === room.creator });

      if (room.players.length === room.capacity) {
        // Iniciar el juego
        io.to(roomId).emit('startGame');
      }
    }
  });
/*
  socket.on('peticion_jugar', (datos) => {
    usuariosJuego.push({ id: socket.id, nombreUsuario: datos.nombreUsuario, estado: "", color: "" });
    console.log('quiere jugar', datos.nombreUsuario);

    socket.emit("peticion_jugar_aceptada", datos);
    io.emit('actualizacionUsuario', usuariosJuego);

    if (usuariosJuego.length === 2) {
      usuariosJuego[0].color = "green";
      usuariosJuego[1].color = "blue";
      // socket.emit('actualizarColor', usuariosJuego[0].color, usuariosJuego[1].color);
      const primerTurno = Math.floor(Math.random() * usuariosJuego.length);
      const jugadorInicial = usuariosJuego[primerTurno];
      if (jugadorInicial.nombreUsuario == usuariosJuego[0].nombreUsuario) {
        console.log('entro al primero');
        io.emit("rellenarColor", usuariosJuego[1].color);
      } else {
        console.log('entro al segundo');
        io.emit("rellenarColor", usuariosJuego[0].color);
      }
      io.emit('cambiarPrimerTurno', { turno_de: jugadorInicial.nombreUsuario });
    }
  });
*/

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

    for (const roomId in rooms) {
      const room = rooms[roomId];
      const index = room.players.indexOf(socket.id);
      if (index !== -1) {
        room.players.splice(index, 1);
        if (room.players.length === 0) {
          delete rooms[roomId];
        }
      }
    }
  });

  socket.on('respuestaJugador', ({ userName, paisId, acertado }) => {

    let color = "";
    let nextName = "";
    let user = "";

    if (userName === usuariosJuego[0].nombreUsuario) {
      console.log('hola1');
      color = usuariosJuego[0].color;
      nextName = usuariosJuego[1].nombreUsuario;
      user = usuariosJuego[1];
      if (acertado) {
        console.log('hola2');
        color = usuariosJuego[1].color;
      }

    }

    if (userName === usuariosJuego[1].nombreUsuario) {
      nextName = usuariosJuego[0].nombreUsuario;
      console.log('hsola3');
      color = usuariosJuego[1].color;
      user = usuariosJuego[0];
      if (acertado) {
        console.log('hola4');
        color = usuariosJuego[0].color;

      }

    }
    io.emit('comprobarColorActualMapa', { idPais: paisId, color: color, acertado: acertado, color0: usuariosJuego[0].color, color1: usuariosJuego[1].color });
    console.log("On respuesta jugador :: cambiar turno a :: ", nextName);
    io.emit('cambiarTurno', { turno_de: nextName, usuarios: usuariosJuego });

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

server.listen(port, () => {
  console.log('Server running on port:' + port);
});