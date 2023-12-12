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
