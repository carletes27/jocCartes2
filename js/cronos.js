//************************ SENSE JQUERY EXERCICIS 1, 2 I 3 ***********************//
window.addEventListener('DOMContentLoaded', function (event) {
    // Obtenim l'id 'tauler'
    const tauler = document.getElementById('tauler');

    // Agafem i eliminem el primer fill (i unic) que es la carta d'exemple  
    tauler.firstElementChild.remove();

    // Obtenim un nou array barallat a partir de l'array 'cartes'
    const cartesBarallades = barallaArray(cartes);

    // Mostrem un nou array a la consola
    console.log(cartesBarallades);

    // Dades de la primera carta del array barallat amb shift perquè no es repeteixi
    const primeraCarta = cartesBarallades.shift();

    // Mostrem els detalls de la primera carta per consola
    console.log(`Primera Carta: Text: ${primeraCarta.text}, Any: ${primeraCarta.any}`);

    // Creem els elements de la primera carta
    const primera = document.createElement('div');
    primera.classList.add('carta');
    const titol = document.createElement('h1');
    titol.textContent = primeraCarta.text;
    const imatge = document.createElement('img');
    imatge.src = primeraCarta.imatge;
    const any = document.createElement('div');
    any.textContent = primeraCarta.any;
    any.setAttribute('any', primeraCarta.any);

    // Afegim els elements a la primera carta
    primera.appendChild(titol);
    primera.appendChild(imatge);
    primera.appendChild(any);

    // Afegim la primera carta al tauler
    tauler.appendChild(primera);

});

//************************** AMB JQUERY EXERCICI 4 ****************************//
$(document).ready(function () {
    // Quan l’usuari polsi el botó de Nova carta
    $('#botons button').on('click', function () {
        // Obtenim el div tauler
        const tauler = $('#tauler');

        // Obtenim un nou array barrejat a partir de cartes
        const cartesBarallades = barallaArray(cartes);

        // Agafem la primera carta sense repetir
        const cartaSeg = cartesBarallades.shift();

        // Mostrem els detalls de la nova carta
        console.log(`Nova Carta: Text: ${cartaSeg.text}, Any: ${cartaSeg.any}`);

        // Creem la nova carta amb tots els seus elements
        const novaCarta = $('<div></div>').addClass('carta').append(
            $('<h1></h1>').text(cartaSeg.text),
            $('<img>').attr('src', cartaSeg.imatge),
            $('<div></div>').text('???').attr('any', cartaSeg.any),
            $('<div></div>').append(
                $('<span></span>').addClass('fas fa-arrow-left'),
                $('<span></span>').addClass('fas fa-check'),
                $('<span></span>').addClass('fas fa-arrow-right')
            )
        );

        // Afegim la nova carta al tauler a la dreta de la que hem creat abans
        tauler.append(novaCarta);

        // El botó de Nova carta queda deshabilitat
        $(this).prop('disabled', true);

//************************** SENSE JQUERY EXERCICI 5 **************************//
        // Obtenim la nova carta del DOM
        const segonaCarta = novaCarta[0];

        // Verifiquem que l'element existeixi i seleccionem la fletxa esquerra
        if (segonaCarta) {
            const esquerra = segonaCarta.querySelector('.fa-arrow-left');

            // Agregem l'event a la fletxa esquerra
            esquerra.addEventListener('click', function () {
                const cartaAnterior = segonaCarta.previousElementSibling;
                if (cartaAnterior) {
                    // Movem la segona carta a la esquerra de la carta primera
                    segonaCarta.parentNode.insertBefore(segonaCarta, cartaAnterior);
                }
            });

//******************** AMB JQUERY EXERCICI 6, 7, 8A I 9 **********************//
            // Obtenim la fletxa dreta
            const dreta = $(segonaCarta).find('.fa-arrow-right');

            // Agregem event a la fletxa dreta
            dreta.on('click', function () {

                // Obtenim la carta seguent
                const cartaSeguent = segonaCarta.nextElementSibling;
                if (cartaSeguent) {
                    // Movem la carta a la dreta
                    $(segonaCarta).insertAfter(cartaSeguent);
                }
            });

            // Obtenim el check
            const checkCarta = $(segonaCarta).find('.fa-check');

            // Agregem event al check
            checkCarta.on('click', function () {
                // Obtenim les cartes de la esquerra i la dreta
                const cartaAnterior = $(segonaCarta).prev('.carta');
                const cartaSeguent = $(segonaCarta).next('.carta');
                const anyActual = parseInt($(segonaCarta).find('div[any]').attr('any'));

                // Mostrem l'any
                $(segonaCarta).find('div[any]').text(anyActual);
                console.log(`Carta actual: Any: ${anyActual}`);

                // Creem la variable que ens dirà que passa quan es error o no
                let error = false;

                // Comparació amb la carta esquerra
                if (cartaAnterior.length > 0) {
                    const anyAnterior = parseInt(cartaAnterior.find('div[any]').attr('any'));
                    console.log(`Comparem amb la carta esquerra: Any: ${anyAnterior}`);
                    if (anyActual <= anyAnterior) {
                        console.log("Error: L'any de la carta actual es menor que el de la carta esquerra.");
                        error = true;
                    }
                }

                // Comparació amb la carta dreta
                if (cartaSeguent.length > 0) {
                    const anySeguent = parseInt(cartaSeguent.find('div[any]').attr('any'));
                    console.log(`Comparem amb la carta dreta: Any: ${anySeguent}`);
                    if (!isNaN(anySeguent)) {
                        if (anyActual >= anySeguent) {
                            console.log("Error: L'any de la carta actual es major que el de la carta dreta.");
                            error = true;
                        }
                    } else {
                        console.log('La carta dreta no existeix encara.');
                    }
                }

                // Actuem segons hi ha error o no
                if (error) {
                    console.log("Comparació incorrecta. S'elimina la carta i es descompta un cor.");
                    descontarCor();
                    $(segonaCarta).remove();
                } else {
                    console.log('Comparació correcta.');
                    sumarMarcador();
                }

                // Habilitem el botó de nova carta
                $('#botons button').prop('disabled', false);

                // Ocultem els icones de les cartes (fletxes i check)
                $(segonaCarta).find('.fa-arrow-left, .fa-arrow-right, .fa-check').hide();

            });
        }
    });
});

// Funció per descomptar un cor
function descontarCor() {
    const cors = $('#vides span.fas.fa-heart');
    const contadorCors = cors.length;
    if (contadorCors > 0) {
        // Eliminem l'últim cor
        cors.last().remove();
        if (contadorCors === 1) {
            // Missatge quan no queden vides
            alert("S'ha acabat el joc!");

            // Bloquejem totes les interaccions
            $('#botons button').prop('disabled', true);
            $('#tauler').off();
            $('.fa-arrow-left, .fa-arrow-right, .fa-check').off().css('pointer-events', 'none');
            $('body').css('pointer-events', 'none');
        }
    }
}

//************************ SENSE JQUERY EXERCICI 8B *************************//
function sumarMarcador() {
    const tauler = document.getElementById('tauler');
    const cartes = tauler.getElementsByClassName('carta');
    const marcador = document.getElementById('punts').getElementsByTagName('span')[1];
    marcador.textContent = cartes.length;
}

//********************************************************************************//
//******************** FUNCIONS I VARIABLES PREDEFINIDES *************************//
//********************************************************************************//

//Funció que canvia els elements d'un array en posicions aleatòries (barallar)
function barallaArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

//***************  Array de cartes  ******************************//
let cartes = [{
    "text": "Ampolla de vidre",
    "imatge": "./img/Invent1.jpg",
    "any": "-200"
},
{
    "text": "Jocs de cartes",
    "imatge": "./img/Invent2.jpg",
    "any": "900"
},
{
    "text": "Moviment planetari",
    "imatge": "./img/Invent3.jpg",
    "any": "1513"
},
{
    "text": "Croissant",
    "imatge": "./img/Invent4.jpg",
    "any": "1683"
},
{
    "text": "Primer home a l'espai",
    "imatge": "./img/Invent5.jpg",
    "any": "1961"
},
{
    "text": "Vint mil llegües de viatge submarí",
    "imatge": "./img/Invent6.jpg",
    "any": "1869"
},
{
    "text": "Consola de videojocs",
    "imatge": "./img/Invent7.jpg",
    "any": "1971"
},
{
    "text": "La guerra de les galàxies",
    "imatge": "./img/Invent8.jpg",
    "any": "1977"
},
{
    "text": "Inici muralla Chinesa",
    "imatge": "./img/Invent9.jpg",
    "any": "-600"
},
{
    "text": "Declaració drets humans",
    "imatge": "./img/Invent10.jpg",
    "any": "1789"
},
{
    "text": "Primer gratacels",
    "imatge": "./img/Invent11.jpg",
    "any": "1885"
},
{
    "text": "Ciments de Tenochtitlán",
    "imatge": "./img/Invent12.jpg",
    "any": "1325"
},
{
    "text": "Creació de Facebook",
    "imatge": "./img/Invent13.jpg",
    "any": "2004"
},
{
    "text": "Aparició del hip-hop",
    "imatge": "./img/Invent14.jpg",
    "any": "1974"
},
{
    "text": "Enfonsament del Titànic",
    "imatge": "./img/Invent15.jpg",
    "any": "1912"
},
{
    "text": "Inici Guerra Freda",
    "imatge": "./img/Invent16.jpg",
    "any": "1947"
},
{
    "text": "Alliberament de Nelson Mandela",
    "imatge": "./img/Invent17.jpg",
    "any": "1990"
},
{
    "text": "Aparició de l'agricultura",
    "imatge": "./img/Invent18.jpg",
    "any": "-8000"
},
{
    "text": "Aparició de l'escriptura",
    "imatge": "./img/Invent19.jpg",
    "any": "-3400"
},
{
    "text": "Control del foc",
    "imatge": "./img/Invent20.jpg",
    "any": "-450000"
},
{
    "text": "Desastre de Chernobyl",
    "imatge": "./img/Invent21.jpg",
    "any": "1986"
},
{
    "text": "Inici Segona Guerra Mundial",
    "imatge": "./img/Invent22.jpg",
    "any": "1939"
},
{
    "text": "Raspall de dents",
    "imatge": "./img/Invent23.jpg",
    "any": "1498"
},
{
    "text": "Termòmetre",
    "imatge": "./img/Invent24.jpg",
    "any": "1612"
},
{
    "text": "Telèfon",
    "imatge": "./img/Invent25.jpg",
    "any": "1876"
},
{
    "text": "Osset de peluix",
    "imatge": "./img/Invent26.jpg",
    "any": "1902"
},
{
    "text": "Primer peu a a la lluna",
    "imatge": "./img/Invent27.jpg",
    "any": "1969"
},
{
    "text": "Bombeta",
    "imatge": "./img/Invent28.jpg",
    "any": "1879"
},
{
    "text": "Automòbil",
    "imatge": "./img/Invent29.jpg",
    "any": "1769"
},
{
    "text": "Microscopi",
    "imatge": "./img/Invent30.jpg",
    "any": "1590"
}];