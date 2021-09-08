const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");
const ULTIMO_NIVEL = 1;
class Juego {
  constructor() {
    this.inicializar();
    this.generarSecuencia();
    setTimeout(this.siguienteNivel());
  }

  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.toggleBtnEmpezar()
    this.nivel = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }

  toggleBtnEmpezar(){
    if (btnEmpezar.classList.contains('hide')){
      btnEmpezar.classList.remove('hide')
    }else{
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
    console.log(this.secuencia);
  }
  siguienteNivel() {
    this.subNivel = 0;
    this.iluminarSecuencia();
    this.agregarEventClick();
  }
  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }
  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }

  iluminarSecuencia() {
    // let mantiene la variable a diferencia de var que siempre pisa la misma variable, usar siempre conts antes que let y usar siepre let antes de var.
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      setTimeout(() => this.iluminarColor(color), 1000 * i);
    }
  }
  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }
  agregarEventClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
  }
  eliminarEventClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const cod_color = this.transformarColorANumero(nombreColor);
    this.iluminarColor(nombreColor);
    if (cod_color === this.secuencia[this.subNivel]) {
      this.subNivel++;
      if (this.subNivel == this.nivel) {
        this.nivel++;
        this.eliminarEventClick();
        if (this.nivel === ULTIMO_NIVEL + 1) {
          this.ganoElJuego();
        } else {
          setTimeout(this.siguienteNivel, 2000);
        }
      }
    } else {
      this.perdioElJuego();
    }
  }
  ganoElJuego() {
    swal('Simon dice',"Felicitaciones, ganaste el juego!", 'success').then(this.inicializar.bind(this));
  }
  perdioElJuego() {
    swal('Simon dice',"Lo sentimos perdiste !", "error").then(() => {
      this.eliminarEventClick();
      this.inicializar();
    });
  }
}

function empezarJuego() {
  window.juego = new Juego();
}
