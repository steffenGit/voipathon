let speaking = false;
let selected = null;
let isUsernameSet = false;
let isOtherParticipantTalking = false;

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
    if (!isOtherParticipantTalking) {
        initButton();
    }
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
        if (!isOtherParticipantTalking) {
            this.style.backgroundColor = "#dc3545";
            this.style.color = "#fff"
            //todo start call / demant tx
        }
    });

    pttButton.addEventListener("mouseup", function () {
        if (!isOtherParticipantTalking) {
            this.style.backgroundColor = "#fff";
            this.style.color = "#dc3545"
            // todo cease tx
        }
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
            //todo detach group
        }
        this.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
        selected = this;
        //todo attach group
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


function removeItemFromList(list, item) {
    for (let i = 0; i < list.children.length; i++) {
        console.log(list.children[i].textContent);
        if (list.children[i].textContent === item) {
            list.removeChild(list.children[i]);
        }
    }
}

function removeParticipant(user) {
    removeItemFromList(document.getElementById("participantList"), user);
}

function removeGroup(group) {
    removeItemFromList(document.getElementById("groupList"), group);
}

function otherParticipantIsTalking(participant) {
    let pttButton = document.getElementById("PTTButton");
    let surroundingDiv = document.getElementById("pttDiv");
    pttButton.textContent = participant;
    pttButton.style.fontSize = (surroundingDiv.offsetWidth * 0.1) + "px";
    isOtherParticipantTalking = true;
}

function nooneIsTalking() {
    let pttButton = document.getElementById("PTTButton");
    let surroundingDiv = document.getElementById("pttDiv");
    pttButton.textContent = "PTT";
    pttButton.style.fontSize = (surroundingDiv.offsetWidth * 0.3) + "px";
    isOtherParticipantTalking = false;
}