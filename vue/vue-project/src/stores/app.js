// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuarioActual: {
      username:''      
    },
    usuarioJuego:{
      users:[]
    }
  }),
  actions: {
    setUsuarioActual( nombre ) {
      this.usuarioActual.username=nombre;
            
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