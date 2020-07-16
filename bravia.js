/* global createCanvas, windowWidth, windowHeight, colorMode, HSL, background, 
random, width, height, fill, ellipse, noStroke
*/

let dot1, dot2, dot3, dot4, dot5;

let dots;

function setup() {
  createCanvas(windowWidth - 20, windowHeight - 20);
  colorMode(HSL, 360, 100, 100);
//   dot1 = new BouncyDot();
//   dot2 = new BouncyDot();
//   dot3 = new BouncyDot();
  
//   dots = [dot1, dot2, dot3];
//   dots = [new BouncyDot(), new BouncyDot(), new BouncyDot()]
  
//   // dot4 = new BouncyDot();
//   // dot5 = new BouncyDot();
  
//   // dots.push(dot4);
//   // dots.push(dot5);
//   dots.push(new BouncyDot());
//   dots.push(new BouncyDot());
  
  dots = [];
  
  for (let x = 0; x < 500; x++) {
    dots.push(new BouncyDot());
  }
  
  
  
}

//   dots = [dot1, dot2, dot3];
//.           0      1     2
function draw() {
  background(220, 0, 80);
  
  // dot1.float();
  // dot1.display();
  
//   dots[0].float();
//   dots[0].display();
  
//   dots[1].float();
//   dots[1].display();
  
//   dots[2].float();
//   dots[2].display();
  
//   dots[3].float();
//   dots[3].display();
  
  
  
  // 1) create a variable i = 0
  // 2) as long as i < 4, keep looping
  // 3) after each loop, add 1 to i
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].float();
    dots[i].display();
  }
  
}

function mousePressed() {
  // We'll use this for console log statements only.
  console.log(dots);
}

class BouncyDot {
  constructor() {
    // Randomly generate position
    this.x = random(width);
    this.y = random(height);
    // Randomly generate radius
    this.r = random(5, 12);
    // Randomly generate color
    this.color = random(360);
    // Randomly generate a master velocity (broken into components)...
    this.masterXvelocity = random(0.5, 3);
    this.masterYvelocity = random(0.5, 3);
    // ...and use those as starting velocities.
    this.xVelocity = this.masterXvelocity;
    this.yVelocity = this.masterYvelocity;
  }

  float() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    // Standard bounce code - like the DVD logo, but for spheres.
    if (this.x + this.r > width) {
      this.xVelocity = -1 * this.masterXvelocity;
    }
    if (this.x - this.r < 0) {
      this.xVelocity = this.masterXvelocity;
    }
    if (this.y + this.r > height) {
      this.yVelocity = -1 * this.masterYvelocity;
    }
    if (this.y - this.r < 0) {
      this.yVelocity = this.masterYvelocity;
    }
  }

  display() {
    fill(this.color, 80, 70);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }
}