const buttonColours =["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameIsOn = true;
let level = 0;


function playSound(name){
    const audio = new Audio(name);
    audio.play().then();
}

function animatePress(currentColour) {
    // $(currentColour).addClass(".pressed").delay(100).removeClass(".pressed");
    $(`.${currentColour}`).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {nextSequence()}, 1000);
        }
    } else {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {$("body").removeClass("game-over")}, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


function nextSequence () {
    userClickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];

    playSound(`./sounds/${randomChosenColour}.mp3`);
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);

    level ++;
    $('#level-title').text(`level ${level}`);
}


$(".btn").on("click", function () {
    const userChosenColour = this.id;

    playSound(`./sounds/${userChosenColour}.mp3`);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    console.log(userChosenColour);
    console.log(gamePattern);
});


$(document).on("keydown", function () {
    nextSequence();
    if (!gameIsOn) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameIsOn = true;
    }
});