// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuario: {
      nombre:'',
      estado:''    
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
    getNombre(){
      return this.usuario.nombre;
    }
  },
})