let speaking = false;
let selected = null;
let isUsernameSet = false;

window.addEventListener("load", function () {
    initButton();
    location.href = "#popup1";

    document.getElementById("usernameOkButton").addEventListener("click", function () {
        let textFieldValue = document.getElementById("usernameTF").value;
        if (textFieldValue !== "" && textFieldValue !== null && !isUsernameSet) {
            document.getElementById("userInfoDiv").appendChild(document.createTextNode("Username: " + textFieldValue));
            location.href = "#";
            isUsernameSet = true;
        }
    });

    addGroup("Group0");
    addGroup("Group1");
    addGroup("Group2");
    addGroup("Group3");
    addGroup("Group4");

    addParticipant("Raul");
    addParticipant("Steffen");
    addParticipant("Philip");
    addParticipant("Michael");
});

window.addEventListener("resize", function () {
    initButton();
});

function initButton() {
    let pttButton = document.getElementById("PTTButton");
    let surroundingDiv = document.getElementById("pttDiv");
    let size = (surroundingDiv.offsetWidth * 0.8) + "px";
    pttButton.style.height = size;
    pttButton.style.width = size;
    pttButton.style.fontSize = (surroundingDiv.offsetWidth * 0.3) + "px";
    pttButton.style.backgroundColor = "#fff";
    pttButton.style.color = "#dc3545";

    pttButton.addEventListener("mousedown", function () {
        this.style.backgroundColor = "#dc3545";
        this.style.color = "#fff"
    });

    pttButton.addEventListener("mouseup", function () {
        this.style.backgroundColor = "#fff";
        this.style.color = "#dc3545"
    });
}

document.addEventListener("keydown", function (event) {
    if (event.which === 32 && !speaking) {
        speaking = true;
        document.getElementById("PTTButton").dispatchEvent(new Event("mousedown"));
        document.getElementById("PTTButton").dispatchEvent(new Event("mouseover"));
    }
});

document.addEventListener("keyup", function (event) {
    if (event.which === 32) {
        speaking = false;
        document.getElementById("PTTButton").dispatchEvent(new Event("mouseup"));
        document.getElementById("PTTButton").dispatchEvent(new Event("mouseout"));
    }
});

function addGroup(group) {
    addToList(document.getElementById("groupList"), group, function () {
        if (selected !== null) {
            selected.style.backgroundColor = "#fff";
        }
        this.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
        selected = this;
    });
}

function addParticipant(participant) {
    addToList(document.getElementById("participantList"), participant, function () {
    });
}

function addToList(list, item, func) {
    let listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(item));
    listItem.addEventListener("click", func);
    listItem.className = "list-group-item";
    list.appendChild(listItem);
}