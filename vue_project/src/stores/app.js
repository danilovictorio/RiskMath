import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    turnoDe: {
      nombre:'',
      estado:'',
      color: '',
      idPais: ''   
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
    },
    getColor(){
      return this.color;
    },
    setColor(color){
      this.turnoDe.color=color;
    },
    getIdPais(){
      return this.turnoDe.idPais;
    }, 
    esMiturno(){
      return this.turnoDe.nombre === this.nombre;
    }
  },
})