/* global createVector */

/*
  State class meant to simulate an individual state with unique state properties
*/
class State {
  /*
    Constructor for the State class
    @param lon (float) - The longitude of the state
    @param lat (float) - The latitude of the state
    @param id (string) - the id abbreviate of the state ie. CA
    @param pop (int) - the population of the state
    @param pop_density (float) - the population density of the state
  
  */
  constructor(lon, lat, id, pop, pop_density) {
    this.coords = createVector(lon, lat);
    this.id = id;
    this.population = pop;
    this.population_density = pop_density;
  }
}
