import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    turnoDe: {
      nombre:'',
      estado:''    
    },
    //ARRAY DE USUARIOS
    usuariosJuego:{
      users:[]
    },
    nombre:''
  }),
  actions: {
    setTurno( nombre ) {
      this.turnoDe.nombre=nombre;       
    },
    setUsuariosJuego( usuarios ) {
      this.usuariosJuego.users=usuarios;       
    },
    setEstado(nuevoEstado){
      this.turnoDe.estado=nuevoEstado;
    },
    getTurno(){
      return this.turnoDe.nombre;
    },
    setNombre(nombre) {
      this.nombre=nombre;
    }
  },
})