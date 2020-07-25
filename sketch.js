/* global */

let game;

function setup() {
  game = new Game();
  game.load_state_data("2019PopulationEstimate.csv").then(() => {
    console.log(game.state_data);
  });
}

function draw() {}
