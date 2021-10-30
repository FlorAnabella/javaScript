function funcionPrincipal() {
    let dia = parseInt(prompt("Ingresá tu día de nacimiento"));
    let mes = parseInt(prompt("Ingresá tu mes de nacimiento"));
    let año = parseInt(prompt("Ingresá tu año de nacimiento"));
    let carta = numerologia(dia, mes, año);
    mostrarCarta(carta);
}

function numerologia(dia, mes, año) {
    let suma = dia + mes + año;
    do {
        let acumulador = 0;
        while (suma != 0) {
            acumulador += suma % 10;
            suma = Math.trunc(suma / 10)
        }
        suma = acumulador;
    } while (suma > 21);
    return suma;
}

function mostrarCarta(carta) {
    if (carta == 0) {
        alert("Tu carta es El Loco!")
    } else if (carta == 1) {
        alert("Tu carta es El Mago!")
    } else if (carta == 2) {
        alert("Tu carta es La Sacerdotisa!")
    } else if (carta == 3) {
        alert("Tu carta es La Emperatriz!")
    } else if (carta == 4) {
        alert("Tu carta es El Emperador!")
    } else if (carta == 5) {
        alert("Tu carta es El Hierofante!")
    } else if (carta == 6) {
        alert("Tu carta es Los Enamorados!")
    } else if (carta == 7) {
        alert("Tu carta es El Carro!")
    } else if (carta == 8) {
        alert("Tu carta es La Justicia!")
    } else if (carta == 9) {
        alert("Tu carta es El Ermitaño!")
    } else if (carta == 10) {
        alert("Tu carta es La Rueda!")
    } else if (carta == 11) {
        alert("Tu carta es La Fuerza!")
    } else if (carta == 12) {
        alert("Tu carta es El Colgado!")
    } else if (carta == 13) {
        alert("Tu carta es La Muerte!")
    } else if (carta == 14) {
        alert("Tu carta es La Templanza!")
    } else if (carta == 15) {
        alert("Tu carta es El Diablo!")
    } else if (carta == 16) {
        alert("Tu carta es La Torre!")
    } else if (carta == 17) {
        alert("Tu carta es La Estrella!")
    } else if (carta == 18) {
        alert("Tu carta es La Luna!")
    } else if (carta == 19) {
        alert("Tu carta es El Sol!")
    } else if (carta == 20) {
        alert("Tu carta es El Eón!")
    } else if (carta == 21) {
        alert("Tu carta es El Mundo!")
    }

}

funcionPrincipal();