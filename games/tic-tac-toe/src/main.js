import './style.css'
const tablero = document.querySelector('.tablero');
const contMensjae = document.querySelector('.containerMensaje');

// Estado del juego
const establecerEstadoInicial = () => ({
    estadoTablero: ["", "", "", "", "", "", "", "", ""],
    jugadorActual: "X",
    ganador: null,
    juegoTerminado: false
});

let juego = establecerEstadoInicial()

// Variables del juego
const JUGADAS_GANADORAS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Funciones auxiliares
const modificarTablero = (e) => {
    if (!e.target.classList.contains('celda')) return
    const celdaId = e.target.dataset.id;
    if (juego.estadoTablero[celdaId] !== "") return;
    juego.estadoTablero[celdaId] = juego.jugadorActual
    return true
}

const cambiarTurno = () => {
    (juego.jugadorActual === 'X')
        ? juego.jugadorActual = 'O'
        : juego.jugadorActual = 'X';
}

const renderizarTablero = () => {
    tablero.innerHTML = '';
    juego.estadoTablero.forEach((celda, index) => {
        const div = document.createElement('div');
        div.classList.add('celda');
        div.dataset.id = index;
        div.textContent = celda;
        tablero.append(div)
    })
}

const verificarGanador = () => {
    return JUGADAS_GANADORAS.some(combinacion => {
        const contenidoCelda = juego.estadoTablero[combinacion[0]];
        if (contenidoCelda === "") return false
        return combinacion.every(posicion => juego.estadoTablero[posicion] === contenidoCelda)
    })
}

const finalizarJuego = (resultado) => {
    if (resultado) {
        juego.juegoTerminado = true;
        juego.ganador = juego.jugadorActual
        return `El juego ha terminado; el ganador es ${juego.ganador}`
    }
    if (juego.estadoTablero.every(celda => celda != "")) {
        juego.juegoTerminado = true;
        return `El juego ha terminado en empate`;
    }
}

const mostrarResultado = (mensaje) => {
    const div = document.createElement('div');
    div.classList.add('mensaje');
    div.textContent = mensaje;
    const btnReiniciar = document.createElement('button')
    btnReiniciar.classList.add('reiniciar');
    btnReiniciar.textContent = 'Reiniciar';
    btnReiniciar.addEventListener('click', reiniciarJuego)
    contMensjae.append(div, btnReiniciar)
}

// Funciones manejadoras

const jugarTurno = (e) => {
    if (juego.juegoTerminado) return

    const jugadaValida = modificarTablero(e);
    if (!jugadaValida) return;

    renderizarTablero();
    const hayGanador = verificarGanador()
    const mensaje = finalizarJuego(hayGanador);
    if (mensaje) {
        mostrarResultado(mensaje);
    }
    cambiarTurno();
}

const reiniciarJuego = () => {
    juego = establecerEstadoInicial();
    renderizarTablero();
    contMensjae.innerHTML = "";
}

// Eventos
tablero.addEventListener('click', jugarTurno);

renderizarTablero()