/*
global Mappa, canvas
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
}
