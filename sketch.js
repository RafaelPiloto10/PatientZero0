/* global Simulation, createCanvas, background, frameCount */

let simulation;
let tot_num_of_states = 2;

function setup() {
  createCanvas(600, 600);
  simulation = new Simulation(tot_num_of_states, "21 January 2020");
}

function draw() {
  background(frameCount % simulation.time_step);
  simulation.update();
  simulation.debug();
}
