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
      jugadores: [data.nombreJugador],
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
  
      // Asignar colores a los jugadores
      room.jugadores = room.jugadores.map((jugador, index) => {
        const color = colores[index]; // Obtener el color correspondiente al índice
        return { nombre: jugador, estado: "", color }; // Crear un nuevo objeto jugador con el color asignado
      });
  
      io.to(roomId).emit("peticion_jugar_aceptada", datos);
      io.to(roomId).emit("rellenarColor", room.jugadores.find(u => u.nombre !== jugadorInicial).color);
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

  socket.on('respuestaJugador', ({ userName, paisId, acertado, roomId }) => {
    const room = rooms[roomId];
    if (room) {
      const usuario1 = room.jugadores[0];
      const usuario2 = room.jugadores[1];
  
      // Cambiar el turno solo si el jugador ha fallado
      if (!acertado) {
        const nextName = userName === usuario1.nombreUsuario ? usuario2.nombreUsuario : usuario1.nombreUsuario;
        io.emit('cambiarTurno', { turno_de: nextName, usuarios: room.jugadores });
      }
    }
  });
});

server.listen(port, () => {
  console.log('Server running on port:' + port);
});