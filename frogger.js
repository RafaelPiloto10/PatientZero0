// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.

/* global createCanvas, colorMode, random, width, height, background, fill, rect, ellipse, HSB, keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, textSize, text
*/

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frogX = width/2;
  frogY = height - 100;
  score = 0;
  lives = 3;
  gameIsOver = false;
  car1X = 0;
  car1Y = 100;
  car1V = 5;
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  // This allows you to click multiple arrows at the same time
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
    frogX = width/2; 
    frogY = height - 100;
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
  if (frogY <= 50) 
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score

  // Display game over message if the game is over

}