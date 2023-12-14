// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuario: {
      nombre:'',
      estado:'',
      color: ''
    },
    usuarioJuego:{
      users:[]
    }
  }),
  actions: {
    setNombre( nombre ) {
      this.usuario.nombre=nombre;       
    },
    getNombre(){
      return this.usuario.nombre;
    },
    setEstado(nuevoEstado){
      this.usuario.estado=nuevoEstado;
    },
    getEstado(){
      return this.usuario.estado;
    },
    setColor(color){
      this.usuario.color=color;
    },
    getColorMapa(){
      return this.usuario.color;
    }
  },
})