/*
global Mappa, canvas, circle, state_data, simulation
*/
let myMap;
const mappa = new Mappa('Leaflet');
const options = {
  lat: 37.0902,
  lng: -95.7129,
  zoom: 4,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
  }
class Map {
  constructor() 
  {
    myMap = mappa.tileMap(options); 
    myMap.overlay(canvas) 
  }
  
  drawCases()
  {
    for(let i=0;i<simulation.country.states.length;i++)
    {
      // simulation.country.states[i]
      let pos = myMap.latLngToPixel(simulation.country.states[i].lat,simulation.country.states[i].lon);
      circle(pos.x,pos.y,10)
    }
  }
}
