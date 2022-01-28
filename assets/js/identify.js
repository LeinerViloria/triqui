//Para saber si presiona la X o la Y
let xBtn = document.getElementById("x");
let oBtn = document.getElementById("o");
let userLetter = "O";

const replace = (currentId) => {
    let activeElement = document.getElementsByClassName("active");
    let newElement = document.getElementById(currentId);

    activeElement[0].className = activeElement[0].className.replace(" active", "");
    newElement.className += " active";
    userLetter = currentId.toLocaleUpperCase();

    console.log(userLetter);

}

const xActive = () => {
    replace("x");
}

const oActive = () => {
    replace("o");
}

xBtn.onclick = () => {
    xActive();
}

oBtn.onclick = () => {
    oActive();
}