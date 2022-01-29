//Para saber si presiona la X o la Y
let xBtn = document.getElementById("x");
let oBtn = document.getElementById("o");
let userLetter = "X";
localStorage.setItem("userLetter", userLetter);

const replace = (currentId) => {
    let activeElement = document.getElementsByClassName("active");
    let newElement = document.getElementById(currentId);

    activeElement[0].className = activeElement[0].className.replace(" active", "");
    newElement.className += " active";
    userLetter = currentId.toLocaleUpperCase();

    localStorage.setItem("userLetter", userLetter);

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