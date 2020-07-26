/* global Simulation */

let simulation;
let tot_num_of_states = 50;

function setup() {
  simulation = new Simulation(tot_num_of_states);
}

function draw() {
  simulation.update();
}
