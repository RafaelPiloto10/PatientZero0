// Name any p5.js functions we use in the global so Glitch can recognize them.
/* global createCanvas, colorMode, HSB, width, height, 
          random, background, fill, color, random
          rect, ellipse, stroke, image, loadImage, 
          collideCircleCircle, text, mouseX, mouseY, noStroke, line */


let backgroundColor, color1, color2, textColor, globalS, globalB

function setup() {
  createCanvas(400, 400)
  colorMode(HSB, 360, 100, 100)
  noStroke()
  // Set saturation and brightness globally so we can experiment with different color palettes as we go without having to change multiple things
  globalS = 90
  globalB = 90
  // We'll keep background color in a variable so we can modify it in other functions.
  backgroundColor = color(95)
  // The variable color1 will be used for the ellipse on the left, and color2 will be the ellipse on the right.
  color1 = color(0, globalS, globalB)
  color2 = color(200, globalS, globalB)
  // We will use this textColor variable as a way to make sure the text is always visible against a changing background.
  textColor = color(20)
}

function draw() {
  background(backgroundColor)
  drawCenterLine()
  if (mouseX > width / 2) {
    nightMode()
  } else {
    dayMode()
  }
  fill(color1)
  ellipse(1/4 * width, height / 2, 50)
  fill(color2)
  ellipse(3/4 * width, height / 2, 50)
  fill(textColor)
  text("Flip the switch", 20, 20)
  ellipse(mouseX, mouseY, 50)
}

function drawCenterLine() {
  // Turn stroke on, draw the line, turn stroke back off.
  stroke(textColor)
  line(width / 2, 0, width / 2, height)
  noStroke()
}

function dayMode() {
  backgroundColor = color(95)
  color1 = color(0, globalS, globalB)
  color2 = color(200, globalS, globalB)
  textColor = color(20)
}

function nightMode() {
  backgroundColor = color(20)
  color1 = color(200, globalS, globalB)
  color2 = color(0, globalS, globalB)
  textColor = color(95)
}