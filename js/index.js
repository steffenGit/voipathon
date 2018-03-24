let speaking = false;

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

    pttButton.addEventListener("mousedown", function () {
        this.style.backgroundColor = "#dc3545";
        this.style.color = "#fff"
    });

    pttButton.addEventListener("mouseup", function () {
        this.style.backgroundColor = "#fff";
        this.style.color = "#dc3545"
    });
}

document.addEventListener("keydown", function(event) {
    if(event.which === 32 && !speaking) {
        speaking = true;
        document.getElementById("PTTButton").dispatchEvent(new Event("mousedown"));
        document.getElementById("PTTButton").dispatchEvent(new Event("mouseover"));
    }
});

document.addEventListener("keyup", function (event) {
   if(event.which === 32) {
       speaking = false;
       document.getElementById("PTTButton").dispatchEvent(new Event("mouseup"));
       document.getElementById("PTTButton").dispatchEvent(new Event("mouseout"));
   }
});