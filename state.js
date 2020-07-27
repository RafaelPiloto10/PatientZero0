/* global createVector, Simulation, random */

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
  constructor(
    lon,
    lat,
    id,
    pop,
    pop_density,
    state_init_infected,
    revenue,
    state_init_ppe,
    spread_rate
  ) {
    this.coords = createVector(lon, lat);
    this.id = id;
    this.population = pop;
    this.population_density = pop_density;

    this.state_deaths = 0;
    this.state_infected = state_init_infected;
    this.state_recovered = 0;

    this.revenue = revenue;
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
  infect(infected_amount = 1, date = Simulation.start_date) {
    this.has_patient_zero = true;

    this.state_infected += infected_amount;
    this.infection_stack.push({infected_amount, date});

    if (this.state_infected > this.population - this.state_recovered) {
      this.state_infected = this.population - this.state_recovered;
      console.error(
        `State: ${this.id}: overflow in infections - constrained to population-recovered!`
      );
      return false;
    }

    return true;
  }

  /*
    Step through a new day for the state
  */
  step() {
    // At the early stages of the pandemic, the increase in cases can be modeled by an exponential function
    // https://www.wired.com/story/how-fast-does-a-virus-spread/
    let current_date = Simulation.date;
    
    this.update_infection_stack(current_date);
    
    let delta_time_in_days = getNumberDays(current_date, Simulation.start_date);
    // Predict the number of cases using an exponential function ---
    // The predicted number of cases as a function of time
    let predicted_cases =
      Math.floor(Math.exp(this.spread_rate * delta_time_in_days) / this.state_ppe);

    let predicted_new_cases = predicted_cases - this.state_infected;

    this.infect(predicted_new_cases, current_date);

    this.prob_person_has_covid = this.state_infected / this.population;
  }
  
  /*
    Update the infection stack by checking if patients have recovered or died
    
    @param date - the current date in the simulation
    
  */
  update_infection_stack(date) {
    let deaths = 0;
    let recovered = 0;

    this.infection_stack = this.infection_stack.filter(infection => {
      let r = random(1000) / 1000;
      if (getNumberDays(date, infection.date) > Simulation.recovery_time) {
        if (r < Simulation.mortality_rate) deaths += infection.infected_amount;
        else recovered += infection.infected_amount;
        return false;
      }
      return true;
    });

    this.state_deaths += deaths;
    this.state_recovered += recovered;
    this.state_infected = this.state_infected - deaths - recovered;
  }
}

function getNumberDays(future, past) {
  // To calculate the time difference of two dates
  let delta_time = future.getTime() - past.getTime();
  // To calculate the no. of days between two dates
  return delta_time / (1000 * 3600 * 24);
}
