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
    this.coords = createVector(lat, lon);
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
      
    this.not_reported_infected=true; //If the state has been reported on the news to be infected
  }

  /*
    Infects a given amount of people within the population
    
    @param infected_amount (int) - the amount of people to infect within the given population - DEFAULT: 1
    
    @return boolean - TRUE: the infection was carried successfully/FALSE: the infection overflowed past the alltoed population
  */
  infect(infected_amount = 1, date = Simulation.start_date) {
    if (this.state_infected <= 0 && infected_amount > 0) {
      this.patient_zero_date = date;
    }

    if (this.state_recovered + this.state_deaths >= this.population) {
      console.log(
        `${this.id} cannot be infected. Population has developed antibodies.`
      );
      return false;
    }

    this.state_infected += infected_amount;
    
    this.infection_stack.push({ infected_amount, date: new Date(date) });
    if (
      this.state_infected >
      this.population - this.state_recovered - this.state_deaths
    ) {
      this.state_infected =
        this.population - this.state_recovered - this.state_deaths;
      console.error(
        `State: ${this.id}: overflow in infections - constrained to susceptible population-recovered!`
      );
      return false;
    }

    return true;
  }

  /*
    Step through a new day for the state
  */
  step() {
    let current_date = Simulation.date;
    if (
      this.state_infected > 0 &&
      this.state_recovered + this.state_deaths <= this.population
    ) {
      // Only if we have an infected citizen should the virus spread
      this.update_infection_stack(current_date);

      let predicted_cases = this.get_predicted_cases_exponentially(
        current_date
      );
      let predicted_new_cases = predicted_cases - this.state_infected;

      this.infect(predicted_new_cases, current_date);
    }

    this.prob_person_has_covid = this.state_infected / this.population;
    
  }

  /*
    Update the infection stack by checking if patients have recovered or died
    
    @param date - the current date in the simulation
    
  */
  update_infection_stack(date) {
    let deaths = 0;
    let recovered = 0;
    
    for (let i = 0; i < this.infection_stack.length; i++) {
      let infection = this.infection_stack[i];
      if(infection.infected_amount <= 0){
        this.infection_stack.splice(i, 1);
        continue;
      }
      let d = getNumberDays(Simulation.date, infection.date);
      if (d >= Simulation.recovery_time) {
        recovered += infection.infected_amount;
        this.infection_stack.splice(i, 1);
      } else {
          let r = random();
          if (r < Simulation.mortality_rate) {
            let _deaths = Math.floor(Simulation.mortality_rate * infection.infected_amount);
            infection.infected_amount -= _deaths;
            deaths += _deaths;
          }
        
      }
    }

    this.state_deaths += deaths;
    this.state_recovered += recovered;
    // console.log(recovered);
    this.state_infected = Math.max(this.state_infected - deaths - recovered, 0);
  }

  /*
    Predict the number of cases at time 'current_date' using an exponential model
    
    @param current_date - the current date in the simulation
    
    @return - the number of cases predicted at time=current_date
  */
  get_predicted_cases_exponentially(current_date) {
    // At the early stages of the pandemic, the increase in cases can be modeled by an exponential function
    // https://www.wired.com/story/how-fast-does-a-virus-spread/

    let delta_time_in_days = getNumberDays(
      current_date,
      this.patient_zero_date
    );
    // Predict the number of cases using an exponential function ---
    // The predicted number of cases as a function of time
    return Math.floor(
      Math.exp(this.spread_rate * delta_time_in_days) / this.state_ppe
    );
  }

  /*
    Predict the number of increased cases using the SIR model:
    https://www.sciencedirect.com/science/article/pii/S0025556413001235
    
    @return - the number of new cases 
  */
  get_predicted_cases_SIR(current_date) {
    // Using a SIR Model
    // Rate of increase for infectious cases = dI/dt = BS(I/N)
    // where B is the per capita transmission rate, S is the number of susceptible people, I is the number of infected
    // R is the number of people recovered, and N is the population number
    // B can be calculated using B = pC where p is the probability of infection and C is the individual contact rate
  }
}

function getNumberDays(future, past) {
  // To calculate the time difference of two dates
  let delta_time = future.getTime() - past.getTime();
  // To calculate the no. of days between two dates
  return delta_time / (1000 * 3600 * 24);
}
