/* global Simulation, createCanvas, background, frameCount, Mappa */

let simulation;
let tot_num_of_states = 2;
let canvas;

let myMap;
const mappa = new Mappa('Leaflet');
const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function setup() {
  canvas = createCanvas(600, 600);
  simulation = new Simulation(tot_num_of_states, "21 January 2020");
  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas) 
}

function draw() {
  //background(frameCount % simulation.time_step);
  //simulation.update();
  //simulation.debug();
}
