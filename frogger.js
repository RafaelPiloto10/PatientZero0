// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.

/* global createCanvas, colorMode, random, width, height, background, fill, rect, ellipse, HSB, keyCode, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, SPACE, textSize, text, loadImage, image
*/

let backgroundColor, frogX, frogY, score, lives, gameIsOver, car1X, car1Y, car1V, car2X, car2Y, car2V, Coin1, Coin2, Coin3, Coin4, Coin5, Coin6, Coin7, Coin8;
let img, riverX, riverY, logX, logY, logVelocity;

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
  car2X = 0;
  car2Y = 320;
  car2V = 5;
  riverX = 0;
  riverY = height/2;
  logX = 0;
  logY = height/2;
  logVelocity = 2;
  Coin1 = random(width);
  Coin2 = random(height);
  Coin3 = random(width);
  Coin4 = random(height);
  Coin5 = random(width);
  Coin6 = random(height);
  Coin7 = random(width);
  Coin8 = random(height);
  
  
  img = loadImage("https://cdn.glitch.com/2205754a-27cc-4886-b927-edc5ba24c044%2Fkisspng-frogger-ancient-shadow-frogger-s-adventures-temp-pixel-vector-5ad82e3bd64588.5481840415241170518777.png?v=1594765212681")
}

function draw() {
  background(backgroundColor);
  // Code for gold goal lin
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frog
  fill(120, 80, 80);
  image(img,frogX, frogY,40,40);
  //ellipse(frogX, frogY, 20);
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
  drawCoins();
  level2();
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
  car2X += car2V; 
  
  // Reset if it moves off screen
  if (car2X >= width) {
    car2X = -30;
  }
}


function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
  fill(0, 80, 80);
  rect(car2X, car2Y, 40, 30);
}

function checkCollisions() {
  // If the frog collides with the car, reset the frog and subtract a life.
  if (collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20)) {
    resetFrog();
    lives -= 1; 
  }
  if (collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20)) {
    resetFrog();
    lives -= 1; 
  }
  
  // Handle when out of lives
  if (lives === 0) {
    gameIsOver = true;
  }
  
  // Handle powerups/coins
  if (!gameIsOver) {
    
    if (collideCircleCircle(Coin1, Coin2, 20, frogX, frogY, 30)) {
      score++;
      Coin1 = random(width);
      Coin2 = random(height);
    }  
    
    if (collideCircleCircle(Coin3, Coin4, 20, frogX, frogY, 30)) {
      score++;
      Coin3 = random(width);
      Coin4 = random(height);
    }
    if (collideCircleCircle(Coin5, Coin6, 20, frogX, frogY, 30)) {
      score++;
      Coin5 = random(width);
      Coin6 = random(height);
    }  
    
    if (collideCircleCircle(Coin7, Coin8, 20, frogX, frogY, 30)) {
      score++;
      Coin7 = random(width);
      Coin8 = random(height);
    }
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

function drawCoins() {
  fill("grey");
  ellipse(Coin1, Coin2, 20);
  
  fill("red");
  ellipse(Coin3, Coin4, 20);
  
  fill("orange");
  ellipse(Coin5, Coin6, 20);
  
  fill("white");
  ellipse(Coin7, Coin8, 20);

}

function level2() {
  fill("blue");
  rect(riverX, riverY, width, 30);
  fill("brown");
  rect(logX, logY, 100, 30);
  
  // Reset position
  if (logX >= width) {
    logX = -30;
  }
  
  // Log should move
  logX += logVelocity;
  
  if ((frogY == riverY) && (frogX<logX) && (frogX>logX+100)) {
    resetFrog();
    lives -= 1;
  }
}  

// function levelUp() {
//   if (score == 3) {
//     level2();
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
// Add a timer.