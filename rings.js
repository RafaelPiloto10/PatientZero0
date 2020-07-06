// Name any p5.js functions we use in the global so Glitch can recognize them.

/* global createCanvas, background, ellipse */

// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

function setup(){
  // Code here runs only once
  createCanvas(800, 600)
}

function draw(){
  // Code here runs continuously
  background(220)

  ellipse(50, 50, 50, 50)

}