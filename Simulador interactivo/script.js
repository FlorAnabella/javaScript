'use strict';
// Variables globales

let maderas;
let MaderaElegida;
let nucleos;
let NucleoElegido;
let arrayVarita = [];
let varitas;
let mensajes;

// Clases y Objetos

class Madera {
    constructor(nombre, color, descripcion) {
        this.color = color;
        this.descripcion = descripcion;
        this.nombre = nombre;
    }

    describirmadera() {
        return "Excelente Elección! esta madera es de color " + this.color + ". " + this.descripcion;
    }
};

class Nucleo {
    constructor(nombre, propiedad) {
        this.nombre = nombre;
        this.propiedad = propiedad;
    }
};

class Varita {
    constructor(madera, nucleo) {
        this.madera = madera;
        this.nucleo = nucleo;
    }
};



// Materias primas + JSON

sessionStorage.setItem("Madera", JSON.stringify([
    new Madera("Manzano", "Gris plata", "Madera noble que se lleva mal con las artes obscuras"),
    new Madera("Cerezo", "Caoba", "Una madera exótica que favorece a gente extravagante"),
    new Madera("Sauce", "Peltre", "Una madera poco común ideal para magia curativa. Muy atractiva. Rechaza vanidosos"),
    new Madera("Serbal", "Obscura", "Madera sólida y confiable, favorece los hechizos de protección"),
    new Madera("Laurel", "Castaño", "Se dice que esta madera es incapaz de cometer actos deshonrosos, pero sin duda favorece a los que buscan gloria")
]));

sessionStorage.setItem("Nucleo", JSON.stringify([
    new Nucleo("Pelo de Veela", "Las varitas con este núcleo son temperamentales. Manejar con cuidado."),
    new Nucleo("Pluma de Fenix", "Las varitas con este núcleo son generalistas. No es habitual ser elegido por una de estas."),
    new Nucleo("Pelo de Unicornio", "Las varitas con este núcleo se vinculan fuertemente con su primer dueño. Son consistentes y confiables"),
    new Nucleo("Pluma de cola de un Pájaro de Trueno", "Las varitas con este núcleo son muy poderosas, pero dominarlas es realmente difícil. Muy valoradas por transmutadores."),
    new Nucleo("Pelo de Kelpie", "Las varitas con este núcleo son fáciles de obtener. En el pasado se usaban mucho, pero ya no son tan frecuentes.")
]));


// Funcion main

function main() {

    mensajes = document.getElementById("mensajes")
    mensajes.innerHTML = "Llegas a la tienda de Ollivander, cargando las cosas adquiridas en el camino. Entras a la tienda, y Garrick Ollivander se encuentra sentado en el piso, con materiales alrededor, agarrándose la cabeza. <br>Cuando te ve llegar, sus ojos se llenan de alegria!<br>'Joven mago!' exclama 'Se me han caído mis materiales y necesito armar tres varitas nuevas! si me ayudas, te llevas tu varita gratis!'";
    maderas = parseMaderas(JSON.parse(sessionStorage.getItem("Madera")));
    nucleos = parseNucleos(JSON.parse(sessionStorage.getItem("Nucleo")));
}

// Funciones maderas

function mostrarMaderas() {

    maderas.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        } else {
            return 1;
        }

    }).forEach((mimadera, index) => {
        let radioBoton = document.createElement("input");
        radioBoton.setAttribute("type", "radio");
        radioBoton.setAttribute("name", "maderas");
        radioBoton.setAttribute("id", index);
        radioBoton.setAttribute("value", mimadera.nombre);
        document.getElementById("lista").appendChild(radioBoton);
        let etiqueta = document.createElement("label");
        etiqueta.setAttribute("for", index);
        etiqueta.innerHTML = mimadera.nombre;
        document.getElementById("lista").appendChild(etiqueta);
    });

    mensajes.innerHTML = "Elije una opción entre las siguientes maderas:";
    document.getElementById("boton").onclick = elegirMadera;
}

function elegirMadera() {

    // Solicita al usuario que elija una madera

    let input = document.forms.lista.elements.maderas;
    const maderaelegida = maderas.find(mimadera => mimadera.nombre.toLowerCase() == input.value.toLowerCase());
    mensajes.innerHTML = maderaelegida.describirmadera();
    let lista = document.getElementById("lista");
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    document.getElementById("boton").onclick = mostrarNucleos;
    MaderaElegida = maderaelegida;
}
// Funciones nucleos

function mostrarNucleos() {

    let inputNucleo = document.createElement("input");
    inputNucleo.id = "texto";
    nucleos.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        } else {
            return 1;
        }
    }).forEach((minucleo, index) => {
        let radioBoton = document.createElement("input");
        radioBoton.setAttribute("type", "radio");
        radioBoton.setAttribute("name", "nucleos");
        radioBoton.setAttribute("id", index);
        radioBoton.setAttribute("value", minucleo.nombre);
        document.getElementById("lista").appendChild(radioBoton);
        let etiqueta = document.createElement("label");
        etiqueta.setAttribute("for", index);
        etiqueta.innerHTML = minucleo.nombre;
        document.getElementById("lista").appendChild(etiqueta);
    });

    mensajes.innerHTML = "Elije una opción entre los siguientes nucleos, CUIDADO! son frágiles!";
    document.getElementById("boton").onclick = elegirNucleo;
}

function elegirNucleo() {

    // Solicita al usuario que elija un Núcleo

    let input = document.forms.lista.elements.nucleos;
    const nucleoelegido = nucleos.find(minucleo => minucleo.nombre.toLowerCase() == input.value.toLowerCase());
    mensajes.innerHTML = nucleoelegido.propiedad;
    let lista = document.getElementById("lista");
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    document.getElementById("boton").onclick = varitaCreada;
    NucleoElegido = nucleoelegido;
}

// Funciones parse

function parseMaderas(maderas) {
    return maderas.map(m => new Madera(m.nombre, m.color, m.descripcion));
}

function parseNucleos(nucleos) {
    return nucleos.map(n => new Nucleo(n.nombre, n.propiedad));
}

function varitaCreada() {

    arrayVarita.push(new Varita(MaderaElegida, NucleoElegido));
    document.getElementById("contador").innerHTML = arrayVarita.length;
    if (arrayVarita.length == 1) {
        mensajes = document.getElementById("mensajes")
        mensajes.innerHTML = "Entonces, la primer varita que haz armado es de " + MaderaElegida.nombre + " y " + NucleoElegido.nombre + "! <br> Ahora, para llevarte tu varita gratis, necesito que ordenes dos varitas más!";

        document.getElementById("boton").onclick = mostrarMaderas;
    } else if (arrayVarita.length < 3) {

        mensajes = document.getElementById("mensajes")
        mensajes.innerHTML = "Genial! Tu segunda varita es de " + MaderaElegida.nombre + " y " + NucleoElegido.nombre + "! <br> Una varitas más!";

        document.getElementById("boton").onclick = mostrarMaderas;

    } else {
        const catalogoFinal = arrayVarita.reduce((msj, mivarita) => { return msj + "<br>" + mivarita.madera.nombre + " con núcleo de " + mivarita.nucleo.nombre }, "");
        mensajes = document.getElementById("mensajes")
        mensajes.innerHTML = "Excelente! Por lo que veo haz creador tres varitas en total: " + catalogoFinal + "<br> Muchísimas gracias! Es hora de elegir tu varita, joven mago, que Hogwarts te está esperando!";
        let boton = document.getElementById("boton");
        document.getElementById("alertas").removeChild(boton);
    }
}