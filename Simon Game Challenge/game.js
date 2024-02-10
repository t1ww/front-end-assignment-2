// write code here
// hi
alert("hello welcome to simon game");
// setting
Audio.volume = 0.1;

// variables
var started = false;
var level = 0;
const buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColour = null;
var gamePattern = [];
var userChosenColour = null;
var userClickedPattern = [];

/// functions
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
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
Array.prototype.print = function () {
    var str = "";
    this.forEach((element) => {
        str += element + ",";
    });
    console.log(str);
};
// keypress
window.addEventListener(
    "keydown",
    function (e) {
        if (e.key === "r") {
            startOver();
        }
        if (started === false && e.key === "s") {
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
    document.getElementById("level-title").innerHTML = `Press S Key to Start`;
}
function gameStart() {
    // change title to game start
    document.getElementById("level-title").innerHTML = `game starting, Good Luck C;`;
    buttonDivs.forEach(function (div) {
        div.classList.add('pressed');
    });
    // start sequence
    setTimeout(() => {
        // reset
        level = 0;
        started = true;
        gamePattern = [];
        userClickedPattern = [];
        buttonDivs.forEach(function (div) {
            div.classList.remove('pressed');
        });
        // start sequence
        nextSequence();
    }, 1000);
}
function gameOver() {
    document.body.classList.add('game-over');
    started = false;
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
var buttonDivs = document.querySelectorAll('div[type="button"]');
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
