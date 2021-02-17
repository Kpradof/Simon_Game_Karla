
var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red","blue","green","yellow"];

var started = false;

var level = 0;

$(".start-button").click(function() {

    if (started === false){
        nextSequence();
    }
    started = true;
});

$(".btn").click(function() {
  var userChosenColor = (this.id);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});




function nextSequence () {
  var randomNumber = Math.floor(Math.random() *4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(60).fadeIn(60);
  level ++;
  $("#level-title").text("Level" + " " +level);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//nextSequence();

function animatePress(currentColor) {
  $(".btn").click(function() {
  var self = $(this);
  self.addClass("pressed")

  setTimeout(function(){
    self.removeClass("pressed");
    },100);
});
}

animatePress();

$(document).keypress(function() {
  if (started === false){
      nextSequence();
  }
  started = true;
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("sucess");
    console.log(userClickedPattern);
    console.log(gamePattern);
    console.log(currentLevel);

console.log(gamePattern.length);
console.log(userClickedPattern.length);

if (userClickedPattern.length === gamePattern.length){

      setTimeout(function(){
          nextSequence();
          userClickedPattern = [];
        },
        1000);
    }

}
  else {

    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart")

    function startOver() {
      level = 0;
      gamePattern = [];
      started = false;
      userClickedPattern = [];
    }

    startOver();

  }

}
