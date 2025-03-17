// Codecademy Challenge Project: Find Your Hat
/* https://www.codecademy.com/paths/full-stack-engineer-career-path/tracks/fscp-22-introduction-to-back-end/modules/wdcp-22-challenge-project-find-your-hat/projects/find-your-hat */

// Clear Screen after each turn
const clear = require('clear-screen');

// Get user input
const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Step 1 - Create a game field

// Set the starting position
class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;
    this.field[0][0] = pathCharacter;
  }

  // Step 3 - Set responses to player moves
  // This method handles the main game loop, checking for win/lose conditions and updating the field
  playGame() {
    let playing = true;

    while (playing) {
      this.print();
      this.question();
      if (!this.inBounds()) {
        console.log("Oops! You're out of bounds.");
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log("You fell down a hole!");
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log("Well done, you found your hat!");
        playing = false;
        break;
      }
      // Update position on the field
      this.field[this.locationY][this.locationX] = pathCharacter;
    }
  }

  // Step 4 - Ask users for input / game moves
  question() {
    let answer = prompt("Where to?\n").toUpperCase();
    while (!['U', 'D', 'L', 'R'].includes(answer)) {
      console.log("Invalid input. Please enter U, D, L, or R.");
      answer = prompt("Where to?").toUpperCase();
    }

    switch (answer) {
      case "U":
        this.locationY -= 1;
        break;
      case "D":
        this.locationY += 1;
        break;
      case "L":
        this.locationX -= 1;
        break;
      case "R":
        this.locationX += 1;
        break;
      default:
        console.log("Enter U (up), D (Down), L (Left) or R (Right).");
        this.question();
        break;
    }
  }

  inBounds() {
    return (
      this.locationY >= 0 &&
      this.locationX >= 0 &&
      this.locationY < this.field.length &&
      this.locationX < this.field[0].length
    );
  }

  isHole() {
    return this.field[this.locationY][this.locationX] === hole;
  }

  isHat() {
    return this.field[this.locationY][this.locationX] === hat;
  }

  print() {
    clear();
    const displayString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
  }

  // Step 5 - Generate Field
  static generateField(height, width, percent = 0.1) {
    if (height <= 0 || width <= 0 || percent < 0 || percent > 1) {
      throw new Error("Invalid field dimensions or percentage");
    }

    const field = new Array(height).fill(0).map((el) => new Array(width));

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percent ? fieldCharacter : hole;
      }
    }

    // Set HAT position
    const hatPos = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };

    // Block HAT as starting point
    while (hatPos.x === 0 && hatPos.y === 0) {
      hatPos.x = Math.floor(Math.random() * width);
      hatPos.y = Math.floor(Math.random() * height);
    }
    field[hatPos.y][hatPos.x] = hat;
    return field;
  }
}

const gameField = new Field(Field.generateField(15, 15, 0.2));
gameField.playGame();
