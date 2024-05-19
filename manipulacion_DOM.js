/*
Hacer una funcion que saque las fotos y un texto asociado a cada foto con sentido. Ej: 1.jpg con el texto: este es el jpg 1.
*/
//Variables
let listaBanner = ["banner/1.jpg", "banner/2.jpg", "banner/3.jpg", "banner/4.jpg", "banner/5.jpg", "banner/6.jpg", "banner/7.jpg", "banner/8.jpg"];
let textosBanner = ["Anochecer en Valdelahiguera", 
"La carrera mas aburrida del planeta", 
"Qemtrails, Dubai intentando que llueva", 
"¿Por que disfrutar del campo si puedes acabar con el helio del planeta?", 
"Esta foto la hice cuando termine este proyecto: 2am", 
"Por aquí murio Gandalf luchando contra el Balrog", 
"Tiro a la paloma edicion ciegos", 
"Si la choni de mi pueblo fuese a Hogwarts, esta sería sin duda su varita"];
let listaCiudades = ["Bilbao", "Teruel", "Sevilla", "Mostoles", "Azuqueca de Henares", "Valdelaparra de abajo"]
let listaViajes = ["viajes/viajes-1.jpg", "viajes/viajes-2.jpg", "viajes/viajes-3.jpg", "viajes/viajes-4.jpg", "viajes/viajes-5.jpg", "viajes/viajes-6.jpg", "viajes/viajes-7.jpg"];
let textosViajes = ["Gozadera en hamaca", "Camino al paraiso", "Mas perdido que el Pirri", "Viva Sevilla!", "Ole, ole y ole", "La curva del agujero", "Mi humilde castillo"]
let parrafosLocos = ["mola mucho la playa, pero un verano en THE BRIDGE mola mas... (no llores, los adultos no lloran)",
    "Las vistas molan pero el hospital mas cercano esta a 500km",
     "los beneficios de tener google maps son incalculables",
     "Lo que mas me gusta de sevilla son las mujeres sevillanas, pero la jiralda no esta mal",
     "la verdad es que en esta plaza hace mas calor que en la comunión de Charmander", 
     "esto es galicia fijo, todo humedo y con nubes, falta el de la gaita en la colina",
     "Un humilde castillo de hace mil años rodeado de las madrigueras que usamos ahora de casas... si Carlos V levantara la cabeza..."];
//Eventos

//Funciones
//1. crea una imagen y un texto aleatorios relacionados a partir de dos listas
function alternarImagenes(listaImagenes, listaTextos){
    let img_text = [];
    let imagenAleatoria;
    let textoAleatorio;
    let numeroAleatorio = Math.floor(Math.random()*listaImagenes.length);
    imagenAleatoria = listaImagenes[numeroAleatorio];
    indice = listaImagenes.indexOf(imagenAleatoria);
    textoAleatorio = listaTextos[indice];
    img_text[0] = imagenAleatoria;
    img_text[1] = textoAleatorio;
    return img_text;
};

//2. Funcion para crear una imagen con parametros un array y un texto.
function crearImagen(jpgImagenes, textos){
    let imagenNueva = alternarImagenes(jpgImagenes, textos);
    let jpgImagen = imagenNueva[0];
    let texto = imagenNueva[1];
    const imagen = document.createElement("img");
    imagen.setAttribute("src", jpgImagen);
    imagen.setAttribute("alt", texto);
    imagen.setAttribute("title", texto);
    return imagen;
};

//3. Crear la imagen de la portada
function imagenPortada(){
    let imagenPortada = crearImagen(listaBanner, textosBanner);
    let elemento1 = document.querySelector(".imagen_portada");
    elemento1.appendChild(imagenPortada);
};
setTimeout(imagenPortada(), 500);//tengo que meter tiempo porque si no, lee antes el js que el DOM y da null.

/*no se como manipular elementos de un Node.object de HTML. 
let a = document.getElementsByClassName("imagen_portada");
console.log(a);*/

//4. crear las imagenes de los artículos y que no se repitan.
function imagenArticulo(){
    const articulos = document.querySelectorAll(".imagen_viaje");
    let arrayComparacion = [];
    articulos.forEach(function (e) {
        let imagen;
        do{
        imagen = crearImagen(listaViajes, textosViajes);
        arrayComparacion.push(imagen.src)
        } while (arrayComparacion.indexOf(imagen.src) !== arrayComparacion.length-1)
        e.appendChild(imagen);
    }
    )
};
imagenArticulo();

//5. crear un titulo y un comentario dependiendo de la imagen que salga.
function crearArticulos(){
    const padre = document.querySelectorAll(".articulo");
    padre.forEach(function(e){
        const hermano = e.previousElementSibling;
        const sobrino = hermano.firstElementChild;
        const sobrino_imagen = sobrino.src;
        let src = sobrino_imagen.substring(sobrino_imagen.length - 19);
        const hijo1 = e.firstElementChild;
        const hijo2 = e.lastElementChild;
        let indice = listaViajes.indexOf(src);
        hijo1.textContent = textosViajes[indice];
        hijo2.textContent = parrafosLocos[indice];
    })
};
crearArticulos()

//6. crear una lista desplegable que según elijas construya un texto y un titulo en la seccion de las imagenes.
function crearLista(){
    const destinos = document.querySelector(".destinos");
    const titulo = document.createElement("h2");
    titulo.setAttribute("class", "subtitulo");
    const lista = document.createElement("select")
    lista.setAttribute("name", "listaDesplegable")
    destinos.appendChild(titulo);
    titulo.textContent = "Destinos";
    destinos.appendChild(lista);
    for (let i = 0; i < listaCiudades.length; i++){
        let ciudad = document.createElement("option");
        ciudad.textContent = listaCiudades[i];
        lista.appendChild(ciudad);
    }
};
crearLista();

//7.Escuchar la opcion de la lista y cambiar las imagenes y los textos del DOM sin repetir ninguno.
function cambiarImagenes (){
    let padre = document.querySelector("select");
    padre.addEventListener("change", function(e){
        const fotos = document.querySelectorAll(".imagen_viaje");
        let imagen;
        let arrayComparacion=[];
        let imagenAleatoria=[];
        fotos.forEach(function(e){
            do {
                imagenAleatoria = alternarImagenes(listaViajes, textosViajes);
                arrayComparacion.push(imagenAleatoria[0])
            } while (arrayComparacion.indexOf(imagenAleatoria[0]) !== arrayComparacion.length-1)
            imagen = e.lastElementChild
            imagen.setAttribute("src", imagenAleatoria[0]);
            imagen.setAttribute("alt", imagenAleatoria[1]);
            imagen.setAttribute("title", imagenAleatoria[1]);
            let articulo = e.nextElementSibling;
            let indice = listaViajes.indexOf(imagenAleatoria[0]);
            let titulo = articulo.firstElementChild;
            titulo.textContent = textosViajes[indice];
            let parrafo = articulo.lastElementChild;
            parrafo.textContent = parrafosLocos[indice];
        })
    })
}
cambiarImagenes();