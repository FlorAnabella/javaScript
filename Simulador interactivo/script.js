'use strict';
// Variables globales

let MaderaElegida;
let NucleoElegido;

let ollivander;

const mensajes = $("#mensajes");
const boton = $("#boton");
const lista = $("#lista");

// API

const hechizosUrl = "https://fedeperin-harry-potter-api.herokuapp.com/hechizos"
let hechizos;

$(document).ready(function() {
    boton.click(() => {
        boton.fadeOut(100).fadeIn(100, mostrarMaderas);
    });
    $.getJSON(hechizosUrl, function(respuesta, estado) {
        hechizos = respuesta.slice(0, 5);
    });
});


// Si hubiera backend estos datos podrían venir de una base de datos
const maderasBase = [{
        nombre: "Manzano",
        color: "Gris plata",
        descripcion: "Madera noble que se lleva mal con las artes obscuras"
    },
    {
        nombre: "Cerezo",
        color: "Caoba",
        descripcion: "Una madera exótica que favorece a gente extravagante"
    },
    {
        nombre: "Sauce",
        color: "Peltre",
        descripcion: "Una madera poco común ideal para magia curativa. Muy atractiva. Rechaza vanidosos"
    },
    {
        nombre: "Serbal",
        color: "Obscura",
        descripcion: "Madera sólida y confiable, favorece los hechizos de protección"
    },
    {
        nombre: "Laurel",
        color: "Castaño",
        descripcion: "Se dice que esta madera es incapaz de cometer actos deshonrosos, pero sin duda favorece a los que buscan gloria"
    }
];
const nucleosBase = [{
        nombre: "Pelo de Veela",
        propiedad: "Las varitas con este núcleo son temperamentales. Manejar con cuidado."
    },
    {
        nombre: "Pluma de Fenix",
        propiedad: "Las varitas con este núcleo son generalistas. No es habitual ser elegido por una de estas."
    },
    {
        nombre: "Pelo de Unicornio",
        propiedad: "Las varitas con este núcleo se vinculan fuertemente con su primer dueño. Son consistentes y confiables"
    },
    {
        nombre: "Pluma de cola de un Pájaro de Trueno",
        propiedad: "Las varitas con este núcleo son muy poderosas, pero dominarlas es realmente difícil. Muy valoradas por transmutadores."
    },
    {
        nombre: "Pelo de Kelpie",
        propiedad: "Las varitas con este núcleo son fáciles de obtener. En el pasado se usaban mucho, pero ya no son tan frecuentes."
    }
];

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

class Ollivander {
    constructor(maderas, nucleos) {
        this.maderas = maderas.map(m => new Madera(m.nombre, m.color, m.descripcion));
        this.nucleos = nucleos.map(n => new Nucleo(n.nombre, n.propiedad));
        this.varitas = [];
    }

    crearVarita() {
        const madera = this.obtenerMadera(window.sessionStorage.getItem("MaderaElegida"));
        const nucleo = this.obtenerNucleo(window.sessionStorage.getItem("NucleoElegido"));
        const nuevaVarita = new Varita(madera, nucleo);
        ollivander.varitas.push(nuevaVarita);

        document.getElementById("contador").innerHTML = ollivander.varitas.length;
        boton.off("click").click(() => {
            boton.fadeOut(100).fadeIn(100, mostrarMaderas);
        });

        if (ollivander.varitas.length == 1) {
            mensajes.html("Entonces, la primer varita que haz armado es de " + nuevaVarita.toString() + "! <br> Ahora, para llevarte tu varita gratis, necesito que ordenes dos varitas más!");
        } else if (ollivander.varitas.length < 3) {
            mensajes.html("Genial! Tu segunda varita es de " + nuevaVarita.toString() + "! <br> Una varitas más!");
        } else {
            const catalogoFinal = ollivander.varitas.reduce((msj, mivarita) => {
                return msj + "<br>" + mivarita.madera.nombre + " con núcleo de " + mivarita.nucleo.nombre
            }, "");
            mensajes.html("Excelente! Por lo que veo haz creador tres varitas en total: " + catalogoFinal + "<br> Muchísimas gracias! Es hora de probar tu propia varita, joven mago!");
            boton.off("click").click(() => {

                const hechizoRandom = hechizos[Math.floor(Math.random() * hechizos.length)];
                mensajes.html(hechizoRandom.hechizo).fadeOut(1000).fadeIn(1000, () => {
                    mensajes.html("Perfecto! Gracias por confiar en Ollivander! Ahora vete,  que Hogwarts te está esperando!");
                });
                boton.remove();
                this.probarVarita();
            });

        }
    }

    elegirMadera() {
        window.sessionStorage.setItem("MaderaElegida", elegirOpcion(this.maderas, mostrarNucleos));
    }

    elegirNucleo() {
        window.sessionStorage.setItem("NucleoElegido", elegirOpcion(this.nucleos, varitaCreada));
    }

    obtenerMadera(nombre) {
        return this.maderas.find(madera => madera.nombre.toLowerCase() == nombre.toLowerCase());
    }

    obtenerNucleo(nombre) {
        return this.nucleos.find(nucleo => nucleo.nombre.toLowerCase() == nombre.toLowerCase());
    }

    mostrarMaderas() {
        const mensaje = "Elije una opción entre las siguientes maderas:";
        mostrarOpciones(this.maderas, mensaje, elegirMadera);
    }

    mostrarNucleos() {
        const mensaje = "Elije una opción entre los siguientes nucleos, CUIDADO! son frágiles!";
        mostrarOpciones(this.nucleos, mensaje, elegirNucleo);
    }

};


// Funcion main

function main() {

    mensajes.html("Llegas a la tienda de Ollivander, cargando las cosas adquiridas en el camino. Entras a la tienda, y Garrick Ollivander se encuentra sentado en el piso, con materiales alrededor, agarrándose la cabeza. <br>Cuando te ve llegar, sus ojos se llenan de alegria!<br>'Joven mago!' exclama 'Se me han caído mis materiales y necesito armar tres varitas nuevas! si me ayudas, te llevas tu varita gratis!'");
    ollivander = new Ollivander(maderasBase, nucleosBase);
}

function mostrarOpciones(elementos, mensaje, proximaFaseCallback) {
    elementos.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        } else {
            return 1;
        }

    }).forEach((element, index) => {
        lista.append(`<input id="${index}" type="radio" name="opciones" value="${element.nombre}" />`);
        lista.append(`<label for="${index}">${element.nombre}</label>`);
    });

    mensajes.innerHTML = mensaje;
    boton.off("click").click(() => {
        boton.fadeOut(100).fadeIn(100, proximaFaseCallback);
    });
}

function elegirOpcion(elementos, proximaFaseCallback) {

    const valor = $("input[name=opciones]:checked").val();
    const elementoElegido = elementos.find(elemento => elemento.nombre.toLowerCase() == valor.toLowerCase());
    mensajes.html(elementoElegido.toString());
    lista.empty()
    boton.off("click").click(() => {
        boton.fadeOut(100).fadeIn(100, proximaFaseCallback);
    });
    return valor;
}


// Funciones para que el botón avance la historia

// Esto es algo redundante, pero lo hacemos porque si le paso el método al botón me cambia el valor de this.
// Cada una de estas funciones está porque es "una pantalla diferente"
function mostrarMaderas() {
    ollivander.mostrarMaderas()
}

function mostrarNucleos() {
    ollivander.mostrarNucleos()
}

function elegirMadera() {
    ollivander.elegirMadera();
}

function elegirNucleo() {
    ollivander.elegirNucleo();
}

function varitaCreada() {
    ollivander.crearVarita();
}

function probarVarita() {
    ollivander.probarVarita();
}