/* 
global createCanvas, colorMode, background, HSB, height, random, width, noStroke, fill, ellipse
*/

let drop1x, drop1y, drop2x, drop2y, drop2d, drop2FallSpeed, drop1Diameter, drop1FallSpeed;

let drop1, drop2, drop3, drop4

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  drop1 = new RainDrop(10);
  drop2 = new RainDrop(8);
  drop3 = new RainDrop(12);
  drop4 = new RainDrop(14);
}

function draw() {
  background(0, 0, 95);
 
   // Move drop 1, then show
  drop1.drip();
  drop1.show();
  // Same for drop 2
  drop2.drip();
  drop2.show();
  // And for drop 3
  drop3.drip();
  drop3.show();
  // Etc.
  drop4.drip();
  drop4.show();

}

class RainDrop {
  constructor(diameter) {
    this.x = random(width);
    this.y = random(height);
    this.diameter = diameter;
    this.fallSpeed = random(5, 10);
  }

  show() {
    noStroke();
    fill(60, 80, 80);
    ellipse(this.x, this.y, this.diameter);
  }

  drip() {
    this.y += this.fallSpeed;
    if (this.y >= height) {
      this.y = 0;
      this.x = random(width);
    }
  }
}