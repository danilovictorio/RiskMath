import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { nanoid } from 'nanoid';
import { Console } from 'console';

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
  socket.on('preguntasYRespuestas', ({ preguntasYRespuestas, roomId }) => {
    io.to(roomId).emit('preguntasYRespuestas', preguntasYRespuestas);
  });

  socket.on('crearSala', (data) => {
    const roomId = nanoid(6);
    rooms[roomId] = {
      id: roomId,
      nombre: data.nombreSala,
      capacidad: data.capacidadSala,
      jugadores: [data.nombreJugador],
      paisesConquistados: {},
    };
    console.log('Sala creada con ID:', roomId);
    console.log('Datos de la sala:', rooms[roomId]);
    console.log('todas las salas: ', rooms)
    const sala = rooms[roomId];
    socket.join(roomId);
    //Le envio SOLO AL CREADOR que se ha creado
    io.to(roomId).emit('salaCreada', {
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
      if (!room.jugadores.includes(nombreJugador)) {
        room.jugadores.push(nombreJugador);
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
      const jugadores = room.jugadores.map(nombre => ({ nombre }));
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
        const color = index === 0 ? 'green' : 'blue'; // Asignar el color "green" al primer jugador y "blue" al segundo
        return { nombre: jugador, estado: "", color }; // Crear un nuevo objeto jugador con el color asignado
      });

      io.to(roomId).emit("peticion_jugar_aceptada", datos);
      io.to(roomId).emit("rellenarColor", room.jugadores.find(u => u.nombre == jugadorInicial).color);
      io.to(roomId).emit('cambiarPrimerTurno', { turno_de: jugadorInicial });
    }
  });

  socket.on('disconnect', () => {
    console.log("Se ha desconectado alguien!! con id " + socket.id);
    //HAY QUE MIRARLO PORQUE PETA!
    //REPASAR TODAS LAS SALAS Y SACARLO DE LAS SALAS QUE ESTE ESTE USUARIO

    for (const roomId in rooms) {
      const room = rooms[roomId];
      if (room) { // Asegúrate de que room no es undefined
        const index = room.jugadores.indexOf(socket.id);
        if (index !== -1) {
          room.jugadores.splice(index, 1);
          if (room.jugadores.length === 0) {
            delete rooms[roomId];
          }
        }
      }
    }
  });

  socket.on('enviarPreguntas', ({ roomId , preguntas}) => {
    console.log('Evento enviarPreguntas recibido');
    io.to(roomId).emit('mostrarPreguntas', preguntas);
  });
  socket.on('enviarDuelo', ({ roomId , preguntas}) => {
    console.log('Evento enviarPreguntas recibido');
    io.to(roomId).emit('mostrarPreguntasDuelo', preguntas);
  });

  socket.on('OcultarPreguntas', ({ roomId}) => {
    console.log('Evento OcultarPreguntas recibido');
    io.to(roomId).emit('ocultarPreguntas');
  });
  socket.on('dueloTerminado', ({ roomId}) => {
    console.log('Evento DueloTerminado recibido');
    io.to(roomId).emit('dueloAcabado');
  });

  socket.on('respuestaJugador', ({ turnoDe, userName, paisId, acertado, roomId }) => {
    const room = rooms[roomId];
    if (room && room.jugadores && room.jugadores.length >= 2) {
      const usuario1 = room.jugadores[0];
      const usuario2 = room.jugadores[1];
      console.log('Room jugadores:', usuario1, usuario2);
      if (acertado) {
        room.paisesConquistados[paisId] = userName;
        const color = userName === usuario1.nombre ? usuario1.color : usuario2.color;
        io.to(roomId).emit('respuestaCorrecta', { paisId, jugador: userName, color});
      }
      console.log('Turno de:', turnoDe, 'Usuario:', userName);
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
    if (room && room.paisesConquistados) { // Verifica si room existe y tiene la propiedad paisesConquistados
      let recuentoPaises = {};
  
      for (let usuario of Object.values(room.paisesConquistados)) {
        if (usuario in recuentoPaises) {
          recuentoPaises[usuario]++;
        } else {
          recuentoPaises[usuario] = 1;
        }
      }
      let usuarioConMasPaises = Object.keys(recuentoPaises).reduce((a, b) => recuentoPaises[a] > recuentoPaises[b] ? a : b);
      console.log('Paises conquistados:', room.paisesConquistados);
      // Propagar el cambio a todos los clientes
      io.to(roomId).emit('paisesConquistados', { paisesConquistados: room.paisesConquistados, usuarioGanador: usuarioConMasPaises });
    } else {
      console.log('La sala no existe o no tiene paisesConquistados definido.');
    }
  });
  
});

server.listen(port, () => {
  console.log('Server running on port:' + port);
});