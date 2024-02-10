// write code here
// hi
alert("hello welcome to simon game");
// lib
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
// variables
const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
// audio
function playAudioColor(color){
    let a = new Audio(`./sounds/color/${randomChosenColour}.mp3`);
    a.play();
}

// keypress
window.addEventListener(
    "keydown",
    function (e) {
        if (started === false && e.key === "a") {
            gameStart();
        }
    },
    false
);
function gameStart() {
    // reset
    level = 0;
    started = true;
    // change title to game start
    document.getElementById(
        "level-title"
    ).innerHTML = `game started | level : ${level.toString()}`;
    // start sequence
    nextSequence();
}
function nextSequence() {
    level++; // next level
    // set title level
    document.getElementById(
        "level-title"
    ).innerHTML = `game started | level : ${level.toString()}`;
    userClickedPattern = []; // reset pattern
    // random the next pattern
    randomChosenColour = buttonColors.random();
    playAudioColor(randomChosenColour);

}
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
