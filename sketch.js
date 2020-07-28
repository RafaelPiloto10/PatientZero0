/* global Simulation, createCanvas, background, frameCount, clear, Mappa, colorMode, HSB, createButtons */

let simulation;
let tot_num_of_states = 51;
let canvas;
let map;

function setup() {
  colorMode(HSB, 360, 100, 100);
  canvas = createCanvas(600, 600);
  simulation = new Simulation(tot_num_of_states, "21 January 2020");
  map = new Map();
  createButtons();
}

function draw() {
  // background(frameCount % simulation.time_step);
  clear();
  map.drawCases();
  simulation.update();
  simulation.debug();
}
