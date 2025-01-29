let scoreo = document.querySelectorAll(".scoreo");
let scorex = document.querySelectorAll(".scorex");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let startBtn = document.querySelector("#start-btn");
let gameOverContainer = document.querySelector(".game-over-container");
let startContainer = document.querySelector(".game-start-container");
let gameOverText = document.querySelector("#game-over");
let main = document.querySelector("main");
let turnO = true; 
let moveCount = 0; 

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnO = true;
  moveCount = 0;
  enableBoxes();
  gameOverContainer.classList.add("hide");
  main.classList.remove("hide");
};

startBtn.addEventListener("click", () => {
  startContainer.classList.add("hide");
  main.classList.remove("hide");
});


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#ed1b76"; 
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#037a76"; 
      turnO = true;
    }
    box.classList.add("disabled");
    moveCount++;

    
    if (checkWinner()) return;
    if (moveCount === 9) gameDraw();
  });
});


const gameDraw = () => {
  gameOverText.innerText = "Game was a Draw.";
  gameOverContainer.classList.remove("hide");
  main.classList.add("hide");
 
};



const enableBoxes = () => {
  boxes.forEach((box) => {
    box.classList.remove("disabled");
    box.innerText = "";
    box.style.color = "";
    box.classList.remove("highlight");
  });
};


const showWinner = (winner, pattern) => {
  pattern.forEach((index) => {
    boxes[index].classList.add("highlight");
  });
  gameOverText.innerText = `Congratulations, Winner is ${winner}`;
  if (winner === "O") {
    scoreo[0].innerText = parseInt(scoreo[0].innerText) + 1;
  } else {
    scorex[0].innerText = parseInt(scorex[0].innerText) + 1;
  }
  gameOverContainer.classList.remove("hide");
  main.classList.add("hide");
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let valA = boxes[a].innerText;
    let valB = boxes[b].innerText;
    let valC = boxes[c].innerText;

    if (valA && valA === valB && valB === valC) {
      showWinner(valA, pattern);
      return true;
    }
  }
  return false;
};




newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
