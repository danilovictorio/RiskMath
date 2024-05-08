import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    turnoDe: {
      nombre:'',
      estado:'',
      color: '',
      idPais: '',
      ganador: null,
      colorActual: ""   
    },
    esCreador: false,
    sala: {
      id: '',
      nombre: '',
      capacidad: 0,
      jugadores: []
    },
    pregunta: {},
    nombre:'',
    paisesConquistados: 0,
    countries: {}, 
    players: {}, 
    jugadorGanador: null,
    mostrarPreguntas: false,
  }),
  actions: {
    setTurno( nombre ) {
      this.turnoDe.nombre=nombre;       
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
      return this.turnoDe.color;
    },
    setColor(color){
      this.turnoDe.color=color;
    },
    getIdPais(){
      return this.turnoDe.idPais;
    }, 
    esMiturno(){
      return this.turnoDe.nombre === this.nombre;
    },
    setGanador(ganador) {
      this.ganador = ganador;
    },
    setColorActual(color){
      this.turnoDe.colorActual =color;
    },
    getColorActual(){
      return this.turnoDe.colorActual;
    },
    assignCountryToPlayer(country, player) {
      // Asigna el país al jugador
      this.countries[country] = player;
    },
    resetCountryColor(country) {
      // Restablece el país a un estado neutral
      this.countries[country] = null;
    },
    setPlayerColor(player, color) {
      // Asigna un color a un jugador
      this.players[player] = color;
    },
    setSala(sala) {
      this.sala = sala;
    },
    setMostrarPreguntas(verdaderoOFalso){
      this.mostrarPreguntas = verdaderoOFalso;
    },
    getMostrarPreguntas(){
      return this.mostrarPreguntas;
    },
    setPreguntas(pregunta){
      this.pregunta = pregunta;
    },
    getPreguntas(){
      return this.pregunta;
    }
  },
})