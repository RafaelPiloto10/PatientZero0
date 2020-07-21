/* global createCanvas, colorMode, HSB, background, ellipse, rect, text, 
mouseX, mouseY, round, sqrt, backgroundColor, color, random, width, height
frameRate, stroke, noFill, noStroke, keyCode,fill,collideRectRect, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW
*/

// Since this example code uses the p5 collide2d library, be sure to remind
// students to load it in. Model how to do this by either connecting a local
// copy (included in the templates), connecting a hosted copy through a CDN, or
// (as a last resort) by pasting it in its entirety in this script as the first
// line.

let backgroundColor, playerSnake, currentApple, score, rate

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  rate=12;
  frameRate(rate);
  playerSnake = new Snake(null,null,null);
  currentApple = new Apple();
  score = 0;
}

function draw() {
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
}

function displayScore() {}

class Snake {
  constructor(x,y,dir)
  {
    if(x==null){//checks if this is the head
      this.x = width/2;
      this.y = height - 10;
      this.direction = 'N';
    }
    else{
      this.x = x;
      this.y = y;
      this.direction = dir;
    }
    this.speed = 12;
    this.snake=null;
    this.size = 10;
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
  }

  showSelf() {
    stroke(240, 100, 100);
    noFill();
    rect(this.x, this.y, this.size, this.size);
    noStroke();
    if(this.snake!=null){
      this.snake.showSelf()
    }
  }

  checkApples() {
    if (collideRectRect(this.x,this.y,10,10,currentApple.x,currentApple.y,10,10)){
      this.extendTail();
      currentApple.move(); //add another segment and move the apple
    }
  }

  checkCollisions() {
    
  }

  extendTail() {
    if(this.snake==null){
      let x=this.x,y=this.y;
      if (this.direction === "N") 
        y += this.size;
      else if (this.direction === "S") 
        y -= this.size;
      else if (this.direction === "E") 
        x -= this.size;
     else if (this.direction === "W") 
        x += this.size;
     else 
        console.log("Error: invalid direction");
      this.snake=new Snake(x,y,this.direction);
    }
    else
      this.snake.extendTail();
  }
}

class Apple {
  constructor() {
    this.x=random(width);
    this.y=random(height);
    this.color=color(0,80,80)
  }

  showSelf() {
    fill(this.color);
    rect(this.x,this.y,10)
  }
  move(){
    this.x=random(width);
    this.y=random(height);
  }
}

function keyPressed() {
  console.log("key pressed: ", keyCode)
  if (keyCode === UP_ARROW && playerSnake.direction != 'S') {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != 'N') {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != 'W') {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != 'E') {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
}

function restartGame() {}

function gameOver() {}