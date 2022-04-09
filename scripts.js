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
let numeroJogadas = 0;
let cartas = 0;
let jogadaImpar =0;
let pares = 0;

window.onload = function startGame(){
    cartas = prompt("Escolha o numero de Cartas:4-14");
    while(cartas%2 !=0 || cartas < 4 || cartas >=15 || isNaN(cartas)){
        alert('Entrava Inválida');
        cartas = prompt("Escolha o numero de Cartas:4-14, apenas numero par");
    }
    let largura = 20+ ((Number(cartas)/2)*151);
    largura = largura+"px";
    document.querySelector(".parrotcards").setAttribute("style","width:"+largura);

    const addCards = document.querySelector(".parrotcards");
    for (let index = 0; index < cartas; index++){
        addCards.innerHTML += 
        `<div id =${index} class="card" type="button" onclick = "jogar(this, true)">
            <div  class="cardverso">
            </div>
        </div>`
    }
    numeroJogadas =0;
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

function virarCarta(elemento,permissao = true) {
    if(permissao){
        aux = elemento.querySelector(".cardverso");
        console.log(elemento);
        aux.classList.toggle(relacaoCartas[posicaoCartas[elemento.id]]);
    }else{
        console.log("nao pode");
    }
}


function encontrouPar(elemento) {
    let parFind = document.querySelectorAll(`.${relacaoCartas[posicaoCartas[elemento.id]]}`).length
    travarVirada = document.querySelectorAll(`.${relacaoCartas[posicaoCartas[elemento.id]]}`)
    if(parFind !=2 && numeroJogadas%2 !=0){
        jogadaImpar = travarVirada;
    }

    if (parFind ===2 && numeroJogadas%2 ===0){
        travarVirada[0].parentNode.setAttribute("onclick","jogar(this, false)");
        travarVirada[1].parentNode.setAttribute("onclick","jogar(this, false)");
        pares+= 1;
    }
    if (parFind !=2 && numeroJogadas%2 ===0){
        setTimeout(virarCarta, 1000, travarVirada[0].parentNode, true);
        setTimeout(virarCarta, 1000, jogadaImpar[0].parentNode, true);
    }
}

function fimJogo() {
    if (Number(pares) === Number(cartas/2)){
        setTimeout(() => { alert(`Você ganhou em ${numeroJogadas} jogadas!`); }, 500);   
    }
    console.log(cartas);
}


function jogar(elemento,permissao) {
    numeroJogadas += 1;
    virarCarta(elemento,permissao);
    encontrouPar(elemento);
    console.log(pares);
    fimJogo();
}

