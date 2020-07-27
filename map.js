/*
global Mappa, canvas, circle, state_data, simulation, fill, noStroke
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
    noStroke();
    for(let i=0;i<simulation.country.states.length;i++) //pulls the data of each state to draw a circle on its "current" location
    {
      let pos = myMap.latLngToPixel(simulation.country.states[i].coords.x,simulation.country.states[i].coords.y);
      let size = state_data[i].LandArea*Math.pow(myMap.zoom(),3)/200000;
      if(size<2*myMap.zoom())
        size=2*myMap.zoom();
      fill(0,200.0*simulation.country.states[i].state_infected/simulation.country.states[i].population,70);
      circle(pos.x,pos.y,size);
    }
  }
}
