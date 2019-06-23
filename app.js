//// GAME FUNCTIONALITY
/* 
- Player guess a number between min and max
- Player getss a certain number of guesses
- Notify player of guesses remaining
- Notify player of correct answer in loss event
- Let player choose to play again
*/

// game values
let min = 1,
  max = 10,
  winningNUm = randomIntFromRange(min, max),
  guessesLeft = 3;

console.log(`The secret number is ${winningNUm}`);
console.log(`Player has ${guessesLeft} guesses left`);

// UI elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//// EVENT LISTENERS

// reload on game over/play again
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

guessBtn.addEventListener("click", function() {
  let guess = parseInt(guessInput.value);
  console.log("Player guess was ", guess);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "orangered");
  }

  // check if won
  if (guess === winningNUm) {
    // game over, won
    gameOver(true, `You won! ${winningNUm} is correct`);
  } else {
    // subtract guess
    guessesLeft--;
    // check if player has remaining guesses
    if (guessesLeft === 0) {
      console.log(`Player lost. The correct number was ${winningNUm}.`);
      gameOver(false, `You lost. The secret number was ${winningNUm}`);
    } else {
      // game can continue, wrong answer

      // change border color
      guessInput.style.borderColor = "orangered";
      // clear input
      guessInput.value = "";

      console.log(`Player has ${guessesLeft} guesses left`);
      setMessage(
        `Incorrect. You have ${guessesLeft} guesses left`,
        "orangered"
      );
    }
  }
});

// utility functions

// get random number from range
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "lime") : (color = "orangered");

  // disable input
  guessInput.disabled = true;
  // change input border color
  guessInput.style.borderColor = color;
  // set message
  setMessage(msg, color);

  // play again
  guessBtn.value = "PLAY AGAIN";
  guessBtn.className += "play-again";
}
