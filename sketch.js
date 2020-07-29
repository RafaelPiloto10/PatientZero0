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
function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "K", "M", "B","T"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}