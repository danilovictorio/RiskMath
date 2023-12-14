import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
//import io from 'socket.io-client'
//import {socket} from "@/utils/socket.js";
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')



// var info = {};
// info.jugadores = [];
// info.jugadores.push(s) ;
// io.to("partida_342lkjdasj").emit("sadas",data);
// io.to("partida_342lkjdasj").jugadores = info;

// socket.myRoom = "partida_342lkjdasj";
