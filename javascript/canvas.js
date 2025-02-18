// HangmanCanvas class to manage the drawing on the canvas
class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
  }

  // Method to create the initial game board
  createBoard() {
    this.context.clearRect(0, 0, 600, 400);  // Clear the canvas
    this.drawLines();  // Draw lines for each letter in the secret word
  }

  // Method to draw lines representing each letter of the secret word
  drawLines() {
    const startX = 100;  // Starting X position for the lines
    const startY = 350;  // Y position for the lines
    const lineWidth = 50;  // Width between each line

    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.beginPath();
      this.context.moveTo(startX + i * lineWidth, startY);
      this.context.lineTo(startX + i * lineWidth + 30, startY);
      this.context.stroke();
    }
  }

  // Method to write the correct letter in the corresponding position
  writeCorrectLetter(letter) {
    if (!letter) return;  // Avoid undefined issues
    const startX = 105;  // Starting X position for the letters
    const startY = 340;  // Y position for the letters
    const lineWidth = 50;  // Width between each letter

    for (let i = 0; i < this.secretWord.length; i++) {
      if (this.secretWord[i] === letter) {
        this.context.font = '30px Arial';
        this.context.fillText(letter.toUpperCase(), startX + i * lineWidth, startY);
      }
    }
  }

  // Method to write the wrong letter in a designated area
  writeWrongLetter(letter, errorsLeft) {
    if (!letter) return;  // Avoid undefined issues
    const startX = 400;  // Starting X position for the wrong letters
    const startY = 50;  // Y position for the wrong letters

    this.context.font = '30px Arial';
    this.context.fillText(letter.toUpperCase(), startX + (10 - errorsLeft) * 30, startY);
  }

  // Method to draw the hangman figure based on the number of errors left
  drawHangman(errorsLeft) {
    // Basic hangman drawing steps based on errors left (for demo purposes)
    const steps = [
      () => { this.context.beginPath(); this.context.moveTo(200, 300); this.context.lineTo(400, 300); this.context.stroke(); },  // base
      () => { this.context.beginPath(); this.context.moveTo(300, 300); this.context.lineTo(300, 50); this.context.stroke(); },   // pole
      () => { this.context.beginPath(); this.context.moveTo(300, 50); this.context.lineTo(400, 50); this.context.stroke(); },    // top bar
      () => { this.context.beginPath(); this.context.moveTo(400, 50); this.context.lineTo(400, 100); this.context.stroke(); },  // rope
      () => { this.context.beginPath(); this.context.arc(400, 120, 20, 0, Math.PI * 2); this.context.stroke(); },             // head
      () => { this.context.beginPath(); this.context.moveTo(400, 140); this.context.lineTo(400, 200); this.context.stroke(); }, // body
      () => { this.context.beginPath(); this.context.moveTo(400, 150); this.context.lineTo(380, 180); this.context.stroke(); }, // left arm
      () => { this.context.beginPath(); this.context.moveTo(400, 150); this.context.lineTo(420, 180); this.context.stroke(); }, // right arm
      () => { this.context.beginPath(); this.context.moveTo(400, 200); this.context.lineTo(380, 230); this.context.stroke(); }, // left leg
      () => { this.context.beginPath(); this.context.moveTo(400, 200); this.context.lineTo(420, 230); this.context.stroke(); }, // right leg
    ];

    if (errorsLeft <= 10 && errorsLeft > 0) {
      steps[10 - errorsLeft]();  // Execute the corresponding step
    }
  }

  // Method to display game over message
  gameOver() {
    alert("Game Over! The word was: " + this.secretWord);
  }

  // Method to display winner message
  winner() {
    alert("You Won! The word was: " + this.secretWord);
  }
}