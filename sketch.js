/* global Simulation, createCanvas, background, frameCount, clear, Mappa */

let simulation;
let tot_num_of_states = 2;
let canvas;
let map;

function setup() {
  canvas = createCanvas(600, 600);
  simulation = new Simulation(tot_num_of_states, "21 January 2020");
  map=new Map();
  
}

function draw() {
  // background(frameCount % simulation.time_step);
  clear();
  simulation.update();
  simulation.debug();
  map.drawCases();
}
