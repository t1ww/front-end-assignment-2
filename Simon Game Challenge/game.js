// write code here
// hi
alert("hello welcome to simon game");
// setting
Audio.volume = 0.1;

// variables
const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var userChosenColour = null;
var randomChosenColour = null;

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
// keypress
window.addEventListener(
    "keydown",
    function (e) {
        if (e.key === "r") {
            gameStart();
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
function gameStart() {
    // reset
    level = 0;
    started = true;
    // change title to game start
    document.getElementById("level-title").innerHTML = `game started | level : ${level.toString()}`;
    // start sequence
    nextSequence();
}
function nextSequence() {
    level++; // next level
    // set title level
    document.getElementById("level-title").innerHTML = `game started | level : ${level.toString()}`;
    userClickedPattern = []; // reset pattern
    // random the next pattern
    randomChosenColour = buttonColors.random();
    playAudioColor(randomChosenColour);
    fadeInOut(document.getElementById(randomChosenColour), 3000);
    // push sequence
    gamePattern.push(randomChosenColour);
}

/// buttons handling
var buttonDivs = document.querySelectorAll('div[type="button"]');
// Add click event listener to each matching div
buttonDivs.forEach(function (div) {
    div.onclick = function () {
        buttonClicked(div.id);
    };
});
function buttonClicked(buttonId) {
    // Your custom function logic goes here
    playAudioColor(buttonId);
    fadeInOut(document.getElementById(buttonId), 1800);
}
