import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
// import { useAppStore } from '../stores/app';
const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const usuariosJuego = [];

io.on('connection', (socket) => {
  console.log("Se ha conectado alguien!! con id " + socket.id);

  socket.esMiTurno = false;

  socket.on('peticion_jugar', (datos) => {
    usuariosJuego.push({ id: socket.id, nombreUsuario: datos.nombreUsuario,estado:""});
    console.log('quiere jugar',datos.nombreUsuario);
    io.emit('actualizacionUsuario', usuariosJuego);
    
    if (usuariosJuego.length === 2) {
      const primerTurno = Math.floor(Math.random() * usuariosJuego.length);
      const jugadorInicial = usuariosJuego[primerTurno];      
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
  socket.on('respuestaJugador', ({ userId }) => {
    const app = useAppStore();
    if (userId==usuariosJuego[0]) {
      userId=usuariosJuego[1]
    }else{
      userId=usuariosJuego[0]
    }
    app.setNombre(userId);
    io.emit('cambiarTurno', { turno_de: userId }); 

 
  });
});

server.listen(8000, () => {
  console.log('Server running at http://localhost:8000');
});