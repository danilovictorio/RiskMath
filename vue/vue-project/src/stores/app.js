// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuario: {
      nombre:''      
    },
    usuarioJuego:{
      users:[]
    }
  }),
  actions: {
    setNombre( nombre ) {
      this.usuario.nombre=nombre;
            
    },
    // setVotos(votos){
    //   this.infoVotos.votos=votos;
    // },
    // getVotos(){
    //   return this.infoVotos.votos;
    // },
    // isLoggedIn(){
    //   return this.loginInfo.loggedIn;
    // },
    // getLoginInfo(){
    //   return this.loginInfo;
    // }
  },
})