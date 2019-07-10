const doorImage1 = document.getElementById("door1");
const doorImage2 = document.getElementById("door2");
const doorImage3 = document.getElementById("door3");
const gameButton = document.getElementById("gameButton");
const languageButton = document.getElementById("language");
const savedInsects = document.getElementById("savedInsects_counter");
const pesticideAttacks = document.getElementById("pesticideAttacks_counter");

// variables for language settings
const tabTitle = document.getElementById('tabTitle');
const gameTitle = document.getElementById('gameTitle');
const instructionTitle = document.getElementById('instructionTitle');
const instructionText1 = document.getElementById('instructionText1');
const instructionText2 = document.getElementById('instructionText2');
const instructionText3 = document.getElementById('instructionText3');
const instructionText4 = document.getElementById('instructionText4');
const savedInsectsText = document.getElementById('savedInsects_text');
const pesticideAttacksText = document.getElementById('pesticideAttacks_text');
let currentLanguage = 'english'
let dictionaryGameLanguage;

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

let savedInsectsCount = 0;
let pesticideAttacksCount = 0;

// GENERATING IMAGES BEHIND THE THREE DOORS
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

// CLICK FEATURE FOR THE THREE DOORS TO OPEN THEM
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

// CHECK FOR GAME OVER
const checkGameOver = (doorNumber) => {
    if (numClosedDoors === 0) {
        gameIsWon = true;
        setButtonLanguage(dictionaryGameLanguage)
        gameButton.style.cursor = 'pointer'
        setGameCounter()
    }
    else if (
        (doorNumber === 1 && openDoor1 === planeDoorPath) ||
        (doorNumber === 2 && openDoor2 === planeDoorPath) ||
        (doorNumber === 3 && openDoor3 === planeDoorPath)) {
        gameIsLost = true;
        setButtonLanguage(dictionaryGameLanguage)
        gameButton.style.cursor = 'pointer'
        doorImage1.style.cursor = 'initial';
        doorImage2.style.cursor = 'initial';
        doorImage3.style.cursor = 'initial';
        setGameCounter()
    }
}

// STATISTICS FEATURE
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

// BUTTON CLICK TO START A NEW ROUND
gameButton.onclick = () => {
    if (gameIsWon === true || gameIsLost === true) {
        startRound()
    }
}

// LANGUAGE FEATURE
const dictionary = {
    dutch: {
        startButton: 'Succes! 🐝',
        restartLostButton: 'Helaas, nog een keer?',
        restartWonButton: 'Yaaaay! 🐞 Nog een keer?',
        tabTitle: 'Red onze insecten!',
        gameTitle: 'Red onze insecten!',
        instructionTitle: 'Instructies',
        instructionText1: 'Achter één van deze drie deuren bevindt zich een vliegtuig met pesticide dat de insecten doodt.',
        instructionText2: 'Het is aan jou om alle insecten te redden voordat pesticide over ze gespoten wordt.',
        instructionText3: 'Als je alle deuren kunt openen en pas bij de laatste deur het vliegtuig tegenkomt, dan heb je gewonnen!',
        instructionText4: 'Ga aan de slag om onze planeet te redden en de insecten te beschermen!',
        savedInsectsText: 'Geredde insecten',
        pesticideAttacksText: 'Pesticide aanvallen',
    },
    english: {
        startButton: 'Good luck! 🐝',
        restartLostButton: 'Too bad, play again?',
        restartWonButton: 'Congrats! 🐞 Play again?',
        tabTitle: 'Save the Insects!',
        gameTitle: 'Save the Insects!',
        instructionTitle: 'Instructions',
        instructionText1: 'Behind one of these doors is an airplane with pesticide that will kill the insects.',
        instructionText2: 'Your mission is to save all insects before the pesticide reaches them.',
        instructionText3: 'If you manage to open all doors while avoiding the airplane until the very last door, you win!',
        instructionText4: 'See if you can save our planet and protect the insects!',
        savedInsectsText: 'Saved insects',
        pesticideAttacksText: 'Pesticide attacks',
    }
}

const selectGameLanguage = () => {
    dictionaryGameLanguage = dictionary[currentLanguage];
    return dictionaryGameLanguage
}

const setLanguage = (language) => {
    setButtonLanguage(language);
    tabTitle.innerHTML = language.tabTitle;
    gameTitle.innerHTML = language.gameTitle;
    instructionTitle.innerHTML = language.instructionTitle;
    instructionText1.innerHTML = language.instructionText1;
    instructionText2.innerHTML = language.instructionText2;
    instructionText3.innerHTML = language.instructionText3;
    instructionText4.innerHTML = language.instructionText4;
    savedInsectsText.innerHTML = language.savedInsectsText;
    pesticideAttacksText.innerHTML = language.pesticideAttacksText;
}

const setButtonLanguage = (language) => {
    if (numClosedDoors === 3 || (!gameIsLost && !gameIsWon)) {
        gameButton.innerText = language.startButton;
    }
    else if (gameIsLost) {
        gameButton.innerText = language.restartLostButton;
    }
    else if (gameIsWon) {
        gameButton.innerText = language.restartWonButton;
    }
}

// CHANGE THE CURRENT LANGUAGE WHEN CLICKING ON THE LANGUAGE BUTTON
languageButton.onclick = () => {
    if (currentLanguage === 'english') {
        currentLanguage = 'dutch'
        selectGameLanguage()
        setLanguage(dictionaryGameLanguage)
        document.getElementById('language_flag').src = 'images/british_flag.png'
        document.getElementById('language_text').innerHTML = 'EN'
    } else if (currentLanguage === 'dutch') {
        currentLanguage = 'english'
        selectGameLanguage()
        setLanguage(dictionaryGameLanguage)
        document.getElementById('language_flag').src = 'images/dutch_flag.png'
        document.getElementById('language_text').innerHTML = 'NL'
    }
}

// START OF A NEW ROUND
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
    selectGameLanguage()
    setLanguage(dictionaryGameLanguage);
    gameButton.style.cursor = 'initial'
    gameIsWon = false;
    gameIsLost = false;
    languageButton.style.cursor = 'pointer';
}

startRound();
savedInsects.innerHTML = "0"
pesticideAttacks.innerHTML = "0"