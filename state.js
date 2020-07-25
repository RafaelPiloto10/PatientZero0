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
    @param revenue (float) - the amount of money the state contributes in revenue towards the country
    @param state_init_ppe (int)- the amount of PPE the state will be receiving at the start of the simulation
  */
  constructor(lon, lat, id, pop, pop_density, state_init_infected, revenue, state_init_ppe) {
    this.coords = createVector(lon, lat);
    this.id = id;
    this.population = pop;
    this.population_density = pop_density;

    this.state_deaths = 0;
    this.state_infected = state_init_infected;
    this.state_recovered = 0;
    
    this.revenue = revenue
    this.state_ppe = state_init_ppe;
  }
  
  /*
    Infects a given amount of people within the population
    
    @param infected_amount (int) - the amount of people to infect within the given population - DEFAULT: 1
    
    @return boolean - TRUE: the infection was carried successfully/FALSE: the infection overflowed past the alltoed population
  */
  infect(infected_amount = 1){
    this.state_infected += infected_amount;
    if(this.state_infected > this.population){
      this.state_infected = this.population;
      console.error(`State: ${this.id}: overflow in infections - constrained to population!`);
      return false;
    }
    
    return true;
  }
}
