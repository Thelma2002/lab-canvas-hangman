// Hangman class to manage the game logic
class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  // Method to randomly pick a word from the list
  pickWord() {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  // Method to check if the pressed key is a letter
  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90;
  }

  // Method to check if the letter has already been clicked
  checkClickedLetters(letter) {
    return !this.letters.includes(letter);
  }

  // Method to add a correctly guessed letter to the guessedLetters string
  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  // Method to add a wrong letter to the letters array and decrement errorsLeft
  addWrongLetter(letter) {
    if (!this.letters.includes(letter)) {
      this.errorsLeft--;
      this.letters.push(letter);
      hangmanCanvas.drawHangman(this.errorsLeft);  // Draw hangman figure after wrong guess
    }
  }

  // Method to check if the game is over (no errors left)
  checkGameOver() {
    return this.errorsLeft <= 0;
  }

  // Method to check if the player has won (all letters guessed)
  checkWinner() {
    return [...this.secretWord].every(letter => this.guessedLetters.includes(letter));
  }
}

// Global variables for the Hangman game and canvas
let hangman;
let hangmanCanvas;

// Event listener for the start game button
const startGameButton = document.getElementById('start-game-button');

startGameButton.addEventListener('click', () => {
  hangman = new Hangman(['node', 'javascript', 'react', 'miami', 'paris', 'amsterdam', 'lisboa']);
  hangmanCanvas = new HangmanCanvas(hangman.secretWord);
  hangmanCanvas.createBoard();
});

// Event listener for keydown events to handle letter guessing
document.addEventListener('keydown', event => {
  if (hangman && hangmanCanvas) {
    const letter = event.key.toLowerCase();

    if (hangman.checkIfLetter(event.keyCode)) {
      if (hangman.checkClickedLetters(letter)) {
        if (hangman.secretWord.includes(letter)) {
          hangman.addCorrectLetter(letter);
          hangmanCanvas.writeCorrectLetter(letter);
        } else {
          hangman.addWrongLetter(letter);
          hangmanCanvas.writeWrongLetter(letter, hangman.errorsLeft);
        }

        // Check for game over or winner status
        if (hangman.checkGameOver()) hangmanCanvas.gameOver();
        if (hangman.checkWinner()) hangmanCanvas.winner();
      }
    }
  }
});