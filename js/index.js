window.addEventListener("load", function () {
    setButtonSize();
});

window.addEventListener("resize", function () {
    setButtonSize();
});

function setButtonSize() {
    let pttButton = document.getElementById("PTTButton");
    let surroundingDiv = document.getElementById("pttDiv");
    let size = (surroundingDiv.offsetWidth * 0.8) + "px";
    pttButton.style.height = size;
    pttButton.style.width = size;
    pttButton.style.fontSize = (surroundingDiv.offsetWidth * 0.3) + "px";

    pttButton.addEventListener("mouseover", function () {
        console.log("bla");
    });
}

document.addEventListener("keydown", function(event) {
    if(event.which === 32) {
        document.getElementById("PTTButton").onmousedown();
        document.getElementById("PTTButton").onmouseover();
    }
});

document.addEventListener("keyup", function () {
   if(event.which === 32) {
       document.getElementById("PTTButton").onmouseup();
       document.getElementById("PTTButton").onmouseout();
   }
});