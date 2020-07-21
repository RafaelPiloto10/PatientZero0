/* global createCanvas, colorMode, HSB, background, ellipse, rect, text, 
mouseX, mouseY, round, sqrt, backgroundColor, color, random, width, height
frameRate, stroke, noFill, noStroke, keyCode,fill,collideRectRect, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, loop, noLoop
*/

// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.

let backgroundColor, playerSnake, currentApple, score, rate, gameIsOver, lives;

function setup() {
  // Canvas & color settings
  lives = 3;
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  rate = 5;
  frameRate(rate);
  playerSnake = new Snake(null, null, null);
  currentApple = new Apple();
  score = 0;
  gameIsOver=false;
}

function draw() {
  frameRate(rate);
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  displayScore();
  if(lives == 0){
    gameIsOver = true;
    gameOver();
  }
}

function displayScore() 
{
  text("Current Score: "+score,10,10)
  text("Lives: "+lives, 10, 20) //text(`Score: ${score}`, 20, 20);
}

class Snake {
  constructor(x, y, dir) {
    if (x == null) {
      //checks if this is the head
      this.x = width / 2;
      this.y = height - 10;
      this.direction = "N";
    } else {
      this.x = x;
      this.y = y;
      this.direction = dir;
    }
    this.speed = 10;
    this.snake = null;
    this.size = 10;
    this.color=color(random(360),80,80);
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }
    if(this.snake!=null){
      this.snake.moveSelf();
      this.snake.direction=this.direction;
    }
  }

  showSelf() {
    stroke(this.color);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    if (this.snake != null) {
      this.snake.showSelf();
    }
    if (this.y > 400 || this.y < 0 || this.x < 0 || this.x > 400){
      lives -=1;
    }
  }

  checkApples() {
    if (collideRectRect(this.x,this.y,10,10,currentApple.x,currentApple.y,10,10)) {
      score++;
      this.extendTail();
      currentApple.move(); //add another segment and move the apple
      rate=5+Math.pow(score,.9)
      //if(rate < 15, 
    }
  }

  checkCollisions() {
    let iter=this.snake;
    // if(this.x>width-10||this.x<0||this.y>height-10||this.y<0){
    //   lives--;
    //   if(lives<=0)
    //     gameOver();
      //return;
    //}
    while(iter != null){
      if(collideRectRect(this.x,this.y,9,9,iter.x,iter.y,9,9)){
        lives--;
        if(lives<=0)
          gameOver();
        return;
      }
      iter=iter.snake;
    }
  }

  extendTail() {
    if (this.snake == null) {
      let x = this.x,
        y = this.y;
      if (this.direction === "N") y += this.size;
      else if (this.direction === "S") y -= this.size;
      else if (this.direction === "E") x -= this.size;
      else if (this.direction === "W") x += this.size;
      else console.log("Error: invalid direction");
      this.snake = new Snake(x, y, this.direction);
    } 
    else this.snake.extendTail();
  }
}

class Apple {
  constructor() {
    this.x = random(width-30);
    this.y = random(height-30);
    this.color = color(0, 80, 80);
  }

  showSelf() {
    fill(this.color);
    rect(this.x, this.y, 10);
  }
  move() {
    this.x = random(width);
    this.y = random(height);
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode);
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
}

function restartGame() {
  score = 0;
  playerSnake = new Snake();
  currentApple = new Apple();
  loop();
}

function gameOver() {
  stroke(0);
  text('GAME OVER', width/2, height/2);
  noLoop();
}
