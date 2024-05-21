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
    methods: ['GET', 'POST'],
  },
});

const rooms = {};
const colores = ['green', 'blue']; // Define colores aquí

io.on('connection', (socket) => {
  console.log("Se ha conectado alguien!! con id " + socket.id);

  socket.esMiTurno = false;

  socket.on('crearSala', (data) => {
    const roomId = nanoid(6);
    rooms[roomId] = {
      id: roomId,
      nombre: data.nombreSala,
      capacidad: data.capacidadSala,
      jugadores: [{ nombre: data.nombreJugador, socketId: socket.id }],
      paisesConquistados: {},
      recuentoPaises: { [data.nombreJugador]: 0 }
    };
    console.log('Sala creada con ID:', roomId);
    console.log('Datos de la sala:', rooms[roomId]);
    console.log('todas las salas: ', rooms);
    const sala = rooms[roomId];
    socket.join(roomId);
    // Le envio SOLO AL CREADOR que se ha creado
    io.to(socket.id).emit('salaCreada', {
      sala: sala,
    });
  });

  socket.on('obtenerSalas', () => {
    console.log('Evento obtenerSalas recibido');
    const salas = Object.values(rooms);
    socket.emit('salas', salas);
  });

  socket.on('unirseSala', (roomId, nombreJugador, callback) => {
    const room = rooms[roomId];
    if (room && room.jugadores.length < room.capacidad) {
      if (!room.jugadores.some(jugador => jugador.nombre === nombreJugador)) {
        room.jugadores.push({ nombre: nombreJugador, socketId: socket.id });
        room.recuentoPaises[nombreJugador] = 0;
      }
      console.log('Se ha unido a la sala con ID:', socket.id);
      socket.join(roomId);

      io.to(roomId).emit('usuarioUnidoSala', {
        sala: room,
      });

      callback({ success: true, message: 'Te has unido a la sala correctamente.' });
      console.log('Datos room:', room);
    } else {
      callback({ success: false, message: 'La sala está llena o no existe.' });
    }
  });

  socket.on('iniciarPartida', (roomId, callback) => {
    const room = rooms[roomId];
    if (room) {
      if (room.jugadores.length >= 2) {
        // Inicia la partida
        io.to(roomId).emit('startGame');
        callback({ success: true, message: 'La partida ha comenzado.' });
      } else {
        callback({ success: false, message: 'No hay suficientes jugadores en la sala para iniciar la partida.' });
      }
    } else {
      callback({ success: false, message: 'La sala no existe.' });
    }
  });

  socket.on('peticion_jugar', (datos, roomId) => {
    const room = rooms[roomId];
    if (room) {
      const jugadores = room.jugadores.map(jugador => ({ nombre: jugador.nombre }));
      socket.emit('jugadoresEnSala', jugadores);
    } else {
      socket.emit('error', { message: 'La sala no existe.' });
    }

    console.log('Datos recibidos en peticion_jugar:', datos);
    console.log('quiere jugar', datos.nombreUsuario);

    if (room && room.jugadores.length === 2) {
      const primerTurno = Math.floor(Math.random() * room.jugadores.length);
      const jugadorInicial = room.jugadores[primerTurno];
      const siguienteTurno = room.jugadores[(primerTurno + 1) % room.jugadores.length];

      console.log("room", room);
      console.log("room.jugadores", room.jugadores);
      console.log("jugadorInicial", jugadorInicial);

      // Asignar colores a los jugadores
      room.jugadores = room.jugadores.map((jugador, index) => {
        const color = colores[index];
        return { ...jugador, color }; // Mantener el socketId y añadir color
      });

      io.to(roomId).emit("peticion_jugar_aceptada", datos);
      io.to(roomId).emit("rellenarColor", room.jugadores.find(u => u.nombre === jugadorInicial.nombre).color);
      io.to(roomId).emit('cambiarPrimerTurno', { turno_de: jugadorInicial.nombre });
    }
  });

  socket.on('asignarPais', ({roomId, pais})=>{
    io.to(roomId).emit('nombrePaisAsignado', {pais});
  });

  socket.on('marcarTerritorioSeleccionado', ({ roomId, paisId }) => {
    console.log("Territorio SELECCIONADO SERVER");
    io.to(roomId).emit('marcarTerritorio', { paisId });
  });

  socket.on('disconnect', () => {
    console.log("Se ha desconectado alguien!! con id " + socket.id);

    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room) {
        const index = room.jugadores.findIndex(jugador => jugador.socketId === socket.id);
        if (index !== -1) {
          room.jugadores.splice(index, 1);
          if (room.jugadores.length === 0) {
            delete rooms[roomId];
          }
        }
      }
    }
  });

  socket.on('cambiarAccion', ({ roomId, accion }) => {
    io.to(roomId).emit('cambiarAccion', accion);
  });

  socket.on('enviarPreguntas', ({ roomId, preguntas }) => {
    console.log('Evento enviarPreguntas recibido');
    io.to(roomId).emit('mostrarPreguntas', preguntas);
  });

  socket.on('enviarDuelo', ({ roomId, preguntas }) => {
    console.log('Evento enviarPreguntas recibido');
    io.to(roomId).emit('mostrarPreguntasDuelo', preguntas);
  });

  socket.on('OcultarPreguntas', ({ roomId }) => {
    console.log('Evento OcultarPreguntas recibido');
    io.to(roomId).emit('ocultarPreguntas');
  });

  socket.on('dueloTerminado', ({ roomId }) => {
    console.log('Evento DueloTerminado recibido');
    io.to(roomId).emit('dueloAcabado');
  });

  socket.on('respuestaJugador', ({ turnoDe, userName, paisId, acertado, roomId, esDuelo }) => {
    const room = rooms[roomId];
    if (room && room.jugadores && room.jugadores.length >= 2) {
      const usuario1 = room.jugadores[0];
      const usuario2 = room.jugadores[1];
      console.log('Room jugadores:', usuario1, usuario2);
      if (acertado) {
        const jugadorAnterior = room.paisesConquistados[paisId];
        if (jugadorAnterior && jugadorAnterior !== userName) {
          // Restar un territorio al jugador anterior
          room.recuentoPaises[jugadorAnterior]--;
        }
        // Recorrer todos los países conquistados para verificar si el ataque ya lo tenía
        let yaPoseiaPais = false;
        for (const [conquistadoPaisId, conquistador] of Object.entries(room.paisesConquistados)) {
          if (conquistadoPaisId === paisId && conquistador === userName) {
            yaPoseiaPais = true;
            break;
          }
        }
        if (!yaPoseiaPais) {
          // Actualizar el país conquistado por el nuevo jugador
          room.paisesConquistados[paisId] = userName;
          // Sumar un territorio al nuevo conquistador
          room.recuentoPaises[userName]++;
        }
        const color = userName === usuario1.nombre ? usuario1.color : usuario2.color;
        io.to(roomId).emit('respuestaCorrecta', { paisId, jugador: userName, color });
      }else{
        io.to(roomId).emit('respuestaIncorrecta', { paisId});
        const jugadoresContestados={};
        if(esDuelo){
          if (room.jugadores.nombre == userName) {
            jugadoresContestados= userName;
          }
          io.sockets(room.jugadores.socketId);
        }
        
      }
      if (turnoDe === userName) {
        const nextName = userName === usuario1.nombre ? usuario2.nombre : usuario1.nombre;
        io.to(roomId).emit('cambiarTurno', { turno_de: nextName, usuarios: room.jugadores });
        console.log('Cambio de turno:', nextName);
      } else {
        io.to(roomId).emit('cambiarTurno', { turno_de: userName, usuarios: room.jugadores });
      }
    } else {
      console.log('Error jugadores sala.');
    }
  });

  socket.on('contadorPaises', ({ roomId }) => {
    const room = rooms[roomId];
    if (room) {
      // Calcula el usuario con más países conquistados
      let usuarioConMasPaises = Object.keys(room.recuentoPaises).reduce((a, b) => room.recuentoPaises[a] > room.recuentoPaises[b] ? a : b);
      console.log('Paises conquistados:', room.paisesConquistados);
      console.log('Recuento de países:', room.recuentoPaises);
      io.to(roomId).emit('paisesConquistados', { recuentoPaises: room.recuentoPaises });
      io.to(roomId).emit('comprovarFinal', { paisesConquistados: room.paisesConquistados, usuarioGanador: usuarioConMasPaises });
    }
  });
});

server.listen(port, () => {
  console.log('Server running on port:' + port);
});
