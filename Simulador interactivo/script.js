function elegirServicio() {
    //Variables//

    window.alert("Precios: Carta natal = 3500");
    window.alert("Precios: Lectura de Tarot = 500");
    window.alert("Pidiendo más de un servicio te llevás descuentos!");
    let nombre = prompt("Ingresar email");
    let cartaNatal = prompt("Deseás comprar una carta natal? s/n");
    let lecturaDeTarot = prompt("Deseás una lectura de tarot? s/n");
    let cantidadDePreguntas = parseInt(prompt("Cuántas preguntas querés? Ingresar número"));

    //Condicionales//
    if (cartaNatal == "s") {
        cartaNatal = true;
    } else {
        cartaNatal = false
    }
    if (lecturaDeTarot == "s") {
        lecturaDeTarot = true;
    } else {
        lecturaDeTarot = false
    }

    //Llamado a la función//
    calcularDescuento(cartaNatal, lecturaDeTarot, cantidadDePreguntas);
}

//función 2//

function calcularDescuento(cartaNatal, lecturaDeTarot, cantidadDePreguntas) {

    let precioCarta = 3500;
    let precioTarot = 500

    if (cartaNatal == true) {
        if (lecturaDeTarot == true) {
            if (cantidadDePreguntas > 3) {
                mostrarResultado((precioCarta + precioTarot) * 0.8);
            } else {
                mostrarResultado((precioCarta + precioTarot) * 0.9);
            }
        } else {
            mostrarResultado(precioCarta);
        }

    } else {
        if (lecturaDeTarot == true) {
            if (cantidadDePreguntas > 3) {
                mostrarResultado(precioTarot * 0.8);
            } else {
                mostrarResultado(precioTarot);
            }
        } else {
            window.alert("Gracias! hasta la próxima!");
        }
    }
}

function mostrarResultado(costoTotal) {
    window.alert("Tu precio final es " + costoTotal);
}


elegirServicio();

/*si pide carta natal + lectura de tarot = descuento, 
si pide más de 3 preguntas = descuento
si no pide carta natal + lectura de tarot = no descuento
si no pide mas de tres preguntas = no descuento
*/