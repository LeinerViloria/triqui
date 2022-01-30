/**
 * Se crean las constantes para las letras X y O
 */

const X = '<span class="equis equisGroup letraPersonalizada">X</span>';
const O = '<span class="circle circleGroup letraPersonalizada">O</span>';
let PLAYER={
    letter : null,
    character : null,
    group : null
};
let PC={
    letter : null,
    character : null,
    group : null
};

let movesX = 0;
let movesO = 0;

//Formas de ganar
const WAYS_TO_WIN = {
    "horizontal" : [
        {
            first : "11",
            second : "12",
            third : "13"
        },
        {
            first : "21",
            second : "22",
            third : "23"
        },
        {
            first : "31",
            second : "32",
            third : "33"
        }
    ],
    "vertical" : [
        {
            first : "11",
            second : "21",
            third : "31"
        },
        {
            first : "12",
            second : "22",
            third : "32"
        },
        {
            first : "13",
            second : "23",
            third : "33"
        }
    ],
    "diagonal" : [
        {
            first : "11",
            second : "22",
            third : "33"
        },
        {
            first : "13",
            second : "22",
            third : "31"
        }
    ]
};

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

//Traigo el span para decir quien gano
const winnerSpan = document.getElementById("winner");

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
//Hay victoria y el juego se detiene
let victory = false;

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

const showWinner = (winner) => {
    winnerSpan.textContent = winner;
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

    if(victory==false){
        zone.innerHTML = PLAYER.letter;
    }
    let finishMove;

    if(PLAYER.character=="x"){
        addMoveToX();
    }else if(PLAYER.character=="o"){
        addMoveToO();
    }

    loadTurn(PC.character);
    showMoves();
    play=false;

    finishMove = whoDidItWin(PLAYER.group);

    if(finishMove){
        showWinner("Gano el jugador");
        victory = true;
    }

    if((movesX+movesO)<9 & victory==false){
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
    if(currentDiv===""){
        return true;
    }else{
        return false;
    }
}

const lookOverOneWay = (position, ids) => {
    let first = false;
    let second = false;
    let third = false;

    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];

        if(id == position.first){
            first = true;
        }
        if(id == position.second){
            second = true;
        }
        if(id == position.third){
            third = true;
        }

    }

    /**
     * Si entra aqui es porque hay 3 ids
     * que coinciden con alguna forma de ganar
     */
    if(first & second & third){
        return true;
    }else{
        return false;
    }
}

const lookOverTheWays = (way, ids) => {
    let itsEquals = false;

    for (let i = 0; i < way.length; i++) {
        const position = way[i];
        const equality = lookOverOneWay(position, ids);
        
        if(equality){
            itsEquals = true;
            break;
        }
    }

    return itsEquals;
}

const verifyVictory = (ids) => {
    let horizonallyEqual, verticallyEqual, diagonallyEqual;

    diagonallyEqual = lookOverTheWays(WAYS_TO_WIN.diagonal, ids);
    
    if(diagonallyEqual==false){
        verticallyEqual = lookOverTheWays(WAYS_TO_WIN.vertical, ids);

        if(verticallyEqual){
            //Gano verticalmente
            return true;
        }

    }else{
        //Gano diagonalmente
        return true;
    }

    if (diagonallyEqual==false && verticallyEqual==false) {
        horizonallyEqual = lookOverTheWays(WAYS_TO_WIN.horizontal, ids);

        if(horizonallyEqual){
            //Gano horizontalmente
            return true;
        }else{
            //No gano de ninguna manera
            return false;
        }
    }
}

const whoDidItWin = (group) => {
    let spans = document.getElementsByClassName(group);
    let ids = [];
    let verification;
    
    for (let i = 0; i < spans.length; i++) {
        const span = spans[i];
        const idSpan = span.parentElement.id;
        ids.push(idSpan);
    }

    verification = verifyVictory(ids);

    return verification;
}

const pcMove = () => {
    let verification;
    let finishMove;
    while(play==false && victory==false){
        let position1 = numRandow();
        let position2 = numRandow();
        let final = position1+""+position2;
        verification = verifyPosition(final);
        console.log(victory);
        if(verification){
            putThePcMove(final);
            finishMove = whoDidItWin(PC.group);

            if(finishMove){
                showWinner("Gano el pc");
                victory = true;
                play = false;
            }else{
                play = true;
            }

        }
    }
}

const userTurn = (origin) => {
    if(play & victory==false){
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
            PLAYER.group = "equisGroup";
            PC.letter=O;
            PC.character = "o";
            PC.group = "circleGroup";

            play = true;
            showMoves();
        }else{
            /**
             * En el caso de que el jugador haya elegido O
             */
             loadPlayers("PC", "YOU");
             PC.letter = X;
             PC.character = "x";
             PC.group = "equisGroup";
             PLAYER.letter = O;
             PLAYER.character = "o";
             PLAYER.group = "circleGroup";
             showMoves();
             pcMove();
        }
    }
};