/* global createVector, Simulation*/

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
  constructor(lon, lat, id, pop, pop_density, state_init_infected, revenue, state_init_ppe, spread_rate) {
    this.coords = createVector(lon, lat);
    this.id = id;
    this.population = pop;
    this.population_density = pop_density;

    this.state_deaths = 0;
    this.state_infected = state_init_infected;
    this.state_recovered = 0;
    
    this.revenue = revenue
    this.state_ppe = state_init_ppe;
    this.spread_rate = spread_rate;
    
    this.has_patient_zero = false;
    this.infection_stack = [];
    
    this.prob_person_has_covid = this.state_infected / this.population;
  }
  
  /*
    Infects a given amount of people within the population
    
    @param infected_amount (int) - the amount of people to infect within the given population - DEFAULT: 1
    
    @return boolean - TRUE: the infection was carried successfully/FALSE: the infection overflowed past the alltoed population
  */
  infect(infected_amount = 1, date) {
    this.has_patient_zero = true;
    
    for(let i = 0; i < infected_amount; i++){
      
      this.state_infected += 1;
      this.infection_stack.push(date);
      
      if(this.state_infected > this.population){
        this.state_infected = this.population;
        console.error(`State: ${this.id}: overflow in infections - constrained to population!`);
        return false;
      }
    }    
    
    return true;
  }
  
  step(current_date) {
    // At the early stages of the pandemic, the increase in cases can be modeled by an exponential function
    // https://www.wired.com/story/how-fast-does-a-virus-spread/
    
    // To calculate the time difference of two dates
    let delta_time_since_day_one = current_date.getTime() - Simulation.start_date.getTime(); 
    // To calculate the no. of days between two dates 
    let delta_time_in_days = delta_time_since_day_one / (1000 * 3600 * 24);
    
    // Predict the number of cases using an exponential function
    let predicted_cases = Math.exp(this.spread_rate * delta_time_in_days)/this.state_ppe;
    this.infect(predicted_cases);
    
    // TODO: Update recoveries & deaths
    
    this.prob_person_has_covid = this.state_infected / this.population;

  }
}
