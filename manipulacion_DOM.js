let listaBanner = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];
const elem = document.getElementsByClassName('imagen_portada');
console.log(elem);
elem.forEach(element){
const img1 = document.createElement("img");
img1.setAttribute("alt", "imagenes aleatorias");
img1.setAttribute("src", alternarImagenes(listaBanner));
element.appendChild(img1)
};

function alternarImagenes(listaImagenes){
    let imagenAleatoria;
    let numeroAleatorio = Math.floor(Math.random*listaImagenes.length);
    imagenAleatoria = listaImagenes[numeroAleatorio]
    return imagenAleatoria
};