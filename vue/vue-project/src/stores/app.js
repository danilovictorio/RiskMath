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
    setEstado(nuevoEstado){
      this.usuario.estado=nuevoEstado;
    },
    setColor(color){
      this.usuario.color=color;
    },
    getNombre(){
      return this.usuario.nombre;
    }
  },
})