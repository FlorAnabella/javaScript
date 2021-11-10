'use strict';

class Madera {
    constructor(nombre, color, descripcion) {
        this.color = color;
        this.descripcion = descripcion;
        this.nombre = nombre;
    }
}

class Nucleo {
    constructor(nombre, propiedad) {
        this.nombre = nombre;
        this.propiedad = propiedad;
    }
}

let maderas = [
    new Madera("Manzano", "Gris plata", "Madera noble que se lleva mal con las artes obscuras"),
    new Madera("Cerezo", "Caoba", "Una madera exótica que favorece a gente extravagante"),
    new Madera("Sauce", "Peltre", "Una madera poco común ideal para magia curativa. Muy atractiva. Rechaza vanidosos"),
    new Madera("Serbal", "Obscura", "Madera sólida y confiable, favorece los hechizos de protección"),
    new Madera("Laurel", "Castaño", "Se dice que esta madera es incapaz de cometer actos deshonrosos, pero sin duda favorece a los que buscan gloria")
];
let nucleos = [
    new Nucleo("Pelo de Veela", "Las varitas con este núcleo son temperamentales. Manejar con cuidado."),
    new Nucleo("Pluma Fenix", "Las varitas con este núcleo son generalistas. No es habitual ser elegido por una de estas."),
    new Nucleo("Pelo de Unicornio", "Las varitas con este núcleo se vinculan fuertemente con su primer dueño. Son consistentes y confiables"),
    new Nucleo("Pluma de cola de un Pájaro de Trueno", "Las varitas con este núcleo son muy poderosas, pero dominarlas es realmente difícil. Muy valoradas por transmutadores."),
    new Nucleo("Pelo de Kelpie", "Las varitas con este núcleo son fáciles de obtener. En el pasado se usaban mucho, pero ya no son tan frecuentes.")
];