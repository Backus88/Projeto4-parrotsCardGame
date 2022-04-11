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
let controladorTempo = 0;
let tempoSegundos =0;
let tabuleiroOn = true;


function contaTempo() {
   const tempo = document.querySelector(".relogio h2");
   let tempoNumero = tempo.innerHTML;
   tempoNumero = 60*Number(tempoNumero[0]+tempoNumero[1]) + Number(tempoNumero[3]+ tempoNumero[4]) +1;
   const minutes = Math.floor(tempoNumero/60);
   const segundos = tempoNumero%60;
   const contador = `${minutes.toString().padStart(2,"0")}:${segundos.toString().padStart(2,"0")} `
   tempo.innerHTML = contador;
   tempoSegundos =tempoNumero;
}
function resetTempo() {
    const tempoAtual = document.querySelector(".relogio h2");
    tempoAtual.innerHTML = "00:00";
}
function resetCartas(){
    const remover = document.querySelector(".parrotcards");
    while (remover.hasChildNodes()){
        remover.removeChild(remover.lastChild);
    }
}
function fimJogo() {
    let recomecar = 0;
    if (Number(pares) === Number(cartas/2)){
        setTimeout(() => { alert(`Você ganhou em ${numeroJogadas} jogadas! e gastou ${tempoSegundos}segundos!!`) }, 500); 
        clearInterval(controladorTempo);
        const tempoFim = setInterval(() => {
            recomecar = prompt('Quer jogar novamente??, digite sim ou não');
            if (recomecar === 'sim'){
                resetTempo();
                resetCartas();
                startGame();
                clearInterval(tempoFim);
            }
            if(recomecar === 'não'){
                alert('Fim de jogo');
                clearInterval(tempoFim);
            }
        
        }, 1000);
        tabuleiroOn = false;
    }
    console.log(cartas);
}


function startGame(){
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
        `<div class ="cena">
            <div id =${index} class="card" type="button" onclick = "jogar(this, true, true)">
                <div  class="cardverso">
                </div>
            </div>
        </div>`
        
    }
    tabuleiroOn = true;
    numeroJogadas =0;
    pares =0;
    jogo(cartas);
    controladorTempo = setInterval(contaTempo,1000);
}

window.onload = startGame();

function comparador() { 
	return Math.random() - 0.5; 
}

function jogo(numeroCartas) {
    posicaoCartas.length =0;
    for (let index = 0; index < numeroCartas/2; index++) {
        posicaoCartas.push(index);
        posicaoCartas.push(index);
    }
    posicaoCartas.sort(comparador);
    versoCarta = document.querySelectorAll(".parrotcards .cena .card .cardverso");

}

function virarCarta(elemento,permissao, cartaVirar) {
    if(permissao && cartaVirar && tabuleiroOn){
        aux = elemento.querySelector(".cardverso");
        aux.classList.toggle(relacaoCartas[posicaoCartas[elemento.id]]);
    }else{
        console.log("nao pode");
    }
}


function encontrouPar(elemento) {
    if(tabuleiroOn){
        let parFind = document.querySelectorAll(`.${relacaoCartas[posicaoCartas[elemento.id]]}`).length
        travarVirada = document.querySelectorAll(`.${relacaoCartas[posicaoCartas[elemento.id]]}`)
        if(parFind !=2 && numeroJogadas%2 !=0){
            jogadaImpar = travarVirada;
            jogadaImpar[0].parentNode.setAttribute("onclick","jogar(this, true, false)");
        }

        if (parFind ===2 && numeroJogadas%2 ===0){
            travarVirada[0].parentNode.setAttribute("onclick","jogar(this, false, false)");
            travarVirada[1].parentNode.setAttribute("onclick","jogar(this, false, false)");
            pares+= 1;
        }
        if (parFind !=2 && numeroJogadas%2 ===0){
            jogadaImpar[0].parentNode.setAttribute("onclick","jogar(this, true, true)");
            tabuleiroOn = false;
            setTimeout(()=>{
                tabuleiroOn = true;
                setTimeout(()=> {
                    virarCarta(travarVirada[0].parentNode, true, true);
                    virarCarta(jogadaImpar[0].parentNode, true, true);
                },1)
                
            },1000);
        }
    }   
}

function jogar(elemento,permissao, cartaVirar) {
    if (permissao && cartaVirar && tabuleiroOn){
        numeroJogadas +=1;
        virarCarta(elemento,permissao,cartaVirar);
        encontrouPar(elemento);
    }
    console.log(pares);
    console.log(numeroJogadas);
    
    if(tabuleiroOn){
        fimJogo();
    }
}

