/*
global Mappa, canvas, circle, state_data, simulation, fill, noStroke, map
*/
let myMap;
const mappa = new Mappa("Leaflet");
const options = {
  lat: 37.0902,
  lng: -95.7129,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
};
class Map {
  constructor() {
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
  }

  drawCases() {
    noStroke();
    for (
      let i = 0;
      i < simulation.country.states.length;
      i++ //pulls the data of each state to draw a circle on its "current" location
    ) {
      let state = simulation.country.states[i];
      let pos = myMap.latLngToPixel(state.coords.x, state.coords.y);
      let maxSize = (state_data[i].LandArea * Math.pow(myMap.zoom(), 3)) / 200000;
      let size = map(state.state_infected, 0, state.population, 5, maxSize);
      if (size < 2 * myMap.zoom()) size = 2 * myMap.zoom();
      fill(
        0,
        map(state.state_infected, 0, state.population, 0, 100),
        70,
        map(state.state_infected, 0, state.population, 0, .9)
      );
      circle(pos.x, pos.y, size);
    }
  }
}
