let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let button = document.getElementById("gameButton");
let language = document.getElementById("language");
let savedInsects = document.getElementById("savedInsects_counter");
let pesticideAttacks = document.getElementById("pesticideAttacks_counter");

const planeDoorPath = "images/plane.jpg";
const beeDoorPath = "images/bee.jpg";
const ladybugDoorPath = "images/ladybug.jpg";
const closedDoorPath = "images/door.jpg";

let openDoor1;
let openDoor2;
let openDoor3;
let door1Clickcounter = 0;
let door2Clickcounter = 0;
let door3Clickcounter = 0;
let numClosedDoors = 3;
let gameIsWon = false;
let gameIsLost = false
let currentLanguage = 'english'
let savedInsectsCount = 0;
let pesticideAttacksCount = 0;

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
    if (!alreadyClicked(door1Clickcounter) && !gameIsLost) {
        doorImage1.src = openDoor1;
        doorImage1.style.cursor = 'initial';
        clickCounter(1);
        checkGameOver(1);
    }
}

doorImage2.onclick = () => {
    if (!alreadyClicked(door2Clickcounter) && !gameIsLost) {
        doorImage2.src = openDoor2;
        doorImage2.style.cursor = 'initial';
        clickCounter(2);
        checkGameOver(2);
    }
}

doorImage3.onclick = () => {
    if (!alreadyClicked(door3Clickcounter) && !gameIsLost) {
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
        updateButton()
        button.style.cursor = 'pointer'
        setGameCounter()
    }
    else if (
        (doorNumber === 1 && openDoor1 === planeDoorPath) ||
        (doorNumber === 2 && openDoor2 === planeDoorPath) ||
        (doorNumber === 3 && openDoor3 === planeDoorPath)) {
        gameIsLost = true;
        updateButton()
        button.style.cursor = 'pointer'
        doorImage1.style.cursor = 'initial';
        doorImage2.style.cursor = 'initial';
        doorImage3.style.cursor = 'initial';
        setGameCounter()
    }
}

const setGameCounter = () => {
    if (gameIsWon) {
        savedInsectsCount += 2;
        savedInsects.innerHTML = savedInsectsCount;
    } else if (gameIsLost && numClosedDoors === 1) {
        pesticideAttacksCount++;
        pesticideAttacks.innerHTML = pesticideAttacksCount;
        savedInsectsCount++;
        savedInsects.innerHTML = savedInsectsCount;
    } else if (gameIsLost && numClosedDoors === 2) {
        pesticideAttacksCount++;
        pesticideAttacks.innerHTML = pesticideAttacksCount;
    }
}

button.onclick = () => {
    if (gameIsWon === true || gameIsLost === true) {
        startRound()
    }
}

language.onclick = () => {
    if (currentLanguage === 'english') {
        currentLanguage = 'dutch'
        setLanguage(currentLanguage)
        document.getElementById('language_flag').src = 'images/british_flag.png'
        document.getElementById('language_text').innerHTML = 'EN'
    } else if (currentLanguage === 'dutch') {
        currentLanguage = 'english'
        setLanguage(currentLanguage)
        document.getElementById('language_flag').src = 'images/dutch_flag.png'
        document.getElementById('language_text').innerHTML = 'NL'
    }
}

const setLanguage = (language) => {
    if (language === 'dutch') {
        setLanguageToDutch()
        setButtonToDutch()
    } else if (language === 'english') {
        setLanguageToEnglish()
        setButtonToEnglish()
    }
}

const setLanguageToEnglish = () => {
    document.getElementById('tabTitle').innerHTML = "Save the Insects!";
    document.getElementById('gameTitle').innerHTML = "Save the Insects!";
    document.getElementById('instructionTitle').innerHTML = "Instructions";
    document.getElementById('instructionText1').innerHTML = "Behind one of these doors is an airplane with pesticide that will kill the insects.";
    document.getElementById('instructionText2').innerHTML = "Your mission is to save all insects before the pesticide reaches them.";
    document.getElementById('instructionText3').innerHTML = "If you manage to open all doors while avoiding the airplane until the very last door, you win!"
    document.getElementById('instructionText4').innerHTML = "See if you can save our planet and protect the insects!"
    document.getElementById('savedInsects_text').innerHTML = "Saved insects"
    document.getElementById('pesticideAttacks_text').innerHTML = "Pesticide attacks"
}

const setLanguageToDutch = () => {
    document.getElementById('tabTitle').innerHTML = "Red onze insecten!";
    document.getElementById('gameTitle').innerHTML = "Red onze insecten!";
    document.getElementById('instructionTitle').innerHTML = "Instructies";
    document.getElementById('instructionText1').innerHTML = "Achter één van deze drie deuren bevindt zich een vliegtuig met pesticide dat de insecten doodt.";
    document.getElementById('instructionText2').innerHTML = "Het is aan jou om alle insecten te redden voordat pesticide over ze gespoten wordt.";
    document.getElementById('instructionText3').innerHTML = "Als je alle deuren kunt openen en pas bij de laatste deur het vliegtuig tegenkomt, dan heb je gewonnen!"
    document.getElementById('instructionText4').innerHTML = "Ga aan de slag om onze planeet te redden en de insecten te beschermen!"
    document.getElementById('savedInsects_text').innerHTML = "Geredde insecten"
    document.getElementById('pesticideAttacks_text').innerHTML = "Pesticide aanvallen"
}

const setButtonToEnglish = () => {
    if (numClosedDoors === 3 || (!gameIsLost && !gameIsWon)) {
        button.innerText = "Good luck! 🐝";
    }
    else if (gameIsLost) {
        button.innerText = "Too bad, play again?";
    }
    else if (gameIsWon) {
        button.innerText = "Congrats! 🐞 Play again?";
    }
}

const setButtonToDutch = () => {
    if (numClosedDoors === 3 || (!gameIsLost && !gameIsWon)) {
        button.innerText = "Succes! 🐝";
    }
    else if (gameIsLost) {
        button.innerText = "Helaas, nog een keer?";
    }
    else if (gameIsWon) {
        button.innerText = "Yaaaay! 🐞 Nog een keer?";

    }
}

const updateButton = () => {
    if (currentLanguage === 'dutch') {
        setButtonToDutch()
    } else if (currentLanguage === 'english') {
        setButtonToEnglish()
    };
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
    setLanguage(currentLanguage);
    button.style.cursor = 'initial'
    gameIsWon = false;
    gameIsLost = false;
    language.style.cursor = 'pointer';
}

startRound();
savedInsects.innerHTML = "0"
pesticideAttacks.innerHTML = "0"