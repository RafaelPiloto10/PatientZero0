// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.

/* global createCanvas, colorMode, random, width, height, background, fill, rect, ellipse, HSB, keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SPACE, textSize, text, loadImage, image
*/

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V, Coin1, Coin2, Coin3, Coin4;
let img;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  resetFrog();
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
  Coin1 = random(width);
  coin2= random(height)
  Coin3 =
  Coin3 = 
  Coin4 = 
  img = loadImage("https://png2.cleanpng.com/sh/a02aeddbe0b3b6ca57bfdb29420ab566/L0KzQYm3VME6N6dqfZH0aYP2gLBuTfZzd5hsfeQ2YX7mebb1lL10cJJphAk2ZoLyd7jskr10NZJpjtd3dIX1dcS0lPVueF51gepubD35dbT7jCIuPZJpUKRuM3LnRoW8WMgvPWU9Sao9MES0RYO7UcE4OGY2UKkCNz7zfri=/kisspng-frogger-ancient-shadow-frogger-s-adventures-temp-pixel-vector-5ad82e3bd64588.5481840415241170518777.png");
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  image(img,frogX, frogY,20,20);
  //ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  //drawCoins();
}

// Called by p5
function keyPressed() {
  // This allows you to click multiple arrows at the same time
  if (!gameIsOver) {
    if (keyCode === UP_ARROW) {
      frogY -= 10;
    }
    if (keyCode === DOWN_ARROW) {
      frogY += 10;
    }
    if (keyCode === LEFT_ARROW) {
      frogX -= 10;
    }
    if (keyCode === RIGHT_ARROW) {
      frogX += 10;
    } 
  }
  
  // Runs any time
  if (keyCode === SPACE) {
    lives = 3;
    resetFrog();
    gameIsOver = false;
    score = 0;
  }
}

function moveCars() {
  // Move the car
  car1X += car1V; 
  
  // Reset if it moves off screen
  if (car1X >= width) {
    car1X = -30;
  }
}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20)) {
    resetFrog();
    lives -= 1; 
  }
  
  // Handle when out of lives
  if (lives === 0) {
    gameIsOver = true;
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  
  // Option 1: Check collision w/ the yellow box
  
  // Option 2: Check the Y position of the frog
  if (frogY <= 50) {
    score += 1;
    resetFrog();
  }
}

function resetFrog() {
  frogX = width/2; 
  frogY = height - 100;
}

function displayScores() {
  textSize(12);
  fill(0);
  
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  
  // Display Score
  text(`Score: ${score}`, 10, 40);
  
  // Display win message
  if (score == 5 && gameIsOver) {
    textSize (45);
    text("YOU WIN!", width/4, height/2);
  }
  
  // Display game over message if the game is over
  if (gameIsOver) {
    // Draw Game Over text
    textSize(45);
    text("GAME OVER", width/4, height/2);
  }
}

// function handleCoins {
//   if (!gameIsOver) {
    
//     if (collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20)) {
//       score++;
//       moveCoin();
//     }  
    
//     if (collideCircleCircle(coin1, coin2, 20, mouseX, mouseY, 20)) {
//       score++;
//       moveCoin1();
//     }
    
//     if (collideCircleCircle(coin3, coin4, 20, mouseX, mouseY, 20)) {
//       score++;
//       moveCoin2();
//     } 
    
//     if (collideCircleCircle(coin5, coin6, 20, mouseX, mouseY, 20)) {
//       score++;
//       moveCoin3();
//     }
//   }
// }

// CHALLENGES
// 1) code out a You WIN message when score == #
// 2) code out responding to a specific key that resets the game
// 3) code out protections against accepting user input (movement) when the game is marked as over

// Add multiple cars.
// Add a certain goal - i.e. score 5 times to end the game.
// Make it so that you can only move the frog if the game is not over.
// Make the game get more and more challenging as you win more and more times.
// Color code your player pieces.
// Using some ideas from yesterday’s game, add some collectible power-ups that make you temporarily invincible, faster, smaller, or rainbow-colored.
// Add features like a river to the background - make some additional modifications to the gameplay - perhaps falling into the river also sends you back. Add logs that float.