import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    turnoDe: {
      nombre:'',
      estado:'',
      color: '',
      pais: '',
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
    paisSeleccionado: '',
    pregunta: {},
    nombre:'',
    paisesConquistados: {},
    countries: {}, 
    players: {}, 
    jugadorGanador: null,
    duelo: false,
    mostrarPreguntas: false,
  }),
  actions: {
    setPaisSeleccionado(paisId){
      this.paisSeleccionado = paisId;
    },
    getPaisSeleccionado(){
      return this.paisSeleccionado;
    },
    setpaisesConquistados(paisesConquistados){
      this.paisesConquistados = paisesConquistados;
    },
    getpaisesConquistados(){
      return this.paisesConquistados;
    },
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
    setPais(pais){
      this.turnoDe.pais = pais;
    },
    getPais(){
      return this.turnoDe.pais;
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
    },
    setDuelo(duelo){
      this.duelo = duelo;
    },
    getDuelo(){
      return this.duelo;
    },
  },
})