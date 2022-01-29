/**
 * Se crean las constantes para las letras X y O
 */

const X = '<span class="equis letraPersonalizada">X</span>';
const O = '<span class="circle letraPersonalizada">O</span>';
let PLAYER={
    letter : null,
    character : null
};
let PC={
    letter : null,
    character : null
};

let movesX = 0;
let movesO = 0;

//Formas de ganar
const waysToWin = {
    "horizontal" : [
        {
            primera : "11",
            segunda : "12",
            tercera : "13"
        },
        {
            primera : "21",
            segunda : "22",
            tercera : "23"
        },
        {
            primera : "31",
            segunda : "22",
            tercera : "33"
        }
    ],
    "vertical" : [
        {
            primera : "11",
            segunda : "21",
            tercera : "31"
        },
        {
            primera : "12",
            segunda : "22",
            tercera : "32"
        },
        {
            primera : "13",
            segunda : "23",
            tercera : "33"
        }
    ],
    "diagonal" : [
        {
            primera : "11",
            segunda : "22",
            tercera : "33"
        },
        {
            primera : "13",
            segunda : "22",
            tercera : "31"
        }
    ]
};

console.log(waysToWin);

//Traigo a cada cuadro de la cuadrilla del juego
//Estas son las zonas del juego
const c11 = document.getElementById("11");
const c12 = document.getElementById("12");
const c13 = document.getElementById("13");
const c21 = document.getElementById("21");
const c22 = document.getElementById("22");
const c23 = document.getElementById("23");
const c31 = document.getElementById("31");
const c32 = document.getElementById("32");
const c33 = document.getElementById("33");

//Traigo el boton de reinicio
const home = document.getElementById("home");

//Traigo los span de X y O para ver quien es quien
const spanX = document.getElementById("spanX");
const numMovesX = document.getElementById("movesX");
const spanO = document.getElementById("spanO");
const numMovesO = document.getElementById("movesO");

//Traigo el span que cargará el turno
const turn = document.getElementById("turn");
let currentTurn = "X";
//Para saber cuándo el jugador puede jugar
let play = false;

//Para sacar aleatoriamente la posicion en la que jugara el pc
const numRandow = () => {
    let min = 1;
    let max = 3;
    let a = parseInt(max) - parseInt(min) + 1;
    let b = Math.random();
    let c = (b * (a));
    let d = Math.floor( c );
    let x = d + parseInt(min);

    return x;
}

//Para que se cargue el turno
const loadTurn = (letter) => {
    letter = letter.toUpperCase();
    turn.textContent = letter;
}

const addMoveToX = () => {
    movesX++;
}

const addMoveToO = () => {
    movesO++;
}

const loadPlayers = (playerX, playerO) => {
    spanX.textContent = "X ("+playerX+")";
    spanO.textContent = "O ("+playerO+")";
}

const showMoves = () =>{
    numMovesX.textContent = movesX+" movimientos";
    numMovesO.textContent = movesO+" movimientos";
}

const putThePlayerMove = (zone) => {
    zone.innerHTML = PLAYER.letter;

    if(PLAYER.character=="x"){
        addMoveToX();
    }else if(PLAYER.character=="o"){
        addMoveToO();
    }

    loadTurn(PC.character);
    showMoves();
    play=false;

    if((movesX+movesO)<9){
        pcMove();
    }
}

const putThePcMove = (id) => {
    let zone = document.getElementById(id);
    zone.innerHTML = PC.letter;
    if(PC.character=="x"){
        addMoveToX();
    }else if(PC.character=="o"){
        addMoveToO();
    }

    loadTurn(PLAYER.character);
    showMoves();
}

const verifyPosition = (position) => {
    let currentDiv = document.getElementById(position);
    /**
     * Para evitar problemas en caso de que ese div contenga 
     * espacios en su contenido, por precaucion, se pasa
     * por el trim()
     */
    currentDiv = currentDiv.innerHTML;
    currentDiv = currentDiv.trim();
    //True, puede ocupar ese cuadro
    //False, ya esta ocupado ese cuadro
    console.log("Estoy buscando");
    if(currentDiv===""){
        return true;
    }else{
        return false;
    }
}

const pcMove = () => {
    let verification;
    while(play==false){
        let position1 = numRandow();
        let position2 = numRandow();
        let final = position1+""+position2;
        verification = verifyPosition(final);

        if(verification){
            putThePcMove(final);

            play = true;
        }
    }
}

const userTurn = (origin) => {
    if(play){
        let verification = verifyPosition(origin.id);
        
        if(verification){
            putThePlayerMove(origin);
        }

    }
}

//Manejo el onclick de cada caja
c11.onclick = () =>{
    userTurn(c11);
}

c12.onclick = () =>{
    userTurn(c12);
}

c13.onclick = () =>{
    userTurn(c13);
}

c21.onclick = () =>{
    userTurn(c21);
}

c22.onclick = () =>{
    userTurn(c22);
}

c23.onclick = () =>{
    userTurn(c23);
}

c31.onclick = () =>{
    userTurn(c31);
}

c32.onclick = () =>{
    userTurn(c32);
}

c33.onclick = () =>{
    userTurn(c33);
}

home.onclick = () => {
    goToHome();
}

const goToHome = () => {
    window.location.href="../index.html";
}

window.onload = () => {
    if(localStorage.getItem("userLetter")===null){
        //Escribo asi la direccion porque este script se llamó desde view
        goToHome();
    }else{
        if(localStorage.getItem("userLetter")===currentTurn){
            /**
             * En el caso de que el jugador haya elegido X
             */
            loadPlayers("YOU", "CPU");
            PLAYER.letter=X;
            PLAYER.character = "x";
            PC.letter=O;
            PC.character = "o";

            play = true;
            showMoves();
        }else{
            /**
             * En el caso de que el jugador haya elegido O
             */
             loadPlayers("PC", "YOU");
             PC.letter = X;
             PC.character = "x";
             PLAYER.letter = O;
             PLAYER.character = "o";
             showMoves();
             pcMove();
        }
    }
};