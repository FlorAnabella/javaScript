'use strict';

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

// Materias primas
const maderas = [
    new Madera("Manzano", "Gris plata", "Madera noble que se lleva mal con las artes obscuras"),
    new Madera("Cerezo", "Caoba", "Una madera exótica que favorece a gente extravagante"),
    new Madera("Sauce", "Peltre", "Una madera poco común ideal para magia curativa. Muy atractiva. Rechaza vanidosos"),
    new Madera("Serbal", "Obscura", "Madera sólida y confiable, favorece los hechizos de protección"),
    new Madera("Laurel", "Castaño", "Se dice que esta madera es incapaz de cometer actos deshonrosos, pero sin duda favorece a los que buscan gloria")
];
const nucleos = [
    new Nucleo("Pelo de Veela", "Las varitas con este núcleo son temperamentales. Manejar con cuidado."),
    new Nucleo("Pluma de Fenix", "Las varitas con este núcleo son generalistas. No es habitual ser elegido por una de estas."),
    new Nucleo("Pelo de Unicornio", "Las varitas con este núcleo se vinculan fuertemente con su primer dueño. Son consistentes y confiables"),
    new Nucleo("Pluma de cola de un Pájaro de Trueno", "Las varitas con este núcleo son muy poderosas, pero dominarlas es realmente difícil. Muy valoradas por transmutadores."),
    new Nucleo("Pelo de Kelpie", "Las varitas con este núcleo son fáciles de obtener. En el pasado se usaban mucho, pero ya no son tan frecuentes.")
];

// Funciones
function elegirMadera() {
    // Solicita al usuario que elija una madera
    const catalogo = maderas.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        } else {
            return 1;
        }
    }).reduce((msj, mimadera) => { return msj + "\n" + mimadera.nombre }, "");
    let eleccion = prompt("Elije una opción entre las siguientes maderas, y escribí su nombre: " + catalogo)
    const maderaelegida = maderas.find(mimadera => mimadera.nombre.toLowerCase() == eleccion.toLowerCase());
    window.alert(maderaelegida.describirmadera());
    return maderaelegida;

}

function elegirNucleo() {
    // Solicita al usuario que elija un Núcleo
    const catalogo = nucleos.sort((a, b) => {
        if (a.nombre < b.nombre) {
            return -1;
        } else {
            return 1;
        }
    }).reduce((msj, minucleo) => { return msj + "\n" + minucleo.nombre }, "");
    let eleccion = prompt("Elije una opción entre los siguientes nucleos, y escribí su nombre, CUIDADO! son frágiles!: " + catalogo)
    const nucleoelegido = nucleos.find(minucleo => minucleo.nombre.toLowerCase() == eleccion.toLowerCase());
    window.alert(" Impresionante! Casi creería que eres un experto en el tema!" + nucleoelegido.propiedad);
    return nucleoelegido;
}

function main() {
    window.alert("Llegas a la tienda de Ollivander, cargando las cosas adquiridas en el camino");
    window.alert("Entras a la tienda, y Garrick Ollivander se encuentra sentado en el piso, con materiales alrededor, agarrándose la cabeza");
    window.alert("Cuando te ve llegar, sus ojos se llenan de alegria!");
    window.alert("'Joven mago!' exclama 'Se me han caído mis materiales y necesito armar tres varitas nuevas! si me ayudas, te llevas tu varita gratis!'");
    let maderaelegida = elegirMadera();
    let nucleoelegido = elegirNucleo();
    let objetoVarita =
        new Varita(maderaelegida, nucleoelegido);
    let varitas = [];
    varitas.push(objetoVarita);
    window.alert("Entonces, la primer varita que haz armador es de " + maderaelegida.nombre + " y " + nucleoelegido.nombre + "!");
    window.alert("Ahora, para llevarte tu varita gratis, necesito que ordenes dos varitas más!");
    for (let i = 0; i < 2; i++) {
        maderaelegida = elegirMadera();
        nucleoelegido = elegirNucleo();
        objetoVarita = new Varita(maderaelegida, nucleoelegido);
        varitas.push(objetoVarita);
    }
    const catalogoFinal = varitas.reduce((msj, mivarita) => { return msj + "\n" + mivarita.madera.nombre + " con núcleo de " + mivarita.nucleo.nombre }, "");
    window.alert("Excelente! Por lo que veo haz creador tres varitas en total: " + catalogoFinal);
    window.alert("Muchísimas gracias! Es hora de elegir tu varita, joven mago, que Hogwarts te está esperando!");

}


/* funcion main:
    muestra mensaje bienvenida
    muestra catalogo de maderas
    Pide elegir una madera -> la almacena
    muestra catalogo de nucleos
    pide elegir un nucleo -> Lo amacena
    >>>> construye el objeto varita y lo agrega a la lista <<<<<
    muestra resultado
    pregunta si quiere seguir operando
        si no, mostrar lista y salir
        si si, loop
    
    funcion elegir maderas:
        muestra catalogo numerado. Ordenadas por rareza
        cuando elige retorna valor elegido
*/