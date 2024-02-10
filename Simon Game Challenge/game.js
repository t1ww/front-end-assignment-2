// write code here
// hi
// alert("hello welcome to simon game");
// setting
Audio.volume = 0.1;

// variables
var started = false;
var starting = false;
var level = 0;
// arrays
const buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColour = null;
var gamePattern = [];
var userChosenColour = null;
var userClickedPattern = [];

var buttonDivs = document.querySelectorAll('div[type="button"]');
/// functions
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
}
Array.prototype.print = function () {
    var str = "";
    this.forEach((element) => {
        str += element + ",";
    });
    console.log(str);
}

function buttonDivsSetPressed(){
    buttonDivs.forEach(function (div) {
        div.classList.add('pressed');
    });
}
function buttonDivsRemovePressed(){
    buttonDivs.forEach(function (div) {
        div.classList.remove('pressed');
    });
}
//
function fadeInOut(element, duration) {
    // Fade in
    element.style.opacity = 0;
    var fadeInInterval = setInterval(function () {
        element.style.opacity += 1;
        if (element.style.opacity >= 1) {
            clearInterval(fadeInInterval);

            // Fade out
            var fadeOutInterval = setInterval(function () {
                element.style.opacity -= 1;
                if (element.style.opacity <= 0) {
                    clearInterval(fadeOutInterval);

                    // Reset opacity for next fadeIn
                    element.style.opacity = 1;
                }
            }, duration / 10);
        }
    }, duration / 10);
}


// keypress
window.addEventListener(
    "keydown",
    function (e) {
        if (e.key === "r") {
            startOver();
        }
        if (started === false && level === 0 && e.key === "s") {
            gameStart();
        }
    },
    false
);
// audio
function playAudioColor(color) {
    let a = new Audio(`./sounds/color/${color}.mp3`);
    a.play();
}
/// game functions
function startOver() {
    started = false;
    starting = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    document.getElementById("level-title").innerHTML = `Press S Key to Start`;
    buttonDivsRemovePressed();
}
function gameStart() {
    if(starting) return;
    starting = true;
    // change title to game start
    document.getElementById("level-title").innerHTML = `game starting, Good Luck C;`;
    buttonDivsSetPressed();
    // start sequence
    setTimeout(() => {
        if(started || level > 0) return; // dont run if already started
        // reset
        started = true;
        buttonDivsRemovePressed();
        // start sequence
        nextSequence();
    }, 1000);
}
function gameOver() {
    started = false;
    // set effects
    buttonDivsSetPressed();
    document.body.classList.add('game-over');
    new Audio(`./sounds/wrong.mp3`).play();
    document.getElementById("level-title").innerHTML = `Game Over, Press R Key to Restart`;
    setTimeout(() => {
        document.body.classList.remove('game-over');
    }, 1000);
}
function nextSequence() {
    level++; // next level
    // set title level
    document.getElementById("level-title").innerHTML = `level : ${level.toString()}`;
    userClickedPattern = []; // reset pattern
    // random the next pattern
    randomChosenColour = buttonColors.random();
    buttonClicked(randomChosenColour);
    // push sequence
    gamePattern.push(randomChosenColour);
    gamePattern.print();
}
/// game logic
function animatePress(buttonId) {
    let buttonClassList = document.getElementById(buttonId).classList;
    if (!buttonClassList.contains("pressed")) {
        buttonClassList.add("pressed");
    }
    setTimeout(() => {
        if (!started) return; // dont run if game already over
        buttonClassList.remove("pressed");
    }, 300);
}
function checkAnswer() {
    // add userChosencolor
    userClickedPattern.push(userChosenColour);
    // check if clicked pattern is the subset of gamepattern
    let correct_order = true;
    userClickedPattern.forEach(function (element, index) {
        if (element !== gamePattern[index]) {
            correct_order = false;
        }
    });
    if (!correct_order) {
        gameOver();
    }
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
            if (!started) return; // dont run if game already over
            nextSequence();
        }, 1200);
    }
}

/// buttons handling
// Add click event listener to each matching div
buttonDivs.forEach(function (div) {
    div.onclick = function () {
        userButtonClick(div.id);
    };
});
function buttonClicked(buttonId) {
    // select the color
    userChosenColour = buttonId;
    // button pressing effects
    animatePress(buttonId);
    playAudioColor(buttonId);
    fadeInOut(document.getElementById(buttonId), 1800);
}
function userButtonClick(buttonId) {
    if (!started) return; // dont run if not started
    buttonClicked(buttonId);
    console.log(`user clicked ${buttonId}`);
    // checking for answer
    checkAnswer();
}
