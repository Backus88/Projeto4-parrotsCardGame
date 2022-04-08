const relacaoCartas = {
    0: "bobrossparrot",
    1: "explodyparrot",
    2: "fiestaparrot",
    3: "metalparrot",
    4: "revertiparrot",
    5: "tripletsparrot",
    6: "unicornparrot"
}
const posicaoCartas = [];

window.onload = function startGame(){
    let cartas = prompt("Escolha o numero de Cartas:4-14");
    while(cartas%2 !=0 || cartas < 4 || cartas >=15 || isNaN(cartas)){
        alert('Entrava Inválida');
        cartas = prompt("Escolha o numero de Cartas:4-14, apenas numero par");
    }
    let largura = 20+ ((Number(cartas)/2)*117);
    largura = largura+"px";
    document.querySelector(".parrotcards").setAttribute("style","width:"+largura);

    const addCards = document.querySelector(".parrotcards");
    for (let index = 0; index < cartas; index++){
        addCards.innerHTML += 
        `<div id =${index} class="card" type="button" onclick = "virarCarta(this)">
            <div  class="cardverso">
            </div>
        </div>`
    }
    jogo(cartas);
}
function comparador() { 
	return Math.random() - 0.5; 
}

function jogo(numeroCartas) {

    for (let index = 0; index < numeroCartas/2; index++) {
        posicaoCartas.push(index);
        posicaoCartas.push(index);
    }
    posicaoCartas.sort(comparador);
    versoCarta = document.querySelectorAll(".parrotcards .card .cardverso");

}

function virarCarta(elemento) {
    aux = elemento.querySelector(".cardverso");
    console.log(elemento);
    aux.classList.toggle(relacaoCartas[posicaoCartas[elemento.id]]);
}

