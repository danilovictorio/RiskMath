import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuario: {
      nombre:'',
      estado:''    
    },
    //ARRAY DE USUARIOS
    usuariosJuego:{
      users:[]
    }
  }),
  actions: {
    setNombre( nombre ) {
      this.usuario.nombre=nombre;       
    },
    setUsuariosJuego( usuarios ) {
      this.usuariosJuego.users=usuarios;       
    },
    setEstado(nuevoEstado){
      this.usuario.estado=nuevoEstado;
    },
    getNombre(){
      return this.usuario.nombre;
    }
  },
})