/* 
global createCanvas, colorMode, background, HSB, height, random, width, noStroke, fill, ellipse
*/

let drop1x, drop1y, drop2x, drop2y, drop2d, drop2FallSpeed, drop1Diameter, drop1FallSpeed;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  // Variables for droplet 1
  drop1x = 200; // or random(width)
  drop1y = 0; // or random(height)
  drop1Diameter = 10; // or random(5,15)
  drop1FallSpeed = 8; // or random(8, 20)

  // Variables for droplet 2
  drop2x = 200; // or random(width)
  drop2y = 0; // or random(height)
  drop2d = 10; // or random(5,15)
  drop2FallSpeed = 8; // or random(8, 20)
}

function draw() {
  background(0, 0, 95);
  //// Code for droplet 1
  // Move droplet 1
  drop1y += drop1FallSpeed;
  // If it goes off the screen...
  if (drop1y > height) {
    // ...reset it...
    drop1y = 0;
    // ...and move it somewhere random.
    drop1x = random(width);
  }
  // Display droplet 1
  noStroke();
  fill(60, 80, 80);
  ellipse(drop1x, drop1y, drop1Diameter);

  //// Code for droplet 2
  // Code your next droplet here
  
}

class RainDrop {
  constructor(d) {
    this.x = random(width);
    this.y = random(height);
    this.d = d;
    this.fallSpeed = random(5, 10);
  }

  show() {
    noStroke();
    fill(60, 80, 80);
    ellipse(this.x, this.y, this.d);
  }

  drip() {
    this.y += this.fallSpeed;
    if (this.y >= height) {
      this.y = 0;
      this.x = random(width);
    }
  }
}