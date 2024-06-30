const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 1;

document.addEventListener("keypress", () => {
  if (!started) {
    document.querySelector("#level-title").textContent = `Level ${level}`;
    
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  document.querySelector("#level-title").textContent = `Level ${level}`;
  level++;
  const randomChosenColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColor);

  buttonDesign(randomChosenColor);
 music(randomChosenColor);
}

function music(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function buttonDesign(chosenColor) {
  let btn = document.getElementById(chosenColor);
  btn.classList.add("pressed");
  setTimeout(() => {
    btn.classList.remove("pressed");
  }, 100);
}
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", ButtonClick);
});
function ButtonClick(event) {
  let userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  buttonDesign(userChosenColor);
  music(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    music("wrong");
    document.querySelector("body").classList.add("game-over");
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
    
    setTimeout(() => {
      document.querySelector("body").classList.remove("game-over");
    }, 200);
    
    startOver();
  }
}

function startOver() {
  level = 1;
  gamePattern = [];
  started = false;
}



