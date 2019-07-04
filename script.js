let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let button = document.querySelector("button");

const planeDoorPath = "images/plane.jpg";
const beeDoorPath = "images/bee.jpg";
const ladybugDoorPath = "images/ladybug.jpg";
const closedDoorPath = "images/door.jpg";



// let gameState = {
// }

// const resetGameState = () => {
//     gameState = {
//         openDoor1: undefined,
//         door1Clickcounter: 0,
//         state: 'in-progress', // 'won', 'lost'
//         numClosedDoors: 3
//     };
// }

let openDoor1;
let openDoor2;
let openDoor3;
let door1Clickcounter = 0;
let door2Clickcounter = 0;
let door3Clickcounter = 0;
let numClosedDoors = 3;
let gameIsWon = false;
let gameIsLost = false


const doorGenerator = () => {
    let randomNumber = Math.floor(Math.random() * (numClosedDoors - 1))
    if (randomNumber === 0) {
        openDoor1 = planeDoorPath;
        openDoor2 = beeDoorPath;
        openDoor3 = ladybugDoorPath;
    } else if (randomNumber === 1) {
        openDoor1 = ladybugDoorPath;
        openDoor2 = planeDoorPath;
        openDoor3 = beeDoorPath;
    } else if (randomNumber === 2) {
        openDoor1 = beeDoorPath;
        openDoor2 = ladybugDoorPath;
        openDoor3 = planeDoorPath;
    } else {
        console.log("Something went wrong in the while executing the generateDoors function")
    }
}

doorImage1.onclick = () => {
    if (!alreadyClicked(door1Clickcounter)) {
        doorImage1.src = openDoor1;
        doorImage1.style.cursor = 'initial';
        clickCounter(1);
        checkGameOver(1);
    }
}

doorImage2.onclick = () => {
    if (!alreadyClicked(door2Clickcounter)) {
        doorImage2.src = openDoor2;
        doorImage2.style.cursor = 'initial';
        clickCounter(2);
        checkGameOver(2);
    }
}

doorImage3.onclick = () => {
    if (!alreadyClicked(door3Clickcounter)) {
        doorImage3.src = openDoor3;
        doorImage3.style.cursor = 'initial';
        clickCounter(3);
        checkGameOver(3);
    }
}

const clickCounter = (number) => {
    numClosedDoors--
    if (number === 1) {
        door1Clickcounter++
    } else if (number === 2) {
        door2Clickcounter++
    } else if (number === 3) {
        door3Clickcounter++
    }
}

const alreadyClicked = (doorCounter) => {
    if (doorCounter === 0) {
        return false
    }
    return true
}

const checkGameOver = (doorNumber) => {
    if (numClosedDoors === 0) {
        gameIsWon = true;
        button.innerText = "Congrats! 🐞 Play again?";
        button.style.cursor = 'pointer'
    }
    else if (
        (doorNumber === 1 && openDoor1 === planeDoorPath) ||
        (doorNumber === 2 && openDoor2 === planeDoorPath) ||
        (doorNumber === 3 && openDoor3 === planeDoorPath)) {
        gameIsLost = true
        button.innerText = "Too bad, play again?";
        button.style.cursor = 'pointer'
    }
}

button.onclick = () => {
    if (gameIsWon === true || gameIsLost === true) {
        startRound()
    }
}

const startRound = () => {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3
    doorGenerator();
    doorImage1.style.cursor = 'pointer';
    doorImage2.style.cursor = 'pointer';
    doorImage3.style.cursor = 'pointer';
    door1Clickcounter = 0;
    door2Clickcounter = 0;
    door3Clickcounter = 0;
    button.innerText = 'Good luck! 🐝'
    button.style.cursor = 'initial'
    gameIsWon = false;
    gameIsLost = false;
}


startRound();