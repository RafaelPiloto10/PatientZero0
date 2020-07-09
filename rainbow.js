// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, colorMode, HSB, strokeWeight, background, fill, stroke,
rect, mouseX, mouseY
*/

let brushHue

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeWeight(6);
}

function draw() {
  background(95);
  chooseColors();
  rect(mouseX, mouseY, 15, 15);
}

function chooseColors() {
  stroke(brushHue, 50, 80);
  fill(brushHue, 50, 80);
}