// Name any p5.js functions we use in the global so Glitch can recognize them.

/* global createCanvas, background, loadImage, image */

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

let dvdImage;

function setup(){
  createCanvas(800, 600);
  // We only want to load the logo once.
  dvdImage = loadImage("https://cdn.glitch.com/eaea72a4-ac6d-4777-b76e-f37d75959aa5%2Fdvd.jpeg?1515761833387");
}

function draw(){
  background(220);
  // Draw the logo at the new position.
  image(dvdImage, 50, 50, 200, 150);
}