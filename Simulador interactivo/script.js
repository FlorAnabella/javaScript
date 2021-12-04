'use strict';
// Variables globales

let maderas;
let MaderaElegida;
let nucleos;
let NucleoElegido;
let arrayVarita = [];
let varitas;

const mensajes = document.getElementById("mensajes");
const boton = document.getElementById("boton");

// Clases y Objetos

class Madera {
    constructor(nombre, color, descripcion) {
        this.color = color;
        this.descripcion = descripcion;
        this.nombre = nombre;
    }

    toString() {
        return "Excelente Elección! esta madera es de color " + this.color + ". " + this.descripcion;
    }
};

class Nucleo {
    constructor(nombre, propiedad) {
        this.nombre = nombre;
        this.propiedad = propiedad;
    }

    toString() {
        return this.propiedad;
    }
};

class Varita {
    constructor(madera, nucleo) {
        this.madera = madera;
        this.nucleo = nucleo;
    }

    toString() {
        return this.madera.nombre + " y " + this.nucleo.nombre;
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

    mensajes.innerHTML = "Llegas a la tienda de Ollivander, cargando las cosas adquiridas en el camino. Entras a la tienda, y Garrick Ollivander se encuentra sentado en el piso, con materiales alrededor, agarrándose la cabeza. <br>Cuando te ve llegar, sus ojos se llenan de alegria!<br>'Joven mago!' exclama 'Se me han caído mis materiales y necesito armar tres varitas nuevas! si me ayudas, te llevas tu varita gratis!'";
    maderas = parseMaderas(JSON.parse(sessionStorage.getItem("Madera")));
    nucleos = parseNucleos(JSON.parse(sessionStorage.getItem("Nucleo")));
}

function mostrarOpciones(elementos, mensaje, proximaFaseCallback) {
    elementos.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        } else {
            return 1;
        }

    }).forEach((element, index) => {
        let radioBoton = document.createElement("input");
        radioBoton.setAttribute("type", "radio");
        radioBoton.setAttribute("name", "opciones");
        radioBoton.setAttribute("id", index);
        radioBoton.setAttribute("value", element.nombre);
        document.getElementById("lista").appendChild(radioBoton);
        let etiqueta = document.createElement("label");
        etiqueta.setAttribute("for", index);
        etiqueta.innerHTML = element.nombre;
        document.getElementById("lista").appendChild(etiqueta);
    });

    mensajes.innerHTML = mensaje;
    boton.onclick = proximaFaseCallback;
}

function elegirOpcion(elementos, proximaFaseCallback) {
    const input = document.forms.lista.elements.opciones;
    const elementoElegido = elementos.find(elemento => elemento.nombre.toLowerCase() == input.value.toLowerCase());
    mensajes.innerHTML = elementoElegido.toString();
    let lista = document.getElementById("lista");
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
    boton.onclick = proximaFaseCallback;
    return elementoElegido;
}


// Funciones maderas

function mostrarMaderas() {
    const mensaje = "Elije una opción entre las siguientes maderas:";
    mostrarOpciones(maderas, mensaje, elegirMadera);
}

function elegirMadera() {
    // Muestra qué madera eligió
    MaderaElegida = elegirOpcion(maderas, mostrarNucleos);
}

// Funciones nucleos

function mostrarNucleos() {
    const mensaje = "Elije una opción entre los siguientes nucleos, CUIDADO! son frágiles!";
    mostrarOpciones(nucleos, mensaje, elegirNucleo);
}

function elegirNucleo() {
    // Muestra qué madera eligió
    NucleoElegido = elegirOpcion(nucleos, varitaCreada);
}

// Funciones parse

function parseMaderas(maderas) {
    return maderas.map(m => new Madera(m.nombre, m.color, m.descripcion));
}

function parseNucleos(nucleos) {
    return nucleos.map(n => new Nucleo(n.nombre, n.propiedad));
}

function varitaCreada() {
    let nuevaVarita = new Varita(MaderaElegida, NucleoElegido);
    arrayVarita.push(nuevaVarita);
    document.getElementById("contador").innerHTML = arrayVarita.length;
    boton.onclick = mostrarMaderas;

    if (arrayVarita.length == 1) {
        mensajes.innerHTML = "Entonces, la primer varita que haz armado es de " + nuevaVarita.toString() + "! <br> Ahora, para llevarte tu varita gratis, necesito que ordenes dos varitas más!";
    } else if (arrayVarita.length < 3) {
        mensajes.innerHTML = "Genial! Tu segunda varita es de " + nuevaVarita.toString() + "! <br> Una varitas más!";
    } else {
        const catalogoFinal = arrayVarita.reduce((msj, mivarita) => { return msj + "<br>" + mivarita.madera.nombre + " con núcleo de " + mivarita.nucleo.nombre }, "");
        mensajes.innerHTML = "Excelente! Por lo que veo haz creador tres varitas en total: " + catalogoFinal + "<br> Muchísimas gracias! Es hora de elegir tu varita, joven mago, que Hogwarts te está esperando!";
        document.getElementById("alertas").removeChild(boton);
    }
}
