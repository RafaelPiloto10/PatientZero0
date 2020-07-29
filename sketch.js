/* global Simulation, createCanvas, background, frameCount, clear, Mappa, colorMode, HSB, createButtons */

let simulation;
let tot_num_of_states = 51;
let canvas;
let mmap;
let graph;

function setup() {
  colorMode(HSB, 360, 100, 100);
  canvas = createCanvas(600, 600);
  simulation = new Simulation(tot_num_of_states, "21 January 2020");
  mmap = new Map();
  createButtons();
  graph = new CanvasJS.Chart("chartContainer", {
    exportEnabled: true,
    title: { text: "Δ Cases Over Time (days)" },
    axisY: { title: "Δ Confirmed Cases", includeZero: true },
    data: [
      {
        type: "spline",
        color: "rgba(255, 0, 0, .7)",
        markerSize: 0,
        dataPoints: simulation.country.new_cases
      }
    ]
  });
}

function draw() {
  // background(frameCount % simulation.time_step);
  clear();
  mmap.drawCases();
  if (simulation.country.statistics.total_infected > 0) {
    simulation.update();
    simulation.debug();
  } else {
    clear();
    textAlign(CENTER);
    text("COVID-19 has been eradicated in the US!", width / 2, height / 2);
    noLoop();
  }
  graph.render();
}

// https://stackoverflow.com/questions/10599933/convert-long-number-into-abbreviated-string-in-javascript-with-a-special-shortn
const abbreviateNumber = function(num, fixed) {
  if (num === null) { return null; } // terminate early
  if (num === 0) { return '0'; } // terminate early
  fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
  var b = (num).toPrecision(2).split("e"), // get power
      k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
      c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3) ).toFixed(1 + fixed), // divide by power
      d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
      e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
}