var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var patternClick = -1;

var buttonColours = [
    "red",
    "blue",
    "green",
    "yellow"
];

$(document).keypress(nextSequence);

function nextSequence() {
    level = level + 1;
    var randomNumber = Math.trunc(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("h1").html("Level " + level);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});

function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed").removeClass(currentColour);
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed").addClass(currentColour);
    }, 100);
}

function checkAnswer() {
    patternClick = patternClick + 1;
    if (userClickedPattern[patternClick] !== gamePattern[patternClick]) {
        $("h1").html("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    } else if ((patternClick + 1) === level) {
        userClickedPattern = [];
        patternClick = -1;
        setTimeout(nextSequence, 500);
    }
}

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    patternClick = -1;
    level = 0;
}